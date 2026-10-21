import type { ArticleListItem } from './types';
import { getNewsArticleImage } from './news-article';

/** Keep article bodies and source lists out of client-side card payloads. */
export function toArticleListItem(article: ArticleListItem): ArticleListItem {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    featuredImage: getNewsArticleImage(article.category.slug, article.featuredImage, article.id),
    thumbnail: getNewsArticleImage(article.category.slug, article.thumbnail || article.featuredImage, article.id),
    category: article.category,
    author: article.author,
    tags: article.tags,
    readTime: article.readTime,
    isFeatured: article.isFeatured,
    viewsCount: article.viewsCount,
    likesCount: article.likesCount,
    publishedAt: article.publishedAt,
    ...(article.bookDetails ? { bookDetails: article.bookDetails } : {}),
  };
}
