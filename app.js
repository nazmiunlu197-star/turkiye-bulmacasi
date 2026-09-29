const home=document.getElementById("home");
const collectionScreen=document.getElementById("collectionScreen");
const placeholder=document.getElementById("placeholder");
const title=document.getElementById("placeholderTitle");

const labels={
  settings:"Ayarlar",daily:"Günün Bulmacası",journey:"Türkiye Yolculuğu",
  istanbul:"İstanbul Bulmacaları",ankara:"Ankara Bulmacaları",izmir:"İzmir Bulmacaları",
  old:"Eski Türkiye Bulmacaları",anatolia:"Anadolu Bulmacaları",culture:"Kültür ve Yaşam Bulmacaları",
  progress:"İlerleme",collection:"Koleksiyon",achievements:"Başarılar",profile:"Profil"
};

function hideAll(){
  home.hidden=true;
  collectionScreen.hidden=true;
  placeholder.hidden=true;
}

function show(name){
  hideAll();
  if(name==="home"){
    home.hidden=false;
  }else if(name==="collection"){
    collectionScreen.hidden=false;
  }else{
    placeholder.hidden=false;
    title.textContent=labels[name]||"Türkiye Bulmacası";
  }
  window.scrollTo({top:0,behavior:"smooth"});
}

document.addEventListener("click",e=>{
  const el=e.target.closest("[data-action]");
  if(el) show(el.dataset.action);
});