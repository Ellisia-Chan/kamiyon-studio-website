import { describe, expect, it } from "vitest";

import { BLOG_SEED_IDS, BLOG_SEED_PUBLISHED_AT, blogAuthorSeed } from "../seed-data.blog";
import type { SanityReference } from "../types";
import {
  buildBlogAuthorDocument,
  buildBlogCategoryDocument,
  buildBlogPostDocument,
  buildBlogSeedDocuments,
  buildBlogTagDocuments,
  listBlogSeedDocumentIds,
} from "./blog";

function refsOf(field: unknown): SanityReference[] {
  if (!Array.isArray(field)) {
    return [];
  }
  return field.filter(
    (item): item is SanityReference =>
      typeof item === "object" &&
      item !== null &&
      (item as SanityReference)._type === "reference" &&
      typeof (item as SanityReference)._ref === "string",
  );
}

describe("WS8c blog seed builders", () => {
  it("builds author with stable id and tagline bio", () => {
    const doc = buildBlogAuthorDocument();
    expect(doc).toMatchObject({
      _id: BLOG_SEED_IDS.author,
      _type: "author",
      name: "Kamiyon Studio",
      slug: { _type: "slug", current: "kamiyon-studio" },
      bio: blogAuthorSeed.bio,
    });
  });

  it("builds category with stable id", () => {
    expect(buildBlogCategoryDocument()).toMatchObject({
      _id: BLOG_SEED_IDS.category,
      _type: "category",
      title: "Updates",
      slug: { _type: "slug", current: "updates" },
    });
  });

  it("builds tags with stable ids", () => {
    const tags = buildBlogTagDocuments();
    expect(tags).toHaveLength(2);
    expect(tags.map((tag) => tag._id)).toEqual([
      BLOG_SEED_IDS.tagComingSoon,
      BLOG_SEED_IDS.tagAnnouncement,
    ]);
    expect(tags[0]).toMatchObject({
      _type: "tag",
      title: "Coming soon",
      slug: { current: "coming-soon" },
    });
    expect(tags[1]).toMatchObject({
      _type: "tag",
      title: "Announcement",
      slug: { current: "announcement" },
    });
  });

  it("builds post with required refs, body, seo, and publishedAt", () => {
    const post = buildBlogPostDocument();

    expect(post._id).toBe(BLOG_SEED_IDS.post);
    expect(post._type).toBe("post");
    expect(post).toMatchObject({
      title: "Coming Soon",
      slug: { _type: "slug", current: "coming-soon" },
      publishedAt: BLOG_SEED_PUBLISHED_AT,
      readingTimeMinutes: 1,
      seo: {
        title: "Coming Soon | Kamiyon Studio Blog",
        noIndex: false,
      },
    });

    expect(refsOf(post.authors).map((ref) => ref._ref)).toEqual([BLOG_SEED_IDS.author]);
    expect(refsOf(post.categories).map((ref) => ref._ref)).toEqual([BLOG_SEED_IDS.category]);
    expect(refsOf(post.tags).map((ref) => ref._ref)).toEqual([
      BLOG_SEED_IDS.tagComingSoon,
      BLOG_SEED_IDS.tagAnnouncement,
    ]);

    expect(Array.isArray(post.body)).toBe(true);
    expect((post.body as unknown[]).length).toBeGreaterThanOrEqual(1);
    expect(post.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _type: "block",
          style: "normal",
          children: expect.arrayContaining([
            expect.objectContaining({
              _type: "span",
              text: expect.stringMatching(/launching soon/i),
            }),
          ]),
        }),
      ]),
    );

    // Schema requires authors min 1; featuredImage intentionally omitted (no media).
    expect(post).not.toHaveProperty("featuredImage");
  });

  it("returns ordered seed docs with every locked id exactly once", () => {
    const docs = buildBlogSeedDocuments();
    const ids = docs.map((doc) => doc._id);

    expect(ids).toEqual([
      BLOG_SEED_IDS.author,
      BLOG_SEED_IDS.category,
      BLOG_SEED_IDS.tagComingSoon,
      BLOG_SEED_IDS.tagAnnouncement,
      BLOG_SEED_IDS.post,
    ]);
    expect(new Set(ids).size).toBe(ids.length);
    expect(listBlogSeedDocumentIds()).toEqual(ids);
  });
});
