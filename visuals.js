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
const marketArt=art;
function districtArt(id,state){
if(id==='market')return marketArt;
let s=poly('89,341 539,111 1126,366 690,675','#d8ddc8','#b3bba4')+poly('89,341 690,675 690,690 89,356','#c6ceb7')+poly('690,675 1126,366 1126,381 690,690','#bac6ad');
s+=poly('127,347 549,145 1083,370 685,642',id==='garden'?'#d5dbbd':'#e5e1cf','#bec5ac');
s+=poly('230,355 550,230 978,412 679,603','#e8e1c9','none')+poly('230,355 550,230 978,412 679,603','url(#paving)','none');
if(id==='garden'){
s+=building(221,292,128,78,85,'园丁的小屋','#9ca98d','#b5b38c');
s+=`<g>${poly('700,272 834,330 936,275 805,218','#c9d8c0')}${poly('700,272 834,330 834,227 700,169','#d0dfc6cc')}${poly('834,330 936,275 936,172 834,227','#bbd2c0cc')}${poly('700,169 834,227 936,172 804,113','#bfd2bc88')}${path('M700 169L834 227 936 172M745 188v104M790 208v104M868 209v103M903 190v102M745 188l103-56M790 208l103-56','#8d9e83',2)}${txt(820,269,'温 室',15)}</g>`;
for(const [x,y] of [[375,325],[470,290],[810,490]]){s+=poly(`${x},${y} ${x+93},${y+39} ${x+138},${y+17} ${x+45},${y-22}`,'#b2a17d','#8f9272');for(let j=0;j<8;j++)s+=use('pot',x+24+(j%4)*22+Math.floor(j/4)*17,y+(j%4)*9-Math.floor(j/4)*8,.72)}
s+=ellipse(670,425,61,35,'#b3c9b3','#8f9f84')+ellipse(670,420,55,29,'#c6dad0','#9eb7a8');s+=ellipse(648,416,9,4,'#99b094')+ellipse(684,431,11,5,'#9fb498');
s+=bench(508,539)+bench(877,393);s+=txt(677,577,'慢慢长，也很好。',14,'#8d977a');
if(state.flags.planted||state.flags.butterflies){for(let j=0;j<10;j++)s+=use('pot',735+j%5*21,310+Math.floor(j/5)*18,.9)}
if(state.flags.picnic||state.flags.fruitpicnic)s+=poly('410,460 480,488 518,467 448,440','#c2a78a','#9b9b7e')+ellipse(460,461,8,4,'#b98968');
}else if(id==='books'){
s+=building(237,297,187,105,135,'慢邮书屋','#8e9d9e','#b6ac91')+building(743,270,122,80,110,'梧桐邮局','#8d9b86','#9da884');
s+=table(530,325)+table(865,483)+bench(507,540)+bench(860,374);
for(const [x,y] of [[484,297],[803,347]]){s+=`<g transform="translate(${x} ${y}) skewY(24)"><rect width="65" height="56" fill="#bca482" stroke="#85836b"/>`;for(let j=0;j<16;j++)s+=`<rect x="${5+j%8*7}" y="${5+Math.floor(j/8)*27}" width="5" height="22" fill="${['#a0ad96','#ba927d','#abb8b2','#d0bc90'][j%4]}" stroke="#8b8b75" stroke-width=".4"/>`;s+='</g>'}
s+=ellipse(670,425,40,20,'#d2d0b8','#a5aa91');
s+=`<g transform="translate(775 316)">${path('M0 0v-42','#737e69',5)}<rect x="-12" y="-66" width="24" height="32" rx="4" fill="#8e9d82" stroke="#65765f"/>${path('M-7-54H7','#e6e2ce',2)}${txt(0,-41,'POST',6,'#f6f0dd')}</g>`;
if(state.flags.board||state.flags.windowboard)s+=`<g transform="translate(440 372)">${path('M0 0v-58M45 20v-58','#8c8265',3)}${poly('0,-58 45,-38 45,-8 0,-28','#b9a67e')}${poly('7,-48 35,-36 35,-16 7,-28','#f1e9d3')}${txt(21,-25,'消息',8)}</g>`;
s+=txt(645,582,'每本书，都等着下一位读者。',14,'#8a927d');
}else{
s+=building(238,290,136,82,102,'河岸茶馆','#94a18e','#c0ad89');
s+=poly('550,208 844,335 952,278 660,153','#a8c4c0','#8fa9a1')+path('M567 220L853 341M589 210L875 332','#dbe8dc',2);
s+=poly('603,292 761,360 851,315 692,246','#b5a784','#8c8f72');for(let i=0;i<9;i++)s+=path(`M${613+i*17} ${296+i*7.4}l88-44`,'#958e72',1);
s+=`<g transform="translate(739 298)">${path('M0 0v-47M-10 0h20M0-47l13-7','#667365',2)}${ellipse(16,-55,5,3,'#6d7666')}</g>`;
s+=ellipse(690,420,48,25,'#d9d4b9','#a6ac92')+ellipse(690,416,43,21,'#e6ddc5','#b2b49b');
s+=bench(500,500)+bench(760,475)+bench(840,428)+table(390,347);
s+=path('M560 208Q735 300 932 316','#7e8a72',1);for(let i=0;i<13;i++){let x=565+i*29,y=218+i*7.6;s+=ellipse(x,y,4,6,state.flags.concert||state.flags.lantern?'#e3c17c':'#e2d7b9','#a3a084')}
if(state.flags.lantern)s+=use('lamp',578,521,1.2);
s+=txt(644,590,'晚风会替你记住这首歌。',14,'#8c967d');
}
for(const [x,y,k] of [[147,341,1.2],[1030,374,1],[971,318,.9]])s+=use('tree',x,y,k);
s+=use('lamp',410,343)+use('lamp',916,476)+use('pot',220,312)+use('pot',926,388);
s+=`<g transform="translate(1050 582)" opacity=".6">${path('M0-20V20M-20 0H20')}${txt(0,-30,'N',10)}</g>`;
return s;
}
function districtScenery(id){return id==='market'?[{y:434,svg:stall(371,414,'#b19a76','果园来信','fruit')},{y:430,svg:stall(790,410,'#a3ae8a','一束好心情','flower')},{y:568,svg:stall(750,548,'#b99683','今日烘焙','bread')},{y:518,svg:use('tree',934,518,1.1)},{y:624,svg:use('tree',683,624,.9)}]:[...(id==='books'?[{y:425,svg:use('tree',670,425,1.1)}]:[]),{y:600,svg:use('tree',760,600,1.05)},{y:536,svg:use('tree',940,536,.9)}]}

