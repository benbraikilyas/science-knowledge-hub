import type { ArticleListItem, ScientistListItem } from './types';
import { selectArticlesForCategory } from './constants';
import { DEMO_SCIENTISTS } from './scientists';
import { toArticleListItem } from './article-list';

export interface ArticleFaqItem {
  question: string;
  answer: string;
}

interface ParsedSection {
  heading: string;
  paragraphs: string[];
}

function stripMarkdownLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
}

function firstSentences(text: string, maxSentences = 2): string {
  const clean = stripMarkdownLinks(text);
  const parts = clean.match(/[^.!?]+[.!?]+/g);
  if (!parts || parts.length === 0) return clean;
  return parts.slice(0, maxSentences).join(' ').trim();
}

function parseContentSections(content: string): ParsedSection[] {
  const lines = content.split('\n');
  const sections: ParsedSection[] = [];
  let current: ParsedSection | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith('## ')) {
      const heading = stripMarkdownLinks(line.slice(3));
      if (/^(references|primary sources|about this free edition)$/i.test(heading)) {
        current = null;
        continue;
      }
      current = { heading, paragraphs: [] };
      sections.push(current);
      continue;
    }

    // Headings, lists, quotes, figures, tables and formulas are not answer text.
    if (/^(### |- |> |!\[|\||\$\$)/.test(line)) {
      continue;
    }

    if (current) {
      current.paragraphs.push(stripMarkdownLinks(line));
    }
  }

  return sections.filter((section) => section.paragraphs.length > 0);
}

function headingToQuestion(heading: string, title: string): string {
  // A heading that is already a question is used as written.
  if (heading.trim().endsWith('?')) return heading.trim();
  const cleanHeading = heading.replace(/[.?!]+$/, '').trim();

  if (/^(what|why|how|when|where|who|which|is|are|was|were|does|do|did|can|could|will|should)\b/i.test(cleanHeading)) {
    return `${cleanHeading}?`;
  }

  if (/limit|risk|challenge|uncertainty|fail|constraint|tradeoff|trade-off/i.test(cleanHeading)) {
    return `What are the main limitations and risks regarding ${cleanHeading.toLowerCase()}?`;
  }

  return `How does "${cleanHeading}" relate to ${title}?`;
}

export function getArticleTakeaways(content?: string, excerpt?: string): string[] {
  if (!content || !content.trim()) return excerpt ? [excerpt] : [];
  const sections = parseContentSections(content);
  const takeaways = sections
    .slice(0, 4)
    .map((section) => firstSentences(section.paragraphs[0], 1))
    .filter((item) => item.length > 25);

  return takeaways.length >= 2 ? takeaways : excerpt ? [excerpt, ...takeaways] : takeaways;
}

export function getArticleFaqs(
  title: string,
  excerpt: string,
  content?: string
): ArticleFaqItem[] {
  if (!content || !content.trim()) return [];
  const sections = parseContentSections(content);
  if (sections.length === 0) return [];

  const faqs: ArticleFaqItem[] = [
    {
      question: `What is the main takeaway of "${title}"?`,
      answer: `${excerpt} ${firstSentences(sections[0].paragraphs[0], 1)}`.trim(),
    },
  ];

  for (const section of sections.slice(1, 4)) {
    const answer = firstSentences(section.paragraphs.join(' '), 2);
    if (answer.length < 40) continue;
    faqs.push({
      question: headingToQuestion(section.heading, title),
      answer,
    });
  }

  return faqs;
}

