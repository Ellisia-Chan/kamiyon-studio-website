/**
 * Seed runner: dry-run planning or ordered createOrReplace (WS8d).
 */

import type { SanityClient } from "@sanity/client";

import { dataset, projectId } from "@/sanity/env";

import { buildAllSeedDocuments } from "./builders";
import { createSeedWriteClient, resolveWriteToken, WRITE_TOKEN_ENV } from "./client";
import type { SeedDocument } from "./types";

export type SeedCliOptions = {
  dryRun: boolean;
};

export type SeedRunResult = {
  dryRun: boolean;
  projectId: string;
  dataset: string;
  planned: Array<{ _id: string; _type: string }>;
  upserted: number;
};

export type SeedRunDeps = {
  createClient?: () => SanityClient;
  createOrReplace?: (
    client: SanityClient,
    doc: SeedDocument,
  ) => Promise<unknown>;
  log?: (message: string) => void;
  resolveToken?: () => string | undefined;
  documents?: () => SeedDocument[];
};

function defaultCreateOrReplace(
  client: SanityClient,
  doc: SeedDocument,
): Promise<unknown> {
  return client.createOrReplace(doc);
}

/** Parse CLI argv for `--dry-run` (and aliases). */
export function parseSeedArgs(argv: string[]): SeedCliOptions {
  const flags = new Set(argv);
  return {
    dryRun: flags.has("--dry-run") || flags.has("-n"),
  };
}

export function summarizeDocuments(
  docs: SeedDocument[],
): Array<{ _id: string; _type: string }> {
  return docs.map((doc) => ({
    _id: doc._id,
    _type: doc._type,
  }));
}

/**
 * Run seed: dry-run prints planned IDs/types; live run upserts in builder order.
 * Throws (caller exits non-zero) when write token is missing on a live run.
 */
export async function runSeed(
  options: SeedCliOptions,
  deps: SeedRunDeps = {},
): Promise<SeedRunResult> {
  const log = deps.log ?? console.log;
  const resolveToken = deps.resolveToken ?? resolveWriteToken;
  const documents = deps.documents ?? buildAllSeedDocuments;
  const docs = documents();
  const planned = summarizeDocuments(docs);

  log(
    `[sanity:seed] project=${projectId} dataset=${dataset} docs=${docs.length}`,
  );

  if (options.dryRun) {
    log("[sanity:seed] dry-run — no mutations");
    for (const item of planned) {
      log(`  ${item._id}\t${item._type}`);
    }
    log(`[sanity:seed] planned ${planned.length} documents`);
    return {
      dryRun: true,
      projectId,
      dataset,
      planned,
      upserted: 0,
    };
  }

  const token = resolveToken();
  if (!token) {
    throw new Error(
      `Missing ${WRITE_TOKEN_ENV}. Refusing to mutate dataset "${dataset}". Re-run with --dry-run or set a write token.`,
    );
  }

  const client = (deps.createClient ?? (() => createSeedWriteClient({ token })))();
  const createOrReplace = deps.createOrReplace ?? defaultCreateOrReplace;

  log("[sanity:seed] upserting via createOrReplace…");
  let upserted = 0;
  for (const doc of docs) {
    await createOrReplace(client, doc);
    upserted += 1;
    log(`  ✓ ${doc._id}\t${doc._type}`);
  }

  log(`[sanity:seed] upserted ${upserted} documents`);
  return {
    dryRun: false,
    projectId,
    dataset,
    planned,
    upserted,
  };
}
