import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { Product } from "@/lib/cms/types";
import { ProductDetail } from "./ProductDetail";

vi.mock("@/lib/cms/image", () => ({
  getCmsImageUrl: vi.fn(() => null),
}));

const baseProduct: Product = {
  _type: "product",
  title: "Eclipse",
  slug: { current: "eclipse" },
  tagline: "A 2D platformer about light and shadow.",
  genre: "2D Platformer",
  status: "original-ip",
  developmentStatus: "tbd",
  overview: "An overview of the game.",
  goals: ["Ship a playable demo"],
  features: ["Dynamic lighting puzzles"],
  platforms: ["PC"],
  media: [],
  isPlaceholder: true,
  order: 1,
  seo: { title: "", description: "" },
};

describe("ProductDetail", () => {
  it("renders title, tagline, status badge, and overview", () => {
    render(<ProductDetail product={baseProduct} />);

    expect(screen.getByRole("heading", { level: 1, name: "Eclipse" })).toBeInTheDocument();
    expect(screen.getByText(baseProduct.tagline)).toBeInTheDocument();
    expect(screen.getByText("Status: TBD")).toBeInTheDocument();
    expect(screen.getByText(baseProduct.overview)).toBeInTheDocument();
  });

  it("renders features, goals, and platforms only when present", () => {
    render(<ProductDetail product={baseProduct} />);

    expect(screen.getByText("Dynamic lighting puzzles")).toBeInTheDocument();
    expect(screen.getByText("Ship a playable demo")).toBeInTheDocument();
    expect(screen.getByText("PC")).toBeInTheDocument();
  });

  it("hides features/goals/platforms sections when the arrays are empty", () => {
    render(
      <ProductDetail
        product={{ ...baseProduct, features: [], goals: [], platforms: [] }}
      />
    );

    expect(screen.queryByRole("heading", { name: "Key features" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Project goals" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Platforms" })).not.toBeInTheDocument();
  });

  it("always renders the contact CTA", () => {
    render(<ProductDetail product={baseProduct} />);

    expect(
      screen.getByRole("link", { name: "Interested in this project?" })
    ).toHaveAttribute("href", expect.stringContaining("docs.google.com/forms"));
  });
});
