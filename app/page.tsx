"use client";

import React, { useRef, useState, useEffect, useCallback, createContext, useContext } from 'react';
import { Check, Star, MessageCircle, ChevronDown, Zap, Bot, TrendingUp, Phone, Clock, DollarSign, X } from 'lucide-react';

/* ────────────────────────────────────────────────
   WHATSAPP LINKS
──────────────────────────────────────────────── */
const PHONE = "2348112476891";
function wa(msg: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
}
const WA = {
  engineer:     wa("Hi Precious 👋 I just visited the OP5 Technologies website and I'd like to chat with an engineer about what you can build for my business."),
  strategyCall: wa("Hi Precious 👋 I saw the OP5 Technologies landing page and I'm interested in booking a free strategy call. I want to understand how the AI Sales Engine can work for my business."),
  tier1:        wa("Hi Precious 👋 I'm interested in The Foundation package. I visited your website and I'd like to discuss this setup and get pricing details."),
  tier2:        wa("Hi Precious 👋 I want to build The Sales Machine (Tier 2). I visited your website and I'm ready to discuss how this works and what it costs for my business."),
  tier3:        wa("Hi Precious 👋 I'm interested in The Growth System. I visited your website and I'd like to apply for the enterprise setup and get pricing."),
  talkDirectly: wa("Hi Precious 👋 I went through the OP5 Technologies website and I still have some questions. Can we talk directly so you can help me figure out the right setup for my business?"),
  stickyBar:    wa("Hi Precious 👋 I was on the OP5 Technologies website and had a question. Can I ask you something quickly?"),
};

/* ────────────────────────────────────────────────
   GLOBAL VIDEO MANAGER
──────────────────────────────────────────────── */
type VideoRegistry = Map<string, HTMLVideoElement>;
const VideoContext = createContext<{
  register:   (id: string, el: HTMLVideoElement) => void;
  unregister: (id: string) => void;
  notifyPlay: (id: string) => void;
} | null>(null);

function VideoProvider({ children }: { children: React.ReactNode }) {
  const registry  = useRef<VideoRegistry>(new Map());
  const register   = useCallback((id: string, el: HTMLVideoElement) => { registry.current.set(id, el); }, []);
  const unregister = useCallback((id: string) => { registry.current.delete(id); }, []);
  const notifyPlay = useCallback((id: string) => {
    registry.current.forEach((video, vid) => {
      if (vid !== id && !video.paused) video.pause();
    });
  }, []);
  return <VideoContext.Provider value={{ register, unregister, notifyPlay }}>{children}</VideoContext.Provider>;
}

