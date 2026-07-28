import type { RefObject } from "react";

export type MotionElementRef = RefObject<HTMLElement | null>;

type BaseMotionOptions = {
  delay?: number;
  duration?: number;
  disabled?: boolean;
  /** When true, play once then kill the ScrollTrigger (animation keeps end state). */
  once?: boolean;
  /** ScrollTrigger start position; defaults to shared constant. */
  start?: string;
  /** Explicit trigger element; defaults to the animated element. */
  trigger?: Element | string | null;
};

export type FadeInOptions = BaseMotionOptions & {
  y?: number;
};

export type RevealDirection = "up" | "down" | "left" | "right";

export type RevealOptions = BaseMotionOptions & {
  direction?: RevealDirection;
};

export type StaggerOptions = BaseMotionOptions & {
  stagger?: number;
  y?: number;
  from?: "start" | "center" | "end" | "edges" | "random" | number;
  /** Child selector within the scope; defaults to direct children. */
  childSelector?: string;
};

export type ParallaxOptions = {
  speed?: number;
  disabled?: boolean;
  trigger?: Element | string | null;
  /** Scrub smoothness; `true` = immediate, number = lag in seconds. */
  scrub?: boolean | number;
};

export type HeroAnimationOptions = {
  autoplay?: boolean;
  disabled?: boolean;
  brandSelector?: string;
  headlineSelector?: string;
  ctaSelector?: string;
};
