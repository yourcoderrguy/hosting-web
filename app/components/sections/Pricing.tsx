"use client";

import React, { useState } from "react";
import { Check, MessageCircle, Star } from "lucide-react";
import { WA } from "../../constants/whatsapp";
import Button from "../ui/Button";
import LeadModal from "../ui/LeadModal";

const TIER1_FEATURES = [
  "A fast website that works perfectly on any phone",
  "A live chat on your website so visitors can ask questions and get answers immediately",
  "Every message from the chat saved so you can follow up",
  "A WhatsApp button on every page so customers can reach you in one tap",
  "A professional business email so you stop using Gmail for client conversations",
];

const TIER2_FEATURES = [
  "An AI assistant trained on your business handling your website chat 24/7",
  "The same AI connected to your WhatsApp — so both channels are covered",
  "Every customer who reaches out automatically saved in one place",
  "The AI knows exactly when a conversation needs your personal attention and alerts you",
];

const TIER3_FEATURES = [
  "Paid traffic sent to your website starting from day one",
  "Multiple AI assistants handling different parts of your business separately",
  "A dedicated support team you can reach whenever something needs attention",
];

export default function Pricing() {
  const [modal, setModal] = useState<{ waLink: string; packageName: string } | null>(null);

  return (
    <>
    <section className="section-wrap" style={{ padding: "80px 20px" }} id="packages">
      <div style={{ textAlign: "center", marginBottom: 48 }}>
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
          Choose What Fits You
        </div>
        <h2 style={{ fontSize: "clamp(1.8rem,6vw,2.8rem)", fontWeight: 900, marginBottom: 12 }}>
          Choose The Right Growth Stage
        </h2>
        <p style={{ color: "#94a3b8", fontSize: 15 }}>
          Whether you&apos;re just getting online or ready to automate your sales process completely,
          there&apos;s a solution built for where your business is today.
        </p>
      </div>

      <div className="grid-3">
        {/* TIER 1 */}
        <div style={{ padding: 28, borderRadius: 24, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#64748b", textTransform: "uppercase", marginBottom: 6 }}>
            Tier 01
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>The Foundation</h3>
          <p style={{ fontSize: 13, color: "#64748b", fontStyle: "italic", marginBottom: 8 }}>
            Price based on your business — let&apos;s talk
          </p>
          <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6, marginBottom: 20 }}>
            Perfect for businesses that need a professional online presence that builds trust and
            makes it easy for customers to contact them.
          </p>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#475569", marginBottom: 14 }}>
            What you get
          </p>
          <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 20 }} />
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", display: "flex", flexDirection: "column", gap: 14 }}>
            {TIER1_FEATURES.map((f, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#cbd5e1" }}>
                <Check style={{ width: 18, height: 18, color: "#10b981", flexShrink: 0, marginTop: 1 }} />
                {f}
              </li>
            ))}
          </ul>
          <p style={{ fontSize: 12, color: "#475569", fontStyle: "italic", marginBottom: 20 }}>
            Best for: Businesses that currently have no website, or have one that isn&apos;t working.
            You want people to take you seriously and be able to reach you easily.
          </p>
          <Button
            onClick={() => setModal({ waLink: WA.tier1, packageName: "The Foundation" })}
            variant="outline"
            size="md"
            fullWidth
            icon={<MessageCircle style={{ width: 16, height: 16 }} />}
          >
            Let&apos;s Talk About This Option
          </Button>
        </div>

        {/* TIER 2 — FEATURED */}
        <div
          style={{
            padding: 28,
            borderRadius: 24,
            background: "linear-gradient(135deg,rgba(16,185,129,0.1),rgba(6,182,212,0.05))",
            border: "1px solid #10b981",
            boxShadow: "0 0 50px rgba(16,185,129,0.12)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -14,
              left: "50%",
              transform: "translateX(-50%)",
              padding: "4px 16px",
              background: "linear-gradient(90deg,#10b981,#06b6d4)",
              borderRadius: 99,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: 4,
              whiteSpace: "nowrap",
            }}
          >
            <Star style={{ width: 10, height: 10, fill: "white", stroke: "none" }} />
            Most Popular
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#34d399", textTransform: "uppercase", marginBottom: 6 }}>
            Tier 02
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>The Sales Machine</h3>
          <p style={{ fontSize: 13, color: "#64748b", fontStyle: "italic", marginBottom: 8 }}>
            Price based on your business — let&apos;s talk
          </p>
          <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6, marginBottom: 20 }}>
            Most businesses lose customers because they don&apos;t reply quickly enough. This package
            fixes that. Your website and WhatsApp work together to answer customers instantly,
            qualify leads, and notify you only when someone is ready to buy.
          </p>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#34d399", marginBottom: 14 }}>
            What you get
          </p>
          <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 20 }} />
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", display: "flex", flexDirection: "column", gap: 14 }}>
            <li style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#cbd5e1" }}>
              <Check style={{ width: 18, height: 18, color: "#10b981", flexShrink: 0, marginTop: 1 }} />
              Everything in The Foundation, plus:
            </li>
            {TIER2_FEATURES.map((f, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, fontWeight: 700, color: "white" }}>
                <Check style={{ width: 18, height: 18, color: "#10b981", flexShrink: 0, marginTop: 1 }} />
                {f}
              </li>
            ))}
          </ul>
          <p style={{ fontSize: 12, color: "#475569", fontStyle: "italic", marginBottom: 20 }}>
            Best for: Business owners actively getting enquiries but losing some because they can&apos;t
            respond fast enough. This stops the leak completely.
          </p>
          <Button
            onClick={() => setModal({ waLink: WA.tier2, packageName: "The Sales Machine" })}
            variant="primary"
            size="lg"
            fullWidth
            icon={<MessageCircle style={{ width: 18, height: 18 }} />}
          >
            I Want This — Let&apos;s Build It
          </Button>
        </div>

        {/* TIER 3 */}
        <div style={{ padding: 28, borderRadius: 24, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#64748b", textTransform: "uppercase", marginBottom: 6 }}>
            Tier 03
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>The Growth System</h3>
          <p style={{ fontSize: 13, color: "#64748b", fontStyle: "italic", marginBottom: 8 }}>
            Price based on your business — let&apos;s talk
          </p>
          <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6, marginBottom: 20 }}>
            Already getting customers? Now it&apos;s time to scale. We don&apos;t just automate your
            enquiries — we help bring more qualified people into your business through paid
            advertising and advanced AI automation.
          </p>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#475569", marginBottom: 14 }}>
            What you get
          </p>
          <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 20 }} />
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px", display: "flex", flexDirection: "column", gap: 14 }}>
            <li style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#cbd5e1" }}>
              <Check style={{ width: 18, height: 18, color: "#10b981", flexShrink: 0, marginTop: 1 }} />
              Everything in The Sales Machine, plus:
            </li>
            {TIER3_FEATURES.map((f, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, fontWeight: 700, color: "white" }}>
                <Check style={{ width: 18, height: 18, color: "#10b981", flexShrink: 0, marginTop: 1 }} />
                {f}
              </li>
            ))}
          </ul>
          <p style={{ fontSize: 12, color: "#475569", fontStyle: "italic", marginBottom: 20 }}>
            Best for: Business owners who already know their offer works and are ready to pour fuel
            on it. You want volume, speed, and a system that scales.
          </p>
          <Button
            onClick={() => setModal({ waLink: WA.tier3, packageName: "The Growth System" })}
            variant="outline"
            size="md"
            fullWidth
            icon={<MessageCircle style={{ width: 16, height: 16 }} />}
          >
            I&apos;m Ready to Scale — Let&apos;s Talk
          </Button>
        </div>
      </div>
    </section>

      <LeadModal
        open={modal !== null}
        onClose={() => setModal(null)}
        waLink={modal?.waLink ?? ""}
        packageName={modal?.packageName ?? ""}
      />
    </>
  );
}
