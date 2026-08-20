'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Heart, CheckCircle2, AlertCircle } from 'lucide-react';
import { SITE_NAME, NAV_ITEMS } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || loading) return;

    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
      const res = await fetch(`${apiUrl}/newsletter/subscribe/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail || body.message || 'Subscription failed');
      }

      setSubscribed(true);
      setEmail('');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative border-t border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)]">
      {/* Soft top gradient line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-gold-500 via-navy-600 to-gold-400 p-[1px] shadow-[0_0_20px_rgba(255,195,0,0.3)]">
                <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[var(--bg-primary)]">
                  <Sparkles className="h-4 w-4 text-gold-400" />
                </div>
              </div>
              <span
                className="text-lg font-bold tracking-tight text-[var(--text-primary)]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Science<span className="bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent">Hub</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">
              The premier open science knowledge platform exploring the cosmos, quantum physics, biology, and artificial intelligence.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <span>Made with</span>
              <Heart className="h-3.5 w-3.5 text-gold-500 fill-gold-500 animate-pulse" />
              <span>for curious minds worldwide</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors duration-200 hover:text-gold-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Fields of Science
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { name: 'Space & Astronomy', slug: 'space' },
                { name: 'Quantum Physics', slug: 'quantum-physics' },
                { name: 'Biology & Life', slug: 'biology' },
                { name: 'Artificial Intelligence', slug: 'artificial-intelligence' },
                { name: 'Theories & Laws', slug: 'scientific-theories' },
              ].map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="transition-colors duration-200 hover:text-gold-300"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Join */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Quick Connect
            </h3>
            <p className="mt-4 text-xs leading-relaxed text-[var(--text-secondary)]">
              Weekly curated science digest directly in your inbox.
            </p>

            {subscribed ? (
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-3 py-2 text-xs text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                <span>Subscribed!</span>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-red-400">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                <form
                  onSubmit={handleSubmit}
                  className="mt-3 flex flex-col gap-2"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-[var(--border-color)] bg-white/[0.04] px-3.5 py-2 text-xs text-[var(--text-primary)] placeholder-[var(--text-secondary)] outline-none transition-colors focus:border-gold-500 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-gold-500 px-4 py-2 text-xs font-semibold text-navy-950 transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Joining...' : 'Join Newsletter'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-14 border-t border-[var(--border-color)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-secondary)] font-mono">
          <p>&copy; {currentYear} {SITE_NAME}. Decoding the Universe.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[var(--text-primary)] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[var(--text-primary)] transition-colors">Terms of Use</Link>
            <Link href="/sitemap" className="hover:text-[var(--text-primary)] transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
