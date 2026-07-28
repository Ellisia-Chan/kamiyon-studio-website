import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "serviceCategory" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "summary", title: "Summary", type: "text", validation: (r) => r.required() }),
    defineField({
      name: "body",
      title: "Body",
      type: "portableBody",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "outcomes",
      title: "Outcomes",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "relatedIndustries",
      title: "Related industries",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "icon", title: "Icon", type: "string" }),
    defineField({ name: "order", title: "Order", type: "number", validation: (r) => r.required() }),
    defineField({
      name: "isPlaceholder",
      title: "Placeholder",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoMetadata",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category.title" },
  },
});
