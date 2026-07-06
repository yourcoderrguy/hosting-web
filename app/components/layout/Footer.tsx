"use client";

import React from "react";
import Image from "next/image";

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
          marginBottom: 12,
        }}
      >
        <Image
          src="/lockup-white-transparent.png"
          alt="OP5 Technologies"
          width={100}
          height={25}
          style={{ height: 22, width: "auto" }}
        />
      </div>
      <p style={{ color: "#64748b", fontSize: 13, marginBottom: 8 }}>
        We don&apos;t build websites. We build Sales Engines.
      </p>
      <p style={{ color: "#334155", fontSize: 11 }}>&copy; 2026 OP5 Technologies. All rights reserved.</p>
    </footer>
  );
}
