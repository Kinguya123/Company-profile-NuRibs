import { useEffect, useRef, useState, useCallback } from "react";
import "./App.css";

const SLIDES = [
  { id:1, label:"Iga Bakar", kanji:"牛骨", h1:"Iga Terbaik", h2:"Citarasa nusantara", sub:"Dimasak dengan cinta dan kesabaran sejati", bg:"linear-gradient(135deg,#1a0005 0%,#3d0010 40%,#6b0018 100%)", acc:"#ef0024", img:"/images/contoh1.jpeg" },
  { id:2, label:"Fire Wings", kanji:"醤油", h1:"Wings Fire", h2:"Anak Bangsa", sub:"Resep turun-temurun dari Fukuoka, Jepang", bg:"linear-gradient(135deg,#0d0800 0%,#2a1800 40%,#4a2c00 100%)", acc:"#eccbb6", img:"/images/wings1.jpeg" },
  { id:3, label:"Sup Iga", kanji:"味噌", h1:"Sup Iga", h2:"Warisan Leluhur", sub:"Perpaduan sempurna kedelai fermentasi pilihan", bg:"linear-gradient(135deg,#040d1a 0%,#0a1f3d 40%,#0f3060 100%)", acc:"#f9eddd", img:"/images/contoh2.jpeg" },
];

const MENU_CATS = ["Semua","Iga Bakar","Fire Wings","Minuman","Dessert"];
const MENU = [
  { id:1, cat:"Iga Bakar", name:"Ribs Sambal Bawang", desc:"Iga Bakar Otentik Nu Ribs, dengan sambal bawang, Nasi Hangat, Dan Terong Goreng", price:"39.000", spicy:0, hot:true, badge:"TERLARIS", img:"/images/ribs-sambal-bawang.jpeg" },
  { id:2, cat:"Fire Wings", name:"Chicken Fire Wings", desc:"6 Pcs Fire Wings yang mengguncang selera Pedas Indonesia", price:"28.000", spicy:4, hot:true, badge:"PEDAS", img:"/images/wings1.jpeg" },
  { id:3, cat:"Iga Bakar", name:"Shoyu Tori", desc:"Kaldu ayam jernih, kecap shoyu, bamboo shoot, wonton", price:"85.000", spicy:0, hot:true, badge:null, img:"/images/hero_shoyu.png" },
  { id:6, cat:"Sup Iga", name:"Sup Iga", desc:"Sup Iga dengan kaldu mantap dan sayuran melimpah yang menyegarkan", price:"35.000", spicy:0, hot:false, badge:null, img:"/images/sup iga1.jpeg" },
  { id:7, cat:"Sup Iga", name:"Gyoza Kukus",  desc:"6 pcs, dikukus lembut, isi udang & jahe, saus goma", price:"48.000", spicy:0, hot:false, badge:null, img:"/images/menu_gyoza.png" },
  { id:8, cat:"Minuman", name:"Es Timun Serut", desc:"Minuman Tradisional dengan Timun, soda, Sirup, es batu — segar dan citrus", price:"15.000", spicy:0, hot:false, badge:null, img:"/images/es-timun-serut.jpeg" },
  { id:9, cat:"Minuman", name:"Matcha Latte", desc:"Matcha ceremonial grade, susu oat Jepang, sedikit manis", price:"38.000", spicy:0, hot:false, badge:null, img:"/images/menu_drinks.jpeg" },
  { id:10, cat:"Dessert", name:"French Fries", desc:"Kentang Goreng yang Renyah, Gurih, Cocok untuk pelengkap Makanan", price:"15.000", spicy:0, hot:false, badge:null, img:"/images/kentang-goreng.jpeg" },
  { id:11, cat:"Dessert", name:"Roti Bakar", desc:"Hidangan Khas Barat, cocok untuk penutup mulut yang manis", price:"10.000", spicy:0, hot:false, badge:null, img:"/images/Roti bakar.jpeg" },
];

const GALLERY = [
  { id:2, label:"Outlet Resmi", size:"sm", kanji:"厨房", color:"#3d0010", emoji:"👨‍🍳", img:"/images/outlet-unjani.jpeg" },
  { id:3, label:"Bar Pemesanan", size:"sm", kanji:"ラーメン屋", color:"#6b0018", emoji:"🍶", img:"/images/dapur.jpeg" },
  { id:4, label:"Meja Kayu", size:"sm", kanji:"木目", color:"#2a1800", emoji:"🪵", img:"/images/suasana.jpeg" },
  { id:5, label:" Ribs Sambal Jozz", size:"big", kanji:"丼", color:"#0a1f3d", emoji:"🍜", img:"/images/ribs-jozz.jpeg" },
  { id:6, label:"Es Timun Serut Segar", size:"sm", kanji:"餃子", color:"#4a2c00", emoji:"🥟", img:"/images/es-timun-serut.jpeg" },
];

