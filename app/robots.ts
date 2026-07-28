import type { MetadataRoute } from "next";

import { buildRobotsPolicy } from "@/lib/seo/robots-policy";
import { SITE_URL } from "@/lib/seo/site-url";

/**
 * Must live at `app/robots.ts` (app root). Next.js does not register
 * `robots.ts` inside route groups — unlike `sitemap.ts`.
 */
export default function robots(): MetadataRoute.Robots {
  return buildRobotsPolicy(SITE_URL, process.env.APP_ENV);
}
