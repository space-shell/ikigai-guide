// Pure persistence logic — no DOM access here, so vitest can exercise it.
// The UI store (store.ts) supplies the storage backend.

import { isIkigai9Answers, type Ikigai9Answers } from "./ikigai9";

export const STORAGE_KEY = "ikigai-guide:v1";
export const STATE_VERSION = 1;

export interface JourneyState {
  version: number;
  createdAt: string; // ISO date
  updatedAt: string;
  /** stepId -> completion timestamp */
  steps: Record<string, string>;
  /** stepId -> exercise payload (shape depends on step kind) */
  answers: Record<string, unknown>;
  baseline: Ikigai9Answers | null;
  retest: Ikigai9Answers | null;
}

export function emptyState(now = new Date()): JourneyState {
  return {
    version: STATE_VERSION,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    steps: {},
    answers: {},
    baseline: null,
    retest: null,
  };
}

/**
 * Structural validation for state read from storage or an import file.
 * Rejects unknown versions outright; tolerates missing optional keys so
 * future migrations have room.
 */
export function validateState(value: unknown): JourneyState | null {
  if (typeof value !== "object" || value === null) return null;
  const v = value as Record<string, unknown>;

  if (v.version !== STATE_VERSION) return null;
  if (typeof v.createdAt !== "string") return null;
  if (typeof v.updatedAt !== "string") return null;
  if (typeof v.steps !== "object" || v.steps === null) return null;
  if (typeof v.answers !== "object" || v.answers === null) return null;
  if (v.baseline !== null && !isIkigai9Answers(v.baseline)) return null;
  if (v.retest !== null && !isIkigai9Answers(v.retest)) return null;

  for (const ts of Object.values(v.steps)) {
    if (typeof ts !== "string") return null;
  }

  return v as unknown as JourneyState;
}

export function serializeState(state: JourneyState): string {
  return JSON.stringify(state);
}

export function parseState(raw: string): JourneyState | null {
  try {
    return validateState(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function loadState(storage: Pick<Storage, "getItem">): JourneyState | null {
  const raw = storage.getItem(STORAGE_KEY);
  return raw ? parseState(raw) : null;
}

export function saveState(storage: Pick<Storage, "setItem">, state: JourneyState): void {
  storage.setItem(STORAGE_KEY, serializeState(state));
}

export function clearState(storage: Pick<Storage, "removeItem">): void {
  storage.removeItem(STORAGE_KEY);
}