const STORY = [
  { year:"1998", jp:"始まり", title:"Awal Mula", desc:"Hanya dimulai dari beberapa kursi dan satu resep iga bakar (ribs) rahasia khas yang terus disempurnakan." },
  { year:"2005", jp:"成長", title:"Berkembang", desc:"Popularitas yang terus meningkat memaksa restoran untuk pindah ke lokasi yang lebih besar demi menampung antrean pelanggan setianya." },
  { year:"2012", jp:"渡航", title:"Ke Indonesia", desc:"Membawa resep andalan dan cita rasa khasnya secara resmi ke pasar Indonesia, memperkenalkan kelezatan iga bakar premium kepada masyarakat luas." },
  { year:"2018", jp:"拡大", title:"Ekspansi", desc:"Mulai hadir di berbagai kota besar di Indonesia. Meskipun mengalami perluasan, resep orisinal tidak pernah berubah dan standar kualitas bahan serta rasa tetap dijaga ketat setiap harinya." },
  { year:"2024", jp:"今日", title:"Hari Ini", desc:"Telah berkembang menjadi belasan cabang dan menyajikan ratusan ribu porsi iga kepada para pelanggan. Setiap harinya hidangan dimasak segar dari nol untuk menjaga keaslian rasa yang dicintai para penikmat kuliner." },
];

function useTypewriter(texts, speed=80, pause=2200) {
  const [display,setDisplay]=useState("");
  const [tIdx,setTIdx]=useState(0);
  const [cIdx,setCIdx]=useState(0);
  const [del,setDel]=useState(false);
  useEffect(()=>{
    const cur=texts[tIdx];let t;
    if(!del&&cIdx<cur.length) t=setTimeout(()=>setCIdx(c=>c+1),speed);
    else if(!del&&cIdx===cur.length) t=setTimeout(()=>setDel(true),pause);
    else if(del&&cIdx>0) t=setTimeout(()=>setCIdx(c=>c-1),speed/2);
    else if(del&&cIdx===0){setDel(false);setTIdx(i=>(i+1)%texts.length);}
    setDisplay(cur.slice(0,cIdx));
    return()=>clearTimeout(t);
  },[cIdx,del,tIdx,texts,speed,pause]);
  return display;
}

const Noise=()=>(
  <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.04,pointerEvents:"none",zIndex:1}} xmlns="http://www.w3.org/2000/svg">
    <filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
    <rect width="100%" height="100%" filter="url(#n)"/>
  </svg>
);

const Asanoha=({op=.05,col="#ef0024"})=>(
  <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:op,pointerEvents:"none",zIndex:0}} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id={"ash"+col.replace(/[^a-z0-9]/gi,"")} x="0" y="0" width="40" height="46" patternUnits="userSpaceOnUse">
        <g fill="none" stroke={col} strokeWidth=".7">
          <line x1="20" y1="0" x2="20" y2="46"/>
          <line x1="0" y1="11.5" x2="40" y2="34.5"/>
          <line x1="0" y1="34.5" x2="40" y2="11.5"/>
          <line x1="20" y1="0" x2="0" y2="11.5"/>
          <line x1="20" y1="0" x2="40" y2="11.5"/>
          <line x1="0" y1="11.5" x2="20" y2="23"/>
          <line x1="40" y1="11.5" x2="20" y2="23"/>
          <line x1="20" y1="23" x2="0" y2="34.5"/>
          <line x1="20" y1="23" x2="40" y2="34.5"/>
          <line x1="0" y1="34.5" x2="20" y2="46"/>
          <line x1="40" y1="34.5" x2="20" y2="46"/>
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={"url(#ash"+col.replace(/[^a-z0-9]/gi,"")+")"}/>
  </svg>
);

