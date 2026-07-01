"use client";

import React from "react";
import { Check, X } from "lucide-react";

const QUALIFIERS = [
  "You're getting enquiries every week.",
  "You can't reply immediately.",
  "Customers keep asking the same questions.",
  "You want your business working after office hours.",
  "You're tired of losing leads to competitors.",
];

const HUMAN_CONS = ["Sleeps", "Takes breaks", "Needs training", "Monthly salary", "Handles one customer at a time"];
const AI_PROS = [
  "Replies 24/7",
  "Never gets tired",
  "Learns your business",
  "Costs less over time",
  "Can handle hundreds of conversations simultaneously",
];

export default function FAQ() {
  return (
    <section style={{ padding: "60px 20px", maxWidth: 640, margin: "0 auto" }}>
      {/* Is This Right For You? */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h2 style={{ fontSize: "clamp(1.6rem,5.5vw,2.2rem)", fontWeight: 900, marginBottom: 12 }}>
          Is This Right For You?
        </h2>
        <p style={{ color: "#94a3b8", fontSize: 15, maxWidth: 420, margin: "0 auto" }}>
          This solution is perfect if:
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginBottom: 56,
          padding: 24,
          borderRadius: 20,
          background: "rgba(16,185,129,0.06)",
          border: "1px solid rgba(16,185,129,0.2)",
        }}
      >
        {QUALIFIERS.map((q, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <Check style={{ width: 18, height: 18, color: "#10b981", flexShrink: 0, marginTop: 2 }} />
            <p style={{ margin: 0, fontSize: 14, color: "#cbd5e1", lineHeight: 1.5 }}>{q}</p>
          </div>
        ))}
        <p style={{ margin: "8px 0 0", fontSize: 14, color: "#34d399", fontWeight: 600 }}>
          If that sounds like you — you&apos;re exactly who we built this for.
        </p>
      </div>

      {/* Hire a person vs. Our AI Sales System */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h2 style={{ fontSize: "clamp(1.6rem,5.5vw,2.2rem)", fontWeight: 900, marginBottom: 12 }}>
          Why Not Just Hire A Virtual Assistant?
        </h2>
        <p style={{ color: "#94a3b8", fontSize: 15, maxWidth: 420, margin: "0 auto" }}>
          It reframes the cost — this is an investment, not an expense.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div
          style={{
            padding: 20,
            borderRadius: 18,
            background: "rgba(239,68,68,0.04)",
            border: "1px solid rgba(239,68,68,0.15)",
          }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 800, margin: "0 0 14px", color: "#f87171" }}>
            Hire a Person
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {HUMAN_CONS.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <X style={{ width: 14, height: 14, color: "#f87171", flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 12.5, color: "#cbd5e1", lineHeight: 1.5 }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            padding: 20,
            borderRadius: 18,
            background: "rgba(16,185,129,0.06)",
            border: "1px solid rgba(16,185,129,0.25)",
          }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 800, margin: "0 0 14px", color: "#34d399" }}>
            Our AI Sales System
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {AI_PROS.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <Check style={{ width: 14, height: 14, color: "#10b981", flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 12.5, color: "#cbd5e1", lineHeight: 1.5, fontWeight: 600 }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
