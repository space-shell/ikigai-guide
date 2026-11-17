import { createMemo, createSignal, For, Show } from "solid-js";
import { suggestionsFor, type SeedSuggestion } from "../state/seeds";
import type {
  ListStep,
  PickStep,
  PromptsStep,
  ScaleStep,
  Step,
  TeachStep,
} from "../content/schema";

export interface StepBodyProps {
  step: Step;
  stepId: string;
  initial: unknown;
  /** Autosave drafts; does not mark the step complete. */
  onDraft: (answer: unknown) => void;
  /** Finish the step: marks completion and stores the final answer. */
  onComplete: (answer: unknown) => void;
}

/**
 * Renders a step's body. Editors keep drafts in the journey store (autosave);
 * `onComplete` fires when the user finishes the step.
 */
export function StepBody(props: StepBodyProps) {
  return (
    <>
      <Show when={props.step.kind === "teach"}>
        <TeachBody
          step={props.step as TeachStep}
          onComplete={() => props.onComplete(null)}
        />
      </Show>
      <Show when={props.step.kind === "prompts"}>
        <PromptsBody
          step={props.step as PromptsStep}
          stepId={props.stepId}
          initial={(props.initial ?? {}) as Record<string, string>}
          onDraft={props.onDraft}
          onComplete={(a) => props.onComplete(a)}
        />
      </Show>
      <Show when={props.step.kind === "scale"}>
        <ScaleBody
          step={props.step as ScaleStep}
          stepId={props.stepId}
          initial={(props.initial ?? {}) as Record<string, number>}
          onDraft={props.onDraft}
          onComplete={(a) => props.onComplete(a)}
        />
      </Show>
      <Show when={props.step.kind === "list"}>
        <ListBody
          step={props.step as ListStep}
          stepId={props.stepId}
          initial={(props.initial ?? { entries: [] }) as {
            entries: Record<string, string>[];
          }}
          suggestions={suggestionsFor(props.step)}
          onDraft={props.onDraft}
          onComplete={(a) => props.onComplete(a)}
        />
      </Show>
      <Show when={props.step.kind === "pick"}>
        <PickBody
          step={props.step as PickStep}
          stepId={props.stepId}
          initial={(props.initial ?? {}) as {
            selected: string[];
            free?: Record<string, string>;
          }}
          onDraft={props.onDraft}
          onComplete={(a) => props.onComplete(a)}
        />
      </Show>
    </>
  );
}

function TeachBody(props: { step: TeachStep; onComplete: () => void }) {
  return (
    <section class="flex flex-col gap-6">
      <Show when={props.step.bullets}>
        <ul class="flex flex-col gap-2 border-l-2 border-line pl-4">
          <For each={props.step.bullets}>
            {(b) => <li class="text-ink-soft">{b}</li>}
          </For>
        </ul>
      </Show>
      <For each={props.step.paragraphs}>
        {(p) => <p class="text-ink-soft">{p}</p>}
      </For>
      <ContinueRow label="Continue" onClick={() => props.onComplete()} />
    </section>
  );
}

function PromptsBody(props: {
  step: PromptsStep;
  stepId: string;
  initial: Record<string, string>;
  onDraft: (a: Record<string, string>) => void;
  onComplete: (a: Record<string, string>) => void;
}) {
  const [draft, setDraft] = createSignal<Record<string, string>>(props.initial);
  const [attempted, setAttempted] = createSignal(false);

  let autosaveTimer: ReturnType<typeof setTimeout> | undefined;
  const update = (pid: string, value: string) => {
    const next = { ...draft(), [pid]: value };
    setDraft(next);
    clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(() => props.onDraft(next), 500);
  };

  const ready = createMemo(() =>
    props.step.prompts.every(
      (p) => p.optional || (draft()[p.id] ?? "").trim().length > 0,
    ),
  );

  const submit = () => {
    if (!ready()) {
      setAttempted(true);
      return;
    }
    props.onComplete(draft());
  };

  return (
    <section class="flex flex-col gap-8">
      <Show when={props.step.intro}>
        <p class="text-ink-soft">{props.step.intro}</p>
      </Show>
      <For each={props.step.prompts}>
        {(p) => (
          <div class="flex flex-col gap-2">
            <label class="font-medium" for={`${props.stepId}-${p.id}`}>
              {p.label}
              <Show when={!p.optional}>
                <span class="ml-1 text-shu" aria-hidden="true">
                  *
                </span>
              </Show>
            </label>
            {p.multiline ? (
              <textarea
                id={`${props.stepId}-${p.id}`}
                class="neu-input min-h-28 text-ink"
                placeholder={p.placeholder ?? "Write freely, or edit later."}
                value={draft()[p.id] ?? ""}
                onInput={(e) => update(p.id, e.currentTarget.value)}
              />
            ) : (
              <input
                id={`${props.stepId}-${p.id}`}
                type="text"
                class="neu-input text-ink"
                placeholder={p.placeholder ?? ""}
                value={draft()[p.id] ?? ""}
                onInput={(e) => update(p.id, e.currentTarget.value)}
              />
            )}
            <Show when={attempted() && !p.optional && (draft()[p.id] ?? "").trim() === ""}>
              <p class="text-sm text-shu">An answer is needed here.</p>
            </Show>
          </div>
        )}
      </For>
      <ContinueRow
        label="Complete this step"
        onClick={submit}
        hint={!ready() && attempted() ? "Answer the highlighted prompts to continue." : undefined}
      />
    </section>
  );
}

