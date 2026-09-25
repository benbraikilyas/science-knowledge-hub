// ========================================
// Science Knowledge Hub — Constants
// ========================================

import type { Category } from './types';
import { SCIENCE_BOOKS } from './books';
import { EDITORIAL_ARTICLES } from './editorial-articles';
import { LATEST_NEWS_ARTICLES } from './news-articles';

// Category Icons and Colors Mapping
export const CATEGORY_CONFIG: Record<string, { icon: string; color: string; gradient: string }> = {
  'space': {
    icon: '🚀',
    color: '#38bdf8',
    gradient: 'linear-gradient(135deg, #38bdf8 0%, #003566 100%)',
  },
  'astronomy': {
    icon: '🔭',
    color: '#22d3ee',
    gradient: 'linear-gradient(135deg, #22d3ee 0%, #004a8c 100%)',
  },
  'physics': {
    icon: '⚛️',
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #001d3d 100%)',
  },
  'quantum-physics': {
    icon: '🌌',
    color: '#818cf8',
    gradient: 'linear-gradient(135deg, #818cf8 0%, #002a54 100%)',
  },
  'scientists': {
    icon: '🧑‍🔬',
    color: '#ffc300',
    gradient: 'linear-gradient(135deg, #ffc300 0%, #e6b000 100%)',
  },
  'scientific-theories': {
    icon: '📐',
    color: '#34d399',
    gradient: 'linear-gradient(135deg, #34d399 0%, #003566 100%)',
  },
  'scientific-experiments': {
    icon: '🧪',
    color: '#fb7185',
    gradient: 'linear-gradient(135deg, #fb7185 0%, #002a54 100%)',
  },
  'biology': {
    icon: '🧬',
    color: '#2dd4bf',
    gradient: 'linear-gradient(135deg, #2dd4bf 0%, #001d3d 100%)',
  },
  'artificial-intelligence': {
    icon: '🤖',
    color: '#a78bfa',
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #003566 100%)',
  },
  'robotics': {
    icon: '🦾',
    color: '#f97316',
    gradient: 'linear-gradient(135deg, #f97316 0%, #7c2d12 100%)',
  },
  'technology': {
    icon: '💻',
    color: '#38bdf8',
    gradient: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)',
  },
  'history-of-science': {
    icon: '📜',
    color: '#fbbf24',
    gradient: 'linear-gradient(135deg, #fbbf24 0%, #002a54 100%)',
  },
  'books': {
    icon: '📚',
    color: '#818cf8',
    gradient: 'linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)',
  },
  'space-missions': {
    icon: '🛸',
    color: '#22d3ee',
    gradient: 'linear-gradient(135deg, #22d3ee 0%, #818cf8 100%)',
  },
  'mathematics': {
    icon: '➗',
    color: '#ffd60a',
    gradient: 'linear-gradient(135deg, #ffd60a 0%, #ffc300 100%)',
  },
  'future-technologies': {
    icon: '🔮',
    color: '#34d399',
    gradient: 'linear-gradient(135deg, #34d399 0%, #a78bfa 100%)',
  },
};

const articleCountFor = (slug: string) =>
  EDITORIAL_ARTICLES.filter((article) => article.category.slug === slug).length
  + LATEST_NEWS_ARTICLES.filter((article) => article.category.slug === slug).length
  + SCIENCE_BOOKS.filter((article) => article.category.slug === slug).length;

