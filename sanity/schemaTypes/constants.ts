/** Expected Sanity document type names (§7 content model). */
export const SANITY_DOCUMENT_TYPES = [
  "siteSettings",
  "homePage",
  "aboutPage",
  "contactPage",
  "teamMember",
  "serviceCategory",
  "service",
  "product",
  "caseStudy",
  "communityItem",
  "partner",
  "mediaAsset",
  "author",
  "category",
  "tag",
  "post",
] as const;

export type SanityDocumentType = (typeof SANITY_DOCUMENT_TYPES)[number];

/** Expected Sanity object type names used in schemas. */
export const SANITY_OBJECT_TYPES = [
  "r2Asset",
  "seoMetadata",
  "cta",
  "socialLink",
  "portableBody",
  "blogBody",
  "storySection",
  "coreValue",
  "contactChannel",
  "faqItem",
  "productMedia",
  "homeHighlight",
  "hero",
  "mission",
  "featuredWork",
  "highlights",
  "ctaBanner",
] as const;

type SanityObjectType = (typeof SANITY_OBJECT_TYPES)[number];

export const SANITY_SINGLETON_TYPES = [
  "siteSettings",
  "homePage",
  "aboutPage",
  "contactPage",
] as const satisfies readonly SanityDocumentType[];
