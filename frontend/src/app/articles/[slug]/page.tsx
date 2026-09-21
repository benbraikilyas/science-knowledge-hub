import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatDate, formatCompactNumber } from '@/lib/utils';
import { fetchArticle, fetchRelatedArticles } from '@/lib/api';
import type { ArticleListItem } from '@/lib/types';
import ArticleReadingProgress from '@/components/ArticleReadingProgress';
import ArticleCard from '@/components/ArticleCard';
import ArticleContent from '@/components/ArticleContent';
import SafeImage from '@/components/SafeImage';
import { getPublicArticleAuthor } from '@/lib/article-author';
import { absoluteUrl, SITE_NAME, EDITORIAL_TEAM } from '@/lib/site';
import { getImageMetadata, imageObject, openGraphImage } from '@/lib/image-seo';
import StructuredData from '@/components/StructuredData';
import { Clock, Eye, ArrowLeft, BookOpen, Download, FileText, Smartphone, ExternalLink, ShieldCheck } from 'lucide-react';

interface ArticleDetailProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string) {
  try {
    return await fetchArticle(slug);
  } catch {
    const { DEMO_ARTICLES } = await import('@/lib/constants');
    return DEMO_ARTICLES.find((a: { slug: string }) => a.slug === slug) || null;
  }
}

async function getRelatedArticles(slug: string): Promise<ArticleListItem[]> {
  try {
    const raw = await fetchRelatedArticles(slug);
    return raw as ArticleListItem[];
  } catch {
    const { DEMO_ARTICLES } = await import('@/lib/constants');
    return DEMO_ARTICLES.filter((a: { slug: string }) => a.slug !== slug).slice(0, 3);
  }
}

