/**
 * Locked blog seed constants for Sanity content seed (WS8c).
 * Source of truth for stubs — no blog UI routes; T9 listing stays WS6.
 */

import {
  authorId,
  blogCategoryId,
  postId,
  tagId,
} from "./ids";

/** Stable document IDs (`{type}-{slug}` — hyphen; see ids.ts). */
export const BLOG_SEED_IDS = {
  author: authorId("kamiyon-studio"),
  category: blogCategoryId("updates"),
  tagComingSoon: tagId("coming-soon"),
  tagAnnouncement: tagId("announcement"),
  post: postId("coming-soon"),
} as const;

export type BlogSeedId = (typeof BLOG_SEED_IDS)[keyof typeof BLOG_SEED_IDS];

/**
 * Author bio mirrors `siteSettingsFallback.tagline`
 * (lib/cms/fallbacks/site-settings.ts) — hardcoded so seed stays scripts-only.
 */
export const BLOG_AUTHOR_BIO =
  "Kamiyon Studio creates games and interactive experiences that educate, inspire, and make a lasting impact.";

/** Fixed publish time so re-seeds stay idempotent. */
export const BLOG_SEED_PUBLISHED_AT = "2026-07-24T00:00:00.000Z";

export const blogAuthorSeed = {
  name: "Kamiyon Studio",
  slug: "kamiyon-studio",
  bio: BLOG_AUTHOR_BIO,
} as const;

export const blogCategorySeed = {
  title: "Updates",
  slug: "updates",
} as const;

export const blogTagSeeds = [
  { title: "Coming soon", slug: "coming-soon", id: BLOG_SEED_IDS.tagComingSoon },
  { title: "Announcement", slug: "announcement", id: BLOG_SEED_IDS.tagAnnouncement },
] as const;

export const blogPostSeed = {
  title: "Coming Soon",
  slug: "coming-soon",
  publishedAt: BLOG_SEED_PUBLISHED_AT,
  readingTimeMinutes: 1,
  seo: {
    title: "Coming Soon | Kamiyon Studio Blog",
    description:
      "The Kamiyon Studio blog is launching soon. Check back for studio updates, announcements, and behind-the-scenes notes.",
    noIndex: false,
  },
  /** Portable-text paragraphs (normal style) for the post body. */
  bodyParagraphs: [
    "The Kamiyon Studio blog is launching soon.",
    "We will share studio updates, product notes, and announcements here. This post is a placeholder so editors can see the full author, category, tag, SEO, and body field structure in Sanity Studio.",
    "Check back shortly — Create. Play. Inspire.",
  ],
} as const;
