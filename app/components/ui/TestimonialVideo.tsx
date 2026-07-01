"use client";

import React, { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { useVideoContext } from "../VideoProvider";
import type { TestimonialVideoProps } from "../../types/video";

let _vidCounter = 0;

/*
  Fix 1: thumbReady falls back to true after 800 ms so the play button
         always becomes visible, even if the browser never fires
         'seeked'/'canplay' (iOS Safari).
  Fix 2: card background is solid — no gradient — to eliminate the
         WebKit compositing scan-line glitch.
*/
export default function TestimonialVideo({ src, title, subtitle }: TestimonialVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<string>(`vid-${++_vidCounter}`);
  const [playing, setPlaying] = useState(false);
  const [thumbReady, setThumbReady] = useState(false);
  const ctx = useVideoContext();

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !ctx) return;
    ctx.register(idRef.current, v);
    return () => ctx.unregister(idRef.current);
  }, [ctx]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const reveal = () => setThumbReady(true);
    const onMeta = () => {
      try {
        v.currentTime = 0.5;
      } catch (_) {
        reveal();
      }
    };
    const timer = setTimeout(reveal, 800); // fallback

    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("seeked", reveal);
    v.addEventListener("canplay", reveal);

    if (v.readyState >= 1) onMeta();

    return () => {
      clearTimeout(timer);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("seeked", reveal);
      v.removeEventListener("canplay", reveal);
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting && !v.paused) {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    ctx?.notifyPlay(idRef.current);
    v.currentTime = 0;
    v.play();
    setPlaying(true);
  };

  return (
    <div
      ref={containerRef}
      style={{
        borderRadius: 16,
        padding: 12,
        display: "flex",
        flexDirection: "column",
        background: "#0d1a14",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          width: "100%",
          borderRadius: 12,
          overflow: "hidden",
          position: "relative",
          background: "#000",
          aspectRatio: "9/16",
        }}
      >
        <video
          ref={videoRef}
          src={src}
          preload="metadata"
          playsInline
          controls={playing}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />

        {!thumbReady && !playing && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#0d1a14",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "3px solid rgba(16,185,129,0.2)",
                borderTopColor: "#10b981",
                animation: "spin 0.8s linear infinite",
              }}
            />
          </div>
        )}

        {!playing && (
          <button
            onClick={thumbReady ? handlePlay : undefined}
            aria-label={`Play ${title} testimonial`}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: thumbReady ? "rgba(0,0,0,0.3)" : "transparent",
              border: "none",
              cursor: thumbReady ? "pointer" : "default",
              opacity: thumbReady ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#10b981,#06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 32px rgba(16,185,129,0.5)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                style={{ width: 24, height: 24, fill: "white", transform: "translateX(2px)" }}
              >
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </button>
        )}
      </div>

      <h3 style={{ fontWeight: 700, textAlign: "center", fontSize: 14, margin: "12px 0 4px" }}>
        {title}
      </h3>
      <p
        style={{
          color: "#34d399",
          fontSize: 12,
          fontWeight: 500,
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        {subtitle}
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 2 }}>
        {[...Array(5)].map((_, i) => (
          <Star key={i} style={{ width: 13, height: 13, color: "#10b981", fill: "#10b981" }} />
        ))}
      </div>
    </div>
  );
}
