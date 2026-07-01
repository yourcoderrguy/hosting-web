"use client";

import React, { useEffect, useRef, useState } from "react";
import { Pause, Star, Volume2, VolumeX } from "lucide-react";
import { useVideoContext } from "../VideoProvider";
import type { TestimonialVideoProps } from "../../types/video";

let _vidCounter = 0;

/*
  Root cause of the Android Chrome "broken TV" glitch: a permanently
  mounted <video> element (even paused, even hidden behind a poster
  overlay) keeps a hardware decode/compositing surface allocated. On
  some Android GPU drivers that surface's memory doesn't get cleared
  when the page scrolls, so stale frame data bleeds into whatever
  scrolls into that screen region next — the doubled "ghost text" and
  static/scan-line artifacts you're seeing.

  Fix: the <video> element only exists in the DOM while a clip is
  actually playing. Everything else (thumbnail state) is a plain
  <img> built from a canvas-captured frame. Playing, pausing, ending,
  or scrolling out of view all fully UNMOUNT the <video>, so its
  surface is torn down completely instead of being reused.
*/
export default function TestimonialVideo({ src, title, subtitle }: TestimonialVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<string>(`vid-${++_vidCounter}`);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [thumbReady, setThumbReady] = useState(false);
  const ctx = useVideoContext();

  /* Capture one poster frame off-DOM, then discard the loader video
     entirely. This is the only time a decoder touches this clip
     before the person actually taps play. */
  useEffect(() => {
    let cancelled = false;
    const loader = document.createElement("video");
    loader.src = src;
    loader.preload = "metadata";
    loader.muted = true;
    loader.playsInline = true;

    const capture = () => {
      if (cancelled) return;
      try {
        const canvas = document.createElement("canvas");
        canvas.width = loader.videoWidth || 360;
        canvas.height = loader.videoHeight || 640;
        const c2d = canvas.getContext("2d");
        c2d?.drawImage(loader, 0, 0, canvas.width, canvas.height);
        setPosterUrl(canvas.toDataURL("image/jpeg", 0.72));
      } catch (_) {
        // Ignore — falls back to a plain dark card with the play button.
      }
      setThumbReady(true);
      loader.src = "";
      loader.load();
    };

    const onLoaded = () => {
      try {
        loader.currentTime = 0.5;
      } catch (_) {
        capture();
      }
    };

    const fallback = setTimeout(() => !cancelled && setThumbReady(true), 1200);

    loader.addEventListener("loadeddata", onLoaded);
    loader.addEventListener("seeked", capture);
    loader.load();

    return () => {
      cancelled = true;
      clearTimeout(fallback);
      loader.removeEventListener("loadeddata", onLoaded);
      loader.removeEventListener("seeked", capture);
      loader.src = "";
    };
  }, [src]);

  /* Register with the shared "only one video plays at a time" context
     only while this card's <video> actually exists in the DOM. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !ctx || !playing) return;
    ctx.register(idRef.current, v);
    return () => ctx.unregister(idRef.current);
  }, [ctx, playing]);

  /* Fully unmount (not just pause) once scrolled out of view. */
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !playing) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) setPlaying(false);
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [playing]);

  const handlePlay = () => {
    if (!thumbReady) return;
    ctx?.notifyPlay(idRef.current);
    setPlaying(true);
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMuted((m) => !m);
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
        onClick={playing ? undefined : handlePlay}
        style={{
          width: "100%",
          borderRadius: 12,
          overflow: "hidden",
          position: "relative",
          background: "#000",
          aspectRatio: "9/16",
          cursor: !playing && thumbReady ? "pointer" : "default",
        }}
      >
        {playing ? (
          <video
            ref={videoRef}
            src={src}
            autoPlay
            muted={muted}
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />
        ) : posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : null}

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

        {playing && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPlaying(false);
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
