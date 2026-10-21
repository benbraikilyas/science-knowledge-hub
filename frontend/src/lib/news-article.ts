import type { Article } from './types';

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

// Some sourced news entries do not have a publisher-supplied image. Use
// openly licensed images from Wikimedia Commons/NASA instead of repeating one local
// placeholder. The article id picks a stable image from the subject's set.
const NEWS_CATEGORY_IMAGES: Record<string, string[]> = {
  ai: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Laboratory%20robot%20Eve.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/NCATS%20Robots%20%285964663649%29.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Full%20wafer%20of%20Intel%20quantum%20computers.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Industrial%20robot.jpg?width=1280',
  ],
  robotics: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Industrial%20robot.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Robotic%20Arm.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Lexington%20Medical%2C%20Inc.%20Manufacturing%20Robot%20Arm.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Robot%20arm%20picks%20up%20cylindrical%20objects%20in%20a%20factory%20setting.jpg?width=1280',
  ],
  space: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Webb%20image%20of%20M82%20%28SVS14968%20-%20Webb%20M82%29.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Cartwheel%20Galaxy.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Sombrero%20Galaxy.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Galaxies%20in%20a%20cosmic%20house%20of%20mirrors%20ESA529016.jpg?width=1280',
  ],
  astronomy: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Sombrero%20Galaxy.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Cartwheel%20Galaxy.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Webb%20image%20of%20M82%20%28SVS14968%20-%20Webb%20M82%29.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/COSMOS%20Field%20MoM-z14%20Galaxy%20%28NIRCam%20pullout%20image%29%20%28weic2603a%29.jpg?width=1280',
  ],
  physics: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Full%20wafer%20of%20Intel%20quantum%20computers.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Silicon%20wafer.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Micro-chips%20wafer.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Haswell%20Chip.jpg?width=1280',
  ],
  quantum: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Full%20wafer%20of%20Intel%20quantum%20computers.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Quantum%20computer.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Silicon%20wafers.jpg?width=1280',
  ],
  experiments: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Looking%20through%20a%20microscope.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Man%20with%20microscope%20in%20lab.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Robert%20Hooke%27s%20microscope.png?width=1280',
  ],
  biology: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/DNA%20Model%20Crick-Watson.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/DNA.png?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Dna-163466.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/DNA-structure-and-bases.png?width=1280',
  ],
  technology: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Semiconductor%20Wafer%20of%20Microelectronics.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Micro-chips%20wafer.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Silicon%20wafers.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Haswell%20Chip.jpg?width=1280',
  ],
  missions: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Lunar%20Rover.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Lunar%20Rover%20Apollo%2017.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Apollo15LunarRover.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Lunar%20Electric%20Rover%202008%20desert%20testing.jpg?width=1280',
  ],
  future: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Full%20wafer%20of%20Intel%20quantum%20computers.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Robotic%20Arm.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Silicon%20wafers.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Lunar%20Electric%20Rover%202008%20desert%20testing.jpg?width=1280',
  ],
  scientists: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Man%20with%20microscope%20in%20lab.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Looking%20through%20a%20microscope.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Laboratory%20robot%20Eve.jpg?width=1280',
  ],
  'scientific-theories': [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Full%20wafer%20of%20Intel%20quantum%20computers.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/DNA.png?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Silicon%20wafer.jpg?width=1280',
  ],
  'history-of-science': [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Robert%20Hooke%27s%20microscope.png?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/DNA%20Model%20Crick-Watson.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Lunar%20Rover.jpg?width=1280',
  ],
  mathematics: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Haswell%20Chip.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Silicon%20wafers.jpg?width=1280',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Full%20wafer%20of%20Intel%20quantum%20computers.jpg?width=1280',
  ],
};

const NEWS_CATEGORY_IMAGE_ALIASES: Record<string, string> = {
  'artificial-intelligence': 'ai',
  'quantum-physics': 'quantum',
  'scientific-experiments': 'experiments',
  'space-missions': 'missions',
  'future-technologies': 'future',
};

// When the publisher exposes a real article image, prefer that exact image
// for the matching story before using the category fallback below.
const NEWS_ARTICLE_IMAGES: Record<string, string> = {
  'news-ai-weathernext-3-2026':
    'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/WeatherNext3_diagrams_fig-01.width-1200.format-webp.webp',
  'robotics-news-ottava-fda-2026':
    'https://jnj-content-lab2.brightspotcdn.com/dims4/default/243f65b/2147483647/strip/true/crop/7838x4409%2B0%2B352/resize/1440x810%21/quality/90/?url=https%3A%2F%2Fjnj-production-jnj.s3.us-east-1.amazonaws.com%2Fbrightspot%2Ff2%2F26%2F76c41aae45b8a0a5802b9cd82c0f%2Fottava-hero.jpg',
  'robotics-news-waymo-safety-220m-2026':
    'https://lh3.googleusercontent.com/yevE3jyiROCQqiwXaGJtzhk8AvQ9HXNgGYNCvROXWidpxZIstqU9f7wLlUFVxDQhjupJBwCH4pj65o1-rRxqqreuOYUXyd6D0Fw%3De365-s420',
  'science-news-mom-z14-2026':
    'https://assets.science.nasa.gov/dynamicimage/assets/science/missions/webb/science/2026/01/STScI-01K3HEQQQ86HVER8ZEE8QQMCGX.jpg?crop=faces%2Cfocalpoint&fit=clip&h=640&w=1536',
  'news-ai-model-hardware-standard-2026':
    'https://www.anthropic.com/_next/image?q=75&url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2F0aa7623ba0e545ce39e0de725583c0445ce6b76d-1999x1250.png&w=3840',
  'robotics-news-atlas-product-2026':
    'https://s.yimg.com/ny/api/res/1.2/b_gsUlkFs1j08wSUQjP0kA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTI0MDA7aD0xMzUwO2NmPXdlYnA-/https%3A/media.zenfs.com/en/engadget_703/67b1bb055f59614d8477b91da6ca096b',
  'robotics-news-figure-helix-02-2026':
    'https://assets.newatlas.com/dims4/default/fb4545c/2147483647/strip/true/crop/2943x1962%2B0%2B0/resize/1440x960%21/format/webp/quality/90/?url=https%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2F0a%2Fea%2F4f3e9e1b4188b3f147d316443c9e%2F0-collaboration-figure-02-robots.jpg',
};

export function getNewsArticleImage(categorySlug: string, image?: string, articleId = '') {
  // The old local `/images/articles/*` files are editorial placeholders. Keep
  // a real supplied URL, but replace those placeholders with a web image.
  if (image && !image.startsWith('/images/articles/')) return image;
  if (NEWS_ARTICLE_IMAGES[articleId]) return NEWS_ARTICLE_IMAGES[articleId];
  const categoryKey = NEWS_CATEGORY_IMAGE_ALIASES[categorySlug] || categorySlug;
  const candidates = NEWS_CATEGORY_IMAGES[categoryKey] || [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Industrial%20robot.jpg?width=1280',
  ];
  let hash = 0;
  for (const character of articleId) hash = (hash * 31 + character.charCodeAt(0)) | 0;
  return candidates[Math.abs(hash) % candidates.length];
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
