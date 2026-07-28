import { describe, expect, it } from "vitest";

import { buildCardNavItems } from "./card-nav";
import { CONTACT_CTA, SOCIAL_LINKS } from "./navigation";

describe("buildCardNavItems", () => {
  it("returns three cards: About, Work, and Contact", () => {
    const items = buildCardNavItems(CONTACT_CTA);

    expect(items).toHaveLength(3);
    expect(items.map((item) => item.label)).toEqual([
      "About",
      "Work",
      "Contact",
    ]);
  });

  it("groups primary routes under About and Work", () => {
    const [about, work] = buildCardNavItems(CONTACT_CTA);

    expect(about.links.map((link) => link.href)).toEqual(["/", "/about"]);
    expect(work.links.map((link) => link.href)).toEqual([
      "/services",
      "/products",
      "/portfolio",
      "/community",
      "/blog",
    ]);
  });

  it("includes the contact CTA and social links on Contact", () => {
    const contact = buildCardNavItems(CONTACT_CTA, SOCIAL_LINKS)[2];

    expect(contact.links[0]).toEqual({
      label: CONTACT_CTA.label,
      href: CONTACT_CTA.href,
      ariaLabel: CONTACT_CTA.label,
    });
    expect(contact.links.slice(1).map((link) => link.label)).toEqual(
      SOCIAL_LINKS.map((link) => link.label),
    );
  });

  it("includes Products and Community in card links", () => {
    const hrefs = buildCardNavItems(CONTACT_CTA).flatMap((item) =>
      item.links.map((link) => link.href),
    );

    expect(hrefs).toContain("/products");
    expect(hrefs).toContain("/community");
  });
});
