import {
  serviceCategoriesFallback,
  servicesFallback,
} from "@/lib/cms/fallbacks/services";
import type { Service, ServiceCategory } from "@/lib/cms/types";

import { toPortableBody, toReference, toSeo, toSlug } from "../helpers";
import { serviceCategoryId, serviceId } from "../ids";
import type { SeedDocument } from "../types";

export function buildServiceCategoryDocument(
  category: ServiceCategory
): SeedDocument {
  return {
    _id: serviceCategoryId(category.slug.current),
    _type: "serviceCategory",
    title: category.title,
    slug: toSlug(category.slug.current),
    description: category.description,
    order: category.order,
  };
}

export function buildServiceCategoryDocuments(
  source: ServiceCategory[] = serviceCategoriesFallback
): SeedDocument[] {
  return source.map(buildServiceCategoryDocument);
}

/**
 * Fallback uses `categorySlug` string; Sanity schema requires a `category` reference.
 */
export function buildServiceDocument(service: Service): SeedDocument {
  return {
    _id: serviceId(service.slug.current),
    _type: "service",
    title: service.title,
    slug: toSlug(service.slug.current),
    category: toReference(serviceCategoryId(service.categorySlug)),
    summary: service.summary,
    body: toPortableBody(service.body, `service-${service.slug.current}`),
    outcomes: [...service.outcomes],
    relatedIndustries: [...service.relatedIndustries],
    ...(service.icon ? { icon: service.icon } : {}),
    order: service.order,
    isPlaceholder: service.isPlaceholder,
    seo: toSeo(service.seo),
  };
}

export function buildServiceDocuments(
  source: Service[] = servicesFallback
): SeedDocument[] {
  return source.map(buildServiceDocument);
}
