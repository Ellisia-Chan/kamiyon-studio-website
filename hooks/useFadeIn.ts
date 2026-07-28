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
import type { FadeInOptions, MotionElementRef } from "@/lib/motion/types";

import { useGsapContext } from "./useGsapContext";

const defaults: Required<
  Pick<FadeInOptions, "delay" | "duration" | "y" | "once" | "disabled">
> = {
  delay: 0,
  duration: MOTION_DURATION.base,
  y: MOTION_DISTANCE.fadeY,
  once: true,
  disabled: false,
};

/** Soft fade-up on enter-viewport. */
export function useFadeIn<T extends HTMLElement = HTMLElement>(
  options: FadeInOptions = {},
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

      const mm = gsap.matchMedia();
      const trigger = merged.trigger ?? el;

      mm.add(GSAP_REDUCE_MOTION, () => {
        gsap.set(el, { autoAlpha: 1, y: 0 });
      });

      mm.add(GSAP_ALLOW_MOTION, () => {
        // immediateRender (default true): apply from-state when the tween is
        // created so below-fold content stays hidden until ScrollTrigger plays.
        gsap.fromTo(
          el,
          {
            autoAlpha: 0,
            y: merged.y,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: merged.duration,
            delay: merged.delay,
            ease: MOTION_EASE.out,
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
      merged.y,
      merged.once,
      merged.disabled,
      merged.start,
      merged.trigger,
    ],
  );

  return ref;
}