export default function App() {
  const [slide,setSlide]=useState(0);
  const [trans,setTrans]=useState(false);
  const [menuCat,setMenuCat]=useState("Semua");
  const [mobOpen,setMobOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const [storyVis,setStoryVis]=useState([]);
  const storyRefs=useRef([]);
  const autoRef=useRef(null);

  const typeText=useTypewriter(["Iga Terbaik Nusantara","Citarasa Iga Sejati","Rasa Mewah, Harga Mahasiswa","Satu Piring, Seribu Kenangan"],75,2200);

  const goSlide=useCallback((idx)=>{
    if(trans)return;
    setTrans(true);
    setTimeout(()=>{setSlide(idx);setTrans(false);},600);
  },[trans]);

  useEffect(()=>{
    autoRef.current=setInterval(()=>goSlide(s=>(s+1)%SLIDES.length),5000);
    return()=>clearInterval(autoRef.current);
  },[goSlide]);

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>60);
    window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);
  },[]);

  useEffect(()=>{
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){const i=parseInt(e.target.dataset.idx);setStoryVis(v=>[...new Set([...v,i])]);}});
    },{threshold:.25});
    storyRefs.current.forEach(el=>el&&obs.observe(el));
    return()=>obs.disconnect();
  },[]);

  const filtered=menuCat==="Semua"?MENU:MENU.filter(m=>m.cat===menuCat);
  const cur=SLIDES[slide];
  const R="#ef0024",C="#eccbb6",F="#f9eddd",D="#1a0005";

  const go=id=>{
    const m={Beranda:"hero",Menu:"menu",Galeri:"gallery","Kisah Kami":"story",Kontak:"contact"};
    document.getElementById(m[id])?.scrollIntoView({behavior:"smooth"});
    setMobOpen(false);
  };

  const navBtn=(txt,style={})=>(
    <button onClick={()=>go(txt)} key={txt} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'Noto Sans JP',sans-serif",fontSize:"0.88rem",fontWeight:500,letterSpacing:"0.04em",transition:"color .2s",...style}}
      onMouseEnter={e=>e.currentTarget.style.color=R}
      onMouseLeave={e=>e.currentTarget.style.color=style.color||"rgba(249,237,221,0.85)"}
    >{txt}</button>
  );

  const inp=(ph,tp="text")=>(
    <input key={ph} type={tp} placeholder={ph} style={{width:"100%",padding:"0.88rem 1.1rem",marginBottom:"1rem",background:"rgba(249,237,221,.07)",border:"1px solid rgba(249,237,221,.15)",borderRadius:8,color:F,fontFamily:"'Noto Sans JP',sans-serif",fontSize:"0.92rem",outline:"none",display:"block"}}
      onFocus={e=>e.target.style.borderColor=R} onBlur={e=>e.target.style.borderColor="rgba(249,237,221,.15)"}/>
  );

  return(
  <div style={{fontFamily:"'Noto Sans JP',sans-serif",background:F,overflowX:"hidden"}}>

  {/* ── NAV ── */}
  <header style={{position:"fixed",top:0,left:0,right:0,zIndex:300,height:72,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 clamp(1.5rem,5vw,5rem)",background:scrolled?"rgba(249,237,221,.96)":"transparent",backdropFilter:scrolled?"blur(16px)":"none",borderBottom:scrolled?"1px solid rgba(239,0,36,.12)":"none",transition:"all .4s"}}>
    <div style={{display:"flex",alignItems:"center",gap:".75rem"}}>
      {/* ── BAGIAN LOGO GAMBAR ── */}
    <img 
      src="/images/logo-nuribs.jpg" // Ganti dengan path atau URL gambar logo Anda
      alt="Logo Nu Ribs" 
      style={{
        width: 44, 
        height: 44, 
        borderRadius: "50%", // Tetap bulat, hapus baris ini jika logo Anda kotak/persegi panjang
        objectFit: "cover",
        boxShadow: "0 4px 16px rgba(239,0,36,.35)"
      }} 
    />
      <div>
        <div style={{fontFamily:"'Kaisei Decol',serif",fontSize:".62rem",letterSpacing:".25em",color:scrolled?R:F,lineHeight:1}}></div>
        <div style={{fontFamily:"'Noto Serif JP',serif",fontSize:"1.05rem",fontWeight:700,color:scrolled?D:F,letterSpacing:".1em",lineHeight:1.1}}>NU RIBS</div>
      </div>
    </div>
    <nav className="desk-nav" style={{display:"flex",alignItems:"center",gap:"2rem"}}>
      {["Beranda","Menu","Galeri","Kisah Kami"].map(l=>navBtn(l,{color:scrolled?"#3d0010":"rgba(249,237,221,0.85)"}))}
      <button onClick={()=>go("Kontak")} style={{background:R,color:F,padding:".6rem 1.5rem",borderRadius:4,fontFamily:"'Noto Sans JP',sans-serif",fontWeight:700,fontSize:".85rem",letterSpacing:".06em",border:"none",cursor:"pointer",boxShadow:"0 4px 14px rgba(239,0,36,.3)",transition:"all .25s"}}
        onMouseEnter={e=>{e.currentTarget.style.background="#c20020";e.currentTarget.style.transform="translateY(-2px)";}}
        onMouseLeave={e=>{e.currentTarget.style.background=R;e.currentTarget.style.transform="";}}
      >Reservasi</button>
    </nav>
    <button className="ham-btn" onClick={()=>setMobOpen(!mobOpen)} style={{display:"none",background:"none",border:"none",cursor:"pointer",color:scrolled?D:F,fontSize:"1.6rem"}}>{mobOpen?"✕":"☰"}</button>
  </header>

  {/* Mobile nav */}
  <div style={{position:"fixed",top:72,left:0,right:0,zIndex:299,background:D,transform:mobOpen?"translateY(0)":"translateY(-110%)",transition:"transform .4s cubic-bezier(.77,0,.175,1)",padding:"1.5rem 2rem",display:"flex",flexDirection:"column",borderBottom:`2px solid ${R}`}}>
    {["Beranda","Menu","Galeri","Kisah Kami","Kontak"].map(l=>(
      <button key={l} onClick={()=>go(l)} style={{background:"none",border:"none",borderBottom:"1px solid rgba(249,237,221,.08)",cursor:"pointer",fontFamily:"'Noto Sans JP',sans-serif",fontSize:"1.1rem",fontWeight:500,color:F,textAlign:"left",padding:".9rem 0",letterSpacing:".04em"}}>{l}</button>
    ))}
  </div>

  {/* ── HERO CAROUSEL ── */}
  <section id="hero" style={{position:"relative",height:"100vh",overflow:"hidden"}}>
    {SLIDES.map((s,i)=>(
      <div key={s.id} style={{position:"absolute",inset:0,background:`url(${s.img}) center/cover no-repeat`,opacity:i===slide?1:0,transition:"opacity .8s cubic-bezier(.4,0,.2,1)",zIndex:0}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.3),rgba(0,0,0,.7))"}}/>
      </div>
    ))}
    <Noise/>
    <Asanoha op={.06} col={cur.acc}/>

    {/* Vertical kanji strip */}
    <div style={{position:"absolute",right:"clamp(2rem,8vw,8rem)",top:"50%",transform:"translateY(-50%)",writingMode:"vertical-rl",fontFamily:"'Noto Serif JP',serif",fontSize:"clamp(3rem,6vw,5rem)",fontWeight:900,color:"rgba(255,255,255,.05)",letterSpacing:".4em",userSelect:"none",zIndex:2,transition:"color .8s"}}>
      {cur.kanji}一楽ラーメン
    </div>
    {/* Huge BG kanji */}
    <div style={{position:"absolute",right:"-2%",bottom:"-5%",fontFamily:"'Noto Serif JP',serif",fontSize:"clamp(12rem,28vw,26rem)",fontWeight:900,color:"rgba(255,255,255,.03)",userSelect:"none",zIndex:1,lineHeight:1}}>
      {cur.kanji}
    </div>
    {/* Top color bar */}
    <div style={{position:"absolute",top:0,left:0,right:0,zIndex:3,height:4,background:cur.acc,transition:"background .6s"}}/>

    {/* Main content */}
    <div style={{position:"absolute",inset:0,zIndex:10,display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 clamp(1.5rem,8vw,9rem)"}}>
      <div style={{display:"inline-flex",alignItems:"center",gap:".6rem",marginBottom:"1.5rem",alignSelf:"flex-start"}}>
        <div style={{width:36,height:1,background:R}}/>
        <span style={{fontFamily:"'Noto Sans JP',sans-serif",fontSize:".78rem",fontWeight:700,letterSpacing:".2em",color:"rgba(249,237,221,.7)",textTransform:"uppercase"}}>— Otentik Nusantara —</span>
      </div>
      <div style={{fontFamily:"'Noto Serif JP',serif",fontSize:"clamp(1.5rem,3.5vw,3rem)",fontWeight:900,color:cur.acc,letterSpacing:".3em",marginBottom:".5rem",transition:"color .6s",textShadow:`0 0 40px ${cur.acc}40`}}>{cur.kanji}</div>
      <h1 style={{fontFamily:"'Noto Serif JP',serif",fontSize:"clamp(2.8rem,7vw,7.5rem)",fontWeight:900,color:F,lineHeight:1,letterSpacing:"-.01em",marginBottom:".3rem"}}>{cur.h1}</h1>
      <h1 style={{fontFamily:"'Noto Serif JP',serif",fontSize:"clamp(2.8rem,7vw,7.5rem)",fontWeight:900,color:cur.acc,lineHeight:1,letterSpacing:"-.01em",marginBottom:"1.5rem",transition:"color .6s",textShadow:`0 0 60px ${cur.acc}50`}}>{cur.h2}</h1>
      <div style={{fontFamily:"'Noto Sans JP',sans-serif",fontSize:"clamp(.9rem,2vw,1.2rem)",fontWeight:300,color:"rgba(249,237,221,.75)",letterSpacing:".08em",marginBottom:"2.5rem",minHeight:"1.8em",display:"flex",alignItems:"center",gap:2}}>
        {typeText}<span style={{display:"inline-block",width:2,height:"1.2em",background:R,marginLeft:2,animation:"blink 1s step-end infinite"}}/>
      </div>
      <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
        <button onClick={()=>go("Menu")} style={{background:R,color:F,padding:".9rem 2.5rem",border:"none",borderRadius:4,fontFamily:"'Noto Sans JP',sans-serif",fontWeight:700,fontSize:".95rem",letterSpacing:".06em",cursor:"pointer",boxShadow:"0 8px 28px rgba(239,0,36,.4)",transition:"all .25s"}}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 14px 36px rgba(239,0,36,.5)";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 8px 28px rgba(239,0,36,.4)";}}>Lihat Menu</button>
        <button onClick={()=>go("Kisah Kami")} style={{background:"transparent",color:F,padding:".9rem 2.5rem",borderRadius:4,border:"1px solid rgba(249,237,221,.35)",fontFamily:"'Noto Sans JP',sans-serif",fontWeight:500,fontSize:".95rem",letterSpacing:".06em",cursor:"pointer",transition:"all .25s"}}
          onMouseEnter={e=>{e.currentTarget.style.background="rgba(249,237,221,.1)";e.currentTarget.style.borderColor="rgba(249,237,221,.7)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="rgba(249,237,221,.35)";}}>Kisah Kami</button>
      </div>
    </div>

    {/* Dot indicators */}
    <div style={{position:"absolute",bottom:"2.5rem",left:"clamp(1.5rem,8vw,9rem)",display:"flex",gap:".6rem",zIndex:10}}>
      {SLIDES.map((s,i)=>(
        <button key={s.id} onClick={()=>{clearInterval(autoRef.current);goSlide(i);}} style={{width:i===slide?40:10,height:10,borderRadius:5,border:"none",cursor:"pointer",background:i===slide?R:"rgba(249,237,221,.3)",transition:"all .4s"}}/>
      ))}
    </div>
    {/* Label indicators */}
    <div style={{position:"absolute",bottom:"2.5rem",right:"clamp(1.5rem,8vw,8rem)",zIndex:10,display:"flex",gap:"1.2rem"}}>
      {SLIDES.map((s,i)=>(
        <button key={s.id} onClick={()=>{clearInterval(autoRef.current);goSlide(i);}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'Noto Sans JP',sans-serif",fontSize:".75rem",fontWeight:i===slide?700:400,color:i===slide?R:"rgba(249,237,221,.4)",letterSpacing:".1em",transition:"all .3s"}}>{s.label}</button>
      ))}
    </div>
    {/* Scroll hint */}
    <div style={{position:"absolute",bottom:"2rem",left:"50%",transform:"translateX(-50%)",zIndex:10,display:"flex",flexDirection:"column",alignItems:"center",gap:".4rem",color:"rgba(249,237,221,.35)",fontSize:".65rem",letterSpacing:".2em"}}>
      scroll<div style={{width:1,height:44,background:`linear-gradient(${R},transparent)`,animation:"scrollDown 2s ease-in-out infinite"}}/>
    </div>
  </section>

  {/* ── STATS BAR ── */}
  <div style={{background:D,padding:"2.5rem clamp(1.5rem,5vw,5rem)",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem"}}>
    {[["2","Cabang Indonesia"],["18","Jam Bakar Iga"],["200K+","Iga Dihidangkan"],["2018","Tahun Berdiri"]].map(([n,l])=>(
      <div key={l} style={{textAlign:"center"}}>
        <div style={{fontFamily:"'Noto Serif JP',serif",fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,color:R}}>{n}</div>
        <div style={{fontSize:".8rem",color:"rgba(249,237,221,.55)",letterSpacing:".08em",marginTop:".25rem",fontWeight:300}}>{l}</div>
      </div>
    ))}
  </div>

  {/* ── MENU ── */}
  <section id="menu" style={{padding:"6rem clamp(1.5rem,5vw,5rem)",background:F,position:"relative"}}>
    <Asanoha op={.025} col={R}/>
    <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
      <div style={{textAlign:"center",marginBottom:"3.5rem"}}>
        <div style={{fontFamily:"'Noto Serif JP',serif",fontSize:"1.5rem",color:R,letterSpacing:".4em",marginBottom:".5rem"}}>メニュー</div>
        <h2 style={{fontFamily:"'Noto Serif JP',serif",fontSize:"clamp(2.2rem,5vw,4rem)",fontWeight:900,color:D,letterSpacing:".02em",lineHeight:1.1,marginBottom:"1rem"}}>Menu Pilihan</h2>
        <p style={{color:"#5a3030",fontWeight:300,lineHeight:1.8,maxWidth:480,margin:"0 auto",fontSize:".95rem"}}>Setiap hidangan dibuat dari bahan segar pilihan, tanpa MSG tambahan, dengan cinta dari dapur kami ke meja Anda.</p>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"1rem",marginTop:"1rem"}}>
          <div style={{height:1,width:60,background:R}}/><span style={{color:R,fontSize:"1.2rem"}}>✦</span><div style={{height:1,width:60,background:R}}/>
        </div>
      </div>

      <div style={{display:"flex",gap:".6rem",justifyContent:"center",flexWrap:"wrap",marginBottom:"2.5rem"}}>
        {MENU_CATS.map(c=>(
          <button key={c} onClick={()=>setMenuCat(c)} style={{padding:".5rem 1.4rem",borderRadius:30,border:menuCat===c?"none":"1px solid rgba(239,0,36,.25)",background:menuCat===c?R:"transparent",color:menuCat===c?F:"#3d0010",fontFamily:"'Noto Sans JP',sans-serif",fontSize:".88rem",fontWeight:600,letterSpacing:".04em",cursor:"pointer",transition:"all .25s"}}>{c}</button>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:"1.2rem"}}>
        {filtered.map(item=>(
          <div key={item.id} style={{background:"#fff8f0",border:"1px solid rgba(239,0,36,.1)",borderRadius:12,overflow:"hidden",transition:"all .3s",position:"relative"}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 16px 40px rgba(239,0,36,.12)";e.currentTarget.style.borderColor="rgba(239,0,36,.3)";}}
            onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";e.currentTarget.style.borderColor="rgba(239,0,36,.1)";}}>
            <div style={{height:180,overflow:"hidden",position:"relative"}}>
              <img src={item.img} alt={item.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .5s cubic-bezier(.4,0,.2,1)"}} className="menu-img"/>
              <div style={{position:"absolute",top:0,left:0,right:0,height:4,background:item.hot?R:C}}/>
            </div>
            {item.badge&&<div style={{position:"absolute",top:"1rem",right:"1rem",background:item.badge==="PREMIUM"?D:item.badge==="VEGAN"?"#2a5a2a":R,color:F,fontSize:".65rem",fontWeight:700,letterSpacing:".1em",padding:".2rem .6rem",borderRadius:20}}>{item.badge}</div>}
            <div style={{padding:"1.4rem"}}>
              <div style={{fontFamily:"'Noto Serif JP',serif",fontSize:".88rem",color:R,letterSpacing:".2em",marginBottom:".3rem"}}>{item.jp}</div>
              <h3 style={{fontFamily:"'Noto Serif JP',serif",fontSize:"1.2rem",fontWeight:700,color:D,marginBottom:".6rem",letterSpacing:".02em"}}>{item.name}</h3>
              <p style={{fontSize:".85rem",color:"#5a3030",lineHeight:1.7,fontWeight:300,marginBottom:"1rem"}}>{item.desc}</p>
              {item.spicy>0&&<div style={{display:"flex",gap:3,marginBottom:".8rem"}}>{Array.from({length:5}).map((_,i)=><span key={i} style={{fontSize:".75rem",opacity:i<item.spicy?1:.2}}>🌶️</span>)}</div>}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontFamily:"'Noto Serif JP',serif",fontSize:"1.15rem",fontWeight:700,color:R}}>Rp {item.price}</span>
                <button style={{background:R,color:F,border:"none",borderRadius:6,padding:".45rem 1rem",fontFamily:"'Noto Sans JP',sans-serif",fontSize:".82rem",fontWeight:700,cursor:"pointer",transition:"all .2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="#c20020";e.currentTarget.style.transform="scale(1.05)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background=R;e.currentTarget.style.transform="";}}
                >+ Pesan</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ── GALLERY ── */}
  <section id="gallery" style={{background:D,padding:"6rem clamp(1.5rem,5vw,5rem)",position:"relative",overflow:"hidden"}}>
    <Asanoha op={.05} col={R}/>
    <div style={{maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
      <div style={{textAlign:"center",marginBottom:"3.5rem"}}>
        <div style={{fontFamily:"'Noto Serif JP',serif",fontSize:"1.4rem",color:R,letterSpacing:".4em",marginBottom:".5rem"}}>ギャラリー</div>
        <h2 style={{fontFamily:"'Noto Serif JP',serif",fontSize:"clamp(2.2rem,5vw,4rem)",fontWeight:900,color:F,letterSpacing:".02em"}}>Galeri</h2>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"1rem",marginTop:"1rem"}}>
          <div style={{height:1,width:60,background:R}}/><span style={{color:R,fontSize:"1.2rem"}}>✦</span><div style={{height:1,width:60,background:R}}/>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gridTemplateRows:"240px 240px",gap:"1rem"}}>
        {GALLERY.map((g,i)=>(
          <div key={g.id} style={{borderRadius:12,gridColumn:g.size==="big"?"1/2":g.size==="wide"?"2/4":"auto",gridRow:g.size==="big"?"1/3":"auto",position:"relative",overflow:"hidden",cursor:"pointer",transition:"all .45s",border:"1px solid rgba(239,0,36,.15)"}}
            onMouseEnter={e=>{e.currentTarget.querySelector(".gal-img").style.transform="scale(1.1)";e.currentTarget.querySelector(".gal-overlay").style.opacity=1;}}
            onMouseLeave={e=>{e.currentTarget.querySelector(".gal-img").style.transform="scale(1)";e.currentTarget.querySelector(".gal-overlay").style.opacity=0;}}>
            <img src={g.img} className="gal-img" style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .6s cubic-bezier(.4,0,.2,1)"}} />
            <div className="gal-overlay" style={{position:"absolute",inset:0,background:"rgba(26,0,5,.8)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",opacity:0,transition:"opacity .3s",zIndex:2}}>
              <div style={{fontFamily:"'Noto Serif JP',serif",fontSize:"2.5rem",fontWeight:900,color:R,letterSpacing:".15em",marginBottom:".5rem"}}>{g.kanji}</div>
              <div style={{fontFamily:"'Noto Sans JP',sans-serif",fontSize:".9rem",fontWeight:500,color:F,letterSpacing:".12em"}}>{g.label}</div>
            </div>
            <Asanoha op={.1} col={R}/>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ── STORY ── */}
  <section id="story" style={{padding:"7rem clamp(1.5rem,5vw,5rem)",background:F,position:"relative",overflow:"hidden"}}>
    <Asanoha op={.022} col={R}/>
    <div style={{position:"absolute",left:"-2%",top:"50%",transform:"translateY(-50%)",fontFamily:"'Noto Serif JP',serif",fontSize:"clamp(8rem,18vw,18rem)",fontWeight:900,color:"rgba(239,0,36,.04)",userSelect:"none",lineHeight:1,pointerEvents:"none",zIndex:0}}>物語</div>
    <div style={{maxWidth:900,margin:"0 auto",position:"relative",zIndex:1}}>
      <div style={{textAlign:"center",marginBottom:"4.5rem"}}>
        <div style={{fontFamily:"'Noto Serif JP',serif",fontSize:"1.4rem",color:R,letterSpacing:".4em",marginBottom:".5rem"}}>物語</div>
        <h2 style={{fontFamily:"'Noto Serif JP',serif",fontSize:"clamp(2.2rem,5vw,4rem)",fontWeight:900,color:D,letterSpacing:".02em",lineHeight:1.1,marginBottom:".8rem"}}>Awal Mula</h2>
        <p style={{color:"#5a3030",fontWeight:300,lineHeight:1.8,maxWidth:500,margin:"0 auto",fontSize:".95rem"}}>Sebuah perjalanan dari warung kecil di Fukuoka hingga meja makan Anda hari ini.</p>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"1rem",marginTop:"1rem"}}>
          <div style={{height:1,width:60,background:R}}/><span style={{color:R,fontSize:"1.2rem"}}>✦</span><div style={{height:1,width:60,background:R}}/>
        </div>
      </div>
      <div style={{position:"relative"}}>
        <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:1,background:`linear-gradient(${R},rgba(239,0,36,.1))`,transform:"translateX(-50%)"}}/>
        {STORY.map((s,i)=>(
          <div key={s.year} data-idx={i} ref={el=>storyRefs.current[i]=el}
            style={{display:"grid",gridTemplateColumns:"1fr 60px 1fr",gap:0,marginBottom:"3.5rem",opacity:storyVis.includes(i)?1:0,transform:storyVis.includes(i)?"translateY(0)":"translateY(40px)",transition:`opacity .7s ${i*.1}s,transform .7s ${i*.1}s`}}>
            {i%2===0?(
              <div style={{padding:"0 2.5rem 0 0",textAlign:"right"}}>
                <div style={{fontFamily:"'Noto Serif JP',serif",fontSize:".9rem",color:R,letterSpacing:".25em",marginBottom:".4rem"}}>{s.jp}</div>
                <h3 style={{fontFamily:"'Noto Serif JP',serif",fontSize:"1.3rem",fontWeight:700,color:D,marginBottom:".5rem"}}>{s.title}</h3>
                <p style={{fontSize:".88rem",color:"#5a3030",lineHeight:1.75,fontWeight:300}}>{s.desc}</p>
              </div>
            ):<div/>}
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",position:"relative"}}>
              <div style={{width:48,height:48,borderRadius:"50%",background:D,border:`3px solid ${R}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 0 0 6px rgba(239,0,36,.1)",zIndex:2}}>
                <span style={{fontFamily:"'Noto Serif JP',serif",fontSize:".68rem",fontWeight:700,color:R,letterSpacing:".04em"}}>{s.year}</span>
              </div>
            </div>
            {i%2!==0?(
              <div style={{padding:"0 0 0 2.5rem"}}>
                <div style={{fontFamily:"'Noto Serif JP',serif",fontSize:".9rem",color:R,letterSpacing:".25em",marginBottom:".4rem"}}>{s.jp}</div>
                <h3 style={{fontFamily:"'Noto Serif JP',serif",fontSize:"1.3rem",fontWeight:700,color:D,marginBottom:".5rem"}}>{s.title}</h3>
                <p style={{fontSize:".88rem",color:"#5a3030",lineHeight:1.75,fontWeight:300}}>{s.desc}</p>
              </div>
            ):<div/>}
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ── CONTACT ── */}
  <section id="contact" style={{padding:"6rem clamp(1.5rem,5vw,5rem)",background:D,position:"relative",overflow:"hidden"}}>
    <Asanoha op={.055} col={R}/>
    <div style={{maxWidth:1100,margin:"0 auto",position:"relative",zIndex:1}}>
      <div style={{textAlign:"center",marginBottom:"3.5rem"}}>
        <div style={{fontFamily:"'Noto Serif JP',serif",fontSize:"1.4rem",color:R,letterSpacing:".4em",marginBottom:".5rem"}}>ご予約</div>
        <h2 style={{fontFamily:"'Noto Serif JP',serif",fontSize:"clamp(2.2rem,5vw,4rem)",fontWeight:900,color:F,letterSpacing:".02em"}}>Reservasi & Kontak</h2>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"1rem",marginTop:"1rem"}}>
          <div style={{height:1,width:60,background:R}}/><span style={{color:R,fontSize:"1.2rem"}}>✦</span><div style={{height:1,width:60,background:R}}/>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem",alignItems:"start"}}>
        <div>
          <h3 style={{fontFamily:"'Noto Serif JP',serif",fontSize:"1.5rem",fontWeight:700,color:C,marginBottom:"2rem",letterSpacing:".05em"}}>Temukan Kami</h3>
          {[["📍","Lokasi Utama","Jl Unjani 232 40531 Cimahi Selatan Jawa Barat "],["⏰","Jam Buka","Setiap Hari · 11.00 – 22.00 WIB"],["📞","Telepon","+62 8231 7008 090"],["📧","Email","NUribs@gmail.com"]].map(([ic,lb,vl])=>(
            <div key={lb} style={{display:"flex",gap:"1.2rem",marginBottom:"1.5rem",alignItems:"flex-start"}}>
              <span style={{fontSize:"1.3rem",flexShrink:0,marginTop:2}}>{ic}</span>
              <div>
                <div style={{fontSize:".72rem",fontWeight:700,letterSpacing:".12em",color:R,marginBottom:".25rem"}}>{lb}</div>
                <div style={{fontSize:".92rem",color:"rgba(249,237,221,.72)",fontWeight:300,lineHeight:1.6,whiteSpace:"pre-line"}}>{vl}</div>
              </div>
            </div>
          ))}
          <div style={{marginTop:"2rem"}}>
            <div style={{fontSize:".72rem",fontWeight:700,letterSpacing:".12em",color:R,marginBottom:".8rem"}}>MEDIA SOSIAL</div>
            <div style={{display:"flex",gap:".7rem"}}>
              {["Instagram","TikTok","WhatsApp"].map(s=>(
                <button key={s} style={{background:"rgba(249,237,221,.06)",border:"1px solid rgba(249,237,221,.15)",color:"rgba(249,237,221,.65)",padding:".5rem 1rem",borderRadius:6,fontFamily:"'Noto Sans JP',sans-serif",fontSize:".8rem",cursor:"pointer",transition:"all .2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=R;e.currentTarget.style.color=R;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(249,237,221,.15)";e.currentTarget.style.color="rgba(249,237,221,.65)";}}
                >{s}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{background:"rgba(249,237,221,.04)",border:"1px solid rgba(249,237,221,.1)",borderRadius:16,padding:"2.2rem"}}>
          <h3 style={{fontFamily:"'Noto Serif JP',serif",fontSize:"1.3rem",fontWeight:700,color:C,marginBottom:"1.5rem",letterSpacing:".05em"}}>Pesan Meja</h3>
          {[["Nama Lengkap","text"],["Nomor Telepon / WA","tel"],["Tanggal Reservasi","date"]].map(([ph,tp])=>inp(ph,tp))}
          <select style={{width:"100%",padding:".88rem 1.1rem",marginBottom:"1rem",background:"rgba(249,237,221,.07)",border:"1px solid rgba(249,237,221,.15)",borderRadius:8,color:F,fontFamily:"'Noto Sans JP',sans-serif",fontSize:".92rem",outline:"none"}}
            onFocus={e=>e.target.style.borderColor=R} onBlur={e=>e.target.style.borderColor="rgba(249,237,221,.15)"}>
            <option value="">Jumlah Tamu</option>
            {["1 – 2 orang","3 – 4 orang","5 – 8 orang","9+ orang"].map(o=><option key={o}>{o}</option>)}
          </select>
          <select style={{width:"100%",padding:".88rem 1.1rem",marginBottom:"1.5rem",background:"rgba(249,237,221,.07)",border:"1px solid rgba(249,237,221,.15)",borderRadius:8,color:F,fontFamily:"'Noto Sans JP',sans-serif",fontSize:".92rem",outline:"none"}}
            onFocus={e=>e.target.style.borderColor=R} onBlur={e=>e.target.style.borderColor="rgba(249,237,221,.15)"}>
            <option value="">Pilih Sesi</option>
            {["11:00 – 13:00","13:00 – 15:00","17:00 – 19:00","19:00 – 21:00"].map(o=><option key={o}>{o}</option>)}
          </select>
          <button style={{width:"100%",padding:"1rem",background:R,color:F,border:"none",borderRadius:10,fontFamily:"'Noto Sans JP',sans-serif",fontWeight:700,fontSize:"1rem",letterSpacing:".05em",cursor:"pointer",boxShadow:"0 8px 24px rgba(239,0,36,.3)",transition:"all .25s"}}
            onMouseEnter={e=>{e.currentTarget.style.background="#c20020";e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 12px 30px rgba(239,0,36,.4)";}}
            onMouseLeave={e=>{e.currentTarget.style.background=R;e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="0 8px 24px rgba(239,0,36,.3)";}}>Konfirmasi Reservasi →</button>
        </div>
      </div>
    </div>
  </section>

  {/* ── FOOTER ── */}
  <footer style={{background:"#0d0002",padding:"2.5rem clamp(1.5rem,5vw,5rem)"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1.5rem",maxWidth:1200,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:".75rem"}}>
        <img 
      src="public/images/logo-nuribs.jpg" // Ganti dengan path atau URL gambar logo Anda
      alt="Logo Nu Ribs" 
      style={{
        width: 44, 
        height: 44, 
        borderRadius: "50%", // Tetap bulat, hapus baris ini jika logo Anda kotak/persegi panjang
        objectFit: "cover",
        boxShadow: "0 4px 16px rgba(239,0,36,.35)"
      }} />
        <div>
          <div style={{fontFamily:"'Kaisei Decol',serif",fontSize:".6rem",letterSpacing:".25em",color:R}}>一楽</div>
          <div style={{fontFamily:"'Noto Serif JP',serif",fontSize:".95rem",fontWeight:700,color:F,letterSpacing:".1em"}}>NU RIBS</div>
        </div>
      </div>
      <div style={{fontFamily:"'Noto Serif JP',serif",fontSize:"1rem",color:"rgba(249,237,221,.22)",fontWeight:300,textAlign:"center"}}>© 2026 Nu Ribs Indonesia · 一楽ラーメン</div>
      <div style={{fontSize:".82rem",color:"rgba(249,237,221,.28)",fontWeight:300}}>Dibuat dengan 🍜 di Jakarta</div>
    </div>
  </footer>

  <style>{`
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    @keyframes scrollDown{0%,100%{opacity:1;transform:scaleY(1)}50%{opacity:.4;transform:scaleY(.5)}}
    .desk-nav{display:flex!important}
    .ham-btn{display:none!important}
    .menu-card:hover .menu-img{transform:scale(1.1)}
    @media(max-width:860px){.desk-nav{display:none!important}.ham-btn{display:flex!important}}
    @media(max-width:700px){
      #gallery>div>div:last-child{grid-template-columns:1fr 1fr!important;grid-template-rows:auto!important}
      #gallery>div>div:last-child>div{grid-column:auto!important;grid-row:auto!important;height:160px}
      #contact>div>div>div:last-child{grid-template-columns:1fr!important}
      #story>div>div:last-child>div{grid-template-columns:40px 1fr!important}
      #story>div>div:last-child>div>div:first-child,
      #story>div>div:last-child>div>div:last-child{padding:0 0 0 1rem!important;text-align:left!important}
    }
    @media(max-width:500px){
      div[style*="repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr)!important}
    }
    select option{background:#1a0005;color:#f9eddd}
    input[type="date"]::-webkit-calendar-picker-indicator{filter:invert(1) opacity(.4)}
    input::placeholder{color:rgba(249,237,221,.35)}
  `}</style>
  </div>
  );
}
