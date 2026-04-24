"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, X, Server, MessageSquare, Target, Menu, Key } from 'lucide-react';

export default function SignetLandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '',
    business: '' 
  });

  // Handle Navbar Glass Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Highly Documented WhatsApp Routing Logic
  const handleConnect = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsConnecting(true);
    
    setTimeout(() => {
      const whatsappNumber = "2348000000000"; // Replace with your actual WhatsApp number
      
      const message = `*NEW SIGNET LEAD*%0A%0AHello Precious,%0A%0A*Name:* ${formData.name}%0A*Business:* ${formData.business}%0A*Email:* ${formData.email}%0A%0AI am ready to dominate my market. I want to deploy the *${selectedPlan}*. Let's blueprint the architecture.`;
      
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
      
      setIsConnecting(false);
      setIsModalOpen(false);
      setFormData({ name: '', email: '', business: '' });
    }, 800);
  };

  const openModal = (planName: string) => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
    setIsMobileMenuOpen(false); 
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30 selection:text-emerald-100 flex flex-col relative w-full overflow-x-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-900/15 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* --- NAVIGATION --- */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/60 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 bg-emerald-500 flex items-center justify-center rounded-md shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              {/* Signet Key Icon representing the seal of authority */}
              <Key size={20} className="text-zinc-950" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Signet<span className="text-emerald-500">.</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#arsenal" className="hover:text-emerald-400 transition-colors">The Arsenal</a>
            <a href="#infrastructure" className="hover:text-emerald-400 transition-colors">Infrastructure</a>
            <button onClick={() => openModal('Header Contact - Strategy Call')} className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/50 text-white px-5 py-2.5 rounded-md transition-all shadow-sm">
              Demand a Strategy Call
            </button>
          </div>

          <button className="md:hidden text-zinc-400 hover:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="md:hidden absolute top-full left-0 w-full bg-zinc-950 border-b border-zinc-800 py-6 px-6 flex flex-col gap-6 shadow-2xl"
            >
              <a href="#arsenal" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 font-medium text-lg">The Arsenal</a>
              <a href="#infrastructure" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 font-medium text-lg">Infrastructure</a>
              <button onClick={() => openModal('Mobile Header - Strategy Call')} className="w-full bg-emerald-500 text-zinc-950 font-bold py-4 rounded-md text-lg">
                Demand a Strategy Call
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-48 pb-24 px-6 text-center flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 mb-8 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-bold tracking-[0.2em] text-emerald-300 uppercase">Elite Web Engineering & AI Automation</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1] text-white"
          >
            Stop Paying for Dead Websites. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Build an Automated Sales Engine.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Most websites are just digital brochures that bleed money. We engineer high-performance platforms, back them with military-grade hosting, and inject custom AI that relentlessly closes deals on your WhatsApp while you sleep.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto"
          >
            <button onClick={() => openModal('Hero Section - Initiate Build')} className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-4 px-10 rounded-md shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 text-lg">
              Initiate Your Build <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="arsenal" className="py-24 bg-zinc-950 border-t border-zinc-900 relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center md:text-left mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">Your Unfair Advantage.</h2>
            <p className="text-zinc-400 text-lg">We don't just write code. We architect dominance in your market.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-xl hover:border-emerald-500/50 transition-colors duration-300">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6"><Target className="text-emerald-400" size={24} /></div>
              <h3 className="text-xl font-bold mb-3 text-white">Conversion-First Engineering</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Whether it is a ruthless landing page or a complex SaaS MVP, we design platforms driven by human psychology to do one thing: turn your traffic into cash.</p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-xl hover:border-emerald-500/50 transition-colors duration-300">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6"><MessageSquare className="text-emerald-400" size={24} /></div>
              <h3 className="text-xl font-bold mb-3 text-white">The 24/7 AI Closer</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Imagine a sales rep that never sleeps and responds in seconds. We deploy custom AI directly into your WhatsApp to crush objections and secure payments instantly.</p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-xl hover:border-emerald-500/50 transition-colors duration-300">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6"><Server className="text-emerald-400" size={24} /></div>
              <h3 className="text-xl font-bold mb-3 text-white">Vault-Level Infrastructure</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Total dominance requires total uptime. Every platform we build is hosted on our lightning-fast NVMe servers, fortified with automated backups and corporate email.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="infrastructure" className="py-24 px-6 relative z-10 border-t border-zinc-900 bg-[#030303] w-full">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-4 text-white">Select Your Infrastructure.</h2>
            <p className="text-zinc-400 text-lg">Stop playing small. Choose the system that fits your ambition.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* TIER 1: Starter Landing Page */}
            <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-xl flex flex-col hover:border-zinc-700 transition-colors">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-zinc-50">The Fast-Track Launch</h3>
                <p className="text-zinc-500 text-xs mt-2">Dominate your niche immediately with a high-speed, ruthless landing page designed to capture leads.</p>
              </div>
              <div className="text-3xl font-bold text-zinc-50 mb-6">₦70k</div>
              <ul className="space-y-3 mb-8 flex-grow text-zinc-300 text-xs">
                <li className="flex items-start gap-2"><Check size={16} className="text-emerald-500 shrink-0"/> High-Converting Single Page Build</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-emerald-500 shrink-0"/> <span className="font-semibold text-white">Includes Free .com.ng Domain</span></li>
                <li className="flex items-start gap-2"><Check size={16} className="text-emerald-500 shrink-0"/> 1-Year Premium NVMe Hosting</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-emerald-500 shrink-0"/> Secure Corporate Business Email</li>
              </ul>
              <button onClick={() => openModal('The Fast-Track Launch (₦70k)')} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-md transition-all text-sm">
                Claim Your Market
              </button>
            </div>

            {/* TIER 2: Complete Web Build */}
            <div className="bg-zinc-900/50 border border-zinc-700 p-6 rounded-xl flex flex-col hover:border-zinc-600 transition-colors">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-zinc-50">The Authority Platform</h3>
                <p className="text-zinc-500 text-xs mt-2">A massive upgrade: A complete, multi-page corporate fortress that outranks and outperforms your competitors.</p>
              </div>
              <div className="text-3xl font-bold text-zinc-50 mb-6">₦150k</div>
              <ul className="space-y-3 mb-8 flex-grow text-zinc-300 text-xs">
                <li className="flex items-start gap-2 font-semibold text-white"><Check size={16} className="text-emerald-500 shrink-0"/> Multi-Page Corporate Architecture</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-emerald-500 shrink-0"/> Google-Ranked SEO Foundation</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-emerald-500 shrink-0"/> Lead Generation & Contact Workflows</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-emerald-500 shrink-0"/> 1-Year Premium NVMe Hosting</li>
                <li className="flex items-start gap-2 opacity-50"><X size={16} className="text-zinc-600 shrink-0"/> Domain Registration Not Included</li>
              </ul>
              <button onClick={() => openModal('The Authority Platform (₦150k)')} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-md transition-all text-sm">
                Establish Authority
              </button>
            </div>

            {/* TIER 3: The AI Engine (Highlight) */}
            <div className="bg-zinc-900 border border-emerald-500/60 p-6 rounded-xl flex flex-col relative shadow-[0_0_30px_rgba(16,185,129,0.1)] lg:-translate-y-4">
              <div className="absolute top-0 right-4 bg-emerald-500 text-zinc-950 text-[10px] font-black px-2 py-1 rounded-b-md uppercase tracking-widest">
                The Ultimate Advantage
              </div>
              <div className="mb-6 mt-2">
                <h3 className="text-xl font-bold text-zinc-50">The Automated Closer</h3>
                <p className="text-zinc-400 text-xs mt-2">The complete business upgrade. We build the site, host it securely, and deploy the AI to aggressively close your leads 24/7.</p>
              </div>
              <div className="text-3xl font-bold text-emerald-400 mb-6">₦250k</div>
              <ul className="space-y-3 mb-8 flex-grow text-zinc-200 text-xs">
                <li className="flex items-start gap-2 font-semibold text-white"><Check size={16} className="text-emerald-400 shrink-0"/> Everything in The Authority Platform</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-emerald-400 shrink-0"/> Custom AI WhatsApp Negotiator</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-emerald-400 shrink-0"/> Hands-Free Automated Booking</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-emerald-400 shrink-0"/> 1-Year Premium NVMe Hosting</li>
                <li className="flex items-start gap-2 opacity-50"><X size={16} className="text-zinc-500 shrink-0"/> Domain Registration Not Included</li>
              </ul>
              <button onClick={() => openModal('The Automated Closer (₦250k)')} className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3 rounded-md shadow-lg transition-all text-sm">
                Automate Your Revenue
              </button>
            </div>

            {/* TIER 4: SaaS & MVP Dev */}
            <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-xl flex flex-col hover:border-zinc-700 transition-colors">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-zinc-50">SaaS / MVP Engineering</h3>
                <p className="text-zinc-500 text-xs mt-2">You have the vision. We have the code. Complex software built for absolute market takeover.</p>
              </div>
              <div className="text-3xl font-bold text-zinc-50 mb-6">Custom</div>
              <ul className="space-y-3 mb-8 flex-grow text-zinc-300 text-xs">
                <li className="flex items-start gap-2"><Check size={16} className="text-emerald-500 shrink-0"/> Heavy-Duty Next.js / React Web Apps</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-emerald-500 shrink-0"/> Sharetribe Marketplaces & Portals</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-emerald-500 shrink-0"/> Elite Fractional CTO Support</li>
                <li className="flex items-start gap-2"><Check size={16} className="text-emerald-500 shrink-0"/> Enterprise NVMe Cloud Hosting</li>
                <li className="flex items-start gap-2 opacity-50"><X size={16} className="text-zinc-600 shrink-0"/> Domain Registration Not Included</li>
              </ul>
              <button onClick={() => openModal('SaaS & MVP Custom Quote')} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-md transition-all text-sm">
                Request Engineering Audit
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* --- BOTTOM CTA --- */}
      <section className="py-20 px-6 bg-[#020202] border-t border-emerald-900/20 text-center w-full">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-tight">Your Competitors Are Automating.</h2>
          <p className="text-zinc-400 mb-10">Every day you wait is another customer lost. Stop bleeding revenue and let us build your engine today.</p>
          <button onClick={() => openModal('Footer CTA - Final Push')} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-4 px-10 rounded-md transition-all">
            Secure Your Build Slot Now
          </button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="w-full bg-[#000000] border-t border-zinc-900 py-8 px-6 text-center text-sm text-zinc-600 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
                <Key size={16} className="text-zinc-500" />
                <span className="font-semibold text-zinc-400">Signet Systems.</span>
            </div>
            <span>&copy; {new Date().getFullYear()} All rights reserved. Code that dominates.</span>
        </div>
      </footer>

      {/* --- LEAD CAPTURE MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-zinc-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-zinc-900 border border-zinc-700/50 p-8 rounded-xl w-full max-w-md shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600"></div>
              
              <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 text-zinc-500 hover:text-white transition-colors">
                <X size={24}/>
              </button>
              
              <h3 className="text-2xl font-bold mb-2 text-white tracking-tight">Let's Build Your Empire.</h3>
              <p className="text-zinc-400 text-sm mb-8">You selected <span className="text-emerald-400 font-semibold">{selectedPlan}</span>. Drop your details below and our engineers will connect with you on WhatsApp immediately.</p>
              
              <form onSubmit={handleConnect} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-zinc-400 uppercase mb-1.5">Full Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-950/50 border border-zinc-800 rounded-md px-4 py-3.5 text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-700" placeholder="e.g. John Doe" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-zinc-400 uppercase mb-1.5">Business Email</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-zinc-950/50 border border-zinc-800 rounded-md px-4 py-3.5 text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-700" placeholder="john@company.com" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-zinc-400 uppercase mb-1.5">Business / Project Name</label>
                  <input type="text" required value={formData.business} onChange={(e) => setFormData({...formData, business: e.target.value})} className="w-full bg-zinc-950/50 border border-zinc-800 rounded-md px-4 py-3.5 text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-700" placeholder="e.g. Apex Logistics" />
                </div>
                
                <button type="submit" disabled={isConnecting} className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 disabled:text-emerald-300 text-zinc-950 font-bold py-4 rounded-md transition-all mt-6 flex justify-center items-center gap-2 text-lg">
                  {isConnecting ? (
                    <span className="animate-pulse">Establishing Secure Connection...</span>
                  ) : (
                    <>Chat with Lead Engineer <MessageSquare size={18} /></>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}