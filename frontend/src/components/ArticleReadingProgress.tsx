'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function ArticleReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const ctx = gsap.context(() => {
      gsap.to(bar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-gradient-to-r from-gold-500 via-gold-400 to-gold-300 shadow-[0_0_12px_rgba(255,195,0,0.8)]"
      style={{ transform: 'scaleX(0)' }}
    />
  );
}
