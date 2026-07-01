"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { WA } from "../../constants/whatsapp";
import Button from "../ui/Button";

const STEPS = [
  {
    step: "01",
    title: "Book a Free Strategy Call",
    desc: "You tell us what you sell, who your customers are, and the questions they usually ask. We handle everything else from there. No technical knowledge needed from you at all.",
    time: "Day 1",
  },
  {
    step: "02",
    title: "We Build Your AI Sales System",
    desc: "We build your website and train the AI on your exact business — your prices, your services, your tone. Before we go live, we show you how it talks to customers so you're happy with every word it says.",
    time: "Days 2–7",
  },
  {
    step: "03",
    title: "Launch — Your Business Starts Responding Automatically",
    desc: "From launch day, your website chat and WhatsApp are both handled automatically. Customers get instant answers. Leads get saved. You only step in when someone is ready to pay.",
    time: "Day 7+",
  },
];

export default function Process() {
  return (
    <section style={{ padding: "60px 20px", maxWidth: 640, margin: "0 auto" }}>
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
          Simple Process
        </div>
        <h2 style={{ fontSize: "clamp(1.8rem,6vw,2.4rem)", fontWeight: 900, marginBottom: 12 }}>
          From Idea To Launch In Just A Few Days
        </h2>
        <p style={{ color: "#94a3b8", fontSize: 15, maxWidth: 380, margin: "0 auto" }}>
          Three steps from a free conversation to a fully running sales system.
        </p>
      </div>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: 27,
            top: 44,
            bottom: 44,
            width: 2,
            background: "linear-gradient(180deg,#10b981,#06b6d4,rgba(6,182,212,0.1))",
            borderRadius: 2,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {STEPS.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
                paddingBottom: i < STEPS.length - 1 ? 32 : 0,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#10b981,#06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontWeight: 900,
                  fontSize: 13,
                  color: "white",
                  boxShadow: "0 0 20px rgba(16,185,129,0.3)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {item.step}
              </div>
              <div style={{ paddingTop: 10 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#34d399",
                    marginBottom: 4,
                  }}
                >
                  {item.time}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 8px 0" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 40, textAlign: "center" }}>
        <Button
          href={WA.strategyCall}
          variant="primary"
          icon={<MessageCircle style={{ width: 18, height: 18 }} />}
        >
          Book a Free Call — Let&apos;s Talk About Your Business
        </Button>
        <p style={{ marginTop: 10, fontSize: 12, color: "#475569" }}>No payment needed. Just a conversation.</p>
      </div>
    </section>
  );
}
