"use client";

import React from "react";
import VideoProvider from "./components/VideoProvider";
import GlobalStyles from "./components/GlobalStyles";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import StickyBar from "./components/layout/StickyBar";
import Hero from "./components/sections/Hero";
import Problem from "./components/sections/Problem";
import Features from "./components/sections/Features";
import Process from "./components/sections/Process";
import Proof from "./components/sections/Proof";
import FAQ from "./components/sections/FAQ";
import Pricing from "./components/sections/Pricing";
import FinalCTA from "./components/sections/FinalCTA";

export default function LandingPage() {
  return (
    <VideoProvider>
      <StickyBar />
      <main
        style={{
          minHeight: "100vh",
          position: "relative",
          fontFamily: "sans-serif",
          background: "#050505",
          color: "#f8fafc",
          // overflowX: "hidden",
        }}
      >
        {/* Background Glow Orbs — radial-gradient, not filter:blur().
            A blur() filter on a large position:fixed element has to be
            recomputed by the GPU on every scroll frame, right next to
            the video elements' own hardware decode layer. That fight
            over the compositor is what was producing the static/ghost
            glitch, not the videos themselves. A radial-gradient gives
            the same soft glow as plain paint, with no filter pass. */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "900px",
            height: "900px",
            background:
              "radial-gradient(circle, rgba(16,185,129,0.10) 0%, rgba(16,185,129,0.04) 35%, rgba(16,185,129,0) 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-200px",
            right: "-150px",
            width: "800px",
            height: "800px",
            background:
              "radial-gradient(circle, rgba(6,182,212,0.10) 0%, rgba(6,182,212,0.04) 35%, rgba(6,182,212,0) 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <Header />
        <Hero />
        <Problem />
        <Features />
        <Process />
        <Proof />
        <FAQ />
        <Pricing />
        <FinalCTA />
        <Footer />

        <GlobalStyles />
      </main>
    </VideoProvider>
  );
}
