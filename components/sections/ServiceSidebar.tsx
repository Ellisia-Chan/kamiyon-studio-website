import { Button } from "@/components/ui/Button";
import type { Service } from "@/lib/cms/types";
import { CONTACT_CTA } from "@/lib/config/navigation";

type ServiceSidebarProps = {
  service: Service;
};

export function ServiceSidebar({ service }: ServiceSidebarProps) {
  return (
    <aside className="rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-sm)]">
      {service.outcomes.length > 0 ? (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
            What you gain
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-[var(--text-primary)]">
            {service.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-0.5 text-sakura-ink">
                  ✦
                </span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {service.relatedIndustries.length > 0 ? (
        <div className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
            Related industries
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {service.relatedIndustries.map((industry) => (
              <span
                key={industry}
                className="rounded-[var(--radius-pill)] border border-[var(--border-default)] bg-[var(--bg-secondary)] px-3 py-1 text-xs text-[var(--text-secondary)]"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <Button href={CONTACT_CTA.href} variant="primary" className="mt-6 w-full">
        Discuss this service
      </Button>
    </aside>
  );
}