// Map article tags to indexable internal hubs instead of /search?q= (which is noindex and disallowed in robots.txt).
const TAG_TO_HREF: Record<string, string> = {
  jwst: '/articles/how-james-webb-space-telescope-reads-early-universe',
  'james webb telescope': '/articles/how-james-webb-space-telescope-reads-early-universe',
  'infrared astronomy': '/categories/astronomy',
  galaxies: '/categories/astronomy',
  exoplanets: '/categories/space',
  stars: '/categories/astronomy',
  'stellar evolution': '/articles/how-stars-are-born-live-and-die',
  supernovae: '/categories/astronomy',
  astronomy: '/categories/astronomy',
  space: '/categories/space',
  cosmology: '/categories/space',
  'dark matter': '/articles/dark-matter-dark-energy-different-mysteries',
  'dark energy': '/articles/dark-matter-dark-energy-different-mysteries',
  'general relativity': '/articles/general-relativity-curved-spacetime-working-gps',
  relativity: '/categories/physics',
  gravity: '/categories/physics',
  gravitation: '/categories/physics',
  spacetime: '/categories/physics',
  gps: '/articles/general-relativity-curved-spacetime-working-gps',
  physics: '/categories/physics',
  'classical mechanics': '/categories/physics',
  thermodynamics: '/categories/physics',
  optics: '/categories/physics',
  electromagnetism: '/categories/physics',
  'quantum physics': '/categories/quantum-physics',
  'quantum mechanics': '/categories/quantum-physics',
  entanglement: '/articles/quantum-entanglement-without-faster-than-light-myth',
  'quantum entanglement': '/articles/quantum-entanglement-without-faster-than-light-myth',
  'bell test': '/articles/how-bell-tests-turned-quantum-debate-into-data',
  'quantum computing': '/articles/quantum-computing-after-hype-engineering-reality',
  qubits: '/categories/quantum-physics',
  crispr: '/articles/crispr-gene-editing-capabilities-limits',
  'gene editing': '/articles/crispr-gene-editing-capabilities-limits',
  'base editing': '/categories/biology',
  genetics: '/categories/biology',
  dna: '/categories/biology',
  biology: '/categories/biology',
  evolution: '/categories/biology',
  'natural selection': '/articles/on-the-origin-of-species',
  neuroscience: '/categories/biology',
  medicine: '/categories/biology',
  'artificial intelligence': '/categories/artificial-intelligence',
  'ai research': '/categories/artificial-intelligence',
  'ai agents': '/guides/best-ai-explainers',
  'reasoning models': '/guides/best-ai-explainers',
  'thinking models': '/guides/best-ai-explainers',
  'open weights': '/guides/best-ai-explainers',
  'multimodal ai': '/categories/artificial-intelligence',
  'large language models': '/articles/how-transformer-models-process-language-and-fail',
  transformers: '/articles/how-transformer-models-process-language-and-fail',
  'machine learning': '/categories/artificial-intelligence',
  'reinforcement learning': '/categories/artificial-intelligence',
  robotics: '/categories/robotics',
  'humanoid robots': '/categories/robotics',
  'surgical robotics': '/categories/robotics',
  'industrial robots': '/categories/robotics',
  'soft robotics': '/categories/robotics',
  'autonomous vehicles': '/categories/robotics',
  semiconductors: '/articles/how-semiconductors-turn-physics-into-computing',
  computing: '/categories/technology',
  technology: '/categories/technology',
  engineering: '/categories/technology',
  mathematics: '/categories/mathematics',
  geometry: '/categories/mathematics',
  calculus: '/categories/mathematics',
  proof: '/articles/why-mathematical-proof-is-more-than-calculation',
  'scientific method': '/categories/scientific-experiments',
  experiments: '/categories/scientific-experiments',
  instruments: '/articles/how-instruments-changed-what-science-could-know',
  'history of science': '/categories/history-of-science',
  classics: '/categories/books',
  'apollo 11': '/articles/apollo-11-engineering-behind-first-moon-landing',
  'history of zero': '/articles/who-invented-zero-history-of-zero',
  brahmagupta: '/articles/who-invented-zero-history-of-zero',
  'place value': '/articles/who-invented-zero-history-of-zero',
  'number systems': '/articles/who-invented-zero-history-of-zero',
  'indian mathematics': '/categories/mathematics',
  'al-khwarizmi': '/scientists/al-khwarizmi',
  fibonacci: '/categories/mathematics',
  'house of wisdom': '/articles/house-of-wisdom-baghdad-history',
  'translation movement': '/articles/house-of-wisdom-baghdad-history',
  'abbasid caliphate': '/articles/house-of-wisdom-baghdad-history',
  'islamic golden age': '/scientists/muslim-scientists',
  baghdad: '/articles/house-of-wisdom-baghdad-history',
  'scientific theory': '/articles/scientific-theory-vs-law-vs-hypothesis',
  'scientific law': '/articles/scientific-theory-vs-law-vs-hypothesis',
  hypothesis: '/articles/scientific-theory-vs-law-vs-hypothesis',
  'philosophy of science': '/categories/scientific-theories',
  falsifiability: '/articles/scientific-theory-vs-law-vs-hypothesis',
  'double-slit experiment': '/articles/double-slit-experiment-explained',
  'wave-particle duality': '/articles/double-slit-experiment-explained',
  'observer effect': '/articles/double-slit-experiment-explained',
  interference: '/articles/double-slit-experiment-explained',
  'thomas young': '/articles/double-slit-experiment-explained',
  electrons: '/categories/quantum-physics',
  starship: '/articles/how-spacex-caught-starship-flight-15-tower-catch',
  'starship flight 15': '/articles/how-spacex-caught-starship-flight-15-tower-catch',
  'tower catch': '/articles/how-spacex-caught-starship-flight-15-tower-catch',
  'super heavy': '/articles/how-spacex-caught-starship-flight-15-tower-catch',
  'saturn v': '/articles/starship-vs-saturn-v-size-thrust-payload',
  'rocket comparison': '/articles/starship-vs-saturn-v-size-thrust-payload',
  'rocket equation': '/articles/why-starship-must-refuel-in-orbit-rocket-equation',
  'delta-v': '/articles/why-starship-must-refuel-in-orbit-rocket-equation',
  'specific impulse': '/articles/why-starship-must-refuel-in-orbit-rocket-equation',
  'orbital refueling': '/articles/why-starship-must-refuel-in-orbit-rocket-equation',
  'konstantin tsiolkovsky': '/articles/why-starship-must-refuel-in-orbit-rocket-equation',
  'falcon 9': '/articles/how-spacex-lands-falcon-9-rockets-landing-burn-physics',
  'rocket landing': '/articles/how-spacex-lands-falcon-9-rockets-landing-burn-physics',
  hoverslam: '/articles/how-spacex-lands-falcon-9-rockets-landing-burn-physics',
  'grid fins': '/articles/how-spacex-lands-falcon-9-rockets-landing-burn-physics',
  'booster recovery': '/articles/how-spacex-lands-falcon-9-rockets-landing-burn-physics',
  'reusable rockets': '/articles/how-spacex-lands-falcon-9-rockets-landing-burn-physics',
  spacex: '/categories/space-missions',
  'orbital mechanics': '/tools#escape-velocity',
  'apollo program': '/articles/apollo-11-engineering-behind-first-moon-landing',
  artemis: '/categories/space-missions',
  thrust: '/articles/starship-vs-saturn-v-size-thrust-payload',
  payload: '/articles/starship-vs-saturn-v-size-thrust-payload',
  'space missions': '/categories/space-missions',
  nasa: '/categories/space-missions',
  darwin: '/scientists/charles-darwin',
  newton: '/scientists/isaac-newton',
  einstein: '/scientists/albert-einstein',
  galileo: '/scientists/galileo-galilei',
  faraday: '/scientists/michael-faraday',
  planck: '/scientists/max-planck',
  bohr: '/scientists/niels-bohr',
  maxwell: '/scientists/james-clerk-maxwell',
};

