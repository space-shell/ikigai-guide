// @vitest-environment jsdom
// Regression guard: advancing between steps must re-render the step content
// (title, body paragraphs, and the exercise editor) with no stale remnants
// of the previous step.
//
// Note on event simulation: Solid delegates input/click through document-level
// listeners that start from e.composedPath()[0]. jsdom returns [] from
// composedPath() for synthetic events, so instead of dispatching we invoke
// the exact delegated handler Solid stored on the element ($$input, $$click).
// That is the same production code path a real user's event triggers.
import { afterEach, describe, expect, it } from "vitest";
import { render } from "solid-js/web";
import { createSignal } from "solid-js";
import type { Route } from "../src/router";
import { Step } from "../src/pages/Step";
import { completeStep, resetJourney } from "../src/state/store";

type DelegatedElement = HTMLElement & { [key: string]: unknown };

/** Invoke Solid's delegated handler stored on the element (production path). */
function fire(el: DelegatedElement, kind: "input" | "click"): void {
  const handler = el[`$$${kind}`] as ((e: unknown) => void) | undefined;
  if (!handler) throw new Error(`no delegated ${kind} handler on element`);
  handler({ currentTarget: el, target: el, type: kind });
}

let dispose: (() => void) | undefined;
afterEach(() => {
  dispose?.();
  dispose = undefined;
  document.body.innerHTML = "";
  localStorage.clear();
});

const tick = () => new Promise<void>((r) => setTimeout(r, 0));

function bodyText(): string {
  return document.body.textContent ?? "";
}

function setInputValue(id: string, value: string): void {
  const el = document.getElementById(id) as DelegatedElement;
  expect(el).not.toBeNull();
  el.value = value;
  fire(el, "input");
}

function clickButtonWithLabel(label: string): void {
  const btn = buttonWithLabel(label);
  expect(btn).not.toBeNull();
  fire(btn as unknown as DelegatedElement, "click");
}

function buttonWithLabel(label: string): HTMLButtonElement | null {
  return (
    ([...document.querySelectorAll("button")].find(
      (b) => b.textContent?.trim() === label,
    ) as HTMLButtonElement | undefined) ?? null
  );
}

describe("Step page: advancement re-renders content", () => {
  it("renders each step's title and body as the route advances", async () => {
    localStorage.clear();
    const [route, setRoute] = createSignal<Route>({
      name: "step",
      stage: 0,
      step: 0,
    });
    const parent = document.createElement("div");
    document.body.appendChild(parent);
    dispose = render(() => <Step route={route} />, parent);
    await tick();

    expect(document.querySelector("h1")?.textContent).toContain("What ikigai means");
    expect(bodyText()).toContain("Psychiatrist Kamiya Mieko");
    expect(bodyText()).not.toContain("Andrés Zuzunaga drew it");

    // uncompleted teach step: "Continue" on the accent variant, no Next button
    const continueBtn = buttonWithLabel("Continue");
    expect(continueBtn).not.toBeNull();
    expect(continueBtn!.classList.contains("neu-button-accent")).toBe(true);
    expect(continueBtn!.classList.contains("neu-button")).toBe(false);
    expect(buttonWithLabel("Next step →")).toBeNull();

    // advance: teach step 0 -> teach step 1
    setRoute({ name: "step", stage: 0, step: 1 });
    await tick();
    expect(document.querySelector("h1")?.textContent).toContain("What it isn't");
    expect(bodyText()).toContain("Andrés Zuzunaga drew it");
    expect(bodyText()).not.toContain("Psychiatrist Kamiya Mieko");

    // advance: teach -> prompts editor (different exercise kind)
    setRoute({ name: "step", stage: 0, step: 3 });
    await tick();
    expect(document.querySelector("h1")?.textContent).toContain("Before we begin");
    expect(document.getElementById("0-3-why")).not.toBeNull();
    expect(bodyText()).not.toContain("Andrés Zuzunaga drew it");

    // uncompleted prompts step: "Complete this step" accent, no Next button
    const completeBtn = buttonWithLabel("Complete this step");
    expect(completeBtn).not.toBeNull();
    expect(completeBtn!.classList.contains("neu-button-accent")).toBe(true);
    expect(buttonWithLabel("Update answer")).toBeNull();
    expect(buttonWithLabel("Next step →")).toBeNull();

    // complete the prompts step: completion marker appears, content coherent
    setInputValue("0-3-why", "testing");
    setInputValue("0-3-hope", "also testing");
    clickButtonWithLabel("Complete this step");
    await tick();
    expect(bodyText()).toContain("completed, you can revise and resubmit");
    expect((document.getElementById("0-3-why") as HTMLTextAreaElement).value).toBe(
      "testing",
    );

    // completed prompts step: "Update answer" secondary, "Next step →" primary
    const updateBtn = buttonWithLabel("Update answer");
    expect(updateBtn).not.toBeNull();
    expect(updateBtn!.classList.contains("neu-button")).toBe(true);
    expect(updateBtn!.classList.contains("neu-button-accent")).toBe(false);
    const nextBtn = buttonWithLabel("Next step →");
    expect(nextBtn).not.toBeNull();
    expect(nextBtn!.classList.contains("neu-button-accent")).toBe(true);
    expect(buttonWithLabel("Complete this step")).toBeNull();

    // advance: prompts -> scale editor (9 fieldsets, no prompts remnants)
    setRoute({ name: "step", stage: 0, step: 4 });
    await tick();
    expect(document.querySelector("h1")?.textContent).toContain("Ikigai-9 baseline");
    expect(document.querySelectorAll("fieldset").length).toBe(9);
    expect(document.getElementById("0-3-why")).toBeNull();

    // advancing into a locked stage renders the locked notice, not step content
    setRoute({ name: "step", stage: 1, step: 0 });
    await tick();
    expect(bodyText()).toContain("Finish the earlier stages first");
    expect(document.querySelector("h1")?.textContent).toContain("Mine the past");
  });

  it("completing the last step of a stage renders the stage-end view", async () => {
    // complete 0-0..0-3 through the store (the renderer reads live store state)
    resetJourney();
    for (let i = 0; i < 4; i++) completeStep(`0-${i}`);

    const [route, setRoute] = createSignal<Route>({
      name: "step",
      stage: 0,
      step: 4,
    });
    const parent = document.createElement("div");
    document.body.appendChild(parent);
    dispose = render(() => <Step route={route} />, parent);
    await tick();

    expect(document.querySelector("h1")?.textContent).toContain("Ikigai-9 baseline");
    expect(document.querySelectorAll("fieldset").length).toBe(9);

    // answer all nine items, submit, and expect the stage-end view
    for (let q = 1; q <= 9; q++) {
      const input = document.querySelector(
        `input[name="0-4-q${q}"][value="3"]`,
      ) as HTMLInputElement;
      expect(input).not.toBeNull();
      input.click();
    }
    clickButtonWithLabel("Submit");
    await tick();
    expect(bodyText()).toContain("Stage complete");
    expect(bodyText()).toContain("Until next time");
    expect(bodyText()).not.toContain("Ikigai-9 baseline");
  });
});
