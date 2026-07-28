import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { prefersReducedMotionMock, scrollToMock } = vi.hoisted(() => {
  const scrollToMock = vi.fn();
  const prefersReducedMotionMock = vi.fn(() => false);
  return { prefersReducedMotionMock, scrollToMock };
});

vi.mock("@/lib/motion/reduced-motion", () => ({
  prefersReducedMotion: () => prefersReducedMotionMock(),
}));

import { useHeroScrollBounce } from "./useHeroScrollBounce";

function markUserWheel() {
  window.dispatchEvent(new Event("wheel"));
}

function scrollPastThreshold(scrollY = 30) {
  Object.defineProperty(window, "scrollY", {
    configurable: true,
    writable: true,
    value: scrollY,
  });
  window.dispatchEvent(new Event("scroll"));
}

describe("useHeroScrollBounce", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    prefersReducedMotionMock.mockReturnValue(false);
    vi.stubGlobal("scrollTo", scrollToMock);
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      writable: true,
      value: 0,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns visible true initially", () => {
    const { result } = renderHook(() => useHeroScrollBounce());
    expect(result.current.visible).toBe(true);
  });

  it("first user scroll past threshold dismisses tip without returning to top", () => {
    const { result } = renderHook(() =>
      useHeroScrollBounce({ threshold: 24, maxBounces: 1 }),
    );

    act(() => {
      markUserWheel();
      scrollPastThreshold(30);
    });

    expect(scrollToMock).not.toHaveBeenCalled();
    expect(result.current.visible).toBe(false);
  });

  it("touch intent past threshold also dismisses without return-to-top", () => {
    const { result } = renderHook(() =>
      useHeroScrollBounce({ threshold: 24, maxBounces: 1 }),
    );

    act(() => {
      window.dispatchEvent(new Event("touchmove"));
      scrollPastThreshold(40);
    });

    expect(scrollToMock).not.toHaveBeenCalled();
    expect(result.current.visible).toBe(false);
  });

  it("key scroll intent past threshold dismisses without return-to-top", () => {
    const { result } = renderHook(() =>
      useHeroScrollBounce({ threshold: 24, maxBounces: 1 }),
    );

    act(() => {
      window.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowDown" }),
      );
      scrollPastThreshold(40);
    });

    expect(scrollToMock).not.toHaveBeenCalled();
    expect(result.current.visible).toBe(false);
  });

  it("does not auto-hijack scroll when reduced motion is preferred", () => {
    prefersReducedMotionMock.mockReturnValue(true);

    const { result } = renderHook(() =>
      useHeroScrollBounce({ threshold: 24 }),
    );

    act(() => {
      markUserWheel();
      scrollPastThreshold(30);
    });

    expect(scrollToMock).not.toHaveBeenCalled();
    // Tip may still dismiss; page must never be bounced back.
    expect(result.current.visible).toBe(false);
  });

  it("dismiss hides tip and prevents further auto-dismiss side effects", () => {
    const { result } = renderHook(() => useHeroScrollBounce({ threshold: 24 }));

    act(() => {
      result.current.dismiss();
    });

    expect(result.current.visible).toBe(false);

    act(() => {
      markUserWheel();
      scrollPastThreshold(30);
    });

    expect(scrollToMock).not.toHaveBeenCalled();
    expect(result.current.visible).toBe(false);
  });

  it("programmatic scroll alone does not dismiss tip", () => {
    const { result } = renderHook(() => useHeroScrollBounce({ threshold: 24 }));

    act(() => {
      scrollPastThreshold(80);
    });

    expect(scrollToMock).not.toHaveBeenCalled();
    expect(result.current.visible).toBe(true);
  });

  it("scroll below threshold with intent does not dismiss tip", () => {
    const { result } = renderHook(() => useHeroScrollBounce({ threshold: 24 }));

    act(() => {
      markUserWheel();
      scrollPastThreshold(10);
    });

    expect(result.current.visible).toBe(true);
    expect(scrollToMock).not.toHaveBeenCalled();
  });
});
