import Link from 'next/link';
import { formatDate, formatCompactNumber } from '@/lib/utils';
import type { ArticleListItem } from '@/lib/types';

interface ArticleDetailProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string) {
  try {
    const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
    const res = await fetch(`${api}/articles/${slug}/`, { next: { revalidate: 60 } });
    return await res.json();
  } catch {
    const { DEMO_ARTICLES } = await import('@/lib/constants');
    return DEMO_ARTICLES.find((a: { slug: string }) => a.slug === slug) || null;
  }
}

async function getRelatedArticles(slug: string) {
  try {
    const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
    const res = await fetch(`${api}/articles/related/?slug=${slug}`, { next: { revalidate: 60 } });
    return await res.json();
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: ArticleDetailProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      tags: article.tags,
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  const related: ArticleListItem[] = await getRelatedArticles(slug);

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Article Not Found</h1>
        <p className="mt-2 text-[var(--text-secondary)]">The article you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/articles"
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--accent-primary)] px-6 text-sm font-medium text-white"
        >
          Browse Articles
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <Link
          href={`/categories/${article.category.slug}`}
          className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
          style={{ backgroundColor: `${article.category.color}20`, color: article.category.color }}
        >
          {article.category.icon} {article.category.name}
        </Link>

        <h1 className="mt-4 text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
          {article.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-primary)] text-xs font-medium text-white">
              {article.author.displayName?.charAt(0) || 'A'}
            </div>
            <span>{article.author.displayName}</span>
          </div>
          <span>·</span>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span>·</span>
          <span>{article.readTime} min read</span>
          <span>·</span>
          <span>{formatCompactNumber(article.viewsCount)} views</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {article.tags?.map((tag: string) => (
            <Link
              key={tag}
              href={`/articles?tag=${encodeURIComponent(tag.toLowerCase())}`}
              className="rounded-full border border-[var(--border-color)] px-3 py-1 text-xs text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-card)]"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

      <div className="aspect-video rounded-2xl bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-card)] flex items-center justify-center mb-10">
        <span className="text-6xl">{article.category.icon}</span>
      </div>

      <div className="article-content">
        <p className="text-lg leading-relaxed text-[var(--text-secondary)]">{article.excerpt}</p>
        <div className="mt-6 text-base leading-relaxed text-[var(--text-secondary)]">
          {article.content ? (
            article.content.split('\n').map((paragraph: string, i: number) => (
              paragraph.trim() ? <p key={i} className="mb-4">{paragraph}</p> : null
            ))
          ) : (
            <>
              <p>
                This is a comprehensive article about {article.title.toLowerCase()}. The content covers the fundamental concepts,
                historical context, and latest developments in this fascinating area of science.
              </p>
              <h2>Understanding the Basics</h2>
              <p>
                To truly appreciate the significance of this topic, we must first understand the foundational principles
                that underpin it. Scientists and researchers have dedicated decades to unraveling the complexities.
              </p>
              <h2>Key Discoveries</h2>
              <p>
                Throughout history, numerous breakthroughs have shaped our understanding. Each discovery built upon previous
                knowledge, creating an ever-expanding framework of scientific understanding.
              </p>
              <h2>Modern Implications</h2>
              <p>
                Today, this field continues to evolve at an unprecedented pace. New technologies and research methods
                are opening doors that were once thought impossible to unlock.
              </p>
              <h2>What Lies Ahead</h2>
              <p>
                The future holds exciting possibilities. As we continue to push the boundaries of knowledge, we can
                expect transformative discoveries that will reshape our understanding of the universe.
              </p>
            </>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16 border-t border-[var(--border-color)] pt-10">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Related Articles</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {related.slice(0, 4).map((item: ArticleListItem) => {
              return (
                <Link
                  key={item.id}
                  href={`/articles/${item.slug}`}
                  className="group rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 transition-all hover:shadow-[var(--shadow-glow)]"
                >
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{ backgroundColor: `${item.category.color}20`, color: item.category.color }}
                  >
                    {item.category.icon} {item.category.name}
                  </span>
                  <h3 className="mt-2 font-semibold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">{item.readTime} min read</p>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
}
