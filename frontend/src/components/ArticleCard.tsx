'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatCompactNumber, getRelativeTime } from '@/lib/utils';
import type { ArticleListItem } from '@/lib/types';
import { gsap } from '@/lib/gsap';
import { getPublicArticleAuthor } from '@/lib/article-author';

interface ArticleCardProps {
  article: ArticleListItem;
  featured?: boolean;
}

export default function ArticleCard({ article, featured }: ArticleCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [imgFailed, setImgFailed] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);

  const showImage = Boolean(article.featuredImage) && !imgFailed;
  const publicAuthor = getPublicArticleAuthor(article.author);
  const showAvatar = Boolean(publicAuthor.avatar) && !avatarFailed;

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        duration: 0.4,
        ease: 'power2.out',
      });

      gsap.to(glow, {
        opacity: 0.8,
        x,
        y,
        duration: 0.2,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
      gsap.to(glow, {
        opacity: 0,
        duration: 0.4,
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
      href={`/articles/${article.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 backdrop-blur-xl transition-all duration-300 hover:border-gold-500/50 hover:shadow-[0_10px_35px_rgba(255,195,0,0.12)] ${featured ? 'lg:flex-row' : ''
        }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Radial Hover Spotlight */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -left-24 -top-24 h-48 w-48 rounded-full opacity-0 blur-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${article.category.color}40 0%, transparent 70%)`,
        }}
      />

      {/* Visual / Icon Thumbnail */}
      <div className={`relative overflow-hidden ${featured ? 'lg:w-1/2' : ''}`}>
        {showImage ? (
          <div className={`relative ${featured ? 'aspect-[16/10] lg:h-full min-h-[260px]' : 'aspect-[16/10] min-h-[210px]'}`}>
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              sizes={featured ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgFailed(true)}
            />
          </div>
        ) : (
          <div
            className={`flex items-center justify-center bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-primary)] ${featured ? 'aspect-[16/10] lg:h-full min-h-[260px]' : 'aspect-[16/10] min-h-[210px]'
              }`}
          >
            <span className="text-6xl transition-transform duration-500 group-hover:scale-125">
              {article.category.icon}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-60" />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold"
              style={{
                backgroundColor: `${article.category.color}20`,
                color: article.category.color,
                border: `1px solid ${article.category.color}40`,
              }}
            >
              <span className="text-base">{article.category.icon}</span>
              <span>{article.category.name}</span>
            </span>
            <span className="text-xs sm:text-sm text-[var(--text-secondary)] font-mono">{article.readTime} min read</span>
          </div>

          <h3
            className={`mt-4 font-bold leading-snug text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent-readable)] ${featured ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl sm:text-2xl'
              }`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {article.title}
          </h3>

          <p className="mt-3 line-clamp-3 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
            {article.excerpt}
          </p>
        </div>

        {/* Footer Meta */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 border-t border-[var(--border-color)] pt-4 text-xs sm:text-sm text-[var(--text-secondary)]">
          <div className="flex min-w-0 items-center gap-2.5">
            {showAvatar ? (
              <Image
                src={publicAuthor.avatar as string}
                alt={publicAuthor.displayName}
                width={28}
                height={28}
                className="h-7 w-7 shrink-0 rounded-full object-cover shadow-[0_0_10px_rgba(255,195,0,0.3)]"
                onError={() => setAvatarFailed(true)}
              />
            ) : (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-gold-500 to-navy-600 text-xs font-bold text-[var(--text-primary)] shadow-[0_0_10px_rgba(255,195,0,0.3)]">
                {publicAuthor.displayName.charAt(0)}
              </div>
            )}
            <span className="truncate font-medium text-[var(--text-secondary)]">{publicAuthor.displayName}</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs sm:text-sm">
            <span>{formatCompactNumber(article.viewsCount)} views</span>
            <span>·</span>
            <span>{getRelativeTime(article.publishedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
