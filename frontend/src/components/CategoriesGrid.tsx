'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import CategoryCard from './CategoryCard';
import type { Category } from '@/lib/types';
import { gsap } from '@/lib/gsap';

interface CategoriesGridProps {
  categories: Category[];
}

export default function CategoriesGrid({ categories }: CategoriesGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      const cards = gridRef.current?.querySelectorAll('.category-card-wrap');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [categories]);

  if (!categories || categories.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-[var(--border-color)] bg-[var(--bg-secondary)] py-20 sm:py-28"
    >
      {/* Background radial glow */}
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-gold-500/8 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-[1550px] 2xl:max-w-[1720px] px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-[var(--accent-readable)] backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
            Scientific Disciplines
          </div>
          <h2
            className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-primary)]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Explore by Category
          </h2>
          <p className="mt-4 text-base sm:text-xl text-[var(--text-secondary)] leading-relaxed">
            Dive deep into the specialized fields decoding the universe, from quantum particles to cosmic galaxies
          </p>
        </div>

        {/* Categories Grid */}
        <div ref={gridRef} className="mt-16 grid gap-8 sm:gap-9 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div key={category.id} className="category-card-wrap">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div ref={footerRef} className="mt-16 text-center">
          <Link
            href="/categories"
            className="inline-flex h-14 items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-glass)] px-10 text-base font-semibold text-[var(--text-primary)] backdrop-blur-md transition-all duration-200 hover:border-gold-500/40 hover:bg-[var(--bg-elevated)] hover:shadow-[0_0_30px_rgba(255,195,0,0.2)]"
          >
            <span>Explore All 15 Categories</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
