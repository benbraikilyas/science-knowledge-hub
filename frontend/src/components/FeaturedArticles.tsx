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
    <section ref={sectionRef} className="relative py-20 sm:py-28 bg-[var(--bg-primary)]">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-gold-500/8 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Editor&apos;s Selection
            </div>
            <h2
              className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Featured Articles
            </h2>
            <p className="mt-2 text-base text-[var(--text-secondary)]">
              Handpicked breakthroughs, deep dives, and scientific discoveries
            </p>
          </div>
          <Link
            href="/articles"
            className="group hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-gold-400 transition-colors hover:text-gold-300"
          >
            <span>View all articles</span>
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>

        {/* Dynamic Bento/Grid Layout */}
        <div ref={gridRef} className="mt-12 grid gap-6">
          {/* Top Featured Row */}
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="article-card-item lg:col-span-7">
              <ArticleCard article={featured} featured />
            </div>
            <div className="grid gap-6 lg:col-span-5">
              {secondary.map((article) => (
                <div key={article.id} className="article-card-item">
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          </div>

          {/* Lower 3-column Grid */}
          {rest.length > 0 && (
            <div className="mt-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
            className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-[var(--border-color)] bg-white/[0.04] px-6 text-sm font-semibold text-[var(--text-primary)] backdrop-blur-md hover:bg-white/[0.08]"
          >
            View all articles &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
