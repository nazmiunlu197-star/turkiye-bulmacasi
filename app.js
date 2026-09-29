const appRoot=document.getElementById("app");
const home=document.getElementById("home");
const dailyScreen=document.getElementById("dailyScreen");
const progressScreen=document.getElementById("progressScreen");
const collectionScreen=document.getElementById("collectionScreen");
const achievementsScreen=document.getElementById("achievementsScreen");
const settingsScreen=document.getElementById("settingsScreen");
const profileScreen=document.getElementById("profileScreen");
const profileName=document.getElementById("profileName");
const saveProfileName=document.getElementById("saveProfileName");
const placeholder=document.getElementById("placeholder");
const title=document.getElementById("placeholderTitle");

const labels={
  settings:"Ayarlar",daily:"Günlük Bulmaca","daily-play":"Günün Bulmacası",
  istanbul:"İstanbul Bulmacaları",ankara:"Ankara Bulmacaları",izmir:"İzmir Bulmacaları",
  old:"Eski Türkiye Bulmacaları",anatolia:"Anadolu Bulmacaları",culture:"Kültür ve Yaşam Bulmacaları",
  progress:"İlerleme",collection:"Koleksiyon",achievements:"Başarılar",profile:"Profil"
};

function hideAll(){
  [home,dailyScreen,progressScreen,collectionScreen,achievementsScreen,settingsScreen,profileScreen,placeholder].forEach(x=>x.hidden=true);
  appRoot.classList.remove("settings-mode");
}

function show(name){
  hideAll();
  if(name==="home") home.hidden=false;
  else if(name==="daily") dailyScreen.hidden=false;
  else if(name==="progress") progressScreen.hidden=false;
  else if(name==="collection") collectionScreen.hidden=false;
  else if(name==="achievements") achievementsScreen.hidden=false;
  else if(name==="settings"){settingsScreen.hidden=false;appRoot.classList.add("settings-mode");}
  else if(name==="profile") profileScreen.hidden=false;
  else{placeholder.hidden=false;title.textContent=labels[name]||"Türkiye Bulmacası";}
  window.scrollTo({top:0,behavior:"smooth"});
}

document.addEventListener("click",e=>{
  const el=e.target.closest("[data-action]");
  if(el) show(el.dataset.action);
});

const savedProfileName=localStorage.getItem("turkiyeBulmacasiProfileName");
if(savedProfileName) profileName.value=savedProfileName;

saveProfileName.addEventListener("click",()=>{
  const name=profileName.value.trim()||"Oyuncu";
  profileName.value=name;
  localStorage.setItem("turkiyeBulmacasiProfileName",name);
  saveProfileName.textContent="Kaydedildi";
  setTimeout(()=>saveProfileName.textContent="Kaydet",1200);
});
