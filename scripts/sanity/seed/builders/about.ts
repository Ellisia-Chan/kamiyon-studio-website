import { aboutPageFallback } from "@/lib/cms/fallbacks/about";
import type { AboutPage } from "@/lib/cms/types";

import { arrayKey, toSeo } from "../helpers";
import { SINGLETON_IDS } from "../ids";
import type { SeedDocument } from "../types";

export function buildAboutPageDocument(
  source: AboutPage = aboutPageFallback
): SeedDocument {
  return {
    _id: SINGLETON_IDS.aboutPage,
    _type: "aboutPage",
    title: source.title,
    storySections: source.storySections.map((section, index) => ({
      _type: "storySection",
      _key: arrayKey("story", index),
      title: section.title,
      body: section.body,
    })),
    mission: source.mission,
    vision: source.vision,
    motto: source.motto,
    values: source.values.map((value, index) => ({
      _type: "coreValue",
      _key: arrayKey("value", index),
      name: value.name,
      description: value.description,
    })),
    cultureSummary: source.cultureSummary,
    ...(source.teamIntro ? { teamIntro: source.teamIntro } : {}),
    seo: toSeo(source.seo),
  };
}
