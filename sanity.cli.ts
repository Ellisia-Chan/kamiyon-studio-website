/**
 * Sanity CLI — `pnpm sanity:deploy` / `pnpm sanity schema extract`
 * https://www.sanity.io/docs/cli
 */
import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const studioHost =
  process.env.SANITY_STUDIO_HOSTNAME?.trim() || "kamiyon";

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost,
  deployment: {
    // Fresh app from 2026-07-23 redeploy (old c08yt7… returned Studio not found)
    appId: "ig6pezs5vd2h9wa9isi4io79",
  },
});
