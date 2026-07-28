import { describe, expect, it, vi } from "vitest";

import type { SanityClient } from "@sanity/client";

import { WRITE_TOKEN_ENV } from "./client";
import { parseSeedArgs, runSeed } from "./run";
import type { SeedDocument } from "./types";

const sampleDocs: SeedDocument[] = [
  { _id: "serviceCategory-a", _type: "serviceCategory", title: "A" },
  { _id: "homePage", _type: "homePage", title: "Home" },
];

describe("parseSeedArgs", () => {
  it("detects --dry-run and -n", () => {
    expect(parseSeedArgs([])).toEqual({ dryRun: false });
    expect(parseSeedArgs(["--dry-run"])).toEqual({ dryRun: true });
    expect(parseSeedArgs(["-n"])).toEqual({ dryRun: true });
  });
});

describe("runSeed", () => {
  it("dry-run logs planned ids/types and does not mutate", async () => {
    const logs: string[] = [];
    const createOrReplace = vi.fn();

    const result = await runSeed(
      { dryRun: true },
      {
        documents: () => sampleDocs,
        createOrReplace,
        log: (message) => {
          logs.push(message);
        },
        resolveToken: () => undefined,
      },
    );

    expect(result.dryRun).toBe(true);
    expect(result.upserted).toBe(0);
    expect(result.planned).toEqual([
      { _id: "serviceCategory-a", _type: "serviceCategory" },
      { _id: "homePage", _type: "homePage" },
    ]);
    expect(createOrReplace).not.toHaveBeenCalled();
    expect(logs.some((line) => line.includes("serviceCategory-a"))).toBe(true);
    expect(logs.some((line) => line.includes("dry-run"))).toBe(true);
  });

  it("live run fails when write token is missing", async () => {
    await expect(
      runSeed(
        { dryRun: false },
        {
          documents: () => sampleDocs,
          resolveToken: () => undefined,
          log: () => undefined,
        },
      ),
    ).rejects.toThrow(WRITE_TOKEN_ENV);
  });

  it("live run createOrReplace in document order", async () => {
    const calls: string[] = [];
    const client = {} as SanityClient;

    const result = await runSeed(
      { dryRun: false },
      {
        documents: () => sampleDocs,
        resolveToken: () => "test-write-token",
        createClient: () => client,
        createOrReplace: async (_client, doc) => {
          calls.push(doc._id);
        },
        log: () => undefined,
      },
    );

    expect(result.upserted).toBe(2);
    expect(calls).toEqual(["serviceCategory-a", "homePage"]);
  });
});
