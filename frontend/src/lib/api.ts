import type { ArticleListItem, PaginatedResponse, ScientistListItem } from './types';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`API ${res.status}: ${body}`);
  }
  return res.json();
}

export function isPaginated<T>(data: unknown): data is { count: number; page: number; pageSize: number; totalPages: number; results: T[] } {
  return (
    typeof data === 'object' &&
    data !== null &&
    'results' in data &&
    'count' in data &&
    'page' in data &&
    'pageSize' in data &&
    'totalPages' in data
  );
}

function extractResults<T>(data: unknown): T[] {
  if (isPaginated<T>(data)) return data.results;
  if (Array.isArray(data)) return data as T[];
  return [];
}

// ─── Categories ───────────────────────────────────────────
export const fetchCategories = async () => {
  return apiFetch<unknown[]>('/categories/');
};

export const fetchCategory = async (slug: string) => {
  return apiFetch<unknown>(`/categories/${slug}/`);
};

// ─── Articles ─────────────────────────────────────────────
export const fetchArticles = async (params?: {
  category?: string;
  featured?: boolean;
  tag?: string;
  search?: string;
}): Promise<unknown[]> => {
  const qs = new URLSearchParams();
  if (params?.category) qs.set('category', params.category);
  if (params?.featured !== undefined) qs.set('featured', String(params.featured));
  if (params?.tag) qs.set('tag', params.tag);
  if (params?.search) qs.set('search', params.search);
  const query = qs.toString();
  const data = await apiFetch<unknown>(`/articles/${query ? `?${query}` : ''}`);
  return extractResults(data);
};

export const fetchArticlesPaginated = async (params?: {
  category?: string;
  featured?: boolean;
  tag?: string;
  search?: string;
  page?: number;
}): Promise<PaginatedResponse<ArticleListItem>> => {
  const qs = new URLSearchParams();
  if (params?.category) qs.set('category', params.category);
  if (params?.featured !== undefined) qs.set('featured', String(params.featured));
  if (params?.tag) qs.set('tag', params.tag);
  if (params?.search) qs.set('search', params.search);
  if (params?.page) qs.set('page', String(params.page));
  const query = qs.toString();
  const data = await apiFetch<unknown>(`/articles/${query ? `?${query}` : ''}`);
  if (isPaginated<ArticleListItem>(data)) return data;
  if (Array.isArray(data)) return { count: data.length, page: 1, pageSize: data.length, totalPages: 1, results: data as ArticleListItem[] };
  return { count: 0, page: 1, pageSize: 20, totalPages: 0, results: [] };
};

export const fetchFeaturedArticles = async () => {
  const data = await apiFetch<unknown>('/articles/featured/');
  return Array.isArray(data) ? data : (data as { results: unknown[] }).results ?? [];
};

export const fetchArticle = async (slug: string) => {
  return apiFetch<unknown>(`/articles/${slug}/`);
};

export const fetchRelatedArticles = async (slug: string) => {
  const data = await apiFetch<unknown>(`/articles/related/?slug=${slug}`);
  return Array.isArray(data) ? data : (data as { results: unknown[] }).results ?? [];
};

export const likeArticle = async (id: string, token?: string) => {
  const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
  return apiFetch<unknown>(`/articles/${id}/like/`, {
    method: 'POST',
    headers,
  });
};

// ─── Scientists ───────────────────────────────────────────
export const fetchScientists = async (params?: {
  featured?: boolean;
  field?: string;
  search?: string;
}): Promise<unknown[]> => {
  const qs = new URLSearchParams();
  if (params?.featured !== undefined) qs.set('featured', String(params.featured));
  if (params?.field) qs.set('field', params.field);
  if (params?.search) qs.set('search', params.search);
  const query = qs.toString();
  const data = await apiFetch<unknown>(`/scientists/${query ? `?${query}` : ''}`);
  return extractResults(data);
};

export const fetchScientistsPaginated = async (params?: {
  featured?: boolean;
  field?: string;
  search?: string;
  page?: number;
}): Promise<PaginatedResponse<ScientistListItem>> => {
  const qs = new URLSearchParams();
  if (params?.featured !== undefined) qs.set('featured', String(params.featured));
  if (params?.field) qs.set('field', params.field);
  if (params?.search) qs.set('search', params.search);
  if (params?.page) qs.set('page', String(params.page));
  const query = qs.toString();
  const data = await apiFetch<unknown>(`/scientists/${query ? `?${query}` : ''}`);
  if (isPaginated<ScientistListItem>(data)) return data;
  if (Array.isArray(data)) return { count: data.length, page: 1, pageSize: data.length, totalPages: 1, results: data as ScientistListItem[] };
  return { count: 0, page: 1, pageSize: 20, totalPages: 0, results: [] };
};

export const fetchFeaturedScientists = async () => {
  const data = await apiFetch<unknown>('/scientists/featured/');
  return Array.isArray(data) ? data : (data as { results: unknown[] }).results ?? [];
};

export const fetchScientist = async (slug: string) => {
  return apiFetch<unknown>(`/scientists/${slug}/`);
};

// ─── Search ───────────────────────────────────────────────
export const searchAll = async (query: string) => {
  const [articles, scientists] = await Promise.all([
    fetchArticles({ search: query }),
    fetchScientists({ search: query }),
  ]);
  return { articles, scientists };
};

// ─── Newsletter ───────────────────────────────────────────
export const subscribeNewsletter = async (email: string) => {
  return apiFetch<unknown>('/newsletter/subscribe/', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

// ─── Auth ─────────────────────────────────────────────────
export const login = async (email: string, password: string) => {
  return apiFetch<{ access: string; refresh: string; user: unknown }>('/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const register = async (data: { email: string; password: string; displayName: string }) => {
  return apiFetch<{ access: string; refresh: string; user: unknown }>('/auth/register/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const refreshToken = async (refresh: string) => {
  return apiFetch<{ access: string }>('/auth/token/refresh/', {
    method: 'POST',
    body: JSON.stringify({ refresh }),
  });
};

export const getProfile = async (token: string) => {
  return apiFetch<unknown>('/auth/profile/', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateProfile = async (token: string, data: Record<string, unknown>) => {
  return apiFetch<unknown>('/auth/profile/', {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
};

export const getBookmarks = async (token: string) => {
  return apiFetch<unknown>('/auth/bookmarks/', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const toggleBookmark = async (token: string, articleId: string) => {
  return apiFetch<unknown>('/auth/bookmarks/toggle/', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ articleId }),
  });
};

export const getReadingHistory = async (token: string) => {
  return apiFetch<unknown>('/auth/reading-history/', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addReadingHistory = async (token: string, articleId: string) => {
  return apiFetch<unknown>('/auth/reading-history/', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ articleId }),
  });
};
