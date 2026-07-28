/**
 * Pure seed document shapes for Sanity `createOrReplace` mutations.
 * No network types — builders stay offline-testable.
 */

export type SanitySlug = {
  _type: "slug";
  current: string;
};

export type SanityReference = {
  _type: "reference";
  _ref: string;
  _key?: string;
};

export type SanitySeo = {
  title: string;
  description: string;
  noIndex?: boolean;
};

export type SanityPortableSpan = {
  _type: "span";
  _key: string;
  text: string;
  marks?: string[];
};

export type SanityPortableBlock = {
  _type: "block";
  _key: string;
  style?: string;
  children: SanityPortableSpan[];
  markDefs: Array<Record<string, unknown>>;
};

/** Base fields present on every seeded document. */
export type SeedDocumentBase = {
  _id: string;
  _type: string;
};

export type SeedDocument = SeedDocumentBase & Record<string, unknown>;
