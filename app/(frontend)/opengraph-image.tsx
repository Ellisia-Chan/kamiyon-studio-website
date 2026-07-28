import { ogImageContentType, ogImageSize, renderDefaultOgImage } from "@/lib/seo/og-image";

/**
 * Node runtime (not edge): OpenNext Cloudflare cannot bundle edge metadata
 * image routes separately; webpack loads next/og `*.ttf.bin` via next.config.
 */
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function OpengraphImage() {
  return renderDefaultOgImage();
}
