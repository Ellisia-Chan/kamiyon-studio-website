import { defineArrayMember, defineField, defineType } from "sanity";

import { homeBlockTypes } from "../objects/homeBlocks";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "blocks",
      title: "Blocks",
      type: "array",
      of: homeBlockTypes.map((block) => defineArrayMember({ type: block.name })),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoMetadata",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});
