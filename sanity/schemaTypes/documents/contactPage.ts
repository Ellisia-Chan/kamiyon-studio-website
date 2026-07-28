import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string", validation: (r) => r.required() }),
    defineField({ name: "intro", title: "Intro", type: "text", validation: (r) => r.required() }),
    defineField({
      name: "channels",
      title: "Channels",
      type: "array",
      of: [{ type: "contactChannel" }],
    }),
    defineField({ name: "ctaNote", title: "CTA note", type: "text" }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [{ type: "faqItem" }],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoMetadata",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Contact Page" }),
  },
});
