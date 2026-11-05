import { resolveInternalLinks } from './internal-links';
import { COMPUTING_DEEP_DIVES } from './scientist-deep-dives-computing';
import { GOLDEN_AGE_DEEP_DIVES } from './scientist-deep-dives-golden-age';
import { LIFE_SCIENCE_DEEP_DIVES } from './scientist-deep-dives-life';
import { PHYSICAL_SCIENCE_DEEP_DIVES } from './scientist-deep-dives-physical';

// Long-form sections for scientist profiles: early life, the work in plain language,
// a timeline, common myths, legacy and short answers to the questions people search.
export interface ScientistDeepDive {
  /** One-sentence answer to "who was this person?", used as the lead and meta description. */
  summary: string;
  earlyLife: string;
  work: string[];
  timeline: [string, string][];
  myths: { myth: string; fact: string }[];
  legacy: string;
  faqs: { question: string; answer: string }[];
  /** Internal pages to read next: /articles, /scientists, /guides, /categories or /learn#path. */
  related: string[];
}

const DEEP_DIVES: Record<string, ScientistDeepDive> = {
  ...PHYSICAL_SCIENCE_DEEP_DIVES,
  ...COMPUTING_DEEP_DIVES,
  ...LIFE_SCIENCE_DEEP_DIVES,
  ...GOLDEN_AGE_DEEP_DIVES,
};

export function getScientistDeepDive(slug: string) {
  const deepDive = DEEP_DIVES[slug];
  if (!deepDive) return null;
  return { ...deepDive, related: resolveInternalLinks(slug, deepDive.related) };
}
