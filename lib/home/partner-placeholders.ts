export type PartnerPlaceholder = {
  id: string;
  label: string;
  /** Allowlisted CDN URL when a partner logo is uploaded in Sanity. */
  logoUrl?: string | null;
  /** Accessible alt text for the logo image. */
  logoAlt?: string | null;
};

/** Static partner logo slots — never real client names. */
export const PARTNER_PLACEHOLDERS: PartnerPlaceholder[] = [
  { id: "partner-1", label: "Partner placeholder" },
  { id: "partner-2", label: "Partner placeholder" },
  { id: "partner-3", label: "Partner placeholder" },
  { id: "partner-4", label: "Partner placeholder" },
  { id: "partner-5", label: "Partner placeholder" },
  { id: "partner-6", label: "Partner placeholder" },
  { id: "partner-7", label: "Partner placeholder" },
];
