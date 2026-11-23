const PLAIN='abcdefghijklmnopqrstuvwxyz';
const DFFL='dflksjhgqwertzuiopmbvcxay';
const ENC={};
const DEC={};
for(let i=0;i<26;i++){ENC[PLAIN[i]]=DFFL[i];DEC[DFFL[i]]=PLAIN[i];}
const MORSE={A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',0:'-----',1:'.----',2:'..---',3:'...--',4:'....-',5:'.....',6:'-....',7:'--...',8:'---..',9:'----.'};
const MORSE_REV={};
for(const k in MORSE)MORSE_REV[MORSE[k]]=k;
const ART={
femboy:'(◕‿◕) つ♡⊂\n  /\\_/\\\n ( o.o )\n  > ^ <\n femboy mode: active',
cat:' /\\_/\\\n( o.o )\n > ^ <\n nya~ :3\n certified cat',
matthew:'  ______\n / Xx  \\\n|Matthew|\n \\__X__/\n XxMatthewMxX',
cube:'[Cube98]\n[ 98  ]\n[ USER ]\n #Cube98User'
};
const source=document.getElementById('source');
const output=document.getElementById('output');
const status=document.getElementById('status');
const live=document.getElementById('live');
let lastSource='';
function say(t){status.textContent=t;clearTimeout(say.t);say.t=setTimeout(()=>status.textContent='',2200);}
function mapText(s,map){return String(s).replace(/[a-z]/gi,c=>{const l=c.toLowerCase(),o=map[l]||l;return c===c.toUpperCase()?o.toUpperCase():o;});}
function dfflTranslate(encode){const s=encode?source.value:((output.value&&source.value===lastSource)?output.value:source.value);if(!s){output.value='';return;}output.value=mapText(s,encode?ENC:DEC);lastSource=source.value;}
function swap(){source.value=output.value;output.value='';lastSource='';source.focus();}
function clearAll(){source.value='';output.value='';lastSource='';history.replaceState(null,'',location.pathname);source.focus();}
function loadSample(){source.value='dffl makes normal text look cursed';dfflTranslate(true);source.focus();}
function shuffled(s){const a=s.split('');for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));const t=a[i];a[i]=a[j];a[j]=t;}return a.join('');}
const TOY_LABELS={femboy:'femboy mode',cat:'cat mode',matthew:'matthew mode',cube:'cube mode',femboyart:'femboy art',catart:'cat art',cubeart:'cube art',vapor:'vaporwave',echo:'echo',binary:'binary',sparkle:'sparkle'};
function toy(kind){const s=source.value;const art=kind.endsWith('art');if(!s&&!art){say('type something first');return;}let o=s;
if(kind==='femboy')o=s.replace(/(?:th|r|l)/gi,m=>m.toLowerCase()==='th'?'d':'w').replace(/\b(is|are|am)\b/gi,m=>m+', like').replace(/\s*~\s*$/,'')+' ~ (◕‿◕)';
else if(kind==='cat')o=s.replace(/(?:th|r|l)/gi,m=>m.toLowerCase()==='th'?'d':'w').replace(/\s*~\s*$/,'')+' nya~ :3';
else if(kind==='matthew')o='XxMatthewMxX: '+s.trim().split(/\s+/).map((w,i)=>i%2?w.toLowerCase():w.toUpperCase()).join(' ')+' [cube98]';
else if(kind==='cube')o='#Cube98User: '+s.trim().split(/\s+/).map(w=>'['+w+']').join(' ');
else if(kind==='femboyart')o=ART.femboy;
else if(kind==='catart')o=ART.cat;
else if(kind==='cubeart')o=ART.cube;
else if(kind==='uwu')o=s.replace(/(?:th|r|l)/gi,m=>m.toLowerCase()==='th'?'d':'w').replace(/([!?.])$/,' $1 uwu');
else if(kind==='leet')o=s.replace(/[a-z]/gi,c=>({'a':'4','e':'3','i':'1','o':'0','s':'5','t':'7'}[c.toLowerCase()]||c));
else if(kind==='rot13')o=mapText(s,{a:'n',b:'o',c:'p',d:'q',e:'r',f:'s',g:'t',h:'u',i:'v',j:'w',k:'x',l:'y',m:'z',n:'a',o:'b',p:'c',q:'d',r:'e',s:'f',t:'g',u:'h',v:'i',w:'j',x:'k',y:'l',z:'m'});
else if(kind==='reverse')o=s.split('').reverse().join('');
else if(kind==='caps')o=s.split('').map((c,i)=>i%2?c.toLowerCase():c.toUpperCase()).join('');
else if(kind==='morse')o=s.toUpperCase().split('').map(c=>MORSE[c]||(c===' '?'/':c)).join(' ');
else if(kind==='unmorse')o=s.trim().split(/\s+/).map(t=>t==='/'?' ':(MORSE_REV[t]||t)).join('');
else if(kind==='base64'){try{o=btoa(unescape(encodeURIComponent(s)));}catch(e){o='base64 failed';}}
else if(kind==='unbase64'){try{o=decodeURIComponent(escape(atob(s.trim())));}catch(e){o='not base64';}}
else if(kind==='glitch')o=s.split('').map(c=>/\s/.test(c)?c:(Math.random()<.2?DFFL[Math.floor(Math.random()*26)]:c)).join('');
else if(kind==='scream')o=s.toUpperCase().replace(/[.!?]*$/,'!!!');
else if(kind==='shuffle')o=shuffled(s);
else if(kind==='vapor')o=s.replace(/[!-~]/g,c=>String.fromCharCode(c.charCodeAt(0)+0xFEE0)).replace(/ /g,'　');
else if(kind==='echo')o=s.trim().split(/\s+/).map(w=>w+' '+w).join(' ');
else if(kind==='binary')o=s.split('').map(c=>c.charCodeAt(0).toString(2).padStart(8,'0')).join(' ');
else if(kind==='sparkle')o=s.trim().split(/\s+/).map(w=>'*'+w+'*').join(' ');
output.value=o;
lastSource='';
say((TOY_LABELS[kind]||kind)+' applied');}
async function copyText(t,msg){try{await navigator.clipboard.writeText(t);say(msg);}catch(e){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy');say(msg);}catch(x){say('copy failed');}a.remove();}}
function copyResult(){if(!output.value){say('nothing to copy');return;}copyText(output.value,'copied');}
function share(){const t=source.value||output.value;if(!t){say('nothing to share');return;}const u=new URL(location.href);u.hash='text='+encodeURIComponent(t);history.replaceState(null,'',u);copyText(u.toString(),'share link copied');}
source.addEventListener('input',()=>{if(live.checked)dfflTranslate(true);else{output.value='';lastSource='';}});
const params=new URLSearchParams(location.hash.replace(/^#/,''));
if(params.has('text')){source.value=params.get('text')||'';dfflTranslate(true);}
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
let installPrompt=null;
const installBtn=document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;if(installBtn)installBtn.hidden=false;});
if(installBtn)installBtn.addEventListener('click',async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;installBtn.hidden=true;});
window.addEventListener('appinstalled',()=>{if(installBtn)installBtn.hidden=true;});
const VISIT_KEY='dffl_olda9991_visits';
const VISIT_API='https://countapi.mileshilliard.com/api/v1';
const visitsValue=document.getElementById('visitsValue');
async function visitRequest(path){const r=await fetch(VISIT_API+path,{cache:'no-store'});if(!r.ok)throw new Error('visit api '+r.status);const d=await r.json();return d.value;}
async function refreshVisits(path){if(!visitsValue)return;try{visitsValue.textContent=Number(await visitRequest(path)).toLocaleString();}catch(e){if(visitsValue.textContent==='…')visitsValue.textContent='—';}}
async function initVisits(){if(!visitsValue)return;let hit=false;try{hit=!sessionStorage.getItem('dffl_visit_counted');}catch(e){hit=true;}await refreshVisits((hit?'/hit/':'/get/')+VISIT_KEY);if(hit){try{sessionStorage.setItem('dffl_visit_counted','1');}catch(e){}}setInterval(()=>refreshVisits('/get/'+VISIT_KEY),10000);}
initVisits();
