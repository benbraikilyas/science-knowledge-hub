'use client';

import Link from 'next/link';
import { Sparkles, Heart } from 'lucide-react';
import { SITE_NAME, NAV_ITEMS } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#000814] text-slate-400">
      {/* Soft top gradient line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-gold-500 via-navy-600 to-gold-400 p-[1px] shadow-[0_0_20px_rgba(255,195,0,0.3)]">
                <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#000814]">
                  <Sparkles className="h-4 w-4 text-gold-400" />
                </div>
              </div>
              <span
                className="text-lg font-bold tracking-tight text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Science<span className="bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent">Hub</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
              The premier open science knowledge platform exploring the cosmos, quantum physics, biology, and artificial intelligence.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
              <span>Made with</span>
              <Heart className="h-3.5 w-3.5 text-gold-500 fill-gold-500 animate-pulse" />
              <span>for curious minds worldwide</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
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
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
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
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Connect
            </h3>
            <p className="mt-4 text-xs leading-relaxed text-slate-300">
              Weekly curated science digest directly in your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-3 flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-white placeholder-slate-400 outline-none transition-colors focus:border-gold-500"
              />
              <button
                type="submit"
                className="rounded-xl bg-gold-500 px-4 py-2 text-xs font-semibold text-navy-950 transition-opacity hover:opacity-90"
              >
                Join Newsletter
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-14 border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <p>&copy; {currentYear} {SITE_NAME}. Decoding the Universe.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
