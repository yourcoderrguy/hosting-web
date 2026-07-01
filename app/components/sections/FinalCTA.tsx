"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { WA } from "../../constants/whatsapp";
import Button from "../ui/Button";

export default function FinalCTA() {
  return (
    <section style={{ padding: "60px 20px 100px", textAlign: "center" }}>
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#64748b",
          marginBottom: 16,
        }}
      >
        Every Hour You Wait...
      </p>
      <h2
        style={{
          fontSize: "clamp(1.5rem,5.5vw,2.2rem)",
          fontWeight: 900,
          maxWidth: 480,
          margin: "0 auto 16px",
          lineHeight: 1.3,
        }}
      >
        Potential customers visit your website, ask questions, and leave — then buy from someone
        else.
      </h2>
      <p
        style={{
          color: "#94a3b8",
          fontSize: 15,
          maxWidth: 440,
          margin: "0 auto 32px",
          lineHeight: 1.6,
        }}
      >
        Don&apos;t let another customer slip away because nobody replied. Book a free strategy call and
        see exactly how your business can respond automatically — even when you&apos;re away.
      </p>
      <Button
        href={WA.talkDirectly}
        variant="primary"
        size="lg"
        icon={<MessageCircle style={{ width: 20, height: 20 }} />}
        style={{ padding: "16px 36px", fontSize: 16, boxShadow: "0 10px 40px rgba(16,185,129,0.3)" }}
      >
        Book My Free Strategy Call
      </Button>
    </section>
  );
}
