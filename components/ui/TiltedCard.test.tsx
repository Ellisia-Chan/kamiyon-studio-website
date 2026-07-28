import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TiltedCard } from "./TiltedCard";

describe("TiltedCard", () => {
  it("renders an image when imageSrc is provided", () => {
    render(
      <TiltedCard
        imageSrc="/cover.png"
        altText="Album cover"
        showMobileWarning={false}
        showTooltip={false}
      />,
    );

    expect(screen.getByRole("img", { name: "Album cover" })).toHaveAttribute(
      "src",
      "/cover.png",
    );
  });

  it("renders children when used as a card wrapper", () => {
    render(
      <TiltedCard
        containerHeight="100%"
        showMobileWarning={false}
        showTooltip={false}
      >
        <a href="https://example.com/products/eclipse">Eclipse</a>
      </TiltedCard>,
    );

    expect(screen.getByRole("link", { name: "Eclipse" })).toHaveAttribute(
      "href",
      "https://example.com/products/eclipse",
    );
  });

  it("keeps wrapper text fully in the document tree", () => {
    render(
      <TiltedCard {...{ containerHeight: "100%", showMobileWarning: false, showTooltip: false }}>
        <div>
          <p>CASE STUDY</p>
          <h3>Project coming soon</h3>
        </div>
      </TiltedCard>,
    );

    expect(screen.getByText("CASE STUDY")).toBeVisible();
    expect(screen.getByText("Project coming soon")).toBeVisible();
  });

  it("shows the tooltip caption when enabled", () => {
    render(
      <TiltedCard
        imageSrc="/cover.png"
        captionText="Kendrick Lamar - GNX"
        showMobileWarning={false}
        showTooltip
      />,
    );

    expect(screen.getByText("Kendrick Lamar - GNX")).toBeInTheDocument();
  });

  it("shows overlay content when displayOverlayContent is true", () => {
    render(
      <TiltedCard
        imageSrc="/cover.png"
        showMobileWarning={false}
        showTooltip={false}
        displayOverlayContent
        overlayContent={<p>Overlay label</p>}
      />,
    );

    expect(screen.getByText("Overlay label")).toBeInTheDocument();
  });
});
