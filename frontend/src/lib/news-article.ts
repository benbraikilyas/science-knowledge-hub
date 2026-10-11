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

export const makeNewsArticle = (article: NewsArticleInput) => ({
  ...article,
  featuredImage: article.featuredImage || '',
  thumbnail: article.featuredImage || '',
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
