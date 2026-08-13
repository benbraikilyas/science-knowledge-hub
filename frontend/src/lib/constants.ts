// ========================================
// Science Knowledge Hub — Constants
// ========================================

import type { Category, NavItem } from './types';

export const SITE_NAME = 'Science Knowledge Hub';
export const SITE_DESCRIPTION = 'Explore the Universe of Knowledge — The largest modern scientific knowledge platform covering Space, Physics, Quantum Mechanics, Biology, AI, and more.';
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
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
  },
  'astronomy': {
    icon: '🔭',
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
  },
  'physics': {
    icon: '⚛️',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
  },
  'quantum-physics': {
    icon: '🌌',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
  },
  'scientists': {
    icon: '🧑‍🔬',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
  },
  'scientific-theories': {
    icon: '📐',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
  },
  'scientific-experiments': {
    icon: '🧪',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
  },
  'biology': {
    icon: '🧬',
    color: '#22c55e',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
  },
  'artificial-intelligence': {
    icon: '🤖',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  },
  'technology': {
    icon: '💻',
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)',
  },
  'history-of-science': {
    icon: '📜',
    color: '#d97706',
    gradient: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
  },
  'books': {
    icon: '📚',
    color: '#a855f7',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
  },
  'space-missions': {
    icon: '🛸',
    color: '#14b8a6',
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)',
  },
  'mathematics': {
    icon: '➗',
    color: '#f97316',
    gradient: 'linear-gradient(135deg, #f97316 0%, #eab308 100%)',
  },
  'future-technologies': {
    icon: '🔮',
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
  },
};

// Demo categories for initial development
export const DEMO_CATEGORIES: Category[] = [
  { id: '1', name: 'Space', slug: 'space', description: 'Explore the cosmos, galaxies, stars, and the mysteries of the universe.', icon: '🚀', color: '#7c3aed', articleCount: 42, order: 1, isActive: true, createdAt: '', updatedAt: '' },
  { id: '2', name: 'Astronomy', slug: 'astronomy', description: 'Study celestial objects, phenomena, and the vast expanses of the universe.', icon: '🔭', color: '#3b82f6', articleCount: 38, order: 2, isActive: true, createdAt: '', updatedAt: '' },
  { id: '3', name: 'Physics', slug: 'physics', description: 'Understand the fundamental laws governing matter, energy, and the fabric of reality.', icon: '⚛️', color: '#06b6d4', articleCount: 56, order: 3, isActive: true, createdAt: '', updatedAt: '' },
  { id: '4', name: 'Quantum Physics', slug: 'quantum-physics', description: 'Dive into the bizarre world of quantum mechanics, entanglement, and superposition.', icon: '🌌', color: '#8b5cf6', articleCount: 29, order: 4, isActive: true, createdAt: '', updatedAt: '' },
  { id: '5', name: 'Scientists', slug: 'scientists', description: 'Discover the brilliant minds who shaped our understanding of the universe.', icon: '🧑‍🔬', color: '#f59e0b', articleCount: 67, order: 5, isActive: true, createdAt: '', updatedAt: '' },
  { id: '6', name: 'Scientific Theories', slug: 'scientific-theories', description: 'Explore groundbreaking theories from relativity to string theory.', icon: '📐', color: '#10b981', articleCount: 23, order: 6, isActive: true, createdAt: '', updatedAt: '' },
  { id: '7', name: 'Scientific Experiments', slug: 'scientific-experiments', description: 'Learn about experiments that changed our understanding of the world.', icon: '🧪', color: '#ef4444', articleCount: 31, order: 7, isActive: true, createdAt: '', updatedAt: '' },
  { id: '8', name: 'Biology', slug: 'biology', description: 'Study life in all its forms — from DNA to ecosystems and evolution.', icon: '🧬', color: '#22c55e', articleCount: 45, order: 8, isActive: true, createdAt: '', updatedAt: '' },
  { id: '9', name: 'Artificial Intelligence', slug: 'artificial-intelligence', description: 'Understand the revolution of AI, machine learning, and neural networks.', icon: '🤖', color: '#6366f1', articleCount: 52, order: 9, isActive: true, createdAt: '', updatedAt: '' },
  { id: '10', name: 'Technology', slug: 'technology', description: 'Explore cutting-edge technology shaping our present and future.', icon: '💻', color: '#0ea5e9', articleCount: 48, order: 10, isActive: true, createdAt: '', updatedAt: '' },
  { id: '11', name: 'History of Science', slug: 'history-of-science', description: 'Journey through the milestones and breakthroughs in scientific history.', icon: '📜', color: '#d97706', articleCount: 35, order: 11, isActive: true, createdAt: '', updatedAt: '' },
  { id: '12', name: 'Books', slug: 'books', description: 'Reviews and summaries of the most influential scientific publications.', icon: '📚', color: '#a855f7', articleCount: 20, order: 12, isActive: true, createdAt: '', updatedAt: '' },
  { id: '13', name: 'Space Missions', slug: 'space-missions', description: 'Follow humanitys greatest space missions from Apollo to Mars exploration.', icon: '🛸', color: '#14b8a6', articleCount: 27, order: 13, isActive: true, createdAt: '', updatedAt: '' },
  { id: '14', name: 'Mathematics', slug: 'mathematics', description: 'The language of the universe — from algebra to topology and beyond.', icon: '➗', color: '#f97316', articleCount: 33, order: 14, isActive: true, createdAt: '', updatedAt: '' },
  { id: '15', name: 'Future Technologies', slug: 'future-technologies', description: 'Peek into the technologies that will define the next century.', icon: '🔮', color: '#ec4899', articleCount: 18, order: 15, isActive: true, createdAt: '', updatedAt: '' },
];

