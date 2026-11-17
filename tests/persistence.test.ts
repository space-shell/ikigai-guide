import { describe, expect, it } from "vitest";
import {
  emptyState,
  parseState,
  serializeState,
  STORAGE_KEY,
  validateState,
  loadState,
  saveState,
} from "../src/state/persistence";
import { IKIGAI9_ITEMS } from "../src/state/ikigai9";

const baseline = Object.fromEntries(IKIGAI9_ITEMS.map((i) => [i.id, 2]));

function memoryStorage() {
  const store = new Map<string, string>();
  return {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  };
}

describe("state persistence", () => {
  it("round-trips through serialize/parse", () => {
    const state = emptyState();
    state.steps["0-0"] = "2026-11-17T00:00:00.000Z";
    state.answers["0-1"] = { why: "curiosity" };
    state.baseline = baseline;
    const restored = parseState(serializeState(state));
    expect(restored).not.toBeNull();
    expect(restored!.steps["0-0"]).toBe("2026-11-17T00:00:00.000Z");
    expect(restored!.answers).toEqual({ "0-1": { why: "curiosity" } });
    expect(restored!.baseline).toEqual(baseline);
  });

  it("rejects wrong versions and malformed shapes", () => {
    expect(validateState({ ...emptyState(), version: 99 })).toBeNull();
    expect(validateState(null)).toBeNull();
    expect(validateState("nope")).toBeNull();
    expect(validateState({ ...emptyState(), steps: "nope" })).toBeNull();
    expect(validateState({ ...emptyState(), baseline: { q1: 9 } })).toBeNull();
    expect(parseState("not json{")).toBeNull();
  });

  it("survives a save/load cycle via a storage backend", () => {
    const storage = memoryStorage();
    saveState(storage, emptyState());
    expect(storage.getItem(STORAGE_KEY)).not.toBeNull();
    const loaded = loadState(storage);
    expect(loaded).not.toBeNull();
    expect(loaded!.version).toBe(1);
  });

  it("loadState returns null for garbage in storage", () => {
    const storage = memoryStorage();
    storage.setItem(STORAGE_KEY, "{{{");
    expect(loadState(storage)).toBeNull();
  });
});
