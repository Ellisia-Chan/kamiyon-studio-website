import { safeSanityFetch } from "./fetch";
import {
  aboutPageQuery,
  caseStudiesQuery,
  caseStudyBySlugQuery,
  communityItemsQuery,
  contactPageQuery,
  homePageQuery,
  partnersQuery,
  postBySlugQuery,
  postsQuery,
  productBySlugQuery,
  productsQuery,
  serviceBySlugQuery,
  serviceCategoriesQuery,
  servicesQuery,
  siteSettingsQuery,
  teamMembersQuery,
} from "./groq";
import {
  mapAboutPage,
  mapCaseStudy,
  mapCollection,
  mapCommunityItem,
  mapContactPage,
  mapHomePage,
  mapPartner,
  mapPost,
  mapProduct,
  mapService,
  mapServiceCategory,
  mapSiteSettings,
  mapTeamMember,
} from "./mappers";
import type {
  AboutPage,
  CaseStudy,
  CommunityItem,
  ContactPage,
  HomePage,
  Partner,
  Post,
  Product,
  Service,
  ServiceCategory,
  SiteSettings,
  TeamMember,
} from "./types";

/**
 * CMS query layer — Sanity + GROQ with typed fallbacks.
 * Returns null when Sanity is unset, empty, or errors so pages keep using resolveWithFallback().
 */

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return mapSiteSettings(await safeSanityFetch(siteSettingsQuery, {}, { tags: ["sanity", "siteSettings"] }));
}

export async function getHomePage(): Promise<HomePage | null> {
  return mapHomePage(await safeSanityFetch(homePageQuery, {}, { tags: ["sanity", "homePage"] }));
}

export async function getAboutPage(): Promise<AboutPage | null> {
  return mapAboutPage(await safeSanityFetch(aboutPageQuery, {}, { tags: ["sanity", "aboutPage"] }));
}

export async function getContactPage(): Promise<ContactPage | null> {
  return mapContactPage(
    await safeSanityFetch(contactPageQuery, {}, { tags: ["sanity", "contactPage"] }),
  );
}

export async function getTeamMembers(): Promise<TeamMember[] | null> {
  return mapCollection(
    await safeSanityFetch(teamMembersQuery, {}, { tags: ["sanity", "teamMember"] }),
    mapTeamMember,
  );
}

export async function getServiceCategories(): Promise<ServiceCategory[] | null> {
  return mapCollection(
    await safeSanityFetch(serviceCategoriesQuery, {}, { tags: ["sanity", "serviceCategory"] }),
    mapServiceCategory,
  );
}

export async function getServices(): Promise<Service[] | null> {
  return mapCollection(
    await safeSanityFetch(servicesQuery, {}, { tags: ["sanity", "service"] }),
    mapService,
  );
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return mapService(
    await safeSanityFetch(serviceBySlugQuery, { slug }, { tags: ["sanity", "service", `service:${slug}`] }),
  );
}

export async function getProducts(): Promise<Product[] | null> {
  return mapCollection(
    await safeSanityFetch(productsQuery, {}, { tags: ["sanity", "product"] }),
    mapProduct,
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return mapProduct(
    await safeSanityFetch(productBySlugQuery, { slug }, { tags: ["sanity", "product", `product:${slug}`] }),
  );
}

export async function getCaseStudies(): Promise<CaseStudy[] | null> {
  return mapCollection(
    await safeSanityFetch(caseStudiesQuery, {}, { tags: ["sanity", "caseStudy"] }),
    mapCaseStudy,
  );
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  return mapCaseStudy(
    await safeSanityFetch(
      caseStudyBySlugQuery,
      { slug },
      { tags: ["sanity", "caseStudy", `caseStudy:${slug}`] },
    ),
  );
}

export async function getCommunityItems(): Promise<CommunityItem[] | null> {
  return mapCollection(
    await safeSanityFetch(communityItemsQuery, {}, { tags: ["sanity", "communityItem"] }),
    mapCommunityItem,
  );
}

export async function getPartners(): Promise<Partner[] | null> {
  return mapCollection(
    await safeSanityFetch(partnersQuery, {}, { tags: ["sanity", "partner"] }),
    mapPartner,
  );
}

export async function getPosts(): Promise<Post[] | null> {
  return mapCollection(
    await safeSanityFetch(postsQuery, {}, { tags: ["sanity", "post"] }),
    mapPost,
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return mapPost(
    await safeSanityFetch(postBySlugQuery, { slug }, { tags: ["sanity", "post", `post:${slug}`] }),
  );
}
