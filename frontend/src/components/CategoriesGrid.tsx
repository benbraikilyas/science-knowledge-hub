import Link from 'next/link';
import CategoryCard from './CategoryCard';
import FadeIn from './FadeIn';
import type { Category } from '@/lib/types';

interface CategoriesGridProps {
  categories: Category[];
}

export default function CategoriesGrid({ categories }: CategoriesGridProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Explore by Category
          </h2>
          <p className="mt-2 text-[var(--text-secondary)]">
            Dive deep into any scientific field that sparks your curiosity
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <FadeIn key={category.id} delay={(i % 3) * 0.08}>
              <CategoryCard category={category} />
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10 text-center" delay={0.15}>
          <Link
            href="/categories"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-glass)] px-6 text-sm font-medium text-[var(--text-primary)] transition-all hover:bg-[var(--bg-card)] hover:shadow-[var(--shadow-glow)]"
          >
            Browse All Categories &rarr;
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
