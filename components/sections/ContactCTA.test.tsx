import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { HomeCtaBanner } from "@/lib/cms/types";
import { INTERIM_CONTACT_FORM_URL } from "@/lib/contact/channels";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import { ContactCTA } from "./ContactCTA";

describe("ContactCTA", () => {
  it("renders title, body, CTA button, and secondary link", () => {
    const ctaBanner: HomeCtaBanner = {
      _type: "ctaBanner",
      title: "Let's build something",
      body: "Reach out to discuss your next project.",
      ctaLabel: "Contact us",
      ctaHref: INTERIM_CONTACT_FORM_URL,
    };

    render(<ContactCTA ctaBanner={ctaBanner} />);

    expect(screen.getByRole("heading", { name: ctaBanner.title })).toBeInTheDocument();
    expect(screen.getByText(ctaBanner.body)).toBeInTheDocument();
    const cta = screen.getByRole("link", { name: "Contact us" });
    expect(cta).toHaveAttribute("href", INTERIM_CONTACT_FORM_URL);
    expect(cta).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "View our work" })).toHaveAttribute(
      "href",
      "/portfolio"
    );
  });
});
