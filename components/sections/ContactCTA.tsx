import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SameRouteLink } from "@/components/ui/SameRouteLink";
import type { HomeCtaBanner } from "@/lib/cms/types";

type ContactCTAProps = {
  ctaBanner: HomeCtaBanner;
};

export function ContactCTA({ ctaBanner }: ContactCTAProps) {
  return (
    <section className="bg-[var(--bg-accent)] py-16 md:py-24">
      <Container className="text-center">
        <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
          {ctaBanner.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[680px] text-base text-[var(--text-secondary)] md:text-lg">
          {ctaBanner.body}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={ctaBanner.ctaHref} variant="primary">
            {ctaBanner.ctaLabel}
          </Button>
          <SameRouteLink
            href="/portfolio"
            className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-sakura-ink focus-visible:outline-offset-2"
          >
            View our work
          </SameRouteLink>
        </div>
      </Container>
    </section>
  );
}
