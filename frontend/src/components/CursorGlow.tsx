'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop devices that support fine pointer
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const glow = glowRef.current;
    if (!glow) return;

    // Quick setters for ultra-smooth 60fps tracking
    const xTo = gsap.quickTo(glow, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(glow, 'y', { duration: 0.6, ease: 'power3.out' });

    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.to(glow, { opacity: 0.65, duration: 0.4 });
        isVisible = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseLeave = () => {
      gsap.to(glow, { opacity: 0, duration: 0.4 });
      isVisible = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-30 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[130px] transition-opacity duration-300"
      style={{
        background:
          'radial-gradient(circle, rgba(255, 195, 0, 0.12) 0%, rgba(0, 53, 102, 0.08) 45%, transparent 70%)',
      }}
    />
  );
}
