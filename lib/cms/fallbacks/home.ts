import type { HomePage } from "../types";
import { INTERIM_CONTACT_FORM_URL } from "@/lib/contact/channels";

// Sources: docs/branding/messaging.md, docs/company/mission-vision.md, docs/company/overview.md
export const homePageFallback: HomePage = {
  _type: "homePage",
  title: "Home",
  blocks: [
    {
      _type: "hero",
      headline: "Meaningful interactive experiences, built with purpose.",
      subheadline:
        "Kamiyon Studio creates games, educational technologies, gamified platforms, and digital solutions that educate, inspire, and make a lasting impact.",
      ctaLabel: "Explore our services",
      ctaHref: "/services",
    },
    {
      _type: "mission",
      title: "Our mission",
      body: "We create games and interactive experiences that educate, inspire, and make a lasting impact.",
    },
    {
      _type: "featuredWork",
      title: "Featured work",
      body: "Original products and case studies will appear here as approved content is published.",
      featuredProductSlugs: ["eclipse", "vocabu-wildlife-edition"],
      featuredCaseStudySlugs: ["sample-client-project-placeholder"],
    },
    {
      _type: "highlights",
      title: "What we build",
      items: [
        {
          title: "Original games",
          description:
            "Original intellectual property designed around curiosity, craftsmanship, and long-term creative growth.",
        },
        {
          title: "Educational experiences",
          description:
            "Interactive learning products that make complex ideas more approachable and memorable.",
        },
        {
          title: "Creative technology",
          description:
            "Digital products that combine design, software, and emerging technologies when they serve the experience.",
        },
      ],
    },
    {
      _type: "ctaBanner",
      title: "Let’s build something meaningful.",
      body: "Tell us what you want to create, teach, or explore. We will help shape the right interactive experience around it.",
      ctaLabel: "Get in touch",
      ctaHref: INTERIM_CONTACT_FORM_URL,
    },
  ],
  seo: {
    title: "Kamiyon Studio",
    description:
      "Kamiyon Studio creates games and interactive experiences that educate, inspire, and make a lasting impact.",
  },
};
