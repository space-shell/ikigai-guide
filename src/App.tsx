import { type Accessor, Match, Switch } from "solid-js";
import type { Route } from "./router";
import { Landing } from "./pages/Landing";
import { JourneyMap } from "./pages/JourneyMap";
import { Step } from "./pages/Step";
import { Map } from "./pages/Map";
import { Settings } from "./pages/Settings";
import { Layout } from "./components/Layout";

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
        <Step route={props.route} />
      </Match>
      <Match when={props.route().name === "map"}>
        <Map />
      </Match>
      <Match when={props.route().name === "settings"}>
        <Settings />
      </Match>
      <Match when={props.route().name === "not-found"}>
        <NotFound />
      </Match>
    </Switch>
  );
}

function NotFound() {
  return (
    <Layout>
      <div class="flex min-h-[60vh] flex-col items-start justify-center gap-4">
        <p class="kicker">404</p>
        <h1 class="font-display text-3xl">Nothing here</h1>
        <p class="text-ink-soft">That page does not exist.</p>
        <a class="text-aizome underline-offset-4 hover:underline" href="#/">
          Back to start
        </a>
      </div>
    </Layout>
  );
}
