import { describe, expect, it } from "vitest";

import {
  collectionId,
  partnerId,
  productId,
  serviceCategoryId,
} from "./ids";

describe("seed ids (hyphen strategy)", () => {
  it("uses hyphen separators and never dots", () => {
    expect(collectionId("product", "eclipse")).toBe("product-eclipse");
    expect(productId("eclipse")).toBe("product-eclipse");
    expect(serviceCategoryId("software-development")).toBe(
      "serviceCategory-software-development",
    );
    expect(partnerId("partner-1")).toBe("partner-partner-1");

    expect(productId("eclipse")).not.toContain(".");
    expect(partnerId("partner-7")).not.toContain(".");
  });
});
