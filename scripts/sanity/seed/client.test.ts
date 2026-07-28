import { afterEach, describe, expect, it, vi } from "vitest";

import { resolveWriteToken, WRITE_TOKEN_ENV } from "./client";

describe("resolveWriteToken", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns trimmed token or undefined", () => {
    expect(resolveWriteToken({})).toBeUndefined();
    expect(resolveWriteToken({ [WRITE_TOKEN_ENV]: "   " })).toBeUndefined();
    expect(resolveWriteToken({ [WRITE_TOKEN_ENV]: "  tok  " })).toBe("tok");
  });
});
