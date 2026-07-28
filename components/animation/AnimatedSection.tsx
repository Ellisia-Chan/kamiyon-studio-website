"use client";

import type { ReactNode, RefObject } from "react";

import { useFadeIn } from "@/hooks/useFadeIn";
import { MOTION_DISTANCE, MOTION_DURATION } from "@/lib/motion/constants";

type AnimatedSectionTag = "section" | "div" | "article" | "header" | "footer";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: AnimatedSectionTag;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  disabled?: boolean;
};

export function AnimatedSection({
  children,
  className = "",
  id,
  as: Tag = "section",
  delay = 0,
  duration = MOTION_DURATION.base,
  distance = MOTION_DISTANCE.fadeY,
  once = true,
  disabled = false,
}: AnimatedSectionProps) {
  const ref = useFadeIn<HTMLElement>({
    delay,
    duration,
    y: distance,
    once,
    disabled,
  });

  return (
    <Tag ref={ref as RefObject<HTMLDivElement | null>} id={id} className={className}>
      {children}
    </Tag>
  );
}
