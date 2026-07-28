import type { CaseStudy } from "@/lib/cms/types";

export const BENTO_LARGE_SLOT_COUNT = 2;
export const BENTO_SMALL_SLOT_COUNT = 6;
const BENTO_TOTAL_SLOTS = BENTO_LARGE_SLOT_COUNT + BENTO_SMALL_SLOT_COUNT;

type BentoSlot = CaseStudy | null;

export type BentoLayout = {
  large: BentoSlot[];
  small: BentoSlot[];
};

function sortForBento(caseStudies: CaseStudy[]): CaseStudy[] {
  return [...caseStudies].sort((left, right) => {
    if (left.featured === right.featured) {
      return 0;
    }

    return left.featured ? -1 : 1;
  });
}

function padSlots<T>(items: T[], length: number, filler: T): T[] {
  return Array.from({ length }, (_, index) => items[index] ?? filler);
}

export function partitionBentoLayout(caseStudies: CaseStudy[]): BentoLayout {
  const ordered = sortForBento(caseStudies).slice(0, BENTO_TOTAL_SLOTS);

  return {
    large: padSlots(ordered.slice(0, BENTO_LARGE_SLOT_COUNT), BENTO_LARGE_SLOT_COUNT, null),
    small: padSlots(
      ordered.slice(BENTO_LARGE_SLOT_COUNT, BENTO_TOTAL_SLOTS),
      BENTO_SMALL_SLOT_COUNT,
      null
    ),
  };
}
