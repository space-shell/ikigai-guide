/* @refresh reload */
import { render } from "solid-js/web";
import { createSignal } from "solid-js";
import "./styles/app.css";
import { App } from "./App";
import { currentRoute, navigate, type Route } from "./router";

const [route, setRoute] = createSignal<Route>(currentRoute());

window.addEventListener("hashchange", () => setRoute(currentRoute()));

// Normalise a bare "#x" or empty hash so deep links always resolve.
if (!window.location.hash || window.location.hash === "#") {
  navigate("#/");
}

const root = document.getElementById("root");
if (!root) throw new Error("missing #root element");

render(() => <App route={route} />, root);
