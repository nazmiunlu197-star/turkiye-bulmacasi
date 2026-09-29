const home=document.getElementById("home");
const placeholder=document.getElementById("placeholder");
const title=document.getElementById("placeholderTitle");

const labels={
  settings:"Ayarlar",
  daily:"Günün Bulmacası",
  journey:"Türkiye Yolculuğu",
  istanbul:"İstanbul Bulmacaları",
  ankara:"Ankara Bulmacaları",
  izmir:"İzmir Bulmacaları",
  old:"Eski Türkiye Bulmacaları",
  anatolia:"Anadolu Bulmacaları",
  culture:"Kültür ve Yaşam Bulmacaları",
  progress:"İlerleme",
  collection:"Koleksiyon",
  profile:"Profil"
};

function show(name){
  if(name==="home"){
    home.hidden=false;
    placeholder.hidden=true;
    window.scrollTo({top:0,behavior:"smooth"});
    return;
  }
  home.hidden=true;
  placeholder.hidden=false;
  title.textContent=labels[name]||"Türkiye Bulmacası";
  window.scrollTo({top:0,behavior:"smooth"});
}

document.addEventListener("click",e=>{
  const el=e.target.closest("[data-action]");
  if(el) show(el.dataset.action);
});