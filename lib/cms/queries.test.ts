import { afterEach, describe, expect, it, vi } from "vitest";

const safeFetchMock = vi.fn();

vi.mock("./fetch", () => ({
  safeSanityFetch: (...args: unknown[]) => safeFetchMock(...args),
}));

describe("CMS query functions (Sanity + fallbacks)", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("returns null for every getter when Sanity yields nothing", async () => {
    safeFetchMock.mockResolvedValue(null);
    const queries = await import("./queries");

    await expect(queries.getSiteSettings()).resolves.toBeNull();
    await expect(queries.getHomePage()).resolves.toBeNull();
    await expect(queries.getAboutPage()).resolves.toBeNull();
    await expect(queries.getTeamMembers()).resolves.toBeNull();
    await expect(queries.getServiceCategories()).resolves.toBeNull();
    await expect(queries.getServices()).resolves.toBeNull();
    await expect(queries.getServiceBySlug("x")).resolves.toBeNull();
    await expect(queries.getProducts()).resolves.toBeNull();
    await expect(queries.getProductBySlug("x")).resolves.toBeNull();
    await expect(queries.getCaseStudies()).resolves.toBeNull();
    await expect(queries.getCaseStudyBySlug("x")).resolves.toBeNull();
    await expect(queries.getCommunityItems()).resolves.toBeNull();
    await expect(queries.getPartners()).resolves.toBeNull();
    await expect(queries.getContactPage()).resolves.toBeNull();
    await expect(queries.getPosts()).resolves.toBeNull();
    await expect(queries.getPostBySlug("x")).resolves.toBeNull();
  });

  it("maps configured Sanity documents through getters", async () => {
    safeFetchMock.mockImplementation(async (query: string) => {
      if (query.includes('_type == "siteSettings"')) {
        return {
          siteName: "Kamiyon Studio",
          tagline: "Create. Play. Inspire.",
          socialLinks: [],
          defaultSeo: { title: "Kamiyon", description: "Studio" },
          globalCtas: [],
        };
      }
      if (query.includes('_type == "service" && slug.current')) {
        return {
          title: "Game Development",
          slug: { current: "game-development" },
          categorySlug: "games",
          summary: "Summary",
          body: [],
          outcomes: [],
          relatedIndustries: [],
          order: 1,
          isPlaceholder: true,
          seo: { title: "Game Development", description: "Summary" },
        };
      }
      if (query.includes('_type == "teamMember"')) {
        return [{ name: "Ada", role: "Founder", bio: "Bio", order: 1, isPlaceholder: false }];
      }
      if (query.includes('_type == "partner"')) {
        return [
          {
            _id: "partner-1",
            label: "Partner placeholder",
            slug: { current: "partner-1" },
            order: 1,
            isPlaceholder: true,
          },
        ];
      }
      return null;
    });

    const queries = await import("./queries");

    await expect(queries.getSiteSettings()).resolves.toMatchObject({
      siteName: "Kamiyon Studio",
    });
    await expect(queries.getServiceBySlug("game-development")).resolves.toMatchObject({
      slug: { current: "game-development" },
      categorySlug: "games",
    });
    await expect(queries.getTeamMembers()).resolves.toEqual([
      expect.objectContaining({ name: "Ada", role: "Founder" }),
    ]);
    await expect(queries.getPartners()).resolves.toEqual([
      expect.objectContaining({
        id: "partner-1",
        label: "Partner placeholder",
        slug: { current: "partner-1" },
      }),
    ]);
  });
});
