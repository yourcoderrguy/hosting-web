"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Check, Star, MessageCircle, ChevronDown } from 'lucide-react';

const WA_LINK = "https://wa.me/2348112476891"; // ← Replace with your real WhatsApp number

function TestimonialVideo({ src, title, subtitle }: { src: string; title: string; subtitle: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0.001;
  }, []);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play();
    setPlaying(true);
  };

  return (
    <div style={{
      borderRadius: 20,
      padding: 12,
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #0d1a14, #0a1518)',
      border: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{
        width: '100%',
        aspectRatio: '9/16',
        borderRadius: 14,
        overflow: 'hidden',
        position: 'relative',
        background: '#000',
        border: '1px solid rgba(255,255,255,0.05)',
        marginBottom: 12,
      }}>
        <video
          ref={videoRef}
          src={src}
          preload="metadata"
          playsInline
          controls={playing}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <button
            onClick={handlePlay}
            aria-label={`Play ${title}`}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.25)',
              border: 'none', cursor: 'pointer',
            }}
          >
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'linear-gradient(135deg,#10b981,#06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 28px rgba(16,185,129,0.5)',
            }}>
              <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, fill: 'white', transform: 'translateX(2px)' }}>
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </button>
        )}
      </div>
      <p style={{ fontFamily: "'Anton', sans-serif", fontSize: 16, textAlign: 'center', margin: '0 0 4px', letterSpacing: '0.02em' }}>{title}</p>
      <p style={{ fontSize: 12, color: '#34d399', fontWeight: 600, textAlign: 'center', margin: '0 0 8px' }}>{subtitle}</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} style={{ width: 13, height: 13, color: '#10b981', fill: '#10b981' }} />
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <>
      {/* Google Fonts — Anton for headings, DM Sans for body */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #050505; color: #f8fafc; overflow-x: hidden; font-family: 'DM Sans', sans-serif; }

        .hero-heading {
          font-family: 'Anton', sans-serif;
          font-size: clamp(3.2rem, 13vw, 7rem);
          line-height: 0.95;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .section-heading {
          font-family: 'Anton', sans-serif;
          font-size: clamp(2.4rem, 9vw, 4rem);
          line-height: 1;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .tier-heading {
          font-family: 'Anton', sans-serif;
          font-size: clamp(1.4rem, 5vw, 1.8rem);
          line-height: 1;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .gradient-text {
          background: linear-gradient(90deg, #34d399, #22d3ee);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px;
          background: #f8fafc; color: #000;
          border-radius: 99px; font-weight: 700; font-size: 15px;
          text-decoration: none; border: none; cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(255,255,255,0.12); }

        .btn-gradient {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 14px 0;
          background: linear-gradient(90deg, #10b981, #06b6d4);
          color: white; border-radius: 99px;
          font-weight: 700; font-size: 15px;
          text-decoration: none; border: none; cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-gradient:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(16,185,129,0.3); }

        .btn-ghost {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 12px 0;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: white; border-radius: 99px;
          font-weight: 600; font-size: 14px;
          text-decoration: none; cursor: pointer;
          transition: background 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.1); }

        .glass-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .tier-card {
          padding: 28px;
          border-radius: 24px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .tier-featured {
          padding: 28px;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(16,185,129,0.1), rgba(6,182,212,0.05));
          border: 1px solid #10b981;
          box-shadow: 0 0 50px rgba(16,185,129,0.12);
          position: relative;
        }

        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }

        .pulse { animation: pulse 2s infinite; }
        .bounce { animation: bounce 2s infinite; }

        /* Desktop overrides */
        @media (min-width: 768px) {
          .packages-grid { display: grid !important; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
          .reviews-grid { grid-template-columns: 1fr 1fr 1fr !important; }
          .hero-section { max-width: 900px !important; }
          .hero-heading { font-size: clamp(4rem, 8vw, 7rem) !important; }
        }
      `}</style>

      <main style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>

        {/* Glow orbs */}
        <div style={{ position:'fixed', top:'-100px', left:'50%', transform:'translateX(-50%)', width:'700px', height:'700px', background:'rgba(16,185,129,0.07)', filter:'blur(130px)', borderRadius:'50%', pointerEvents:'none', zIndex:0 }} />
        <div style={{ position:'fixed', bottom:'-200px', right:'-100px', width:'500px', height:'500px', background:'rgba(6,182,212,0.07)', filter:'blur(120px)', borderRadius:'50%', pointerEvents:'none', zIndex:0 }} />

        {/* ── HEADER ── */}
        <header style={{
          position:'fixed', top:0, left:0, right:0, zIndex:50,
          padding:'14px 20px',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          background:'rgba(5,5,5,0.88)',
          backdropFilter:'blur(20px)',
          WebkitBackdropFilter:'blur(20px)',
          borderBottom:'1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:8, background:'linear-gradient(135deg,#10b981,#06b6d4)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <svg viewBox="0 0 24 24" style={{ width:18, height:18, stroke:'white', fill:'none', strokeWidth:2.5 }}>
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <span style={{ fontFamily:"'DM Sans', sans-serif", fontWeight:800, fontSize:16, letterSpacing:'-0.02em' }}>OP5 Technologies</span>
          </div>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{
            display:'flex', alignItems:'center', gap:6,
            padding:'8px 16px', borderRadius:99,
            border:'1px solid rgba(255,255,255,0.1)',
            background:'rgba(255,255,255,0.04)',
            fontSize:13, fontWeight:500, color:'white', textDecoration:'none',
            fontFamily:"'DM Sans', sans-serif",
          }}>
            <MessageCircle style={{ width:15, height:15 }} />
            <span>Chat with an Engineer</span>
          </a>
        </header>

        {/* ── HERO ── */}
        <section className="hero-section" style={{
          paddingTop:110, paddingBottom:60, paddingLeft:20, paddingRight:20,
          maxWidth:640, margin:'0 auto',
          display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center',
          position:'relative', zIndex:1,
        }}>
          {/* Badge */}
          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            padding:'6px 16px', borderRadius:99,
            border:'1px solid rgba(16,185,129,0.3)',
            background:'rgba(16,185,129,0.1)',
            color:'#34d399', fontSize:11, fontWeight:700,
            letterSpacing:'0.12em', textTransform:'uppercase',
            marginBottom:32, fontFamily:"'DM Sans', sans-serif",
          }}>
            <span className="pulse" style={{ width:8, height:8, borderRadius:'50%', background:'#10b981', display:'inline-block' }} />
            Next-Gen AI Automation
          </div>

          <h1 className="hero-heading">
            Stop Buying<br />
            Basic Websites.<br />
            <span className="gradient-text">Build a Sales<br />Engine.</span>
          </h1>

          <p style={{
            fontSize:16, color:'#94a3b8', maxWidth:480,
            lineHeight:1.75, marginBottom:36, fontWeight:300,
            fontFamily:"'DM Sans', sans-serif",
          }}>
            Your business leaks money every time you step away from your phone. We connect lightning-fast web architecture directly to a custom AI WhatsApp agent that haggles and closes deals 24/7.
          </p>

          <a href="#packages" className="btn-primary" style={{ marginBottom:48 }}>
            <MessageCircle style={{ width:18, height:18 }} />
            See The Packages
          </a>

          {/* Hero VSL — Portrait 9:16 */}
          <div style={{
            width:'100%', maxWidth:340,
            padding:2, borderRadius:22,
            background:'linear-gradient(135deg, rgba(16,185,129,0.4), rgba(6,182,212,0.25))',
            boxShadow:'0 0 70px rgba(16,185,129,0.18)',
          }}>
            <div style={{ borderRadius:20, overflow:'hidden', background:'#000', aspectRatio:'9/16', position:'relative' }}>
              <video
                src="/intro.mp4"
                controls
                playsInline
                preload="metadata"
                style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}
              />
            </div>
          </div>

          <div className="bounce" style={{ marginTop:28, color:'#475569' }}>
            <ChevronDown style={{ width:20, height:20 }} />
          </div>
        </section>

        {/* ── WALL OF PROOF ── */}
        <section id="proof" style={{
          padding:'80px 20px',
          background:'linear-gradient(180deg, #050505 0%, #080d0a 50%, #050505 100%)',
          position:'relative', zIndex:1,
        }}>
          <div style={{ maxWidth:680, margin:'0 auto' }}>

            <div style={{ textAlign:'center', marginBottom:48 }}>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#34d399', marginBottom:14, fontFamily:"'DM Sans', sans-serif" }}>
                The Results Speak
              </p>
              <h2 className="section-heading">Undeniable Proof.</h2>
              <p style={{ color:'#94a3b8', fontSize:15, maxWidth:420, margin:'0 auto', fontFamily:"'DM Sans', sans-serif" }}>
                Real clients. Real results. No fluff, no stock photos — just the work and the outcomes.
              </p>
            </div>

            {/* Testimonial Videos */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, maxWidth:620, margin:'0 auto 64px' }}>
              <TestimonialVideo src="/cre8ifhub.mp4" title="Creative Hub Founder" subtitle="Automated Client Infrastructure" />
              <TestimonialVideo src="/benedicta.mp4" title="Benedicta" subtitle="3x Repeat Client" />
            </div>

            {/* Upwork Reviews */}
            <div>
              <p style={{ textAlign:'center', fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#34d399', marginBottom:24, fontFamily:"'DM Sans', sans-serif" }}>
                5-Star Upwork Reviews
              </p>
              <div className="reviews-grid" style={{ display:'grid', gridTemplateColumns:'1fr', gap:14 }}>
                {['/review-1.png', '/review-2.png', '/review-3.png'].map((src, i) => (
                  <div key={i} style={{ borderRadius:16, overflow:'hidden', border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.02)' }}>
                    <img src={src} alt={`Upwork Review ${i + 1}`} style={{ width:'100%', height:'auto', display:'block' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PACKAGES ── */}
        <section id="packages" style={{ padding:'80px 20px', maxWidth:680, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#34d399', marginBottom:14, fontFamily:"'DM Sans', sans-serif" }}>
              Three-Tier Architecture
            </p>
            <h2 className="section-heading">Choose Your Engine.</h2>
            <p style={{ color:'#94a3b8', fontSize:15, fontFamily:"'DM Sans', sans-serif" }}>
              We build systems, not brochures. Select the infrastructure that fits your current volume.
            </p>
          </div>

          <div className="packages-grid" style={{ display:'flex', flexDirection:'column', gap:16 }}>

            {/* TIER 1 */}
            <div className="tier-card">
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.12em', color:'#64748b', textTransform:'uppercase', marginBottom:8, fontFamily:"'DM Sans', sans-serif" }}>Tier 01</p>
              <h3 className="tier-heading">The Corporate Foundation</h3>
              <p style={{ fontSize:13, color:'#64748b', fontStyle:'italic', marginBottom:20, fontFamily:"'DM Sans', sans-serif" }}>Pricing on consultation</p>
              <div style={{ height:1, background:'rgba(255,255,255,0.08)', marginBottom:20 }} />
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:14, marginBottom:24 }}>
                {['High-Speed Custom Platform','Corporate Email Suite','Direct WhatsApp Routing','Backend SEO Structuring'].map((f,i) => (
                  <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:14, color:'#cbd5e1', fontFamily:"'DM Sans', sans-serif" }}>
                    <Check style={{ width:18, height:18, color:'#10b981', flexShrink:0, marginTop:1 }} />{f}
                  </li>
                ))}
              </ul>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <MessageCircle style={{ width:16, height:16 }} />Discuss This Setup
              </a>
            </div>

            {/* TIER 2 — FEATURED */}
            <div className="tier-featured">
              <div style={{
                position:'absolute', top:-14, left:'50%', transform:'translateX(-50%)',
                padding:'4px 16px', background:'linear-gradient(90deg,#10b981,#06b6d4)',
                borderRadius:99, fontSize:10, fontWeight:700, letterSpacing:'0.1em',
                textTransform:'uppercase', color:'white',
                display:'flex', alignItems:'center', gap:4, whiteSpace:'nowrap',
                fontFamily:"'DM Sans', sans-serif",
              }}>
                <Star style={{ width:10, height:10, fill:'white', stroke:'none' }} />Most Popular
              </div>
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.12em', color:'#34d399', textTransform:'uppercase', marginBottom:8, fontFamily:"'DM Sans', sans-serif" }}>Tier 02</p>
              <h3 className="tier-heading">The AI Revenue Engine</h3>
              <p style={{ fontSize:13, color:'#64748b', fontStyle:'italic', marginBottom:20, fontFamily:"'DM Sans', sans-serif" }}>Pricing on consultation</p>
              <div style={{ height:1, background:'rgba(255,255,255,0.08)', marginBottom:20 }} />
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:14, marginBottom:24 }}>
                <li style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:14, color:'#cbd5e1', fontFamily:"'DM Sans', sans-serif" }}>
                  <Check style={{ width:18, height:18, color:'#10b981', flexShrink:0, marginTop:1 }} />Everything in Tier 1, plus:
                </li>
                {['Custom AI WhatsApp Negotiator','Automated Lead Vault','Smart Human Handoff'].map((f,i) => (
                  <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:14, fontWeight:700, color:'white', fontFamily:"'DM Sans', sans-serif" }}>
                    <Check style={{ width:18, height:18, color:'#10b981', flexShrink:0, marginTop:1 }} />{f}
                  </li>
                ))}
              </ul>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-gradient">
                <MessageCircle style={{ width:18, height:18 }} />Build My AI Engine
              </a>
            </div>

            {/* TIER 3 */}
            <div className="tier-card">
              <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.12em', color:'#64748b', textTransform:'uppercase', marginBottom:8, fontFamily:"'DM Sans', sans-serif" }}>Tier 03</p>
              <h3 className="tier-heading">The Market Dominator</h3>
              <p style={{ fontSize:13, color:'#64748b', fontStyle:'italic', marginBottom:20, fontFamily:"'DM Sans', sans-serif" }}>Pricing on consultation</p>
              <div style={{ height:1, background:'rgba(255,255,255,0.08)', marginBottom:20 }} />
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:14, marginBottom:24 }}>
                <li style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:14, color:'#cbd5e1', fontFamily:"'DM Sans', sans-serif" }}>
                  <Check style={{ width:18, height:18, color:'#10b981', flexShrink:0, marginTop:1 }} />Everything in Tier 2, plus:
                </li>
                {['Multi-Agent CRM Dispatch','Day-One Traffic Injection','Priority Architecture Support'].map((f,i) => (
                  <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:10, fontSize:14, fontWeight:700, color:'white', fontFamily:"'DM Sans', sans-serif" }}>
                    <Check style={{ width:18, height:18, color:'#10b981', flexShrink:0, marginTop:1 }} />{f}
                  </li>
                ))}
              </ul>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <MessageCircle style={{ width:16, height:16 }} />Apply For Enterprise
              </a>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section style={{ padding:'60px 20px', textAlign:'center', position:'relative', zIndex:1 }}>
          <p style={{ fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#64748b', marginBottom:20, fontFamily:"'DM Sans', sans-serif" }}>
            Still have questions?
          </p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{
            display:'inline-flex', alignItems:'center', gap:10,
            padding:'16px 36px', borderRadius:99,
            background:'linear-gradient(90deg,#10b981,#06b6d4)',
            color:'white', fontWeight:700, fontSize:16,
            textDecoration:'none',
            boxShadow:'0 10px 40px rgba(16,185,129,0.3)',
            fontFamily:"'DM Sans', sans-serif",
          }}>
            <MessageCircle style={{ width:20, height:20 }} />Talk to Precious Directly
          </a>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ padding:'40px 20px', borderTop:'1px solid rgba(255,255,255,0.08)', textAlign:'center', background:'#050505', position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, marginBottom:12 }}>
            <div style={{ width:24, height:24, borderRadius:6, background:'linear-gradient(135deg,#10b981,#06b6d4)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg viewBox="0 0 24 24" style={{ width:12, height:12, stroke:'white', fill:'none', strokeWidth:3 }}>
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <span style={{ fontFamily:"'DM Sans', sans-serif", fontWeight:800, letterSpacing:'-0.02em' }}>OP5 Technologies</span>
          </div>
          <p style={{ color:'#64748b', fontSize:13, marginBottom:8, fontFamily:"'DM Sans', sans-serif" }}>We don&apos;t build websites. We build Sales Engines.</p>
          <p style={{ color:'#334155', fontSize:11, fontFamily:"'DM Sans', sans-serif" }}>&copy; 2026 OP5 Technologies. All rights reserved.</p>
        </footer>

      </main>
    </>
  );
}