import { createSignal, Show } from "solid-js";
import { exportJson, importJson, journey, resetJourney } from "../state/store";
import { Layout } from "../components/Layout";

export function Settings() {
  const [importMsg, setImportMsg] = createSignal<string | null>(null);
  const [resetConfirm, setResetConfirm] = createSignal("");
  const [resetDone, setResetDone] = createSignal(false);

  const completed = () => Object.keys(journey.steps).length;

  const download = () => {
    const blob = new Blob([exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ikigai-guide-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    const text = await file.text();
    if (importJson(text)) {
      setImportMsg("Imported — your journey state was replaced.");
    } else {
      setImportMsg(
        "That file isn't a valid ikigai-guide export (wrong shape or version).",
      );
    }
  };

  return (
    <Layout>
      <div class="mb-8">
        <p class="kicker mb-2">Settings</p>
        <h1 class="font-display text-3xl">Your data</h1>
        <p class="mt-2 text-ink-soft">
          {completed() > 0
            ? `${completed()} completed step${completed() === 1 ? "" : "s"} saved in this browser.`
            : "No journey progress saved yet."}{" "}
          Nothing ever leaves your device.
        </p>
      </div>

      <section class="mb-8 border-t border-line pt-6">
        <h2 class="font-display mb-3 text-xl">Export</h2>
        <p class="mb-3 text-sm text-ink-soft">
          Downloads everything — answers, progress, baseline and retest — as one
          JSON file. Keep it anywhere; import it on any device.
        </p>
        <button
          type="button"
          class="rounded-sm bg-aizome px-4 py-2 text-sm font-medium text-white hover:bg-aizome-deep"
          onClick={download}
        >
          Download export
        </button>
      </section>

      <section class="mb-8 border-t border-line pt-6">
        <h2 class="font-display mb-3 text-xl">Import</h2>
        <p class="mb-3 text-sm text-ink-soft">
          Replaces the current journey state with the file's contents.
        </p>
        <input
          type="file"
          accept="application/json,.json"
          class="block text-sm text-ink-soft file:mr-3 file:rounded-sm file:border-0 file:bg-aizome file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-aizome-deep"
          onChange={(e) => onFile(e.currentTarget.files?.[0])}
        />
        <Show when={importMsg()}>
          <p
            class="mt-3 text-sm"
            classList={{
              "text-matcha": importMsg()!.startsWith("Imported"),
              "text-shu": !importMsg()!.startsWith("Imported"),
            }}
            role="status"
          >
            {importMsg()}
          </p>
        </Show>
      </section>

      <section class="border-t border-line pt-6">
        <h2 class="font-display mb-3 text-xl">Reset</h2>
        <p class="mb-3 text-sm text-ink-soft">
          Erases all saved progress in this browser. Your exports are unaffected.
        </p>
        <div class="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="type RESET to confirm"
            class="w-56 rounded-md border border-line bg-surface px-3 py-2 text-sm focus:border-aizome"
            value={resetConfirm()}
            onInput={(e) => setResetConfirm(e.currentTarget.value)}
          />
          <button
            type="button"
            disabled={resetConfirm().trim().toUpperCase() !== "RESET"}
            class="rounded-sm bg-shu px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => {
              resetJourney();
              setResetConfirm("");
              setResetDone(true);
            }}
          >
            Erase everything
          </button>
        </div>
        <Show when={resetDone()}>
          <p class="mt-3 text-sm text-matcha" role="status">
            Journey reset. A fresh start is at{" "}
            <a class="underline" href="#/journey">
              the beginning
            </a>
            .
          </p>
        </Show>
      </section>
    </Layout>
  );
}
