// Reactive journey store: Solid store over JourneyState with debounced
// localStorage persistence and derived progress helpers. Journey logic that
// must be unit-testable lives in persistence.ts and progress.ts.

import { batch, createEffect, createMemo, createRoot, untrack } from "solid-js";
import { createStore } from "solid-js/store";
import * as P from "./persistence";
import { STAGES } from "../content/journey";
import { stepId } from "../content/schema";
import type { Ikigai9Answers } from "./ikigai9";

function defaultStorage(): Storage | null {
  try {
    return typeof window !== "undefined" ? window.localStorage : null;
  } catch {
    return null; // storage disabled (privacy mode etc.) — journey still works, unsaved
  }
}

const [state, setState] = createStore<P.JourneyState>(
  P.loadState(defaultStorage() ?? memoryStorage()) ?? P.emptyState(),
);

// Fallback so the app runs (without saving) when storage is unavailable.
function memoryStorage(): Pick<Storage, "getItem"> {
  return { getItem: () => null };
}

let saveTimer: ReturnType<typeof setTimeout> | undefined;
let dirty = false;

function scheduleSave() {
  const storage = defaultStorage();
  if (!storage) return;
  dirty = true;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    dirty = false;
    P.saveState(storage, untrack(() => state));
  }, 300);
}

// Durability: a user completing a step and closing the tab within the
// debounce window must not lose that step.
if (typeof window !== "undefined") {
  window.addEventListener("pagehide", () => {
    const storage = defaultStorage();
    if (storage && dirty) {
      dirty = false;
      P.saveState(storage, untrack(() => state));
    }
  });
}

// A deliberate never-disposed root: this store is an app-wide singleton.
createRoot(() => {
  createEffect(() => {
    // touch reactive fields so edits trigger the save
    void state.updatedAt;
    void state.steps;
    void state.answers;
    void state.baseline;
    void state.retest;
    scheduleSave();
  });
});

export { state as journey };

export function isStepComplete(id: string): boolean {
  return id in state.steps;
}

export function completeStep(id: string, answer?: unknown) {
  batch(() => {
    setState("steps", id, new Date().toISOString());
    if (answer !== undefined) setState("answers", id, answer);
    setState("updatedAt", new Date().toISOString());
  });
}

export function saveAnswer(id: string, answer: unknown) {
  setState("answers", id, answer);
}

export function answerFor<T>(id: string): T | undefined {
  return state.answers[id] as T | undefined;
}

export function setBaseline(answers: Ikigai9Answers) {
  setState("baseline", answers);
}

export function setRetest(answers: Ikigai9Answers) {
  setState("retest", answers);
}

export function resetJourney() {
  const fresh = P.emptyState();
  setState(fresh);
  const storage = defaultStorage();
  if (storage) P.clearState(storage);
}

export function exportJson(): string {
  return P.serializeState(untrack(() => state));
}

/** Returns true when the imported state replaced the current one. */
export function importJson(raw: string): boolean {
  const parsed = P.parseState(raw);
  if (!parsed) return false;
  const storage = defaultStorage();
  if (storage) P.clearState(storage);
  setState(parsed);
  scheduleSave();
  return true;
}

// ---- derived progress ----

export function stageCompletion(stageIndex: number) {
  return createMemo(() => {
    const stage = STAGES[stageIndex];
    if (!stage) return { done: 0, total: 0 };
    let done = 0;
    for (let i = 0; i < stage.steps.length; i++) {
      if (isStepComplete(stepId(stage.id, i))) done++;
    }
    return { done, total: stage.steps.length };
  });
}

export function stageComplete(stageIndex: number): boolean {
  const stage = STAGES[stageIndex];
  if (!stage) return false;
  for (let i = 0; i < stage.steps.length; i++) {
    if (!isStepComplete(stepId(stage.id, i))) return false;
  }
  return true;
}

/** A stage is enterable when all earlier stages are complete (soft gate). */
export function stageUnlocked(stageIndex: number): boolean {
  for (let i = 0; i < stageIndex; i++) {
    if (!stageComplete(i)) return false;
  }
  return true;
}

export function firstIncompleteStep(stageIndex: number): number {
  const stage = STAGES[stageIndex];
  if (!stage) return 0;
  for (let i = 0; i < stage.steps.length; i++) {
    if (!isStepComplete(stepId(stage.id, i))) return i;
  }
  return 0;
}

export function journeyProgress() {
  let done = 0;
  let total = 0;
  for (const stage of STAGES) {
    total += stage.steps.length;
    for (let i = 0; i < stage.steps.length; i++) {
      if (isStepComplete(stepId(stage.id, i))) done++;
    }
  }
  return { done, total };
}

export function hasStarted(): boolean {
  return Object.keys(state.steps).length > 0;
}