const SCALE_VALUES = [0, 1, 2, 3, 4] as const;

function ScaleBody(props: {
  step: ScaleStep;
  stepId: string;
  initial: Record<string, number>;
  onDraft: (a: Record<string, number>) => void;
  onComplete: (a: Record<string, number>) => void;
}) {
  const [draft, setDraft] = createSignal<Record<string, number>>(props.initial);
  const [attempted, setAttempted] = createSignal(false);

  const ready = createMemo(() =>
    props.step.items.every((i) => draft()[i.id] !== undefined),
  );

  const set = (itemId: string, value: number) => {
    const next = { ...draft(), [itemId]: value };
    setDraft(next);
    props.onDraft(next);
  };

  const submit = () => {
    if (!ready()) {
      setAttempted(true);
      return;
    }
    props.onComplete(draft());
  };

  return (
    <section class="flex flex-col gap-8">
      <Show when={props.step.intro}>
        <p class="text-ink-soft">{props.step.intro}</p>
      </Show>
      <div class="flex flex-col gap-6">
        <For each={props.step.items}>
          {(item) => (
            <fieldset class="neu-raised p-5">
              <legend class="px-1 text-sm font-medium text-ink">{item.label}</legend>
              <div class="mt-1 flex flex-wrap items-center justify-between gap-3">
                <span class="text-xs text-ink-faint">{item.minLabel}</span>
                <div class="flex gap-2">
                  <For each={[...SCALE_VALUES]}>
                    {(v) => (
                      <label class="cursor-pointer" aria-label={`${item.label}, ${v} of 4`}>
                        <input
                          type="radio"
                          class="peer sr-only"
                          name={`${props.stepId}-${item.id}`}
                          value={v}
                          checked={draft()[item.id] === v}
                          onChange={() => set(item.id, v)}
                        />
                        <span class="neu-tile flex h-8 w-8 items-center justify-center rounded-md text-sm text-ink-soft peer-checked:bg-aizome peer-checked:text-white peer-checked:shadow-[inset_2px_2px_4px_#c8c0b2,inset_-2px_-2px_4px_#ffffff]">
                          {v}
                        </span>
                      </label>
                    )}
                  </For>
                </div>
                <span class="text-xs text-ink-faint">{item.maxLabel}</span>
              </div>
              <Show when={attempted() && draft()[item.id] === undefined}>
                <p class="mt-2 text-sm text-shu">Choose a value from 0 to 4.</p>
              </Show>
            </fieldset>
          )}
        </For>
      </div>
      <ContinueRow
        label="Submit"
        onClick={submit}
        hint={!ready() && attempted() ? "Answer every statement to continue." : undefined}
      />
    </section>
  );
}

