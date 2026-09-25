'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import ArticleCard from './ArticleCard';
import type { ArticleListItem } from '@/lib/types';
import { gsap } from '@/lib/gsap';

interface FeaturedArticlesProps {
  articles: ArticleListItem[];
}

export default function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      const cards = gridRef.current?.querySelectorAll('.article-card-item');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [articles]);

  if (!articles || articles.length === 0) return null;

  const featured = articles[0];
  const secondary = articles.slice(1, 3);
  const rest = articles.slice(3, 7);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 bg-[var(--bg-primary)]">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-10 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-[1550px] 2xl:max-w-[1720px] px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[var(--border-color)]/60 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-[var(--accent-readable)] backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
              2025–2026 Research Updates
            </div>
            <h2
              className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-primary)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Latest Science &amp; Technology
            </h2>
            <p className="mt-3 text-base sm:text-xl text-[var(--text-secondary)] max-w-3xl">
              Sourced reporting and clear explainers on artificial intelligence, robotics, space, physics, biology, and climate science.
            </p>
          </div>
          <Link
            href="/articles"
            className="group hidden sm:inline-flex items-center gap-2 text-base sm:text-lg font-semibold text-[var(--accent-readable)] transition-opacity hover:opacity-80"
          >
            <span>View all articles</span>
            <span className="transition-transform group-hover:translate-x-1.5">&rarr;</span>
          </Link>
        </div>

        {/* Dynamic Bento/Grid Layout */}
        <div ref={gridRef} className="mt-12 sm:mt-16 grid gap-8 sm:gap-10">
          {/* Top Featured Row */}
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-12">
            <div className="article-card-item lg:col-span-7">
              <ArticleCard article={featured} featured />
            </div>
            <div className="grid gap-8 sm:gap-10 lg:col-span-5">
              {secondary.map((article) => (
                <div key={article.id} className="article-card-item">
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          </div>

          {/* Lower 3-column Grid */}
          {rest.length > 0 && (
            <div className="mt-4 grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
                <div key={article.id} className="article-card-item">
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mobile View All button */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/articles"
            className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-glass)] px-6 text-sm font-semibold text-[var(--text-primary)] backdrop-blur-md hover:bg-[var(--bg-elevated)]"
          >
            View all articles &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
