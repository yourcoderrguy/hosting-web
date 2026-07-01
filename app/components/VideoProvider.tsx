"use client";

import React, { createContext, useCallback, useContext, useRef } from "react";
import type { VideoContextValue, VideoRegistry } from "../types/video";

const VideoContext = createContext<VideoContextValue | null>(null);

export function useVideoContext() {
  return useContext(VideoContext);
}

export default function VideoProvider({ children }: { children: React.ReactNode }) {
  const registry = useRef<VideoRegistry>(new Map());

  const register = useCallback((id: string, el: HTMLVideoElement) => {
    registry.current.set(id, el);
  }, []);

  const unregister = useCallback((id: string) => {
    registry.current.delete(id);
  }, []);

  const notifyPlay = useCallback((id: string) => {
    registry.current.forEach((video, vid) => {
      if (vid !== id && !video.paused) video.pause();
    });
  }, []);

  return (
    <VideoContext.Provider value={{ register, unregister, notifyPlay }}>
      {children}
    </VideoContext.Provider>
  );
}
