/* Free walking over courtyard surfaces, with obstacle-aware routing. */
(function(root){
const districts={"market": [[330, 480], [500, 520], [560, 465], [650, 440], [510, 575], [420, 560]], "books": [[950, 455], [1080, 495], [1180, 450], [1280, 570], [1130, 530], [980, 530]], "garden": [[380, 710], [500, 730], [600, 690], [650, 760], [550, 780], [450, 810]], "river": [[970, 700], [1080, 750], [1160, 740], [1260, 780], [1110, 805], [990, 800]]};
const obstacles=[[275,305,520,430],[995,310,1245,430],[1265,445,1415,525],[255,580,425,675],[745,530,915,625],[1175,600,1350,708],[380,395,505,470],[665,375,790,450],[315,740,370,785],[900,550,960,590],[1000,600,1075,635],[540,545,680,615]];
const circles=[[610,480,35,23],[500,650,57,34]];
const distance=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
function walkable(p){const [x,y]=p;return x>=245&&x<=1390&&y>=390&&y<=825&&!obstacles.some(([l,t,r,b])=>x>l-7&&x<r+7&&y>t-7&&y<b+7)&&!circles.some(([cx,cy,rx,ry])=>((x-cx)/(rx+7))**2+((y-cy)/(ry+7))**2<1)}
function clear(a,b){if(!walkable(a)||!walkable(b))return false;
for(const [l,t,r,bot]of obstacles){let lo=0,hi=1;for(const [v,d,mn,mx]of [[a[0],b[0]-a[0],l-7.1,r+7.1],[a[1],b[1]-a[1],t-7.1,bot+7.1]]){if(Math.abs(d)<1e-9){if(v<mn||v>mx){lo=2;break}}else{let u=(mn-v)/d,w=(mx-v)/d;lo=Math.max(lo,Math.min(u,w));hi=Math.min(hi,Math.max(u,w))}}if(lo<=hi)return false}
for(const [x,y,rx,ry]of circles){const u=[(a[0]-x)/(rx+7.1),(a[1]-y)/(ry+7.1)],v=[(b[0]-x)/(rx+7.1),(b[1]-y)/(ry+7.1)],dx=v[0]-u[0],dy=v[1]-u[1],t=Math.max(0,Math.min(1,-(u[0]*dx+u[1]*dy)/(dx*dx+dy*dy||1)));if((u[0]+t*dx)**2+(u[1]+t*dy)**2<=1)return false}return true}

const grid=[],lookup=new Map(),step=22;for(let y=398;y<=816;y+=step)for(let x=252;x<=1374;x+=step){if(walkable([x,y])){lookup.set(`${x},${y}`,grid.length);grid.push([x,y])}}
const adj=grid.map(([x,y])=>{let ns=[];for(let dx of [-step,0,step])for(let dy of [-step,0,step]){if(!dx&&!dy)continue;let i=lookup.get(`${x+dx},${y+dy}`);if(i!==undefined&&clear([x,y],grid[i]))ns.push(i)}return ns});
function anchor(p){let best=-1,d=Infinity;grid.forEach((q,i)=>{const v=distance(p,q);if(v<d&&clear(p,q)){best=i;d=v}});return best}
function route(start,goal){if(!walkable(start)||!walkable(goal))return null;if(clear(start,goal))return [goal.slice()];const from=anchor(start),to=anchor(goal);if(from<0||to<0)return null;const cost=grid.map(()=>Infinity),prev=grid.map(()=>-1),open=new Set([from]),done=new Set();cost[from]=0;
while(open.size){let u=-1,best=Infinity;for(const i of open){let f=cost[i]+distance(grid[i],grid[to]);if(f<best){u=i;best=f}}if(u===to)break;open.delete(u);done.add(u);for(const v of adj[u]){if(done.has(v))continue;let g=cost[u]+distance(grid[u],grid[v]);if(g<cost[v]){cost[v]=g;prev[v]=u;open.add(v)}}}
if(!isFinite(cost[to]))return null;let points=[goal.slice()],i=to;while(i!==from){points.unshift(grid[i]);i=prev[i];if(i<0)return null}points.unshift(grid[from]);let result=[],pos=start;while(points.length){let j=points.length-1;while(j>0&&!clear(pos,points[j]))j--;pos=points[j];result.push(pos.slice());points=points.slice(j+1)}return result}
function wander(id){const ps=districts[id];for(let k=0;k<40;k++){const base=ps[Math.floor(Math.random()*ps.length)],p=[base[0]+(Math.random()-.5)*100,base[1]+(Math.random()-.5)*65];if(walkable(p))return p}return ps[1].slice()}
function advance(position,waypoints,amount){const p=[...position],remaining=waypoints.map(q=>[...q]);while(remaining.length&&amount>0){const q=remaining[0],d=distance(p,q);if(d<=amount){p[0]=q[0];p[1]=q[1];amount-=d;remaining.shift()}else{p[0]+=(q[0]-p[0])/d*amount;p[1]+=(q[1]-p[1])/d*amount;amount=0}}return {position:p,waypoints:remaining}}
const api={nodes:Object.values(districts).flat(),districts,route,advance,distance,walkable,clear,wander};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TownNav=api;
})(typeof globalThis!=='undefined'?globalThis:this);
