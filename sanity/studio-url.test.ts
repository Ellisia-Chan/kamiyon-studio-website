import { afterEach, describe, expect, it, vi } from "vitest";

describe("sanity/studio-url", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("uses NEXT_PUBLIC_SANITY_STUDIO_URL when set", async () => {
    vi.stubEnv("NEXT_PUBLIC_SANITY_STUDIO_URL", "https://kamiyon.sanity.studio/");
    const { getHostedStudioUrl } = await import("./studio-url");
    expect(getHostedStudioUrl()).toBe("https://kamiyon.sanity.studio");
  });

  it("builds URL from SANITY_STUDIO_HOSTNAME", async () => {
    vi.stubEnv("SANITY_STUDIO_HOSTNAME", "kamiyon-staging");
    const { getHostedStudioUrl } = await import("./studio-url");
    expect(getHostedStudioUrl()).toBe("https://kamiyon-staging.sanity.studio");
  });

  it("defaults to kamiyon.sanity.studio", async () => {
    const { getHostedStudioUrl } = await import("./studio-url");
    expect(getHostedStudioUrl()).toBe("https://kamiyon.sanity.studio");
  });

  it("builds absolute media upload URL from API origin", async () => {
    vi.stubEnv("SANITY_STUDIO_API_ORIGIN", "https://example.workers.dev/");
    const { getMediaUploadUrl } = await import("./studio-url");
    expect(getMediaUploadUrl()).toBe(
      "https://example.workers.dev/api/media/upload",
    );
  });

  it("falls back to relative upload path when origin unset", async () => {
    const { getMediaUploadUrl } = await import("./studio-url");
    expect(getMediaUploadUrl()).toBe("/api/media/upload");
  });
});
