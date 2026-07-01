"use client";

import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "40px 20px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        textAlign: "center",
        background: "#050505",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            background: "linear-gradient(135deg,#10b981,#06b6d4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            style={{ width: 12, height: 12, stroke: "white", fill: "none", strokeWidth: 3 }}
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
        <span style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>OP5 Technologies</span>
      </div>
      <p style={{ color: "#64748b", fontSize: 13, marginBottom: 8 }}>
        We don&apos;t build websites. We build Sales Engines.
      </p>
      <p style={{ color: "#334155", fontSize: 11 }}>&copy; 2026 OP5 Technologies. All rights reserved.</p>
    </footer>
  );
}
