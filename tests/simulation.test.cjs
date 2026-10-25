const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const Model=require('../town-model.js');
let ctx=vm.createContext({});vm.runInContext(fs.readFileSync('residents.js','utf8')+';globalThis.data={stories,scenes,agents};',ctx);
const {stories,scenes,agents}=ctx.data;
assert.equal(stories.length,16);assert.equal(agents.length,20);assert.equal(Object.keys(scenes).length,4);
let decisions=0;
for(const e of stories){assert.ok(scenes[e.scene]);assert.equal(e.cast.length,e.lines.length);for(let i=0;i<e.choices.length;i++){
 const s=Model.initial(),c=e.choices[i];const initial={...s};assert.equal(Model.resolve(s,e,i).ok,true);for(const [k,v] of Object.entries(c.delta))assert.equal(s[k],Math.min(k==='harmony'?100:Infinity,initial[k]+v));
 const before=JSON.stringify(s);assert.equal(Model.resolve(s,e,i).ok,false);assert.equal(JSON.stringify(s),before,'Duplicate resolution mutated state');assert.equal(Model.restore(JSON.parse(before)).completed[e.id],i);decisions++;
 const cost=Object.entries(c.delta).find(([k,v])=>v<0);if(cost){const poor=Model.initial();poor[cost[0]]=0;const snapshot=JSON.stringify(poor);assert.equal(Model.resolve(poor,e,i).ok,false);assert.equal(JSON.stringify(poor),snapshot,'Failed payment partially mutated state')}
}}
const Nav=require('../navigation.js');let paths=0;
for(const start of Nav.nodes)for(const goal of Nav.nodes){let route=Nav.route(start,goal);assert.ok(route);let pos=[...start],limit=1000;while(route.length&&limit--){const moved=Nav.advance(pos,route,13);assert.ok(Nav.distance(pos,moved.position)<=13.00001,'teleport');assert.ok(Nav.nearest(moved.position).d<.001,'left the road');assert.ok(Nav.route(moved.position,start),'cannot reroute mid-street');pos=moved.position;route=moved.waypoints}assert.ok(limit>0);assert.ok(Nav.distance(pos,goal)<.001);paths++}
for(const e of stories){for(const id of e.cast)assert.ok(agents.find(a=>a.id===id));const p=scenes[e.scene].spots;for(const i of [0,2,4]){const target=[p[1][0]+(p[i][0]-p[1][0])*.32,p[1][1]+(p[i][1]-p[1][1])*.32];assert.ok(Nav.route(Nav.nodes[0],target))}}
assert.equal(new Set(agents.map(a=>a.id)).size,20);
console.log(`PASS: 20 residents, ${decisions} decisions, persistence/payment protection, ${paths} connected routes with bounded movement and mid-route replanning.`);
