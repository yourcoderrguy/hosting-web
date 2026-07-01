"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { WA } from "../../constants/whatsapp";

export default function StickyBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismiss] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        padding: "12px 16px",
        paddingBottom: "calc(12px + env(safe-area-inset-bottom))",
        background: "rgba(8,8,8,0.97)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(16,185,129,0.2)",
        boxShadow: "0 -8px 40px rgba(0,0,0,0.6)",
      }}
    >
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#10b981",
            animation: "pulse 2s infinite",
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#f8fafc", lineHeight: 1.3 }}>
            Have a question? Just ask.
          </p>
          <p style={{ margin: 0, fontSize: 11, color: "#64748b", lineHeight: 1.3 }}>
            Precious replies personally — usually within minutes.
          </p>
        </div>
        <a
          href={WA.stickyBar}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "9px 16px",
            borderRadius: 99,
            background: "linear-gradient(90deg,#10b981,#06b6d4)",
            color: "white",
            fontWeight: 700,
            fontSize: 13,
            textDecoration: "none",
            whiteSpace: "nowrap",
            flexShrink: 0,
            boxShadow: "0 4px 16px rgba(16,185,129,0.35)",
          }}
        >
          <MessageCircle style={{ width: 14, height: 14 }} />
          Ask Us Anything
        </a>
        <button
          onClick={() => {
            setDismiss(true);
            setVisible(false);
          }}
          aria-label="Dismiss"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            color: "#475569",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          <X style={{ width: 16, height: 16 }} />
        </button>
      </div>
    </div>
  );
}
