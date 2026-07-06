"use client";

import React, { useEffect, useRef, useState } from "react";
import { useVideoContext } from "../VideoProvider";

const SRC = "/intro.mp4";
let _vidCounter = 0;

/*
  Same fix as TestimonialVideo: a permanently mounted <video> element
  (even paused, even off-screen) keeps a hardware decode/compositing
  surface allocated. On some Android GPU drivers that surface's memory
  doesn't get cleared as you scroll, so stale frame data bleeds into
  whatever scrolls into that screen region next — the "broken TV"
  static/ghosting effect. Previously this component only paused on
  scroll-out instead of unmounting, which is what let the glitch
  survive all the way down past the testimonials/FAQ section.

  Fix: the <video> only exists in the DOM while actually playing.
  Otherwise it's a plain <img> from a canvas-captured poster frame.
  Playing, pausing, ending, or scrolling out of view all fully
  UNMOUNT the <video> so its decode surface is torn down completely.
*/
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<string>(`vid-${++_vidCounter}`);
  const [playing, setPlaying] = useState(false);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [thumbReady, setThumbReady] = useState(false);
  const ctx = useVideoContext();

  /* Capture one poster frame off-DOM, then discard the loader video
     entirely. This is the only time a decoder touches this clip
     before the person actually taps play. */
  useEffect(() => {
    let cancelled = false;
    const loader = document.createElement("video");
    loader.src = SRC;
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
  }, []);

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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [playing]);

  const handlePlay = () => {
    if (!thumbReady) return;
    ctx?.notifyPlay(idRef.current);
    setPlaying(true);
  };

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
        onClick={playing ? undefined : handlePlay}
        style={{
          borderRadius: 18,
          overflow: "hidden",
          background: "#0d0d0d",
          aspectRatio: "9/16",
          position: "relative",
          cursor: !playing && thumbReady ? "pointer" : "default",
        }}
      >
        {playing ? (
          <video
            ref={videoRef}
            src={SRC}
            autoPlay
            controls
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
            alt="Intro video preview"
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
              background: "#0d0d0d",
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
                width: 60,
                height: 60,
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
                style={{ width: 26, height: 26, fill: "white", transform: "translateX(2px)" }}
                aria-label="Play intro video"
              >
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
