import { DEMO_ARTICLES, DEMO_CATEGORIES } from './constants';
import { GUIDES } from './guides';
import { LEARNING_PATHS } from './learning-paths';
import { DEMO_SCIENTISTS } from './scientists';
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

function linkLabel(href: string) {
  const [path, hash] = href.split('#');
  const slug = path.split('/').pop();
  if (path.startsWith('/articles/')) return DEMO_ARTICLES.find((article) => article.slug === slug)?.title;
  if (path.startsWith('/scientists/')) return DEMO_SCIENTISTS.find((scientist) => scientist.slug === slug)?.name;
  if (path.startsWith('/guides/')) return GUIDES.find((guide) => guide.slug === slug)?.title;
  if (path.startsWith('/categories/')) {
    const category = DEMO_CATEGORIES.find((item) => item.slug === slug);
    return category && `${category.name} articles`;
  }
  if (path === '/learn' && hash) {
    const learningPath = LEARNING_PATHS.find((item) => item.id === hash);
    return learningPath && `Learning path: ${learningPath.title}`;
  }
  return undefined;
}

export function getScientistDeepDive(slug: string) {
  const deepDive = DEEP_DIVES[slug];
  if (!deepDive) return null;

  return {
    ...deepDive,
    related: deepDive.related.map((href) => {
      const label = linkLabel(href);
      // Fail the build rather than publish a profile with a dead "read next" link.
      if (!label) throw new Error(`Scientist "${slug}" links to unknown page "${href}"`);
      return { href, label };
    }),
  };
}