function ListBody(props: {
  step: ListStep;
  stepId: string;
  initial: { entries: Record<string, string>[] };
  suggestions?: SeedSuggestion[];
  onDraft: (a: { entries: Record<string, string>[] }) => void;
  onComplete: (a: { entries: Record<string, string>[] }) => void;
}) {
  const min = props.step.minEntries ?? 1;
  const max = props.step.maxEntries ?? 12;
  const [entries, setEntries] = createSignal<Record<string, string>[]>(
    props.initial.entries.length > 0 ? props.initial.entries : [{}],
  );
  const [attempted, setAttempted] = createSignal(false);

  const push = (next: Record<string, string>[]) => {
    setEntries(next);
    props.onDraft({ entries: next });
  };

  const meaningful = createMemo(() =>
    entries().filter((e) => Object.values(e).some((v) => (v ?? "").trim() !== "")),
  );

  const ready = createMemo(() => {
    const es = meaningful();
    if (es.length < min) return false;
    return es.every((e) =>
      props.step.fields.every((f) => !f.required || (e[f.id] ?? "").trim() !== ""),
    );
  });

  const update = (index: number, fieldId: string, value: string) => {
    push(entries().map((e, i) => (i === index ? { ...e, [fieldId]: value } : e)));
  };

  const add = () => push([...entries(), {}]);
  const remove = (index: number) => push(entries().filter((_, i) => i !== index));

  const usedSuggestions = createMemo(() => new Set(entries().map((e) => JSON.stringify(e))));
  const addSeed = (s: SeedSuggestion) => {
    if (entries().length >= max) return;
    push([...entries(), { [s.targetField]: s.value }]);
  };

  const submit = () => {
    if (!ready()) {
      setAttempted(true);
      return;
    }
    props.onComplete({ entries: meaningful() });
  };

  return (
    <section class="flex flex-col gap-6">
      <Show when={props.step.intro}>
        <p class="text-ink-soft">{props.step.intro}</p>
      </Show>
      <For each={entries()}>
        {(entry, index) => (
          <div class="neu-raised p-5">
            <div class="mb-3 flex items-center justify-between">
              <p class="text-sm font-medium text-ink-faint">
                {props.step.entryNoun} {index() + 1}
              </p>
              <Show when={entries().length > 1}>
                <button
                  type="button"
                  class="text-sm text-ink-faint underline-offset-4 hover:text-shu hover:underline"
                  onClick={() => remove(index())}
                >
                  Remove
                </button>
              </Show>
            </div>
            <div class="flex flex-col gap-3">
              <For each={props.step.fields}>
                {(f) => (
                  <div class="flex flex-col gap-1">
                    <label
                      class="text-sm font-medium"
                      for={`${props.stepId}-${index()}-${f.id}`}
                    >
                      {f.label}
                      <Show when={f.required}>
                        <span class="ml-1 text-shu" aria-hidden="true">
                          *
                        </span>
                      </Show>
                    </label>
                    {f.type === "textarea" ? (
                      <textarea
                        id={`${props.stepId}-${index()}-${f.id}`}
                        class="neu-input min-h-20 text-ink"
                        placeholder={f.placeholder ?? ""}
                        value={entry[f.id] ?? ""}
                        onInput={(e) => update(index(), f.id, e.currentTarget.value)}
                      />
                    ) : f.type === "select" ? (
                      <select
                        id={`${props.stepId}-${index()}-${f.id}`}
                        class="neu-input text-ink"
                        value={entry[f.id] ?? ""}
                        onChange={(e) => update(index(), f.id, e.currentTarget.value)}
                      >
                        <option value="">Choose…</option>
                        <For each={f.options ?? []}>
                          {(opt) => <option value={opt}>{opt}</option>}
                        </For>
                      </select>
                    ) : (
                      <input
                        id={`${props.stepId}-${index()}-${f.id}`}
                        type={f.type}
                        class="neu-input text-ink"
                        placeholder={f.placeholder ?? ""}
                        value={entry[f.id] ?? ""}
                        onInput={(e) => update(index(), f.id, e.currentTarget.value)}
                      />
                    )}
                  </div>
                )}
              </For>
            </div>
          </div>
        )}
      </For>

      <Show when={props.suggestions && props.suggestions.length > 0}>
        <div class="neu-raised p-5">
          <p class="kicker mb-3">From your earlier answers</p>
          <div class="flex flex-wrap gap-2">
            <For each={props.suggestions}>
              {(s) => {
                const used = () => usedSuggestions().has(JSON.stringify({ [s.targetField]: s.value }));
                return (
                  <button
                    type="button"
                    class="rounded-md px-3 py-1.5 text-sm transition-all"
                    classList={{
                      "bg-aizome text-white shadow-[inset_2px_2px_4px_rgba(0,0,0,0.25)]":
                        used(),
                      "bg-paper text-ink-soft shadow-[3px_3px_6px_#c8c0b2,-3px_-3px_6px_#ffffff] hover:text-aizome":
                        !used(),
                    }}
                    disabled={used() || entries().length >= max}
                    onClick={() => addSeed(s)}
                  >
                    {s.value}
                  </button>
                );
              }}
            </For>
          </div>
          <p class="mt-2 text-xs text-ink-faint">
            Click to add one as an entry, or ignore them and write freely.
          </p>
        </div>
      </Show>

      <div class="flex items-center justify-between">
        <Show when={entries().length < max}>
          <button
            type="button"
            class="neu-button px-3 py-1.5 text-sm font-medium text-aizome"
            onClick={add}
          >
            Add {props.step.entryNoun.toLowerCase()}
          </button>
        </Show>
        <Show when={meaningful().length < min}>
          <p class="text-sm text-ink-faint">At least {min} required.</p>
        </Show>
      </div>

      <ContinueRow
        label="Complete this step"
        onClick={submit}
        hint={
          !ready() && attempted()
            ? "Fill the required fields of each entry you keep."
            : undefined
        }
      />
    </section>
  );
}

