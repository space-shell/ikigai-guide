import { For, Show } from "solid-js";
import { STAGES } from "../content/journey";
import type { ListStep, PickStep } from "../content/schema";
import { journey } from "../state/store";
import { scoreIkigai9 } from "../state/ikigai9";
import { Layout } from "../components/Layout";

// Step ids that feed the map (see docs/plan.md §3).
const NEEDS = "3-2";
const VALUES = "3-3";
const SOURCES = "4-1";
const TWOWORDS = "4-3";
const FEARS = "6-1";
const EXPERIMENTS = "6-3";
const OPENING = "0-3";

function valuesStep(): PickStep | null {
  const s = STAGES[3]?.steps[3];
  return s && s.kind === "pick" ? s : null;
}
function listStep(id: string): ListStep | null {
  const parts = id.split("-").map(Number);
  const si = parts[0];
  const ti = parts[1];
  if (si === undefined || ti === undefined) return null;
  const s = STAGES[si]?.steps[ti];
  return s && s.kind === "list" ? s : null;
}

export function Map() {
  const baseline = () => (journey.baseline ? scoreIkigai9(journey.baseline) : null);
  const retest = () => (journey.retest ? scoreIkigai9(journey.retest) : null);
  const opening = () =>
    (journey.answers[OPENING] as { why?: string } | undefined)?.why ?? "";
  const needs = () =>
    journey.answers[NEEDS] as Record<string, number> | undefined;
  const values = () =>
    journey.answers[VALUES] as { selected: string[] } | undefined;
  const sources = () =>
    (journey.answers[SOURCES] as { entries: Record<string, string>[] } | undefined)
      ?.entries ?? [];
  const twoWords = () =>
    (journey.answers[TWOWORDS] as { twowords?: string } | undefined)?.twowords ?? "";
  const fears = () =>
    (journey.answers[FEARS] as { entries: Record<string, string>[] } | undefined)
      ?.entries ?? [];
  const experiments = () =>
    (journey.answers[EXPERIMENTS] as { entries: Record<string, string>[] } | undefined)
      ?.entries ?? [];

  const valueLabel = (id: string) =>
    valuesStep()?.options.find((o) => o.id === id)?.label ?? id;

  return (
    <Layout>
      <div class="mb-10">
        <p class="kicker mb-2">The artifact</p>
        <h1 class="font-display text-3xl">My Ikigai Map</h1>
        <p class="mt-2 text-ink-soft">
          Everything you wrote, on one page. Re-read it and redraw it as your
          life changes.
        </p>
        <div class="mt-4 flex gap-3 print:hidden">
          <button
            type="button"
            class="rounded-sm bg-aizome px-4 py-2 text-sm font-medium text-white hover:bg-aizome-deep"
            onClick={() => window.print()}
          >
            Print this map
          </button>
          <a
            class="rounded-sm border border-line px-4 py-2 text-sm font-medium text-ink-soft hover:border-aizome hover:text-aizome"
            href="#/settings"
          >
            Export data
          </a>
        </div>
      </div>

      <Section title="Your Ikigai-9">
        <ScoreDelta baseline={baseline()} retest={retest()} />
      </Section>

      <Show when={opening()}>
        <Section title="Why you began">
          <blockquote class="border-l-2 border-aizome pl-4 font-display text-lg text-ink-soft">
            “{opening()}”
          </blockquote>
          <p class="mt-2 text-xs text-ink-faint">Your answer from day one.</p>
        </Section>
      </Show>

      <Section title="Sources of ikigai">
        <Show
          when={sources().length > 0}
          fallback={<Empty note="Complete the sources list (stage 4) to populate this." />}
        >
          <ul class="flex flex-col gap-3">
            <For each={sources()}>
              {(s) => (
                <li class="rounded-md border border-line bg-surface p-4">
                  <p class="font-medium">{s.source}</p>
                  <Show when={s.feelings}>
                    <p class="mt-1 text-sm text-ink-soft">Feels like: {s.feelings}</p>
                  </Show>
                  <Show when={s.origin}>
                    <p class="mt-1 text-xs text-ink-faint">{s.origin}</p>
                  </Show>
                </li>
              )}
            </For>
          </ul>
        </Show>
      </Section>

      <Show when={twoWords()}>
        <Section title="Two-word compass">
          <p class="font-display text-2xl">{twoWords()}</p>
          <p class="mt-1 text-xs text-ink-faint">A slogan, not a definition.</p>
        </Section>
      </Show>

      <Section title="Needs profile">
        <Show
          when={needs()}
          fallback={<Empty note="Complete the needs self-rating (stage 3) to populate this." />}
        >
          {(n) => (
            <div class="flex flex-col gap-2">
              <For each={Object.entries(n())}>
                {([key, v]) => (
                  <div class="flex items-center gap-3">
                    <span class="w-44 shrink-0 text-sm text-ink-soft capitalize">
                      {key.replace(/-/g, " ")}
                    </span>
                    <div class="h-2 w-full rounded-sm bg-line" aria-hidden="true">
                      <div
                        class="h-2 rounded-sm bg-matcha"
                        style={{ width: `${(v / 4) * 100}%` }}
                      />
                    </div>
                    <span class="w-8 text-right text-xs text-ink-faint tabular-nums">
                      {v}/4
                    </span>
                  </div>
                )}
              </For>
            </div>
          )}
        </Show>
      </Section>

      <Section title="Values">
        <Show
          when={values()}
          fallback={<Empty note="Complete the values clarification (stage 3) to populate this." />}
        >
          {(v) => (
            <div class="flex flex-wrap gap-2">
              <For each={v().selected}>
                {(id) => (
                  <span class="rounded-sm border border-aizome/40 px-3 py-1 text-sm text-aizome">
                    {valueLabel(id)}
                  </span>
                )}
              </For>
            </div>
          )}
        </Show>
      </Section>

      <Section title="Named fears & counter-moves">
        <Show
          when={fears().length > 0}
          fallback={<Empty note="Complete the enemies worksheet (stage 6) to populate this." />}
        >
          <ul class="flex flex-col gap-2">
            <For each={fears()}>
              {(f) => (
                <li class="text-sm text-ink-soft">
                  <span class="font-medium text-ink">{f.fear}</span> {f.shows}{" "}
                  <Show when={f.counter}>
                    <span class="text-aizome">→ {f.counter}</span>
                  </Show>
                </li>
              )}
            </For>
          </ul>
        </Show>
      </Section>

      <Section title="Experiments">
        <Show
          when={experiments().length > 0}
          fallback={<Empty note="Complete the experiments plan (stage 6) to populate this." />}
        >
          <ul class="flex flex-col gap-3">
            <For each={experiments()}>
              {(e) => (
                <li class="rounded-md border border-line bg-surface p-4 text-sm">
                  <p class="font-medium text-ink">
                    {e.source} <span class="text-ink-faint">{e.minimum}</span>
                  </p>
                  <p class="mt-1 text-ink-soft">
                    When: {e.when}
                    <Show when={e.checkin}> · Check-in: {e.checkin}</Show>
                  </p>
                </li>
              )}
            </For>
          </ul>
        </Show>
      </Section>
    </Layout>
  );
}

