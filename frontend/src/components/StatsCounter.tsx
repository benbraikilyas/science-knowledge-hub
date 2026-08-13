'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STATS = [
  { label: 'Articles', value: 2500, suffix: '+' },
  { label: 'Scientists', value: 500, suffix: '+' },
  { label: 'Categories', value: 15, suffix: '' },
  { label: 'Monthly Readers', value: 150000, suffix: '+' },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 2.2,
      ease: 'easeOut',
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target]);

  const format = (n: number) => {
    if (n >= 1000) return (n / 1000).toFixed(n >= 100000 ? 0 : 1) + 'K';
    return n.toString();
  };

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: EASE }}
        className="text-4xl font-bold text-[var(--text-primary)] sm:text-5xl"
      >
        {format(count)}
        <span className="text-[var(--accent-primary)]">{suffix}</span>
      </motion.div>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="border-t border-[var(--border-color)] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <Counter target={stat.value} suffix={stat.suffix} />
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: EASE }}
                className="mt-2 text-sm text-[var(--text-secondary)]"
              >
                {stat.label}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
