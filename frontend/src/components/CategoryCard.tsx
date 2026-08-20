'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import type { Category } from '@/lib/types';
import { gsap } from '@/lib/gsap';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(glow, {
        opacity: 0.9,
        x,
        y,
        duration: 0.2,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(glow, {
        opacity: 0,
        duration: 0.35,
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Link
      ref={cardRef}
      href={`/categories/${category.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-gold-500/50 hover:shadow-[0_12px_40px_rgba(255,195,0,0.12)] hover:-translate-y-1.5"
    >
      {/* Dynamic Hover Spotlight */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${category.color}50 0%, transparent 70%)`,
        }}
      />

      {/* Background ambient corner blur */}
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-20 blur-2xl transition-transform duration-500 group-hover:scale-150"
        style={{ backgroundColor: category.color }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border-color)] text-3xl shadow-inner transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundColor: `${category.color}15`,
              boxShadow: `0 0 20px ${category.color}25`,
            }}
          >
            {category.icon}
          </div>
          <span className="font-mono text-xs text-[var(--text-secondary)]">
            {category.articleCount} articles
          </span>
        </div>

        <h3
          className="mt-5 text-xl font-bold tracking-tight text-[var(--text-primary)] transition-colors duration-200 group-hover:text-gold-300"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {category.name}
        </h3>

        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
          {category.description}
        </p>
      </div>

      <div className="relative z-10 mt-6 flex items-center justify-between border-t border-[var(--border-color)] pt-4 text-xs font-semibold text-gold-400">
        <span>Explore Topics</span>
        <span className="transition-transform duration-200 group-hover:translate-x-1.5">&rarr;</span>
      </div>
    </Link>
  );
}
