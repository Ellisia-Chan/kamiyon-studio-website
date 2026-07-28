import { communityItemsFallback } from "@/lib/cms/fallbacks/community";
import type { CommunityItem } from "@/lib/cms/types";

import { toPortableBody, toSeo, toSlug } from "../helpers";
import { communityItemId } from "../ids";
import type { SeedDocument } from "../types";

export function buildCommunityItemDocument(item: CommunityItem): SeedDocument {
  // Skip media: coverImage intentionally omitted.
  return {
    _id: communityItemId(item.slug.current),
    _type: "communityItem",
    title: item.title,
    slug: toSlug(item.slug.current),
    type: item.type,
    summary: item.summary,
    body: toPortableBody(item.body, `community-${item.slug.current}`),
    ...(item.date ? { date: item.date } : {}),
    ...(item.location ? { location: item.location } : {}),
    ...(item.externalUrl ? { externalUrl: item.externalUrl } : {}),
    isPlaceholder: item.isPlaceholder,
    seo: toSeo(item.seo),
  };
}

export function buildCommunityItemDocuments(
  source: CommunityItem[] = communityItemsFallback
): SeedDocument[] {
  return source.map(buildCommunityItemDocument);
}
