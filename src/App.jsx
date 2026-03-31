import { useState, useEffect, useRef } from "react";

const C = {
  ink: "#0d1f22", inkMid: "#1e3a3f", inkSoft: "#4a6e74", inkFaint: "#7a9ea4",
  surface: "#ffffff", surface2: "#f4f8f8", surface3: "#e6f0f1",
  accent: "#084e59", accentDark: "#052f36", accentDeep: "#031e23",
  neon: "#4af8d4", neonSoft: "rgba(74,248,212,0.12)", neonMid: "rgba(74,248,212,0.25)",
  accentSoft: "rgba(8,78,89,0.07)", accentMid: "rgba(8,78,89,0.15)",
  tealSoft: "#ddf4f1", tealMid: "#b0e8e2",
  border: "rgba(8,78,89,0.10)", borderStrong: "rgba(8,78,89,0.20)",
};

const T = {
  h1: { fontFamily:"'DM Sans',sans-serif", fontWeight:300, letterSpacing:"0.02em", lineHeight:1.08 },
  h2: { fontFamily:"'DM Sans',sans-serif", fontWeight:300, letterSpacing:"0.04em", lineHeight:1.1 },
  h3: { fontFamily:"'DM Sans',sans-serif", fontWeight:400, letterSpacing:"0.05em" },
  h4: { fontFamily:"'DM Sans',sans-serif", fontWeight:500, letterSpacing:"0.06em" },
  eye: { fontSize:11, fontWeight:500, letterSpacing:"0.16em", textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif" },
  mono: { fontFamily:"'DM Mono',monospace", letterSpacing:"0.05em" },
};

function useInView(t=0.08){const r=useRef(null);const[v,setV]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true);},{threshold:t});if(r.current)o.observe(r.current);return()=>o.disconnect();},[]);return[r,v];}
function FI({children,d=0,s={}}){const[r,v]=useInView();return<div ref={r} style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(18px)",transition:`opacity .6s ease ${d}ms,transform .6s ease ${d}ms`,...s}}>{children}</div>;}

const Ic={
  Logo:({l})=><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1" y="1" width="7" height="7" rx="1.5" fill={l?"white":C.accent}/><rect x="10" y="1" width="7" height="7" rx="1.5" fill={l?"white":C.accent} opacity=".55"/><rect x="1" y="10" width="7" height="7" rx="1.5" fill={l?"white":C.accent} opacity=".55"/><rect x="10" y="10" width="7" height="7" rx="1.5" fill={l?"white":C.accent} opacity=".22"/></svg>,
  Chk:({c=C.accent})=><svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{flexShrink:0,marginTop:2}}><path d="M2 6.5L5.2 9.5L11 3.5" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Arr:({s=13})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  QR:()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>,
  Bell:()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Lay:()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  Shi:()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Usr:()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Act:()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Chat:()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Ref:()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
  Eye:()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  Tag:()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  Glb:()=><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
};

const sec={padding:"88px 2rem"};
const wrap={maxWidth:1060,margin:"0 auto"};
const g3={display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12};
const card={background:C.surface,borderRadius:14,border:`1px solid ${C.border}`,padding:"24px 22px",transition:"border-color 0.2s,box-shadow 0.2s"};

