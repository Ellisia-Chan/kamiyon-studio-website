import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { AboutPage } from "@/lib/cms/types";
import { INTERIM_CONTACT_FORM_URL } from "@/lib/contact/channels";

vi.mock("next/navigation", () => ({
  usePathname: () => "/about",
}));

import { AboutHero } from "./AboutHero";

const baseAboutPage: AboutPage = {
  _type: "aboutPage",
  title: "About",
  storySections: [],
  mission: "Create games and interactive experiences that educate and inspire.",
  vision: "A globally recognized multimedia company.",
  motto: "Create. Play. Inspire.",
  values: [],
  cultureSummary: "",
  seo: { title: "", description: "" },
};

describe("AboutHero", () => {
  it("renders the motto as the headline and mission as the supporting line", () => {
    render(<AboutHero aboutPage={baseAboutPage} />);

    expect(screen.getByRole("heading", { level: 1, name: baseAboutPage.motto })).toBeInTheDocument();
    expect(screen.getByText(baseAboutPage.mission)).toBeInTheDocument();
  });

  it("renders quick links to values, team, and contact", () => {
    render(<AboutHero aboutPage={baseAboutPage} />);

    expect(screen.getByRole("link", { name: "Our values" })).toHaveAttribute("href", "#values");
    expect(screen.getByRole("link", { name: "Meet the team" })).toHaveAttribute("href", "#team");
    const contact = screen.getByRole("link", { name: "Contact us" });
    expect(contact).toHaveAttribute("href", INTERIM_CONTACT_FORM_URL);
    expect(contact).toHaveAttribute("target", "_blank");
  });
});
