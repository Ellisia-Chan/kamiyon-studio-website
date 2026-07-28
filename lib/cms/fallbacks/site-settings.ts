import type { SiteSettings } from "../types";
import {
  INTERIM_CONTACT_FORM_URL,
  PUBLIC_EMAIL,
  socialLinks,
} from "@/lib/contact/channels";

// Sources: docs/company/overview.md, docs/branding/messaging.md, docs/marketing/positioning.md
// Contact URLs: operator-provided 2026-07-10 (lib/contact/channels.ts)
export const siteSettingsFallback: SiteSettings = {
  _type: "siteSettings",
  siteName: "Kamiyon Studio",
  tagline:
    "Kamiyon Studio creates games and interactive experiences that educate, inspire, and make a lasting impact.",
  publicEmail: PUBLIC_EMAIL,
  socialLinks,
  defaultSeo: {
    title: "Kamiyon Studio",
    description:
      "Kamiyon Studio is a multidisciplinary interactive experience studio that develops games, educational technologies, gamified platforms, and digital solutions that combine creativity, technology, and thoughtful design to create meaningful impact.",
  },
  globalCtas: [
    {
      label: "Explore our services",
      href: "/services",
      variant: "primary",
    },
    {
      label: "Get in touch",
      href: INTERIM_CONTACT_FORM_URL,
      variant: "secondary",
    },
  ],
  footerText: "Create. Play. Inspire.",
};
