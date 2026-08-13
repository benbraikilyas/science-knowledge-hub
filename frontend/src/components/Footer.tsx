import Link from 'next/link';
import { SITE_NAME, NAV_ITEMS } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--gradient-nebula)] text-sm font-bold text-white">
                S
              </div>
              <span className="text-lg font-bold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Science<span className="text-[var(--accent-primary)]">Hub</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              {SITE_NAME} is your gateway to understanding the universe. Explore thousands of articles on space, physics, biology, AI, and more.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Navigation</h3>
            <ul className="mt-3 space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-primary)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Categories</h3>
            <ul className="mt-3 space-y-2">
              {['Space', 'Physics', 'Biology', 'AI', 'Technology'].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/categories/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-primary)]"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">Stay Connected</h3>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              Get the latest scientific discoveries delivered to your inbox.
            </p>
            <form className="mt-3 flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-primary)]"
              />
              <button
                type="submit"
                className="rounded-lg bg-[var(--accent-primary)] px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--border-color)] pt-6 text-center">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
