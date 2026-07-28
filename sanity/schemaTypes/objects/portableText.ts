import { defineArrayMember, defineType } from "sanity";

/** Minimal portable text for marketing pages (matches site renderer subset). */
export const portableBody = defineType({
  name: "portableBody",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [],
      },
      lists: [],
    }),
  ],
});

/** Expanded portable text for blog posts. */
export const blogBody = defineType({
  name: "blogBody",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (rule) =>
                  rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
              },
            ],
          },
        ],
      },
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
    }),
    defineArrayMember({
      type: "object",
      name: "inlineImage",
      title: "Image",
      fields: [
        { name: "asset", title: "Image", type: "r2Asset", validation: (r) => r.required() },
      ],
      preview: {
        select: { alt: "asset.alt" },
        prepare: ({ alt }) => ({ title: alt ?? "Inline image" }),
      },
    }),
  ],
});
