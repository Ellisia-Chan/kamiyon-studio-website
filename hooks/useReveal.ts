"use client";

import { useRef, type RefObject } from "react";

import {
  createScrollTriggerDefaults,
  gsap,
  GSAP_ALLOW_MOTION,
  GSAP_REDUCE_MOTION,
} from "@/lib/gsap";
import {
  MOTION_DISTANCE,
  MOTION_DURATION,
  MOTION_EASE,
} from "@/lib/motion/constants";
import type {
  MotionElementRef,
  RevealDirection,
  RevealOptions,
} from "@/lib/motion/types";

import { useGsapContext } from "./useGsapContext";

const defaults: Required<
  Pick<
    RevealOptions,
    "delay" | "duration" | "direction" | "once" | "disabled"
  >
> = {
  delay: 0,
  duration: MOTION_DURATION.slow,
  direction: "up",
  once: true,
  disabled: false,
};

function offsetForDirection(direction: RevealDirection): {
  x: number;
  y: number;
} {
  const d = MOTION_DISTANCE.reveal;
  switch (direction) {
    case "down":
      return { x: 0, y: -d };
    case "left":
      return { x: d, y: 0 };
    case "right":
      return { x: -d, y: 0 };
    case "up":
    default:
      return { x: 0, y: d };
  }
}

export function useReveal<T extends HTMLElement = HTMLElement>(
  options: RevealOptions = {},
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const merged = { ...defaults, ...options };

  useGsapContext(
    ref as MotionElementRef,
    () => {
      const el = ref.current;
      if (!el || merged.disabled) {
        return;
      }

      const from = offsetForDirection(merged.direction);
      const mm = gsap.matchMedia();
      const trigger = merged.trigger ?? el;

      mm.add(GSAP_REDUCE_MOTION, () => {
        gsap.set(el, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          clipPath: "none",
        });
      });

      mm.add(GSAP_ALLOW_MOTION, () => {
        gsap.fromTo(
          el,
          {
            autoAlpha: 0,
            x: from.x,
            y: from.y,
            clipPath: "inset(8% 8% 8% 8%)",
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: merged.duration,
            delay: merged.delay,
            ease: MOTION_EASE.soft,
            scrollTrigger: createScrollTriggerDefaults({
              trigger,
              start: merged.start,
              once: merged.once,
            }),
          },
        );
      });
    },
    [
      merged.delay,
      merged.duration,
      merged.direction,
      merged.once,
      merged.disabled,
      merged.start,
      merged.trigger,
    ],
  );

  return ref;
}
