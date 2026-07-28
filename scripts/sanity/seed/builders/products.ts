import { productsFallback } from "@/lib/cms/fallbacks/products";
import type { Product } from "@/lib/cms/types";

import { toSeo, toSlug } from "../helpers";
import { productId } from "../ids";
import type { SeedDocument } from "../types";

export function buildProductDocument(product: Product): SeedDocument {
  // Skip media: product.media intentionally empty (no r2Asset uploads in seed).
  return {
    _id: productId(product.slug.current),
    _type: "product",
    title: product.title,
    slug: toSlug(product.slug.current),
    tagline: product.tagline,
    genre: product.genre,
    status: product.status,
    developmentStatus: product.developmentStatus,
    overview: product.overview,
    goals: [...product.goals],
    features: [...product.features],
    platforms: [...product.platforms],
    media: [],
    ...(product.trailerUrl ? { trailerUrl: product.trailerUrl } : {}),
    isPlaceholder: product.isPlaceholder,
    order: product.order,
    seo: toSeo(product.seo),
  };
}

export function buildProductDocuments(
  source: Product[] = productsFallback
): SeedDocument[] {
  return source.map(buildProductDocument);
}
