import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import StructuredData from '@/components/StructuredData';
import { categoryOgImage } from '@/lib/category-images';
import { GUIDES, getGuide } from '@/lib/guides';
import { pageTitle } from '@/lib/seo-copy';
import { EDITORIAL_TEAM, SITE_NAME, absoluteUrl } from '@/lib/site';

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

// Only the guides in lib/guides.ts exist, so any other slug is a real 404 instead of a streamed one.
export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  const image = {
    url: (guide.categories[0] && categoryOgImage(guide.categories[0])) || absoluteUrl('/og.webp'),
    alt: guide.title,
  };

  return {
    title: pageTitle(guide.seoTitle, SITE_NAME),
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      type: 'article',
      siteName: SITE_NAME,
      locale: 'en_US',
      url: absoluteUrl(`/guides/${guide.slug}`),
      title: guide.seoTitle,
      description: guide.description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.seoTitle,
      description: guide.description,
      images: [image],
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const pageUrl = absoluteUrl(`/guides/${guide.slug}`);
  const picks = guide.sections.flatMap((section) => section.picks);
  const otherGuides = GUIDES.filter((item) => item.slug !== guide.slug);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': pageUrl,
        url: pageUrl,
        name: guide.title,
        headline: guide.title,
        description: guide.description,
        inLanguage: 'en',
        dateModified: guide.updatedAt,
        author: { '@type': 'Organization', name: EDITORIAL_TEAM.displayName, url: absoluteUrl(EDITORIAL_TEAM.href) },
        publisher: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/') },
        mainEntity: {
          '@type': 'ItemList',
          name: guide.question,
          numberOfItems: picks.length,
          itemListOrder: 'https://schema.org/ItemListOrderAscending',
          itemListElement: picks.map((item) => ({
            '@type': 'ListItem',
            position: item.position,
            name: item.title,
            url: absoluteUrl(`/articles/${item.slug}`),
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Reading Guides', item: absoluteUrl('/guides') },
          { '@type': 'ListItem', position: 3, name: guide.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24">
      <StructuredData data={structuredData} />
      <div className="relative overflow-hidden border-b border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-card)] via-[var(--bg-secondary)] to-[var(--bg-primary)] py-16 sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/10 blur-[140px]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/guides"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gold-400 transition-colors hover:text-gold-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>All reading guides</span>
          </Link>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-readable)]">{guide.question}</p>
          <h1
            className="mt-3 text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {guide.title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">{guide.answer}</p>
          <p className="mt-6 font-mono text-xs text-[var(--text-secondary)]">
            {picks.length} picks, chosen by the{' '}
            <Link href={EDITORIAL_TEAM.href} className="text-gold-400 transition-colors hover:text-gold-300">
              {EDITORIAL_TEAM.displayName}
            </Link>
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-8">
        <section aria-labelledby="how-we-picked" className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-6 sm:p-8">
          <h2 id="how-we-picked" className="text-lg font-bold text-[var(--text-primary)]">How we picked</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--text-secondary)]">
            {guide.criteria.map((criterion) => (
              <li key={criterion} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>{criterion}</span>
              </li>
            ))}
          </ul>
        </section>

        {guide.sections.map((section) => (
          <section key={section.heading} className="mt-14">
            <h2
              className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {section.heading}
            </h2>
            <ol start={section.picks[0]?.position} className="mt-6 space-y-4">
              {section.picks.map((item) => (
                <li
                  key={item.slug}
                  className="flex gap-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/70 p-5 transition-colors hover:border-gold-500/40 sm:p-6"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-500/15 font-mono text-sm font-bold text-gold-300"
                  >
                    {item.position}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold leading-snug text-[var(--text-primary)]">
                      <Link href={`/articles/${item.slug}`} className="transition-colors hover:text-gold-300">
                        {item.title}
                      </Link>
                    </h3>
                    <p className="mt-1 font-mono text-xs text-[var(--text-secondary)]">
                      {item.isBook
                        ? `Free book by ${item.author}`
                        : `${[item.category.icon, item.category.name].filter(Boolean).join(' ')} · ${item.readTime} min read`}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{item.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}

        <section aria-labelledby="elsewhere" className="mt-16">
          <h2
            id="elsewhere"
            className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {guide.elsewhereHeading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
            These sites are independent of {SITE_NAME}. Reading more than one source is the best way to check what you learn.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {guide.elsewhere.map((source) => (
              <li key={source.href} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-5">
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-[var(--text-primary)] transition-colors hover:text-gold-300"
                >
                  {source.name}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{source.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="keep-exploring" className="mt-16 border-t border-[var(--border-color)] pt-10">
          <h2 id="keep-exploring" className="text-lg font-bold text-[var(--text-primary)]">Keep exploring</h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {guide.related.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-[var(--border-color)] bg-white/[0.04] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] transition-all hover:border-gold-500/40 hover:text-[var(--text-primary)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <h3 className="mt-8 text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">More reading guides</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {otherGuides.map((item) => (
              <li key={item.slug}>
                <Link href={`/guides/${item.slug}`} className="text-sm text-[var(--text-secondary)] transition-colors hover:text-gold-300">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
