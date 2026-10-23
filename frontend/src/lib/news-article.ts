import type { Article } from './types';
import { CATEGORY_IMAGES } from './category-images';

export type NewsCategory = Pick<
  Article['category'],
  'id' | 'name' | 'slug' | 'color' | 'icon'
>;

export interface NewsArticleInput {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: NewsCategory;
  tags: string[];
  readTime: number;
  publishedAt: string;
  sourceUrls: string[];
  featuredImage?: string;
  isFeatured?: boolean;
}

export const NEWS_CATEGORIES: Record<string, NewsCategory> = {
  space: { id: '1', name: 'Space', slug: 'space', color: '#38bdf8', icon: '🚀' },
  astronomy: { id: '2', name: 'Astronomy', slug: 'astronomy', color: '#22d3ee', icon: '🔭' },
  physics: { id: '3', name: 'Physics', slug: 'physics', color: '#3b82f6', icon: '⚛️' },
  quantum: { id: '4', name: 'Quantum Physics', slug: 'quantum-physics', color: '#818cf8', icon: '🌌' },
  experiments: {
    id: '7',
    name: 'Scientific Experiments',
    slug: 'scientific-experiments',
    color: '#fb7185',
    icon: '🧪',
  },
  biology: { id: '8', name: 'Biology', slug: 'biology', color: '#2dd4bf', icon: '🧬' },
  ai: {
    id: '9',
    name: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    color: '#a78bfa',
    icon: '🧠',
  },
  technology: {
    id: '10',
    name: 'Technology',
    slug: 'technology',
    color: '#38bdf8',
    icon: '💻',
  },
  missions: {
    id: '13',
    name: 'Space Missions',
    slug: 'space-missions',
    color: '#22d3ee',
    icon: '🛰️',
  },
  future: {
    id: '15',
    name: 'Future Technologies',
    slug: 'future-technologies',
    color: '#34d399',
    icon: '🔮',
  },
  robotics: {
    id: '16',
    name: 'Robotics',
    slug: 'robotics',
    color: '#f97316',
    icon: '🦾',
  },
};

