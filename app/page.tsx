"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, X, Layers, Cpu, Server, MessageSquare, Search, Menu, ShieldCheck } from 'lucide-react';

export default function MagenLandingPage() {
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
      const whatsappNumber = "2348112476891"; // Replace with your actual WhatsApp number
      
      const message = `*NEW MAGEN LEAD*%0A%0AHello Precious,%0A%0A*Name:* ${formData.name}%0A*Business:* ${formData.business}%0A*Email:* ${formData.email}%0A%0AI clicked your ad and I am ready to deploy the *${selectedPlan}*. Let's discuss the setup.`;
      
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
              <ShieldCheck size={20} className="text-zinc-950" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Magen<span className="text-emerald-500">.</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-emerald-400 transition-colors">Our Systems</a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
            {/* UPDATED: High-conversion header button replacing Client Area */}
            <button onClick={() => openModal('Header Contact - General Inquiry')} className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/50 text-white px-5 py-2.5 rounded-md transition-all shadow-sm">
              Book Consultation
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
              <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 font-medium text-lg">Our Systems</a>
              <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-300 font-medium text-lg">Pricing</a>
              <button onClick={() => openModal('Mobile Header - Consultation')} className="w-full bg-emerald-500 text-zinc-950 font-bold py-4 rounded-md text-lg">
                Book Consultation
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
            <span className="text-[11px] font-bold tracking-[0.2em] text-emerald-300 uppercase">AI Negotiation & Enterprise Hosting</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1] text-white"
          >
            Never Lose a Customer to <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Price Objections Again.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            We deploy secure, high-speed website infrastructure paired with a custom AI Sales Negotiator. Automate your revenue, dominate search rankings, and let our systems handle the heavy lifting.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto"
          >
            <button onClick={() => openModal('Hero Section - Get Started')} className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-4 px-10 rounded-md shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 text-lg">
              Deploy Your System <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 bg-zinc-950 border-t border-zinc-900 relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center md:text-left mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">The Magen Digital Engine</h2>
            <p className="text-zinc-400 text-lg">Everything you need to capture traffic and convert sales automatically.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-xl hover:border-emerald-500/50 transition-colors duration-300">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6"><MessageSquare className="text-emerald-400" size={24} /></div>
              <h3 className="text-xl font-bold mb-3 text-white">AI Price Negotiator</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Our custom AI engages visitors, handles pricing objections dynamically, and closes deals directly on your website while you sleep.</p>
            </div>
            
            <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-xl hover:border-emerald-500/50 transition-colors duration-300">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6"><Search className="text-emerald-400" size={24} /></div>
              <h3 className="text-xl font-bold mb-3 text-white">Search Engine Dominance</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">We structure your platform's code and content so your business appears first when customers search for your services on Google.</p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-xl hover:border-emerald-500/50 transition-colors duration-300">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6"><Server className="text-emerald-400" size={24} /></div>
              <h3 className="text-xl font-bold mb-3 text-white">Enterprise Hosting</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Lightning-fast NVMe servers, free .com.ng domain names, and highly secure corporate emails. We manage all the technical stress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="py-24 px-6 relative z-10 border-t border-zinc-900 bg-[#030303] w-full">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold tracking-tight mb-4 text-white">Select Your Package.</h2>
            <p className="text-zinc-400 text-lg">Transparent pricing. No hidden exchange rate fees.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* TIER 1: Digital Presence */}
            <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-xl flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-zinc-50">Digital Presence</h3>
                <p className="text-zinc-500 text-sm mt-2">High-speed hosting foundation for growing brands.</p>
              </div>
              <div className="text-4xl font-bold text-zinc-50 mb-8">₦25k<span className="text-lg text-zinc-600 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-10 flex-grow text-zinc-300 text-sm">
                <li className="flex items-start gap-3"><Check size={18} className="text-emerald-500 shrink-0"/> Premium NVMe Hosting</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-emerald-500 shrink-0"/> Free .com.ng Domain Name</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-emerald-500 shrink-0"/> Corporate Business Emails</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-emerald-500 shrink-0"/> Automated Security & Backups</li>
              </ul>
              <button onClick={() => openModal('Digital Presence Tier (₦25k)')} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-md transition-all">
                Select Package
              </button>
            </div>

            {/* TIER 2: Automation System */}
            <div className="bg-zinc-900 border border-emerald-500/60 p-8 rounded-xl flex flex-col relative shadow-[0_0_30px_rgba(16,185,129,0.1)] md:-translate-y-4">
              <div className="absolute top-0 right-6 bg-emerald-500 text-zinc-950 text-[10px] font-black px-3 py-1.5 rounded-b-md uppercase tracking-widest">
                Most Popular
              </div>
              <div className="mb-6 mt-2">
                <h3 className="text-2xl font-bold text-zinc-50">Automation System</h3>
                <p className="text-zinc-400 text-sm mt-2">For businesses ready to automate sales and workflow.</p>
              </div>
              <div className="text-4xl font-bold text-emerald-400 mb-8">₦85k<span className="text-lg text-zinc-500 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-10 flex-grow text-zinc-200 text-sm">
                <li className="flex items-start gap-3 font-semibold text-white"><Check size={18} className="text-emerald-400 shrink-0"/> Everything in Digital Presence</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-emerald-400 shrink-0"/> Custom AI Price Negotiator</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-emerald-400 shrink-0"/> Automated Appointment Booking</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-emerald-400 shrink-0"/> Comprehensive SEO Setup</li>
              </ul>
              <button onClick={() => openModal('Automation System Tier (₦85k)')} className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-4 rounded-md shadow-lg transition-all text-lg">
                Start Automating
              </button>
            </div>

            {/* TIER 3: Custom Software */}
            <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-xl flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-zinc-50">Custom Software</h3>
                <p className="text-zinc-500 text-sm mt-2">Bespoke SaaS and Marketplace development.</p>
              </div>
              <div className="text-4xl font-bold text-zinc-50 mb-8">Custom</div>
              <ul className="space-y-4 mb-10 flex-grow text-zinc-300 text-sm">
                <li className="flex items-start gap-3"><Check size={18} className="text-emerald-500 shrink-0"/> Advanced Web Applications</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-emerald-500 shrink-0"/> Sharetribe Marketplaces</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-emerald-500 shrink-0"/> Custom AI Model Training</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-emerald-500 shrink-0"/> Dedicated Technical Support</li>
              </ul>
              <button onClick={() => openModal('Custom Software Quote')} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-4 rounded-md transition-all">
                Request Quote
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* --- BOTTOM CTA --- */}
      <section className="py-20 px-6 bg-[#020202] border-t border-emerald-900/20 text-center w-full">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-tight">Ready to Secure Your Growth?</h2>
          <p className="text-zinc-400 mb-10">Deploy your system today and stop leaving money on the table.</p>
          <button onClick={() => openModal('Footer CTA - General Inquiry')} className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-4 px-10 rounded-md transition-all">
            Get Started Now
          </button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="w-full bg-[#000000] border-t border-zinc-900 py-8 px-6 text-center text-sm text-zinc-600 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-zinc-500" />
                <span className="font-semibold text-zinc-400">Magen Systems.</span>
            </div>
            <span>&copy; {new Date().getFullYear()} All rights reserved. Secure and Scalable.</span>
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
              
              <h3 className="text-2xl font-bold mb-2 text-white tracking-tight">Let's Build It.</h3>
              <p className="text-zinc-400 text-sm mb-8">You selected <span className="text-emerald-400 font-semibold">{selectedPlan}</span>. Enter your details below to finalize your setup directly with our team on WhatsApp.</p>
              
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
                  <label className="block text-[11px] font-bold tracking-widest text-zinc-400 uppercase mb-1.5">Business Name</label>
                  <input type="text" required value={formData.business} onChange={(e) => setFormData({...formData, business: e.target.value})} className="w-full bg-zinc-950/50 border border-zinc-800 rounded-md px-4 py-3.5 text-white focus:outline-none focus:border-emerald-500 transition-all placeholder:text-zinc-700" placeholder="e.g. Apex Logistics" />
                </div>
                
                <button type="submit" disabled={isConnecting} className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 disabled:text-emerald-300 text-zinc-950 font-bold py-4 rounded-md transition-all mt-6 flex justify-center items-center gap-2 text-lg">
                  {isConnecting ? (
                    <span className="animate-pulse">Connecting securely...</span>
                  ) : (
                    <>Chat on WhatsApp <MessageSquare size={18} /></>
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