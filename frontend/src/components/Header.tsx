'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Menu, X, Search, Moon, Sun, Sparkles } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';
import { gsap } from '@/lib/gsap';

const emptySubscribe = () => () => { };

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const headerRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      const rootStyles = getComputedStyle(document.documentElement);
      const themeValue = (name: string) => rootStyles.getPropertyValue(name).trim();

      gsap.to(header, {
        backgroundColor: themeValue(scrolled ? '--header-bg-scrolled' : '--header-bg-top'),
        borderColor: themeValue(scrolled ? '--header-border-scrolled' : '--header-border-top'),
        boxShadow: scrolled ? themeValue('--header-shadow-scrolled') : 'none',
        duration: 0.35,
        ease: 'power2.out',
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [resolvedTheme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header
      ref={headerRef}
      lang="en"
      dir="ltr"
      translate="no"
      suppressHydrationWarning
      className="notranslate sticky top-0 z-50 w-full border-b border-[var(--border-color)] bg-[var(--bg-primary)]/40 backdrop-blur-xl transition-colors duration-300"
    >
      <div className="mx-auto flex h-20 max-w-[1550px] 2xl:max-w-[1720px] items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-gold-500 via-gold-400 to-navy-600 p-[1.5px] shadow-[0_0_25px_rgba(255,195,0,0.35)] transition-transform duration-300 group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[var(--bg-primary)]">
              <Sparkles className="h-5 w-5 text-gold-400 transition-transform duration-300 group-hover:rotate-12" />
            </div>
          </div>
          <span
            dir="ltr"
            translate="no"
            suppressHydrationWarning
            className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--text-primary)]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Science
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'var(--hero-accent-gradient)' }}
            >
              Hub
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          aria-label="Primary navigation"
          translate="no"
          suppressHydrationWarning
          className="notranslate hidden items-center gap-2 md:flex"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                translate="no"
                suppressHydrationWarning
                className={`relative rounded-xl px-4 py-2.5 text-base font-medium transition-all duration-200 ${isActive
                    ? 'text-[var(--text-primary)] font-semibold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.06]'
                  }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-xl bg-gold-500/15 border border-gold-500/30 shadow-[0_0_15px_rgba(255,195,0,0.15)]" />
                )}
                <span translate="no" suppressHydrationWarning className="notranslate relative z-10">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex items-center gap-2.5 rounded-xl border border-[var(--border-color)] bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] backdrop-blur-md transition-all duration-200 hover:border-gold-500/40 hover:bg-white/[0.08] hover:text-[var(--text-primary)]"
            aria-label="Search"
          >
            <Search className="h-4 w-4 text-[var(--text-secondary)]" />
            <span className="hidden sm:inline text-[var(--text-secondary)]">Search</span>
            <kbd className="hidden sm:inline-flex items-center rounded bg-[var(--border-color)] px-2 py-0.5 font-mono text-[11px] text-[var(--text-secondary)]">
              ⌘K
            </kbd>
          </button>

          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="rounded-xl border border-[var(--border-color)] bg-white/[0.04] p-2 text-[var(--text-secondary)] transition-all duration-200 hover:border-gold-500/40 hover:bg-white/[0.08] hover:text-[var(--text-primary)]"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? <Sun className="h-4 w-4 text-gold-400" /> : <Moon className="h-4 w-4 text-navy-600" />}
            </button>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl border border-[var(--border-color)] bg-white/[0.04] p-2 text-[var(--text-secondary)] transition-colors hover:bg-white/[0.08] hover:text-[var(--text-primary)] md:hidden"
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Search Drawer */}
      {searchOpen && (
        <div className="border-t border-gold-500/20 bg-[var(--bg-secondary)]/95 px-4 py-4 backdrop-blur-2xl shadow-2xl animate-fade-in-down">
          <form onSubmit={handleSearch} className="mx-auto flex max-w-3xl items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, scientists, equations, cosmos..."
                className="w-full rounded-xl border border-gold-500/30 bg-[var(--bg-primary)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder-slate-500 outline-none transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-500/20"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 shadow-[0_0_20px_rgba(255,195,0,0.3)] transition-all hover:bg-gold-400 active:scale-95"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="rounded-xl border border-[var(--border-color)] p-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <X className="h-4 w-4" />
            </button>
          </form>
          <div className="mx-auto mt-3 flex max-w-3xl flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
            <span>Trending:</span>
            {['James Webb Telescope', 'Quantum Entanglement', 'Black Holes', 'Dark Matter', 'CRISPR'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  window.location.href = `/search?q=${encodeURIComponent(tag)}`;
                }}
                className="rounded-lg border border-[var(--border-color)] bg-white/[0.04] px-2.5 py-1 text-[var(--text-secondary)] transition-colors hover:border-gold-500/40 hover:bg-gold-500/10 hover:text-gold-300"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]/98 px-4 py-4 backdrop-blur-2xl md:hidden">
          <nav
            aria-label="Mobile navigation"
            translate="no"
            suppressHydrationWarning
            className="notranslate flex flex-col space-y-1.5"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  translate="no"
                  suppressHydrationWarning
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive
                      ? 'bg-gold-500/15 text-gold-400 font-semibold border border-gold-500/30'
                      : 'text-[var(--text-secondary)] hover:bg-white/[0.06] hover:text-[var(--text-primary)]'
                    }`}
                >
                  <span translate="no" suppressHydrationWarning>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