function Section(props: { title: string; children: import("solid-js").JSX.Element }) {
  return (
    <section class="mb-10 border-t border-line pt-6">
      <h2 class="font-display mb-4 text-xl">{props.title}</h2>
      {props.children}
    </section>
  );
}

function Empty(props: { note: string }) {
  return <p class="text-sm text-ink-faint">{props.note}</p>;
}

function ScoreDelta(props: {
  baseline: ReturnType<typeof scoreIkigai9> | null;
  retest: ReturnType<typeof scoreIkigai9> | null;
}) {
  return (
    <Show
      when={props.baseline}
      fallback={
        <Empty note="Take the Ikigai-9 baseline (stage 0) to populate this." />
      }
    >
      {(b) => (
        <div class="rounded-md border border-line bg-surface p-4">
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Score label="Emotional" b={b().emotional} r={props.retest?.emotional} />
            <Score label="Growth" b={b().growth} r={props.retest?.growth} />
            <Score
              label="Contribution"
              b={b().contribution}
              r={props.retest?.contribution}
            />
            <Score label="Total (0–36)" b={b().total} r={props.retest?.total} />
          </div>
          <Show when={!props.retest}>
            <p class="mt-3 text-xs text-ink-faint">
              Retest pending. Complete the final stage to see your change.
            </p>
          </Show>
        </div>
      )}
    </Show>
  );
}

function Score(props: { label: string; b: number; r?: number }) {
  const delta = () => (props.r === undefined ? null : props.r! - props.b);
  const cls = () =>
    delta() === null || delta() === 0
      ? "text-ink-faint"
      : delta()! > 0
        ? "text-matcha"
        : "text-shu";
  return (
    <div>
      <p class="text-xs text-ink-faint">{props.label}</p>
      <p class="font-display text-2xl tabular-nums">
        {props.b}
        <Show when={props.r !== undefined}>
          <span class="text-base text-ink-faint"> → {props.r}</span>
        </Show>
      </p>
      <Show when={delta() !== null && delta() !== 0}>
        <p class={`text-xs tabular-nums ${cls()}`}>
          {delta()! > 0 ? "+" : ""}
          {delta()}
        </p>
      </Show>
    </div>
  );
}
