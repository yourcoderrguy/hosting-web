"use client";

import React, { useEffect, useRef } from "react";
import { useVideoContext } from "../VideoProvider";

let _vidCounter = 0;

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<string>(`vid-${++_vidCounter}`);
  const ctx = useVideoContext();

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !ctx) return;
    ctx.register(idRef.current, v);
    return () => ctx.unregister(idRef.current);
  }, [ctx]);

  useEffect(() => {
    const el = containerRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting && !v.paused) v.pause();
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        maxWidth: 340,
        padding: 2,
        borderRadius: 20,
        background:
          "linear-gradient(135deg,rgba(16,185,129,0.35),rgba(6,182,212,0.2))",
        boxShadow: "0 0 60px rgba(16,185,129,0.15)",
      }}
    >
      <div
        style={{
          borderRadius: 18,
          overflow: "hidden",
          background: "#0d0d0d",
          aspectRatio: "9/16",
          position: "relative",
        }}
      >
        <video
          ref={videoRef}
          src="/intro.mp4"
          controls
          playsInline
          preload="metadata"
          onPlay={() => ctx?.notifyPlay(idRef.current)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}
