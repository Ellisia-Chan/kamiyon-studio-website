import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const README_PATH = path.resolve(__dirname, "README.md");
const README_CONTENT = readFileSync(README_PATH, "utf-8");

const REPO_ACTIVITY_HEADING = "## Repo Activity";
const REPOBEATS_IMAGE_URL =
  "https://repobeats.axiom.co/api/embed/8301267181582ef80607a5531e63e4250c7f074f.svg";
const REPOBEATS_IMAGE_LINE = `![Alt](${REPOBEATS_IMAGE_URL} "Repobeats analytics image")`;

describe("README.md - Repo Activity section", () => {
  it("contains a 'Repo Activity' heading", () => {
    expect(README_CONTENT).toContain(REPO_ACTIVITY_HEADING);
  });

  it("declares the heading exactly once (no accidental duplication)", () => {
    const matches = README_CONTENT.match(/^## Repo Activity$/gm) ?? [];
    expect(matches).toHaveLength(1);
  });

  it("renders the Repobeats embed image immediately after the heading", () => {
    const headingIndex = README_CONTENT.indexOf(REPO_ACTIVITY_HEADING);
    expect(headingIndex).toBeGreaterThanOrEqual(0);

    const afterHeading = README_CONTENT.slice(
      headingIndex + REPO_ACTIVITY_HEADING.length,
    );
    const nextLine = afterHeading.split("\n").find((line) => line.trim() !== "");

    expect(nextLine?.trim()).toBe(REPOBEATS_IMAGE_LINE);
  });

  it("uses the expected Repobeats embed URL over HTTPS", () => {
    expect(README_CONTENT).toContain(REPOBEATS_IMAGE_URL);
    expect(REPOBEATS_IMAGE_URL.startsWith("https://")).toBe(true);
  });

  it("points at the repobeats.axiom.co embed API host", () => {
    const url = new URL(REPOBEATS_IMAGE_URL);
    expect(url.hostname).toBe("repobeats.axiom.co");
    expect(url.pathname).toMatch(/^\/api\/embed\/[0-9a-f]+\.svg$/);
  });

  it("includes descriptive alt and title text for the embed image", () => {
    const imageMarkdownPattern =
      /!\[(?<alt>[^\]]*)\]\((?<url>\S+)(?:\s+"(?<title>[^"]*)")?\)/;
    const match = README_CONTENT.match(imageMarkdownPattern);

    expect(match).not.toBeNull();
    expect(match?.groups?.alt).toBe("Alt");
    expect(match?.groups?.url).toBe(REPOBEATS_IMAGE_URL);
    expect(match?.groups?.title).toBe("Repobeats analytics image");
  });

  it("matches the exact expected markdown line (regression guard)", () => {
    expect(README_CONTENT).toContain(REPOBEATS_IMAGE_LINE);
  });

  it("places the Repo Activity section after Contributing and before the footer metadata", () => {
    const contributingIndex = README_CONTENT.indexOf("## Contributing");
    const repoActivityIndex = README_CONTENT.indexOf(REPO_ACTIVITY_HEADING);
    const lastUpdatedIndex = README_CONTENT.indexOf("**Last Updated:**");

    expect(contributingIndex).toBeGreaterThanOrEqual(0);
    expect(repoActivityIndex).toBeGreaterThan(contributingIndex);
    expect(lastUpdatedIndex).toBeGreaterThan(repoActivityIndex);
  });

  it("does not leave a stray heading with no following content", () => {
    const headingIndex = README_CONTENT.indexOf(REPO_ACTIVITY_HEADING);
    const restOfFile = README_CONTENT.slice(headingIndex);

    expect(restOfFile.length).toBeGreaterThan(REPO_ACTIVITY_HEADING.length);
    expect(restOfFile).toContain("![Alt]");
  });
});