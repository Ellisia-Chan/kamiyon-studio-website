"use client";

import Image, { type ImageProps } from "next/image";
import type { ReactNode } from "react";

import { useReveal } from "@/hooks/useReveal";
import { MOTION_DURATION } from "@/lib/motion/constants";

type AnimatedImageBaseProps = {
  className?: string;
  wrapperClassName?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  disabled?: boolean;
};

type AnimatedImageWithChild = AnimatedImageBaseProps & {
  children: ReactNode;
};

type AnimatedImageWithSrc = AnimatedImageBaseProps &
  Omit<ImageProps, "className"> & {
    children?: undefined;
  };

type AnimatedImageProps = AnimatedImageWithChild | AnimatedImageWithSrc;

/**
 * Reveal + fade wrapper. Pass next/image props directly, or a custom child
 * via `children`.
 */
export function AnimatedImage(props: AnimatedImageProps) {
  const {
    className = "",
    wrapperClassName = "",
    delay = 0,
    duration = MOTION_DURATION.slow,
    once = true,
    disabled = false,
    children,
    ...rest
  } = props;

  const ref = useReveal<HTMLDivElement>({
    delay,
    duration,
    direction: "up",
    once,
    disabled,
  });

  return (
    <div ref={ref} className={`overflow-hidden ${wrapperClassName}`.trim()}>
      {children ?? (
        <Image
          className={`will-change-transform ${className}`.trim()}
          {...(rest as ImageProps)}
        />
      )}
    </div>
  );
}
