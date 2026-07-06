export type VideoRegistry = Map<string, HTMLVideoElement>;

export interface VideoContextValue {
  register: (id: string, el: HTMLVideoElement) => void;
  unregister: (id: string) => void;
  notifyPlay: (id: string) => void;
}

export interface TestimonialVideoProps {
  src: string;
  title: string;
  subtitle: string;
  /** Path to a pre-made static poster image (e.g. "/cre8ifhub-poster.jpg").
   *  Strongly recommended: when provided, no hidden <video> is ever
   *  created to "peek" at a frame — the thumbnail is just a normal
   *  <img>, so nothing touches the video decoder until the person
   *  actually taps play. */
  poster?: string;
}
