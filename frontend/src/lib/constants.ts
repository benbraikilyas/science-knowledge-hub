// ========================================
// Science Knowledge Hub — Constants
// ========================================

import type { Category, NavItem } from './types';

export const SITE_NAME = 'Science Knowledge Hub';
export const SITE_DESCRIPTION = 'An independent educational project exploring scientists, discoveries, and ideas across science and technology.';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Navigation Items
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Articles', href: '/articles' },
  { label: 'Categories', href: '/categories' },
  { label: 'Scientists', href: '/scientists' },
];

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

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`;

export const CATEGORY_IMAGES: Record<string, string> = {
  'space': unsplash('photo-1446776811953-b23d57bd21aa'),
  'astronomy': unsplash('photo-1462331940025-496dfbfc7564'),
  'physics': unsplash('photo-1509228468518-180dd4864904'),
  'quantum-physics': unsplash('photo-1502139214982-d0ad755818d8'),
  'scientists': unsplash('photo-1532187863486-abf9dbad1b69'),
  'scientific-theories': unsplash('photo-1451187580459-43490279c0fa'),
  'scientific-experiments': unsplash('photo-1576086213369-97a306d36557'),
  'biology': unsplash('photo-1530026405186-ed1f139313f8'),
  'artificial-intelligence': unsplash('photo-1485827404703-89b55fcc595e'),
  'technology': unsplash('photo-1518770660439-4636190af475'),
  'history-of-science': unsplash('photo-1481627834876-b7833e8f5570'),
  'books': unsplash('photo-1497633762265-9d179a990aa6'),
  'space-missions': unsplash('photo-1541185933-ef5d8ed016c2'),
  'mathematics': unsplash('photo-1635070041078-e363dbe005cb'),
  'future-technologies': unsplash('photo-1531297484001-80022131f5a1'),
};

// Demo categories for initial development
export const DEMO_CATEGORIES: Category[] = [
  { id: '1', name: 'Space', slug: 'space', description: 'Explore the cosmos, galaxies, stars, and the mysteries of the universe.', icon: '🚀', color: '#38bdf8', articleCount: 1, order: 1, isActive: true, createdAt: '', updatedAt: '' },
  { id: '2', name: 'Astronomy', slug: 'astronomy', description: 'Study celestial objects, phenomena, and the vast expanses of the universe.', icon: '🔭', color: '#22d3ee', articleCount: 0, order: 2, isActive: true, createdAt: '', updatedAt: '' },
  { id: '3', name: 'Physics', slug: 'physics', description: 'Understand the fundamental laws governing matter, energy, and the fabric of reality.', icon: '⚛️', color: '#3b82f6', articleCount: 1, order: 3, isActive: true, createdAt: '', updatedAt: '' },
  { id: '4', name: 'Quantum Physics', slug: 'quantum-physics', description: 'Dive into the bizarre world of quantum mechanics, entanglement, and superposition.', icon: '🌌', color: '#818cf8', articleCount: 1, order: 4, isActive: true, createdAt: '', updatedAt: '' },
  { id: '5', name: 'Scientists', slug: 'scientists', description: 'Discover the brilliant minds who shaped our understanding of the universe.', icon: '🧑‍🔬', color: '#ffc300', articleCount: 0, order: 5, isActive: true, createdAt: '', updatedAt: '' },
  { id: '6', name: 'Scientific Theories', slug: 'scientific-theories', description: 'Explore groundbreaking theories from relativity to string theory.', icon: '📐', color: '#34d399', articleCount: 0, order: 6, isActive: true, createdAt: '', updatedAt: '' },
  { id: '7', name: 'Scientific Experiments', slug: 'scientific-experiments', description: 'Learn about experiments that changed our understanding of the world.', icon: '🧪', color: '#fb7185', articleCount: 0, order: 7, isActive: true, createdAt: '', updatedAt: '' },
  { id: '8', name: 'Biology', slug: 'biology', description: 'Study life in all its forms — from DNA to ecosystems and evolution.', icon: '🧬', color: '#2dd4bf', articleCount: 1, order: 8, isActive: true, createdAt: '', updatedAt: '' },
  { id: '9', name: 'Artificial Intelligence', slug: 'artificial-intelligence', description: 'Understand the revolution of AI, machine learning, and neural networks.', icon: '🤖', color: '#a78bfa', articleCount: 1, order: 9, isActive: true, createdAt: '', updatedAt: '' },
  { id: '10', name: 'Technology', slug: 'technology', description: 'Explore cutting-edge technology shaping our present and future.', icon: '💻', color: '#38bdf8', articleCount: 0, order: 10, isActive: true, createdAt: '', updatedAt: '' },
  { id: '11', name: 'History of Science', slug: 'history-of-science', description: 'Journey through the milestones and breakthroughs in scientific history.', icon: '📜', color: '#fbbf24', articleCount: 0, order: 11, isActive: true, createdAt: '', updatedAt: '' },
  { id: '12', name: 'Books', slug: 'books', description: 'Reviews and summaries of the most influential scientific publications.', icon: '📚', color: '#818cf8', articleCount: 0, order: 12, isActive: true, createdAt: '', updatedAt: '' },
  { id: '13', name: 'Space Missions', slug: 'space-missions', description: 'Follow humanitys greatest space missions from Apollo to Mars exploration.', icon: '🛸', color: '#22d3ee', articleCount: 1, order: 13, isActive: true, createdAt: '', updatedAt: '' },
  { id: '14', name: 'Mathematics', slug: 'mathematics', description: 'The language of the universe — from algebra to topology and beyond.', icon: '➗', color: '#ffd60a', articleCount: 0, order: 14, isActive: true, createdAt: '', updatedAt: '' },
  { id: '15', name: 'Future Technologies', slug: 'future-technologies', description: 'Peek into the technologies that will define the next century.', icon: '🔮', color: '#34d399', articleCount: 0, order: 15, isActive: true, createdAt: '', updatedAt: '' },
];

// Demo articles for initial development
export const DEMO_ARTICLES = [
  {
    id: '1',
    title: 'The James Webb Space Telescope: Unveiling the Universe\'s First Light',
    slug: 'james-webb-space-telescope-first-light',
    excerpt: 'Discover how the James Webb Space Telescope is revolutionizing our understanding of the cosmos, peering deeper into space and time than ever before.',
    featuredImage: '/images/articles/jwst.jpg',
    category: { id: '1', name: 'Space', slug: 'space', color: '#38bdf8', icon: '🚀' },
    author: { id: 'sciencehub-editorial-team', displayName: 'ScienceHub Editorial Team' },
    tags: ['JWST', 'Telescope', 'Deep Space', 'Infrared'],
    readTime: 8,
    isFeatured: true,
    viewsCount: 0,
    likesCount: 0,
    publishedAt: '2024-12-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Quantum Entanglement: Einstein\'s "Spooky Action" Explained',
    slug: 'quantum-entanglement-explained',
    excerpt: 'A deep dive into quantum entanglement — the phenomenon Einstein called "spooky action at a distance" and its implications for quantum computing.',
    featuredImage: '/images/articles/quantum.jpg',
    category: { id: '4', name: 'Quantum Physics', slug: 'quantum-physics', color: '#818cf8', icon: '🌌' },
    author: { id: 'sciencehub-editorial-team', displayName: 'ScienceHub Editorial Team' },
    tags: ['Quantum', 'Entanglement', 'Einstein', 'Physics'],
    readTime: 12,
    isFeatured: true,
    viewsCount: 0,
    likesCount: 0,
    publishedAt: '2024-12-10T14:30:00Z',
  },
  {
    id: '3',
    title: 'CRISPR-Cas9: The Gene Editing Revolution',
    slug: 'crispr-cas9-gene-editing',
    excerpt: 'How CRISPR technology is transforming medicine, agriculture, and our understanding of genetics — and the ethical questions it raises.',
    featuredImage: '/images/articles/crispr.jpg',
    category: { id: '8', name: 'Biology', slug: 'biology', color: '#2dd4bf', icon: '🧬' },
    author: { id: 'sciencehub-editorial-team', displayName: 'ScienceHub Editorial Team' },
    tags: ['CRISPR', 'Genetics', 'Gene Editing', 'Biotechnology'],
    readTime: 10,
    isFeatured: false,
    viewsCount: 0,
    likesCount: 0,
    publishedAt: '2024-12-08T09:15:00Z',
  },
  {
    id: '4',
    title: 'The Rise of GPT and the Future of Artificial General Intelligence',
    slug: 'gpt-future-artificial-general-intelligence',
    excerpt: 'From GPT-4 to the pursuit of AGI — exploring the trajectory of large language models and what they mean for the future of humanity.',
    featuredImage: '/images/articles/ai.jpg',
    category: { id: '9', name: 'Artificial Intelligence', slug: 'artificial-intelligence', color: '#a78bfa', icon: '🤖' },
    author: { id: 'sciencehub-editorial-team', displayName: 'ScienceHub Editorial Team' },
    tags: ['AI', 'GPT', 'AGI', 'Machine Learning'],
    readTime: 15,
    isFeatured: true,
    viewsCount: 0,
    likesCount: 0,
    publishedAt: '2024-12-05T16:45:00Z',
  },
  {
    id: '5',
    title: 'Dark Matter and Dark Energy: The Invisible Universe',
    slug: 'dark-matter-dark-energy',
    excerpt: 'Understanding the mysterious dark matter and dark energy that make up 95% of the universe — what we know, and what we still don\'t.',
    featuredImage: '/images/articles/darkmatter.jpg',
    category: { id: '3', name: 'Physics', slug: 'physics', color: '#3b82f6', icon: '⚛️' },
    author: { id: 'sciencehub-editorial-team', displayName: 'ScienceHub Editorial Team' },
    tags: ['Dark Matter', 'Dark Energy', 'Cosmology', 'Universe'],
    readTime: 11,
    isFeatured: false,
    viewsCount: 0,
    likesCount: 0,
    publishedAt: '2024-12-01T11:20:00Z',
  },
  {
    id: '6',
    title: 'The Apollo 11 Mission: How Humanity First Walked on the Moon',
    slug: 'apollo-11-moon-landing',
    excerpt: 'Relive the historic Apollo 11 mission that put the first humans on the Moon — the science, the risks, and the legacy.',
    featuredImage: '/images/articles/apollo.jpg',
    category: { id: '13', name: 'Space Missions', slug: 'space-missions', color: '#22d3ee', icon: '🛸' },
    author: { id: 'sciencehub-editorial-team', displayName: 'ScienceHub Editorial Team' },
    tags: ['Apollo 11', 'Moon', 'NASA', 'Space History'],
    readTime: 14,
    isFeatured: false,
    viewsCount: 0,
    likesCount: 0,
    publishedAt: '2024-11-28T08:00:00Z',
  },
];

// Demo scientists are maintained separately because each profile includes
// a biography, breakthroughs, sources, and discovery details.
export { DEMO_SCIENTISTS } from './scientists';

// Platform stats for the homepage
export const PLATFORM_STATS = {
  articlesCount: 6,
  scientistsCount: 26,
  categoriesCount: 15,
  collectionsCount: 4,
};
