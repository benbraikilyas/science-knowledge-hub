import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { DEMO_CATEGORIES } from '@/lib/constants';
import { EDITORIAL_ARTICLES } from '@/lib/editorial-articles';
import { LATEST_NEWS_ARTICLES } from '@/lib/news-articles';
import { SCIENCE_BOOKS } from '@/lib/books';
import { DEMO_SCIENTISTS } from '@/lib/scientists';
import { GUIDES } from '@/lib/guides';
import { API_ENABLED } from '@/lib/site';

export const metadata = {
  alternates: { canonical: '/sitemap' },
  title: 'Sitemap',
  description: 'Complete directory of every page on Science Knowledge Hub: science articles, 2025–2026 research updates, 56 scientist profiles, 34 free books, reading guides, and tools.',
};

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Articles & Explainers', href: '/articles' },
  { label: 'Scientific Categories', href: '/categories' },
  { label: 'Scientists Directory', href: '/scientists' },
  { label: 'Reading Guides', href: '/guides' },
  { label: 'Learning Paths', href: '/learn' },
  { label: 'Interactive Science Tools', href: '/tools' },
  { label: 'XML Sitemap (/sitemap.xml)', href: '/sitemap.xml' },
  { label: 'RSS Feed (/feed.xml)', href: '/feed.xml' },
  { label: 'AI / LLM Index (/llms.txt)', href: '/llms.txt' },
];

const GUIDE_LINKS = GUIDES.map((guide) => ({ label: guide.title, href: `/guides/${guide.slug}` }));

const CATEGORY_LINKS = DEMO_CATEGORIES.map((cat) => ({
  label: `${cat.name} (${cat.articleCount})`,
  href: `/categories/${cat.slug}`,
}));

const FOOTER_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Editorial Policy', href: '/editorial-policy' },
  { label: 'Editorial Team', href: '/authors/sciencehub-editorial-team' },
  { label: 'Sources & Image Credits', href: '/sources' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
];

const AUTH_LINKS = [
  { label: 'Sign In', href: '/login' },
  { label: 'Register', href: '/register' },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24">
      <div className="relative overflow-hidden border-b border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-card)] via-[var(--bg-secondary)] to-[var(--bg-primary)] py-16 sm:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/10 blur-[140px]" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-xs font-semibold text-gold-200 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-gold-400" />
            Complete Site Index
          </div>
          <h1
            className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Sitemap
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            Direct links to all {EDITORIAL_ARTICLES.length + LATEST_NEWS_ARTICLES.length} science articles,{' '}
            {DEMO_SCIENTISTS.length} scientist biographies, {SCIENCE_BOOKS.length} free public-domain science books,{' '}
            {DEMO_CATEGORIES.length} topic hubs, and {GUIDES.length} reading guides.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 lg:px-8 space-y-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Main Navigation */}
          <div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>Main Pages &amp; Feeds</h2>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[var(--text-secondary)] transition-colors hover:text-gold-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>Reading Guides ({GUIDE_LINKS.length})</h2>
            <ul className="mt-4 space-y-2.5">
              {GUIDE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[var(--text-secondary)] transition-colors hover:text-gold-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* All 16 Categories */}
          <div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>Categories ({CATEGORY_LINKS.length})</h2>
            <ul className="mt-4 space-y-2.5">
              {CATEGORY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[var(--text-secondary)] transition-colors hover:text-gold-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account & Legal */}
          <div>
            {API_ENABLED && (
              <>
                <h2 className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>Account</h2>
                <ul className="mt-4 mb-8 space-y-2.5">
                  {AUTH_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-[var(--text-secondary)] transition-colors hover:text-gold-400">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h2 className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>Trust &amp; Legal</h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[var(--text-secondary)] transition-colors hover:text-gold-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Evergreen Science Explainers */}
        <section className="border-t border-[var(--border-color)] pt-12">
          <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
            Evergreen Science Explainers ({EDITORIAL_ARTICLES.length})
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {EDITORIAL_ARTICLES.map((article) => (
              <li key={article.slug}>
                <Link href={`/articles/${article.slug}`} className="text-sm text-[var(--text-secondary)] transition-colors hover:text-gold-400">
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 2025-2026 Science, AI & Robotics Research Updates */}
        <section className="border-t border-[var(--border-color)] pt-12">
          <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
            2025–2026 Science, AI &amp; Robotics Updates ({LATEST_NEWS_ARTICLES.length})
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {LATEST_NEWS_ARTICLES.map((article) => (
              <li key={article.slug}>
                <Link href={`/articles/${article.slug}`} className="text-sm text-[var(--text-secondary)] transition-colors hover:text-gold-400">
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* All scientists */}
        <section className="border-t border-[var(--border-color)] pt-12">
          <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
            Scientist Profiles ({DEMO_SCIENTISTS.length})
          </h2>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
            {DEMO_SCIENTISTS.map((scientist) => (
              <li key={scientist.slug}>
                <Link href={`/scientists/${scientist.slug}`} className="text-sm text-[var(--text-secondary)] transition-colors hover:text-gold-400">
                  {scientist.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* All 34 Free Public-Domain Science Books */}
        <section className="border-t border-[var(--border-color)] pt-12">
          <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
            Free Public-Domain Science Books ({SCIENCE_BOOKS.length})
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {SCIENCE_BOOKS.map((book) => (
              <li key={book.slug}>
                <Link href={`/articles/${book.slug}`} className="text-sm text-[var(--text-secondary)] transition-colors hover:text-gold-400">
                  {book.title} — <span className="text-xs opacity-75">{book.author.displayName}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-16 border-t border-[var(--border-color)] pt-8 text-center text-sm text-[var(--text-secondary)]">
          <Link href="/" className="text-gold-400 hover:text-gold-300 transition-colors">&larr; Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
