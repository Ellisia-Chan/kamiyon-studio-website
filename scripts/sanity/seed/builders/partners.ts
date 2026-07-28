/**
 * Partner seed builders from static home placeholders (WS8d).
 * Source: lib/home/partner-placeholders.ts (read-only). No logos / media.
 */

import { PARTNER_PLACEHOLDERS } from "@/lib/home/partner-placeholders";
import type { PartnerPlaceholder } from "@/lib/home/partner-placeholders";

import { toSlug } from "../helpers";
import { partnerId } from "../ids";
import type { SeedDocument } from "../types";

/**
 * Build a partner document from a placeholder slot.
 * Stable ID: `partner-{placeholder.id}` (e.g. `partner-partner-1`).
 */
export function buildPartnerDocument(
  placeholder: PartnerPlaceholder,
  orderIndex: number,
): SeedDocument {
  return {
    _id: partnerId(placeholder.id),
    _type: "partner",
    label: placeholder.label,
    slug: toSlug(placeholder.id),
    order: orderIndex + 1,
    isPlaceholder: true,
  };
}

export function buildPartnerDocuments(
  source: readonly PartnerPlaceholder[] = PARTNER_PLACEHOLDERS,
): SeedDocument[] {
  return source.map((placeholder, index) =>
    buildPartnerDocument(placeholder, index),
  );
}
