import { contactPageFallback } from "@/lib/cms/fallbacks/contact";
import type { ContactPage } from "@/lib/cms/types";

import { arrayKey, toSeo } from "../helpers";
import { SINGLETON_IDS } from "../ids";
import type { SeedDocument } from "../types";

export function buildContactPageDocument(
  source: ContactPage = contactPageFallback
): SeedDocument {
  return {
    _id: SINGLETON_IDS.contactPage,
    _type: "contactPage",
    headline: source.headline,
    intro: source.intro,
    channels: source.channels.map((channel, index) => ({
      _type: "contactChannel",
      _key: arrayKey("channel", index),
      type: channel.type,
      label: channel.label,
      value: channel.value,
      ...(typeof channel.isPlaceholder === "boolean"
        ? { isPlaceholder: channel.isPlaceholder }
        : {}),
    })),
    ...(source.ctaNote ? { ctaNote: source.ctaNote } : {}),
    faq: source.faq.map((item, index) => ({
      _type: "faqItem",
      _key: arrayKey("faq", index),
      question: item.question,
      answer: item.answer,
    })),
    seo: toSeo(source.seo),
  };
}
