import { SameRouteLink } from "@/components/ui/SameRouteLink";
import { Container } from "@/components/ui/Container";
import type { AboutPage } from "@/lib/cms/types";
import { CONTACT_CTA } from "@/lib/config/navigation";

const QUICK_LINKS = [
  { label: "Our values", href: "#values" },
  { label: "Meet the team", href: "#team" },
  { label: "Contact us", href: CONTACT_CTA.href },
] as const;

type AboutHeroProps = {
  aboutPage: AboutPage;
};

export function AboutHero({ aboutPage }: AboutHeroProps) {
  return (
    <section className="bg-[var(--bg-primary)] py-16 md:py-24">
      <Container className="mx-auto max-w-[820px] text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-sakura-ink">
          About Kamiyon Studio
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
          {aboutPage.motto}
        </h1>
        <p className="mt-6 text-base text-[var(--text-secondary)] md:text-lg">
          {aboutPage.mission}
        </p>

        <nav
          aria-label="Quick links"
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {QUICK_LINKS.map((link) => (
            <SameRouteLink
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-sakura-ink focus-visible:outline-offset-2"
            >
              {link.label}
            </SameRouteLink>
          ))}
        </nav>
      </Container>
    </section>
  );
}