// Every article has its own openly licensed image in /images/articles, named after
// the article slug. Credits live in seo-images.json and on the Sources page.
const NEWS_ARTICLE_IMAGES: Record<string, string> = {
  'news-ai-weathernext-3-2026':
    '/images/articles/weathernext-3-hourly-global-ai-weather-forecasting-2026.webp',
  'news-ai-model-hardware-standard-2026':
    '/images/articles/model-hardware-standard-ai-agents-physical-equipment-2026.webp',
  'robotics-news-ottava-fda-2026':
    '/images/articles/fda-authorizes-ottava-surgical-system-2026.webp',
  'robotics-news-waymo-safety-220m-2026':
    '/images/articles/waymo-safety-results-220-million-driverless-miles-2026.webp',
  'news-ai-gpt-5-5-2026':
    '/images/articles/gpt-5-5-agentic-work-computer-use-safety-2026.webp',
  'news-ai-muse-spark-2026':
    '/images/articles/meta-muse-spark-multimodal-multi-agent-model-2026.webp',
  'science-news-mom-z14-2026':
    '/images/articles/webb-confirms-mom-z14-earliest-galaxy-2026.webp',
  'robotics-news-figure-helix-02-2026':
    '/images/articles/figure-helix-02-full-body-autonomy-2026.webp',
  'science-news-morocco-hominins-2026':
    '/images/articles/casablanca-morocco-hominin-fossils-773000-years-2026.webp',
  'science-news-pacific-storm-track-2026':
    '/images/articles/north-pacific-winter-storm-track-poleward-shift-2026.webp',
  'robotics-news-atlas-product-2026':
    '/images/articles/boston-dynamics-product-atlas-industrial-robot-2026.webp',
  'news-ai-eu-gpai-rules-2025':
    '/images/articles/eu-ai-act-general-purpose-ai-model-rules-2025.webp',
  'robotics-news-srt-h-surgery-2025':
    '/images/articles/srt-h-autonomous-gallbladder-surgery-2025.webp',
  'news-ai-claude-4-agents-2025':
    '/images/articles/claude-4-long-running-ai-agents-coding-2025.webp',
  'science-news-personalized-base-editing-2025':
    '/images/articles/personalized-base-editing-infant-cps1-deficiency-2025.webp',
  'news-ai-alphaevolve-2025':
    '/images/articles/alphaevolve-ai-agent-algorithm-discovery-2025.webp',
  'science-news-alice-lead-gold-2025':
    '/images/articles/alice-lead-to-gold-lhc-nuclear-transmutation-2025.webp',
  'robotics-news-amazon-vulcan-2025':
    '/images/articles/amazon-vulcan-force-feedback-warehouse-robot-2025.webp',
  'robotics-news-phase-transition-soft-actuator-2025':
    '/images/articles/water-phase-transition-soft-actuators-2025.webp',
  'science-news-microns-connectome-2025':
    '/images/articles/microns-mouse-visual-cortex-connectome-2025.webp',
  'news-ai-llama-4-2025':
    '/images/articles/llama-4-open-weight-multimodal-mixture-experts-2025.webp',
  'news-ai-gemini-2-5-2025':
    '/images/articles/gemini-2-5-thinking-model-reasoning-2025.webp',
  'science-news-desi-dark-energy-2025':
    '/images/articles/desi-three-year-results-evolving-dark-energy-2025.webp',
  'robotics-news-gemini-robotics-2025':
    '/images/articles/gemini-robotics-language-vision-actions-2025.webp',
  'science-news-spherex-launch-2025':
    '/images/articles/nasa-spherex-launch-all-sky-infrared-survey-2025.webp',
  'robotics-news-nasa-cadre-rovers-2025':
    '/images/articles/nasa-cadre-cooperative-moon-rovers-2025.webp',
  'science-news-distributed-quantum-computing-2025':
    '/images/articles/distributed-quantum-computing-optical-link-2025.webp',
  'robotics-news-iso-10218-2025':
    '/images/articles/iso-10218-2025-industrial-robot-safety-update.webp',
  'news-ai-deepseek-r1-2025':
    '/images/articles/deepseek-r1-open-weight-reasoning-model-2025.webp',
  'science-news-beyond-epica-oldest-ice-2025':
    '/images/articles/beyond-epica-antarctic-oldest-ice-core-2025.webp',
  'editorial-jwst':
    '/images/articles/how-james-webb-space-telescope-reads-early-universe.webp',
  'editorial-stars':
    '/images/articles/how-stars-are-born-live-and-die.webp',
  'editorial-dark-universe':
    '/images/articles/dark-matter-dark-energy-different-mysteries.webp',
  'editorial-entanglement':
    '/images/articles/quantum-entanglement-without-faster-than-light-myth.webp',
  'editorial-collaboration':
    '/images/articles/why-scientific-breakthroughs-rarely-belong-to-one-person.webp',
  'editorial-relativity':
    '/images/articles/general-relativity-curved-spacetime-working-gps.webp',
  'editorial-bell-tests':
    '/images/articles/how-bell-tests-turned-quantum-debate-into-data.webp',
  'editorial-crispr':
    '/images/articles/crispr-gene-editing-capabilities-limits.webp',
  'editorial-transformers':
    '/images/articles/how-transformer-models-process-language-and-fail.webp',
  'editorial-semiconductors':
    '/images/articles/how-semiconductors-turn-physics-into-computing.webp',
  'editorial-instruments':
    '/images/articles/how-instruments-changed-what-science-could-know.webp',
  'editorial-apollo':
    '/images/articles/apollo-11-engineering-behind-first-moon-landing.webp',
  'editorial-proof':
    '/images/articles/why-mathematical-proof-is-more-than-calculation.webp',
  'editorial-quantum-computing':
    '/images/articles/quantum-computing-after-hype-engineering-reality.webp',
};

export function getNewsArticleImage(categorySlug: string, image?: string, articleId = '') {
  return (
    NEWS_ARTICLE_IMAGES[articleId] ||
    image ||
    CATEGORY_IMAGES[categorySlug] ||
    CATEGORY_IMAGES.technology
  );
}

export const makeNewsArticle = (article: NewsArticleInput) => ({
  ...article,
  featuredImage: getNewsArticleImage(article.category.slug, article.featuredImage, article.id),
  thumbnail: getNewsArticleImage(article.category.slug, article.featuredImage, article.id),
  author: { id: 'sciencehub-editorial-team', displayName: 'ScienceHub Editorial Team' },
  isPublished: true,
  isFeatured: article.isFeatured ?? false,
  viewsCount: 0,
  likesCount: 0,
  metaTitle: article.title,
  metaDescription: article.excerpt,
  createdAt: article.publishedAt,
  updatedAt: article.publishedAt,
});
