const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const Model=require('../town-model.js');
let ctx=vm.createContext({});vm.runInContext(fs.readFileSync('residents.js','utf8')+';globalThis.data={stories,scenes,agents};',ctx);
const {stories,scenes,agents}=ctx.data;
assert.equal(stories.length,12);assert.equal(agents.length,10);assert.equal(Object.keys(scenes).length,4);
let decisions=0;
for(const e of stories){assert.ok(scenes[e.scene]);assert.equal(e.cast.length,e.lines.length);for(let i=0;i<e.choices.length;i++){
 const s=Model.initial(),c=e.choices[i];const initial={...s};assert.equal(Model.resolve(s,e,i).ok,true);for(const [k,v] of Object.entries(c.delta))assert.equal(s[k],Math.min(k==='harmony'?100:Infinity,initial[k]+v));
 const before=JSON.stringify(s);assert.equal(Model.resolve(s,e,i).ok,false);assert.equal(JSON.stringify(s),before,'Duplicate resolution mutated state');assert.equal(Model.restore(JSON.parse(before)).completed[e.id],i);decisions++;
 const cost=Object.entries(c.delta).find(([k,v])=>v<0);if(cost){const poor=Model.initial();poor[cost[0]]=0;const snapshot=JSON.stringify(poor);assert.equal(Model.resolve(poor,e,i).ok,false);assert.equal(JSON.stringify(poor),snapshot,'Failed payment partially mutated state')}
}}
const app=fs.readFileSync('app.js','utf8');vm.runInContext(app.slice(app.indexOf('function route('),app.indexOf('function go('))+';globalThis.findRoute=route;',ctx);
let paths=0;for(const [id,scene] of Object.entries(scenes)){for(const start of scene.spots){for(const goal of scene.spots){const result=ctx.findRoute({scene:id,x:start[0],y:start[1]},goal);assert.ok(result,`${id}: unreachable ${start} -> ${goal}`);let prev=start;for(const dest of result){const n=Math.max(1,Math.ceil(Math.hypot(dest[0]-prev[0],dest[1]-prev[1])/2));for(let i=0;i<=n;i++){const x=prev[0]+(dest[0]-prev[0])*i/n,y=prev[1]+(dest[1]-prev[1])*i/n;assert.ok(!scene.obstacles.some(o=>((x-o[0])/o[2])**2+((y-o[1])/o[3])**2<.999),'Path intersects an obstacle')}prev=dest}paths++}}}
console.log(`PASS: ${decisions} event decisions, duplicate/insufficient-funds protection, persistence, ${paths} collision-free scene routes.`);
