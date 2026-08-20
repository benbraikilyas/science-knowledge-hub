// ========================================
// Science Knowledge Hub — TypeScript Types
// ========================================

// --- Category ---
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  articleCount: number;
  parentId?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// --- Author ---
export interface Author {
  id: string;
  displayName: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: 'admin' | 'editor' | 'reader';
}

// --- Article ---
export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  thumbnail?: string;
  category: Category;
  author: Author;
  tags: string[];
  readTime: number;
  isPublished: boolean;
  isFeatured: boolean;
  viewsCount: number;
  likesCount: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ArticleListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  thumbnail?: string;
  category: Pick<Category, 'id' | 'name' | 'slug' | 'color' | 'icon'>;
  author: Pick<Author, 'id' | 'displayName' | 'avatar'>;
  tags: string[];
  readTime: number;
  isFeatured: boolean;
  viewsCount: number;
  likesCount: number;
  publishedAt: string;
}

// --- Scientist ---
export interface Scientist {
  id: string;
  name: string;
  slug: string;
  portraitImage: string;
  birthDate: string;
  deathDate?: string;
  nationality: string;
  era: string;
  field: string;
  biography: string;
  keyContributions: string[];
  famousQuotes: string[];
  awards: string[];
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ScientistListItem {
  id: string;
  name: string;
  slug: string;
  portraitImage: string;
  birthDate: string;
  deathDate?: string;
  nationality: string;
  era: string;
  field: string;
  isFeatured: boolean;
}

// --- Search ---
export interface SearchResult {
  type: 'article' | 'scientist' | 'category';
  id: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  category?: string;
}

// --- Pagination ---
export interface PaginatedResponse<T> {
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
  results: T[];
}

// --- Navigation ---
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

// --- Newsletter ---
export interface NewsletterSubscription {
  email: string;
  subscribedAt: string;
}

// --- Stats ---
export interface PlatformStats {
  articlesCount: number;
  scientistsCount: number;
  categoriesCount: number;
  monthlyReaders: number;
}
