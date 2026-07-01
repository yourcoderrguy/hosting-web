"use client";

import React, { useEffect, useRef, useState } from "react";
import { Pause, Star, Volume2, VolumeX } from "lucide-react";
import { useVideoContext } from "../VideoProvider";
import type { TestimonialVideoProps } from "../../types/video";

let _vidCounter = 0;

/*
  Fix 1: thumbReady falls back to true after 800 ms so the play button
         always becomes visible, even if the browser never fires
         'seeked'/'canplay' (iOS Safari).
  Fix 2: card background is solid — no gradient — to eliminate the
         WebKit compositing scan-line glitch.
  Fix 3: the `controls` attribute is NEVER toggled on the <video>.
         Android Chrome renders video through a hardware overlay layer;
         flipping between "no controls" and "native controls" forces a
         surface rebuild mid-scroll and is what produced the corrupted/
         "broken TV" rendering. Play/pause/mute are handled with a small
         custom control set instead, so the video element's attributes
         never change after mount.
*/
export default function TestimonialVideo({ src, title, subtitle }: TestimonialVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<string>(`vid-${++_vidCounter}`);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [thumbReady, setThumbReady] = useState(false);
  const ctx = useVideoContext();

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !ctx) return;
    ctx.register(idRef.current, v);
    return () => ctx.unregister(idRef.current);
  }, [ctx]);

  /* Thumbnail: seek to 0.5 s on metadata load.
     If seeked/canplay never fires (iOS Safari), fall back after 800 ms. */
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
    const timer = setTimeout(reveal, 800);

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

  /* Pause (not unmount, not attribute change) when scrolled out of view */
  useEffect(() => {
    const el = containerRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting && !v.paused) v.pause();
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleToggle = () => {
    const v = videoRef.current;
    if (!v || !thumbReady) return;
    if (v.paused) {
      ctx?.notifyPlay(idRef.current);
      if (!playing) v.currentTime = 0;
      v.play();
    } else {
      v.pause();
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
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
        onClick={handleToggle}
        style={{
          width: "100%",
          borderRadius: 12,
          overflow: "hidden",
          position: "relative",
          background: "#000",
          aspectRatio: "9/16",
          cursor: thumbReady ? "pointer" : "default",
        }}
      >
        <video
          ref={videoRef}
          src={src}
          preload="metadata"
          playsInline
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

        {/* Big center play button — shown only before playback starts */}
        {!playing && thumbReady && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.3)",
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
                aria-label={`Play ${title} testimonial`}
              >
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
        )}

        {/* Minimal custom controls — visible only while playing */}
        {playing && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggle();
              }}
              aria-label="Pause"
              style={{
                position: "absolute",
                bottom: 10,
                left: 10,
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.55)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Pause style={{ width: 14, height: 14, color: "white" }} />
            </button>
            <button
              onClick={handleMuteToggle}
              aria-label={muted ? "Unmute" : "Mute"}
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.55)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              {muted ? (
                <VolumeX style={{ width: 14, height: 14, color: "white" }} />
              ) : (
                <Volume2 style={{ width: 14, height: 14, color: "white" }} />
              )}
            </button>
          </>
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
