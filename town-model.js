/* Shared deterministic event rules. No API keys or external services. */
(function(root){
const initial=()=>({coins:20,bread:8,apples:12,seeds:5,wood:4,harmony:60,completed:{},flags:{}});
const labels={coins:'公共基金',bread:'面包',apples:'苹果',seeds:'种子',wood:'木料',harmony:'邻里温度'};
function affordable(state,delta){return Object.entries(delta).every(([k,v])=>Number.isFinite(v)&&Number.isFinite(state[k])&&state[k]+v>=0)}
function resolve(state,event,choice){if(state.completed[event.id]!==undefined)return {ok:false,reason:'这段故事已经完成'};if(!event.choices[choice])return {ok:false,reason:'无效选择'};const c=event.choices[choice];if(!affordable(state,c.delta))return {ok:false,reason:'公共物资不足，请选择另一种办法'};for(const [k,v] of Object.entries(c.delta))state[k]=k==='harmony'?Math.min(100,state[k]+v):state[k]+v;state.completed[event.id]=choice;if(c.flag)state.flags[c.flag]=true;return {ok:true,result:c.result};}
function restore(raw){let s=initial();if(!raw||typeof raw!=='object')return s;for(const k of Object.keys(labels))if(Number.isFinite(raw[k])&&raw[k]>=0)s[k]=Math.min(k==='harmony'?100:9999,raw[k]);if(raw.completed&&typeof raw.completed==='object')s.completed={...raw.completed};if(raw.flags&&typeof raw.flags==='object')s.flags={...raw.flags};return s}
const api={initial,labels,affordable,resolve,restore};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TownModel=api;
})(typeof globalThis!=='undefined'?globalThis:this);
