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
const LIGHT_HOME_SRC="file_0000000095d881f4a1713e208409ffb4.png";
const DARK_HOME_SRC="data:image/jpeg;base64,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";

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
  if(fullAppRoutes[name]){location.href="fullapp.html?v=48#"+fullAppRoutes[name];return;}
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
function applyVisualSettings(){
  const dark=settingBool("tb_dark",false);
  document.body.classList.toggle("tb-dark",dark);
  const homeImg=home&&home.querySelector(".reference-image");
  if(homeImg) homeImg.src=dark?DARK_HOME_SRC:LIGHT_HOME_SRC;
  document.documentElement.classList.toggle("tb-dark",dark);
  const size=localStorage.getItem("tb_font_size")||"Orta";
  document.body.classList.remove("tb-font-small","tb-font-medium","tb-font-large");
  document.body.classList.add(size==="Küçük"?"tb-font-small":size==="Büyük"?"tb-font-large":"tb-font-medium");
}
function updateSettingsUI(){
  applyVisualSettings();
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
  document.getElementById("darkToggle").onclick=()=>{const n=!settingBool("tb_dark",false);setSettingBool("tb_dark",n);applyVisualSettings();updateSettingsUI();settingMessage(n?"Karanlık mod seçildi":"Açık mod seçildi");};
  document.getElementById("fontToggle").onclick=()=>{const vals=["Küçük","Orta","Büyük"];const cur=localStorage.getItem("tb_font_size")||"Orta";const n=vals[(vals.indexOf(cur)+1)%vals.length];localStorage.setItem("tb_font_size",n);applyVisualSettings();updateSettingsUI();settingMessage("Yazı boyutu: "+n);};
  document.getElementById("aboutBtn").onclick=()=>settingMessage("Türkiye Bulmacası • v1.0.0");
  document.getElementById("supportBtn").onclick=()=>settingMessage("Destek bölümü APK sürümünde aktif olacak");
  updateSettingsUI();
}
document.addEventListener("pointerdown",()=>{if(musicEnabled())startBackgroundMusic();},{once:true});
applyVisualSettings();
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
