import { describe, expect, it } from "vitest";

import { PARTNER_PLACEHOLDERS } from "@/lib/home/partner-placeholders";

import { partnerId } from "../ids";
import {
  buildAllSeedDocuments,
  buildPartnerDocument,
  buildPartnerDocuments,
  listAllSeedDocumentIds,
} from "./index";

describe("WS8d partner seed builders", () => {
  it("emits stable hyphen IDs partner-partner-1 … partner-partner-7", () => {
    const docs = buildPartnerDocuments();
    expect(docs).toHaveLength(7);
    expect(docs.map((d) => d._id)).toEqual([
      "partner-partner-1",
      "partner-partner-2",
      "partner-partner-3",
      "partner-partner-4",
      "partner-partner-5",
      "partner-partner-6",
      "partner-partner-7",
    ]);
    expect(partnerId("partner-1")).toBe("partner-partner-1");
  });

  it("sets isPlaceholder true, slug from placeholder id, and skips logo", () => {
    const docs = buildPartnerDocuments();
    for (let i = 0; i < docs.length; i++) {
      const doc = docs[i]!;
      const source = PARTNER_PLACEHOLDERS[i]!;
      expect(doc).toMatchObject({
        _type: "partner",
        label: source.label,
        slug: { _type: "slug", current: source.id },
        order: i + 1,
        isPlaceholder: true,
      });
      expect(doc).not.toHaveProperty("logo");
      expect(doc).not.toHaveProperty("websiteUrl");
    }
  });

  it("buildPartnerDocument maps a single slot", () => {
    expect(buildPartnerDocument(PARTNER_PLACEHOLDERS[0]!, 0)).toEqual({
      _id: "partner-partner-1",
      _type: "partner",
      label: "Partner placeholder",
      slug: { _type: "slug", current: "partner-1" },
      order: 1,
      isPlaceholder: true,
    });
  });

  it("includes partners + blog in full seed set with home last", () => {
    const docs = buildAllSeedDocuments();
    const ids = docs.map((d) => d._id);

    expect(ids).toContain("partner-partner-1");
    expect(ids).toContain("post-coming-soon");
    expect(ids[ids.length - 1]).toBe("homePage");

    const categoryIndex = ids.indexOf(
      "serviceCategory-interactive-experience-development",
    );
    const serviceIndex = ids.indexOf("service-game-development");
    const productIndex = ids.indexOf("product-eclipse");
    const partnerIndex = ids.indexOf("partner-partner-1");
    const blogIndex = ids.indexOf("author-kamiyon-studio");
    const homeIndex = ids.indexOf("homePage");
    const siteSettingsIndex = ids.indexOf("siteSettings");

    expect(categoryIndex).toBeLessThan(serviceIndex);
    expect(serviceIndex).toBeLessThan(productIndex);
    expect(productIndex).toBeLessThan(partnerIndex);
    expect(siteSettingsIndex).toBeLessThan(partnerIndex);
    expect(partnerIndex).toBeLessThan(blogIndex);
    expect(blogIndex).toBeLessThan(homeIndex);

    expect(new Set(ids).size).toBe(ids.length);
    expect(listAllSeedDocumentIds()).toEqual(ids);

    // categories(4)+services(10)+products(3)+case(1)+community(2)+team(6)
    // + about(1)+contact(1)+siteSettings(1)+partners(7)+blog(5)+home(1) = 42
    expect(docs).toHaveLength(42);
  });
});