export async function generateMetadata({ params }: ArticleDetailProps) {
  const { slug } = await params;
  const article = await getArticle(slug) as Record<string, unknown> | null;
  if (!article) notFound();
  const hasOriginalContent = typeof article.content === 'string' && article.content.trim().length > 0;
  const image = typeof article.featuredImage === 'string' && article.featuredImage
    ? openGraphImage(article.featuredImage, article.title as string)
    : undefined;
  const publicAuthor = getPublicArticleAuthor(article.author as { displayName?: string; avatar?: string } | undefined);
  return {
    title: (article.metaTitle as string) || (article.title as string),
    description: (article.metaDescription as string) || (article.excerpt as string),
    alternates: { canonical: `/articles/${slug}` },
    authors: [publicAuthor.href
      ? { name: publicAuthor.displayName, url: publicAuthor.href }
      : { name: publicAuthor.displayName }],
    robots: { index: hasOriginalContent, follow: true, 'max-image-preview': 'large' as const },
    openGraph: {
      title: article.title as string,
      description: article.excerpt as string,
      type: 'article',
      url: absoluteUrl(`/articles/${slug}`),
      publishedTime: article.publishedAt as string,
      tags: article.tags as string[],
      images: image ? [image] : [],
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: article.title as string,
      description: article.excerpt as string,
      images: image ? [{ url: image.url, alt: image.alt }] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailProps) {
  const { slug } = await params;
  const article = await getArticle(slug) as Record<string, unknown> | null;
  const related: ArticleListItem[] = await getRelatedArticles(slug);

  if (!article) notFound();

  const category = article.category as { slug: string; color: string; icon: string; name: string };
  const author = article.author as { displayName?: string; avatar?: string };
  const articleTags = article.tags as string[] | undefined;
  const featuredImage = (article.featuredImage as string) || '';
  const imageMetadata = getImageMetadata(featuredImage);
  const publicAuthor = getPublicArticleAuthor(author);
  const authorName = publicAuthor.displayName;

  const bookDetails = article.bookDetails as {
    originalAuthor?: string;
    firstPublished?: number | string;
    pages?: number;
    subjects?: string[];
    license?: string;
    readOnlineUrl?: string;
    downloadPdfUrl?: string;
    downloadEpubUrl?: string;
    iaDetailsUrl?: string;
    archiveName?: string;
  } | undefined;
  const isBook = category.slug === 'books' || Boolean(bookDetails);
  const pageUrl = absoluteUrl(`/articles/${slug}`);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': pageUrl, url: pageUrl,
        name: article.title, description: article.excerpt, inLanguage: 'en',
        ...(featuredImage ? { primaryImageOfPage: imageObject(featuredImage, article.title as string) } : {}),
      },
      ...(!isBook && typeof article.content === 'string' && article.content.trim() ? [{
        '@type': 'Article', '@id': `${pageUrl}#article`, mainEntityOfPage: { '@id': pageUrl },
        headline: article.title, description: article.excerpt, inLanguage: 'en',
        datePublished: article.publishedAt,
        articleSection: category.name,
        keywords: articleTags,
        author: {
          '@type': authorName === EDITORIAL_TEAM.displayName ? 'Organization' : 'Person',
          name: authorName, ...(publicAuthor.href ? { url: absoluteUrl(publicAuthor.href) } : {}),
        },
        publisher: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/') },
        ...(featuredImage ? { image: imageObject(featuredImage, article.title as string) } : {}),
      }] : []),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Articles', item: absoluteUrl('/articles') },
          { '@type': 'ListItem', position: 3, name: article.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24 text-[var(--text-secondary)]">
      <ArticleReadingProgress />
      <StructuredData data={structuredData} />

      {/* Header Banner */}
      <div className="relative overflow-hidden border-b border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-card)] via-[var(--bg-secondary)] to-[var(--bg-primary)] py-14 sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/15 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gold-400 transition-colors hover:text-gold-300 mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to all articles</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/categories/${category.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor: `${category.color}20`,
                color: category.color,
                border: `1px solid ${category.color}40`,
              }}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </Link>
            <span className="text-xs text-[var(--text-secondary)] font-mono">Published {formatDate(article.publishedAt as string)}</span>
          </div>

          <h1
            className="mt-5 text-3xl font-extrabold leading-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {article.title as string}
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)] font-light">
            {article.excerpt as string}
          </p>

          {/* Author & Stats Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-color)] pt-6">
            <div className="flex items-center gap-3">
              {publicAuthor.avatar ? (
                <SafeImage
                  src={publicAuthor.avatar}
                  alt={authorName}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-xl object-cover shadow-[0_0_15px_rgba(255,195,0,0.25)]"
                  fallback={
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-gold-500 to-navy-600 text-sm font-bold text-[var(--text-primary)] shadow-[0_0_15px_rgba(255,195,0,0.25)]">
                      {authorName.charAt(0)}
                    </div>
                  }
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-gold-500 to-navy-600 text-sm font-bold text-[var(--text-primary)] shadow-[0_0_15px_rgba(255,195,0,0.25)]">
                  {authorName.charAt(0)}
                </div>
              )}
              <div>
                {publicAuthor.href ? (
                  <Link href={publicAuthor.href} className="text-sm font-semibold text-[var(--text-primary)] hover:text-gold-300">
                    {authorName}
                  </Link>
                ) : (
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{authorName}</p>
                )}
                <p className="text-xs text-[var(--text-secondary)]">Editorial byline</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)] font-mono">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-gold-400" />
                <span>{article.readTime as number} min read</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-gold-300" />
                <span>{formatCompactNumber(article.viewsCount as number)} views</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {featuredImage && (
        <div className="mx-auto max-w-4xl px-4 pt-12 sm:px-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-[var(--border-color)] shadow-2xl">
            <SafeImage
              src={featuredImage}
              alt={article.title as string}
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
              fallback={
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-primary)] text-6xl">
                  {category.icon}
                </div>
              }
            />
          </div>
          <p className="mt-2 text-right text-[11px] text-[var(--text-secondary)]">
            {imageMetadata?.creditText && <span>{imageMetadata.creditText} · </span>}
            <Link href={imageMetadata?.source || '/sources#image-credits'} className="hover:text-gold-300">Image source and license</Link>
          </p>
        </div>
      )}

      {/* Book Actions & Free Download Hub (Only for Books) */}
      {isBook && bookDetails && (
        <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-gold-500/30 bg-gradient-to-br from-gold-500/10 via-[var(--bg-card)] to-[var(--bg-primary)] p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold-500/20 pb-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-gold-400">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span className="tracking-wide uppercase">Free &amp; Legal Public Domain Science Book</span>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-medium text-emerald-300 border border-emerald-500/20">
                ✓ Open Access
              </span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs">
              <div className="rounded-2xl border border-[var(--border-color)] bg-white/[0.02] p-3.5">
                <span className="text-[11px] text-[var(--text-secondary)]">Original Author</span>
                <p className="mt-1 font-semibold text-[var(--text-primary)]">{bookDetails.originalAuthor || authorName}</p>
              </div>
              <div className="rounded-2xl border border-[var(--border-color)] bg-white/[0.02] p-3.5">
                <span className="text-[11px] text-[var(--text-secondary)]">First Published</span>
                <p className="mt-1 font-semibold text-[var(--text-primary)]">{bookDetails.firstPublished}</p>
              </div>
              <div className="rounded-2xl border border-[var(--border-color)] bg-white/[0.02] p-3.5">
                <span className="text-[11px] text-[var(--text-secondary)]">Length / Pages</span>
                <p className="mt-1 font-semibold text-[var(--text-primary)]">{bookDetails.pages ? `~${bookDetails.pages} pages` : 'Complete Edition'}</p>
              </div>
              <div className="rounded-2xl border border-[var(--border-color)] bg-white/[0.02] p-3.5">
                <span className="text-[11px] text-[var(--text-secondary)]">Archived By</span>
                <p className="mt-1 font-semibold text-[var(--text-primary)]">{bookDetails.archiveName || 'Internet Archive'}</p>
              </div>
            </div>

            {/* Action Buttons: Read Online & Download */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {bookDetails.readOnlineUrl && (
                <a
                  href={bookDetails.readOnlineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 px-5 py-3 text-sm font-bold text-navy-950 shadow-lg shadow-gold-500/20 transition-all duration-200 hover:scale-[1.02] hover:shadow-gold-500/35"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Read Online Free</span>
                </a>
              )}

              {bookDetails.downloadPdfUrl && (
                <a
                  href={bookDetails.downloadPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 rounded-xl border border-gold-500/40 bg-gold-500/10 px-4 py-3 text-sm font-semibold text-gold-300 transition-all duration-200 hover:bg-gold-500/20 hover:text-white"
                >
                  <Download className="h-4 w-4" />
                  <FileText className="h-3.5 w-3.5" />
                  <span>Download PDF</span>
                </a>
              )}

              {bookDetails.downloadEpubUrl && (
                <a
                  href={bookDetails.downloadEpubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-white/[0.04] px-4 py-3 text-sm font-semibold text-[var(--text-primary)] transition-all duration-200 hover:border-gold-500/40 hover:bg-gold-500/10"
                >
                  <Smartphone className="h-4 w-4 text-gold-400" />
                  <span>Download EPUB</span>
                </a>
              )}

              {bookDetails.iaDetailsUrl && (
                <a
                  href={bookDetails.iaDetailsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-3 text-xs font-medium text-[var(--text-secondary)] hover:text-gold-300 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>{bookDetails.archiveName || 'Internet Archive'} Catalog</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Article Body */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-8 sm:p-12 backdrop-blur-xl shadow-2xl">
          <div className="text-[var(--text-secondary)]">
            {article.content ? (
              <ArticleContent content={article.content as string} />
            ) : (
              <>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-4 mb-4">Introduction to the Phenomenon</h2>
                <p className="mb-6 leading-relaxed text-[var(--text-secondary)]">
                  From cosmic horizons to subatomic scales, the principles guiding this discovery
                  have reshaped our understanding of the universe. Decades of theoretical mathematics
                  and precision experimental tests laid the foundation for modern breakthroughs.
                </p>

                <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-8 mb-4">Core Principles and Equations</h2>
                <p className="mb-6 leading-relaxed text-[var(--text-secondary)]">
                  Every fundamental force in nature obeys conservation laws and symmetry transformations.
                  When experimental data from particle accelerators and deep space telescopes matched
                  the theoretical predictions, it heralded a new era of scientific discovery.
                </p>

                <blockquote className="my-8 rounded-2xl border-l-4 border-gold-500 bg-gold-500/10 p-6 text-gold-200 italic">
                  &ldquo;The most incomprehensible thing about the universe is that it is comprehensible.&rdquo;
                  <span className="block mt-2 text-xs font-mono not-italic text-gold-400">— Albert Einstein</span>
                </blockquote>

                <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-8 mb-4">Future Frontiers & Technology</h2>
                <p className="mb-6 leading-relaxed text-[var(--text-secondary)]">
                  As our observational instruments increase in sensitivity by orders of magnitude,
                  we stand on the cusp of solving some of the deepest mysteries in physics, biology, and computation.
                </p>
              </>
            )}
          </div>

          {/* Tags */}
          {articleTags && articleTags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-[var(--border-color)] pt-6">
              {articleTags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/articles?tag=${encodeURIComponent(tag.toLowerCase())}`}
                  className="rounded-xl border border-[var(--border-color)] bg-white/[0.04] px-3 py-1 font-mono text-xs text-[var(--text-secondary)] transition-colors hover:border-gold-500/40 hover:bg-gold-500/10 hover:text-gold-200"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Related Articles Section */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-[var(--border-color)] pt-12">
            <h2
              className="text-2xl font-bold tracking-tight text-[var(--text-primary)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Related Articles
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ArticleCard key={item.id} article={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
