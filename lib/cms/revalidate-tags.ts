/**
 * Maps Sanity document `_type` values to Next.js cache tags used by
 * `lib/cms/queries.ts` (`safeSanityFetch` / `next.tags`).
 */

/** Types that also use slug-scoped tags (`type:slug`) in queries. */
const SLUG_SCOPED_TYPES = new Set(["service", "product", "caseStudy", "post"]);

/**
 * Base tags per Sanity `_type` (excluding the shared `sanity` tag).
 * Blog support docs (`author` / `category` / `tag`) invalidate the `post` tag
 * because post projections embed those references.
 */
const TYPE_TAGS: Record<string, readonly string[]> = {
  siteSettings: ["siteSettings"],
  homePage: ["homePage"],
  aboutPage: ["aboutPage"],
  contactPage: ["contactPage"],
  teamMember: ["teamMember"],
  serviceCategory: ["serviceCategory"],
  service: ["service"],
  product: ["product"],
  caseStudy: ["caseStudy"],
  communityItem: ["communityItem"],
  partner: ["partner"],
  post: ["post"],
  author: ["post"],
  category: ["post"],
  tag: ["post"],
};

export type SanityRevalidatePayload = {
  _type?: unknown;
  slug?: unknown;
};

/** Extract a slug string from Sanity webhook / document shapes. */
export function extractSlug(slug: unknown): string | null {
  if (typeof slug === "string") {
    const trimmed = slug.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  if (slug && typeof slug === "object" && "current" in slug) {
    const current = (slug as { current?: unknown }).current;
    if (typeof current === "string") {
      const trimmed = current.trim();
      return trimmed.length > 0 ? trimmed : null;
    }
  }

  return null;
}

/**
 * Resolve cache tags to revalidate for a Sanity `_type` (+ optional slug).
 * Always includes the shared `sanity` tag used by every CMS fetch.
 */
export function tagsForSanityType(type: string, slug?: string | null): string[] {
  const tags = new Set<string>(["sanity"]);
  const normalized = type.trim();

  if (!normalized) {
    return [...tags];
  }

  const base = TYPE_TAGS[normalized];
  if (base) {
    for (const tag of base) {
      tags.add(tag);
    }
  }

  if (slug && SLUG_SCOPED_TYPES.has(normalized)) {
    tags.add(`${normalized}:${slug}`);
  }

  return [...tags];
}

/** Resolve tags from a webhook/document payload. */
export function tagsForSanityPayload(payload: SanityRevalidatePayload): string[] {
  const type = typeof payload._type === "string" ? payload._type : "";
  const slug = extractSlug(payload.slug);
  return tagsForSanityType(type, slug);
}