/* ────────────────────────────────────────────────
   TESTIMONIAL VIDEO CARD
   Fix 1: thumbReady falls back to true after 800 ms
           so the play button always becomes visible.
   Fix 2: card background is solid   no gradient  
           to eliminate the WebKit compositing glitch.
──────────────────────────────────────────────── */
let _vidCounter = 0;
function TestimonialVideo({ src, title, subtitle }: { src: string; title: string; subtitle: string }) {
  const videoRef     = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef        = useRef<string>(`vid-${++_vidCounter}`);
  const [playing,   setPlaying]   = useState(false);
  const [thumbReady, setThumbReady] = useState(false);
  const ctx = useContext(VideoContext);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !ctx) return;
    ctx.register(idRef.current, v);
    return () => ctx.unregister(idRef.current);
  }, [ctx]);

  /* Thumbnail: seek to 0.5 s on metadata load.
     If seeked/canplay never fires (iOS Safari), fall back after 800 ms. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const reveal  = () => setThumbReady(true);
    const onMeta  = () => { try { v.currentTime = 0.5; } catch (_) { reveal(); } };
    const timer   = setTimeout(reveal, 800); // fallback

    v.addEventListener('loadedmetadata', onMeta);
    v.addEventListener('seeked',         reveal);
    v.addEventListener('canplay',        reveal);

    // If metadata already loaded (cached)
    if (v.readyState >= 1) onMeta();

    return () => {
      clearTimeout(timer);
      v.removeEventListener('loadedmetadata', onMeta);
      v.removeEventListener('seeked',         reveal);
      v.removeEventListener('canplay',        reveal);
    };
  }, []);

  /* Pause when scrolled out of view */
  useEffect(() => {
    const el = containerRef.current;
    const v  = videoRef.current;
    if (!el || !v) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting && !v.paused) { v.pause(); setPlaying(false); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    ctx?.notifyPlay(idRef.current);
    v.currentTime = 0;
    v.play();
    setPlaying(true);
  };

  return (
    <div
      ref={containerRef}
      style={{
        borderRadius: 16,
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        /* Solid colour   no gradient   prevents WebKit compositing scan-line glitch */
        background: '#0d1a14',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ width: '100%', borderRadius: 12, overflow: 'hidden', position: 'relative', background: '#000', aspectRatio: '9/16' }}>
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

        {/* Skeleton shown only while thumbnail hasn't loaded yet */}
        {!thumbReady && !playing && (
          <div style={{ position: 'absolute', inset: 0, background: '#0d1a14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid rgba(16,185,129,0.2)', borderTopColor: '#10b981', animation: 'spin 0.8s linear infinite' }} />
          </div>
        )}

        {/* Play button   always rendered once thumbReady, opacity transition keeps it smooth */}
        {!playing && (
          <button
            onClick={thumbReady ? handlePlay : undefined}
            aria-label={`Play ${title} testimonial`}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: thumbReady ? 'rgba(0,0,0,0.3)' : 'transparent',
              border: 'none',
              cursor: thumbReady ? 'pointer' : 'default',
              opacity: thumbReady ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          >
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#10b981,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 32px rgba(16,185,129,0.5)' }}>
              <svg viewBox="0 0 24 24" style={{ width: 24, height: 24, fill: 'white', transform: 'translateX(2px)' }}><polygon points="5,3 19,12 5,21" /></svg>
            </div>
          </button>
        )}
      </div>

      <h3 style={{ fontWeight: 700, textAlign: 'center', fontSize: 14, margin: '12px 0 4px' }}>{title}</h3>
      <p style={{ color: '#34d399', fontSize: 12, fontWeight: 500, marginBottom: 8, textAlign: 'center' }}>{subtitle}</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        {[...Array(5)].map((_, i) => <Star key={i} style={{ width: 13, height: 13, color: '#10b981', fill: '#10b981' }} />)}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   HERO VIDEO
──────────────────────────────────────────────── */
function HeroVideo() {
  const videoRef     = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef        = useRef<string>(`vid-${++_vidCounter}`);
  const ctx = useContext(VideoContext);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !ctx) return;
    ctx.register(idRef.current, v);
    return () => ctx.unregister(idRef.current);
  }, [ctx]);

  useEffect(() => {
    const el = containerRef.current;
    const v  = videoRef.current;
    if (!el || !v) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting && !v.paused) v.pause();
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', maxWidth: 340, padding: 2, borderRadius: 20, background: 'linear-gradient(135deg,rgba(16,185,129,0.35),rgba(6,182,212,0.2))', boxShadow: '0 0 60px rgba(16,185,129,0.15)' }}>
      <div style={{ borderRadius: 18, overflow: 'hidden', background: '#0d0d0d', aspectRatio: '9/16', position: 'relative' }}>
        <video
          ref={videoRef}
          src="/intro.mp4"
          controls
          playsInline
          preload="metadata"
          onPlay={() => ctx?.notifyPlay(idRef.current)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   STICKY BOTTOM BAR
──────────────────────────────────────────────── */
function StickyBar() {
  const [visible,   setVisible]  = useState(false);
  const [dismissed, setDismiss]  = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      transform: visible ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
      padding: '12px 16px',
      paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
      background: 'rgba(8,8,8,0.97)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(16,185,129,0.2)',
      boxShadow: '0 -8px 40px rgba(0,0,0,0.6)',
    }}>
      <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', animation: 'pulse 2s infinite', flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#f8fafc', lineHeight: 1.3 }}>Have a question? Just ask.</p>
          <p style={{ margin: 0, fontSize: 11, color: '#64748b', lineHeight: 1.3 }}>Precious replies personally   usually within minutes.</p>
        </div>
        <a
          href={WA.stickyBar}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 99, background: 'linear-gradient(90deg,#10b981,#06b6d4)', color: 'white', fontWeight: 700, fontSize: 13, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0, boxShadow: '0 4px 16px rgba(16,185,129,0.35)' }}
        >
          <MessageCircle style={{ width: 14, height: 14 }} />
          Ask Us Anything
        </a>
        <button
          onClick={() => { setDismiss(true); setVisible(false); }}
          aria-label="Dismiss"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#475569', flexShrink: 0, display: 'flex', alignItems: 'center' }}
        >
          <X style={{ width: 16, height: 16 }} />
        </button>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   MAIN PAGE
