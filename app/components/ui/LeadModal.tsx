"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Lock background scroll on mobile while the modal + keyboard are
  // open, focus the first input so the keyboard pops up immediately,
  // and let Escape close it (desktop convenience).
  useEffect(() => {
    if (!open) return;

    document.body.classList.add("modal-open");
    const focusTimer = setTimeout(() => firstInputRef.current?.focus(), 50);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

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
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", {
        package: packageName,
        source: "pricing_modal",
      });
    }

    const payload = JSON.stringify({
      name: name.trim(),
      email: email.trim(),
      package: packageName,
      source: "pricing_modal",
    });

    // sendBeacon is purpose-built for "fire this request, then leave
    // the page" — the browser guarantees delivery even as navigation
    // happens right after. fetch(..., { keepalive: true }) is NOT
    // reliably honored across mobile browsers in this exact
    // situation (that's why leads were being dropped and only one
    // email ever landed in the inbox). Fall back to keepalive fetch
    // only if sendBeacon isn't available.
    let sent = false;
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      const blob = new Blob([payload], { type: "application/json" });
      sent = navigator.sendBeacon("/api/lead", blob);
    }
    if (!sent) {
      fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {
        /* best-effort — the WhatsApp redirect happens either way */
      });
    }

    // Redirect to WhatsApp last, after the beacon has already been
    // handed off to the browser's network stack.
    window.location.href = waLink;
  };

  return (
    <div role="dialog" aria-modal="true" onClick={onClose} className="lead-modal-overlay">
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="lead-modal-card"
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

        <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6, color: "#f8fafc", paddingRight: 32 }}>
          Let&apos;s Build Your Engine.
        </h3>
        <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 20, lineHeight: 1.5 }}>
          Quick setup step for <strong style={{ color: "#cbd5e1" }}>{packageName}</strong> before we
          hand you to WhatsApp.
        </p>

        <input
          ref={firstInputRef}
          type="text"
          placeholder="First name"
          autoComplete="given-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="lead-modal-input"
        />
        <input
          type="email"
          placeholder="Best email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="lead-modal-input"
          style={{ marginBottom: error ? 8 : 20 }}
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

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}
