import { describe, expect, it } from "vitest";

import { DISPLAY_HEADING_CLASS } from "./display-heading";

describe("DISPLAY_HEADING_CLASS", () => {
  it("includes the cinematic footer heading treatment", () => {
    expect(DISPLAY_HEADING_CLASS).toContain("footer-text-glow");
    expect(DISPLAY_HEADING_CLASS).toContain("font-display");
    expect(DISPLAY_HEADING_CLASS).toContain("text-5xl");
    expect(DISPLAY_HEADING_CLASS).toContain("font-black");
    expect(DISPLAY_HEADING_CLASS).toContain("tracking-tighter");
    expect(DISPLAY_HEADING_CLASS).toContain("md:text-8xl");
  });
});