function PickBody(props: {
  step: PickStep;
  stepId: string;
  initial: { selected: string[]; free?: Record<string, string> };
  onDraft: (a: { selected: string[]; free?: Record<string, string> }) => void;
  onComplete: (a: { selected: string[]; free?: Record<string, string> }) => void;
}) {
  const min = props.step.minSelections ?? 1;
  const [selected, setSelected] = createSignal<string[]>(props.initial.selected ?? []);
  const [free, setFree] = createSignal<Record<string, string>>(props.initial.free ?? {});
  const [attempted, setAttempted] = createSignal(false);

  const toggle = (optionId: string) => {
    const next = props.step.multi
      ? selected().includes(optionId)
        ? selected().filter((x) => x !== optionId)
        : [...selected(), optionId]
      : [optionId];
    setSelected(next);
    props.onDraft({ selected: next, free: free() });
  };

  const updateFree = (id: string, value: string) => {
    const next = { ...free(), [id]: value };
    setFree(next);
    props.onDraft({ selected: selected(), free: next });
  };

  const ready = createMemo(() => selected().length >= min);

  const submit = () => {
    if (!ready()) {
      setAttempted(true);
      return;
    }
    const anyFree = Object.values(free()).some((v) => (v ?? "").trim() !== "");
    props.onComplete({ selected: selected(), free: anyFree ? free() : undefined });
  };

  return (
    <section class="flex flex-col gap-6">
      <Show when={props.step.intro}>
        <p class="text-ink-soft">{props.step.intro}</p>
      </Show>
      <div
        class="flex flex-col gap-2"
        role={props.step.multi ? "group" : "radiogroup"}
        aria-label={props.step.title}
      >
        <For each={props.step.options}>
          {(opt) => (
            <button
              type="button"
              class={`neu-raised px-4 py-3 text-left transition-all`}
              classList={{
                "bg-aizome text-white": selected().includes(opt.id),
                "text-ink": !selected().includes(opt.id),
              }}
              role={props.step.multi ? "checkbox" : "radio"}
              aria-checked={selected().includes(opt.id)}
              onClick={() => toggle(opt.id)}
            >
              <span class="font-medium">{opt.label}</span>
              <Show when={opt.description}>
                <span
                  class={`block text-sm ${
                    selected().includes(opt.id) ? "text-white/80" : "text-ink-soft"
                  }`}
                >
                  {opt.description}
                </span>
              </Show>
            </button>
          )}
        </For>
      </div>

      <Show when={props.step.freeText}>
        {(ft) => (
          <div class="flex flex-col gap-2">
            <label class="font-medium" for={`${props.stepId}-${ft().id}`}>
              {ft().label}
            </label>
            <textarea
              id={`${props.stepId}-${ft().id}`}
              class="neu-input min-h-20 text-ink"
              value={free()[ft().id] ?? ""}
              onInput={(e) => updateFree(ft().id, e.currentTarget.value)}
            />
          </div>
        )}
      </Show>

      <ContinueRow
        label="Complete this step"
        onClick={submit}
        hint={!ready() && attempted() ? `Choose at least ${min}.` : undefined}
      />
    </section>
  );
}

function ContinueRow(props: { label: string; onClick: () => void; hint?: string }) {
  return (
    <div class="mt-2 flex flex-col gap-2">
      <button
        type="button"
        class="neu-button-accent self-start px-6 py-2.5 font-medium"
        onClick={props.onClick}
      >
        {props.label}
      </button>
      <Show when={props.hint}>
        <p class="text-sm text-shu">{props.hint}</p>
      </Show>
    </div>
  );
}