// Small lived-in places connected by gentle paths, recalling the original scene compositions.
function worldArt(state){
 const ground='175,340 700,130 1465,355 1500,650 1370,855 780,945 230,810 160,580';
 let s=ellipse(820,790,615,135,'#68705d12')+poly(ground,'#bac2a9','#98a38b',2)+`<g transform="translate(0 -9)">${poly(ground,'#dce0c7','#aab397',1)}</g>`;
 s+=path('M245 842Q650 970 1390 845','#b8cecc',48)+path('M245 842Q650 970 1390 845','#e4eade',2);
 const lane='M350 505Q460 575 650 470Q810 400 1000 485T1340 580M570 568Q650 625 585 713Q720 820 940 744T1280 788';
 s+=path(lane,'#d1cdb7',39)+path(lane,'#eae3cf',34);
 for(const points of ['290,470 460,450 650,475 680,545 520,600 325,550','940,445 1110,435 1295,545 1205,585 1000,555','365,690 520,675 675,735 610,805 400,825','950,705 1130,695 1325,770 1240,825 985,820'])s+=poly(points,'#e7e2ce','none')+poly(points,'url(#paving)','none');
 s+=ellipse(500,650,53,30,'#a5bca8','#8f9f84')+ellipse(498,645,47,24,'#c5d8ce','#a2b9aa')+ellipse(480,639,9,4,'#93ad8c')+ellipse(514,654,12,5,'#9fb498');
 s+=txt(835,190,'梧 桐 镇',23)+txt(835,210,'LITTLE PLACES, EVERYDAY STORIES',9,'#919980');
 s+=txt(370,593,'热面包与花香',10,'#98977f')+txt(1070,588,'在书页间坐一会儿',10,'#98977f')+txt(650,834,'慢慢长，也很好',10,'#98977f');
 if(state.flags.picnic||state.flags.fruitpicnic)s+=poly('700,790 765,810 800,790 735,770','#ceab91')+txt(751,795,'野餐',10);
 if(state.flags.butterflies)for(let i=0;i<5;i++)s+=txt(455+i*13,621+Math.sin(i)*12,'ʚɞ',15,'#ad9270');
 for(const [x,y]of [[547,584],[560,590],[955,675],[967,680]])s+=ellipse(x,y,4,3,'#98a38c')+ellipse(x+3,y-3,2,2,'#7d8d77');
 return s;
}
function worldScenery(state){const out=[],add=(y,svg)=>out.push({y,svg});
 for(const h of [[280,350,155,80,115,'麦麦面包店','#a4aa91','#bb947d'],[650,300,110,60,85,'露露咖啡','#949f99','#c4b68c'],[1000,350,160,80,125,'慢邮书屋','#8b9b99','#b2a389'],[1270,480,80,60,85,'梧桐邮局','#a1a78c','#c1a28c'],[260,620,100,60,80,'园丁的小屋','#9eab8f','#c7bd91'],[750,570,100,60,90,'陶陶工坊','#a7a493','#bba38d'],[1180,650,110,60,90,'河岸茶馆','#9aa59b','#b09b86']])add(h[1]+h[2]*.44,building(...h));
 add(452,stall(390,420,'#b59a7c','果园来信','fruit'));add(427,stall(675,395,'#a6b18e','一束好心情','flower'));
 for(const [x,y,r]of TownNav.fountains)add(y+r*.5,fountain(x,y,r));
 add(580,table(930,565));add(635,table(1035,610));
 add(775,poly('315,750 350,765 370,750 335,735','#b6a27c')+Array.from({length:6},(_,i)=>use('pot',325+i%3*12,750+Math.floor(i/3)*12,.5)).join(''));
 add(685,bench(690,665));add(825,bench(1020,807));
 // A glass greenhouse restores the garden's distinct silhouette.
 add(615,`<g transform="translate(545 570)">${poly('0,0 80,33 130,8 50,-25','#bdd0b5')}${poly('0,0 80,33 80,-20 0,-53','#d7e4cfbb')}${poly('80,33 130,8 130,-45 80,-20','#bfd5c3cc')}${poly('0,-53 80,-20 130,-45 50,-78','#ccdecb99')}${path('M0-53 80-20 130-45M25-43v53M53-31v53M103-32v51','#8eaa91',1.5)}${txt(65,-2,'温室',11)}</g>`);
 add(826,poly('1115,805 1190,833 1260,805 1185,777','#baa886','#8f947a')+txt(1185,811,state.flags.concert?'♫ 今晚有歌':'♫ 河岸小舞台',10));
 // Original market bunting, offset buildings, books and planted corners.
 add(390,path('M435 320Q550 410 685 335','#89917a',1)+Array.from({length:10},(_,i)=>{let t=i/10,x=447+t*225,y=335+Math.sin(t*Math.PI)*27;return poly(`${x},${y} ${x+12},${y+2} ${x+5},${y+15}`,['#bd927a','#a8b390','#d4c293'][i%3],'#919780',.5)}).join(''));
 const trees=[[220,420,.9],[535,350,.8],[870,330,.9],[1415,575,.8],[230,740,.7],[720,865,.75],[1390,800,.8],...TownNav.smallTrees];
 trees.forEach(([x,y,k],i)=>add(y,plant(x,y,k,i,use('tree-body',0,0),i<12,4,`<g class="tree-shadow">${ellipse(6,6,32,13,'#6b705621')}</g>`)));
 TownNav.shrubs.forEach(([x,y],i)=>add(y,plant(x,y,.8+(i%3)*.12,i+19,shrub(i))));
 TownNav.statues.forEach(([x,y],i)=>add(y,sculpture(x,y,i)));
 const beds=[[295,535],[455,610],[700,370],[975,425],[1210,575],[1370,625],[1155,690],[685,800],[475,830],[310,710],[780,650],[1050,680]];
 beds.forEach(([x,y],i)=>{for(let j=0;j<3;j++)add(y+j*3,plant(x+j*14-12,y+(j%2)*7,.7+(j%3)*.15,i*3+j+35,grassFlowers(i+j),false))});
 for(const [x,y]of [[540,608],[955,575],[1150,650],[710,725]])add(y,use('lamp',x,y,.7));
 if(state.flags.planted||state.flags.newplant)add(785,txt(350,800,'❀ 邻里的新花圃',10));
 if(state.flags.archive||state.flags.oralhistory)add(432,txt(1100,432,'小镇记忆展',10));
 if(state.flags.board||state.flags.windowboard)add(580,txt(1000,575,'邻里公告 · 一起做点小事',10));
 if(state.flags.lantern)add(790,path('M1090 780Q1180 800 1290 775','#7e8065',1)+[1110,1140,1170,1200,1230,1260].map(x=>ellipse(x,787,4,6,'#e1bb71')).join(''));
 return out;
}

