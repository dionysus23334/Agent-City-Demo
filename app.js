const NS='http://www.w3.org/2000/svg';
const map=document.getElementById('map');
const poly=(p,fill,stroke='#797965',sw=1.3)=>`<polygon points="${p}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/>`;
const path=(d,stroke='#7d806d',sw=1,fill='none')=>`<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
const ellipse=(x,y,rx,ry,fill,stroke='none')=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}"/>`;
const use=(id,x,y,s=1)=>`<use href="#${id}" transform="translate(${x} ${y}) scale(${s})"/>`;
const txt=(x,y,t,size=12,fill='#606853')=>`<text x="${x}" y="${y}" text-anchor="middle" font-family="Georgia,'Songti SC',serif" font-size="${size}" fill="${fill}">${t}</text>`;
function windowAt(x,y,w=19,h=25){return `<g transform="translate(${x} ${y}) skewY(26)"><rect x="-3" y="-3" width="${w+6}" height="${h+6}" rx="1" fill="#e6e1ce" stroke="#96947d"/><rect width="${w}" height="${h}" fill="#9da9a1" stroke="#6c7468"/>${path(`M${w/2} 0v${h}M0 ${h/2}h${w}`,'#dedcc7',1.8)}<path d="M-7-1v${h+3}M${w+6}-1v${h+3}" stroke="#9a9e82" stroke-width="5"/></g>`}
function building(x,y,w,d,h,name,roof='#8f9b91',awning='#b98770'){
let s=`<g>${poly(`${x+15},${y+8} ${x+w+25},${y+w*.44+8} ${x+w+d+30},${y+w*.44-d*.48+10} ${x+d},${y-d*.48}`,'#5b655120','none')}`;
s+=poly(`${x},${y} ${x+w},${y+w*.44} ${x+w},${y+w*.44-h} ${x},${y-h}`,'#e7dfc8');
s+=poly(`${x+w},${y+w*.44} ${x+w+d},${y+w*.44-d*.48} ${x+w+d},${y+w*.44-d*.48-h} ${x+w},${y+w*.44-h}`,'#d3cfb8');
// Stone courses and facade mouldings
for(let i=14;i<h;i+=16)s+=path(`M${x} ${y-i}l${w} ${w*.44}`,'#bbb69f',.65);
s+=path(`M${x-2} ${y-7}l${w+2} ${w*.44} ${d+3} ${-d*.48}M${x-2} ${y-h+9}l${w+2} ${w*.44} ${d+3} ${-d*.48}`,'#a6a38b',2);
let roofp=`${x-9},${y-h} ${x+w},${y+w*.44-h+4} ${x+w+d+9},${y+w*.44-d*.48-h} ${x+d/2+w},${y+w*.44-d*.24-h-46} ${x+d/2},${y-d*.24-h-46}`;
s+=poly(roofp,roof);s+=poly(roofp,'url(#tiles)');
s+=path(`M${x+d/2} ${y-d*.24-h-46}l${w} ${w*.44} ${d/2+9} ${d*-.24+46}`,'#636d65',2);
s+=path(`M${x-9} ${y-h+4}l${w+9} ${w*.44+4} ${d+9} ${-d*.48-4}`,'#5f6c61',2);
// chimney
s+=poly(`${x+w*.7},${y-h-30} ${x+w*.7+14},${y-h-24} ${x+w*.7+14},${y-h-60} ${x+w*.7},${y-h-66}`,'#b8b6a2');s+=poly(`${x+w*.7+14},${y-h-24} ${x+w*.7+23},${y-h-29} ${x+w*.7+23},${y-h-65} ${x+w*.7+14},${y-h-60}`,'#999f8b');
for(let a=20;a<w-20;a+=44)s+=windowAt(x+a,y-h+24+a*.44,19,24);
// door and downstairs windows
s+=`<g transform="translate(${x+w*.46} ${y+w*.46*.44-49}) skewY(26)"><path d="M0 49V11Q14-6 28 11V49Z" fill="#818c78" stroke="#68745e"/><path d="M6 16h16v19H6Z" fill="#b7c6bc" stroke="#e4dfc8"/><circle cx="23" cy="40" r="1.5" fill="#e5d6a8"/></g>`;
s+=windowAt(x+13,y-42+13*.44,23,25);
if(w>130)s+=windowAt(x+w-37,y-42+(w-37)*.44,23,25);
// striped shop awning
for(let i=0;i<8;i++){let a=x-4+i*w/8,b=y-52+i*w/8*.44;s+=poly(`${a},${b} ${a+w/8},${b+w/8*.44} ${a+w/8-14},${b+w/8*.44+17} ${a-14},${b+17}`,i%2?'#eee8d5':awning,'#8a8673',.7);s+=path(`M${a-14} ${b+17}v6q${w/16} 6 ${w/8} ${w/8*.44}v-6`,'#8a8673',.7,i%2?'#eee8d5':awning)}
s+=`<g transform="translate(${x+w*.50} ${y-h+69+w*.22}) skewY(26)"><rect x="-44" y="-15" width="88" height="21" rx="2" fill="#f2ecd9" stroke="#8c8b75"/>${txt(0,0,name,11)}</g>`;
// side windows
for(let i=0;i<2;i++)s+=`<g transform="translate(${x+w+15+i*28} ${y+w*.44-h+27-i*13}) skewY(-26)"><rect width="16" height="27" fill="#a4b0a4" stroke="#7e8875"/>${path('M8 0v27M0 13h16','#e3deca',1.5)}</g>`;
s+=`</g>`;return s;
}
function stall(x,y,color,label,type){let s=`<g>`;s+=poly(`${x-9},${y+13} ${x+74},${y+49} ${x+119},${y+25} ${x+35},${y-12}`,'#68705018','none');s+=poly(`${x},${y} ${x+74},${y+32} ${x+74},${y+8} ${x},${y-24}`,'#c7ad84');s+=poly(`${x+74},${y+32} ${x+106},${y+16} ${x+106},${y-8} ${x+74},${y+8}`,'#ae9472');s+=poly(`${x},${y-24} ${x+74},${y+8} ${x+106},${y-8} ${x+32},${y-40}`,'#e0cfaa');for(let i=0;i<5;i++)s+=path(`M${x+12+i*13} ${y-18+i*5.6}v23`,'#9a8567');
for(let i=0;i<12;i++){let xx=x+14+(i%4)*17+Math.floor(i/4)*7,yy=y-23+(i%4)*7-Math.floor(i/4)*4;if(type==='flower'){s+=path(`M${xx} ${yy+7}v-14`,'#87916d',2);s+=ellipse(xx,yy-9,4,4,['#d3acac','#eee1b9','#b8b6cb'][i%3]);}else if(type==='bread'){s+=`<ellipse cx="${xx}" cy="${yy}" rx="7" ry="3.5" transform="rotate(24 ${xx} ${yy})" fill="#c6a368" stroke="#947948" stroke-width=".7"/>`;}else{s+=ellipse(xx,yy,5,4,['#b78c67','#b5bd7c','#c2a261'][i%3],'#92916b')}}
s+=path(`M${x+1} ${y-18}v-66M${x+74} ${y+9}v-66M${x+106} ${y-9}v-66`,'#837b60',3);
for(let i=0;i<7;i++){let a=x-9+i*12,b=y-83+i*5.2;s+=poly(`${a},${b} ${a+12},${b+5.2} ${a+54},${b-15.8} ${a+42},${b-21}`,i%2?'#eee8d4':color,'#8c8b74',.7);s+=path(`M${a} ${b}v7q6 6 12 5.2v-7`,'#8c8b74',.7,i%2?'#eee8d4':color)}s+=txt(x+40,y+22,label,9);return s+'</g>'}
function bench(x,y){return `<g transform="translate(${x} ${y})">${path('M0 0v-15l49 21v16M5-13v-16l49 21v16','#7b8069',3)}${poly('0,-16 49,5 59,0 10,-21','#aeac89')}${path('M9-25l44 19M9-29l44 19','#9b9d7e',3)}</g>`}
let art='';
// island / landscaped perimeter
art+=poly('89,341 539,111 1126,366 690,675','#d8ddc8','#b3bba4',1.2);art+=poly('89,341 690,675 690,688 89,354','#c6ceb7','#afb9a1',1);art+=poly('690,675 1126,366 1126,379 690,688','#bcc8ae','#a8b69d',1);
art+=poly('127,347 549,145 1083,370 685,642','#e5e1cf','#c4c5b1');art+=poly('127,347 549,145 1083,370 685,642','url(#paving)','none');
// river ribbon lower left
art+=poly('59,419 156,368 679,661 591,714','#b9ceca','#8faeaa',1);art+=poly('59,419 591,714 591,727 59,432','#9dbdb6','#8faeaa',1);for(let i=0;i<20;i++){let x=95+i*24,y=427+i*13;art+=path(`M${x} ${y}l19 10m9-15 13 7`,'#e2e9d9',1.2)}
// stone river edges
art+=path('M66 416L593 706M155 365L680 658','#e9e4ce',8);art+=path('M66 412L593 702M155 361L680 654','#9fa58d',1.2);
// river boat
art+=`<g transform="translate(346 572) rotate(28)"><path d="M-37 0Q-15-16 34-7L45 0Q10 14-37 0Z" fill="#a69370" stroke="#787f68"/><path d="M-28-1H32M-10-7v13M10-7v13" stroke="#e1d0a9"/></g>`;
// planting beds back
art+=poly('471,171 544,137 678,195 608,233','#cbd3b6','#a7b394');for(let i=0;i<4;i++)art+=use('tree',505+i*38,186+i*16,.75);
art+=building(201,299,151,88,113,'梧桐面包房','#929e93','#bc927e');
art+=building(723,270,137,84,120,'旧日杂货铺','#9aa190','#9aa781');
// greenhouse style flower shop at rear middle
art+=building(505,228,111,65,83,'枝间花店','#a6b5a7','#c4baa1');
// little windows roof dormers
art+=use('pot',191,304,1.1)+use('pot',367,357,1.2)+use('pot',716,278)+use('pot',865,340);
// courtyard raised fountain
art+=ellipse(631,444,83,36,'#6a735414');art+=ellipse(621,425,68,31,'#c4c8b1','#8f9983');art+=path('M553 418v10q68 55 136 0v-10','#909c87',1,'#d6d9c3');art+=ellipse(621,418,68,29,'#e4e2ce','#8d9982');art+=ellipse(621,418,57,22,'#aec9c2','#8daba0');art+=ellipse(621,419,43,14,'none','#dbe7d9');art+=`<g class="fountain-water">${path('M586 416q35-19 70 0M593 423q28 13 56-1','#e8eee0',1.7)}</g>`;art+=path('M614 413l3-39h9l4 39q-9 8-16 0','#8e9a83',1.2,'#c5cdb6');art+=ellipse(621,375,26,11,'#d5dac5','#8f9983');art+=ellipse(621,371,26,9,'#bbd1c5','#8f9983');art+=`<g class="fountain-water">${path('M621 368v-22m0 1q-17 0-18 23m18-22q17-1 18 22','#82aca4',1.5)}</g>`;art+=ellipse(621,345,3,4,'#8aada1');
// stalls around plaza
// Market stalls are depth-sorted alongside residents.
// tables and chairs
function table(x,y){let s=ellipse(x,y+11,30,12,'#78805b15');s+=path(`M${x} ${y}v20`,'#85886d',4)+ellipse(x,y,28,13,'#d8c9a2','#939378');for(let d of [-1,1]){s+=path(`M${x+d*34} ${y+4}v14M${x+d*34+10} ${y+8}v14`,'#84896d',2);s+=poly(`${x+d*34-5},${y+1} ${x+d*34+9},${y+7} ${x+d*34+17},${y+2} ${x+d*34+3},${y-4}`,'#c7bea0')}s+=ellipse(x+1,y-2,5,3,'#eee8d4','#9e9c82')+path(`M${x-3} ${y-3}v-6h8v6`,'#a7a98d',1,'#f5f0e1');return s}
art+=table(298,382)+table(329,454)+table(944,411);
art+=bench(529,523)+bench(928,335);
// bunting across market
art+=path('M344 256Q564 373 784 290','#89917a',1.1);for(let i=0;i<17;i++){let t=(i+.2)/17,x=344+440*t,y=(1-t)*(1-t)*256+2*(1-t)*t*373+t*t*290;art+=poly(`${x},${y} ${x+12},${y+3} ${x+4},${y+18}`,['#bd927a','#a8b390','#d4c293','#b2bcb5'][i%4],'#919780',.5)}
// peripheral trees, barrels, lamp posts
art+=use('tree',143,344,1.1)+use('tree',994,323,1.15)+use('tree',1051,374,.9);
art+=use('lamp',420,291)+use('lamp',698,296)+use('lamp',1021,441)+use('lamp',464,529);
art+=use('pot',468,389)+use('pot',908,425)+use('pot',840,562);
// signpost
art+=path('M500 478v-65','#8b886b',4);art+=poly('477,414 516,414 524,420 516,426 477,426','#e4d9b9');art+=txt(500,423,'河畔集市',7);
// bridge across river
art+=poly('349,537 403,507 484,551 432,584','#e1dbc3','#949d86');for(let i=0;i<7;i++)art+=path(`M${357+i*11} ${541+i*6}l52-30`,'#aaa991',.8);art+=path('M349 537v-22l54-30v22M432 584v-22l52-33v22','#959d85',3);for(let i=0;i<5;i++)art+=path(`M${350+i*13} ${536-i*7}v-20M${433+i*12} ${582-i*7.5}v-20`,'#a1a88e',2);
// pigeons
for(let [x,y] of [[561,479],[575,489],[693,475],[704,481]])art+=`<g>${ellipse(x,y,4,2.8,'#9aa394')}${ellipse(x+3,y-4,2,2,'#859180')}${path(`M${x-1} ${y+3}v3m3-3v3`,'#8e8c72',.8)}</g>`;
// map title compass
art+=`<g transform="translate(1065 603)" opacity=".65">${path('M0-24V24M-24 0H24','#869276',1)}${poly('0,-24 -5,0 0,-4 5,0','#7b8c6d','none')}${txt(0,-34,'N',10)}${ellipse(0,0,18,18,'none','#b5bea5')}</g>`;
map.innerHTML=art;
const agents=[
{id:'lin',name:'小林',role:'旅行画师',color:'#9aa98c',hair:'#605c4b',x:523,y:462,bio:'带着一本速写本来到小镇。想把普通的日子，画成值得留下来的故事。',goal:'找一处适合画画的风景',greeting:'你好呀。你有没有发现，喷泉边的光特别好看？',thoughts:['这里的光真好。','想画下这座集市。','去河边看看吧。'],home:0},
{id:'mai',name:'麦麦',role:'面包师',color:'#c3a17e',hair:'#7d6451',x:309,y:371,bio:'每天五点起床揉面。相信刚出炉的面包，能让所有坏心情变好一点。',goal:'把今天的面包分享出去',greeting:'来得正好，面包刚出炉！你喜欢甜口还是咸口？',thoughts:['刚出炉的面包！','今天面团发得真好。','留一个给阿婆。'],home:1},
{id:'hua',name:'阿禾',role:'花店店主',color:'#a0ab80',hair:'#6c6250',x:845,y:435,bio:'认识镇上的每一株植物。正在攒钱，把闲置的小院变成大家的花园。',goal:'为公共花园挑选种子',greeting:'欢迎来枝间。今天的雏菊很精神，送你一点好心情。',thoughts:['雏菊开得真好。','花园还差一些种子。','要记得给花浇水。'],home:2},
{id:'zhou',name:'周叔',role:'果园主人',color:'#849a9d',hair:'#7c7b6c',x:427,y:448,bio:'在镇外经营一片小果园。嘴上说着不打折，装袋时总会多放一个苹果。',goal:'卖完苹果后去喝杯茶',greeting:'尝一个苹果吧，今天早上刚摘的，脆得很！',thoughts:['今年苹果很甜。','给你多装一个。','忙完就去喝茶。'],home:3},
{id:'an',name:'安安',role:'小镇邮差',color:'#b98d7e',hair:'#5f6154',x:720,y:484,bio:'骑车穿过小镇的每一条巷子。知道很多故事，却总替别人好好保管。',goal:'送完信，给自己买一束花',greeting:'你好！今天没有你的信，不过我们可以聊一会儿。',thoughts:['还有最后一封信。','今天想买一束花。','河边有新的风景。'],home:4},
{id:'po',name:'许阿婆',role:'老街居民',color:'#a3a2b3',hair:'#c5c8bc',x:573,y:533,bio:'在这里住了四十年。每天来集市坐一坐，比谁都清楚大家最近过得好不好。',goal:'在长椅上等老朋友来聊天',greeting:'孩子，坐一会儿吧。日子不用赶，慢慢来就好。',thoughts:['今天太阳真好。','好久没这么热闹了。','等老朋友来坐坐。'],home:5}
];
const spots=[[527,462],[312,372],[847,438],[427,449],[733,484],[573,533],[540,371],[726,352],[892,470],[686,548],[481,493],[383,387]];
const nav=[[527,462],[500,420],[540,371],[650,329],[726,352],[744,420],[733,484],[686,548],[573,533],[481,493],[427,449],[383,387],[312,372],[847,438],[892,470]];
// The central fountain is an obstacle; route pedestrians around it.
function route(a,goal){const forbidden=(p,q)=>{for(let t=0;t<=1;t+=.06){let x=p[0]+(q[0]-p[0])*t,y=p[1]+(q[1]-p[1])*t;if([[621,424,87,51],[422,408,55,25],[844,410,55,22],[803,547,55,26]].some(o=>((x-o[0])/o[2])**2+((y-o[1])/o[3])**2<1))return true}return false};let nodes=[[a.x,a.y],...nav,goal],n=nodes.length,d=Array(n).fill(Infinity),prev=Array(n).fill(-1),done=new Set();d[0]=0;for(let k=0;k<n;k++){let u=-1;for(let j=0;j<n;j++)if(!done.has(j)&&(u<0||d[j]<d[u]))u=j;if(u<0||!isFinite(d[u]))break;done.add(u);for(let v=0;v<n;v++){let len=Math.hypot(nodes[u][0]-nodes[v][0],nodes[u][1]-nodes[v][1]);if(len>195&&v!==n-1)continue;if(!forbidden(nodes[u],nodes[v])&&d[u]+len<d[v]){d[v]=d[u]+len;prev[v]=u}}}let r=[],i=n-1;if(prev[i]<0)return[];while(i>0){r.unshift(nodes[i]);i=prev[i]}return r;}
function personSvg(a){return `<ellipse class="person-ring" cy="0" rx="18" ry="9"/>${ellipse(0,1,9,4,'#57654826')}<g class="body">${path('M-4-9l-1 10M4-9l2 10','#5e6453',3.5)}<path d="M-6-27Q0-31 6-27L9-11Q0-6-9-11Z" fill="${a.color}" stroke="#626b56" stroke-width="1"/>${path('M-7-25l-5 14M7-25l5 12','#8c8971',3)}<ellipse cy="-35" rx="6.8" ry="8" fill="#d8bea0" stroke="#817b64" stroke-width=".8"/><path d="M-7-35q-3-14 8-11 8 0 6 11l-4-7q-4 5-10 2Z" fill="${a.hair}"/>${a.id==='mai'?'<path d="M-8-41q-6-10 2-10 5-7 9 0 9 0 5 10Z" fill="#eee9d9" stroke="#9b9a83"/>':a.id==='zhou'?'<ellipse cy="-43" rx="11" ry="3" fill="#c3b28a" stroke="#8b8b6b"/><path d="M-6-43v-5q6-5 12 0v5" fill="#c3b28a" stroke="#8b8b6b"/>':''}${a.id==='lin'||a.id==='an'?'<path d="M-7-25l15 13M3-17l7 2v10H2Z" fill="#ba9a71" stroke="#8e8061"/>':''}</g><text class="agent-name" y="17">${a.name}</text><rect class="hit" x="-23" y="-55" width="46" height="80"/><g class="bubble" style="display:none"><rect x="-60" y="-78" width="120" height="23" rx="7" fill="#fcfaf0" stroke="#cbd2bc"/><path d="M-3-55l3 5 4-5" fill="#fcfaf0" stroke="#cbd2bc"/><text y="-63"></text></g>`}
let selected=null,paused=false,speed=1,minutes=540,tick=0,last=0,eventCounter=0;
const people=document.getElementById('people');
const scenery=[{y:434,svg:stall(371,414,'#b19a76','果园来信','fruit')},{y:430,svg:stall(790,410,'#a3ae8a','一束好心情','flower')},{y:568,svg:stall(750,548,'#b99683','今日烘焙','bread')},{y:518,svg:use('tree',934,518,1.1)},{y:624,svg:use('tree',683,624,.9)}].map(o=>{o.el=document.createElementNS(NS,'g');o.el.innerHTML=o.svg;o.el.style.pointerEvents='none';people.appendChild(o.el);return o});
agents.forEach((a,i)=>{a.memory=[];a.affinity=12;a.messages=[{text:a.greeting}];a.wait=3+i*2;a.route=[];a.status=a.goal;a.el=document.createElementNS(NS,'g');a.el.setAttribute('class','person');a.el.setAttribute('role','button');a.el.setAttribute('tabindex','0');a.el.setAttribute('aria-label',`与${a.name}互动，${a.role}`);a.el.innerHTML=personSvg(a);a.el.addEventListener('pointerdown',()=>select(a));a.el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(a)}});people.appendChild(a.el);a.el.setAttribute('transform',`translate(${a.x} ${a.y})`)});
function avatar(a){return `<svg viewBox="-19 -53 38 63" class="avatar" aria-hidden="true">${personSvg(a).split('<text class="agent-name"')[0]}</svg>`}
document.getElementById('resident-list').innerHTML=agents.map(a=>`<button class="resident-card" data-id="${a.id}" aria-label="认识${a.name}">${avatar(a)}<b>${a.name}</b><small>${a.role}</small></button>`).join('');
document.querySelectorAll('.resident-card').forEach(b=>b.onclick=()=>select(agents.find(a=>a.id===b.dataset.id)));
const panel=document.getElementById('panel');
function select(a){const again=selected===a;selected=a;if(!a.walkingInvite){a.route=[];a.status='停下来，和你聊天'}a.wait=12;agents.forEach(b=>b.el.classList.toggle('selected',b===a));document.querySelectorAll('.resident-card').forEach(b=>b.classList.toggle('active',b.dataset.id===a.id));panel.hidden=false;panel.innerHTML=`<button class="close" aria-label="关闭居民面板">×</button><div class="panel-tag">A LITTLE LIFE IN PAPER TOWN</div><div class="profile"><div class="portrait">${avatar(a)}</div><div><h2>${a.name}</h2><small>${a.role} · 梧桐镇居民</small></div></div><p class="bio">${a.bio}</p><div class="status-box"><div><span>正在做</span><b id="agent-status" style="font-weight:400"></b></div><div><span>小目标</span>${a.goal}</div></div><div class="mood-row"><span>☀ 心情不错</span><span id="affinity"></span></div><div class="chat"><div class="messages" id="messages" aria-live="polite"></div><form class="chat-form"><input aria-label="对居民说的话" placeholder="打个招呼，或问问今天的计划…" maxlength="160" autocomplete="off"><button aria-label="发送消息">↑</button></form><div class="actions"><button id="gift">❀ 送一份小礼物</button><button id="walk">↗ 一起散散步</button></div></div><div class="memory" id="memory"></div>`;panel.querySelector('.close').onclick=closePanel;panel.querySelector('form').onsubmit=e=>{e.preventDefault();let input=panel.querySelector('input'),t=input.value.trim();if(!t)return;input.value='';talk(a,t)};document.getElementById('gift').onclick=()=>gift(a);document.getElementById('walk').onclick=()=>walk(a);renderPanel();bubble(a,again?a.thoughts[Math.floor(Math.random()*3)]:a.greeting,7);if(!again)log(`你走近了${a.name}。`)}
function closePanel(){panel.hidden=true;selected=null;agents.forEach(a=>a.el.classList.remove('selected'));document.querySelectorAll('.resident-card').forEach(a=>a.classList.remove('active'))}
function renderPanel(){if(!selected)return;let a=selected;document.getElementById('agent-status').textContent=a.status;document.getElementById('affinity').textContent=`熟悉度 ${a.affinity} / 100`;let box=document.getElementById('messages');box.replaceChildren();a.messages.slice(-20).forEach(m=>{let p=document.createElement('div');p.className='message'+(m.you?' you':'');p.textContent=m.text;box.appendChild(p)});box.scrollTop=box.scrollHeight;document.getElementById('memory').replaceChildren();let strong=document.createElement('strong');strong.textContent='记住的小事';document.getElementById('memory').append(strong,document.createElement('br'),document.createTextNode(a.memory.length?a.memory.slice(-2).join('；'):'我们刚认识，故事还在慢慢开始。'))}
function time(){return `${String(Math.floor(minutes/60)%24).padStart(2,'0')}:${String(Math.floor(minutes%60)).padStart(2,'0')}`}
function log(text){let row=document.createElement('div');row.className='journal-line';let t=document.createElement('time');t.textContent=time();let s=document.createElement('span');s.textContent=text;row.append(t,s);let j=document.getElementById('journal');j.prepend(row);while(j.children.length>24)j.lastChild.remove()}
let toastTimer;function toast(t){let el=document.getElementById('toast');el.textContent=t;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),4200)}
function bubble(a,t,dur=5){a.bubbleTime=dur;if(!a.bub){a.bub=document.createElement('div');a.bub.className='bub';document.getElementById('bubbles').appendChild(a.bub)}a.bub.textContent=t.length>34?t.slice(0,33)+'…':t;a.bub.classList.add('show');placeBubbles()}
function placeBubbles(){const m=document.getElementById('scene').getScreenCTM(),w=document.querySelector('.scene-wrap').getBoundingClientRect();if(!m)return;agents.forEach(a=>{if(!a.bub)return;const h=a.bub.offsetHeight||40,hw=(a.bub.offsetWidth||120)/2,x=a.x*m.a+m.e-w.left,y=(a.y-56)*m.d+m.f-w.top;a.bub.style.left=Math.min(Math.max(x,hw+8),w.width-hw-8)+'px';a.bub.style.top=Math.max(y,h+10)+'px'})}
function talk(a,t){a.messages.push({text:t,you:true});let r;if(/你好|嗨|hello|hi/i.test(t))r=a.greeting;else if(/记得|记忆|记住/.test(t))r=a.memory.length?'当然记得，'+a.memory.slice(-2).join('，')+'。':'我们刚认识呢，不过我会记得今天和你说过话。';else if(/计划|打算|做什么|目标|忙/.test(t))r='我今天想'+a.goal+'。你愿意的话，可以陪我逛一会儿。';else if(/名字|你是谁/.test(t))r=`我叫${a.name}，是镇上的${a.role}。${a.bio}`;else if(/花|种子|花园/.test(t))r=a.id==='hua'?'我想在旧院子里种雏菊和迷迭香。等花园开了，大家都可以来坐。':'阿禾的花摊就在广场东边。她最近在为公共花园攒种子，你可以去问问她。';else if(/面包|吃|饿|甜|咸/.test(t))r=a.id==='mai'?'甜口推荐蜂蜜小面包，咸口试试迷迭香餐包。今天都还有，热乎的最好吃。':'去面包房找麦麦吧，她总会给早起的人留一份热面包。';else if(/苹果|水果|买/.test(t))r=a.id==='zhou'?'苹果是今早摘的。我给你挑个红的，尝完喜欢再买。':'周叔的水果摊在喷泉西边。他的苹果很脆，买的时候记得和他聊聊果园。';else if(/再见|拜拜/.test(t))r='下次见，记得再来集市走走呀。';else if(/天气|太阳|晴/.test(t))r='今天的风很舒服，阳光也刚刚好。这样的天气，真舍不得待在屋里。';else r=`“${t.length>22?t.slice(0,22)+'…':t}”——我听到了。${a.thoughts[a.messages.length%a.thoughts.length]} 你也可以问我今天的计划，或者邀请我散步。`;a.messages.push({text:r});a.affinity=Math.min(100,a.affinity+2);a.memory.push(`你和我聊了“${t.slice(0,16)}”`);bubble(a,r);renderPanel();log(`你和${a.name}聊了一会儿。`)}
function gift(a){if(a.gifts>=3){toast('心意已经收到啦，陪 TA 聊聊天吧。');return}a.gifts=(a.gifts||0)+1;a.affinity=Math.min(100,a.affinity+10);a.memory.push('你送了我一份小礼物');let r=a.id==='hua'?'谢谢！我把这份心意也种进未来的小花园。':'谢谢你呀，今天又多了一件开心的小事。';a.messages.push({text:'送给你一份小礼物。',you:true},{text:r});bubble(a,'谢谢你的礼物！');log(`${a.name}收到你的小礼物，笑了起来。`);renderPanel();toast(`你与${a.name}的熟悉度 +10`)}
function walk(a){a.route=route(a,[573,533]);a.status='赴约去河边散步';a.wait=15;a.walkingInvite=true;a.memory.push('你邀请我去河边散步');a.messages.push({text:'一起去河边散步吧。',you:true},{text:'好呀，我们到河边长椅那里见。'});bubble(a,'好呀，去河边！');log(`${a.name}答应了你的散步邀请。`);renderPanel();if(paused)toast('邀请已收到，继续播放后居民会出发。')}
let nextSocial=12;
function frame(now){let dt=Math.min((now-last)/1000,2);last=now;if(!paused){let delta=dt*speed;minutes+=delta*.35;tick+=delta;document.getElementById('clock').textContent=time();agents.forEach((a,i)=>{if(a.bubbleTime>0){a.bubbleTime-=delta;if(a.bubbleTime<=0&&a.bub)a.bub.classList.remove('show')}if(a.route.length){let p=a.route[0],dx=p[0]-a.x,dy=p[1]-a.y,dist=Math.hypot(dx,dy),step=delta*(12+i*.6);if(dist<=step){a.x=p[0];a.y=p[1];a.route.shift();if(!a.route.length){a.wait=7+Math.random()*10;a.status=a.walkingInvite?'在河边等你，慢慢聊':a.goal;if(a.walkingInvite){a.walkingInvite=false;bubble(a,'这里坐坐吧。');log(`${a.name}到了河边长椅，等你一起看风景。`)}if(selected===a)document.getElementById('agent-status').textContent=a.status}}else{a.x+=dx/dist*step;a.y+=dy/dist*step}a.el.classList.add('moving')}else{a.el.classList.remove('moving');a.wait-=delta;if(a.wait<0&&selected!==a){let target=spots[Math.floor(Math.random()*spots.length)];a.route=route(a,target);a.status='在集市里慢慢逛';a.wait=5;bubble(a,a.thoughts[Math.floor(Math.random()*3)])}}a.el.setAttribute('transform',`translate(${a.x.toFixed(2)} ${a.y.toFixed(2)})`)});{const o=[...agents,...scenery].sort((a,b)=>a.y-b.y);if(o.some((q,i)=>people.children[i]!==q.el))o.forEach(q=>people.appendChild(q.el))}if(tick>nextSocial){nextSocial=tick+20;let a=agents[Math.floor(Math.random()*agents.length)];bubble(a,a.thoughts[Math.floor(Math.random()*3)]);log(`${a.name}：${a.thoughts[Math.floor(tick)%3]}`)}}placeBubbles();setTimeout(()=>frame(performance.now()),33)}frame(performance.now());
document.getElementById('pause').onclick=()=>{paused=!paused;document.body.classList.toggle('paused',paused);let b=document.getElementById('pause');b.textContent=paused?'▶':'Ⅱ';b.setAttribute('aria-label',paused?'继续小镇':'暂停小镇');b.title=paused?'继续小镇':'暂停小镇'};document.querySelectorAll('.speed').forEach(b=>b.onclick=()=>{speed=Number(b.dataset.speed);document.querySelectorAll('.speed').forEach(s=>s.classList.toggle('active',s===b))});
const events=[{text:'面包出炉了！麦麦邀请大家来尝一口。',replies:['闻到面包香了。','刚烤好的，快来！','给我留一个！','苹果配面包刚好。','送完信就过去。','还是熟悉的味道。'],point:[360,386]},{text:'一阵秋风吹来，阿禾的花瓣飘到了广场。',replies:['想把这一幕画下来。','花瓣落在围裙上了。','秋天真的来了。','风里都有花香。','捡一片夹进书里。','这风可真舒服。'],point:[810,466]},{text:'许阿婆讲起了集市四十年前的故事。',replies:['我来画，你来讲。','以前也有面包房吗？','那时有花店吗？','我小时候就在这儿。','今天有新故事了。','那时，这儿还是田呢。'],point:[573,533]}];
document.getElementById('event').onclick=()=>{let e=events[eventCounter++%events.length];toast(e.text);log(e.text);agents.forEach((a,i)=>{bubble(a,e.replies[i]);a.memory.push(e.text);if(selected!==a){a.route=route(a,[e.point[0]+(i%3-1)*28,e.point[1]+Math.floor(i/3)*26]);a.status='去看看集市里的新鲜事'}});renderPanel()};
const guide=document.getElementById('guide');document.getElementById('help').onclick=()=>guide.showModal();document.getElementById('close-guide').onclick=document.getElementById('start').onclick=()=>guide.close();document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(world.classList.contains('fs'))toggleFs();else closePanel()}else if((e.key==='f'||e.key==='F')&&e.target.tagName!=='INPUT')toggleFs()});
log('集市开张了。六位居民，六个慢慢开始的故事。');log('麦麦打开了面包房的门，空气里有了麦香。');

// ---- fullscreen ----
const world=document.querySelector('.world'),fb=document.getElementById('full');
const fsOn=()=>document.fullscreenElement===world||world.classList.contains('fs');
const syncFs=()=>{fb.textContent=fsOn()?'⤡ 退出全屏':'⤢ 全屏';setTimeout(placeBubbles,60)};
function toggleFs(){if(document.fullscreenElement){document.exitFullscreen();return}if(world.classList.contains('fs')){world.classList.remove('fs');document.body.classList.remove('lock');syncFs();return}const fake=()=>{world.classList.add('fs');document.body.classList.add('lock');syncFs()};world.requestFullscreen?world.requestFullscreen().catch(fake):fake()}
fb.onclick=toggleFs;document.addEventListener('fullscreenchange',syncFs);addEventListener('resize',placeBubbles);
