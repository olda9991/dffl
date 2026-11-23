const SITE_PASS_HASH='e76684407fd1113a883cc426e8829978f22ed4e087dfe64c2f22ca1f69e8b548';
const SITE_GATE_KEY='dffl_site_unlocked';
async function siteHash(s){const b=new TextEncoder().encode(s);const d=await crypto.subtle.digest('SHA-256',b);return Array.from(new Uint8Array(d)).map(x=>x.toString(16).padStart(2,'0')).join('');}
function siteGateOpen(){const g=document.getElementById('siteGate');if(g)g.hidden=false;document.body.classList.add('locked');}
function siteGateClose(){const g=document.getElementById('siteGate');if(g)g.hidden=true;document.body.classList.remove('locked');}
function lockSite(){sessionStorage.removeItem(SITE_GATE_KEY);siteGateOpen();const i=document.getElementById('sitePass');if(i)i.value='';}
async function unlockSite(){const msg=document.getElementById('siteMsg');const input=document.getElementById('sitePass');const v=input?input.value:'';if(!v){if(msg)msg.textContent='enter the password';return;}try{const h=await siteHash(v);if(h===SITE_PASS_HASH){sessionStorage.setItem(SITE_GATE_KEY,'1');siteGateClose();if(msg)msg.textContent='';}else if(msg){msg.textContent='wrong password';}}catch(e){if(msg)msg.textContent='unlock failed on this browser';}}
if(sessionStorage.getItem(SITE_GATE_KEY)==='1')siteGateClose();else siteGateOpen();