export function resolveTagHref(tag: string, fallbackCategorySlug = 'space'): string {
  const key = tag.toLowerCase().trim();
  if (TAG_TO_HREF[key]) return TAG_TO_HREF[key];

  if (key.includes('robot') || key.includes('actuator')) return '/categories/robotics';
  if (key.includes('ai') || key.includes('model') || key.includes('agent') || key.includes('llm')) {
    return '/categories/artificial-intelligence';
  }
  if (key.includes('quantum') || key.includes('qubit')) return '/categories/quantum-physics';
  if (key.includes('space') || key.includes('lunar') || key.includes('moon') || key.includes('mars') || key.includes('rover')) {
    return '/categories/space-missions';
  }
  if (key.includes('galaxy') || key.includes('star') || key.includes('telescope') || key.includes('cosmic')) {
    return '/categories/astronomy';
  }
  if (key.includes('gene') || key.includes('bio') || key.includes('brain') || key.includes('fossil') || key.includes('cell')) {
    return '/categories/biology';
  }
  if (key.includes('math') || key.includes('theorem') || key.includes('equation')) {
    return '/categories/mathematics';
  }
  return `/categories/${fallbackCategorySlug}`;
}

const CATEGORY_SCIENTIST_FILTER: Record<string, (s: ScientistListItem) => boolean> = {
  space: (s) => /astronomy|cosmology|astrophysics|aerospace/i.test(s.field) || /katherine-johnson|galileo|kepler|copernicus|hawking|al-battani|al-tusi/i.test(s.slug),
  astronomy: (s) => /astronomy|cosmology|astrophysics/i.test(s.field) || /galileo|kepler|copernicus|hawking|al-battani|al-tusi|omar-khayyam/i.test(s.slug),
  physics: (s) => /physics|electromagnetism|mechanics|optics/i.test(s.field),
  'quantum-physics': (s) => /einstein|planck|bohr|schrodinger|heisenberg|curie|meitner|rutherford|fermi|dirac/i.test(s.slug) || /quantum|atomic|nuclear/i.test(s.field),
  scientists: () => true,
  'scientific-theories': (s) => /einstein|newton|darwin|maxwell|planck|bohr|schrodinger|mendel|copernicus|hawking|ibn-khaldun/i.test(s.slug),
  'scientific-experiments': (s) => /faraday|curie|galileo|pasteur|franklin|ibn-al-haytham|rutherford|fermi|mendel|jenner|koch|fleming/i.test(s.slug),
  biology: (s) => s.group === 'Life Sciences' || /biology|medicine|genetics|microbiology|botany|ecology/i.test(s.field),
  'artificial-intelligence': (s) => s.group === 'Computing & Algorithms',
  technology: (s) => s.group === 'Computing & Algorithms' || /engineering|invention|wireless/i.test(s.field) || /tesla|faraday|al-jazari|ibn-firnas/i.test(s.slug),
  'history-of-science': (s) => s.group === 'Arab & Muslim Pioneers' || /copernicus|galileo|newton|darwin|kepler/i.test(s.slug),
  'space-missions': (s) => /katherine-johnson|margaret-hamilton|galileo|kepler|newton/i.test(s.slug),
  mathematics: (s) => /mathematics|algebra|trigonometry|computing|logic|geometry/i.test(s.field) || /al-khwarizmi|omar-khayyam|al-tusi|newton|lovelace|boole|turing|von-neumann|shannon|katherine-johnson/i.test(s.slug),
  'future-technologies': (s) => /turing|von-neumann|shannon|berners-lee|tesla|hawking|hedy-lamarr/i.test(s.slug),
  robotics: (s) => /al-jazari|turing|von-neumann|shannon|margaret-hamilton|tesla/i.test(s.slug),
  books: (s) => /darwin|newton|einstein|galileo|faraday|maxwell|planck|bohr/i.test(s.slug),
};

export function getEnrichedCategoryArticles(slug: string): ArticleListItem[] {
  return selectArticlesForCategory(slug).map(toArticleListItem);
}

export function getCategoryScientists(slug: string, limit = 8): ScientistListItem[] {
  const filterFn = CATEGORY_SCIENTIST_FILTER[slug];
  if (!filterFn) return [];
  return DEMO_SCIENTISTS.filter(filterFn).slice(0, limit);
}
