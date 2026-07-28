import { afterEach, describe, expect, it, vi } from "vitest";

describe("SITE_URL", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("falls back to localhost when NEXT_PUBLIC_SITE_URL is unset", async () => {
    const { SITE_URL } = await import("./site-url");

    expect(SITE_URL).toBe("http://localhost:3000");
  });

  it("uses NEXT_PUBLIC_SITE_URL when configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://kamiyonstudio.com");
    vi.resetModules();

    const { SITE_URL } = await import("./site-url");

    expect(SITE_URL).toBe("https://kamiyonstudio.com");
  });

  it("strips a trailing slash from NEXT_PUBLIC_SITE_URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://kamiyonstudio.com/");
    vi.resetModules();

    const { SITE_URL } = await import("./site-url");

    expect(SITE_URL).toBe("https://kamiyonstudio.com");
  });

  it("falls back to localhost when NEXT_PUBLIC_SITE_URL is empty", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.resetModules();

    const { SITE_URL } = await import("./site-url");

    expect(SITE_URL).toBe("http://localhost:3000");
  });
});

describe("isProductionCanonicalSiteUrl", () => {
  afterEach(() => {
    vi.resetModules();
  });

  it("accepts only https://kamiyonstudio.com", async () => {
    const { isProductionCanonicalSiteUrl } = await import("./site-url");

    expect(isProductionCanonicalSiteUrl("https://kamiyonstudio.com")).toBe(true);
    expect(isProductionCanonicalSiteUrl("https://kamiyonstudio.com/")).toBe(true);
  });

  it("rejects localhost, preview hosts, http, and www", async () => {
    const { isProductionCanonicalSiteUrl } = await import("./site-url");

    expect(isProductionCanonicalSiteUrl("http://localhost:3000")).toBe(false);
    expect(
      isProductionCanonicalSiteUrl(
        "https://kamiyon-studio-website-git-frontend.vercel.app"
      )
    ).toBe(false);
    expect(isProductionCanonicalSiteUrl("http://kamiyonstudio.com")).toBe(false);
    expect(isProductionCanonicalSiteUrl("https://www.kamiyonstudio.com")).toBe(
      false
    );
    expect(isProductionCanonicalSiteUrl("https://kamiyon.studio")).toBe(false);
    expect(isProductionCanonicalSiteUrl("not-a-url")).toBe(false);
  });
});

describe("isCrawlableProduction", () => {
  afterEach(() => {
    vi.resetModules();
  });

  it("allows production APP_ENV with canonical SITE_URL", async () => {
    const { isCrawlableProduction } = await import("./site-url");

    expect(
      isCrawlableProduction("https://kamiyonstudio.com", "production")
    ).toBe(true);
  });

  it("allows local (unset APP_ENV) with canonical SITE_URL", async () => {
    const { isCrawlableProduction } = await import("./site-url");

    expect(isCrawlableProduction("https://kamiyonstudio.com")).toBe(true);
    expect(isCrawlableProduction("https://kamiyonstudio.com", undefined)).toBe(
      true
    );
    expect(isCrawlableProduction("https://kamiyonstudio.com", "")).toBe(true);
  });

  it("rejects preview/development even with canonical SITE_URL", async () => {
    const { isCrawlableProduction } = await import("./site-url");

    expect(
      isCrawlableProduction("https://kamiyonstudio.com", "preview")
    ).toBe(false);
    expect(
      isCrawlableProduction("https://kamiyonstudio.com", "development")
    ).toBe(false);
    expect(
      isCrawlableProduction("https://kamiyonstudio.com", "staging")
    ).toBe(false);
  });

  it("rejects non-canonical SITE_URL regardless of APP_ENV", async () => {
    const { isCrawlableProduction } = await import("./site-url");

    expect(isCrawlableProduction("http://localhost:3000", "production")).toBe(
      false
    );
    expect(
      isCrawlableProduction(
        "https://kamiyon-studio-website-git-frontend.vercel.app",
        "production"
      )
    ).toBe(false);
  });
});
