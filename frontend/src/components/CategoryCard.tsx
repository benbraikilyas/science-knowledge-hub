'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import type { Category } from '@/lib/types';
import { CATEGORY_IMAGES } from '@/lib/constants';
import { gsap } from '@/lib/gsap';
import SafeImage from './SafeImage';

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

  const coverImage = category.image ?? CATEGORY_IMAGES[category.slug];

  return (
    <Link
      ref={cardRef}
      href={`/categories/${category.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 backdrop-blur-xl transition-all duration-300 hover:border-gold-500/50 hover:shadow-[0_12px_40px_rgba(255,195,0,0.12)] hover:-translate-y-1.5"
    >
      {/* Dynamic Hover Spotlight */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -left-20 -top-20 z-20 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${category.color}50 0%, transparent 70%)`,
        }}
      />

      {/* Cover Image */}
      <div className="relative h-44 w-full shrink-0 overflow-hidden">
        <SafeImage
          src={coverImage}
          alt={category.name}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          fallback={
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${category.color}55 0%, transparent 70%)`,
              }}
            >
              <span
                className="text-6xl font-bold text-[var(--text-primary)] opacity-15"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {category.name.charAt(0)}
              </span>
            </div>
          }
        />
        {/* Blend + color tint overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-transparent to-transparent" />
        <div
          className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-10"
          style={{ backgroundColor: category.color }}
        />

        <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/40 px-3 py-1 font-mono text-xs text-white backdrop-blur-md">
          {category.articleCount} articles
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-between gap-6 p-6">
        <div>
          <h3
            className="text-xl font-bold tracking-tight text-[var(--text-primary)] transition-colors duration-200 group-hover:text-gold-300"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {category.name}
          </h3>

          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            {category.description}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-[var(--border-color)] pt-4 text-xs font-semibold text-gold-400">
          <span>Explore Topics</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1.5">&rarr;</span>
        </div>
      </div>
    </Link>
  );
}
