import type { ReactNode } from "react";

import { CinematicFooter } from "@/components/ui/motion-footer";
import { getSiteSettingsContent } from "@/lib/cms/site-settings-content";
import { buildShellNavProps } from "@/lib/site-settings/shell-props";

import { SiteHeader } from "./SiteHeader";

type PageShellProps = {
  children: ReactNode;
};

export async function PageShell({ children }: PageShellProps) {
  const shellProps = buildShellNavProps(await getSiteSettingsContent());

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-button)] focus:bg-[var(--bg-primary)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--text-primary)] focus:shadow-[var(--shadow-md)] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-sakura"
      >
        Skip to content
      </a>
      <div
        className="site-bg-grid pointer-events-none fixed inset-0 z-[20]"
        aria-hidden="true"
      />
      <SiteHeader
        navItems={shellProps.navItems}
        contactCta={shellProps.contactCta}
        siteName={shellProps.siteName}
        socialLinks={shellProps.socialLinks}
      />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 flex-1 bg-[var(--bg-primary)] outline-none"
      >
        {children}
      </main>
      <CinematicFooter
        navItems={shellProps.navItems}
        socialLinks={shellProps.socialLinks}
        siteName={shellProps.siteName}
        footerMotto={shellProps.footerMotto}
        contactCta={shellProps.contactCta}
      />
    </>
  );
}