// Demo categories for development & static fallback
export const DEMO_CATEGORIES: Category[] = [
  { id: '1', name: 'Space', slug: 'space', description: 'Explore the cosmos through evidence from telescopes, spacecraft, and modern astrophysics.', icon: '🚀', color: '#38bdf8', articleCount: articleCountFor('space'), order: 1, isActive: true, createdAt: '', updatedAt: '' },
  { id: '2', name: 'Astronomy', slug: 'astronomy', description: 'Understand stars, planets, galaxies, and the observations used to study them.', icon: '🔭', color: '#22d3ee', articleCount: articleCountFor('astronomy'), order: 2, isActive: true, createdAt: '', updatedAt: '' },
  { id: '3', name: 'Physics', slug: 'physics', description: 'Follow the tested ideas that connect matter, energy, forces, and the structure of the universe.', icon: '⚛️', color: '#3b82f6', articleCount: articleCountFor('physics'), order: 3, isActive: true, createdAt: '', updatedAt: '' },
  { id: '4', name: 'Quantum Physics', slug: 'quantum-physics', description: 'Examine quantum experiments and technologies without the usual myths and exaggeration.', icon: '🌌', color: '#818cf8', articleCount: articleCountFor('quantum-physics'), order: 4, isActive: true, createdAt: '', updatedAt: '' },
  { id: '5', name: 'Scientists', slug: 'scientists', description: 'Meet the people, teams, and institutions behind discoveries, including contributors often left out of simplified histories.', icon: '🧑‍🔬', color: '#ffc300', articleCount: articleCountFor('scientists'), order: 5, isActive: true, createdAt: '', updatedAt: '' },
  { id: '6', name: 'Scientific Theories', slug: 'scientific-theories', description: 'Learn how scientific theories connect explanations to predictions that evidence can challenge.', icon: '📐', color: '#34d399', articleCount: articleCountFor('scientific-theories'), order: 6, isActive: true, createdAt: '', updatedAt: '' },
  { id: '7', name: 'Scientific Experiments', slug: 'scientific-experiments', description: 'See how controls, measurement, uncertainty, and replication turn questions into reliable evidence.', icon: '🧪', color: '#fb7185', articleCount: articleCountFor('scientific-experiments'), order: 7, isActive: true, createdAt: '', updatedAt: '' },
  { id: '8', name: 'Biology', slug: 'biology', description: 'Explore life from genes and cells to organisms, evolution, and ecosystems.', icon: '🧬', color: '#2dd4bf', articleCount: articleCountFor('biology'), order: 8, isActive: true, createdAt: '', updatedAt: '' },
  { id: '9', name: 'Artificial Intelligence', slug: 'artificial-intelligence', description: 'Understand how AI systems are built, evaluated, applied, and limited in the real world.', icon: '🤖', color: '#a78bfa', articleCount: articleCountFor('artificial-intelligence'), order: 9, isActive: true, createdAt: '', updatedAt: '' },
  { id: '10', name: 'Technology', slug: 'technology', description: 'Look inside the materials, systems, and engineering trade-offs behind everyday technologies.', icon: '💻', color: '#38bdf8', articleCount: articleCountFor('technology'), order: 10, isActive: true, createdAt: '', updatedAt: '' },
  { id: '11', name: 'History of Science', slug: 'history-of-science', description: 'Trace how instruments, institutions, debates, and cultures changed what humanity could know.', icon: '📜', color: '#fbbf24', articleCount: articleCountFor('history-of-science'), order: 11, isActive: true, createdAt: '', updatedAt: '' },
  { id: '12', name: 'Books', slug: 'books', description: 'Read original guides to influential public-domain science books, with legal archive access.', icon: '📚', color: '#818cf8', articleCount: articleCountFor('books'), order: 12, isActive: true, createdAt: '', updatedAt: '' },
  { id: '13', name: 'Space Missions', slug: 'space-missions', description: 'Study the engineering, operations, discoveries, and risks behind landmark missions.', icon: '🛸', color: '#22d3ee', articleCount: articleCountFor('space-missions'), order: 13, isActive: true, createdAt: '', updatedAt: '' },
  { id: '14', name: 'Mathematics', slug: 'mathematics', description: 'Build intuition for proof, patterns, abstraction, and the mathematical tools used across science.', icon: '➗', color: '#ffd60a', articleCount: articleCountFor('mathematics'), order: 14, isActive: true, createdAt: '', updatedAt: '' },
  { id: '15', name: 'Future Technologies', slug: 'future-technologies', description: 'Separate demonstrated progress from speculation in technologies that may shape the coming decades.', icon: '🔮', color: '#34d399', articleCount: articleCountFor('future-technologies'), order: 15, isActive: true, createdAt: '', updatedAt: '' },
  { id: '16', name: 'Robotics', slug: 'robotics', description: 'Follow verified progress in humanoid, industrial, medical, autonomous, space, and soft robotics.', icon: '🦾', color: '#f97316', articleCount: articleCountFor('robotics'), order: 16, isActive: true, createdAt: '', updatedAt: '' },
];

// Sourced 2025–2026 news, original evergreen explainers, and verified public-domain books.
export const DEMO_ARTICLES = [
  ...LATEST_NEWS_ARTICLES,
  ...[...EDITORIAL_ARTICLES, ...SCIENCE_BOOKS].sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime()
  ),
];

// Demo scientists are maintained separately because each profile includes
// a biography, breakthroughs, sources, and discovery details.
export { DEMO_SCIENTISTS } from './scientists';

// Platform stats for the homepage
export const PLATFORM_STATS = {
  articlesCount: LATEST_NEWS_ARTICLES.length + EDITORIAL_ARTICLES.length + SCIENCE_BOOKS.length,
  scientistsCount: 26,
  categoriesCount: 16,
  collectionsCount: 6,
};
