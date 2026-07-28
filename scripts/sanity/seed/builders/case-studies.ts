import { caseStudiesFallback } from "@/lib/cms/fallbacks/portfolio";
import type { CaseStudy } from "@/lib/cms/types";

import { toSeo, toSlug } from "../helpers";
import { caseStudyId } from "../ids";
import type { SeedDocument } from "../types";

export function buildCaseStudyDocument(caseStudy: CaseStudy): SeedDocument {
  // Skip media: coverImage omitted; gallery left empty.
  return {
    _id: caseStudyId(caseStudy.slug.current),
    _type: "caseStudy",
    title: caseStudy.title,
    slug: toSlug(caseStudy.slug.current),
    clientName: caseStudy.clientName,
    industry: caseStudy.industry,
    challenge: caseStudy.challenge,
    solution: caseStudy.solution,
    impact: caseStudy.impact,
    ...(caseStudy.lessonsLearned
      ? { lessonsLearned: caseStudy.lessonsLearned }
      : {}),
    gallery: [],
    featured: caseStudy.featured,
    isPlaceholder: caseStudy.isPlaceholder,
    ...(caseStudy.publishedAt ? { publishedAt: caseStudy.publishedAt } : {}),
    seo: toSeo(caseStudy.seo),
  };
}

export function buildCaseStudyDocuments(
  source: CaseStudy[] = caseStudiesFallback
): SeedDocument[] {
  return source.map(buildCaseStudyDocument);
}
