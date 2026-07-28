import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site name",
      type: "string",
      validation: (r) => r.required(),
      initialValue: "Kamiyon Studio",
    }),
    defineField({ name: "tagline", title: "Tagline", type: "text", validation: (r) => r.required() }),
    defineField({ name: "publicEmail", title: "Public email", type: "string" }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "seoMetadata",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "globalCtas",
      title: "Global CTAs",
      type: "array",
      of: [{ type: "cta" }],
    }),
    defineField({ name: "footerText", title: "Footer text", type: "text" }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
