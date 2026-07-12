"use client";

import React from "react";

type Variant = "primary" | "outline" | "light";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  /** Omit href (and pass onClick instead) to render this as a trigger
   *  button — used by the Pricing tiers to open the lead modal instead
   *  of navigating straight to WhatsApp. */
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  external?: boolean;
  /** Set true only for short, single-line labels (e.g. header "Let's Talk").
   *  Long CTA copy should stay false (default) so it wraps instead of
   *  overflowing the screen on mobile. */
  nowrap?: boolean;
  style?: React.CSSProperties;
}

const SIZE_STYLES: Record<Size, React.CSSProperties> = {
  sm: { padding: "9px 16px", fontSize: 13 },
  md: { padding: "12px 0", fontSize: 14 },
  lg: { padding: "14px 32px", fontSize: 15 },
};

const VARIANT_STYLES: Record<Variant, React.CSSProperties> = {
  primary: {
    background: "linear-gradient(90deg,#10b981,#06b6d4)",
    color: "white",
    fontWeight: 700,
    boxShadow: "0 8px 32px rgba(16,185,129,0.25)",
  },
  outline: {
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.04)",
    color: "inherit",
    fontWeight: 600,
  },
  light: {
    background: "#f8fafc",
    color: "#000",
    fontWeight: 700,
  },
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function Button({
  href,
  onClick,
  children,
  icon,
  variant = "primary",
  size = "lg",
  fullWidth = false,
  external = true,
  nowrap = false,
  style,
}: ButtonProps) {
  const sharedStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: fullWidth ? "100%" : undefined,
    maxWidth: "100%",
    boxSizing: "border-box",
    borderRadius: 99,
    border: "none",
    textDecoration: "none",
    whiteSpace: nowrap ? "nowrap" : "normal",
    textAlign: "center",
    lineHeight: 1.35,
    cursor: "pointer",
    ...SIZE_STYLES[size],
    ...VARIANT_STYLES[variant],
    ...style,
  };

  if (!href) {
    return (
      <button type="button" onClick={onClick} style={sharedStyle}>
        {icon}
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      // Deliberately NOT target="_blank". Meta's in-app browser (the
      // webview Facebook/Instagram open when someone taps your ad) is
      // unreliable at handing a new-tab wa.me link off to the real
      // WhatsApp app — this is the single most common reason ad clicks
      // don't turn into WhatsApp chats. Navigating in the same tab is
      // what reliably triggers the OS-level WhatsApp handoff.
      rel={external ? "noopener noreferrer" : undefined}
      onClick={() => {
        if (typeof window !== "undefined" && typeof window.fbq === "function") {
          window.fbq("track", "Lead");
        }
      }}
      style={sharedStyle}
    >
      {icon}
      {children}
    </a>
  );
}
