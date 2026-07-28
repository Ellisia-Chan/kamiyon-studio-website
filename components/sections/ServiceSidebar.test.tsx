import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Service } from "@/lib/cms/types";
import { ServiceSidebar } from "./ServiceSidebar";

const baseService: Service = {
  _type: "service",
  title: "Game Development",
  slug: { current: "game-development" },
  categorySlug: "interactive-experience-development",
  summary: "",
  body: [],
  outcomes: ["Playable prototype", "Production-ready build"],
  relatedIndustries: ["Education", "Web3"],
  order: 1,
  isPlaceholder: false,
  seo: { title: "", description: "" },
};

describe("ServiceSidebar", () => {
  it("renders outcomes and related industries when present", () => {
    render(<ServiceSidebar service={baseService} />);

    expect(screen.getByText("What you gain")).toBeInTheDocument();
    expect(screen.getByText("Playable prototype")).toBeInTheDocument();
    expect(screen.getByText("Related industries")).toBeInTheDocument();
    expect(screen.getByText("Education")).toBeInTheDocument();
  });

  it("hides the outcomes/industries sections when empty", () => {
    render(<ServiceSidebar service={{ ...baseService, outcomes: [], relatedIndustries: [] }} />);

    expect(screen.queryByText("What you gain")).not.toBeInTheDocument();
    expect(screen.queryByText("Related industries")).not.toBeInTheDocument();
  });

  it("always renders the interim Google Form contact CTA", () => {
    render(<ServiceSidebar service={baseService} />);

    const cta = screen.getByRole("link", { name: "Discuss this service" });
    expect(cta).toHaveAttribute("href", expect.stringContaining("docs.google.com/forms"));
    expect(cta).toHaveAttribute("target", "_blank");
  });
});
