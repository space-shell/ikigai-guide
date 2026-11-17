// Minimal hash router. Hash routes keep every URL valid under the GitHub
// Pages project base path (see docs/plan.md §1.4).

export type Route =
  | { name: "landing" }
  | { name: "journey" }
  | { name: "step"; stage: number; step: number }
  | { name: "map" }
  | { name: "settings" }
  | { name: "not-found" };

export function parseHash(hash: string): Route {
  const path = hash.replace(/^#/, "").replace(/\/+$/, "");
  if (path === "" || path === "/") return { name: "landing" };

  const segments = path.split("/").filter((s) => s.length > 0);

  if (segments[0] === "journey") {
    if (segments.length === 1) return { name: "journey" };
    if (segments.length === 3) {
      const stage = Number(segments[1]);
      const step = Number(segments[2]);
      if (Number.isInteger(stage) && Number.isInteger(step)) {
        return { name: "step", stage, step };
      }
    }
  }

  if (segments[0] === "map" && segments.length === 1) return { name: "map" };
  if (segments[0] === "settings" && segments.length === 1) {
    return { name: "settings" };
  }

  return { name: "not-found" };
}

export function currentRoute(): Route {
  return parseHash(window.location.hash);
}

export function navigate(to: string): void {
  window.location.hash = to;
}

export function hrefFor(route: Route): string {
  switch (route.name) {
    case "landing":
      return "#/";
    case "journey":
      return "#/journey";
    case "step":
      return `#/journey/${route.stage}/${route.step}`;
    case "map":
      return "#/map";
    case "settings":
      return "#/settings";
    case "not-found":
      return "#/";
  }
}
