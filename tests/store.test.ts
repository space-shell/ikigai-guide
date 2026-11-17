import { beforeEach, describe, expect, it } from "vitest";
import {
  completeStep,
  firstIncompleteStep,
  isStepComplete,
  journeyProgress,
  resetJourney,
  stageComplete,
  stageUnlocked,
  importJson,
  exportJson,
} from "../src/state/store";
import { STAGES } from "../src/content/journey";
import { stepId } from "../src/content/schema";

// Stage 0 is fully defined; later stages are structural placeholders (M2+).
const stage0Steps = STAGES[0]!.steps.length;

describe("journey store", () => {
  beforeEach(() => resetJourney());

  it("starts with nothing complete and stage 0 unlocked", () => {
    expect(journeyProgress()).toEqual({ done: 0, total: STAGES.reduce((n, s) => n + s.steps.length, 0) });
    expect(stageUnlocked(0)).toBe(true);
    expect(stageUnlocked(1)).toBe(false);
  });

  it("completing steps updates progress and gating", () => {
    completeStep(stepId(0, 0));
    expect(isStepComplete(stepId(0, 0))).toBe(true);
    expect(journeyProgress().done).toBe(1);
    expect(stageUnlocked(1)).toBe(false);

    for (let i = 0; i < stage0Steps; i++) completeStep(stepId(0, i));
    expect(stageComplete(0)).toBe(true);
    expect(stageUnlocked(1)).toBe(true);
    expect(stageUnlocked(2)).toBe(false);
  });

  it("firstIncompleteStep finds the first gap and restarts at 0 when done", () => {
    expect(firstIncompleteStep(0)).toBe(0);
    completeStep(stepId(0, 0));
    completeStep(stepId(0, 1));
    expect(firstIncompleteStep(0)).toBe(2);
    for (let i = 0; i < stage0Steps; i++) completeStep(stepId(0, i));
    expect(firstIncompleteStep(0)).toBe(0);
  });

  it("export/import round-trips through the store", () => {
    completeStep(stepId(0, 0), { why: "testing" });
    const json = exportJson();
    resetJourney();
    expect(journeyProgress().done).toBe(0);
    expect(importJson(json)).toBe(true);
    expect(isStepComplete(stepId(0, 0))).toBe(true);
    expect(exportJson()).toBe(json);
  });

  it("importJson rejects invalid payloads without touching state", () => {
    completeStep(stepId(0, 0));
    expect(importJson("garbage")).toBe(false);
    expect(importJson(JSON.stringify({ version: 42 }))).toBe(false);
    expect(journeyProgress().done).toBe(1);
  });
});
