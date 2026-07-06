"use client";

import React from "react";
import TestimonialVideo from "../ui/TestimonialVideo";

const REVIEW_IMAGES = ["/review-1.png", "/review-2.png", "/review-3.png"];

export default function Proof() {
  return (
    <section style={{ padding: "80px 20px", background: "#080d0a" }} id="proof">
      <div className="section-wrap">
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
            The Results Speak
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem,6vw,2.8rem)", fontWeight: 900, marginBottom: 12 }}>
            Real Businesses. Real Results.
          </h2>
          <p style={{ color: "#94a3b8", fontSize: 15, maxWidth: 400, margin: "0 auto" }}>
            Don&apos;t just take our word for it. See what business owners say after working with us.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            margin: "0 auto 60px",
          }}
        >
          <TestimonialVideo
            src="/cre8ifhub.mp4"
            title="Creative Hub Founder"
            subtitle="Automated Client Infrastructure"
          />
          <TestimonialVideo src="/benedicta.mp4" title="Benedicta" subtitle="3x Repeat Client" />
        </div>
        <div>
          <div
            style={{
              textAlign: "center",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#34d399",
              marginBottom: 24,
            }}
          >
            5-Star Upwork Reviews
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
            {REVIEW_IMAGES.map((src, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <img src={src} alt={`Upwork Review ${i + 1}`} style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
