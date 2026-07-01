"use client";

import React from "react";

interface SectionProps {
  id?: string;
  maxWidth?: number;
  padding?: string;
  background?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function Section({
  id,
  maxWidth = 640,
  padding = "60px 20px",
  background,
  style,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      style={{
        padding,
        maxWidth,
        margin: "0 auto",
        background,
        ...style,
      }}
    >
      {children}
    </section>
  );
}
