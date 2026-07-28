import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { prefersReducedMotionMock } = vi.hoisted(() => ({
  prefersReducedMotionMock: vi.fn(() => false),
}));

vi.mock("@/lib/motion/reduced-motion", () => ({
  prefersReducedMotion: () => prefersReducedMotionMock(),
}));

import {
  handleSameRouteNavClick,
  isAppHref,
  isExternalHref,
  isSameRouteHref,
  normalizePathname,
  parseAppHref,
  scrollToNavTarget,
} from "./same-route-scroll";

describe("same-route-scroll helpers", () => {
  beforeEach(() => {
    prefersReducedMotionMock.mockReturnValue(false);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
  });

  describe("isExternalHref", () => {
    it("detects absolute http(s), mailto, and tel hrefs", () => {
      expect(isExternalHref("https://docs.google.com/forms/d/e/x/viewform")).toBe(
        true,
      );
      expect(isExternalHref("http://example.com")).toBe(true);
      expect(isExternalHref("mailto:kamiyonstudio@gmail.com")).toBe(true);
      expect(isExternalHref("tel:+15551212")).toBe(true);
    });

    it("treats in-app paths and hashes as internal", () => {
      expect(isExternalHref("/contact")).toBe(false);
      expect(isExternalHref("/about#team")).toBe(false);
      expect(isExternalHref("#values")).toBe(false);
      expect(isExternalHref("/")).toBe(false);
    });
  });

  describe("isAppHref", () => {
    it("accepts relative app paths and hashes", () => {
      expect(isAppHref("/")).toBe(true);
      expect(isAppHref("/portfolio")).toBe(true);
      expect(isAppHref("/about#team")).toBe(true);
      expect(isAppHref("#contact")).toBe(true);
    });

    it("rejects external and protocol hrefs", () => {
      expect(isAppHref("https://docs.google.com/forms/d/e/x/viewform")).toBe(
        false,
      );
      expect(isAppHref("mailto:a@b.com")).toBe(false);
    });
  });

  describe("normalizePathname / parseAppHref", () => {
    it("normalizes trailing slashes", () => {
      expect(normalizePathname("/")).toBe("/");
      expect(normalizePathname("/about/")).toBe("/about");
      expect(normalizePathname("/about")).toBe("/about");
    });

    it("parses pathname and hash from app hrefs", () => {
      expect(parseAppHref("/about#team")).toEqual({
        pathname: "/about",
        hash: "#team",
      });
      expect(parseAppHref("#values")).toEqual({
        pathname: null,
        hash: "#values",
      });
      expect(parseAppHref("/")).toEqual({ pathname: "/", hash: "" });
      expect(parseAppHref("https://example.com")).toBeNull();
    });
  });

  describe("isSameRouteHref", () => {
    it("matches same pathname ignoring trailing slash", () => {
      expect(isSameRouteHref("/about", "/about")).toBe(true);
      expect(isSameRouteHref("/about/", "/about")).toBe(true);
      expect(isSameRouteHref("/about", "/about#team")).toBe(true);
    });

    it("treats hash-only hrefs as same-route", () => {
      expect(isSameRouteHref("/about", "#values")).toBe(true);
    });

    it("returns false for different routes or external hrefs", () => {
      expect(isSameRouteHref("/about", "/contact")).toBe(false);
      expect(
        isSameRouteHref(
          "/contact",
          "https://docs.google.com/forms/d/e/x/viewform",
        ),
      ).toBe(false);
    });
  });

  describe("scrollToNavTarget", () => {
    it("smooth-scrolls to top when no hash is provided", () => {
      const scrollTo = vi.fn();
      vi.stubGlobal("scrollTo", scrollTo);

      scrollToNavTarget({ pathname: "/about", hash: "" });

      expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    });

    it("uses instant scroll when prefers-reduced-motion is set", () => {
      prefersReducedMotionMock.mockReturnValue(true);
      const scrollTo = vi.fn();
      vi.stubGlobal("scrollTo", scrollTo);

      scrollToNavTarget({ pathname: "/", hash: "" });

      expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
    });

    it("smooth-scrolls to a hash target when present", () => {
      const target = document.createElement("section");
      target.id = "team";
      const scrollIntoView = vi.fn();
      target.scrollIntoView = scrollIntoView;
      document.body.appendChild(target);

      scrollToNavTarget({ pathname: "/about", hash: "#team" });

      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      });
    });

    it("falls back to top when hash target is missing", () => {
      const scrollTo = vi.fn();
      vi.stubGlobal("scrollTo", scrollTo);

      scrollToNavTarget({ pathname: "/about", hash: "#missing" });

      expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    });
  });

  describe("handleSameRouteNavClick", () => {
    function createClickEvent(
      overrides: Partial<{
        button: number;
        metaKey: boolean;
        ctrlKey: boolean;
        shiftKey: boolean;
        altKey: boolean;
        defaultPrevented: boolean;
      }> = {},
    ) {
      return {
        button: 0,
        metaKey: false,
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
        defaultPrevented: false,
        preventDefault: vi.fn(),
        ...overrides,
      };
    }

    it("prevents default and scrolls when already on the route", () => {
      const scrollTo = vi.fn();
      vi.stubGlobal("scrollTo", scrollTo);
      const event = createClickEvent();

      const handled = handleSameRouteNavClick(event, "/about", "/about");

      expect(handled).toBe(true);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    });

    it("does not intercept external Google Form CTAs", () => {
      const event = createClickEvent();

      const handled = handleSameRouteNavClick(
        event,
        "https://docs.google.com/forms/d/e/x/viewform",
        "/contact",
      );

      expect(handled).toBe(false);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it("does not intercept different-route navigation", () => {
      const event = createClickEvent();

      expect(handleSameRouteNavClick(event, "/contact", "/about")).toBe(false);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it("ignores modified / non-primary clicks", () => {
      expect(
        handleSameRouteNavClick(createClickEvent({ metaKey: true }), "/", "/"),
      ).toBe(false);
      expect(
        handleSameRouteNavClick(createClickEvent({ button: 1 }), "/", "/"),
      ).toBe(false);
    });
  });
});
