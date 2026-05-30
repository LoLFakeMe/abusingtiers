"use client";

import { useState, useEffect } from "react";

type Theme = "dark" | "light" | "system";
type Tab = "overall" | "tiers";

const PLAYERS = [
  { rank: 1,  name: "xX_D3str0y3r_Xx", title: "S3rv3r God",    points: 330, region: "NA", tiers: ["HT1","HT1","T1","HT1","T2","T1","LT2","LT1"] },
  { rank: 2,  name: "v0idCr4ck3r",      title: "S3rv3r God",    points: 326, region: "EU", tiers: ["T1","T1","HT1","T3","LT1","T1","LT2","LT2"] },
  { rank: 3,  name: "bl00dsh0t99",       title: "S3rv3r God",    points: 290, region: "AS", tiers: ["HT1","T3","T1","HT1","HT1","HT2","LT2","LT2"] },
  { rank: 4,  name: "N1ghtm4re_PvP",     title: "Expl01t Ace",   points: 260, region: "NA", tiers: ["T3","HT4","HT1","T1","HT1","HT2","LT2","LT2"] },
  { rank: 5,  name: "Cr1ms0nEdge",       title: "Expl01t Ace",   points: 226, region: "EU", tiers: ["HT2","T3","T3","T3","HT1","HT1","HT2","LT2"] },
  { rank: 5,  name: "r4v3nStr1ke",       title: "Expl01t Ace",   points: 226, region: "NA", tiers: ["HT3","T3","T3","HT1","HT1","HT1","LT2","-"] },
  { rank: 7,  name: "gh0stH4nd",         title: "Expl01t Ace",   points: 211, region: "SA", tiers: ["HT1","T3","T1","LT1","LT2","LT2","LT2","LT2"] },
  { rank: 8,  name: "m3ltd0wn_77",       title: "Expl01t Ace",   points: 186, region: "EU", tiers: ["T3","HT4","HT1","HT1","HT2","LT2","-","-"] },
  { rank: 9,  name: "sc0rch3dSky",       title: "Byp4ss Artist", points: 177, region: "AS", tiers: ["T3","T3","T3","T3","HT1","T1","LT1","HT2"] },
  { rank: 10, name: "z3r0_c00l",         title: "Byp4ss Artist", points: 155, region: "NA", tiers: ["T3","T3","HT1","-","T2","T1","LT2","LT2"] },
];

const TIER_COLOR: Record<string, { text: string; bg: string }> = {
  "HT1": { text: "#e07820", bg: "#2e1a00" },
  "HT2": { text: "#999",    bg: "#202020" },
  "HT3": { text: "#999",    bg: "#202020" },
  "HT4": { text: "#999",    bg: "#202020" },
  "T1":  { text: "#e07820", bg: "#251500" },
  "T2":  { text: "#999",    bg: "#1e1e1e" },
  "T3":  { text: "#999",    bg: "#1a1a1a" },
  "LT1": { text: "#5a9f5a", bg: "#0a180a" },
  "LT2": { text: "#4080a0", bg: "#081420" },
  "-":   { text: "#3a3a3a", bg: "#141414" },
};

const REGION_COLOR: Record<string, string> = {
  NA: "#b03030", EU: "#3060b0", AS: "#b07030", SA: "#308060", OC: "#7030b0",
};

const TIER_COLS = [
  { key: "Adm1n",  headerBg: "#2a1a00", headerBorder: "#a06000", trophy: "🏆", trophyColor: "#d4a017", nameColor: "#d4a017" },
  { key: "Tier 2", headerBg: "#1c1c24", headerBorder: "#48484e", trophy: "🏆", trophyColor: "#aaa",    nameColor: "#ccc"    },
  { key: "Tier 3", headerBg: "#221a10", headerBorder: "#7a4a18", trophy: "🏆", trophyColor: "#b07030", nameColor: "#c08040" },
  { key: "Tier 4", headerBg: "#16171e", headerBorder: "#2e2f3a", trophy: "",   trophyColor: "",        nameColor: "#ccc"    },
  { key: "Tier 5", headerBg: "#16171e", headerBorder: "#2e2f3a", trophy: "",   trophyColor: "",        nameColor: "#ccc"    },
];

const TIER_PLAYERS: Record<string, string[]> = {
  "Adm1n":  ["xX_D3str0y3r_Xx"],
  "Tier 2": ["v0idCr4ck3r","bl00dsh0t99","N1ghtm4re_PvP","Cr1ms0nEdge","r4v3nStr1ke","gh0stH4nd","m3ltd0wn_77"],
  "Tier 3": ["sc0rch3dSky","z3r0_c00l","l4mbd4_frz","kn1feW1nd","f4d3dSh4dow","nul1ptr","byt3_cr4sh"],
  "Tier 4": ["0v3rfl0w","d3adP4ck3t","sp00fM4st3r","r3p34t3r","k1ck3r"],
  "Tier 5": ["l4g4bus3r","cr4sh3r99","f4k3P1ng","byp4ss_jr","l0w3st"],
};

