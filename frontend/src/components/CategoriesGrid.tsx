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
      className="relative border-t border-white/[0.06] bg-[#000d1f] py-20 sm:py-28"
    >
      {/* Background radial glow */}
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-gold-500/8 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-xs font-semibold text-gold-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
            Scientific Disciplines
          </div>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Explore by Category
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Dive deep into the specialized fields decoding the universe, from quantum particles to cosmic galaxies
          </p>
        </div>

        {/* Categories Grid */}
        <div ref={gridRef} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div key={category.id} className="category-card-wrap">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div ref={footerRef} className="mt-14 text-center">
          <Link
            href="/categories"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-8 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:border-gold-500/40 hover:bg-white/[0.08] hover:shadow-[0_0_25px_rgba(255,195,0,0.15)]"
          >
            <span>Browse All Categories</span>
            <span className="text-lg">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
