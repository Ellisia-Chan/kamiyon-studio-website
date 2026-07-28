import { isSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";

type FetchParams = Record<string, string | number | boolean | undefined>;

export type SanityFetchOptions = {
  /** Cache tags for on-demand revalidation (Phase E webhooks). */
  tags?: string[];
  /** Time-based revalidation in seconds. */
  revalidate?: number | false;
};

/**
 * Safe Sanity fetch: returns null when unset, empty, or on error so fallbacks stay green.
 */
export async function safeSanityFetch<T>(
  query: string,
  params: FetchParams = {},
  options: SanityFetchOptions = {},
): Promise<T | null> {
  if (!isSanityConfigured()) {
    return null;
  }

  const { tags = ["sanity"], revalidate = 60 } = options;

  try {
    const result = await client.fetch<T | null>(query, params, {
      next: { tags, revalidate },
    });
    return result ?? null;
  } catch (error) {
    console.error("[cms] Sanity fetch failed", {
      message: error instanceof Error ? error.message : "unknown error",
    });
    return null;
  }
}
