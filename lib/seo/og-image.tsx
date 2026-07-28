import { ImageResponse } from "next/og";
import { SITE_MOTTO, SITE_NAME } from "./constants";

/**
 * Shared renderer for app/opengraph-image.tsx and app/twitter-image.tsx.
 * next/og's Satori renderer cannot read CSS custom properties from
 * globals.css, so the brand hex values below are hardcoded — they are
 * the same confirmed --color-sakura / --color-charcoal / --color-ivory
 * values defined there, not new/invented colors.
 */
export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function renderDefaultOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#201013",
          color: "#f8f8f8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* Plain "K" monogram, not the ✿ glyph used elsewhere in the UI —
              Satori (next/og's renderer) has no local coverage for that
              character and fails to fetch a fallback font in sandboxed
              build environments. */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 100,
              height: 100,
              borderRadius: "50%",
              backgroundColor: "#ff7998",
              color: "#201013",
              fontSize: 56,
              fontWeight: 700,
            }}
          >
            K
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -1 }}>
            {SITE_NAME}
          </div>
        </div>
        <div style={{ marginTop: 28, fontSize: 32, fontWeight: 600, color: "#ff7998" }}>
          {SITE_MOTTO}
        </div>
      </div>
    ),
    ogImageSize
  );
}
