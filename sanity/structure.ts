import type { StructureResolver } from "sanity/structure";

import { SANITY_SINGLETON_TYPES } from "./schemaTypes/constants";

const SINGLETON_TITLES: Record<(typeof SANITY_SINGLETON_TYPES)[number], string> = {
  siteSettings: "Site Settings",
  homePage: "Home Page",
  aboutPage: "About Page",
  contactPage: "Contact Page",
};

const COLLECTION_TYPES = [
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

const hiddenTypeIds = new Set<string>([...SANITY_SINGLETON_TYPES, ...COLLECTION_TYPES]);

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SANITY_SINGLETON_TYPES.map((type) =>
        S.listItem()
          .title(SINGLETON_TITLES[type])
          .id(type)
          .child(S.document().schemaType(type).documentId(type)),
      ),
      S.divider(),
      ...COLLECTION_TYPES.map((type) => S.documentTypeListItem(type)),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !hiddenTypeIds.has(item.getId()!),
      ),
    ]);
