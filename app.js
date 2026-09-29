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
  if(fullAppRoutes[name]){location.href="fullapp.html?v=42#"+fullAppRoutes[name];return;}
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

function settingsToast(text){
  let t=settingsScreen.querySelector(".settings-live-toast");
  if(!t){t=document.createElement("div");t.className="settings-live-toast";t.style.cssText="position:absolute;left:50%;bottom:10%;transform:translateX(-50%);z-index:40;background:#5f2c18e8;color:#fff0c9;border-radius:18px;padding:8px 14px;font:700 13px Georgia;white-space:nowrap;pointer-events:none";settingsScreen.appendChild(t);}
  t.textContent=text;t.hidden=false;clearTimeout(settingsToast.timer);settingsToast.timer=setTimeout(()=>t.hidden=true,1200);
}
function addSettingHit(top,key,onText,offText,def=true){
  const b=document.createElement("button");b.type="button";b.setAttribute("aria-label",onText+" / "+offText);
  b.style.cssText=`position:absolute;right:12%;top:${top}%;width:22%;height:6%;z-index:30;border:0;background:transparent;touch-action:manipulation`;
  b.addEventListener("click",e=>{e.stopPropagation();const cur=localStorage.getItem(key);const on=cur===null?def:cur==="1";const next=!on;localStorage.setItem(key,next?"1":"0");settingsToast(next?onText:offText);});
  settingsScreen.appendChild(b);
}
function initSettingsControls(){
  if(settingsScreen.dataset.liveControls)return;settingsScreen.dataset.liveControls="1";
  addSettingHit(32.8,"tb_sfx","Ses efektleri açık","Ses efektleri kapalı",true);
  addSettingHit(39.2,"tb_music","Müzik açık","Müzik kapalı",true);
  addSettingHit(45.5,"tb_notif","Bildirimler açık","Bildirimler kapalı",true);
  addSettingHit(58.5,"tb_dark","Karanlık mod açık","Karanlık mod kapalı",false);
  const font=document.createElement("button");font.type="button";font.setAttribute("aria-label","Yazı boyutu");font.style.cssText="position:absolute;right:12%;top:52%;width:22%;height:6%;z-index:30;border:0;background:transparent;touch-action:manipulation";
  font.addEventListener("click",e=>{e.stopPropagation();const vals=["Küçük","Orta","Büyük"];const cur=localStorage.getItem("tb_font_size")||"Orta";const next=vals[(vals.indexOf(cur)+1)%vals.length];localStorage.setItem("tb_font_size",next);settingsToast("Yazı boyutu: "+next);});settingsScreen.appendChild(font);
  const store=document.createElement("button");store.type="button";store.setAttribute("aria-label","Mağaza ve reklamlar");store.style.cssText="position:absolute;left:23%;top:69%;width:54%;height:6%;z-index:30;border:0;background:transparent;touch-action:manipulation";store.addEventListener("click",e=>{e.stopPropagation();show("store")});settingsScreen.appendChild(store);
}
initSettingsControls();syncApprovedScreens();

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
  document.getElementById("cwCheck").addEventListener("click",()=>{let allCorrect=true,hasEmpty=false;words.forEach(w=>{const ans=[...w.dataset.answer];[...w.children].forEach((c,i)=>{const val=(c.textContent||"").toLocaleUpperCase("tr-TR");c.classList.remove("correct","wrong");if(!val){hasEmpty=true;allCorrect=false;return;}if(val===ans[i])c.classList.add("correct");else{c.classList.add("wrong");allCorrect=false;}});});const m=document.getElementById("cwMessage");m.textContent=allCorrect?"Tebrikler! İstanbul Bulmacası tamamlandı.":(hasEmpty?"Eksik kareler var.":"Bazı harfler yanlış.");});
}
initIstanbulCrossword();
window.addEventListener('load',()=>{if(location.hash==='achievements')setTimeout(()=>show('achievements'),60);});