──────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <VideoProvider>
      <StickyBar />
      <main style={{ minHeight: '100vh', position: 'relative', fontFamily: 'sans-serif', overflowX: 'hidden', background: '#050505', color: '#f8fafc' }}>

        {/* Background Glow Orbs */}
        <div style={{ position: 'fixed', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'rgba(16,185,129,0.07)', filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'fixed', bottom: '-200px', right: '-100px', width: '500px', height: '500px', background: 'rgba(6,182,212,0.07)', filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />

        {/* ── HEADER ── */}
        <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg,#10b981,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, stroke: 'white', fill: 'none', strokeWidth: 2.5 }}>
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.02em' }}>OP5 Technologies</span>
          </div>
          <a href={WA.engineer} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 99, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', fontSize: 13, fontWeight: 500, color: 'inherit', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            <MessageCircle style={{ width: 15, height: 15 }} />
            <span>Chat with an Engineer</span>
          </a>
        </header>

        {/* ── HERO ── */}
        <section style={{ paddingTop: 100, paddingBottom: 60, paddingLeft: 20, paddingRight: 20, maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.1)', color: '#34d399', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 28 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', animation: 'pulse 2s infinite', display: 'inline-block' }} />
            Helping Businesses Sell More 24/7
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,8vw,3.5rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 20px 0' }}>
            Your Website Can Automatically Answer Your Customers{' '}
            <span style={{ background: 'linear-gradient(90deg,#34d399,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Even When You&apos;re Away.
            </span>
          </h1>
          <p style={{ fontSize: 16, color: '#94a3b8', maxWidth: 480, lineHeight: 1.7, marginBottom: 32, fontWeight: 300 }}>
            Stop staying glued to your phone because of customers... Go do other things and your Whatsapp responds to your customers seamlessly
          </p>
          <a href="#packages" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: '#f8fafc', color: '#000', borderRadius: 99, fontWeight: 700, fontSize: 15, textDecoration: 'none', marginBottom: 40 }}>
            <MessageCircle style={{ width: 18, height: 18 }} />
            This is How
          </a>
          <HeroVideo />
          <div style={{ marginTop: 28, color: '#475569' }}>
            <ChevronDown style={{ width: 20, height: 20, animation: 'bounce 2s infinite' }} />
          </div>
        </section>

        {/* ── THE PROBLEM ── */}
        <section style={{ padding: '60px 20px', maxWidth: 640, margin: '0 auto' }}>
          <div style={{ padding: 28, borderRadius: 24, background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#f87171', marginBottom: 16 }}>Sound Familiar?</div>
            <h2 style={{ fontSize: 'clamp(1.4rem,5vw,2rem)', fontWeight: 900, marginBottom: 20, lineHeight: 1.2 }}>
              You&apos;re Losing Customers Every Time You Step Away From Your Phone
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: <Phone style={{ width: 18, height: 18 }} />,       text: "A customer messages you asking for a price. You're busy. By the time you reply, they've already paid someone else." },
                { icon: <DollarSign style={{ width: 18, height: 18 }} />,   text: "People visit your website but leave without doing anything. Nobody told them what to do next or answered their question." },
                { icon: <Clock style={{ width: 18, height: 18 }} />,        text: "You're running ads and spending money   but people click, get confused, and leave. Your offer isn't landing fast enough." },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <p style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.6, margin: 0, paddingTop: 6 }}>{item.text}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, padding: '16px 20px', borderRadius: 16, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <p style={{ fontSize: 14, color: '#34d399', fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
                ✦ We fix all three. A website that talks to your visitors live   and a WhatsApp assistant that never sleeps. Together, they make sure every customer gets a reply and every lead gets followed up.
              </p>
            </div>
          </div>
        </section>

        {/* ── WHAT YOU ACTUALLY GET ── */}
        <section style={{ padding: '60px 20px', maxWidth: 640, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#34d399', marginBottom: 12 }}>What We Do For You</div>
            <h2 style={{ fontSize: 'clamp(1.8rem,6vw,2.4rem)', fontWeight: 900, marginBottom: 12 }}>Here&apos;s Exactly What You&apos;re Getting</h2>
            <p style={{ color: '#94a3b8', fontSize: 15, maxWidth: 420, margin: '0 auto', lineHeight: 1.6 }}>No tech jargon. Plain English. Here&apos;s what we build for you and why it makes you money.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                icon: <Zap style={{ width: 20, height: 20 }} />,
                title: 'A Website That Answers Questions and Turns Visitors Into Customers   Automatically',
                desc: 'We build you a fast, clean website that loads on any phone. The moment someone lands on it, there\'s a live AI chat ready to greet them, answer their questions, tell them your prices, and guide them to contact you. No more silent websites that people leave from without doing anything.',
                tag: 'Your Website',
              },
              {
                icon: <Bot style={{ width: 20, height: 20 }} />,
                title: 'One AI Assistant Working in Two Places at the Same Time',
                desc: 'Your AI doesn\'t just sit on your website. It\'s also connected to your WhatsApp. So whether a customer finds you on Google and chats through your site, or someone sends you a WhatsApp message at midnight   the same trained assistant replies instantly, handles their questions, and keeps them warm until you\'re ready to close.',
                tag: 'AI on Website + WhatsApp',
              },
              {
                icon: <TrendingUp style={{ width: 20, height: 20 }} />,
                title: 'Every Customer Who Reaches Out Gets Saved   You Never Lose a Lead Again',
                desc: 'Every person who chats on your website or messages your WhatsApp gets stored automatically. You see their name, what they asked, and where they are in the buying process. No more forgotten follow-ups. No more lost customers.',
                tag: 'Your Lead Tracker',
              },
            ].map((item, i) => (
              <div key={i} style={{ padding: 24, borderRadius: 20, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,rgba(16,185,129,0.15),rgba(6,182,212,0.1))', border: '1px solid rgba(16,185,129,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#475569', marginBottom: 4 }}>{item.tag}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, margin: '0 0 8px 0' }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{ padding: '60px 20px', maxWidth: 640, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#34d399', marginBottom: 12 }}>Simple Process</div>
            <h2 style={{ fontSize: 'clamp(1.8rem,6vw,2.4rem)', fontWeight: 900, marginBottom: 12 }}>How We Set Everything Up For You</h2>
            <p style={{ color: '#94a3b8', fontSize: 15, maxWidth: 380, margin: '0 auto' }}>Three steps from a free conversation to a fully running sales system.</p>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 27, top: 44, bottom: 44, width: 2, background: 'linear-gradient(180deg,#10b981,#06b6d4,rgba(6,182,212,0.1))', borderRadius: 2 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { step: '01', title: 'We Have a Free Call to Understand Your Business',         desc: "You tell us what you sell, who your customers are, and the questions they usually ask. We handle everything else from there. No technical knowledge needed from you at all.",                                                                                                                       time: 'Day 1' },
                { step: '02', title: 'We Build Your Website and Train Your AI Assistant',       desc: "We build your website and train the AI on your exact business   your prices, your services, your tone. Before we go live, we show you how it talks to customers so you're happy with every word it says.",                                                                                         time: 'Days 2–7' },
                { step: '03', title: 'You Go Live   Customers Get Instant Replies, You Get Sales', desc: "From launch day, your website chat and WhatsApp are both handled automatically. Customers get instant answers. Leads get saved. You only step in when someone is ready to pay.",                                                                                                                time: 'Day 7+' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', paddingBottom: i < 2 ? 32 : 0 }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#10b981,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 900, fontSize: 13, color: 'white', boxShadow: '0 0 20px rgba(16,185,129,0.3)', position: 'relative', zIndex: 1 }}>
                    {item.step}
                  </div>
                  <div style={{ paddingTop: 10 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#34d399', marginBottom: 4 }}>{item.time}</div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, margin: '0 0 8px 0' }}>{item.title}</h3>
                    <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <a href={WA.strategyCall} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: 'linear-gradient(90deg,#10b981,#06b6d4)', color: 'white', borderRadius: 99, fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 8px 32px rgba(16,185,129,0.25)' }}>
              <MessageCircle style={{ width: 18, height: 18 }} />
              Book a Free Call   Let&apos;s Talk About Your Business
            </a>
            <p style={{ marginTop: 10, fontSize: 12, color: '#475569' }}>No payment needed. Just a conversation.</p>
          </div>
        </section>

        {/* ── WALL OF PROOF ── */}
        {/* Solid background on this section   no gradient   prevents the WebKit compositing glitch */}
        <section style={{ padding: '80px 20px', background: '#080d0a' }} id="proof">
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#34d399', marginBottom: 12 }}>The Results Speak</div>
              <h2 style={{ fontSize: 'clamp(1.8rem,6vw,2.8rem)', fontWeight: 900, marginBottom: 12 }}>Undeniable Proof.</h2>
              <p style={{ color: '#94a3b8', fontSize: 15, maxWidth: 400, margin: '0 auto' }}>Real clients. Real results. No fluff, no stock photos   just the work and the outcomes.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 600, margin: '0 auto 60px' }}>
              <TestimonialVideo src="/cre8ifhub.mp4" title="Creative Hub Founder" subtitle="Automated Client Infrastructure" />
              <TestimonialVideo src="/benedicta.mp4"  title="Benedicta"            subtitle="3x Repeat Client" />
            </div>
            <div>
              <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#34d399', marginBottom: 24 }}>5-Star Upwork Reviews</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
                {['/review-1.png', '/review-2.png', '/review-3.png'].map((src, i) => (
                  <div key={i} style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                    <img src={src} alt={`Upwork Review ${i + 1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PACKAGES ── */}
        <section style={{ padding: '80px 20px', maxWidth: 640, margin: '0 auto' }} id="packages">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#34d399', marginBottom: 12 }}>Choose What Fits You</div>
            <h2 style={{ fontSize: 'clamp(1.8rem,6vw,2.8rem)', fontWeight: 900, marginBottom: 12 }}>Pick the Option That Matches Where Your Business Is Right Now</h2>
            <p style={{ color: '#94a3b8', fontSize: 15 }}>Start where you are. Every tier is built to make your business money   not just look good online.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* TIER 1 */}
            <div style={{ padding: 28, borderRadius: 24, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#64748b', textTransform: 'uppercase', marginBottom: 6 }}>Tier 01</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>The Foundation</h3>
              <p style={{ fontSize: 13, color: '#64748b', fontStyle: 'italic', marginBottom: 8 }}>Price based on your business   let&apos;s talk</p>
              <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6, marginBottom: 20 }}>
                For businesses that need to stop looking informal online. You get a professional website that loads fast, explains what you do clearly, and makes it easy for customers to reach you. Clean. Credible. Done.
              </p>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#475569', marginBottom: 14 }}>What you get</p>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 20 }} />
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'A fast website that works perfectly on any phone',
                  'A live chat on your website so visitors can ask questions and get answers immediately',
                  'Every message from the chat saved so you can follow up',
                  'A WhatsApp button on every page so customers can reach you in one tap',
                  'A professional business email so you stop using Gmail for client conversations',
                ].map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#cbd5e1' }}>
                    <Check style={{ width: 18, height: 18, color: '#10b981', flexShrink: 0, marginTop: 1 }} />{f}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: 12, color: '#475569', fontStyle: 'italic', marginBottom: 20 }}>Best for: Businesses that currently have no website, or have one that isn&apos;t working. You want people to take you seriously and be able to reach you easily.</p>
              <a href={WA.tier1} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '12px 0', borderRadius: 99, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', fontSize: 14, fontWeight: 600, color: 'inherit', textDecoration: 'none' }}>
                <MessageCircle style={{ width: 16, height: 16 }} />Let&apos;s Talk About This Option
              </a>
            </div>

            {/* TIER 2   FEATURED */}
            <div style={{ padding: 28, borderRadius: 24, background: 'linear-gradient(135deg,rgba(16,185,129,0.1),rgba(6,182,212,0.05))', border: '1px solid #10b981', boxShadow: '0 0 50px rgba(16,185,129,0.12)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', padding: '4px 16px', background: 'linear-gradient(90deg,#10b981,#06b6d4)', borderRadius: 99, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'white', display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
                <Star style={{ width: 10, height: 10, fill: 'white', stroke: 'none' }} />Most Popular
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#34d399', textTransform: 'uppercase', marginBottom: 6 }}>Tier 02</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>The Sales Machine</h3>
              <p style={{ fontSize: 13, color: '#64748b', fontStyle: 'italic', marginBottom: 8 }}>Price based on your business   let&apos;s talk</p>
              <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6, marginBottom: 20 }}>
                This is for business owners who are tired of missing customers. Your website and WhatsApp both get an AI assistant trained specifically on your business. It replies to everyone   on your site and on WhatsApp   instantly, at any time of day or night. You only show up when it&apos;s time to collect the money.
              </p>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#34d399', marginBottom: 14 }}>What you get</p>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 20 }} />
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#cbd5e1' }}>
                  <Check style={{ width: 18, height: 18, color: '#10b981', flexShrink: 0, marginTop: 1 }} />Everything in The Foundation, plus:
                </li>
                {[
                  'An AI assistant trained on your business handling your website chat 24/7',
                  'The same AI connected to your WhatsApp   so both channels are covered',
                  'Every customer who reaches out automatically saved in one place',
                  'The AI knows exactly when a conversation needs your personal attention and alerts you',
                ].map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, fontWeight: 700, color: 'white' }}>
                    <Check style={{ width: 18, height: 18, color: '#10b981', flexShrink: 0, marginTop: 1 }} />{f}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: 12, color: '#475569', fontStyle: 'italic', marginBottom: 20 }}>Best for: Business owners actively getting enquiries but losing some because they can&apos;t respond fast enough. This stops the leak completely.</p>
              <a href={WA.tier2} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '14px 0', borderRadius: 99, background: 'linear-gradient(90deg,#10b981,#06b6d4)', fontSize: 15, fontWeight: 700, color: 'white', textDecoration: 'none' }}>
                <MessageCircle style={{ width: 18, height: 18 }} />I Want This   Let&apos;s Build It
              </a>
            </div>

            {/* TIER 3 */}
            <div style={{ padding: 28, borderRadius: 24, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#64748b', textTransform: 'uppercase', marginBottom: 6 }}>Tier 03</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>The Growth System</h3>
              <p style={{ fontSize: 13, color: '#64748b', fontStyle: 'italic', marginBottom: 8 }}>Price based on your business   let&apos;s talk</p>
              <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6, marginBottom: 20 }}>
                For businesses ready to grow fast. You get the full Sales Machine plus a team actively bringing new customers to your website from day one   so the AI has real people to talk to and convert from the moment you launch.
              </p>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#475569', marginBottom: 14 }}>What you get</p>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 20 }} />
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#cbd5e1' }}>
                  <Check style={{ width: 18, height: 18, color: '#10b981', flexShrink: 0, marginTop: 1 }} />Everything in The Sales Machine, plus:
                </li>
                {[
                  'Paid traffic sent to your website starting from day one',
                  'Multiple AI assistants handling different parts of your business separately',
                  'A dedicated support team you can reach whenever something needs attention',
                ].map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, fontWeight: 700, color: 'white' }}>
                    <Check style={{ width: 18, height: 18, color: '#10b981', flexShrink: 0, marginTop: 1 }} />{f}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: 12, color: '#475569', fontStyle: 'italic', marginBottom: 20 }}>Best for: Business owners who already know their offer works and are ready to pour fuel on it. You want volume, speed, and a system that scales.</p>
              <a href={WA.tier3} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '12px 0', borderRadius: 99, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', fontSize: 14, fontWeight: 600, color: 'inherit', textDecoration: 'none' }}>
                <MessageCircle style={{ width: 16, height: 16 }} />I&apos;m Ready to Scale   Let&apos;s Talk
              </a>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section style={{ padding: '60px 20px 100px', textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748b', marginBottom: 20 }}>Still have questions?</p>
          <a href={WA.talkDirectly} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 99, background: 'linear-gradient(90deg,#10b981,#06b6d4)', color: 'white', fontWeight: 700, fontSize: 16, textDecoration: 'none', boxShadow: '0 10px 40px rgba(16,185,129,0.3)' }}>
            <MessageCircle style={{ width: 20, height: 20 }} />Talk to Precious Directly
          </a>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ padding: '40px 20px', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', background: '#050505' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: 'linear-gradient(135deg,#10b981,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" style={{ width: 12, height: 12, stroke: 'white', fill: 'none', strokeWidth: 3 }}>
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <span style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>OP5 Technologies</span>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, marginBottom: 8 }}>We don&apos;t build websites. We build Sales Engines.</p>
          <p style={{ color: '#334155', fontSize: 11 }}>&copy; 2026 OP5 Technologies. All rights reserved.</p>
        </footer>

        <style>{`
          @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.4} }
          @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
          @keyframes spin   { to{transform:rotate(360deg)} }
          * { box-sizing: border-box; }
          body { margin: 0; }
        `}</style>
      </main>
    </VideoProvider>
  );
}