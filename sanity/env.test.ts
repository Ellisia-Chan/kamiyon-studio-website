import { afterEach, describe, expect, it, vi } from "vitest";

describe("isSanityConfigured", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("returns true with repo defaults when env is empty", async () => {
    vi.stubEnv("SANITY_STUDIO_PROJECT_ID", "");
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "");
    vi.stubEnv("SANITY_STUDIO_DATASET", "");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "");

    const { isSanityConfigured, projectId, dataset } = await import("./env");
    expect(isSanityConfigured()).toBe(true);
    expect(projectId).toBe("c6ej1xoj");
    expect(dataset).toBe("kamiyon");
  });

  it("prefers SANITY_STUDIO_ vars over NEXT_PUBLIC_", async () => {
    vi.stubEnv("SANITY_STUDIO_PROJECT_ID", "studio-id");
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "next-id");
    vi.stubEnv("SANITY_STUDIO_DATASET", "studio-ds");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "next-ds");

    const { projectId, dataset, isSanityConfigured } = await import("./env");
    expect(projectId).toBe("studio-id");
    expect(dataset).toBe("studio-ds");
    expect(isSanityConfigured()).toBe(true);
  });

  it("falls back to NEXT_PUBLIC_ when SANITY_STUDIO_ is empty", async () => {
    vi.stubEnv("SANITY_STUDIO_PROJECT_ID", "");
    vi.stubEnv("NEXT_PUBLIC_SANITY_PROJECT_ID", "abc123");
    vi.stubEnv("SANITY_STUDIO_DATASET", "");
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", "production");

    const { projectId, dataset } = await import("./env");
    expect(projectId).toBe("abc123");
    expect(dataset).toBe("production");
  });
});

describe("dataset default", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("defaults dataset to kamiyon when unset", async () => {
    vi.stubEnv("SANITY_STUDIO_DATASET", undefined);
    vi.stubEnv("NEXT_PUBLIC_SANITY_DATASET", undefined);

    const { dataset } = await import("./env");
    expect(dataset).toBe("kamiyon");
  });
});
