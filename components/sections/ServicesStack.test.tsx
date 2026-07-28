import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/ui/WordPullUp", () => ({
  WordPullUp: ({
    words,
    as: Tag = "h1",
    id,
    className,
  }: {
    words: string;
    as?: keyof HTMLElementTagNameMap;
    id?: string;
    className?: string;
  }) => (
    <Tag id={id} className={className}>
      {words}
    </Tag>
  ),
}));

vi.mock("@/components/animation/AnimatedSection", () => ({
  AnimatedSection: ({
    children,
    as: Tag = "div",
    className,
  }: {
    children: React.ReactNode;
    as?: keyof HTMLElementTagNameMap;
    className?: string;
  }) => <Tag className={className}>{children}</Tag>,
}));

import { ServicesStack, type ServiceStackSlide } from "./ServicesStack";

const slides: ServiceStackSlide[] = [
  {
    id: "interactive",
    eyebrow: "Interactive Experience",
    title: "Interactive Experience Development",
    summary: "Games, learning experiences, simulations, and prototypes.",
    exploreHref: "/services/interactive-experience-development",
  },
  {
    id: "software",
    eyebrow: "Software",
    title: "Software Development",
    summary: "Modern digital products with usability and scalability.",
    exploreHref: "/services/software-development",
  },
  {
    id: "creative",
    eyebrow: "Creative",
    title: "Creative & Design Services",
    summary: "Multidisciplinary creative services for strong visual communication.",
    exploreHref: "/services/creative-design-services",
  },
];

describe("ServicesStack", () => {
  it("renders nothing when slides is empty", () => {
    const { container } = render(<ServicesStack slides={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders section heading and all service cards", () => {
    render(<ServicesStack slides={slides} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "What we build" })
    ).toBeInTheDocument();

    slides.forEach((slide) => {
      expect(
        screen.getByRole("heading", { level: 3, name: slide.title })
      ).toBeInTheDocument();
      expect(screen.getByText(slide.summary)).toBeInTheDocument();
    });
  });

  it("renders an Explore link for each service", () => {
    render(<ServicesStack slides={slides} />);

    const exploreLinks = screen.getAllByRole("link", { name: "Explore" });
    expect(exploreLinks).toHaveLength(slides.length);
    exploreLinks.forEach((link, index) => {
      expect(link).toHaveAttribute("href", slides[index].exploreHref);
    });
  });

  it("uses ScrollStack window-scroll mode for page-flow stacking", () => {
    const { container } = render(<ServicesStack slides={slides} />);

    expect(
      container.querySelector(".scroll-stack-scroller--window")
    ).toBeInTheDocument();
    expect(container.querySelectorAll(".scroll-stack-card")).toHaveLength(
      slides.length
    );
  });
});
