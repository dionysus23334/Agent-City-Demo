const assert=require('node:assert/strict'),{attach}=require('../camera-gestures.js');
const c={x:100,y:100,w:1000,h:600},listeners={},captured=new Set();let taps=0,paints=0;
const svg={classList:{add(){},remove(){}},getScreenCTM:()=>{const a=400/c.w;return {a,d:a,e:40-c.x*a,f:130-c.y*a}},addEventListener:(n,f)=>listeners[n]=f,setPointerCapture:id=>captured.add(id),hasPointerCapture:id=>captured.has(id),releasePointerCapture:id=>captured.delete(id)};
const g=attach(svg,c,{apply:()=>paints++,onTap:()=>taps++,schedule:f=>{f();return 1},cancel:()=>{}});
function fire(type,id,x,y){listeners[type]({type,pointerId:id,pointerType:'touch',button:0,clientX:x,clientY:y,target:svg,preventDefault(){}})}
const screen=p=>{const m=svg.getScreenCTM();return {x:p.x*m.a+m.e,y:p.y*m.d+m.f}};
fire('pointerdown',1,140,230);fire('pointerdown',2,240,230);const anchor={x:475,y:350};
fire('pointermove',1,90,230);fire('pointermove',2,290,230);assert.equal(c.w,500);assert.deepEqual(screen(anchor),{x:190,y:230});
fire('pointermove',1,110,250);fire('pointermove',2,310,250);assert.ok(Math.abs(c.w-500)<1e-8);assert.deepEqual(screen(anchor),{x:210,y:250});
fire('pointerup',2,310,250);const x=c.x;fire('pointermove',1,130,250);assert.ok(Math.abs(c.x-(x-25))<1e-8);fire('pointerup',1,130,250);assert.equal(taps,0);
fire('pointerdown',1,200,200);fire('pointerup',1,200,200);assert.equal(taps,1);
fire('pointerdown',1,200,200);fire('pointermove',1,220,220);fire('pointerup',1,220,220);assert.equal(taps,1);
fire('pointerdown',1,100,200);fire('pointerdown',2,200,200);fire('pointermove',2,2000,200);assert.equal(c.w,430);fire('pointermove',2,101,200);assert.equal(c.w,1600);g.reset();
fire('pointerdown',1,200,200);fire('pointercancel',1,200,200);assert.equal(taps,1);fire('pointerdown',1,200,200);fire('pointerup',1,200,200);assert.equal(taps,2);assert.ok(paints>0);
console.log('PASS: pinch anchor under letterboxing, zoom limits, two-finger pan, pinch-to-pan continuity, tap suppression and cancellation recovery.');
