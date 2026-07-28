import { afterEach, describe, expect, it, vi } from "vitest";

const fetchMock = vi.fn();
const isConfiguredMock = vi.fn();

vi.mock("@/sanity/env", () => ({
  isSanityConfigured: () => isConfiguredMock(),
}));

vi.mock("@/sanity/lib/client", () => ({
  client: {
    fetch: (...args: unknown[]) => fetchMock(...args),
  },
}));

describe("safeSanityFetch", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("returns null when Sanity is not configured", async () => {
    isConfiguredMock.mockReturnValue(false);
    const { safeSanityFetch } = await import("./fetch");

    await expect(safeSanityFetch("*[_type == 'homePage'][0]")).resolves.toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns fetched data when configured", async () => {
    isConfiguredMock.mockReturnValue(true);
    fetchMock.mockResolvedValue({ title: "Home" });
    const { safeSanityFetch } = await import("./fetch");

    await expect(safeSanityFetch("*[_type == 'homePage'][0]")).resolves.toEqual({
      title: "Home",
    });
  });

  it("returns null and does not throw when fetch fails", async () => {
    isConfiguredMock.mockReturnValue(true);
    fetchMock.mockRejectedValue(new Error("network down"));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const { safeSanityFetch } = await import("./fetch");

    await expect(safeSanityFetch("*[_type == 'homePage'][0]")).resolves.toBeNull();
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
