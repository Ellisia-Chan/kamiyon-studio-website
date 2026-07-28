import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo/metadata";

import { MotionLabClient } from "./MotionLabClient";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: "Motion Lab",
    description:
      "Developer demo of Kamiyon Studio's GSAP and ScrollTrigger animation architecture.",
    path: "/motion-lab",
    noIndex: true,
  });
}

export default function MotionLabPage() {
  return <MotionLabClient />;
}
