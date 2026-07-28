import { siteSettingsFallback } from "@/lib/cms/fallbacks/site-settings";
import type { Cta, SiteSettings, SocialLink } from "@/lib/cms/types";

import { arrayKey, toSeo } from "../helpers";
import { SINGLETON_IDS } from "../ids";
import type { SeedDocument } from "../types";

function mapSocialLink(link: SocialLink, index: number) {
  return {
    _type: "socialLink",
    _key: arrayKey("social", index),
    platform: link.platform,
    url: link.url,
    label: link.label,
    ...(typeof link.isPlaceholder === "boolean"
      ? { isPlaceholder: link.isPlaceholder }
      : {}),
  };
}

function mapCta(cta: Cta, index: number) {
  return {
    _type: "cta",
    _key: arrayKey("cta", index),
    label: cta.label,
    href: cta.href,
    ...(cta.variant ? { variant: cta.variant } : {}),
  };
}

export function buildSiteSettingsDocument(
  source: SiteSettings = siteSettingsFallback
): SeedDocument {
  return {
    _id: SINGLETON_IDS.siteSettings,
    _type: "siteSettings",
    siteName: source.siteName,
    tagline: source.tagline,
    ...(source.publicEmail ? { publicEmail: source.publicEmail } : {}),
    socialLinks: source.socialLinks.map(mapSocialLink),
    defaultSeo: toSeo(source.defaultSeo),
    globalCtas: source.globalCtas.map(mapCta),
    ...(source.footerText ? { footerText: source.footerText } : {}),
  };
}