function fountain(x,y,r){return `<g class="town-fountain" transform="translate(${x} ${y})" aria-label="庭院喷泉">${ellipse(3,9,r+7,r*.48,'#64756218')}${ellipse(0,5,r,r*.48,'#aab59b','#82947d')}${ellipse(0,0,r,r*.48,'#e0e3cd','#82947d')}${ellipse(0,-2,r-6,r*.32,'#a9cbc7','#96b7aa')}<g class="fountain-water">${ellipse(0,-2,r*.6,r*.18,'none','#e8f1e4')}${path(`M${-r*.65} -3Q0 -12 ${r*.65} -3`,'#edf3e8',1)}</g>${path('M-4-5l1-24h6l1 24Z','#8f9e86',1,'#c2ceb3')}${ellipse(0,-27,r*.4,r*.16,'#d9dfc7','#95a58d')}<g class="water-jets">${path(`M0 -29v-21M0 -46Q${-r*.6} -52 ${-r*.65} -8M0 -46Q${r*.6} -52 ${r*.65} -8`,'#93c1c4',1.8)}<g class="jet-drop jet-drop-a">${ellipse(0,-29,1.8,3,'#d1e9e6')}</g><g class="jet-drop jet-drop-b">${ellipse(0,-29,1.5,2.5,'#9dc8d1')}</g><ellipse class="water-ripple" cy="-2" rx="9" ry="3" fill="none" stroke="#edf5e6" stroke-width="1.2"/></g></g>`}

