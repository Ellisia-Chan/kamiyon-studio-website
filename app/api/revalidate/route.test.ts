import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const revalidateTagMock = vi.fn();

vi.mock("next/cache", () => ({
  revalidateTag: (...args: unknown[]) => revalidateTagMock(...args),
}));

describe("POST /api/revalidate", () => {
  const originalSecret = process.env.SANITY_REVALIDATE_SECRET;

  beforeEach(() => {
    vi.resetModules();
    revalidateTagMock.mockClear();
    process.env.SANITY_REVALIDATE_SECRET = "test-revalidate-secret";
  });

  afterEach(() => {
    if (originalSecret === undefined) {
      delete process.env.SANITY_REVALIDATE_SECRET;
    } else {
      process.env.SANITY_REVALIDATE_SECRET = originalSecret;
    }
  });

  async function post(
    init: {
      headers?: HeadersInit;
      body?: string;
      url?: string;
    } = {},
  ) {
    const { POST } = await import("./route");
    const request = new Request(init.url ?? "http://localhost/api/revalidate", {
      method: "POST",
      headers: init.headers,
      body: init.body,
    });
    return POST(request);
  }

  it("returns 401 for a bad Bearer secret", async () => {
    const response = await post({
      headers: {
        Authorization: "Bearer wrong-secret",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _type: "homePage" }),
    });

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      success: false,
      data: null,
      error: "Unauthorized",
    });
    expect(revalidateTagMock).not.toHaveBeenCalled();
  });

  it("returns 401 when secret is missing", async () => {
    const response = await post({
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _type: "homePage" }),
    });

    expect(response.status).toBe(401);
    expect(revalidateTagMock).not.toHaveBeenCalled();
  });

  it("revalidates mapped tags for a good Bearer payload", async () => {
    const response = await post({
      headers: {
        Authorization: "Bearer test-revalidate-secret",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _type: "post",
        slug: { current: "launch" },
      }),
    });

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json).toMatchObject({
      success: true,
      error: null,
      data: {
        revalidated: ["sanity", "post", "post:launch"],
      },
    });
    expect(typeof json.data.now).toBe("number");
    expect(revalidateTagMock).toHaveBeenCalledTimes(3);
    expect(revalidateTagMock).toHaveBeenCalledWith("sanity", { expire: 0 });
    expect(revalidateTagMock).toHaveBeenCalledWith("post", { expire: 0 });
    expect(revalidateTagMock).toHaveBeenCalledWith("post:launch", { expire: 0 });
  });

  it("accepts secret via query string (Sanity webhook URL)", async () => {
    const response = await post({
      url: "http://localhost/api/revalidate?secret=test-revalidate-secret",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _type: "siteSettings" }),
    });

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.data.revalidated).toEqual(["sanity", "siteSettings"]);
  });

  it("accepts secret via x-sanity-revalidate-secret header", async () => {
    const response = await post({
      headers: {
        "x-sanity-revalidate-secret": "test-revalidate-secret",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _type: "homePage" }),
    });

    expect(response.status).toBe(200);
    expect(revalidateTagMock).toHaveBeenCalledWith("homePage", { expire: 0 });
  });
});
