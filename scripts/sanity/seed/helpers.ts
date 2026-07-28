import type { PortableTextBlock, SeoMetadata } from "@/lib/cms/types";

import type {
  SanityPortableBlock,
  SanityPortableSpan,
  SanityReference,
  SanitySeo,
  SanitySlug,
} from "./types";

/** Deterministic array `_key` for idempotent createOrReplace docs. */
export function arrayKey(prefix: string, index: number): string {
  return `${prefix}-${index}`;
}

export function toSlug(current: string): SanitySlug {
  return { _type: "slug", current };
}

export function toReference(ref: string, key?: string): SanityReference {
  return key
    ? { _type: "reference", _ref: ref, _key: key }
    : { _type: "reference", _ref: ref };
}

/** Map CMS SEO; omit media (`ogImage`). */
export function toSeo(seo: SeoMetadata): SanitySeo {
  const result: SanitySeo = {
    title: seo.title,
    description: seo.description,
  };
  if (typeof seo.noIndex === "boolean") {
    return { ...result, noIndex: seo.noIndex };
  }
  return result;
}

/** Assign stable `_key`s to portable-text blocks/spans from fallbacks. */
export function toPortableBody(
  blocks: PortableTextBlock[],
  prefix = "block"
): SanityPortableBlock[] {
  return blocks.map((block, blockIndex) => {
    const children: SanityPortableSpan[] = block.children.map((child, childIndex) => {
      const span: SanityPortableSpan = {
        _type: "span",
        _key: arrayKey(`${prefix}-span-${blockIndex}`, childIndex),
        text: child.text,
      };
      if (child.marks && child.marks.length > 0) {
        return { ...span, marks: [...child.marks] };
      }
      return span;
    });

    return {
      _type: "block",
      _key: arrayKey(prefix, blockIndex),
      style: block.style ?? "normal",
      children,
      markDefs: block.markDefs ? [...block.markDefs] : [],
    };
  });
}
