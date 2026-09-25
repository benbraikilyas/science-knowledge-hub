import { AI_NEWS_ARTICLES } from './news-ai-2025-2026';
import { ROBOTICS_NEWS_ARTICLES } from './news-robotics-2025-2026';
import { SCIENCE_NEWS_ARTICLES } from './news-science-2025-2026';

export const LATEST_NEWS_ARTICLES = [
  ...AI_NEWS_ARTICLES,
  ...ROBOTICS_NEWS_ARTICLES,
  ...SCIENCE_NEWS_ARTICLES,
].sort(
  (left, right) =>
    new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime()
);
