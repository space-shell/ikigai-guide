import { For, Show } from "solid-js";
import { STAGES } from "../content/journey";
import {
  firstIncompleteStep,
  journeyProgress,
  stageCompletion,
  stageComplete,
  stageUnlocked,
} from "../state/store";
import { navigate } from "../router";
import { Layout } from "../components/Layout";

export function JourneyMap() {
  const overall = journeyProgress();
  const pct = overall.total === 0 ? 0 : Math.round((overall.done / overall.total) * 100);

  const open = (stageIndex: number) => {
    if (!stageUnlocked(stageIndex)) return;
    navigate(`#/journey/${stageIndex}/${firstIncompleteStep(stageIndex)}`);
  };

  return (
    <Layout>
      <div class="mb-10">
        <p class="kicker mb-2">The journey</p>
        <h1 class="font-display text-3xl">Eight stages to your ikigai</h1>
        <p class="mt-2 text-ink-soft">
          Each stage ends with one small real-world action. Stages open in
          order. What you write early feeds what you write later.
        </p>
        <div class="mt-5 flex items-center gap-3">
          <div
            class="neu-track h-1.5 w-full"
            role="progressbar"
            aria-label="Journey progress"
            aria-valuenow={overall.done}
            aria-valuemin={0}
            aria-valuemax={overall.total}
          >
            <div class="h-full rounded-full bg-matcha" style={{ width: `${pct}%` }} />
          </div>
          <span class="text-sm text-ink-soft tabular-nums">
            {overall.done}/{overall.total}
          </span>
        </div>
      </div>

      <ol class="flex flex-col gap-4">
        <For each={STAGES}>
          {(stage, index) => {
            const comp = stageCompletion(index());
            const unlocked = stageUnlocked(index());
            const complete = stageComplete(index());
            const started = comp().done > 0 && !complete;
            const status = complete
              ? { label: "Complete", cls: "text-matcha" }
              : started
                ? { label: "In progress", cls: "text-aizome" }
                : unlocked
                  ? { label: "Ready", cls: "text-ink-soft" }
                  : { label: "Locked", cls: "text-ink-faint" };
            return (
              <li>
                <button
                  type="button"
                  class={`neu-raised w-full p-5 text-left ${unlocked ? "" : "opacity-50"}`}
                  onClick={() => open(index())}
                  aria-disabled={!unlocked}
                >
                  <div class="flex items-baseline justify-between gap-4">
                    <div class="flex items-baseline gap-4">
                      <span class="font-display text-2xl text-ink-faint tabular-nums">
                        {String(index() + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h2 class="font-display text-xl">{stage.title}</h2>
                        <p class="text-sm text-ink-soft">{stage.tagline}</p>
                      </div>
                    </div>
                    <span class={`shrink-0 text-xs font-medium ${status.cls}`}>
                      {status.label}
                    </span>
                  </div>
                  <div class="mt-4 flex items-center gap-3">
                    <div class="neu-track h-1 w-full" aria-hidden="true">
                      <div
                        class="h-full rounded-full bg-matcha"
                        style={{
                          width: `${comp().total === 0 ? 0 : (comp().done / comp().total) * 100}%`,
                        }}
                      />
                    </div>
                    <span class="text-xs text-ink-faint tabular-nums">
                      {comp().done}/{comp().total}
                    </span>
                  </div>
                </button>
              </li>
            );
          }}
        </For>
      </ol>

      <Show when={overall.done > 0}>
        <p class="mt-8 text-sm text-ink-faint">
          Your progress saves automatically in this browser. Export it any time
          from <a class="text-aizome underline-offset-4 hover:underline" href="#/settings">Settings</a>.
        </p>
      </Show>
    </Layout>
  );
}
