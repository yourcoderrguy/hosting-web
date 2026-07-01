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
          overflowX: "hidden",
          background: "#050505",
          color: "#f8fafc",
        }}
      >
        {/* Background Glow Orbs */}
        <div
          style={{
            position: "fixed",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "600px",
            background: "rgba(16,185,129,0.07)",
            filter: "blur(120px)",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "fixed",
            bottom: "-200px",
            right: "-100px",
            width: "500px",
            height: "500px",
            background: "rgba(6,182,212,0.07)",
            filter: "blur(120px)",
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
