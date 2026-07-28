import { defineField, defineType } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Internal name / accessible label (shown when no logo is set).",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "label", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first in the home partners marquee.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "r2Asset",
      description:
        "Partner logo or icon only. Displayed on the home marquee with no link or click action.",
    }),
    defineField({
      name: "isPlaceholder",
      title: "Placeholder",
      type: "boolean",
      description: "Turn off once a real partner logo is uploaded.",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "label", order: "order", isPlaceholder: "isPlaceholder" },
    prepare({ title, order, isPlaceholder }) {
      const bits = [
        typeof order === "number" ? `Order ${order}` : null,
        isPlaceholder ? "Placeholder" : "Logo slot",
      ].filter(Boolean);
      return {
        title: title || "Partner",
        subtitle: bits.join(" · "),
      };
    },
  },
});
