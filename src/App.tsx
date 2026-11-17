import { type Accessor, Match, Switch } from "solid-js";
import type { Route } from "./router";
import { Landing } from "./pages/Landing";
import { JourneyMap } from "./pages/JourneyMap";

export function App(props: { route: Accessor<Route> }) {
  return (
    <Switch>
      <Match when={props.route().name === "landing"}>
        <Landing />
      </Match>
      <Match when={props.route().name === "journey"}>
        <JourneyMap />
      </Match>
      <Match when={props.route().name === "step"}>
        <StepPlaceholder route={props.route} />
      </Match>
      <Match when={props.route().name === "map"}>
        <Placeholder title="My Ikigai Map" note="Arrives in milestone M4." />
      </Match>
      <Match when={props.route().name === "settings"}>
        <Placeholder title="Settings" note="Export / import arrive in milestone M4." />
      </Match>
      <Match when={props.route().name === "not-found"}>
        <NotFound />
      </Match>
    </Switch>
  );
}

function StepPlaceholder(props: { route: Accessor<Route> }) {
  const r = props.route();
  if (r.name !== "step") return null;
  return (
    <Placeholder
      title="Journey step"
      note={`Stage ${r.stage}, step ${r.step} — the journey engine lands in milestone M1.`}
    />
  );
}

function Placeholder(props: { title: string; note: string }) {
  return (
    <main class="mx-auto flex min-h-dvh max-w-prose flex-col items-start justify-center gap-4 px-6">
      <p class="kicker">ikigai-guide</p>
      <h1 class="font-display text-3xl">{props.title}</h1>
      <p class="text-ink-soft">{props.note}</p>
      <a class="text-aizome underline-offset-4 hover:underline" href="#/">
        Back to start
      </a>
    </main>
  );
}

function NotFound() {
  return (
    <main class="mx-auto flex min-h-dvh max-w-prose flex-col items-start justify-center gap-4 px-6">
      <p class="kicker">404</p>
      <h1 class="font-display text-3xl">Nothing here</h1>
      <p class="text-ink-soft">That page does not exist.</p>
      <a class="text-aizome underline-offset-4 hover:underline" href="#/">
        Back to start
      </a>
    </main>
  );
}
