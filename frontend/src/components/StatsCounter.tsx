'use client';

import { useEffect, useRef } from 'react';
import { BookOpen, Users, Compass, Globe } from 'lucide-react';
import { gsap } from '@/lib/gsap';

const STATS = [
  {
    label: 'Published Articles',
    value: 2500,
    suffix: '+',
    icon: BookOpen,
    color: '#ffc300',
  },
  {
    label: 'Pioneering Scientists',
    value: 500,
    suffix: '+',
    icon: Users,
    color: '#38bdf8',
  },
  {
    label: 'Scientific Fields',
    value: 15,
    suffix: '',
    icon: Compass,
    color: '#ffd60a',
  },
  {
    label: 'Monthly Explorers',
    value: 150000,
    suffix: '+',
    icon: Globe,
    color: '#34d399',
  },
];

export default function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 35, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      );

      STATS.forEach((stat, index) => {
        const el = countersRef.current[index];
        if (!el) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
          onUpdate: () => {
            const v = Math.round(obj.val);
            if (v >= 1000) {
              el.textContent =
                v >= 100000
                  ? `${Math.round(v / 1000)}K`
                  : `${(v / 1000).toFixed(1)}K`;
            } else {
              el.textContent = v.toString();
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-[var(--border-color)] bg-[var(--bg-primary)] py-20"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="stat-card group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/50 p-7 text-center backdrop-blur-xl transition-all duration-300 hover:border-gold-500/40 hover:shadow-[0_8px_30px_rgba(255,195,0,0.1)] hover:-translate-y-1"
              >
                {/* Subtle icon badge */}
                <div
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border-color)] shadow-inner"
                  style={{
                    backgroundColor: `${stat.color}15`,
                    color: stat.color,
                  }}
                >
                  <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Number */}
                <div
                  className="mt-5 text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  <span
                    ref={(el) => {
                      countersRef.current[i] = el;
                    }}
                  >
                    0
                  </span>
                  <span style={{ color: stat.color }}>{stat.suffix}</span>
                </div>

                {/* Label */}
                <p className="mt-2 text-sm font-medium text-[var(--text-secondary)]">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