// Demo articles for initial development
export const DEMO_ARTICLES = [
  {
    id: '1',
    title: 'The James Webb Space Telescope: Unveiling the Universe\'s First Light',
    slug: 'james-webb-space-telescope-first-light',
    excerpt: 'Discover how the James Webb Space Telescope is revolutionizing our understanding of the cosmos, peering deeper into space and time than ever before.',
    featuredImage: '/images/articles/jwst.jpg',
    category: { id: '1', name: 'Space', slug: 'space', color: '#7c3aed', icon: '🚀' },
    author: { id: '1', displayName: 'Dr. Sarah Chen', avatar: '/images/authors/sarah.jpg' },
    tags: ['JWST', 'Telescope', 'Deep Space', 'Infrared'],
    readTime: 8,
    isFeatured: true,
    viewsCount: 15420,
    likesCount: 892,
    publishedAt: '2024-12-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Quantum Entanglement: Einstein\'s "Spooky Action" Explained',
    slug: 'quantum-entanglement-explained',
    excerpt: 'A deep dive into quantum entanglement — the phenomenon Einstein called "spooky action at a distance" and its implications for quantum computing.',
    featuredImage: '/images/articles/quantum.jpg',
    category: { id: '4', name: 'Quantum Physics', slug: 'quantum-physics', color: '#8b5cf6', icon: '🌌' },
    author: { id: '2', displayName: 'Prof. James Miller', avatar: '/images/authors/james.jpg' },
    tags: ['Quantum', 'Entanglement', 'Einstein', 'Physics'],
    readTime: 12,
    isFeatured: true,
    viewsCount: 23150,
    likesCount: 1456,
    publishedAt: '2024-12-10T14:30:00Z',
  },
  {
    id: '3',
    title: 'CRISPR-Cas9: The Gene Editing Revolution',
    slug: 'crispr-cas9-gene-editing',
    excerpt: 'How CRISPR technology is transforming medicine, agriculture, and our understanding of genetics — and the ethical questions it raises.',
    featuredImage: '/images/articles/crispr.jpg',
    category: { id: '8', name: 'Biology', slug: 'biology', color: '#22c55e', icon: '🧬' },
    author: { id: '3', displayName: 'Dr. Emily Watson', avatar: '/images/authors/emily.jpg' },
    tags: ['CRISPR', 'Genetics', 'Gene Editing', 'Biotechnology'],
    readTime: 10,
    isFeatured: false,
    viewsCount: 18900,
    likesCount: 1102,
    publishedAt: '2024-12-08T09:15:00Z',
  },
  {
    id: '4',
    title: 'The Rise of GPT and the Future of Artificial General Intelligence',
    slug: 'gpt-future-artificial-general-intelligence',
    excerpt: 'From GPT-4 to the pursuit of AGI — exploring the trajectory of large language models and what they mean for the future of humanity.',
    featuredImage: '/images/articles/ai.jpg',
    category: { id: '9', name: 'Artificial Intelligence', slug: 'artificial-intelligence', color: '#6366f1', icon: '🤖' },
    author: { id: '1', displayName: 'Dr. Sarah Chen', avatar: '/images/authors/sarah.jpg' },
    tags: ['AI', 'GPT', 'AGI', 'Machine Learning'],
    readTime: 15,
    isFeatured: true,
    viewsCount: 31200,
    likesCount: 2340,
    publishedAt: '2024-12-05T16:45:00Z',
  },
  {
    id: '5',
    title: 'Dark Matter and Dark Energy: The Invisible Universe',
    slug: 'dark-matter-dark-energy',
    excerpt: 'Understanding the mysterious dark matter and dark energy that make up 95% of the universe — what we know, and what we still don\'t.',
    featuredImage: '/images/articles/darkmatter.jpg',
    category: { id: '3', name: 'Physics', slug: 'physics', color: '#06b6d4', icon: '⚛️' },
    author: { id: '2', displayName: 'Prof. James Miller', avatar: '/images/authors/james.jpg' },
    tags: ['Dark Matter', 'Dark Energy', 'Cosmology', 'Universe'],
    readTime: 11,
    isFeatured: false,
    viewsCount: 12800,
    likesCount: 780,
    publishedAt: '2024-12-01T11:20:00Z',
  },
  {
    id: '6',
    title: 'The Apollo 11 Mission: How Humanity First Walked on the Moon',
    slug: 'apollo-11-moon-landing',
    excerpt: 'Relive the historic Apollo 11 mission that put the first humans on the Moon — the science, the risks, and the legacy.',
    featuredImage: '/images/articles/apollo.jpg',
    category: { id: '13', name: 'Space Missions', slug: 'space-missions', color: '#14b8a6', icon: '🛸' },
    author: { id: '3', displayName: 'Dr. Emily Watson', avatar: '/images/authors/emily.jpg' },
    tags: ['Apollo 11', 'Moon', 'NASA', 'Space History'],
    readTime: 14,
    isFeatured: false,
    viewsCount: 9500,
    likesCount: 620,
    publishedAt: '2024-11-28T08:00:00Z',
  },
];

