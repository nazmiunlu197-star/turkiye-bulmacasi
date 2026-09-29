const appRoot=document.getElementById("app");
const home=document.getElementById("home");
const istanbulScreen=document.getElementById("istanbulScreen");
const dailyScreen=document.getElementById("dailyScreen");
const progressScreen=document.getElementById("progressScreen");
const collectionScreen=document.getElementById("collectionScreen");
const achievementsScreen=document.getElementById("achievementsScreen");
const settingsScreen=document.getElementById("settingsScreen");
const profileScreen=document.getElementById("profileScreen");
const profileNameDisplay=document.getElementById("profileNameDisplay");
const editProfileName=document.getElementById("editProfileName");
const placeholder=document.getElementById("placeholder");
const title=document.getElementById("placeholderTitle");

const labels={
  settings:"Ayarlar",daily:"Günlük Bulmaca","daily-play":"Günün Bulmacası",
  istanbul:"İstanbul Bulmacaları",ankara:"Ankara Bulmacaları",izmir:"İzmir Bulmacaları",
  old:"Eski Türkiye Bulmacaları",anatolia:"Anadolu Bulmacaları",culture:"Kültür ve Yaşam Bulmacaları",
  progress:"İlerleme",collection:"Koleksiyon",achievements:"Başarılar",profile:"Profil"
};

function hideAll(){
  [home,istanbulScreen,dailyScreen,progressScreen,collectionScreen,achievementsScreen,settingsScreen,profileScreen,placeholder].forEach(x=>x.hidden=true);
  appRoot.classList.remove("settings-mode");
}

const fullAppRoutes={
  istanbul:"istanbul",
  "daily-play":"general",
  progress:"progress",
  store:"store"
};

function readLegacySave(){
  try{return JSON.parse(localStorage.getItem("turkiyeBulmacasiSaveV1")||"{}")}catch(e){return {}}
}

function syncApprovedScreens(){
  const save=readLegacySave();
  const done=Array.isArray(save.completed)?save.completed.length:0;
  const oldName=localStorage.getItem("tb_profile_name");
  const newName=localStorage.getItem("turkiyeBulmacasiProfileName");
  const name=(newName||oldName||"Akın").trim().slice(0,20)||"Oyuncu";
  if(profileNameDisplay){profileNameDisplay.textContent=name;profileNameDisplay.classList.add("custom");}
}

function show(name){
  if(fullAppRoutes[name]){location.href="fullapp.html?v=45#"+fullAppRoutes[name];return;}
  hideAll();
  if(name==="home") home.hidden=false;
  else if(name==="istanbul") istanbulScreen.hidden=false;
  else if(name==="daily") dailyScreen.hidden=false;
  else if(name==="progress") progressScreen.hidden=false;
  else if(name==="collection"){syncApprovedScreens();collectionScreen.hidden=false;}
  else if(name==="achievements") achievementsScreen.hidden=false;
  else if(name==="settings"){settingsScreen.hidden=false;appRoot.classList.add("settings-mode");}
  else if(name==="profile"){syncApprovedScreens();profileScreen.hidden=false;}
  else{placeholder.hidden=false;title.textContent=labels[name]||"Türkiye Bulmacası";}
  window.scrollTo({top:0,behavior:"smooth"});
}

document.addEventListener("click",e=>{const el=e.target.closest("[data-action]");if(el) show(el.dataset.action);});

const savedProfileName=localStorage.getItem("turkiyeBulmacasiProfileName")||localStorage.getItem("tb_profile_name");
if(savedProfileName){profileNameDisplay.textContent=savedProfileName;profileNameDisplay.classList.add("custom");}

editProfileName.addEventListener("click",()=>{
  const current=localStorage.getItem("turkiyeBulmacasiProfileName")||localStorage.getItem("tb_profile_name")||"Akın";
  const next=window.prompt("Profil adını yaz:",current);
  if(next===null) return;
  const name=next.trim().slice(0,20)||"Oyuncu";
  localStorage.setItem("turkiyeBulmacasiProfileName",name);
  localStorage.setItem("tb_profile_name",name);
  profileNameDisplay.textContent=name;
  profileNameDisplay.classList.add("custom");
});

