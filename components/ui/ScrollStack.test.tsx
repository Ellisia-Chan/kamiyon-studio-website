import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ScrollStack, {
  getTransformInvariantOffsetTop,
  ScrollStackItem,
} from "./ScrollStack";

describe("getTransformInvariantOffsetTop", () => {
  it("returns element.offsetTop when not using window scroll", () => {
    const el = document.createElement("div");
    Object.defineProperty(el, "offsetTop", { value: 120, configurable: true });
    Object.defineProperty(el, "offsetParent", { value: null, configurable: true });

    expect(getTransformInvariantOffsetTop(el, false)).toBe(120);
  });

  it("sums offsetTop through offsetParent chain for window scroll", () => {
    const parent = document.createElement("div");
    const child = document.createElement("div");
    Object.defineProperty(parent, "offsetTop", { value: 200, configurable: true });
    Object.defineProperty(parent, "offsetParent", {
      value: null,
      configurable: true,
    });
    Object.defineProperty(child, "offsetTop", { value: 40, configurable: true });
    Object.defineProperty(child, "offsetParent", {
      value: parent,
      configurable: true,
    });

    expect(getTransformInvariantOffsetTop(child, true)).toBe(240);
  });
});

describe("ScrollStack", () => {
  it("renders children inside scroll stack cards", () => {
    render(
      <ScrollStack useWindowScroll>
        <ScrollStackItem>
          <h2>Card One</h2>
        </ScrollStackItem>
        <ScrollStackItem>
          <p>Card Two</p>
        </ScrollStackItem>
      </ScrollStack>,
    );

    expect(screen.getByRole("heading", { name: "Card One" })).toBeInTheDocument();
    expect(screen.getByText("Card Two")).toBeInTheDocument();
  });

  it("applies window-scroll scroller modifier when useWindowScroll is true", () => {
    const { container } = render(
      <ScrollStack useWindowScroll className="extra">
        <ScrollStackItem>Item</ScrollStackItem>
      </ScrollStack>,
    );

    const scroller = container.querySelector(".scroll-stack-scroller");
    expect(scroller).toHaveClass("scroll-stack-scroller--window");
    expect(scroller).toHaveClass("extra");
  });

  it("includes an end spacer for pin release", () => {
    const { container } = render(
      <ScrollStack useWindowScroll>
        <ScrollStackItem>Only</ScrollStackItem>
      </ScrollStack>,
    );

    expect(container.querySelector(".scroll-stack-end")).toBeInTheDocument();
  });

  it("assigns ascending z-index so later cards stack above earlier ones", () => {
    const { container } = render(
      <ScrollStack useWindowScroll>
        <ScrollStackItem>First</ScrollStackItem>
        <ScrollStackItem>Second</ScrollStackItem>
        <ScrollStackItem>Third</ScrollStackItem>
      </ScrollStack>,
    );

    const cards = container.querySelectorAll(".scroll-stack-card");
    expect(cards).toHaveLength(3);
    expect((cards[0] as HTMLElement).style.zIndex).toBe("1");
    expect((cards[1] as HTMLElement).style.zIndex).toBe("2");
    expect((cards[2] as HTMLElement).style.zIndex).toBe("3");
  });
});
