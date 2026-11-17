import { createMemo, Show } from "solid-js";
import { journeyProgress } from "../state/store";
import { Layout } from "../components/Layout";

export function Landing() {
  const progress = createMemo(() => journeyProgress());
  const started = createMemo(() => progress().done > 0);
  const pct = createMemo(() =>
    progress().total === 0 ? 0 : Math.round((progress().done / progress().total) * 100),
  );

  return (
    <Layout>
      <section class="mt-20 mb-20">
        <p class="kicker mb-4">A guided journey</p>
        <h1 class="font-display text-4xl leading-tight text-balance sm:text-5xl">
          Find what makes your life
          <br />
          feel worth living.
        </h1>
        <p class="mt-6 text-lg text-ink-soft">
          A quiet, thorough process for discovering your ikigai: staged
          exercises, honest sourcing, saved progress. Not a quiz, not an
          article.
        </p>
        <a
          href="#/journey"
          class="mt-10 inline-block rounded-sm bg-aizome px-6 py-3 font-medium text-white transition-colors hover:bg-aizome-deep"
        >
          <Show when={started()} fallback="Begin the journey">
            Continue ({pct()}% complete)
          </Show>
        </a>
      </section>

      <section class="mb-20 grid gap-10 sm:grid-cols-3">
        <div>
          <h2 class="font-display text-lg">What it is</h2>
          <p class="mt-2 text-ink-soft">
            Ikigai is the everyday worth in daily living: people, pursuits,
            places, memories; usually several small ones, not one grand
            answer.
          </p>
        </div>
        <div>
          <h2 class="font-display text-lg">What it isn't</h2>
          <p class="mt-2 text-ink-soft">
            Not the four-circle diagram. That graphic was drawn for a Spanish
            astrology-adjacent purpose model and rebranded in 2014.
          </p>
        </div>
        <div>
          <h2 class="font-display text-lg">How it works</h2>
          <p class="mt-2 text-ink-soft">
            Eight stages of short, sourced exercises. Your answers build one
            personal map, and a measured retest shows what changed.
          </p>
        </div>
      </section>

      <section class="mb-16 border-t border-line pt-6">
        <p class="text-sm text-ink-faint">
          No account, no analytics, no server. Everything you write stays in
          this browser, and you can export it any time.
        </p>
      </section>

      <p class="vertical-ja fixed top-1/2 right-6 hidden -translate-y-1/2 lg:block" lang="ja">
        生きがいを見つける
      </p>
    </Layout>
  );
}