// Demo scientists
export const DEMO_SCIENTISTS = [
  {
    id: '1',
    name: 'Albert Einstein',
    slug: 'albert-einstein',
    portraitImage: '/images/scientists/einstein.jpg',
    birthDate: '1879-03-14',
    deathDate: '1955-04-18',
    nationality: 'German-American',
    era: '20th Century',
    field: 'Theoretical Physics',
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Marie Curie',
    slug: 'marie-curie',
    portraitImage: '/images/scientists/curie.jpg',
    birthDate: '1867-11-07',
    deathDate: '1934-07-04',
    nationality: 'Polish-French',
    era: '19th-20th Century',
    field: 'Physics & Chemistry',
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Nikola Tesla',
    slug: 'nikola-tesla',
    portraitImage: '/images/scientists/tesla.jpg',
    birthDate: '1856-07-10',
    deathDate: '1943-01-07',
    nationality: 'Serbian-American',
    era: '19th-20th Century',
    field: 'Electrical Engineering',
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Stephen Hawking',
    slug: 'stephen-hawking',
    portraitImage: '/images/scientists/hawking.jpg',
    birthDate: '1942-01-08',
    deathDate: '2018-03-14',
    nationality: 'British',
    era: '20th-21st Century',
    field: 'Cosmology & Theoretical Physics',
    isFeatured: true,
  },
  {
    id: '5',
    name: 'Isaac Newton',
    slug: 'isaac-newton',
    portraitImage: '/images/scientists/newton.jpg',
    birthDate: '1643-01-04',
    deathDate: '1727-03-31',
    nationality: 'British',
    era: '17th-18th Century',
    field: 'Physics & Mathematics',
    isFeatured: true,
  },
  {
    id: '6',
    name: 'Ada Lovelace',
    slug: 'ada-lovelace',
    portraitImage: '/images/scientists/lovelace.jpg',
    birthDate: '1815-12-10',
    deathDate: '1852-11-27',
    nationality: 'British',
    era: '19th Century',
    field: 'Mathematics & Computing',
    isFeatured: true,
  },
];

// Platform stats for the homepage
export const PLATFORM_STATS = {
  articlesCount: 2500,
  scientistsCount: 500,
  categoriesCount: 15,
  monthlyReaders: 150000,
};
