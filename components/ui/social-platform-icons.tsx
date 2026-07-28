/**
 * Inline social platform icons for the cinematic footer.
 * No icon library dependency — each mark is a stable SVG path set.
 */

import type { JSX } from "react";

export type SocialPlatformIconName =
  | "facebook"
  | "linkedin"
  | "email"
  | "itch"
  | "youtube"
  | "x";

export type SocialPlatformIconProps = {
  platform: SocialPlatformIconName;
  className?: string;
  /** Pixel size for width/height; defaults to 20. */
  size?: number;
};

/** Accessible labels for icon-only social links (aria-label lookup). */
export const SOCIAL_PLATFORM_LABELS: Record<SocialPlatformIconName, string> = {
  facebook: "Facebook",
  linkedin: "LinkedIn",
  email: "Email",
  itch: "itch.io",
  youtube: "YouTube",
  x: "X",
};

type IconGlyphProps = {
  className?: string;
  size: number;
};

function FacebookIcon({ className, size }: IconGlyphProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M14 13.5h2.5l.5-3H14V8.75c0-.83.17-1.25 1.34-1.25H17V5.05C16.67 5.02 15.77 5 14.86 5 12.65 5 11 6.24 11 8.6V10.5H8.5v3H11V19h3v-5.5z" />
    </svg>
  );
}

function LinkedInIcon({ className, size }: IconGlyphProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6.94 6.5A1.94 1.94 0 1 1 5 4.56 1.94 1.94 0 0 1 6.94 6.5zM5.25 8.75h3.38V19H5.25zm5.63 0h3.24v1.4h.05c.45-.85 1.55-1.75 3.19-1.75 3.41 0 4.04 2.24 4.04 5.16V19h-3.38v-4.8c0-1.14-.02-2.61-1.59-2.61-1.59 0-1.83 1.24-1.83 2.52V19h-3.38z" />
    </svg>
  );
}

function EmailIcon({ className, size }: IconGlyphProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 7 9-7" />
    </svg>
  );
}

function ItchIcon({ className, size }: IconGlyphProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3.2 2.5h17.6c.4 0 .7.3.7.7v2.1c0 .3-.2.6-.5.7l-1.9.8c-.3.1-.5.4-.5.7v.6c0 1.9-1.5 3.5-3.4 3.5H8.8C6.9 11.6 5.4 10 5.4 8.1v-.6c0-.3-.2-.6-.5-.7L3 5.9c-.3-.1-.5-.4-.5-.7V3.2c0-.4.3-.7.7-.7zm2.4 11.2h13c.5 0 .9.4.8.9l-1.1 5.6c-.1.5-.5.8-1 .8H6.9c-.5 0-.9-.3-1-.8L4.8 14.6c-.1-.5.3-.9.8-.9zm3.1 1.6c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h.1c.4 0 .7-.3.7-.7v-1.4c0-.4-.3-.7-.7-.7zm3.2 0c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7s.7-.3.7-.7v-1.4c0-.4-.3-.7-.7-.7zm3.2 0c-.4 0-.7.3-.7.7v1.4c0 .4.3.7.7.7h.1c.4 0 .7-.3.7-.7v-1.4c0-.4-.3-.7-.7-.7z" />
    </svg>
  );
}

function YouTubeIcon({ className, size }: IconGlyphProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18.1 5 12 5 12 5s-6.1 0-7.7.3a2.7 2.7 0 0 0-1.9 1.9A28 28 0 0 0 2 12a28 28 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9C5.9 19 12 19 12 19s6.1 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.8zM10 15.2V8.8L15.5 12 10 15.2z" />
    </svg>
  );
}

function XIcon({ className, size }: IconGlyphProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M18.9 3H21l-6.5 7.4L22 21h-5.6l-4.4-5.7L7 21H4.9l6.9-7.9L2.5 3H8.2l4 5.2L18.9 3zm-1 16.4h1.6L6.9 4.5H5.2l12.7 14.9z" />
    </svg>
  );
}

const PLATFORM_ICONS: Record<
  SocialPlatformIconName,
  (props: IconGlyphProps) => JSX.Element
> = {
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  email: EmailIcon,
  itch: ItchIcon,
  youtube: YouTubeIcon,
  x: XIcon,
};

export function SocialPlatformIcon({
  platform,
  className = "",
  size = 20,
}: SocialPlatformIconProps) {
  const Icon = PLATFORM_ICONS[platform];
  return <Icon className={className} size={size} />;
}
