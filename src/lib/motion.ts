export const EASE_CINEMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];
export const EASE_SOFT: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

export const motionTokens = {
  duration: {
    micro: 0.16,
    fast: 0.28,
    base: 0.52,
    slow: 0.82,
    cinematic: 1.15,
  },
  stagger: {
    tight: 0.055,
    base: 0.09,
    wide: 0.14,
  },
  distance: {
    xs: 8,
    sm: 16,
    md: 28,
    lg: 48,
  },
  viewport: {
    once: true,
    amount: 0.22,
  },
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: motionTokens.distance.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.duration.slow, ease: EASE_CINEMATIC },
  },
};

export const fade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: motionTokens.duration.base, ease: EASE_SOFT },
  },
};

export const staggerParent = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motionTokens.stagger.base,
      delayChildren: 0.06,
    },
  },
};
