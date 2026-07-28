import { describe, expect, it } from "vitest";

import { parseEnvFile } from "./load-env";

describe("parseEnvFile", () => {
  it("parses keys, strips quotes, and ignores comments", () => {
    const parsed = parseEnvFile(`
# comment
SANITY_API_WRITE_TOKEN=secret
QUOTED="hello world"
SINGLE='x'
EMPTY=
BAD LINE
=novalue
`);

    expect(parsed.SANITY_API_WRITE_TOKEN).toBe("secret");
    expect(parsed.QUOTED).toBe("hello world");
    expect(parsed.SINGLE).toBe("x");
    expect(parsed.EMPTY).toBe("");
    expect(parsed).not.toHaveProperty("BAD LINE");
  });
});
