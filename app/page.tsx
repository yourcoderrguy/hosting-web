import React from 'react';
import { Play, Check, Star, MessageCircle, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen relative font-sans selection:bg-emerald-500/30">
      
      {/* Background Glow Orbs */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between glass-card border-x-0 border-t-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg">
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-white fill-none stroke-[2.5px]">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight">OP5 Technologies</span>
        </div>
        <a href="https://wa.me/234XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:text-emerald-400 transition-all text-sm font-medium">
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Chat with an Engineer</span>
        </a>
      </header>

      {/* HERO */}
      <section className="pt-36 pb-20 px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Next-Gen AI Automation
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 max-w-4xl">
          Stop Buying Basic Websites.<br />
          <span className="text-gradient">Build a Sales Engine.</span>
        </h1>
        
        <p className="text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed font-light">
          Your business leaks money every time you step away from your phone. We connect lightning-fast web architecture directly to a custom AI WhatsApp agent that haggles and closes deals 24/7.
        </p>
        
        <a href="#packages" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-50 hover:bg-white text-black rounded-full font-bold transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(255,255,255,0.15)]">
          <MessageCircle className="w-5 h-5" />
          See The Packages
        </a>

        {/* VSL Video Container */}
        <div className="w-full max-w-3xl mt-16 p-[2px] rounded-2xl bg-gradient-to-br from-emerald-500/30 to-cyan-500/20 shadow-[0_0_80px_rgba(16,185,129,0.15)]">
          <div className="aspect-video bg-[#0d0d0d] rounded-[14px] flex flex-col items-center justify-center relative overflow-hidden group">
            {/* Replace this div with your actual video tag */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#0d1a14] to-[#0d1518]">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.4)] cursor-pointer group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </div>
              <div className="text-xs font-bold tracking-widest text-slate-400 uppercase">2-Minute Walk-and-Talk</div>
              <div className="text-sm font-medium text-emerald-400">▶ Watch the Sales Engine in Action</div>
            </div>
          </div>
        </div>
      </section>

      {/* WALL OF PROOF */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#050505] via-[#080d0a] to-[#050505]" id="proof">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-bold tracking-widest text-emerald-400 uppercase mb-4">The Results Speak</div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Undeniable Proof.</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Real clients. Real results. No fluff, no stock photos — just the work and the outcomes.</p>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="glass-card rounded-2xl aspect-[9/14] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#0d1a14] to-[#0a1518]">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg mb-4">
                <Play className="w-5 h-5 text-white fill-white ml-1" />
              </div>
              <h3 className="font-bold text-center text-lg">Creative Hub Founder</h3>
              <p className="text-emerald-400 text-sm font-medium mb-3 text-center">Automated Client Infrastructure</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-emerald-500 fill-emerald-500" />)}
              </div>
            </div>

            <div className="glass-card rounded-2xl aspect-[9/14] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#0d1a14] to-[#0a1518]">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg mb-4">
                <Play className="w-5 h-5 text-white fill-white ml-1" />
              </div>
              <h3 className="font-bold text-center text-lg">Benedicta</h3>
              <p className="text-emerald-400 text-sm font-medium mb-3 text-center">3x Repeat Client</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-emerald-500 fill-emerald-500" />)}
              </div>
            </div>
          </div>

          {/* Upwork Grid */}
          <div className="mt-20">
            <div className="text-center text-xs font-bold tracking-widest text-emerald-400 uppercase mb-8">5-Star Upwork Reviews</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Exceptional quality. Built exactly what I needed.",
                "Fast, professional, and understands the brief.",
                "Will hire again. Best dev on the platform."
              ].map((review, index) => (
                <div key={index} className="glass-card rounded-2xl aspect-[4/3] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#0d1a14] to-[#0a1518] hover:border-emerald-500/40 transition-colors group cursor-pointer">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-emerald-500 fill-emerald-500" />)}
                  </div>
                  <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-2">Upwork Review</div>
                  <p className="text-xs text-slate-400 text-center font-medium leading-relaxed">"{review}"</p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-slate-500 mt-4 italic">Drop your actual upwork screenshots into /public to replace placeholders</p>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="py-24 px-6 max-w-6xl mx-auto" id="packages">
        <div className="text-center mb-16">
          <div className="text-xs font-bold tracking-widest text-emerald-400 uppercase mb-4">Three-Tier Architecture</div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Choose Your Engine.</h2>
          <p className="text-slate-400 max-w-xl mx-auto">We build systems, not brochures. Select the infrastructure that fits your current volume.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* TIER 1 */}
          <div className="glass-card p-8 rounded-3xl hover:-translate-y-1 transition-transform">
            <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">Tier 01</div>
            <h3 className="text-2xl font-bold mb-1">The Corporate Foundation</h3>
            <p className="text-sm text-slate-500 italic mb-6">Pricing on consultation</p>
            <div className="h-[1px] w-full bg-white/10 mb-6" />
            <ul className="space-y-4 mb-8">
              {['High-Speed Custom Platform', 'Corporate Email Suite', 'Direct WhatsApp Routing', 'Backend SEO Structuring'].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0" /> {feature}
                </li>
              ))}
            </ul>
            <a href="https://wa.me/234XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors font-semibold text-sm">
              <MessageCircle className="w-4 h-4" /> Discuss This Setup
            </a>
          </div>

          {/* TIER 2 (FEATURED) */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 border border-emerald-500 shadow-[0_0_60px_rgba(16,185,129,0.15)] hover:-translate-y-2 transition-transform relative lg:order-none -order-1">
            <div className="absolute top-[-14px] left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full text-[10px] font-bold tracking-widest uppercase text-white shadow-lg flex items-center gap-1">
              <Star className="w-3 h-3 fill-white" /> Most Popular
            </div>
            <div className="text-xs font-bold tracking-widest text-emerald-400 uppercase mb-2">Tier 02</div>
            <h3 className="text-2xl font-bold mb-1">The AI Revenue Engine</h3>
            <p className="text-sm text-slate-500 italic mb-6">Pricing on consultation</p>
            <div className="h-[1px] w-full bg-white/10 mb-6" />
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-sm text-slate-300"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> Everything in Tier 1, plus:</li>
              {['Custom AI WhatsApp Negotiator', 'Automated Lead Vault', 'Smart Human Handoff'].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-semibold text-white">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0" /> {feature}
                </li>
              ))}
            </ul>
            <a href="https://wa.me/234XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold transition-all hover:shadow-[0_10px_30px_rgba(16,185,129,0.3)]">
              <MessageCircle className="w-5 h-5" /> Build My AI Engine
            </a>
          </div>

          {/* TIER 3 */}
          <div className="glass-card p-8 rounded-3xl hover:-translate-y-1 transition-transform">
            <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">Tier 03</div>
            <h3 className="text-2xl font-bold mb-1">The Market Dominator</h3>
            <p className="text-sm text-slate-500 italic mb-6">Pricing on consultation</p>
            <div className="h-[1px] w-full bg-white/10 mb-6" />
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-sm text-slate-300"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> Everything in Tier 2, plus:</li>
              {['Multi-Agent CRM Dispatch', 'Day-One Traffic Injection', 'Priority Architecture Support'].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-semibold text-white">
                  <Check className="w-5 h-5 text-emerald-500 shrink-0" /> {feature}
                </li>
              ))}
            </ul>
            <a href="https://wa.me/234XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors font-semibold text-sm">
              <MessageCircle className="w-4 h-4" /> Apply For Enterprise
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-white/10 text-center bg-[#050505]">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
             <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-white fill-none stroke-[3px]"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
          </div>
          <span className="font-bold tracking-tight">OP5 Technologies</span>
        </div>
        <p className="text-slate-400 text-sm mb-6">We don't build websites. We build Sales Engines.</p>
        <p className="text-xs text-slate-600">© 2026 OP5 Technologies. All rights reserved.</p>
      </footer>
    </main>
  );
}