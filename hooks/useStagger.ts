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
  MOTION_STAGGER,
} from "@/lib/motion/constants";
import type { MotionElementRef, StaggerOptions } from "@/lib/motion/types";

import { useGsapContext } from "./useGsapContext";

const defaults: Required<
  Pick<
    StaggerOptions,
    | "delay"
    | "duration"
    | "stagger"
    | "y"
    | "from"
    | "once"
    | "disabled"
    | "childSelector"
  >
> = {
  delay: 0,
  duration: MOTION_DURATION.base,
  stagger: MOTION_STAGGER.base,
  y: MOTION_DISTANCE.staggerY,
  from: "start",
  once: true,
  disabled: false,
  childSelector: ":scope > *",
};

export function useStagger<T extends HTMLElement = HTMLElement>(
  options: StaggerOptions = {},
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

      const children = el.querySelectorAll(merged.childSelector);
      if (children.length === 0) {
        return;
      }

      const mm = gsap.matchMedia();
      const trigger = merged.trigger ?? el;

      mm.add(GSAP_REDUCE_MOTION, () => {
        gsap.set(children, { autoAlpha: 1, y: 0 });
      });

      mm.add(GSAP_ALLOW_MOTION, () => {
        gsap.fromTo(
          children,
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
            stagger: { each: merged.stagger, from: merged.from },
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
      merged.stagger,
      merged.y,
      merged.from,
      merged.once,
      merged.disabled,
      merged.start,
      merged.trigger,
      merged.childSelector,
    ],
  );

  return ref;
}