let musicCtx=null,musicTimer=null,musicMaster=null,musicStep=0;
function musicEnabled(){const v=localStorage.getItem("tb_music");return v===null?true:v==="1";}
function sfxEnabled(){const v=localStorage.getItem("tb_sfx");return v===null?true:v==="1";}
function ensureAudio(){
  const AC=window.AudioContext||window.webkitAudioContext;
  if(!AC) return null;
  if(!musicCtx) musicCtx=new AC();
  if(musicCtx.state==="suspended") musicCtx.resume();
  return musicCtx;
}
function setMusicEnabled(on){localStorage.setItem("tb_music",on?"1":"0");if(on)startBackgroundMusic();else stopBackgroundMusic();updateSettingsUI();}
function tone(freq,dur=0.08,vol=0.08,type="sine",delay=0){
  if(!sfxEnabled()) return;
  const c=ensureAudio(); if(!c) return;
  const t=c.currentTime+delay,o=c.createOscillator(),g=c.createGain();
  o.type=type;o.frequency.setValueAtTime(freq,t);
  g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(vol,t+0.008);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
  o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+dur+0.03);
}
function playClick(){tone(520,0.045,0.055,"sine");}
function playCorrect(){tone(523.25,0.16,0.09,"sine");tone(659.25,0.2,0.08,"sine",0.09);tone(783.99,0.28,0.07,"sine",0.18);}
function playWrong(){tone(180,0.1,0.065,"triangle");tone(145,0.13,0.055,"triangle",0.07);}
function startBackgroundMusic(){
  if(!musicEnabled()||musicTimer) return;
  const c=ensureAudio(); if(!c) return;
  if(!musicMaster){
    musicMaster=c.createGain();musicMaster.gain.value=0.34;
    const filter=c.createBiquadFilter();filter.type="lowpass";filter.frequency.value=1700;filter.Q.value=.5;
    musicMaster.connect(filter);filter.connect(c.destination);
  }
  const chords=[
    [220.00,261.63,329.63],[196.00,246.94,293.66],[174.61,220.00,261.63],[196.00,246.94,329.63],
    [220.00,261.63,329.63],[164.81,220.00,261.63],[174.61,220.00,293.66],[196.00,246.94,329.63]
  ];
  const pluck=[329.63,392.00,440.00,392.00,329.63,293.66,261.63,293.66];
  const playPad=(freq,delay=0)=>{
    const t=c.currentTime+delay,o=c.createOscillator(),g=c.createGain();
    o.type="sine";o.frequency.setValueAtTime(freq,t);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.12,t+.55);
    g.gain.setValueAtTime(.12,t+2.7);g.gain.exponentialRampToValueAtTime(.0001,t+3.7);
    o.connect(g);g.connect(musicMaster);o.start(t);o.stop(t+3.8);
  };
  const playBell=(freq,delay=0)=>{
    const t=c.currentTime+delay,o=c.createOscillator(),g=c.createGain();
    o.type="triangle";o.frequency.setValueAtTime(freq,t);
    g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.075,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+1.15);
    o.connect(g);g.connect(musicMaster);o.start(t);o.stop(t+1.2);
  };
  const play=()=>{
    if(!musicEnabled()||!musicMaster) return;
    const chord=chords[musicStep%chords.length];
    chord.forEach((f,i)=>playPad(f,i*.05));
    playBell(pluck[musicStep%pluck.length],.35);
    playBell(pluck[(musicStep+2)%pluck.length]*2,.95);
    musicStep++;
  };
  play();musicTimer=setInterval(play,3600);
}
function stopBackgroundMusic(){
  if(musicTimer){clearInterval(musicTimer);musicTimer=null;}
  if(musicMaster&&musicCtx){
    const g=musicMaster;g.gain.cancelScheduledValues(musicCtx.currentTime);g.gain.setTargetAtTime(.0001,musicCtx.currentTime,.08);
    setTimeout(()=>{try{g.disconnect()}catch(e){}if(musicMaster===g)musicMaster=null;},350);
  }
}
function settingBool(key,def=true){const v=localStorage.getItem(key);return v===null?def:v==="1";}
function setSettingBool(key,val){localStorage.setItem(key,val?"1":"0");}
function settingMessage(t){const m=document.getElementById("settingsMessage");if(!m)return;m.textContent=t;clearTimeout(settingMessage.t);settingMessage.t=setTimeout(()=>m.textContent="",1300);}
function updateSettingsUI(){
  const map=[["musicToggle","tb_music",true],["sfxToggle","tb_sfx",true],["notifToggle","tb_notif",true],["darkToggle","tb_dark",false]];
  map.forEach(([id,key,def])=>{const b=document.getElementById(id);if(!b)return;const on=settingBool(key,def);b.textContent=on?"Açık":"Kapalı";b.classList.toggle("on",on);});
  const f=document.getElementById("fontToggle");if(f)f.textContent=localStorage.getItem("tb_font_size")||"Orta";
  const star=document.getElementById("settingsStars");if(star){const save=readLegacySave();star.textContent=Number.isFinite(+save.stars)?+save.stars:320;}
}
function initSettingsControls(){
  const music=document.getElementById("musicToggle");if(!music)return;
  music.onclick=()=>{const next=!settingBool("tb_music",true);setMusicEnabled(next);settingMessage(next?"Müzik açıldı":"Müzik kapatıldı");};
  document.getElementById("sfxToggle").onclick=()=>{const n=!settingBool("tb_sfx",true);setSettingBool("tb_sfx",n);updateSettingsUI();settingMessage(n?"Ses efektleri açıldı":"Ses efektleri kapatıldı");};
  document.getElementById("notifToggle").onclick=()=>{const n=!settingBool("tb_notif",true);setSettingBool("tb_notif",n);updateSettingsUI();settingMessage(n?"Bildirimler açıldı":"Bildirimler kapatıldı");};
  document.getElementById("darkToggle").onclick=()=>{const n=!settingBool("tb_dark",false);setSettingBool("tb_dark",n);updateSettingsUI();settingMessage(n?"Karanlık mod seçildi":"Açık mod seçildi");};
  document.getElementById("fontToggle").onclick=()=>{const vals=["Küçük","Orta","Büyük"];const cur=localStorage.getItem("tb_font_size")||"Orta";const n=vals[(vals.indexOf(cur)+1)%vals.length];localStorage.setItem("tb_font_size",n);updateSettingsUI();settingMessage("Yazı boyutu: "+n);};
  document.getElementById("aboutBtn").onclick=()=>settingMessage("Türkiye Bulmacası • v1.0.0");
  document.getElementById("supportBtn").onclick=()=>settingMessage("Destek bölümü APK sürümünde aktif olacak");
  updateSettingsUI();
}
document.addEventListener("pointerdown",()=>{if(musicEnabled())startBackgroundMusic();},{once:true});
initSettingsControls();syncApprovedScreens();