function Header(){
  const[sc,setSc]=useState(false);
  useEffect(()=>{const f=()=>setSc(window.scrollY>8);window.addEventListener("scroll",f);return()=>window.removeEventListener("scroll",f);},[]);
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,height:56,background:sc?"rgba(255,255,255,0.97)":"transparent",backdropFilter:sc?"blur(20px)":"none",borderBottom:sc?`1px solid ${C.border}`:"1px solid transparent",transition:"all 0.3s",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 2rem"}}>
      <a href="#" style={{display:"flex",alignItems:"center",gap:9,textDecoration:"none"}}>
        <div style={{width:28,height:28,background:C.accent,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center"}}><Ic.Logo l/></div>
        <span style={{...T.h4,fontSize:15,color:C.ink}}>hostack</span>
      </a>
      <div style={{display:"flex",gap:2,alignItems:"center"}}>
        {[["How it works","#solution"],["Results","#results"],["Pricing","#pricing"]].map(([l,h])=>(
          <a key={l} href={h} style={{padding:"6px 14px",fontSize:13,color:C.inkSoft,textDecoration:"none",borderRadius:7,letterSpacing:"0.03em",transition:"color 0.15s"}} onMouseEnter={e=>e.currentTarget.style.color=C.ink} onMouseLeave={e=>e.currentTarget.style.color=C.inkSoft}>{l}</a>
        ))}
        <a href="#cta" style={{marginLeft:10,display:"inline-flex",alignItems:"center",gap:6,background:C.accent,color:"#fff",padding:"7px 18px",borderRadius:8,fontSize:13,fontWeight:500,textDecoration:"none",letterSpacing:"0.04em",transition:"background 0.2s,box-shadow 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.background=C.accentDeep;e.currentTarget.style.boxShadow=`0 0 0 2px ${C.neon}`;}} onMouseLeave={e=>{e.currentTarget.style.background=C.accent;e.currentTarget.style.boxShadow="none";}}>
          Get early access <Ic.Arr s={12}/>
        </a>
      </div>
    </nav>
  );
}

function Hero(){
  const[tk,setTk]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setTk(x=>(x+1)%3),3200);return()=>clearInterval(t);},[]);
  const evs=[
    {tx:"Room 4 — extra towels needed",ly:"GUEST LAYER",cl:C.accent},
    {tx:"Assigned to Ana · Housekeeping",ly:"STAFF LAYER",cl:"#0077b6"},
    {tx:"Task done · Dashboard updated",ly:"OWNER LAYER",cl:"#7b5ea7"},
  ];
  return(
    <section style={{...sec,background:C.surface2,paddingTop:110,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:C.neon,opacity:0.7}}/>
      <div style={{position:"absolute",right:"8%",top:"10%",width:420,height:420,background:`radial-gradient(ellipse,${C.neonSoft} 0%,transparent 70%)`,pointerEvents:"none"}}/>
      <div style={{...wrap,display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5rem",alignItems:"center"}}>
        <div>
          <FI><div style={{display:"inline-flex",alignItems:"center",gap:7,background:C.tealSoft,border:`1px solid ${C.tealMid}`,borderRadius:999,padding:"5px 14px",marginBottom:24}}><div style={{width:6,height:6,borderRadius:"50%",background:C.neon}}/><span style={{...T.eye,fontSize:11,color:C.accent}}>Live at Torridonia · 23 beds</span></div></FI>
          <FI d={80}><h1 style={{...T.h1,fontSize:"clamp(2.4rem,4.5vw,3.6rem)",color:C.ink,marginBottom:20}}>The system that runs ops —<br/><span style={{color:C.accent}}>so you can build community.</span></h1></FI>
          <FI d={160}><p style={{fontSize:17,color:C.inkSoft,lineHeight:1.78,marginBottom:32,maxWidth:430}}>Guest requests go to your team automatically. Your team logs everything. You see it all — from anywhere. No WhatsApp groups. No paper checklists.</p></FI>
          <FI d={240}><div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:30}}>
            <a href="#cta" style={{display:"inline-flex",alignItems:"center",gap:7,background:C.accent,color:"#fff",padding:"12px 24px",borderRadius:9,fontSize:14,fontWeight:500,textDecoration:"none",letterSpacing:"0.04em",transition:"background 0.2s,box-shadow 0.2s,transform 0.12s"}} onMouseEnter={e=>{e.currentTarget.style.background=C.accentDeep;e.currentTarget.style.boxShadow=`0 0 0 2px ${C.neon},0 8px 32px rgba(8,78,89,0.2)`;e.currentTarget.style.transform="translateY(-1px)";}} onMouseLeave={e=>{e.currentTarget.style.background=C.accent;e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none";}}>Claim your early access spot <Ic.Arr/></a>
            <a href="#solution" style={{display:"inline-flex",alignItems:"center",gap:7,background:"transparent",color:C.inkSoft,padding:"12px 24px",borderRadius:9,fontSize:14,textDecoration:"none",border:`1px solid ${C.borderStrong}`,letterSpacing:"0.03em",transition:"color 0.15s,border-color 0.15s"}} onMouseEnter={e=>{e.currentTarget.style.color=C.ink;e.currentTarget.style.borderColor=C.ink;}} onMouseLeave={e=>{e.currentTarget.style.color=C.inkSoft;e.currentTarget.style.borderColor=C.borderStrong;}}>See how it works</a>
          </div></FI>
          <FI d={320}><div style={{display:"flex",gap:"1.5rem",flexWrap:"wrap",fontSize:13}}>
            {["No app download needed","Set up in under 1 hour","Available in Europe & UK"].map(t=><span key={t} style={{display:"flex",alignItems:"center",gap:5,letterSpacing:"0.02em",color:C.inkSoft}}><Ic.Chk/>{t}</span>)}
          </div></FI>
        </div>
        <FI d={200}>
          <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:24,boxShadow:"0 4px 40px rgba(8,78,89,0.06)"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
              <span style={{...T.eye,fontSize:10,color:C.inkFaint}}>Live data flow</span>
              <span style={{display:"inline-flex",alignItems:"center",gap:5,background:C.tealSoft,border:`1px solid ${C.tealMid}`,borderRadius:999,padding:"3px 10px",fontSize:10,color:C.accent,...T.mono}}>
                <span style={{width:5,height:5,borderRadius:"50%",background:C.neon,display:"inline-block",animation:"hs-pulse 2s infinite"}}/>LIVE
              </span>
            </div>
            {evs.map((ev,i)=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"10px 12px",marginBottom:5,borderRadius:9,background:tk===i?C.surface2:C.surface,border:`1px solid ${tk===i?C.borderStrong:C.border}`,borderLeft:`2.5px solid ${tk===i?C.neon:ev.cl}`,opacity:tk===i?1:0.5,transition:"all 0.4s"}}>
                <div style={{width:26,height:26,borderRadius:7,background:`${ev.cl}14`,border:`1px solid ${ev.cl}30`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:ev.cl}}>
                  {i===0&&<Ic.QR/>}{i===1&&<Ic.Usr/>}{i===2&&<Ic.Act/>}
                </div>
                <div style={{flex:1}}><div style={{fontSize:13,color:C.ink,marginBottom:2}}>{ev.tx}</div><div style={{fontSize:10,color:C.inkFaint,...T.mono}}>{ev.ly}</div></div>
                {tk===i&&<div style={{width:6,height:6,borderRadius:"50%",background:C.neon,flexShrink:0,marginTop:9,boxShadow:`0 0 8px ${C.neon}`}}/>}
              </div>
            ))}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:7,marginTop:12}}>
              {[["98%","tasks done"],["<30s","response"],["0","missed"]].map(([v,l])=>(
                <div key={l} style={{background:C.surface2,borderRadius:8,padding:"11px 7px",textAlign:"center",border:`1px solid ${C.border}`}}>
                  <div style={{fontSize:"1.25rem",fontWeight:300,letterSpacing:"0.02em",color:C.accent,lineHeight:1}}>{v}</div>
                  <div style={{fontSize:10,color:C.inkFaint,marginTop:3}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </FI>
      </div>
    </section>
  );
}

function Problem(){
  const ps=[
    {I:Ic.Chat,t:"No shared source of truth",b:"Tasks live in WhatsApp, sticky notes, or someone's memory. Every shift starts from zero."},
    {I:Ic.Ref,t:"Context resets every shift",b:"Without a handover system, nothing carries forward. The same issue gets missed, found, missed again."},
    {I:Ic.Eye,t:"No visibility when you're off-site",b:"Did the rooms get done? Was the incident handled? You find out when guests complain."},
  ];
  return(
    <section style={{...sec,background:C.surface}}>
      <div style={wrap}>
        <FI><p style={{...T.eye,color:C.inkFaint,marginBottom:14}}>The problem</p></FI>
        <FI d={60}><h2 style={{...T.h2,fontSize:"clamp(1.9rem,3.5vw,2.6rem)",color:C.ink,marginBottom:16}}>You started a hostel to build community.<br/>Most of your day is something else.</h2></FI>
        <FI d={120}><p style={{fontSize:16,color:C.inkSoft,maxWidth:540,lineHeight:1.78,marginBottom:40}}>Shift handovers, task logs, team coordination — it never ends. Guests feel the gap between the community you're building and the chaos behind the scenes.</p></FI>
        <FI d={160}><div style={{background:C.surface2,borderRadius:14,border:`1px solid ${C.border}`,padding:"30px 34px",display:"grid",gridTemplateColumns:"auto 1fr",gap:"2.5rem",alignItems:"center",marginBottom:12}}>
          <div><div style={{fontSize:"3.6rem",fontWeight:300,letterSpacing:"0.02em",color:C.accent,lineHeight:1}}>70%</div><div style={{...T.mono,fontSize:11,color:C.inkFaint,marginTop:5,lineHeight:1.5}}>of manager time<br/>lost to operations</div></div>
          <p style={{fontSize:15,color:C.inkSoft,lineHeight:1.82}}>Most hostel and coliving managers spend more than half their day on coordination that could be automated. <strong style={{color:C.ink,fontWeight:500}}>That's time you're not spending with your guests or growing your space.</strong></p>
        </div></FI>
        <div style={g3}>
          {ps.map((p,i)=>(
            <FI key={p.t} d={i*80}><div style={{...card,background:C.surface2}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.neon;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;}}>
              <div style={{width:32,height:32,borderRadius:8,background:C.surface,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:C.inkSoft,marginBottom:16}}><p.I/></div>
              <h3 style={{...T.h4,fontSize:15,color:C.ink,marginBottom:7}}>{p.t}</h3>
              <p style={{fontSize:13,color:C.inkSoft,lineHeight:1.72}}>{p.b}</p>
            </div></FI>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution(){
  const layers=[
    {tag:"LAYER 1 · GUEST-FACING",cl:C.accent,tb:C.tealSoft,tc:C.accent,title:"Guest App",desc:"Guests scan a QR code when they arrive. No app to download, no account needed. They can request things, check in, and find everything about your space in seconds.",feats:[["QR scan entry","No download, no account — guests are in on arrival"],["Digital check-in","Arrival details + house info delivered instantly"],["Requests & incidents","Guest request → staff task queue, automatically"],["Activity calendar","Events and community activities, always live"]]},
    {tag:"LAYER 2 · TEAM-FACING",cl:"#0077b6",tb:"#e0f0fa",tc:"#0077b6",title:"Staff App",desc:"Your team sees their tasks in one place — no more WhatsApp groups. They can check off shifts, log incidents, and hand over context to the next person automatically.",feats:[["Shift task checklist","Owner tasks + guest requests, one prioritised list"],["Incident reporting","Any issue logged in seconds, straight to manager"],["Shift handover memory","Context carries forward automatically. Nothing lost"],["Works from any browser","No app to install. Any phone, from day one"]]},
    {tag:"LAYER 3 · OWNER-FACING",cl:"#7b5ea7",tb:"#f0ebfa",tc:"#7b5ea7",title:"Owner Dashboard",desc:"See everything happening in your property — from anywhere. Every task, every shift, every incident. Get alerts when something needs your attention.",feats:[["Live operations view","Every task, every shift, from anywhere"],["Alert & escalation centre","Urgent issues surface immediately. Logged and resolved"],["Automated monthly reports","Incidents, completions, trends — no effort needed"],["White-label ready","Your brand. Your colours. Hostack stays invisible"]]},
  ];
  return(
    <section id="solution" style={{...sec,background:C.surface2}}>
      <div style={wrap}>
        <FI><p style={{...T.eye,color:C.inkFaint,marginBottom:14}}>The product</p></FI>
        <FI d={60}><h2 style={{...T.h2,fontSize:"clamp(1.9rem,3.5vw,2.6rem)",color:C.ink,marginBottom:16}}>Three layers. One system.</h2></FI>
        <FI d={120}><p style={{fontSize:16,color:C.inkSoft,maxWidth:560,lineHeight:1.78,marginBottom:50}}>A Guest App, a Staff App, and an Owner Dashboard — connected in real time via QR code. Not a booking engine. Not a PMS. The human layer your space is missing.</p></FI>
        <div style={g3}>
          {layers.map((l,i)=>(
            <FI key={l.tag} d={i*90}><div style={{...card,background:C.surface,borderTop:`3px solid ${l.cl}`,height:"100%"}}>
              <div style={{display:"inline-block",background:l.tb,borderRadius:5,padding:"3px 9px",marginBottom:13}}><span style={{...T.eye,fontSize:10,color:l.tc}}>{l.tag}</span></div>
              <h3 style={{...T.h3,fontSize:18,color:C.ink,marginBottom:11}}>{l.title}</h3>
              <p style={{fontSize:13,color:C.inkSoft,lineHeight:1.72,marginBottom:20}}>{l.desc}</p>
              <ul style={{listStyle:"none",padding:0}}>
                {l.feats.map(([t,s])=>(
                  <li key={t} style={{display:"flex",gap:9,padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
                    <Ic.Chk c={l.cl}/>
                    <div><div style={{...T.h4,fontSize:13,color:C.ink}}>{t}</div><div style={{fontSize:11,color:C.inkFaint,marginTop:1}}>{s}</div></div>
                  </li>
                ))}
              </ul>
            </div></FI>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks(){
  const steps=[["01","Set up in under an hour","Add your property, rooms, and team. No code, no IT person needed."],["02","Print and place the QR","Put QR codes at reception and in rooms. Guests scan to get started."],["03","Requests come in","Guests send requests from their phone. Your team gets notified right away."],["04","Team logs everything","Tasks get checked off. Incidents get logged. Nothing is forgotten."],["05","You see it all","Open the dashboard from anywhere. No calls, no check-in messages."],["06","Month-end report, automatic","See what happened, what took longest, and where to improve."]];
  return(
    <section style={{...sec,background:C.surface}}>
      <div style={wrap}>
        <FI><p style={{...T.eye,color:C.inkFaint,marginBottom:14}}>How it works</p></FI>
        <FI d={60}><h2 style={{...T.h2,fontSize:"clamp(1.9rem,3.5vw,2.6rem)",color:C.ink,marginBottom:48}}>From messy to organised<br/>in six simple steps.</h2></FI>
        <div style={g3}>
          {steps.map(([n,t,b],i)=>(
            <FI key={n} d={i*60}><div style={{...card,background:C.surface2}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.neon;e.currentTarget.style.boxShadow=`0 0 0 1px ${C.neonSoft}`;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow="none";}}>
              <div style={{...T.mono,fontSize:10,color:C.neon,marginBottom:12,background:C.accent,display:"inline-block",padding:"2px 8px",borderRadius:4}}>{n}</div>
              <h4 style={{...T.h4,fontSize:14,color:C.ink,marginBottom:6}}>{t}</h4>
              <p style={{fontSize:13,color:C.inkSoft,lineHeight:1.7}}>{b}</p>
            </div></FI>
          ))}
        </div>
      </div>
    </section>
  );
}

function Results(){
  const stats=[["2h","Saved per day\nper manager"],["98%","Tasks completed\nin first week"],["<30s","Average request\nresponse time"],["0","Missed incidents\nsince launch"]];
  return(
    <section id="results" style={{...sec,background:C.surface2}}>
      <div style={wrap}>
        <FI><span style={{display:"inline-block",background:C.tealSoft,color:C.accent,...T.eye,fontSize:10,padding:"3px 10px",borderRadius:5,marginBottom:14}}>Live since 2025</span></FI>
        <div style={{background:C.surface,borderRadius:16,border:`1px solid ${C.border}`,padding:"38px",display:"grid",gridTemplateColumns:"1.2fr 1fr",gap:"2.5rem"}}>
          <FI d={60}><div>
            <h3 style={{...T.h2,fontSize:"clamp(1.5rem,2.5vw,1.9rem)",color:C.ink,marginBottom:3}}>Torridonia</h3>
            <p style={{fontSize:13,color:C.inkSoft,marginBottom:18}}>Loch Torridon, Scottish Highlands · 23 beds · 8–11 team members</p>
            <blockquote style={{fontSize:14,fontStyle:"italic",color:C.inkMid,lineHeight:1.82,borderLeft:`2px solid ${C.neon}`,paddingLeft:16,marginBottom:12}}>"Before Hostack, I was forwarding messages and chasing updates all morning. Now I open the dashboard and I know exactly what's happening across every room before I've had coffee."</blockquote>
            <p style={{fontSize:12,color:C.inkFaint,...T.mono}}>— Felix, Owner · Torridonia</p>
            <div style={{marginTop:18,paddingTop:18,borderTop:`1px solid ${C.border}`,fontSize:13,color:C.inkSoft,lineHeight:1.78}}><strong style={{color:C.ink,fontWeight:500}}>Before:</strong> 3 WhatsApp groups, paper checklists, no incident log. Felix needed to be on-site to know what was happening. Jorge, the manager, spent most of his morning answering the same questions every shift.</div>
          </div></FI>
          <FI d={120}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
            {stats.map(([v,l])=>(
              <div key={v} style={{background:C.surface2,borderRadius:12,padding:"20px 14px",textAlign:"center",border:`1px solid ${C.border}`}}>
                <div style={{fontSize:"1.9rem",fontWeight:300,letterSpacing:"0.02em",color:C.accent,lineHeight:1,marginBottom:7}}>{v}</div>
                <div style={{fontSize:11,color:C.inkSoft,lineHeight:1.4,whiteSpace:"pre-line"}}>{l}</div>
              </div>
            ))}
          </div></FI>
        </div>
      </div>
    </section>
  );
}

function Features(){
  const fs=[[Ic.QR,"QR check-in","One QR code. Guests scan and they're in. No app, no friction."],[Ic.Bell,"Instant notifications","Your team gets notified the moment a guest sends a request."],[Ic.Lay,"Shift checklists","Build your checklists once. Your team follows them every shift."],[Ic.Shi,"Incident log","Any team member can report an issue from their phone. You see it immediately."],[Ic.Usr,"Team onboarding","New staff get access, training tasks, and their checklist from day one."],[Ic.Tag,"White-label ready","Your brand, your colours. Guests never see the Hostack name."]];
  return(
    <section style={{...sec,background:C.surface}}>
      <div style={wrap}>
        <FI><p style={{...T.eye,color:C.inkFaint,marginBottom:14}}>What's included</p></FI>
        <FI d={60}><h2 style={{...T.h2,fontSize:"clamp(1.9rem,3.5vw,2.6rem)",color:C.ink,marginBottom:16}}>Simple tools. Real results.</h2></FI>
        <FI d={120}><p style={{fontSize:16,color:C.inkSoft,maxWidth:460,lineHeight:1.78,marginBottom:48}}>Everything your team needs to run a shift well. Nothing that gets in the way.</p></FI>
        <div style={g3}>
          {fs.map(([Icon,t,b],i)=>(
            <FI key={t} d={i*60}><div style={{...card,background:C.surface2}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.neon;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;}}>
              <div style={{width:34,height:34,borderRadius:8,background:C.surface,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14,color:C.accent}}><Icon/></div>
              <h3 style={{...T.h4,fontSize:15,color:C.ink,marginBottom:7}}>{t}</h3>
              <p style={{fontSize:13,color:C.inkSoft,lineHeight:1.7}}>{b}</p>
            </div></FI>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing(){
  return(
    <section id="pricing" style={{...sec,background:C.surface2}}>
      <div style={wrap}>
        <FI><p style={{...T.eye,color:C.inkFaint,marginBottom:14}}>Pricing</p></FI>
        <FI d={60}><h2 style={{...T.h2,fontSize:"clamp(1.9rem,3.5vw,2.6rem)",color:C.ink,marginBottom:16}}>Start free. Upgrade when you're ready.</h2></FI>
        <FI d={120}><div style={{background:C.tealSoft,border:`1px solid ${C.tealMid}`,borderRadius:12,padding:"18px 22px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14,marginBottom:24}}>
          <div><h3 style={{...T.h4,fontSize:14,color:C.accentDark,marginBottom:3}}>Founding Member Programme — 3 spots left</h3><p style={{fontSize:13,color:C.accent}}>Skip the setup fee. Lock in the best price. Shape what we build next.</p></div>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            {["T","S","3","4","5"].map((s,i)=><div key={i} style={{width:29,height:29,borderRadius:"50%",background:i<2?C.accent:"transparent",color:i<2?C.neon:C.inkFaint,border:i<2?"none":`1.5px dashed ${C.borderStrong}`,fontSize:10,fontWeight:500,...T.mono,display:"flex",alignItems:"center",justifyContent:"center"}}>{s}</div>)}
            <span style={{fontSize:12,color:C.accent,marginLeft:4}}>2 of 5 taken</span>
          </div>
        </div></FI>
        <div style={{...g3,alignItems:"start"}}>
          <FI d={80}><div style={{...card,display:"flex",flexDirection:"column"}}>
            <div style={{...T.eye,fontSize:11,color:C.inkFaint,marginBottom:9}}>Free</div>
            <div style={{fontSize:"2.3rem",fontWeight:300,letterSpacing:"0.02em",lineHeight:1,marginBottom:3}}>€0<span style={{fontSize:14,fontWeight:400,color:C.inkSoft}}>/mo</span></div>
            <div style={{...T.mono,fontSize:12,color:C.inkSoft,paddingBottom:14,borderBottom:`1px solid ${C.border}`,marginBottom:14}}>No credit card. No time limit.</div>
            <p style={{fontSize:13,color:C.inkSoft,marginBottom:16,lineHeight:1.68,flex:1}}>Try everything for up to 20 beds. See if it works before you pay anything.</p>
            <ul style={{listStyle:"none",padding:0,marginBottom:20}}>{["1 property · up to 20 beds","5 staff accounts","QR guest check-in","Incident log (view only)"].map(f=><li key={f} style={{display:"flex",gap:7,marginBottom:7,fontSize:13,color:C.ink,alignItems:"flex-start"}}><Ic.Chk/>{f}</li>)}</ul>
            <a href="#cta" style={{display:"block",textAlign:"center",padding:"11px",borderRadius:9,fontSize:14,fontWeight:500,textDecoration:"none",background:"transparent",color:C.ink,border:`1px solid ${C.borderStrong}`,letterSpacing:"0.04em",transition:"background 0.15s"}} onMouseEnter={e=>e.currentTarget.style.background=C.surface2} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>Get started free →</a>
          </div></FI>

          <FI d={160}><div style={{...card,border:`1.5px solid ${C.accent}`,boxShadow:`0 0 0 1px ${C.accentSoft},0 8px 40px rgba(8,78,89,0.1)`,display:"flex",flexDirection:"column",position:"relative"}}>
            <div style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",background:C.accent,color:C.neon,...T.mono,fontSize:10,fontWeight:500,padding:"3px 14px",borderRadius:999,whiteSpace:"nowrap"}}>Founding Member</div>
            <div style={{...T.eye,fontSize:11,color:C.inkFaint,marginBottom:9}}>Operator</div>
            <div style={{fontSize:"2.3rem",fontWeight:300,letterSpacing:"0.02em",lineHeight:1,marginBottom:3}}>€99<span style={{fontSize:14,fontWeight:400,color:C.inkSoft}}>/mo</span></div>
            <div style={{background:C.tealSoft,borderRadius:9,padding:"11px 13px",marginBottom:11,border:`1px solid ${C.tealMid}`}}>
              <div style={{...T.h4,fontSize:12,color:C.accentDark,marginBottom:7}}>Founding Member deal</div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:C.inkSoft,marginBottom:4}}><span>Setup fee</span><span style={{textDecoration:"line-through",color:C.inkFaint}}>€300</span></div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:C.inkSoft,marginBottom:4}}><span>6 months × €99</span><span>€594</span></div>
              <div style={{height:1,background:C.tealMid,margin:"7px 0"}}/>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:13,fontWeight:500,color:C.accentDark}}><span>You get 12 months</span><span style={{color:C.accent}}>Save €894</span></div>
            </div>
            <div style={{...T.mono,fontSize:12,color:C.accent,paddingBottom:14,borderBottom:`1px solid ${C.border}`,marginBottom:14}}>Pay 6 months · Get 12 · Setup fee waived</div>
            <p style={{fontSize:13,color:C.inkSoft,marginBottom:16,lineHeight:1.68,flex:1}}>The full system. Your whole team. Unlimited beds. Connected to your booking tools.</p>
            <ul style={{listStyle:"none",padding:0,marginBottom:20}}>{["Everything in Free — unlimited beds","Connect to your booking system","WhatsApp + push notifications","Staff scheduling","Monthly operations report","Priority support"].map(f=><li key={f} style={{display:"flex",gap:7,marginBottom:7,fontSize:13,color:C.ink,alignItems:"flex-start"}}><Ic.Chk/>{f}</li>)}</ul>
            <a href="#cta" style={{display:"block",textAlign:"center",padding:"12px",borderRadius:9,fontSize:14,fontWeight:500,textDecoration:"none",background:C.accent,color:C.neon,letterSpacing:"0.05em",transition:"background 0.2s,box-shadow 0.2s"}} onMouseEnter={e=>{e.currentTarget.style.background=C.accentDeep;e.currentTarget.style.boxShadow=`0 0 0 2px ${C.neon}`;}} onMouseLeave={e=>{e.currentTarget.style.background=C.accent;e.currentTarget.style.boxShadow="none";}}>Claim your spot →</a>
          </div></FI>

          <FI d={240}><div style={{...card,display:"flex",flexDirection:"column"}}>
            <div style={{...T.eye,fontSize:11,color:C.inkFaint,marginBottom:9}}>Full Service</div>
            <div style={{fontSize:"1.1rem",fontWeight:400,color:C.ink,letterSpacing:"0.05em",padding:"8px 0 4px",lineHeight:1.3,marginBottom:4}}>Built around<br/>your operation.</div>
            <div style={{...T.mono,fontSize:12,color:C.inkSoft,paddingBottom:14,borderBottom:`1px solid ${C.border}`,marginBottom:14}}>Operator + add-ons</div>
            <p style={{fontSize:13,color:C.inkSoft,marginBottom:16,lineHeight:1.68,flex:1}}>For spaces that want more — direct bookings, loyalty programmes, analytics. We scope it with you.</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:20}}>{["Business analytics","Loyalty programme","Direct booking","Partner payments","Process manual"].map(m=><span key={m} style={{fontSize:11,padding:"3px 9px",borderRadius:999,background:C.surface2,border:`1px solid ${C.border}`,color:C.inkSoft}}>{m}</span>)}</div>
            <a href="#cta" style={{display:"block",textAlign:"center",padding:"11px",borderRadius:9,fontSize:14,fontWeight:500,textDecoration:"none",background:"transparent",color:C.ink,border:`1px solid ${C.borderStrong}`,letterSpacing:"0.04em"}}>Book a call →</a>
          </div></FI>
        </div>
        <FI d={280}><p style={{marginTop:18,textAlign:"center",fontSize:12,color:C.inkFaint,...T.mono}}>30-day trial on all paid plans. Cancel any time.</p></FI>
      </div>
    </section>
  );
}

function CTA(){
  const[email,setEmail]=useState("");
  const[sent,setSent]=useState(false);
  return(
    <section id="cta" style={{...sec,background:C.accentDeep,textAlign:"center",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:600,height:500,background:`radial-gradient(ellipse,${C.neonSoft} 0%,transparent 70%)`,pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:C.neon,opacity:0.6}}/>
      <div style={{...wrap,maxWidth:580,position:"relative",zIndex:1}}>
        <FI><div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:999,padding:"5px 14px",marginBottom:22}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:C.neon,animation:"hs-pulse 2s infinite"}}/>
          <span style={{...T.eye,fontSize:11,color:"rgba(255,255,255,0.55)"}}>Founding Member Programme — 3 spots left</span>
        </div></FI>
        <FI d={60}><h2 style={{...T.h1,fontSize:"clamp(1.9rem,4vw,2.9rem)",color:"#fff",marginBottom:14}}>Join before the<br/>5 spots are gone.</h2></FI>
        <FI d={120}><p style={{fontSize:16,color:"rgba(255,255,255,0.45)",marginBottom:30,lineHeight:1.78}}>Pay for 6 months. Get 12. No setup fee. Lock in your price before we open to the public.</p></FI>
        <FI d={180}><div style={{display:"flex",justifyContent:"center",gap:6,alignItems:"center",marginBottom:28}}>
          {["T","S","3","4","5"].map((s,i)=><div key={i} style={{width:32,height:32,borderRadius:"50%",background:i<2?"rgba(255,255,255,0.12)":"transparent",color:i<2?C.neon:"rgba(255,255,255,0.22)",border:i<2?"1px solid rgba(255,255,255,0.15)":"1.5px dashed rgba(255,255,255,0.18)",fontSize:10,fontWeight:500,...T.mono,display:"flex",alignItems:"center",justifyContent:"center"}}>{s}</div>)}
          <span style={{fontSize:13,color:"rgba(255,255,255,0.32)",marginLeft:6}}>2 of 5 taken</span>
        </div></FI>
        <FI d={240}>
          {sent?<div style={{fontSize:15,color:C.neon,...T.mono,padding:"14px 0"}}>Got it — we'll reach out within 24 hours. ✓</div>:
          <form onSubmit={e=>{e.preventDefault();if(email)setSent(true);}} style={{display:"flex",gap:9,justifyContent:"center",flexWrap:"wrap",maxWidth:450,margin:"0 auto 18px"}}>
            <input type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} required style={{flex:1,minWidth:190,padding:"12px 16px",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.14)",borderRadius:9,color:"#fff",fontSize:15,fontFamily:"'DM Sans',sans-serif",outline:"none"}}/>
            <button type="submit" style={{display:"inline-flex",alignItems:"center",gap:6,background:C.neon,color:C.accentDeep,padding:"12px 22px",borderRadius:9,fontSize:14,fontWeight:600,border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.04em",transition:"box-shadow 0.2s,transform 0.12s"}} onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 0 24px ${C.neonMid}`;e.currentTarget.style.transform="translateY(-1px)";}} onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none";}}>Claim my spot <Ic.Arr/></button>
          </form>}
        </FI>
        <FI d={300}><div style={{display:"flex",justifyContent:"center",gap:"2rem",flexWrap:"wrap",fontSize:12,color:"rgba(255,255,255,0.25)",letterSpacing:"0.04em"}}>
          {["No credit card needed","30-day trial","Cancel any time","Reply within 24h"].map(t=><span key={t}>{t}</span>)}
        </div></FI>
      </div>
    </section>
  );
}

function Footer(){
  const cols=[
    {title:"Product",links:[["Guest App","#solution"],["Staff App","#solution"],["Owner Dashboard","#solution"],["Pricing","#pricing"]]},
    {title:"Company",links:[["Results","#results"],["Early Adopters","#cta"]]},
    {title:"Get in touch",links:[["Claim your spot →","#cta"],["Book a call →","#cta"]]},
  ];
  return(
    <footer style={{background:C.accentDeep,borderTop:`1px solid rgba(74,248,212,0.08)`,padding:"44px 2rem 28px"}}>
      <div style={wrap}>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:"2rem",marginBottom:32}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:13}}>
              <div style={{width:27,height:27,background:C.accent,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center"}}><Ic.Logo l/></div>
              <span style={{...T.h4,fontSize:15,color:"#fff"}}>hostack</span>
            </div>
            <p style={{fontSize:13,color:"rgba(255,255,255,0.28)",lineHeight:1.7,maxWidth:270,marginBottom:10}}>The system that runs ops — so the manager builds community.</p>
            <div style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:12,color:"rgba(255,255,255,0.22)",letterSpacing:"0.03em"}}><Ic.Glb/><span>Available in Europe & UK</span></div>
          </div>
          {cols.map(col=>(
            <div key={col.title}>
              <h4 style={{...T.eye,fontSize:10,color:"rgba(255,255,255,0.26)",marginBottom:13}}>{col.title}</h4>
              <ul style={{listStyle:"none",padding:0}}>
                {col.links.map(([l,h])=><li key={l} style={{marginBottom:8}}><a href={h} style={{fontSize:13,color:"rgba(255,255,255,0.38)",textDecoration:"none",letterSpacing:"0.02em",transition:"color 0.15s"}} onMouseEnter={e=>e.currentTarget.style.color=C.neon} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.38)"}>{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:20,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <p style={{fontSize:12,color:"rgba(255,255,255,0.18)",letterSpacing:"0.03em"}}>© 2026 Hostack. Available in Europe & UK.</p>
          <p style={{fontSize:12,color:"rgba(255,255,255,0.18)"}}>Built for operators who care about the experience, not just the booking.</p>
        </div>
      </div>
    </footer>
  );
}

export default function App(){
  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden;background:#f4f8f8;}
        @keyframes hs-pulse{0%,100%{opacity:1;}50%{opacity:0.3;}}
        @media(max-width:768px){
          .hs-hero-grid,.hs-g3,.hs-case-grid,.hs-footer-grid{grid-template-columns:1fr!important;}
          .hs-nav-d{display:none!important;}
        }
      `}</style>
      <Header/><main><Hero/><Problem/><Solution/><HowItWorks/><Results/><Features/><Pricing/><CTA/></main><Footer/>
    </>
  );
}
