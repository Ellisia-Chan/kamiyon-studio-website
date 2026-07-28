import { describe, expect, it } from "vitest";

import { SANITY_DOCUMENT_TYPES, SANITY_OBJECT_TYPES } from "./constants";

describe("sanity schema constants", () => {
  it("lists all required document types from essential context §7", () => {
    expect(SANITY_DOCUMENT_TYPES).toEqual([
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
    ]);
  });

  it("lists shared object types used across schemas", () => {
    expect(SANITY_OBJECT_TYPES).toContain("r2Asset");
    expect(SANITY_OBJECT_TYPES).toContain("seoMetadata");
    expect(SANITY_OBJECT_TYPES).toContain("portableBody");
    expect(SANITY_OBJECT_TYPES).toContain("blogBody");
    expect(SANITY_OBJECT_TYPES).toContain("hero");
  });

  it("uses unique document type names", () => {
    expect(new Set(SANITY_DOCUMENT_TYPES).size).toBe(SANITY_DOCUMENT_TYPES.length);
  });

  it("uses unique object type names", () => {
    expect(new Set(SANITY_OBJECT_TYPES).size).toBe(SANITY_OBJECT_TYPES.length);
  });
});
