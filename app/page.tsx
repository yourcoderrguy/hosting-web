"use client";

import React, { useEffect } from 'react';

export default function LandingPage() {
  
  // Handled the exact scroll animation logic you provided
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12 });
    
    reveals.forEach(el => io.observe(el));

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(a => {
      a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (href) {
          const t = document.querySelector(href);
          if (t) {
            e.preventDefault();
            t.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <>
      {/* HEADER */}
      <header>
        <div className="logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span className="logo-text">OP5 Technologies</span>
        </div>
        <a className="header-cta" href="https://wa.me/2349000000000?text=Hi%20Precious%2C%20I%27d%20like%20to%20chat%20with%20an%20engineer." target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>Chat with an Engineer</span>
        </a>
      </header>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg">
          <div className="hero-orb1"></div>
          <div className="hero-orb2"></div>
        </div>
        <div className="hero-badge reveal">
          {/* <div className="pulse-dot"></div> */}
          Next-Gen AI Automation
        </div>
        <h1 className="reveal" style={{ transitionDelay: '0.1s' }}>
          Stop Buying Basic Websites.<br />
          <span className="gradient-text">Build a Sales Engine.</span>
        </h1>
        <p className="hero-sub reveal" style={{ transitionDelay: '0.2s' }}>
          Your business leaks money every time you step away from your phone. We connect lightning-fast web architecture directly to a custom AI WhatsApp agent that haggles and closes deals 24/7.
        </p>
        <a href="#packages" className="btn-primary reveal" style={{ transitionDelay: '0.3s' }}>
          <svg viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          See The Packages
        </a>

        <div className="vsl-container reveal" style={{ transitionDelay: '0.4s' }}>
          <div className="vsl-outer">
            <div className="vsl-inner">
              <div className="vsl-placeholder">
                <div className="vsl-play-btn">
                  <svg viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <div className="vsl-label">2-Minute Walk-and-Talk</div>
                <div className="vsl-duration">▶ Watch the Sales Engine in Action</div>
              </div>
              {/* Insert your actual video tag here once files are ready */}
              {/* <video src="/your-main-vsl.mp4" poster="/vsl-thumbnail.jpg" controls className="vsl-poster"></video> */}
            </div>
          </div>
        </div>
      </section>

      {/* WALL OF PROOF */}
      <section className="proof-section" id="proof">
        <div className="container">
          <div className="section-label reveal">The Results Speak</div>
          <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>Undeniable Proof.</h2>
          <p className="section-sub reveal" style={{ transitionDelay: '0.15s' }}>Real clients. Real results. No fluff, no stock photos — just the work and the outcomes.</p>

          <div className="video-grid reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="testimonial-card">
              <div className="testimonial-card-inner">
                {/* <video src="/testimonial-1.mp4" controls style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}></video> */}
                <div className="testimonial-play">
                  <svg viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <div className="testimonial-name">Creative Hub Founder</div>
                <div className="testimonial-role">Automated Client Infrastructure</div>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  ))}
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-card-inner">
                {/* <video src="/testimonial-2.mp4" controls style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}></video> */}
                <div className="testimonial-play">
                  <svg viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <div className="testimonial-name">Benedicta</div>
                <div className="testimonial-role">3x Repeat Client</div>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '64px' }}>
            <div className="section-label reveal">5-Star Upwork Reviews</div>
            <div className="upwork-grid reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="upwork-card">
                <div className="upwork-placeholder">
                  {/* <img src="/upwork-1.jpg" alt="Upwork review" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} /> */}
                  <div className="upwork-stars">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="star" viewBox="0 0 24 24" width="16" height="16"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                    ))}
                  </div>
                  <div className="upwork-label">Upwork Review</div>
                  <div className="upwork-review">"Exceptional quality. Built exactly what I needed."</div>
                </div>
              </div>
              <div className="upwork-card">
                <div className="upwork-placeholder">
                  <div className="upwork-stars">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="star" viewBox="0 0 24 24" width="16" height="16"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                    ))}
                  </div>
                  <div className="upwork-label">Upwork Review</div>
                  <div className="upwork-review">"Fast, professional, and understands the brief."</div>
                </div>
              </div>
              <div className="upwork-card">
                <div className="upwork-placeholder">
                  <div className="upwork-stars">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="star" viewBox="0 0 24 24" width="16" height="16"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                    ))}
                  </div>
                  <div className="upwork-label">Upwork Review</div>
                  <div className="upwork-review">"Will hire again. Best dev on the platform."</div>
                </div>
              </div>
            </div>
            <p className="proof-sub-label reveal">Drop your actual upwork-1.jpg, upwork-2.jpg, upwork-3.jpg into /public to replace placeholders</p>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages">
        <div className="container">
          <div className="section-label reveal">Three-Tier Architecture</div>
          <h2 className="section-title reveal" style={{ transitionDelay: '0.1s' }}>Choose Your Engine.</h2>
          <p className="section-sub reveal" style={{ transitionDelay: '0.15s' }}>We build systems, not brochures. Select the infrastructure that fits your current volume.</p>

          <div className="pricing-grid">
            {/* TIER 1 */}
            <div className="pkg-card reveal" style={{ transitionDelay: '0.15s' }}>
              <div className="pkg-icon">
                <svg viewBox="0 0 24 24" style={{ color: '#f8fafc' }}>
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <div className="pkg-tier">Tier 01</div>
              <div className="pkg-name">The Corporate Foundation</div>
              <div className="price-hidden">Pricing on consultation</div>
              <div className="pkg-divider"></div>
              <ul className="pkg-features">
                <li><svg className="check-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>High-Speed Custom Platform</li>
                <li><svg className="check-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>Corporate Email Suite</li>
                <li><svg className="check-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>Direct WhatsApp Routing</li>
                <li><svg className="check-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>Backend SEO Structuring</li>
              </ul>
              <a href="https://wa.me/2349000000000?text=Hi%20Precious%2C%20I%20want%20to%20discuss%20the%20Corporate%20Foundation%20setup." target="_blank" rel="noopener noreferrer" className="btn-pkg">
                <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                Discuss This Setup
              </a>
            </div>

            {/* TIER 2 FEATURED */}
            <div className="pkg-card featured reveal" style={{ transitionDelay: '0.25s' }}>
              <div className="popular-badge">
                <svg viewBox="0 0 24 24" width="12" height="12" stroke="#fff" fill="#fff" strokeWidth="0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                Most Popular
              </div>
              <div className="pkg-icon em">
                <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
              </div>
              <div className="pkg-tier" style={{ color: 'var(--em)' }}>Tier 02</div>
              <div className="pkg-name">The AI Revenue Engine</div>
              <div className="price-hidden">Pricing on consultation</div>
              <div className="pkg-divider"></div>
              <ul className="pkg-features">
                <li><svg className="check-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>Everything in Tier 1, plus:</li>
                <li className="plus-item"><svg className="check-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>Custom AI WhatsApp Negotiator</li>
                <li className="plus-item"><svg className="check-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>Automated Lead Vault</li>
                <li className="plus-item"><svg className="check-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>Smart Human Handoff</li>
              </ul>
              <a href="https://wa.me/2349000000000?text=Hi%20Precious%2C%20I%20want%20to%20build%20the%20AI%20Revenue%20Engine." target="_blank" rel="noopener noreferrer" className="btn-pkg btn-featured">
                <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                Build My AI Engine
              </a>
            </div>

            {/* TIER 3 */}
            <div className="pkg-card reveal" style={{ transitionDelay: '0.35s' }}>
              <div className="pkg-icon">
                <svg viewBox="0 0 24 24" style={{ color: '#06b6d4' }}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div className="pkg-tier">Tier 03</div>
              <div className="pkg-name">The Market Dominator</div>
              <div className="price-hidden">Pricing on consultation</div>
              <div className="pkg-divider"></div>
              <ul className="pkg-features">
                <li><svg className="check-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>Everything in Tier 2, plus:</li>
                <li className="plus-item"><svg className="check-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>Multi-Agent CRM Dispatch</li>
                <li className="plus-item"><svg className="check-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>Day-One Traffic Injection</li>
                <li className="plus-item"><svg className="check-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>Priority Architecture Support</li>
              </ul>
              <a href="https://wa.me/2349000000000?text=Hi%20Precious%2C%20I%20want%20to%20apply%20for%20the%20Market%20Dominator%20Enterprise%20package." target="_blank" rel="noopener noreferrer" className="btn-pkg">
                <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                Apply For Enterprise
              </a>
            </div>
          </div>

          {/* Final CTA */}
          <div style={{ textAlign: 'center', marginTop: '72px' }} className="reveal">
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '24px' }}>Not sure which tier is right for you? Let's figure it out together.</p>
            <a href="https://wa.me/2349000000000?text=Hi%20Precious%2C%20I%27m%20not%20sure%20which%20package%20is%20right%20for%20me.%20Can%20we%20talk%3F" target="_blank" rel="noopener noreferrer" className="btn-wa">
              <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              Talk to Precious Directly
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', stroke: '#fff', fill: 'none', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '16px' }}>OP5 Technologies</span>
        </div>
        <p className="footer-tagline">We don't build websites. We build Sales Engines.</p>
        <a href="https://wa.me/2349000000000?text=Hi%20Precious%2C%20I%27d%20like%20to%20learn%20more%20about%20OP5%20Technologies." target="_blank" rel="noopener noreferrer" className="footer-cta">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="#fff" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Get Started on WhatsApp
        </a>
        <p className="footer-copy">© 2026 OP5 Technologies. All rights reserved.</p>
      </footer>
    </>
  );
}