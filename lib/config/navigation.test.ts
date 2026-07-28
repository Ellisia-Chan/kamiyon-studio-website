import { describe, expect, it } from "vitest";

import { INTERIM_CONTACT_FORM_URL } from "@/lib/contact/channels";

import { CONTACT_CTA, PRIMARY_NAV_ITEMS } from "./navigation";

const EXPECTED_PRIMARY_NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Community", href: "/community" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

describe("PRIMARY_NAV_ITEMS", () => {
  it("lists all eight primary nav links in locked order", () => {
    expect(PRIMARY_NAV_ITEMS).toHaveLength(8);
    expect([...PRIMARY_NAV_ITEMS]).toEqual([...EXPECTED_PRIMARY_NAV]);
  });

  it("includes Products and Community", () => {
    const labels = PRIMARY_NAV_ITEMS.map((item) => item.label);
    const hrefs = PRIMARY_NAV_ITEMS.map((item) => item.href);

    expect(labels).toContain("Products");
    expect(labels).toContain("Community");
    expect(hrefs).toContain("/products");
    expect(hrefs).toContain("/community");
  });

  it("keeps Contact as the in-app channels page", () => {
    expect(PRIMARY_NAV_ITEMS.find((item) => item.label === "Contact")?.href).toBe(
      "/contact",
    );
  });
});

describe("CONTACT_CTA", () => {
  it("points the interim primary CTA at the Google Form", () => {
    expect(CONTACT_CTA).toEqual({
      label: "Get in touch",
      href: INTERIM_CONTACT_FORM_URL,
    });
  });
});
