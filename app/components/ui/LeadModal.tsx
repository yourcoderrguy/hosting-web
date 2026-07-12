"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
  waLink: string;
  packageName: string;
}

export default function LeadModal({ open, onClose, waLink, packageName }: LeadModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("That email doesn't look right.");
      return;
    }

    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "Lead");
    }

    // 1. Redirect FIRST, synchronously, in the exact same click — this is
    //    what keeps the WhatsApp handoff reliable (same-tab navigation,
    //    no delay before it). Everything after this line still runs,
    //    because the browser doesn't tear down the page until the new
    //    navigation actually completes.
    window.location.href = waLink;

    // 2. Save the lead in the background. `keepalive: true` is what lets
    //    this request survive the page navigating away — without it, a
    //    normal fetch gets silently cancelled the instant location changes.
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        package: packageName,
        source: "pricing_modal",
      }),
      keepalive: true,
    }).catch(() => {
      /* best-effort — the WhatsApp redirect already happened either way */
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 380,
          background: "rgba(13,13,13,0.92)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 24,
          padding: 28,
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(255,255,255,0.06)",
            border: "none",
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#94a3b8",
          }}
        >
          <X style={{ width: 16, height: 16 }} />
        </button>

        <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6, color: "#f8fafc" }}>
          Let&apos;s Build Your Engine.
        </h3>
        <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 20, lineHeight: 1.5 }}>
          Quick setup step for <strong style={{ color: "#cbd5e1" }}>{packageName}</strong> before we
          hand you to WhatsApp.
        </p>

        <input
          type="text"
          placeholder="First name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Best email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ ...inputStyle, marginBottom: error ? 8 : 20 }}
        />
        {error && <p style={{ color: "#f87171", fontSize: 12, marginBottom: 12 }}>{error}</p>}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px 0",
            borderRadius: 99,
            border: "none",
            background: "linear-gradient(90deg,#10b981,#06b6d4)",
            color: "white",
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          Proceed to WhatsApp ⚡
        </button>
      </form>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.04)",
  color: "#f8fafc",
  fontSize: 14,
  marginBottom: 12,
  outline: "none",
  boxSizing: "border-box",
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}
