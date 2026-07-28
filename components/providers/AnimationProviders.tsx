"use client";

import type { ReactNode } from "react";

import { GsapScrollProvider } from "./GsapScrollProvider";

type AnimationProvidersProps = {
  children: ReactNode;
};

/** Frontend-only animation stack (GSAP + native scroll). */
export function AnimationProviders({ children }: AnimationProvidersProps) {
  return <GsapScrollProvider>{children}</GsapScrollProvider>;
}
