import { describe, expect, it } from "vitest";
import { parseHash } from "../src/router";

describe("parseHash", () => {
  it("treats empty and bare hashes as landing", () => {
    expect(parseHash("")).toEqual({ name: "landing" });
    expect(parseHash("#")).toEqual({ name: "landing" });
    expect(parseHash("#/")).toEqual({ name: "landing" });
  });

  it("parses the journey overview", () => {
    expect(parseHash("#/journey")).toEqual({ name: "journey" });
    expect(parseHash("#/journey/")).toEqual({ name: "journey" });
  });

  it("parses step routes", () => {
    expect(parseHash("#/journey/3/2")).toEqual({
      name: "step",
      stage: 3,
      step: 2,
    });
    expect(parseHash("#/journey/0/0")).toEqual({
      name: "step",
      stage: 0,
      step: 0,
    });
  });

  it("rejects malformed step routes", () => {
    expect(parseHash("#/journey/a/b")).toEqual({ name: "not-found" });
    expect(parseHash("#/journey/3")).toEqual({ name: "not-found" });
    expect(parseHash("#/journey/3/2/extra")).toEqual({ name: "not-found" });
  });

  it("parses map and settings", () => {
    expect(parseHash("#/map")).toEqual({ name: "map" });
    expect(parseHash("#/settings")).toEqual({ name: "settings" });
  });

  it("404s unknown paths", () => {
    expect(parseHash("#/nope")).toEqual({ name: "not-found" });
  });
});
