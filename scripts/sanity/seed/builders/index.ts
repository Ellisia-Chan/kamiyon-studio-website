/**
 * Sanity seed builders.
 *
 * WS8b core builders + WS8c blog + WS8d partners.
 * CLI (`scripts/sanity/seed`) calls `buildAllSeedDocuments()` for ordered upsert.
 */

import type { SeedDocument } from "../types";

import { buildAboutPageDocument } from "./about";
import { buildBlogSeedDocuments } from "./blog";
import { buildCaseStudyDocuments } from "./case-studies";
import { buildCommunityItemDocuments } from "./community";
import { buildContactPageDocument } from "./contact";
import { buildHomePageDocument } from "./home";
import { buildPartnerDocuments } from "./partners";
import { buildProductDocuments } from "./products";
import {
  buildServiceCategoryDocuments,
  buildServiceDocuments,
} from "./services";
import { buildSiteSettingsDocument } from "./site-settings";
import { buildTeamMemberDocuments } from "./team";

export { buildAboutPageDocument } from "./about";
export {
  buildBlogAuthorDocument,
  buildBlogCategoryDocument,
  buildBlogPostDocument,
  buildBlogSeedDocuments,
  buildBlogTagDocuments,
  listBlogSeedDocumentIds,
} from "./blog";
export { buildCaseStudyDocument, buildCaseStudyDocuments } from "./case-studies";
export {
  buildCommunityItemDocument,
  buildCommunityItemDocuments,
} from "./community";
export { buildContactPageDocument } from "./contact";
export { buildHomePageDocument } from "./home";
export { buildPartnerDocument, buildPartnerDocuments } from "./partners";
export { buildProductDocument, buildProductDocuments } from "./products";
export {
  buildServiceCategoryDocument,
  buildServiceCategoryDocuments,
  buildServiceDocument,
  buildServiceDocuments,
} from "./services";
export { buildSiteSettingsDocument } from "./site-settings";
export { buildTeamMemberDocument, buildTeamMemberDocuments } from "./team";

/**
 * Core seed documents (WS8b) — partners/blog excluded.
 * Order keeps home after featured product/case-study refs.
 */
export function buildCoreSeedDocuments(): SeedDocument[] {
  return [
    buildSiteSettingsDocument(),
    ...buildServiceCategoryDocuments(),
    ...buildServiceDocuments(),
    ...buildProductDocuments(),
    ...buildCaseStudyDocuments(),
    ...buildCommunityItemDocuments(),
    ...buildTeamMemberDocuments(),
    buildAboutPageDocument(),
    buildContactPageDocument(),
    buildHomePageDocument(),
  ];
}

/** Stable `_id` list for dry-run / CLI logging (WS8b core only). */
export function listCoreSeedDocumentIds(): string[] {
  return buildCoreSeedDocuments().map((doc) => doc._id);
}

/**
 * Full seed set in mutation order (WS8d):
 * categories → services → products/caseStudies → community/team →
 * singletons about/contact/siteSettings → partners → blog → home LAST.
 */
export function buildAllSeedDocuments(): SeedDocument[] {
  return [
    ...buildServiceCategoryDocuments(),
    ...buildServiceDocuments(),
    ...buildProductDocuments(),
    ...buildCaseStudyDocuments(),
    ...buildCommunityItemDocuments(),
    ...buildTeamMemberDocuments(),
    buildAboutPageDocument(),
    buildContactPageDocument(),
    buildSiteSettingsDocument(),
    ...buildPartnerDocuments(),
    ...buildBlogSeedDocuments(),
    buildHomePageDocument(),
  ];
}

/** Stable `_id` list for full dry-run / CLI logging. */
export function listAllSeedDocumentIds(): string[] {
  return buildAllSeedDocuments().map((doc) => doc._id);
}
