import { describe, expect, it } from "vitest";

import {
  FACEBOOK_PAGE_URL,
  INTERIM_CONTACT_FORM_URL,
  ITCH_URL,
  LINKEDIN_COMPANY_URL,
  PUBLIC_EMAIL,
  YOUTUBE_URL,
  X_URL,
  contactChannels,
  socialLinks,
} from "./channels";

describe("contact channels", () => {
  it("exposes operator-provided public contact values", () => {
    expect(PUBLIC_EMAIL).toBe("kamiyonstudio@gmail.com");
    expect(FACEBOOK_PAGE_URL).toBe("https://www.facebook.com/kamiyonstudio");
    expect(LINKEDIN_COMPANY_URL).toBe(
      "https://www.linkedin.com/company/105066188/"
    );
    expect(ITCH_URL).toBe("https://kamiyon-studio.itch.io/");
    expect(YOUTUBE_URL).toBe("https://youtube.com/@kamiyonstudio");
    expect(X_URL).toBe("https://x.com/kamiyonstudio");
    expect(INTERIM_CONTACT_FORM_URL).toBe(
      "https://docs.google.com/forms/d/e/1FAIpQLSeIefAWJu5FP9pwljLFz1wSUxU2ybR3--GdylUYUBsGHH0yaw/viewform",
    );
  });

  it("builds live contact channels (not placeholders)", () => {
    expect(contactChannels.every((channel) => channel.isPlaceholder === false)).toBe(
      true
    );
    expect(contactChannels.map((channel) => channel.value)).toEqual([
      FACEBOOK_PAGE_URL,
      LINKEDIN_COMPANY_URL,
      ITCH_URL,
      YOUTUBE_URL,
      X_URL,
      PUBLIC_EMAIL,
    ]);
  });

  it("builds live social links with mailto for email", () => {
    expect(socialLinks.every((link) => link.isPlaceholder === false)).toBe(true);
    expect(socialLinks.map((link) => link.url)).toEqual([
      FACEBOOK_PAGE_URL,
      LINKEDIN_COMPANY_URL,
      ITCH_URL,
      YOUTUBE_URL,
      X_URL,
      `mailto:${PUBLIC_EMAIL}`,
    ]);
  });

  it("uses a public LinkedIn company path, not the admin dashboard", () => {
    expect(LINKEDIN_COMPANY_URL).not.toContain("/admin/");
  });
});
