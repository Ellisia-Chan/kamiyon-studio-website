/**
 * Pure blog seed builders: locked constants → Sanity createOrReplace docs.
 * No network; no media fields. Ordered for WS8d upsert.
 *
 * Owns blog documents only (WS8c). Core builders stay in buildCoreSeedDocuments().
 */

import { arrayKey, toReference, toSlug } from "../helpers";
import {
  BLOG_SEED_IDS,
  blogAuthorSeed,
  blogCategorySeed,
  blogPostSeed,
  blogTagSeeds,
} from "../seed-data.blog";
import type { SanityPortableBlock, SeedDocument } from "../types";

function paragraphBlock(index: number, text: string): SanityPortableBlock {
  return {
    _type: "block",
    _key: arrayKey("post-coming-soon-p", index),
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: arrayKey(`post-coming-soon-p-${index}-span`, 0),
        text,
        marks: [],
      },
    ],
  };
}

export function buildBlogAuthorDocument(): SeedDocument {
  return {
    _id: BLOG_SEED_IDS.author,
    _type: "author",
    name: blogAuthorSeed.name,
    slug: toSlug(blogAuthorSeed.slug),
    bio: blogAuthorSeed.bio,
  };
}

export function buildBlogCategoryDocument(): SeedDocument {
  return {
    _id: BLOG_SEED_IDS.category,
    _type: "category",
    title: blogCategorySeed.title,
    slug: toSlug(blogCategorySeed.slug),
  };
}

export function buildBlogTagDocuments(): SeedDocument[] {
  return blogTagSeeds.map((tag) => ({
    _id: tag.id,
    _type: "tag",
    title: tag.title,
    slug: toSlug(tag.slug),
  }));
}

export function buildBlogPostDocument(): SeedDocument {
  const body = blogPostSeed.bodyParagraphs.map((text, index) =>
    paragraphBlock(index, text),
  );

  return {
    _id: BLOG_SEED_IDS.post,
    _type: "post",
    title: blogPostSeed.title,
    slug: toSlug(blogPostSeed.slug),
    authors: [toReference(BLOG_SEED_IDS.author, "author-kamiyon-studio")],
    categories: [toReference(BLOG_SEED_IDS.category, "category-updates")],
    tags: [
      toReference(BLOG_SEED_IDS.tagComingSoon, "tag-coming-soon"),
      toReference(BLOG_SEED_IDS.tagAnnouncement, "tag-announcement"),
    ],
    body,
    seo: {
      title: blogPostSeed.seo.title,
      description: blogPostSeed.seo.description,
      noIndex: blogPostSeed.seo.noIndex,
    },
    readingTimeMinutes: blogPostSeed.readingTimeMinutes,
    publishedAt: blogPostSeed.publishedAt,
  };
}

/**
 * Ordered blog upsert list for WS8d:
 * author → category → tags → post (post refs require prior docs).
 */
export function buildBlogSeedDocuments(): SeedDocument[] {
  return [
    buildBlogAuthorDocument(),
    buildBlogCategoryDocument(),
    ...buildBlogTagDocuments(),
    buildBlogPostDocument(),
  ];
}

/** Stable `_id` list for dry-run / CLI logging (WS8d). */
export function listBlogSeedDocumentIds(): string[] {
  return buildBlogSeedDocuments().map((doc) => doc._id);
}
