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
  collection:"collection",
  profile:"profile",
  settings:"settings",
  store:"store"
};

function show(name){
  if(fullAppRoutes[name]){
    location.href="fullapp.html?v=40#"+fullAppRoutes[name];
    return;
  }
  hideAll();
  if(name==="home") home.hidden=false;
  else if(name==="istanbul") istanbulScreen.hidden=false;
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
if(savedProfileName){
  profileNameDisplay.textContent=savedProfileName;
  profileNameDisplay.classList.add("custom");
}

editProfileName.addEventListener("click",()=>{
  const current=localStorage.getItem("turkiyeBulmacasiProfileName")||"Akın";
  const next=window.prompt("Profil adını yaz:",current);
  if(next===null) return;
  const name=next.trim().slice(0,20)||"Oyuncu";
  localStorage.setItem("turkiyeBulmacasiProfileName",name);
  profileNameDisplay.textContent=name;
  profileNameDisplay.classList.add("custom");
});

function initIstanbulCrossword(){
  const root=document.getElementById("istanbulPlayable");
  if(!root) return;
  const words=[...root.querySelectorAll(".cw-word")];
  let activeWord=null, activeIndex=0;

  function buildWord(el){
    const answer=el.dataset.answer;
    el.innerHTML="";
    [...answer].forEach((_,i)=>{
      const c=document.createElement("button");
      c.type="button";
      c.className="cw-cell";
      c.dataset.index=i;
      c.addEventListener("click",()=>selectCell(el,i));
      el.appendChild(c);
    });
  }
  words.forEach(buildWord);

  function selectCell(word,i){
    root.querySelectorAll(".cw-cell").forEach(c=>c.classList.remove("active"));
    activeWord=word; activeIndex=i;
    const cell=word.children[i];
    if(cell) cell.classList.add("active");
  }
  selectCell(words[0],0);

  const letters=["Q","W","E","R","T","Y","U","I","O","P","Ğ","Ü","A","S","D","F","G","H","J","K","L","Ş","İ","Z","X","C","V","B","N","M","Ö","Ç"];
  const kb=document.getElementById("cwKeyboard");
  kb.innerHTML="";
  letters.forEach(ch=>{
    const b=document.createElement("button");
    b.type="button"; b.className="cw-key"; b.textContent=ch;
    b.addEventListener("click",()=>typeLetter(ch));
    kb.appendChild(b);
  });
  const back=document.createElement("button");
  back.type="button"; back.className="cw-key backspace"; back.textContent="⌫";
  back.addEventListener("click",eraseLetter); kb.appendChild(back);

  function typeLetter(ch){
    if(!activeWord) return;
    const cells=[...activeWord.children];
    cells[activeIndex].textContent=ch;
    cells[activeIndex].classList.remove("wrong","correct");
    if(activeIndex<cells.length-1) selectCell(activeWord,activeIndex+1);
  }
  function eraseLetter(){
    if(!activeWord) return;
    const cells=[...activeWord.children];
    if(cells[activeIndex].textContent){
      cells[activeIndex].textContent="";
    }else if(activeIndex>0){
      selectCell(activeWord,activeIndex-1);
      [...activeWord.children][activeIndex].textContent="";
    }
  }
  document.addEventListener("keydown",e=>{
    if(istanbulScreen.hidden) return;
    const k=e.key.toLocaleUpperCase("tr-TR");
    if(letters.includes(k)) typeLetter(k);
    if(e.key==="Backspace") eraseLetter();
  });

  function revealOne(){
    if(!activeWord) return;
    const answer=[...activeWord.dataset.answer];
    const cells=[...activeWord.children];
    cells[activeIndex].textContent=answer[activeIndex];
    cells[activeIndex].classList.add("correct");
  }
  document.getElementById("cwHint").addEventListener("click",revealOne);
  document.getElementById("cwLetter").addEventListener("click",revealOne);
  document.getElementById("cwWord").addEventListener("click",()=>{
    if(!activeWord) return;
    const answer=[...activeWord.dataset.answer];
    [...activeWord.children].forEach((c,i)=>{c.textContent=answer[i];c.classList.add("correct")});
  });
  document.getElementById("cwCheck").addEventListener("click",()=>{
    let allCorrect=true, hasEmpty=false;
    words.forEach(w=>{
      const ans=[...w.dataset.answer];
      [...w.children].forEach((c,i)=>{
        const val=(c.textContent||"").toLocaleUpperCase("tr-TR");
        c.classList.remove("correct","wrong");
        if(!val){hasEmpty=true;allCorrect=false;return;}
        if(val===ans[i]) c.classList.add("correct");
        else{c.classList.add("wrong");allCorrect=false;}
      });
    });
    const m=document.getElementById("cwMessage");
    m.textContent=allCorrect?"Tebrikler! İstanbul Bulmacası tamamlandı.":(hasEmpty?"Eksik kareler var.":"Bazı harfler yanlış.");
  });
}
initIstanbulCrossword();
