import { describe, expect, it } from "vitest";

import {
  mapCaseStudy,
  mapCollection,
  mapHomePage,
  mapPartner,
  mapPartnerToMarqueeItem,
  mapPost,
  mapService,
  mapSiteSettings,
} from "./mappers";

describe("mapSiteSettings", () => {
  it("returns null without a site name", () => {
    expect(mapSiteSettings({})).toBeNull();
  });

  it("maps core fields", () => {
    expect(
      mapSiteSettings({
        siteName: "Kamiyon Studio",
        tagline: "Create. Play. Inspire.",
        socialLinks: [{ platform: "email", url: "mailto:hi@example.com", label: "Email" }],
        defaultSeo: { title: "SEO", description: "Desc" },
        globalCtas: [{ label: "Contact", href: "/contact", variant: "primary" }],
      }),
    ).toMatchObject({
      _type: "siteSettings",
      siteName: "Kamiyon Studio",
      tagline: "Create. Play. Inspire.",
      socialLinks: [{ platform: "email", url: "mailto:hi@example.com", label: "Email" }],
      globalCtas: [{ label: "Contact", href: "/contact", variant: "primary" }],
    });
  });
});

describe("mapHomePage", () => {
  it("projects featured work refs into slug arrays", () => {
    const page = mapHomePage({
      title: "Home",
      blocks: [
        {
          _type: "featuredWork",
          title: "Featured",
          body: "Body",
          featuredProductSlugs: ["eclipse"],
          featuredCaseStudySlugs: ["case-a"],
        },
      ],
      seo: { title: "Home", description: "Desc" },
    });

    expect(page?.blocks[0]).toEqual({
      _type: "featuredWork",
      title: "Featured",
      body: "Body",
      featuredProductSlugs: ["eclipse"],
      featuredCaseStudySlugs: ["case-a"],
    });
  });
});

describe("mapService", () => {
  it("keeps categorySlug from GROQ projection", () => {
    expect(
      mapService({
        title: "Game Dev",
        slug: { current: "game-dev" },
        categorySlug: "games",
        summary: "Summary",
        body: [],
        outcomes: ["Ship"],
        relatedIndustries: ["Education"],
        order: 1,
        isPlaceholder: true,
        seo: { title: "Game Dev", description: "Desc" },
      }),
    ).toMatchObject({
      categorySlug: "games",
      outcomes: ["Ship"],
      relatedIndustries: ["Education"],
    });
  });
});

describe("mapCaseStudy", () => {
  it("maps r2 cover and gallery assets", () => {
    const study = mapCaseStudy({
      title: "Case",
      slug: { current: "case" },
      clientName: "Client",
      industry: "Edu",
      challenge: "C",
      solution: "S",
      impact: "I",
      coverImage: { url: "https://cdn.example.com/cover.png", alt: "Cover" },
      gallery: [{ url: "https://cdn.example.com/g1.png", alt: "G1", _key: "g1" }],
      featured: true,
      isPlaceholder: false,
      seo: { title: "Case", description: "Desc" },
    });

    expect(study?.coverImage?.url).toBe("https://cdn.example.com/cover.png");
    expect(study?.gallery).toHaveLength(1);
    expect(study?.gallery[0]?.url).toBe("https://cdn.example.com/g1.png");
  });
});

describe("mapPost", () => {
  it("requires publishedAt", () => {
    expect(mapPost({ title: "Draft", slug: { current: "draft" } })).toBeNull();
  });

  it("maps authors, related slugs, and inline images", () => {
    const post = mapPost({
      title: "Hello",
      slug: { current: "hello" },
      publishedAt: "2026-07-21T00:00:00.000Z",
      authors: [{ name: "Ada", slug: { current: "ada" } }],
      categories: [{ title: "News", slug: { current: "news" } }],
      tags: [{ title: "Launch", slug: { current: "launch" } }],
      body: [
        { _type: "block", children: [{ _type: "span", text: "Hi" }] },
        {
          _type: "inlineImage",
          _key: "img1",
          asset: { url: "https://cdn.example.com/inline.png", alt: "Inline" },
        },
      ],
      seo: { title: "Hello", description: "Desc" },
      relatedPostSlugs: ["other"],
    });

    expect(post).toMatchObject({
      _type: "post",
      authors: [{ _type: "author", name: "Ada", slug: { current: "ada" } }],
      relatedPostSlugs: ["other"],
      body: [
        { _type: "block" },
        {
          _type: "inlineImage",
          asset: { url: "https://cdn.example.com/inline.png", alt: "Inline" },
        },
      ],
    });
  });
});

describe("mapPartner", () => {
  it("returns null without a label", () => {
    expect(mapPartner({ slug: { current: "acme" }, _id: "partner-1" })).toBeNull();
  });

  it("prefers slug.current as id", () => {
    expect(
      mapPartner({
        _id: "drafts.partner-1",
        label: "Partner placeholder",
        slug: { current: "partner-1" },
        order: 1,
        isPlaceholder: true,
      }),
    ).toMatchObject({
      _type: "partner",
      id: "partner-1",
      label: "Partner placeholder",
      slug: { current: "partner-1" },
      order: 1,
      isPlaceholder: true,
    });
  });

  it("falls back to document _id when slug is missing", () => {
    expect(
      mapPartner({
        _id: "partner-doc-2",
        label: "Partner placeholder",
        order: 2,
      }),
    ).toMatchObject({
      id: "partner-doc-2",
      label: "Partner placeholder",
    });
  });

  it("maps optional logo without website links", () => {
    expect(
      mapPartner({
        _id: "p3",
        label: "Partner placeholder",
        slug: { current: "partner-3" },
        order: 3,
        logo: { url: "https://media.kamiyonstudio.com/partners/logo.png", alt: "Logo" },
        websiteUrl: "https://example.com",
        isPlaceholder: false,
      }),
    ).toMatchObject({
      logo: { url: "https://media.kamiyonstudio.com/partners/logo.png", alt: "Logo" },
      isPlaceholder: false,
    });
    expect(
      mapPartner({
        _id: "p3",
        label: "Partner placeholder",
        slug: { current: "partner-3" },
        order: 3,
        websiteUrl: "https://example.com",
      }),
    ).not.toHaveProperty("websiteUrl");
  });
});

describe("mapPartnerToMarqueeItem", () => {
  it("projects to id/label for PartnersMarquee", () => {
    expect(
      mapPartnerToMarqueeItem({
        _type: "partner",
        id: "partner-1",
        label: "Partner placeholder",
        slug: { current: "partner-1" },
        order: 1,
        isPlaceholder: true,
      }),
    ).toEqual({
      id: "partner-1",
      label: "Partner placeholder",
      logoUrl: null,
      logoAlt: "Partner placeholder",
    });
  });

  it("projects allowlisted logo URL for marquee image slots", () => {
    expect(
      mapPartnerToMarqueeItem({
        _type: "partner",
        id: "acme",
        label: "Acme",
        slug: { current: "acme" },
        order: 1,
        logo: {
          url: "https://media.kamiyonstudio.com/partners/acme.png",
          alt: "Acme logo",
        },
        isPlaceholder: false,
      }),
    ).toEqual({
      id: "acme",
      label: "Acme",
      logoUrl: "https://media.kamiyonstudio.com/partners/acme.png",
      logoAlt: "Acme logo",
    });
  });
});

describe("mapCollection", () => {
  it("returns null for empty arrays", () => {
    expect(mapCollection([], (row) => row)).toBeNull();
  });

  it("maps non-empty collections", () => {
    expect(mapCollection([{ id: 1 }], (row) => row as { id: number })).toEqual([{ id: 1 }]);
  });
});
