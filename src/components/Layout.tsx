import { type JSX } from "solid-js";

/** Slim shared header for in-journey pages. */
export function Layout(props: { children: JSX.Element }) {
  return (
    <div class="min-h-dvh">
      <header class="border-b border-line">
        <div class="mx-auto flex max-w-prose items-center justify-between px-6 py-4">
          <a class="font-display text-base" href="#/">
            ikigai <span class="text-ink-faint">生きがい</span>
          </a>
          <nav class="flex gap-5 text-sm text-ink-soft" aria-label="Main">
            <a class="hover:text-ink underline-offset-4 hover:underline" href="#/journey">
              Journey
            </a>
            <a class="hover:text-ink underline-offset-4 hover:underline" href="#/map">
              Map
            </a>
            <a class="hover:text-ink underline-offset-4 hover:underline" href="#/settings">
              Settings
            </a>
          </nav>
        </div>
      </header>
      <main class="mx-auto max-w-prose px-6 py-10">{props.children}</main>
    </div>
  );
}
