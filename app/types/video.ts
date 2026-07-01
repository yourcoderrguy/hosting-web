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
}