function plant(x,y,scale,i,art,leaves=false,swayBoost=0,groundArt=''){return `<g class="plant-cluster" transform="translate(${x} ${y}) scale(${scale})">${groundArt}<g class="plant-sway ${i%3?'quiet-plant':''}" style="--wind-duration:26s;--wind-delay:${-26+(x/1600)*3+(y/1000)*1.2+i%3*.25}s;--lean:${1.1+i%4*.35+swayBoost}deg">${art}</g>${leaves?`<g class="falling-leaf ${i>1?'extra-leaf':''}" style="--leaf-duration:${16+i%5*1.7}s;--leaf-delay:${-i*2.7}s">${path('M-4-65q12-7 14 2-7 7-14-2Z','#a99b65',.6,'#c6b177')}${path('M-3-64l10 2','#998b5d',.5)}</g>`:''}</g>`}
function shrub(i){return `${ellipse(1,1,23,8,'#65785618')}<path d="M-22 0q-8-14 3-18 2-15 16-10 9-13 19-2 14-2 15 12 12 8 2 18Z" fill="${['#9eaf8b','#a8b68c','#b4bc91'][i%3]}" stroke="#81936e" stroke-width="1.1"/>${path('M-13-8q2-7 8-5m6-8q6-3 8 3m0 12q7 2 10-3','#899b74',1)}`}
function grassFlowers(i){let s=path('M0 0q-2-14-7-19M1 0q3-20 8-25M-2 0q-9-7-12-7M3 0q8-12 14-12','#91a478',1.3);if(i%3!==0){for(const [x,y]of [[-6,-17],[8,-23],[15,-12]])s+=ellipse(x,y,4.5,3.2,['#d2ae9d','#e6d6a2','#cab9c5','#efe6ca'][i%4],'#a8a180')+ellipse(x,y,1.2,1.2,'#b49c64')}return s}
function sculpture(x,y,i){return `<g class="town-sculpture" transform="translate(${x} ${y})" aria-label="${i?'飞鸟雕塑':'翻开的书雕塑'}">${ellipse(3,5,25,11,'#65725b16')}${poly('-18,0 0,8 19,-1 1,-9','#c4c9b9','#8d9986')}${poly('-11,-2 0,3 12,-3 12,-26 0,-21 -11,-26','#d7dac8','#8d9986')}${i?path('M0-28q-22-8-26-29 17 4 26 20 8-20 26-25-3 22-26 34Z','#879782',1.2,'#b5c3ad'):poly('-23,-46 -2,-41 1,-35 5,-42 25,-47 24,-29 3,-24 -23,-30','#e5e5d1','#8c9a85')}${i?'':path('M1-35v11M-18-41l13 4M9-38l11-4','#a1ad95',1)}</g>`}
