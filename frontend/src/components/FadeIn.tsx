'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from '@/lib/gsap';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  y = 30,
  duration = 0.8,
  className = '',
}: FadeInProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay, y, duration]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}