function skinHue(name: string) {
  const n = [...name].reduce((a, c) => a + c.charCodeAt(0), 0);
  return [200, 20, 140, 270, 55, 310, 175][n % 7];
}

function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 3, flexShrink: 0,
      background: `hsl(${skinHue(name)},38%,32%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.42, fontWeight: 700, color: "rgba(255,255,255,0.7)",
      userSelect: "none",
    }}>
      {name[0].toUpperCase()}
    </div>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>("system");
  const [dk, setDk]       = useState(true);
  const [tab, setTab]     = useState<Tab>("overall");
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("ALL");

  useEffect(() => {
    if (theme !== "system") { setDk(theme === "dark"); return; }
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setDk(mq.matches);
    const h = (e: MediaQueryListEvent) => setDk(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, [theme]);

  const bg     = dk ? "#13141c" : "#f0f0f2";
  const bg2    = dk ? "#1a1b24" : "#e6e6ea";
  const border = dk ? "#2a2b38" : "#d0d0d8";
  const text   = dk ? "#dddde8" : "#111118";
  const muted  = dk ? "#52536a" : "#9090a0";
  const hover  = dk ? "#1e1f2a" : "#e8e8f0";

  const rows = PLAYERS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (region === "ALL" || p.region === region)
  );

  return (
    <div style={{ minHeight:"100vh", background:bg, color:text, fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", fontSize:14 }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-thumb{background:#c00;border-radius:2px}

        .navtab{background:none;border:none;border-bottom:2px solid transparent;cursor:pointer;font-size:13px;font-family:inherit;padding:13px 15px;color:${muted};transition:color .1s,border-color .1s;font-weight:500;display:flex;flex-direction:column;align-items:center;gap:4px;white-space:nowrap}
        .navtab:hover{color:${text}}
        .navtab.on{color:${text};border-bottom-color:${text}}

        .prow{display:grid;grid-template-columns:52px 1fr 72px 1fr;align-items:center;padding:0 16px;height:70px;border-bottom:1px solid ${border};transition:background .08s;cursor:pointer}
        .prow:hover{background:${hover}}
        .prow:last-child{border-bottom:none}

        .tpill{display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:20px;padding:0 4px;border-radius:3px;font-size:10px;font-weight:700;letter-spacing:.02em}

        .rbtn{background:none;border:1px solid ${border};color:${muted};font-family:inherit;font-size:11px;padding:3px 8px;border-radius:3px;cursor:pointer;font-weight:500;transition:all .1s}
        .rbtn:hover{color:${text};border-color:#666}
        .rbtn.on{color:#dd2222;border-color:#dd2222;background:rgba(200,0,0,.07)}

        .thm{background:none;border:none;font-family:inherit;font-size:11px;color:${muted};cursor:pointer;padding:3px 6px}
        .thm:hover{color:${text}}
        .thm.on{color:#dd2222}

        input{background:${bg2};border:1px solid ${border};color:${text};font-family:inherit;font-size:13px;padding:5px 10px;border-radius:3px;outline:none}
        input:focus{border-color:#c00}
        input::placeholder{color:${muted}}

        .crow{display:flex;align-items:center;gap:8px;padding:6px 10px;border-bottom:1px solid ${border};font-size:13px;transition:background .08s;cursor:pointer}
        .crow:hover{background:${hover}}
        .crow:last-child{border-bottom:none}
      `}</style>

      {/* ── TOP NAV ── */}
      <div style={{borderBottom:`1px solid ${border}`,background:dk?"#0f1018":bg,position:"sticky",top:0,zIndex:10}}>
        <div style={{maxWidth:1120,margin:"0 auto",display:"flex",alignItems:"stretch",padding:"0 8px"}}>
          <div style={{display:"flex",alignItems:"center",paddingRight:20,paddingLeft:8,borderRight:`1px solid ${border}`,marginRight:4}}>
            <span style={{fontWeight:800,fontSize:14,color:"#cc0000",letterSpacing:".08em"}}>ABUS3TIERS</span>
          </div>
          <button className={`navtab${tab==="overall"?" on":""}`} onClick={()=>setTab("overall")}>
            <span style={{fontSize:18}}>⚔️</span>
            <span>Overall</span>
          </button>
          <button className={`navtab${tab==="tiers"?" on":""}`} onClick={()=>setTab("tiers")}>
            <span style={{fontSize:18}}>🏆</span>
            <span>Adm1n</span>
          </button>
          <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:2,paddingRight:8}}>
            {(["system","dark","light"] as Theme[]).map(t=>(
              <button key={t} className={`thm${theme===t?" on":""}`} onClick={()=>setTheme(t)}>
                {t==="system"?"auto":t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1120,margin:"0 auto",padding:"16px 12px 60px"}}>

        {/* ══ OVERALL ══ */}
        {tab==="overall" && <>
          <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap",alignItems:"center"}}>
            <input placeholder="Search player..." value={search} onChange={e=>setSearch(e.target.value)} style={{width:175}}/>
            <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>
              {["ALL","NA","EU","AS","SA","OC"].map(r=>(
                <button key={r} className={`rbtn${region===r?" on":""}`} onClick={()=>setRegion(r)}>{r}</button>
              ))}
            </div>
            <span style={{marginLeft:"auto",fontSize:11,color:muted}}>{rows.length} players</span>
          </div>

          {/* header row */}
          <div style={{display:"grid",gridTemplateColumns:"52px 1fr 72px 1fr",padding:"0 16px",height:26,background:bg2,border:`1px solid ${border}`,borderBottom:"none",borderRadius:"4px 4px 0 0",alignItems:"center"}}>
            {["#","PLAYER","REGION","TIERS"].map(h=>(
              <span key={h} style={{fontSize:10,fontWeight:700,color:muted,letterSpacing:".08em"}}>{h}</span>
            ))}
          </div>

          <div style={{border:`1px solid ${border}`,borderRadius:"0 0 4px 4px",overflow:"hidden"}}>
            {rows.map((p,i)=>{
              const rankBg = p.rank===1?"#a06800":p.rank===2?"#4a4a58":p.rank===3?"#7a3e18":bg2;
              const rankFg = p.rank<=3?"#fff":muted;
              return (
                <div key={i} className="prow"
                  onMouseEnter={e=>(e.currentTarget.style.background=hover)}
                  onMouseLeave={e=>(e.currentTarget.style.background="")}>
                  {/* rank box */}
                  <div>
                    <div style={{width:36,height:36,background:rankBg,borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:14,color:rankFg}}>
                      {p.rank}.
                    </div>
                  </div>
                  {/* player */}
                  <div style={{display:"flex",alignItems:"center",gap:10,overflow:"hidden"}}>
                    <Avatar name={p.name} size={38}/>
                    <div style={{overflow:"hidden"}}>
                      <div style={{fontWeight:700,fontSize:15,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.name}</div>
                      <div style={{fontSize:11,color:muted,marginTop:2,display:"flex",alignItems:"center",gap:3}}>
                        <span style={{color:"#b06020"}}>◈</span>
                        {p.title}
                        <span style={{color:dk?"#3a3a4a":"#bbb"}}>({p.points} pts)</span>
                      </div>
                    </div>
                  </div>
                  {/* region */}
                  <div>
                    <span style={{display:"inline-block",padding:"3px 9px",borderRadius:3,background:REGION_COLOR[p.region]??"#555",color:"#fff",fontSize:12,fontWeight:700,letterSpacing:".04em"}}>
                      {p.region}
                    </span>
                  </div>
                  {/* tiers */}
                  <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                    {p.tiers.map((t,ti)=>{
                      const tc=TIER_COLOR[t]??TIER_COLOR["-"];
                      return <span key={ti} className="tpill" style={{background:tc.bg,color:tc.text,border:`1px solid ${tc.text}28`}}>{t}</span>;
                    })}
                  </div>
                </div>
              );
            })}
            {rows.length===0&&<div style={{padding:"22px 16px",fontSize:13,color:muted}}>No results.</div>}
          </div>
        </>}

        {/* ══ TIERS ══ */}
        {tab==="tiers" && (
          <div style={{overflowX:"auto"}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,minmax(190px,1fr))",minWidth:900,border:`1px solid ${border}`,borderRadius:4,overflow:"hidden"}}>
              {TIER_COLS.map((col,ci)=>(
                <div key={col.key} style={{borderRight:ci<4?`1px solid ${border}`:"none"}}>
                  {/* header */}
                  <div style={{
                    background:col.headerBg,
                    borderBottom:`1px solid ${col.headerBorder}`,
                    borderTop:`2px solid ${col.headerBorder}`,
                    padding:"12px 12px",
                    display:"flex",alignItems:"center",gap:7,
                  }}>
                    {col.trophy&&<span style={{fontSize:16}}>{col.trophy}</span>}
                    <span style={{fontWeight:700,fontSize:15,color:col.nameColor}}>{col.key}</span>
                  </div>
                  {/* players */}
                  {(TIER_PLAYERS[col.key]??[]).map((name,pi)=>(
                    <div key={pi} className="crow">
                      <Avatar name={name} size={26}/>
                      <span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontSize:13}}>{name}</span>
                      <svg width="13" height="13" viewBox="0 0 12 12" fill="none" style={{flexShrink:0,opacity:.35}}>
                        <path d="M2 8l4-4 4 4" stroke={text} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 5l4-4 4 4" stroke={text} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
