import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Sitemap | Science Knowledge Hub',
  description: 'Sitemap for Science Knowledge Hub - find all pages and sections.',
};

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Articles', href: '/articles' },
  { label: 'Categories', href: '/categories' },
  { label: 'Scientists', href: '/scientists' },
  { label: 'Search', href: '/search' },
];

const CATEGORY_LINKS = [
  { label: 'Space & Astronomy', href: '/categories/space' },
  { label: 'Quantum Physics', href: '/categories/quantum-physics' },
  { label: 'Biology & Life', href: '/categories/biology' },
  { label: 'Artificial Intelligence', href: '/categories/artificial-intelligence' },
  { label: 'Scientific Theories', href: '/categories/scientific-theories' },
];

const FOOTER_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
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
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-xs font-semibold text-gold-200 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-gold-400" />
            Site Map
          </div>
          <h1
            className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Sitemap
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {/* Main Navigation */}
          <div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>Main Pages</h2>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[var(--text-secondary)] transition-colors hover:text-gold-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>Categories</h2>
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
            <h2 className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>Account</h2>
            <ul className="mt-4 space-y-2.5">
              {AUTH_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[var(--text-secondary)] transition-colors hover:text-gold-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mt-8 text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>Legal</h2>
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

        <div className="mt-16 border-t border-[var(--border-color)] pt-8 text-center text-sm text-[var(--text-secondary)]">
          <Link href="/" className="text-gold-400 hover:text-gold-300 transition-colors">&larr; Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
