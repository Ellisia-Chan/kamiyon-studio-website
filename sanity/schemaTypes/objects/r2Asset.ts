import { defineField, defineType } from "sanity";

import { R2AssetInput } from "../../components/r2AssetInput";

/** Structured R2 media reference — no binary stored in Sanity. */
export const r2Asset = defineType({
  name: "r2Asset",
  title: "R2 Media",
  type: "object",
  components: {
    input: R2AssetInput,
  },
  fields: [
    defineField({
      name: "key",
      title: "R2 object key",
      type: "string",
      description: "Object key in the R2 bucket (Phase E upload flow).",
    }),
    defineField({
      name: "url",
      title: "Public URL",
      type: "url",
      description: "CDN URL for the asset.",
    }),
    defineField({ name: "alt", title: "Alt text", type: "string" }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({ name: "mimeType", title: "MIME type", type: "string" }),
    defineField({ name: "width", title: "Width", type: "number" }),
    defineField({ name: "height", title: "Height", type: "number" }),
  ],
});
