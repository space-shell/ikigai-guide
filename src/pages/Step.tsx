import { createMemo, Match, Show, Switch } from "solid-js";
import type { Accessor } from "solid-js";
import type { Route } from "../router";
import { navigate } from "../router";
import { STAGES } from "../content/journey";
import { stepId, type Step as StepModel } from "../content/schema";
import {
  answerFor,
  completeStep,
  isStepComplete,
  saveAnswer,
  setBaseline,
  setRetest,
  stageComplete,
  stageUnlocked,
} from "../state/store";
import { StepBody } from "../components/StepBody";
import { Layout } from "../components/Layout";

interface StepView {
  si: number; // stage index
  ti: number; // step index
  stageTitle: string;
  stepsInStage: number;
  step: StepModel;
  id: string;
  locked: boolean;
  done: boolean;
  stageEnd: boolean;
}

export function Step(props: { route: Accessor<Route> }) {
  const view = createMemo<StepView | null>(() => {
    const r = props.route();
    if (r.name !== "step") return null;
    const stage = STAGES[r.stage];
    if (!stage || r.step >= stage.steps.length) return null;
    const step = stage.steps[r.step]!;
    const id = stepId(r.stage, r.step);
    return {
      si: r.stage,
      ti: r.step,
      stageTitle: stage.title,
      stepsInStage: stage.steps.length,
      step,
      id,
      locked: !stageUnlocked(r.stage),
      done: isStepComplete(id),
      stageEnd:
        isStepComplete(id) && r.step === stage.steps.length - 1 && stageComplete(r.stage),
    };
  });

  const handleComplete = (v: StepView, answer: unknown) => {
    completeStep(v.id, answer);
    const step = v.step;
    if (step.kind === "scale" && step.target === "baseline") {
      setBaseline(answer as Record<string, number>);
    }
    if (step.kind === "scale" && step.target === "retest") {
      setRetest(answer as Record<string, number>);
    }
  };

  const goBack = (v: StepView) => {
    if (v.ti > 0) navigate(`#/journey/${v.si}/${v.ti - 1}`);
    else navigate("#/journey");
  };

  const goNextStage = (v: StepView) => {
    if (v.si + 1 < STAGES.length) navigate(`#/journey/${v.si + 1}/0`);
    else navigate("#/journey");
  };

  return (
    <Layout>
      <Switch>
        <Match when={view() === null}>
          <MissingStep />
        </Match>
        <Match when={(view() as StepView | null)?.locked}>
          <Show when={view()} keyed>
            {(v) => (
              <div class="flex flex-col gap-4">
                <p class="kicker">Locked</p>
                <h1 class="font-display text-2xl">{v.stageTitle}</h1>
                <p class="text-ink-soft">
                  Finish the earlier stages first; each one feeds this one.
                </p>
                <a class="text-aizome underline-offset-4 hover:underline" href="#/journey">
                  Back to the journey
                </a>
              </div>
            )}
          </Show>
        </Match>
        <Match when={(view() as StepView | null)?.stageEnd}>
          <Show when={view()} keyed>
            {(v) => (
              <StageEnd
                stageIndex={v.si}
                onContinue={() => goNextStage(v)}
              />
            )}
          </Show>
        </Match>
        <Match when={view() !== null}>
          <Show when={view()} keyed>
            {(v) => (
              <div class="flex flex-col gap-2">
                <p class="kicker">
                  Stage {v.si + 1} · {v.stageTitle}
                </p>
                <p class="text-sm text-ink-faint">
                  Step {v.ti + 1} of {v.stepsInStage}
                  <Show when={v.done}>
                    {" · "}
                    {v.step.kind === "teach"
                      ? "completed"
                      : "completed, you can revise and resubmit"}
                  </Show>
                </p>
                <div
                  class="neu-track mt-1 h-1.5 w-full"
                  role="progressbar"
                  aria-label={`Stage ${v.si + 1} progress`}
                  aria-valuenow={v.ti + 1}
                  aria-valuemin={1}
                  aria-valuemax={v.stepsInStage}
                >
                  <div
                    class="h-full rounded-full bg-matcha"
                    style={{ width: `${((v.ti + 1) / v.stepsInStage) * 100}%` }}
                  />
                </div>

                <h1 class="font-display mt-6 text-3xl leading-tight">{v.step.title}</h1>

                <div class="mt-8">
                  <StepBody
                    step={v.step}
                    stepId={v.id}
                    initial={answerFor(v.id)}
                    done={v.done}
                    onDraft={(a) => saveAnswer(v.id, a)}
                    onComplete={(a) => handleComplete(v, a)}
                  />
                </div>

                <div class="mt-10 flex items-center justify-between pt-4">
                  <button
                    type="button"
                    class="text-sm text-ink-faint underline-offset-4 hover:text-ink hover:underline"
                    onClick={() => goBack(v)}
                  >
                    ← Previous
                  </button>
                  <Show when={v.done && v.ti < v.stepsInStage - 1}>
                    <button
                      type="button"
                      class="neu-button-accent px-5 py-2 text-sm font-medium"
                      onClick={() => navigate(`#/journey/${v.si}/${v.ti + 1}`)}
                    >
                      Next step →
                    </button>
                  </Show>
                </div>
              </div>
            )}
          </Show>
        </Match>
      </Switch>
    </Layout>
  );
}

function MissingStep() {
  return (
    <div class="flex flex-col gap-4">
      <p class="kicker">Hmm</p>
      <h1 class="font-display text-2xl">That step doesn't exist</h1>
      <p class="text-ink-soft">
        The link points past the end of the journey, or at a step that was
        renamed.
      </p>
      <a class="text-aizome underline-offset-4 hover:underline" href="#/journey">
        Back to the journey
      </a>
    </div>
  );
}

function StageEnd(props: { stageIndex: number; onContinue: () => void }) {
  const stage = STAGES[props.stageIndex]!;
  const hasNext = props.stageIndex + 1 < STAGES.length;
  return (
    <div class="flex flex-col gap-8">
      <div>
        <p class="kicker">Stage complete</p>
        <h1 class="font-display mt-2 text-3xl">{stage.title}</h1>
        <p class="mt-2 text-ink-soft">{stage.tagline}</p>
      </div>

      <div class="neu-raised p-6">
        <p class="kicker mb-2">Until next time</p>
        <p class="text-ink-soft">One small real-world action before the next stage:</p>
        <p class="font-display mt-2 text-xl">{stage.action}</p>
      </div>

      <div class="flex flex-wrap gap-4">
        <Show
          when={hasNext}
          fallback={
            <a
              class="neu-button-accent px-6 py-2.5 font-medium"
              href="#/map"
            >
              View your map
            </a>
          }
        >
          <button
            type="button"
            class="neu-button-accent px-6 py-2.5 font-medium"
            onClick={props.onContinue}
          >
            Next stage
          </button>
        </Show>
        <a
          class="neu-button px-6 py-2.5 font-medium text-ink-soft"
          href="#/journey"
        >
          Journey overview
        </a>
      </div>
    </div>
  );
}
