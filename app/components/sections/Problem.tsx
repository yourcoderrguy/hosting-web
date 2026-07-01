"use client";

import React from "react";
import { Clock, DollarSign, Phone } from "lucide-react";

const PROBLEMS = [
  {
    icon: <Phone style={{ width: 18, height: 18 }} />,
    text: "Someone is ready to buy. But you're driving. You reply an hour later. They've already bought from your competitor.",
  },
  {
    icon: <DollarSign style={{ width: 18, height: 18 }} />,
    text: "Someone visits your website. They have one simple question. Nobody answers. They leave forever.",
  },
  {
    icon: <Clock style={{ width: 18, height: 18 }} />,
    text: "You're spending money on Facebook ads. People click. Get confused. Leave. You paid for that click.",
  },
];

export default function Problem() {
  return (
    <section style={{ padding: "60px 20px", maxWidth: 640, margin: "0 auto" }}>
      <div
        style={{
          padding: 28,
          borderRadius: 24,
          background: "rgba(239,68,68,0.04)",
          border: "1px solid rgba(239,68,68,0.2)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#f87171",
            marginBottom: 16,
          }}
        >
          Sound Familiar?
        </div>
        <h2 style={{ fontSize: "clamp(1.4rem,5vw,2rem)", fontWeight: 900, marginBottom: 20, lineHeight: 1.2 }}>
          You&apos;re Losing Customers Every Time You Step Away From Your Phone
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {PROBLEMS.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#f87171",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <p style={{ fontSize: 14, color: "#cbd5e1", lineHeight: 1.6, margin: 0, paddingTop: 6 }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 24,
            padding: "16px 20px",
            borderRadius: 16,
            background: "rgba(16,185,129,0.08)",
            border: "1px solid rgba(16,185,129,0.2)",
          }}
        >
          <p style={{ fontSize: 14, color: "#34d399", fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
            Imagine waking up tomorrow and discovering your website has already answered dozens of
            customer questions, collected new leads, and booked appointments while you were asleep.
            That&apos;s what we build.
          </p>
        </div>
      </div>
    </section>
  );
}
