// Content schema for the guided journey. Steps are data; the Step page
// renders a small set of generic exercise editors per `kind`.

export type StepId = string; // `${stageIndex}-${stepIndex}`

export interface TeachStep {
  kind: "teach";
  title: string;
  /** Short sourced paragraphs. Plain text, one string per paragraph. */
  paragraphs: string[];
  bullets?: string[];
}

export interface PromptField {
  id: string;
  label: string;
  placeholder?: string;
  optional?: boolean;
  multiline?: boolean;
}

export interface PromptsStep {
  kind: "prompts";
  title: string;
  intro?: string;
  prompts: PromptField[];
}

export interface ScaleItem {
  id: string;
  label: string;
  /** Labels for the 0 and 4 ends of the 5-point scale. */
  minLabel: string;
  maxLabel: string;
}

export interface ScaleStep {
  kind: "scale";
  title: string;
  intro?: string;
  /**
   * Where a scored scale result is stored. `baseline`/`retest` write to the
   * dedicated journey fields; null means answers-only (unscored reflection).
   */
  target: "baseline" | "retest" | null;
  items: ScaleItem[];
}

export interface ListField {
  id: string;
  label: string;
  type: "text" | "textarea" | "number";
  placeholder?: string;
  required?: boolean;
}

export interface ListStep {
  kind: "list";
  title: string;
  intro?: string;
  entryNoun: string;
  minEntries?: number;
  maxEntries?: number;
  fields: ListField[];
}

export interface PickOption {
  id: string;
  label: string;
  description?: string;
}

export interface PickStep {
  kind: "pick";
  title: string;
  intro?: string;
  multi?: boolean;
  minSelections?: number;
  options: PickOption[];
  /** Optional free-text field, e.g. "add your own". */
  freeText?: { id: string; label: string };
}

export type Step =
  | TeachStep
  | PromptsStep
  | ScaleStep
  | ListStep
  | PickStep;

export interface Stage {
  /** Index in the journey (0-based, stable). */
  id: number;
  slug: string;
  title: string;
  tagline: string;
  /** The "between sessions" real-world action shown at stage end. */
  action: string;
  steps: Step[];
}

export function stepId(stageIndex: number, stepIndex: number): StepId {
  return `${stageIndex}-${stepIndex}`;
}

export function totalSteps(stage: Stage): number {
  return stage.steps.length;
}
