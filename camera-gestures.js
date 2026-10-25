/* Pointer-based pan/pinch: viewport coordinates preserve the SVG's letterboxing. */
(function(root){
function attach(svg,camera,{apply,onStart=()=>{},onTap=()=>{},minWidth=430,maxWidth=1600,schedule=requestAnimationFrame,cancel=cancelAnimationFrame}={}){
 const pointers=new Map();let base=null,blocked=false,pending=0;
 const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),mid=(a,b)=>({x:(a.x+b.x)/2,y:(a.y+b.y)/2});
 function paint(){if(!pending)pending=schedule(()=>{pending=0;apply()})}
 function rebase(){if(pending){cancel(pending);pending=0;apply()}const ps=[...pointers.values()];if(!ps.length){base=null;svg.classList.remove('dragging');return}const m=svg.getScreenCTM();if(!m||!m.a||!m.d){base=null;return}const c={...camera},p=ps.length>1?mid(ps[0],ps[1]):ps[0];base={c,m:{a:m.a,d:m.d,e:m.e,f:m.f},p:{x:p.x,y:p.y},span:ps.length>1?Math.max(1,distance(ps[0],ps[1])):0,anchor:{x:(p.x-m.e)/m.a,y:(p.y-m.f)/m.d}}}
 function down(e){if(e.pointerType==='mouse'&&e.button!==0)return;e.preventDefault();if(!pointers.size)blocked=false;onStart();pointers.set(e.pointerId,{x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,target:e.target});if(pointers.size>1)blocked=true;svg.setPointerCapture(e.pointerId);rebase()}
 function move(e){const p=pointers.get(e.pointerId);if(!p||!base)return;e.preventDefault();p.x=e.clientX;p.y=e.clientY;const ps=[...pointers.values()];if(Math.hypot(p.x-p.sx,p.y-p.sy)>7)blocked=true;
 if(ps.length>1){blocked=true;const center=mid(ps[0],ps[1]),span=Math.max(1,distance(ps[0],ps[1])),width=Math.max(minWidth,Math.min(maxWidth,base.c.w*base.span/span)),ratio=width/base.c.w;camera.w=width;camera.h=base.c.h*ratio;camera.x=base.anchor.x-((center.x-base.m.e)/base.m.a-base.c.x)*ratio;camera.y=base.anchor.y-((center.y-base.m.f)/base.m.d-base.c.y)*ratio}
 else if(blocked){camera.x=Math.max(-150,Math.min(1550-camera.w/3,base.c.x-(p.x-base.p.x)/base.m.a));camera.y=Math.max(-100,Math.min(1050-camera.h/3,base.c.y-(p.y-base.p.y)/base.m.d))}
 if(blocked){svg.classList.add('dragging');paint()}}
 function finish(e){const p=pointers.get(e.pointerId);if(!p)return;const tap=e.type==='pointerup'&&!blocked&&pointers.size===1&&Math.hypot(e.clientX-p.sx,e.clientY-p.sy)<=7;pointers.delete(e.pointerId);if(svg.hasPointerCapture(e.pointerId))svg.releasePointerCapture(e.pointerId);if(pending){cancel(pending);pending=0;apply()}rebase();if(tap)onTap(p.target);if(!pointers.size)blocked=false}
 function reset(){base=null;blocked=true;pointers.clear();svg.classList.remove('dragging');if(pending){cancel(pending);pending=0;apply()}}
 for(const [name,fn]of [['pointerdown',down],['pointermove',move],['pointerup',finish],['pointercancel',finish],['lostpointercapture',finish]])svg.addEventListener(name,fn,{passive:false});
 return {reset};
}
const api={attach};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TownGestures=api;
})(typeof globalThis!=='undefined'?globalThis:this);
