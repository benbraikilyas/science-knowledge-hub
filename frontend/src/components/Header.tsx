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
  const { theme, setTheme } = useTheme();
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
      gsap.to(header, {
        backgroundColor: scrolled ? 'rgba(0, 13, 31, 0.92)' : 'rgba(0, 8, 20, 0.45)',
        borderColor: scrolled ? 'rgba(255, 195, 0, 0.25)' : 'rgba(255, 255, 255, 0.06)',
        boxShadow: scrolled
          ? '0 10px 30px -10px rgba(0, 0, 0, 0.6), 0 0 25px rgba(255, 195, 0, 0.1)'
          : 'none',
        duration: 0.35,
        ease: 'power2.out',
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#000814]/40 backdrop-blur-xl transition-colors duration-300"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-gold-500 via-gold-400 to-navy-600 p-[1px] shadow-[0_0_20px_rgba(255,195,0,0.3)] transition-transform duration-300 group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#000814]">
              <Sparkles className="h-4 w-4 text-gold-400 transition-transform duration-300 group-hover:rotate-12" />
            </div>
          </div>
          <span
            className="text-lg font-bold tracking-tight text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Science<span className="bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent">Hub</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1.5 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200 ${isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-xl bg-gold-500/15 border border-gold-500/30 shadow-[0_0_15px_rgba(255,195,0,0.15)]" />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-md transition-all duration-200 hover:border-gold-500/40 hover:bg-white/[0.08] hover:text-white"
            aria-label="Search"
          >
            <Search className="h-4 w-4 text-slate-400" />
            <span className="hidden sm:inline text-slate-400">Search</span>
            <kbd className="hidden sm:inline-flex items-center rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
              ⌘K
            </kbd>
          </button>

          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition-all duration-200 hover:border-gold-500/40 hover:bg-white/[0.08] hover:text-white"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-gold-400" /> : <Moon className="h-4 w-4 text-navy-600" />}
            </button>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition-colors hover:bg-white/[0.08] hover:text-white md:hidden"
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Search Drawer */}
      {searchOpen && (
        <div className="border-t border-gold-500/20 bg-[#000d1f]/95 px-4 py-4 backdrop-blur-2xl shadow-2xl animate-fade-in-down">
          <form onSubmit={handleSearch} className="mx-auto flex max-w-3xl items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, scientists, equations, cosmos..."
                className="w-full rounded-xl border border-gold-500/30 bg-[#000814] py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-500/20"
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
              className="rounded-xl border border-white/10 p-2.5 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </form>
          <div className="mx-auto mt-3 flex max-w-3xl flex-wrap items-center gap-2 text-xs text-slate-400">
            <span>Trending:</span>
            {['James Webb Telescope', 'Quantum Entanglement', 'Black Holes', 'Dark Matter', 'CRISPR'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  window.location.href = `/search?q=${encodeURIComponent(tag)}`;
                }}
                className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-slate-300 transition-colors hover:border-gold-500/40 hover:bg-gold-500/10 hover:text-gold-300"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#000d1f]/98 px-4 py-4 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${isActive
                      ? 'bg-gold-500/15 text-gold-400 font-semibold border border-gold-500/30'
                      : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
