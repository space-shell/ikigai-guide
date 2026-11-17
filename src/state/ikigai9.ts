// The Ikigai-9 scale — Imai, Osada & Nishi (2012), English validation
// Fido, Kotera & Asano (2019), doi:10.1007/s11469-019-00150-w.
// Items scored 0–4; three subscales of three items (0–12 each), total 0–36.

export interface Ikigai9Answers {
  // item ids q1..q9, values 0–4
  [itemId: string]: number;
}

export interface Ikigai9Score {
  emotional: number; // subscale 1: emotional fulfillment & well-being
  growth: number; // subscale 2: growth & future orientation
  contribution: number; // subscale 3: contribution & meaning
  total: number;
}

export const IKIGAI9_ITEMS = [
  { id: "q1", subscale: "emotional", label: "I often feel that I am happy." },
  {
    id: "q2",
    subscale: "growth",
    label: "I would like to learn something new or start something.",
  },
  {
    id: "q3",
    subscale: "contribution",
    label: "I feel that I am contributing to someone or society.",
  },
  { id: "q4", subscale: "emotional", label: "I have room in my mind." },
  { id: "q5", subscale: "growth", label: "I am interested in many things." },
  {
    id: "q6",
    subscale: "contribution",
    label: "I think that my existence is needed by something or someone.",
  },
  {
    id: "q7",
    subscale: "emotional",
    label: "My life is mentally rich and fulfilled.",
  },
  { id: "q8", subscale: "growth", label: "I would like to develop myself." },
  {
    id: "q9",
    subscale: "contribution",
    label: "I believe that I have some impact on someone.",
  },
] as const;

export function isIkigai9Answers(value: unknown): value is Ikigai9Answers {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return IKIGAI9_ITEMS.every((item) => {
    const v = record[item.id];
    return typeof v === "number" && Number.isInteger(v) && v >= 0 && v <= 4;
  });
}

export function scoreIkigai9(answers: Ikigai9Answers): Ikigai9Score {
  const sum = (subscale: string) =>
    IKIGAI9_ITEMS
      .filter((item) => item.subscale === subscale)
      .reduce((acc, item) => acc + (answers[item.id] ?? 0), 0);

  const emotional = sum("emotional");
  const growth = sum("growth");
  const contribution = sum("contribution");
  return { emotional, growth, contribution, total: emotional + growth + contribution };
}
