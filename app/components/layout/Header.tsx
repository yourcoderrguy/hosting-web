"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { WA } from "../../constants/whatsapp";
import Button from "../ui/Button";

export default function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(5,5,5,0.96)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: "linear-gradient(135deg,#10b981,#06b6d4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            style={{ width: 18, height: 18, stroke: "white", fill: "none", strokeWidth: 2.5 }}
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
        <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em" }}>
          OP5 Technologies
        </span>
      </div>
      <Button
        href={WA.engineer}
        variant="outline"
        size="sm"
        nowrap
        icon={<MessageCircle style={{ width: 15, height: 15 }} />}
      >
        Let&apos;s Talk
      </Button>
    </header>
  );
}
