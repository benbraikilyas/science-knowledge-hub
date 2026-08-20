'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import type { ScientistListItem } from '@/lib/types';
import { gsap } from '@/lib/gsap';

interface ScientistCardProps {
  scientist: ScientistListItem;
}

export default function ScientistCard({ scientist }: ScientistCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const avatar = avatarRef.current;
    if (!card || !avatar) return;

    const handleMouseEnter = () => {
      gsap.to(avatar, {
        scale: 1.1,
        rotate: 4,
        duration: 0.35,
        ease: 'back.out(1.7)',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(avatar, {
        scale: 1,
        rotate: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Link
      ref={cardRef}
      href={`/scientists/${scientist.slug}`}
      className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/[0.08] bg-[#001d3d]/60 p-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-gold-500/50 hover:shadow-[0_12px_40px_rgba(255,195,0,0.12)] hover:-translate-y-1.5"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-12 h-32 w-32 rounded-full bg-gold-500/12 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

      {/* Scientist Avatar */}
      <div
        ref={avatarRef}
        className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-gold-500 via-navy-600 to-gold-400 p-[1.5px] shadow-[0_0_25px_rgba(255,195,0,0.25)]"
      >
        <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[#000d1f] text-3xl font-bold text-white">
          {scientist.name.charAt(0)}
        </div>
      </div>

      {/* Name & Field */}
      <h3
        className="mt-5 text-lg font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-gold-300"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {scientist.name}
      </h3>

      <p className="mt-1 text-sm font-medium text-gold-400/90">{scientist.field}</p>

      {/* Era & Origin */}
      <div className="mt-3 flex items-center gap-2 text-xs text-slate-400 font-mono">
        <span>{scientist.nationality}</span>
        <span>·</span>
        <span>{scientist.era}</span>
      </div>

      {/* Action CTA */}
      <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 opacity-80 transition-all duration-200 group-hover:opacity-100">
        <span>Explore Discoveries</span>
        <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
      </div>
    </Link>
  );
}
