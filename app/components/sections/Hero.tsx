"use client";

import React from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import HeroVideo from "../ui/HeroVideo";

export default function Hero() {
  return (
    <section
      className="section-wrap"
      style={{
        paddingTop: 100,
        paddingBottom: 60,
        paddingLeft: 20,
        paddingRight: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 16px",
          borderRadius: 99,
          border: "1px solid rgba(16,185,129,0.3)",
          background: "rgba(16,185,129,0.1)",
          color: "#34d399",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: 28,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#10b981",
            animation: "pulse 2s infinite",
            display: "inline-block",
          }}
        />
        Helping Businesses Sell More 24/7
      </div>
      <h1
        style={{
          fontSize: "clamp(2rem,8vw,3.5rem)",
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          margin: "0 0 20px 0",
        }}
      >
        Your Website Can Automatically Answer Your Customers{" "}
        <span
          style={{
            background: "linear-gradient(90deg,#34d399,#22d3ee)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Even When You&apos;re Away.
        </span>
      </h1>
      <p
        style={{
          fontSize: 16,
          color: "#94a3b8",
          maxWidth: 480,
          lineHeight: 1.7,
          marginBottom: 32,
          fontWeight: 300,
        }}
      >
        Stop staying glued to your phone because of customer enquiries. Go about your day while
        your website instantly answers questions, qualifies leads, and continues the conversation
        on WhatsApp even while you&apos;re asleep.
      </p>
      <a
        href="#packages"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "14px 32px",
          background: "#f8fafc",
          color: "#000",
          borderRadius: 99,
          fontWeight: 700,
          fontSize: 15,
          textDecoration: "none",
          marginBottom: 40,
        }}
      >
        <MessageCircle style={{ width: 18, height: 18 }} />
        See How It Works
      </a>
      <HeroVideo />
      <div style={{ marginTop: 28, color: "#475569" }}>
        <ChevronDown style={{ width: 20, height: 20, animation: "bounce 2s infinite" }} />
      </div>
    </section>
  );
}
