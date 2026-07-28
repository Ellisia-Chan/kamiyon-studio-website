import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AnimationProviders } from "./AnimationProviders";

describe("AnimationProviders", () => {
  it("mounts children without throwing", () => {
    render(
      <AnimationProviders>
        <p>Provider child</p>
      </AnimationProviders>,
    );

    expect(screen.getByText("Provider child")).toBeInTheDocument();
  });
});
