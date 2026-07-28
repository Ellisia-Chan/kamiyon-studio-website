import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CONTACT_CTA } from "@/lib/config/navigation";
import { getDevelopmentStatusLabel } from "@/lib/products/development-status";
import type { Product } from "@/lib/cms/types";
import { ProductMedia } from "./ProductMedia";

type ProductDetailProps = {
  product: Product;
};

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <section className="bg-[var(--bg-primary)] py-16 md:py-24">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-wide text-sakura-ink">
          {product.genre}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            {product.title}
          </h1>
          <Badge variant="info">{getDevelopmentStatusLabel(product.developmentStatus)}</Badge>
        </div>
        <p className="mt-4 max-w-[680px] text-base text-[var(--text-secondary)] md:text-lg">
          {product.tagline}
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-10">
            <ProductMedia media={product.media} trailerUrl={product.trailerUrl} />

            <div>
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                Overview
              </h2>
              <p className="mt-3 text-base text-[var(--text-secondary)]">
                {product.overview}
              </p>
            </div>

            {product.features.length > 0 ? (
              <div>
                <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                  Key features
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-[var(--text-primary)]">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span aria-hidden="true" className="mt-0.5 text-sakura-ink">
                        ✦
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <aside className="rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-sm)]">
            {product.goals.length > 0 ? (
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  Project goals
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-[var(--text-primary)]">
                  {product.goals.map((goal) => (
                    <li key={goal} className="flex items-start gap-2">
                      <span aria-hidden="true" className="mt-0.5 text-sakura-ink">
                        ✦
                      </span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {product.platforms.length > 0 ? (
              <div className="mt-6">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  Platforms
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="rounded-[var(--radius-pill)] border border-[var(--border-default)] bg-[var(--bg-secondary)] px-3 py-1 text-xs text-[var(--text-secondary)]"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <Button href={CONTACT_CTA.href} variant="primary" className="mt-6 w-full">
              Interested in this project?
            </Button>
          </aside>
        </div>
      </Container>
    </section>
  );
}
