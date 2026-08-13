import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const fetchCategories = async () => {
  const { data } = await api.get('/categories/');
  return data;
};

export const fetchCategory = async (slug: string) => {
  const { data } = await api.get(`/categories/${slug}/`);
  return data;
};

export const fetchArticles = async (params?: {
  category?: string;
  featured?: boolean;
  tag?: string;
  search?: string;
}) => {
  const { data } = await api.get('/articles/', { params });
  return data;
};

export const fetchFeaturedArticles = async () => {
  const { data } = await api.get('/articles/featured/');
  return data;
};

export const fetchArticle = async (slug: string) => {
  const { data } = await api.get(`/articles/${slug}/`);
  return data;
};

export const fetchRelatedArticles = async (slug: string) => {
  const { data } = await api.get('/articles/related/', { params: { slug } });
  return data;
};

export const fetchScientists = async (params?: { featured?: boolean; field?: string; search?: string }) => {
  const { data } = await api.get('/scientists/', { params });
  return data;
};

export const fetchFeaturedScientists = async () => {
  const { data } = await api.get('/scientists/featured/');
  return data;
};

export const fetchScientist = async (slug: string) => {
  const { data } = await api.get(`/scientists/${slug}/`);
  return data;
};

export const likeArticle = async (id: string, token?: string) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const { data } = await api.post(`/articles/${id}/like/`, {}, { headers });
  return data;
};

export const searchAll = async (query: string) => {
  const [articles, scientists] = await Promise.all([
    fetchArticles({ search: query }),
    fetchScientists({ search: query }),
  ]);
  return [...articles, ...scientists];
};

export default api;
