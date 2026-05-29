"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Check, Star, MessageCircle, ChevronDown } from 'lucide-react';

const WA_LINK = "https://wa.me/2348112476891"; // ← Replace with your real number

/* ── Clickable video card with thumbnail from first frame ── */
function TestimonialVideo({ src, title, subtitle }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [thumbReady, setThumbReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0.001; // seek to near start to generate thumbnail
    const onData = () => setThumbReady(true);
    v.addEventListener('loadeddata', onData);
    return () => v.removeEventListener('loadeddata', onData);
  }, []);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play();
    setPlaying(true);
  };

  return (
    <div className="glass-card rounded-2xl p-3 flex flex-col bg-gradient-to-br from-[#0d1a14] to-[#0a1518]">
      <div className="w-full rounded-xl overflow-hidden relative bg-black border border-white/5" style={{ aspectRatio: '9/16' }}>
        <video
          ref={videoRef}
          src={src}
          preload="metadata"
          playsInline
          controls={playing}
          className="absolute inset-0 w-full h-full object-cover"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <button
            onClick={handlePlay}
            aria-label={`Play ${title} testimonial`}
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: thumbReady ? 'transparent' : 'rgba(0,0,0,0.6)' }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                boxShadow: '0 0 32px rgba(16,185,129,0.5)',
              }}
            >
              {/* Triangle play icon */}
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" style={{ transform: 'translateX(2px)' }}>
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </button>
        )}
      </div>
      <h3 className="font-bold text-center text-base mt-3">{title}</h3>
      <p className="text-emerald-400 text-xs font-medium mb-2 text-center">{subtitle}</p>
      <div className="flex justify-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <main
      className="min-h-screen relative font-sans overflow-x-hidden"
      style={{ background: '#050505', color: '#f8fafc' }}
    >

      {/* Background Glow Orbs */}
      <div style={{ position:'fixed', top:'-100px', left:'50%', transform:'translateX(-50%)', width:'600px', height:'600px', background:'rgba(16,185,129,0.07)', filter:'blur(120px)', borderRadius:'50%', pointerEvents:'none', zIndex:0 }} />
      <div style={{ position:'fixed', bottom:'-200px', right:'-100px', width:'500px', height:'500px', background:'rgba(6,182,212,0.07)', filter:'blur(120px)', borderRadius:'50%', pointerEvents:'none', zIndex:0 }} />

      {/* ── HEADER ── */}
      <header style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, padding:'14px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', background:'rgba(5,5,5,0.85)', backdropFilter:'blur(16px)', borderBottom:'1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <div style={{ width:36, height:36, borderRadius:8, background:'linear-gradient(135deg,#10b981,#06b6d4)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <svg viewBox="0 0 24 24" style={{ width:18, height:18, stroke:'white', fill:'none', strokeWidth:2.5 }}>
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span style={{ fontWeight:800, fontSize:16, letterSpacing:'-0.02em' }}>OP5 Technologies</span>
        </div>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:99, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.04)', fontSize:13, fontWeight:500, color:'inherit', textDecoration:'none', whiteSpace:'nowrap' }}>
          <MessageCircle style={{ width:15, height:15 }} />
          <span>Chat with an Engineer</span>
        </a>
      </header>

      {/* ── HERO ── */}
      <section style={{ paddingTop:100, paddingBottom:60, paddingLeft:20, paddingRight:20, maxWidth:600, margin:'0 auto', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center' }}>

        {/* Badge */}
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px', borderRadius:99, border:'1px solid rgba(16,185,129,0.3)', background:'rgba(16,185,129,0.1)', color:'#34d399', fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:28 }}>
          <span style={{ width:8, height:8, borderRadius:'50%', background:'#10b981', animation:'pulse 2s infinite' }} />
          Next-Gen AI Automation
        </div>

        <h1 style={{ fontSize:'clamp(2rem, 8vw, 3.5rem)', fontWeight:900, lineHeight:1.1, letterSpacing:'-0.02em', marginBottom:20, margin:'0 0 20px 0' }}>
          Stop Buying Basic Websites.{' '}
          <span style={{ background:'linear-gradient(90deg,#34d399,#22d3ee)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            Build a Sales Engine.
          </span>
        </h1>

        <p style={{ fontSize:16, color:'#94a3b8', maxWidth:480, lineHeight:1.7, marginBottom:32, fontWeight:300 }}>
          Your business leaks money every time you step away from your phone. We connect lightning-fast web architecture directly to a custom AI WhatsApp agent that haggles and closes deals 24/7.
        </p>

        <a href="#packages" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'14px 32px', background:'#f8fafc', color:'#000', borderRadius:99, fontWeight:700, fontSize:15, textDecoration:'none', marginBottom:40, transition:'all 0.2s' }}>
          <MessageCircle style={{ width:18, height:18 }} />
          See The Packages
        </a>

        {/* Hero VSL — PORTRAIT */}
        <div style={{ width:'100%', maxWidth:340, padding:2, borderRadius:20, background:'linear-gradient(135deg, rgba(16,185,129,0.35), rgba(6,182,212,0.2))', boxShadow:'0 0 60px rgba(16,185,129,0.15)' }}>
          <div style={{ borderRadius:18, overflow:'hidden', background:'#0d0d0d', aspectRatio:'9/16', position:'relative' }}>
            <video
              src="/intro.mp4"
              controls
              playsInline
              style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
            />
          </div>
        </div>

        <div style={{ marginTop:28, color:'#475569' }}>
          <ChevronDown style={{ width:20, height:20, animation:'bounce 2s infinite' }} />
        </div>
      </section>

      {/* ── WALL OF PROOF ── */}
      <section style={{ padding:'80px 20px', background:'linear-gradient(180deg, #050505, #080d0a, #050505)' }} id="proof">
        <div style={{ maxWidth:640, margin:'0 auto' }}>

          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#34d399', marginBottom:12 }}>The Results Speak</div>
            <h2 style={{ fontSize:'clamp(1.8rem, 6vw, 2.8rem)', fontWeight:900, marginBottom:12 }}>Undeniable Proof.</h2>
            <p style={{ color:'#94a3b8', fontSize:15, maxWidth:400, margin:'0 auto' }}>Real clients. Real results. No fluff, no stock photos — just the work and the outcomes.</p>
          </div>

          {/* Testimonial Videos — side by side on mobile */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, maxWidth:600, margin:'0 auto 60px' }}>
            <TestimonialVideo
              src="/cre8ifhub.mp4"
              title="Creative Hub Founder"
              subtitle="Automated Client Infrastructure"
            />
            <TestimonialVideo
              src="/benedicta.mp4"
              title="Benedicta"
              subtitle="3x Repeat Client"
            />
          </div>

          {/* Upwork Screenshots */}
          <div>
            <div style={{ textAlign:'center', fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#34d399', marginBottom:24 }}>5-Star Upwork Reviews</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:12 }}>
              {['/review-1.png', '/review-2.png', '/review-3.png'].map((src, i) => (
                <div key={i} style={{ borderRadius:16, overflow:'hidden', border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.03)' }}>
                  <img
                    src={src}
                    alt={`Upwork Review ${i + 1}`}
                    style={{ width:'100%', height:'auto', display:'block', objectFit:'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section style={{ padding:'80px 20px', maxWidth:640, margin:'0 auto' }} id="packages">
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#34d399', marginBottom:12 }}>Three-Tier Architecture</div>
          <h2 style={{ fontSize:'clamp(1.8rem, 6vw, 2.8rem)', fontWeight:900, marginBottom:12 }}>Choose Your Engine.</h2>
          <p style={{ color:'#94a3b8', fontSize:15 }}>We build systems, not brochures. Select the infrastructure that fits your current volume.</p>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

          {/* TIER 1 */}
          <div style={{ padding:28, borderRadius:24, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.1em', color:'#64748b', textTransform:'uppercase', marginBottom:6 }}>Tier 01</div>
            <h3 style={{ fontSize:22, fontWeight:800, marginBottom:4 }}>The Corporate Foundation</h3>
            <p style={{ fontSize:13, color:'#64748b', fontStyle:'italic', marginBottom:20 }}>Pricing on consultation</p>
            <div style={{ height:1, background:'rgba(255,255,255,0.08)', marginBottom:20 }} />
            <ul style={{ listStyle:'none', padding:0, margin:'0 0 24px', display:'flex', flexDirection:'column', gap:14 }}>
              {['High-Speed Custom Platform','Corporate Email Suite','Direct WhatsApp Routing','Backend SEO Structuring'].map((f,i) => (
                <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:14, color:'#cbd5e1' }}>
                  <Check style={{ width:18, height:18, color:'#10b981', flexShrink:0, marginTop:1 }} />{f}
                </li>
              ))}
            </ul>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, width:'100%', padding:'12px 0', borderRadius:99, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)', fontSize:14, fontWeight:600, color:'inherit', textDecoration:'none' }}>
              <MessageCircle style={{ width:16, height:16 }} />Discuss This Setup
            </a>
          </div>

          {/* TIER 2 — FEATURED */}
          <div style={{ padding:28, borderRadius:24, background:'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(6,182,212,0.05))', border:'1px solid #10b981', boxShadow:'0 0 50px rgba(16,185,129,0.12)', position:'relative' }}>
            <div style={{ position:'absolute', top:-14, left:'50%', transform:'translateX(-50%)', padding:'4px 16px', background:'linear-gradient(90deg,#10b981,#06b6d4)', borderRadius:99, fontSize:10, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'white', display:'flex', alignItems:'center', gap:4, whiteSpace:'nowrap' }}>
              <Star style={{ width:10, height:10, fill:'white', stroke:'none' }} />Most Popular
            </div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.1em', color:'#34d399', textTransform:'uppercase', marginBottom:6 }}>Tier 02</div>
            <h3 style={{ fontSize:22, fontWeight:800, marginBottom:4 }}>The AI Revenue Engine</h3>
            <p style={{ fontSize:13, color:'#64748b', fontStyle:'italic', marginBottom:20 }}>Pricing on consultation</p>
            <div style={{ height:1, background:'rgba(255,255,255,0.08)', marginBottom:20 }} />
            <ul style={{ listStyle:'none', padding:0, margin:'0 0 24px', display:'flex', flexDirection:'column', gap:14 }}>
              <li style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:14, color:'#cbd5e1' }}>
                <Check style={{ width:18, height:18, color:'#10b981', flexShrink:0, marginTop:1 }} />Everything in Tier 1, plus:
              </li>
              {['Custom AI WhatsApp Negotiator','Automated Lead Vault','Smart Human Handoff'].map((f,i) => (
                <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:14, fontWeight:700, color:'white' }}>
                  <Check style={{ width:18, height:18, color:'#10b981', flexShrink:0, marginTop:1 }} />{f}
                </li>
              ))}
            </ul>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, width:'100%', padding:'14px 0', borderRadius:99, background:'linear-gradient(90deg,#10b981,#06b6d4)', fontSize:15, fontWeight:700, color:'white', textDecoration:'none' }}>
              <MessageCircle style={{ width:18, height:18 }} />Build My AI Engine
            </a>
          </div>

          {/* TIER 3 */}
          <div style={{ padding:28, borderRadius:24, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.1em', color:'#64748b', textTransform:'uppercase', marginBottom:6 }}>Tier 03</div>
            <h3 style={{ fontSize:22, fontWeight:800, marginBottom:4 }}>The Market Dominator</h3>
            <p style={{ fontSize:13, color:'#64748b', fontStyle:'italic', marginBottom:20 }}>Pricing on consultation</p>
            <div style={{ height:1, background:'rgba(255,255,255,0.08)', marginBottom:20 }} />
            <ul style={{ listStyle:'none', padding:0, margin:'0 0 24px', display:'flex', flexDirection:'column', gap:14 }}>
              <li style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:14, color:'#cbd5e1' }}>
                <Check style={{ width:18, height:18, color:'#10b981', flexShrink:0, marginTop:1 }} />Everything in Tier 2, plus:
              </li>
              {['Multi-Agent CRM Dispatch','Day-One Traffic Injection','Priority Architecture Support'].map((f,i) => (
                <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:14, fontWeight:700, color:'white' }}>
                  <Check style={{ width:18, height:18, color:'#10b981', flexShrink:0, marginTop:1 }} />{f}
                </li>
              ))}
            </ul>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, width:'100%', padding:'12px 0', borderRadius:99, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.05)', fontSize:14, fontWeight:600, color:'inherit', textDecoration:'none' }}>
              <MessageCircle style={{ width:16, height:16 }} />Apply For Enterprise
            </a>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding:'60px 20px', textAlign:'center' }}>
        <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#64748b', marginBottom:20 }}>Still have questions?</p>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'16px 36px', borderRadius:99, background:'linear-gradient(90deg,#10b981,#06b6d4)', color:'white', fontWeight:700, fontSize:16, textDecoration:'none', boxShadow:'0 10px 40px rgba(16,185,129,0.3)' }}>
          <MessageCircle style={{ width:20, height:20 }} />Talk to Precious Directly
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding:'40px 20px', borderTop:'1px solid rgba(255,255,255,0.08)', textAlign:'center', background:'#050505' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginBottom:12 }}>
          <div style={{ width:24, height:24, borderRadius:6, background:'linear-gradient(135deg,#10b981,#06b6d4)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg viewBox="0 0 24 24" style={{ width:12, height:12, stroke:'white', fill:'none', strokeWidth:3 }}>
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span style={{ fontWeight:800, letterSpacing:'-0.02em' }}>OP5 Technologies</span>
        </div>
        <p style={{ color:'#64748b', fontSize:13, marginBottom:8 }}>We don&apos;t build websites. We build Sales Engines.</p>
        <p style={{ color:'#334155', fontSize:11 }}>&copy; 2026 OP5 Technologies. All rights reserved.</p>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>
    </main>
  );
}