import { prefersReducedMotion } from "@/lib/motion/reduced-motion";

export type ParsedAppHref = {
  /** Null when href is hash-only (current page). */
  pathname: string | null;
  hash: string;
};

export type SameRouteClickEvent = {
  button: number;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  defaultPrevented: boolean;
  preventDefault: () => void;
};

const PROTOCOL_HREF = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

export function isExternalHref(href: string): boolean {
  return PROTOCOL_HREF.test(href.trim());
}

export function isAppHref(href: string): boolean {
  const trimmed = href.trim();
  if (!trimmed || isExternalHref(trimmed)) {
    return false;
  }

  return trimmed.startsWith("/") || trimmed.startsWith("#");
}

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/+$/, "") || "/";
}

export function parseAppHref(href: string): ParsedAppHref | null {
  const trimmed = href.trim();
  if (!isAppHref(trimmed)) {
    return null;
  }

  if (trimmed.startsWith("#")) {
    return { pathname: null, hash: trimmed };
  }

  const hashIndex = trimmed.indexOf("#");
  const pathPart = hashIndex === -1 ? trimmed : trimmed.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : trimmed.slice(hashIndex);
  const pathOnly = pathPart.split("?")[0] ?? pathPart;

  return {
    pathname: normalizePathname(pathOnly),
    hash,
  };
}

export function isSameRouteHref(currentPathname: string, href: string): boolean {
  const parsed = parseAppHref(href);
  if (!parsed) {
    return false;
  }

  if (parsed.pathname === null) {
    return true;
  }

  return normalizePathname(currentPathname) === parsed.pathname;
}

function scrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? "auto" : "smooth";
}

export function scrollToNavTarget(target: ParsedAppHref): void {
  const behavior = scrollBehavior();

  if (target.hash) {
    const id = target.hash.slice(1);
    const element =
      typeof document !== "undefined" && id
        ? document.getElementById(id)
        : null;

    if (element) {
      element.scrollIntoView({ behavior, block: "start" });
      return;
    }
  }

  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior });
  }
}

export function handleSameRouteNavClick(
  event: SameRouteClickEvent,
  href: string,
  currentPathname: string,
): boolean {
  if (event.defaultPrevented) {
    return false;
  }

  if (event.button !== 0) {
    return false;
  }

  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return false;
  }

  if (!isSameRouteHref(currentPathname, href)) {
    return false;
  }

  const parsed = parseAppHref(href);
  if (!parsed) {
    return false;
  }

  event.preventDefault();
  scrollToNavTarget(parsed);
  return true;
}
