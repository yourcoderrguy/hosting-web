"use client";

import React from "react";
import { Bot, TrendingUp, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: <Zap style={{ width: 20, height: 20 }} />,
    title: "AI Receptionist",
    desc: "Answers customer questions instantly. Explains your services. Guides visitors toward becoming customers. 24 hours a day.",
    tag: undefined as string | undefined,
  },
  {
    icon: <Bot style={{ width: 20, height: 20 }} />,
    title: "Website + WhatsApp AI",
    desc: "Whether customers message from your website or WhatsApp, they get fast, accurate replies without waiting for you.",
    tag: "AI on Website + WhatsApp",
  },
  {
    icon: <TrendingUp style={{ width: 20, height: 20 }} />,
    title: "Never Lose Another Lead",
    desc: "Every enquiry is automatically captured so you always know who contacted you and what they need.",
    tag: "Your Lead Tracker",
  },
];

export default function Features() {
  return (
    <section className="section-wrap" style={{ padding: "60px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#34d399",
            marginBottom: 12,
          }}
        >
          What We Do For You
        </div>
        <h2 style={{ fontSize: "clamp(1.8rem,6vw,2.4rem)", fontWeight: 900, marginBottom: 12 }}>
          Everything You Need To Turn Website Visitors Into Paying Customers
        </h2>
        <p style={{ color: "#94a3b8", fontSize: 15, maxWidth: 420, margin: "0 auto", lineHeight: 1.6 }}>
          No tech jargon. Plain English. Here&apos;s what we build for you and why it makes you money.
        </p>
      </div>
      <div className="grid-3">
        {FEATURES.map((item, i) => (
          <div
            key={i}
            style={{
              padding: 24,
              borderRadius: 20,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              gap: 18,
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "linear-gradient(135deg,rgba(16,185,129,0.15),rgba(6,182,212,0.1))",
                border: "1px solid rgba(16,185,129,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#34d399",
                flexShrink: 0,
              }}
            >
              {item.icon}
            </div>
            <div>
              {item.tag && (
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#475569",
                    marginBottom: 4,
                  }}
                >
                  {item.tag}
                </div>
              )}
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 8px 0" }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
