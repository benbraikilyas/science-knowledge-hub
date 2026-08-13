import Link from 'next/link';
import ScientistCard from './ScientistCard';
import FadeIn from './FadeIn';
import type { ScientistListItem } from '@/lib/types';

interface ScientistsSpotlightProps {
  scientists: ScientistListItem[];
}

export default function ScientistsSpotlight({ scientists }: ScientistsSpotlightProps) {
  if (!scientists || scientists.length === 0) return null;

  return (
    <section className="border-t border-[var(--border-color)] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
              Meet the Scientists
            </h2>
            <p className="mt-2 text-[var(--text-secondary)]">
              The brilliant minds who shaped our understanding of the universe
            </p>
          </div>
          <Link
            href="/scientists"
            className="hidden text-sm font-medium text-[var(--accent-primary)] transition-colors hover:underline sm:block"
          >
            View all scientists &rarr;
          </Link>
        </FadeIn>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {scientists.map((scientist, i) => (
            <FadeIn key={scientist.id} delay={(i % 4) * 0.08}>
              <ScientistCard scientist={scientist} />
            </FadeIn>
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/scientists"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-[var(--border-color)] px-6 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-card)]"
          >
            View all scientists &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
