import { ogImageContentType, ogImageSize, renderDefaultOgImage } from "@/lib/seo/og-image";

/** Node runtime — see opengraph-image.tsx (OpenNext + next/og compatibility). */
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function TwitterImage() {
  return renderDefaultOgImage();
}
