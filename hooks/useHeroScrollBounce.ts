"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type UseHeroScrollBounceOptions = {
  threshold?: number;
  /** Kept for API compatibility; tip dismisses on the first qualifying intent. */
  maxBounces?: number;
};

export type UseHeroScrollBounceResult = {
  visible: boolean;
  dismiss: () => void;
};

const SCROLL_INTENT_KEYS = new Set([
  "ArrowDown",
  "PageDown",
  " ",
  "Spacebar",
  "End",
]);

const USER_INTENT_MS = 500;

/**
 * Home hero scroll tip: dismiss on first user-driven scroll past `threshold`.
 * Does not return the page to y=0 — first scroll intent must stick.
 * Tip bounce motion lives on `HeroScrollHelper` (CSS), not page scroll hijack.
 */
export function useHeroScrollBounce(
  options: UseHeroScrollBounceOptions = {},
): UseHeroScrollBounceResult {
  const { threshold = 24 } = options;
  const [visible, setVisible] = useState(true);
  const dismissedRef = useRef(false);
  const userIntentUntilRef = useRef(0);

  const dismiss = useCallback(() => {
    dismissedRef.current = true;
    setVisible(false);
  }, []);

  const tryDismissOnScroll = useCallback(
    (scrollY: number) => {
      if (dismissedRef.current) {
        return;
      }

      if (performance.now() > userIntentUntilRef.current) {
        return;
      }

      if (scrollY <= threshold) {
        return;
      }

      dismissedRef.current = true;
      userIntentUntilRef.current = 0;
      setVisible(false);
    },
    [threshold],
  );

  const markUserIntent = useCallback(() => {
    userIntentUntilRef.current = performance.now() + USER_INTENT_MS;
  }, []);

  useEffect(() => {
    const onWheel = () => {
      markUserIntent();
    };

    const onTouchMove = () => {
      markUserIntent();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!SCROLL_INTENT_KEYS.has(event.key)) {
        return;
      }
      markUserIntent();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [markUserIntent]);

  useEffect(() => {
    const onScroll = () => {
      tryDismissOnScroll(window.scrollY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [tryDismissOnScroll]);

  return { visible, dismiss };
}
