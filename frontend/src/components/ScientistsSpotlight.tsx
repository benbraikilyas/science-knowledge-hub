'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import ScientistCard from './ScientistCard';
import type { ScientistListItem } from '@/lib/types';
import { gsap } from '@/lib/gsap';

interface ScientistsSpotlightProps {
  scientists: ScientistListItem[];
}

export default function ScientistsSpotlight({ scientists }: ScientistsSpotlightProps) {
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

      const cards = gridRef.current?.querySelectorAll('.scientist-card-wrap');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
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
  }, [scientists]);

  if (!scientists || scientists.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-[var(--border-color)] bg-[var(--bg-primary)] py-20 sm:py-28"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Scientific Giants
            </div>
            <h2
              className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Meet the Scientists
            </h2>
            <p className="mt-2 text-base text-[var(--text-secondary)]">
              The brilliant minds whose curiosity decoded the laws of reality
            </p>
          </div>
          <Link
            href="/scientists"
            className="group hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-gold-400 transition-colors hover:text-gold-300"
          >
            <span>Explore all scientists</span>
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>

        {/* Scientists Grid */}
        <div
          ref={gridRef}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {scientists.map((scientist) => (
            <div key={scientist.id} className="scientist-card-wrap">
              <ScientistCard scientist={scientist} />
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/scientists"
            className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-[var(--border-color)] bg-white/[0.04] px-6 text-sm font-semibold text-[var(--text-primary)] backdrop-blur-md hover:bg-white/[0.08]"
          >
            Explore all scientists &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
