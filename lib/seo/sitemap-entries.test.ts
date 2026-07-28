import { describe, expect, it } from "vitest";

import {
  buildPublicSitemapEntries,
  isSitemapIndexable,
} from "./sitemap-entries";

describe("isSitemapIndexable", () => {
  it("returns true when seo.noIndex is absent or false", () => {
    expect(isSitemapIndexable({})).toBe(true);
    expect(isSitemapIndexable({ seo: { noIndex: false } })).toBe(true);
  });

  it("returns false when seo.noIndex is true", () => {
    expect(isSitemapIndexable({ seo: { noIndex: true } })).toBe(false);
  });
});

describe("buildPublicSitemapEntries", () => {
  const siteUrl = "https://kamiyonstudio.com";

  it("returns an empty list for non-production hosts", () => {
    expect(
      buildPublicSitemapEntries({
        siteUrl: "http://localhost:3000",
        products: [],
        services: [],
        caseStudies: [],
      })
    ).toEqual([]);
  });

  it("returns an empty list for preview even with production SITE_URL", () => {
    expect(
      buildPublicSitemapEntries({
        siteUrl: "https://kamiyonstudio.com",
        products: [{ slug: { current: "should-not-appear" }, seo: {} }],
        services: [],
        caseStudies: [],
        appEnv: "preview",
      })
    ).toEqual([]);
  });

  it("returns an empty list for development APP_ENV with production SITE_URL", () => {
    expect(
      buildPublicSitemapEntries({
        siteUrl: "https://kamiyonstudio.com",
        products: [],
        services: [],
        caseStudies: [],
        appEnv: "development",
      })
    ).toEqual([]);
  });

  it("includes static public routes including /blog and excludes /motion-lab", () => {
    const entries = buildPublicSitemapEntries({
      siteUrl,
      products: [],
      services: [],
      caseStudies: [],
      appEnv: "production",
    });
    const urls = entries.map((entry) => entry.url);

    expect(urls).toEqual(
      expect.arrayContaining([
        "https://kamiyonstudio.com",
        "https://kamiyonstudio.com/about",
        "https://kamiyonstudio.com/services",
        "https://kamiyonstudio.com/products",
        "https://kamiyonstudio.com/portfolio",
        "https://kamiyonstudio.com/community",
        "https://kamiyonstudio.com/contact",
        "https://kamiyonstudio.com/blog",
      ])
    );
    expect(urls).not.toContain("https://kamiyonstudio.com/motion-lab");
    expect(urls).not.toContain("https://kamiyonstudio.com/admin");
    expect(urls.every((url) => url.startsWith("https://kamiyonstudio.com"))).toBe(
      true
    );
  });

  it("includes entries when APP_ENV is unset and SITE_URL is canonical (local)", () => {
    const entries = buildPublicSitemapEntries({
      siteUrl,
      products: [],
      services: [],
      caseStudies: [],
    });

    expect(entries.length).toBeGreaterThan(0);
    expect(entries.map((entry) => entry.url)).toContain(
      "https://kamiyonstudio.com"
    );
  });

  it("includes dynamic CMS slugs and skips noIndex entries", () => {
    const entries = buildPublicSitemapEntries({
      siteUrl,
      products: [
        {
          slug: { current: "visible-product" },
          seo: { noIndex: false },
        },
        {
          slug: { current: "hidden-product" },
          seo: { noIndex: true },
        },
      ],
      services: [{ slug: { current: "visible-service" }, seo: {} }],
      caseStudies: [
        {
          slug: { current: "visible-case" },
          publishedAt: "2024-06-01T00:00:00.000Z",
          seo: { noIndex: false },
        },
      ],
    });
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain("https://kamiyonstudio.com/products/visible-product");
    expect(urls).toContain("https://kamiyonstudio.com/services/visible-service");
    expect(urls).toContain("https://kamiyonstudio.com/portfolio/visible-case");
    expect(urls).not.toContain(
      "https://kamiyonstudio.com/products/hidden-product"
    );

    const caseEntry = entries.find(
      (entry) => entry.url === "https://kamiyonstudio.com/portfolio/visible-case"
    );
    expect(caseEntry?.lastModified).toEqual(new Date("2024-06-01T00:00:00.000Z"));
  });

  it("omits lastModified when no CMS date is available", () => {
    const entries = buildPublicSitemapEntries({
      siteUrl,
      products: [{ slug: { current: "no-date-product" }, seo: {} }],
      services: [],
      caseStudies: [],
    });
    const productEntry = entries.find(
      (entry) =>
        entry.url === "https://kamiyonstudio.com/products/no-date-product"
    );

    expect(productEntry).toBeDefined();
    expect(productEntry).not.toHaveProperty("lastModified");
  });
});
