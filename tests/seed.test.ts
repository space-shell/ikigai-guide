import { beforeEach, describe, expect, it } from "vitest";
import { suggestionsFor } from "../src/state/seeds";
import { resetJourney, saveAnswer } from "../src/state/store";
import type { ListStep } from "../src/content/schema";

const sourcesStep: ListStep = {
  kind: "list",
  title: "Sources list",
  entryNoun: "Source",
  fields: [],
  seedFrom: [
    { stepId: "1-2", field: "what", targetField: "source" }, // timeline (list)
    { stepId: "2-2", field: "activity", targetField: "source" }, // energy audit (list)
    { stepId: "1-3", field: "resume", targetField: "source" }, // lost loves (prompts)
  ],
};

describe("suggestionsFor (seed candidates from earlier answers)", () => {
  beforeEach(() => resetJourney());

  it("returns nothing when no answers exist", () => {
    expect(suggestionsFor(sourcesStep)).toEqual([]);
  });

  it("collects from list answers, skipping empties and duplicates", () => {
    saveAnswer("1-2", {
      entries: [{ what: "cycling" }, { what: "drawing" }, { what: "" }],
    });
    saveAnswer("2-2", {
      entries: [{ activity: "cycling" }, { activity: "teaching" }],
    });
    expect(suggestionsFor(sourcesStep)).toEqual([
      { value: "cycling", targetField: "source" },
      { value: "drawing", targetField: "source" },
      { value: "teaching", targetField: "source" },
    ]);
  });

  it("reads prompts answers as single suggestions", () => {
    saveAnswer("1-3", {
      stopped: "piano for a decade",
      resume: "playing piano again",
    });
    expect(suggestionsFor(sourcesStep)).toEqual([
      { value: "playing piano again", targetField: "source" },
    ]);
  });

  it("ignores non-object answers", () => {
    saveAnswer("1-2", "garbage" as unknown as object);
    expect(suggestionsFor(sourcesStep)).toEqual([]);
  });
});
