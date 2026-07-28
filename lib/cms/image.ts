import { getMediaUrl } from "./media";
import type { CmsImage } from "./types";

/** Hosts allowed by `next.config.ts` `images.remotePatterns` (keep in sync). */
const NEXT_IMAGE_REMOTE_HOSTS = new Set([
  "media.kamiyonstudio.com",
  "media-staging.kamiyonstudio.com",
]);

/** True when `src` is safe for `next/image` (local path or allowlisted CDN). */
export function isAllowedNextImageSrc(src: string): boolean {
  const trimmed = src.trim();
  if (!trimmed) {
    return false;
  }

  // Local public assets (also covered by images.localPatterns).
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return true;
  }

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" && NEXT_IMAGE_REMOTE_HOSTS.has(parsed.hostname);
  } catch {
    return false;
  }
}

/**
 * Resolves a CMS image reference to a URL safe for `next/image`, or null when
 * unavailable / not on an allowlisted host (e.g. itch.io page URLs).
 */
export function getCmsImageUrl(image: CmsImage | undefined | null): string | null {
  const url = getMediaUrl(image);
  if (!url || !isAllowedNextImageSrc(url)) {
    return null;
  }
  return url;
}