document.addEventListener("pointerup",e=>{const b=e.target.closest("button,[data-action],.cw-cell");if(b&&sfxEnabled())playClick();}); // data-tb-sfx-hook
function initIstanbulCrossword(){
  const root=document.getElementById("istanbulPlayable");if(!root)return;
  const words=[...root.querySelectorAll(".cw-word")];let activeWord=null,activeIndex=0;
  function buildWord(el){const answer=el.dataset.answer;el.innerHTML="";[...answer].forEach((_,i)=>{const c=document.createElement("button");c.type="button";c.className="cw-cell";c.dataset.index=i;c.addEventListener("click",()=>selectCell(el,i));el.appendChild(c);});}
  words.forEach(buildWord);
  function selectCell(word,i){root.querySelectorAll(".cw-cell").forEach(c=>c.classList.remove("active"));activeWord=word;activeIndex=i;const cell=word.children[i];if(cell)cell.classList.add("active");}
  selectCell(words[0],0);
  const letters=["Q","W","E","R","T","Y","U","I","O","P","Ğ","Ü","A","S","D","F","G","H","J","K","L","Ş","İ","Z","X","C","V","B","N","M","Ö","Ç"];
  const kb=document.getElementById("cwKeyboard");kb.innerHTML="";letters.forEach(ch=>{const b=document.createElement("button");b.type="button";b.className="cw-key";b.textContent=ch;b.addEventListener("click",()=>typeLetter(ch));kb.appendChild(b);});
  const back=document.createElement("button");back.type="button";back.className="cw-key backspace";back.textContent="⌫";back.addEventListener("click",eraseLetter);kb.appendChild(back);
  function typeLetter(ch){if(!activeWord)return;const cells=[...activeWord.children];cells[activeIndex].textContent=ch;cells[activeIndex].classList.remove("wrong","correct");if(activeIndex<cells.length-1)selectCell(activeWord,activeIndex+1);}
  function eraseLetter(){if(!activeWord)return;const cells=[...activeWord.children];if(cells[activeIndex].textContent){cells[activeIndex].textContent="";}else if(activeIndex>0){selectCell(activeWord,activeIndex-1);[...activeWord.children][activeIndex].textContent="";}}
  document.addEventListener("keydown",e=>{if(istanbulScreen.hidden)return;const k=e.key.toLocaleUpperCase("tr-TR");if(letters.includes(k))typeLetter(k);if(e.key==="Backspace")eraseLetter();});
  function revealOne(){if(!activeWord)return;const answer=[...activeWord.dataset.answer];const cells=[...activeWord.children];cells[activeIndex].textContent=answer[activeIndex];cells[activeIndex].classList.add("correct");}
  document.getElementById("cwHint").addEventListener("click",revealOne);document.getElementById("cwLetter").addEventListener("click",revealOne);
  document.getElementById("cwWord").addEventListener("click",()=>{if(!activeWord)return;const answer=[...activeWord.dataset.answer];[...activeWord.children].forEach((c,i)=>{c.textContent=answer[i];c.classList.add("correct")});});
  document.getElementById("cwCheck").addEventListener("click",()=>{let allCorrect=true,hasEmpty=false;words.forEach(w=>{const ans=[...w.dataset.answer];[...w.children].forEach((c,i)=>{const val=(c.textContent||"").toLocaleUpperCase("tr-TR");c.classList.remove("correct","wrong");if(!val){hasEmpty=true;allCorrect=false;return;}if(val===ans[i])c.classList.add("correct");else{c.classList.add("wrong");allCorrect=false;}});});const m=document.getElementById("cwMessage");m.textContent=allCorrect?"Tebrikler! İstanbul Bulmacası tamamlandı.":(hasEmpty?"Eksik kareler var.":"Bazı harfler yanlış.");if(allCorrect)playCorrect();else if(!hasEmpty)playWrong();});
}
initIstanbulCrossword();
window.addEventListener('load',()=>{if(location.hash==='achievements')setTimeout(()=>show('achievements'),60);});
