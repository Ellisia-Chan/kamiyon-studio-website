import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MotionButton } from "./MotionButton";

describe("MotionButton", () => {
  it("renders the underlying Button link", () => {
    render(<MotionButton href="/contact">Talk with Kamiyon</MotionButton>);

    expect(
      screen.getByRole("link", { name: "Talk with Kamiyon" }),
    ).toHaveAttribute("href", "/contact");
  });
});
