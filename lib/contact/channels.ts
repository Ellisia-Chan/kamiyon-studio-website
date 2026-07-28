import type { ContactChannel, SocialLink } from "@/lib/cms/types";

/** Operator-provided 2026-07-10 — not yet mirrored in canon docs. */
export const PUBLIC_EMAIL = "kamiyonstudio@gmail.com";

/**
 * Interim primary contact CTA (ADR-010) until T8 Resend in-app form.
 * Linked button only — not an embed.
 */
export const INTERIM_CONTACT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeIefAWJu5FP9pwljLFz1wSUxU2ybR3--GdylUYUBsGHH0yaw/viewform";

/** Operator-provided Facebook page. */
export const FACEBOOK_PAGE_URL = "https://www.facebook.com/kamiyonstudio";

/**
 * Public LinkedIn company page derived from operator company ID `105066188`.
 * Operator supplied the admin dashboard URL; visitors need the public company path.
 */
export const LINKEDIN_COMPANY_URL =
  "https://www.linkedin.com/company/105066188/";

/** Operator-provided itch.io studio page. */
export const ITCH_URL = "https://kamiyon-studio.itch.io/";

/** Operator-provided YouTube channel. */
export const YOUTUBE_URL = "https://youtube.com/@kamiyonstudio";

/** Operator-provided X (Twitter) profile. */
export const X_URL = "https://x.com/kamiyonstudio";

export const contactChannels: ContactChannel[] = [
  {
    type: "facebook",
    label: "Facebook",
    value: FACEBOOK_PAGE_URL,
    isPlaceholder: false,
  },
  {
    type: "linkedin",
    label: "LinkedIn",
    value: LINKEDIN_COMPANY_URL,
    isPlaceholder: false,
  },
  {
    type: "itch",
    label: "itch.io",
    value: ITCH_URL,
    isPlaceholder: false,
  },
  {
    type: "youtube",
    label: "YouTube",
    value: YOUTUBE_URL,
    isPlaceholder: false,
  },
  {
    type: "x",
    label: "X",
    value: X_URL,
    isPlaceholder: false,
  },
  {
    type: "email",
    label: "Email",
    value: PUBLIC_EMAIL,
    isPlaceholder: false,
  },
];

export const socialLinks: SocialLink[] = [
  {
    platform: "facebook",
    url: FACEBOOK_PAGE_URL,
    label: "Facebook",
    isPlaceholder: false,
  },
  {
    platform: "linkedin",
    url: LINKEDIN_COMPANY_URL,
    label: "LinkedIn",
    isPlaceholder: false,
  },
  {
    platform: "itch",
    url: ITCH_URL,
    label: "itch.io",
    isPlaceholder: false,
  },
  {
    platform: "youtube",
    url: YOUTUBE_URL,
    label: "YouTube",
    isPlaceholder: false,
  },
  {
    platform: "x",
    url: X_URL,
    label: "X",
    isPlaceholder: false,
  },
  {
    platform: "email",
    url: `mailto:${PUBLIC_EMAIL}`,
    label: "Email",
    isPlaceholder: false,
  },
];
