// Seed-candidate extraction for list steps: pulls values from earlier
// answers so later stages can offer one-click entries. DOM-free (unit
// tested); imported by StepBody.tsx.

import { answerFor } from "./store";
import type { ListStep, Step } from "../content/schema";

export interface SeedSuggestion {
  value: string;
  targetField: string;
}

/** Pull seed candidates for a list step from earlier answers (store-backed). */
export function suggestionsFor(step: Step): SeedSuggestion[] {
  const list = step as ListStep;
  if (list.kind !== "list" || !list.seedFrom) return [];
  const out: SeedSuggestion[] = [];
  const seen = new Set<string>();
  for (const seed of list.seedFrom) {
    const a = answerFor<unknown>(seed.stepId);
    if (a === undefined || typeof a !== "object" || a === null) continue;
    const obj = a as Record<string, unknown>;
    const consider = (v: string) => {
      const t = v.trim();
      if (!t) return;
      const key = `${seed.targetField} ${t}`;
      if (seen.has(key)) return;
      seen.add(key);
      out.push({ value: t, targetField: seed.targetField });
    };
    if (Array.isArray(obj.entries)) {
      // list answers: { entries: [{ field: value }, ...] }
      for (const e of obj.entries) {
        consider(e[seed.field] ?? "");
      }
    } else if (typeof obj[seed.field] === "string") {
      // prompts answers: Record<fieldId, string>
      consider(obj[seed.field] as string);
    }
  }
  return out;
}
