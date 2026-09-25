import type { ArticleListItem } from './types';

/** Keep article bodies and source lists out of client-side card payloads. */
export function toArticleListItem(article: ArticleListItem): ArticleListItem {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    featuredImage: article.featuredImage,
    thumbnail: article.thumbnail,
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
