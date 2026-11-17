import { describe, expect, it } from "vitest";
import {
  IKIGAI9_ITEMS,
  isIkigai9Answers,
  scoreIkigai9,
} from "../src/state/ikigai9";

const all = (v: number) =>
  Object.fromEntries(IKIGAI9_ITEMS.map((i) => [i.id, v]));

describe("scoreIkigai9", () => {
  it("sums subscales correctly (emotional 1,4,7 / growth 2,5,8 / contribution 3,6,9)", () => {
    const answers = {
      q1: 4, q4: 2, q7: 3, // emotional = 9
      q2: 1, q5: 0, q8: 2, // growth = 3
      q3: 4, q6: 4, q9: 3, // contribution = 11
    };
    expect(scoreIkigai9(answers)).toEqual({
      emotional: 9,
      growth: 3,
      contribution: 11,
      total: 23,
    });
  });

  it("ranges 0..36", () => {
    expect(scoreIkigai9(all(0)).total).toBe(0);
    expect(scoreIkigai9(all(4)).total).toBe(36);
  });

  it("treats missing items as 0", () => {
    expect(scoreIkigai9({ q1: 4 }).total).toBe(4);
  });
});

describe("isIkigai9Answers", () => {
  it("accepts complete 0-4 answers", () => {
    expect(isIkigai9Answers(all(3))).toBe(true);
  });

  it("rejects out-of-range, non-integer, and incomplete answers", () => {
    expect(isIkigai9Answers({ q1: 5 })).toBe(false);
    expect(isIkigai9Answers(all(-1))).toBe(false);
    const partial = all(2) as Record<string, number>;
    delete partial.q9;
    expect(isIkigai9Answers(partial)).toBe(false);
    expect(isIkigai9Answers(null)).toBe(false);
    expect(isIkigai9Answers("nope")).toBe(false);
  });
});
