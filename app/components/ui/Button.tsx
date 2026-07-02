"use client";

import React from "react";

type Variant = "primary" | "outline" | "light";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  href: string;
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

export default function Button({
  href,
  children,
  icon,
  variant = "primary",
  size = "lg",
  fullWidth = false,
  external = true,
  nowrap = false,
  style,
}: ButtonProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        width: fullWidth ? "100%" : undefined,
        maxWidth: "100%",
        boxSizing: "border-box",
        borderRadius: 99,
        textDecoration: "none",
        whiteSpace: nowrap ? "nowrap" : "normal",
        textAlign: "center",
        lineHeight: 1.35,
        ...SIZE_STYLES[size],
        ...VARIANT_STYLES[variant],
        ...style,
      }}
    >
      {icon}
      {children}
    </a>
  );
}
