import type { MetadataRoute } from "next";

import {
  isCrawlableProduction,
  PRODUCTION_CANONICAL_ORIGIN,
  normalizeSiteUrl,
} from "./site-url";

const STATIC_ROUTES = [
  "",
  "/about",
  "/services",
  "/products",
  "/portfolio",
  "/community",
  "/contact",
  "/blog",
] as const;

type SitemapSeo = {
  noIndex?: boolean;
};

type SitemapSlugDoc = {
  slug: { current: string };
  seo?: SitemapSeo;
  publishedAt?: string;
};

export type BuildPublicSitemapEntriesInput = {
  siteUrl: string;
  products: SitemapSlugDoc[];
  services: SitemapSlugDoc[];
  caseStudies: SitemapSlugDoc[];
  /** Deployment env (`APP_ENV`); staging/preview/development always fail-closed. */
  appEnv?: string | null;
};

export function isSitemapIndexable(doc: { seo?: SitemapSeo }): boolean {
  return doc.seo?.noIndex !== true;
}

function toAbsoluteUrl(path: string): string {
  return path === ""
    ? PRODUCTION_CANONICAL_ORIGIN
    : `${PRODUCTION_CANONICAL_ORIGIN}${path}`;
}

function entryForSlug(
  pathPrefix: string,
  doc: SitemapSlugDoc
): MetadataRoute.Sitemap[number] | null {
  if (!isSitemapIndexable(doc) || !doc.slug.current) {
    return null;
  }

  const entry: MetadataRoute.Sitemap[number] = {
    url: toAbsoluteUrl(`${pathPrefix}/${doc.slug.current}`),
  };

  if (doc.publishedAt) {
    entry.lastModified = new Date(doc.publishedAt);
  }

  return entry;
}

/**
 * Public indexable URLs only, always on the production canonical origin.
 * Non-crawlable deployments (preview/dev or non-canonical SITE_URL) get an
 * empty sitemap (robots already disallow all).
 */
export function buildPublicSitemapEntries(
  input: BuildPublicSitemapEntriesInput
): MetadataRoute.Sitemap {
  if (
    !isCrawlableProduction(normalizeSiteUrl(input.siteUrl), input.appEnv)
  ) {
    return [];
  }

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: toAbsoluteUrl(path),
  }));

  const productEntries = input.products
    .map((product) => entryForSlug("/products", product))
    .filter((entry): entry is MetadataRoute.Sitemap[number] => entry !== null);

  const serviceEntries = input.services
    .map((service) => entryForSlug("/services", service))
    .filter((entry): entry is MetadataRoute.Sitemap[number] => entry !== null);

  const caseStudyEntries = input.caseStudies
    .map((caseStudy) => entryForSlug("/portfolio", caseStudy))
    .filter((entry): entry is MetadataRoute.Sitemap[number] => entry !== null);

  return [
    ...staticEntries,
    ...productEntries,
    ...serviceEntries,
    ...caseStudyEntries,
  ];
}
