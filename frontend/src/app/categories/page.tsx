import CategoryCard from '@/components/CategoryCard';
import { fetchCategories } from '@/lib/api';
import { DEMO_CATEGORIES } from '@/lib/constants';
import type { Category } from '@/lib/types';
import { Compass } from 'lucide-react';

function mergeCategories(remoteCategories: Category[]): Category[] {
  const remoteBySlug = new Map(remoteCategories.map((category) => [category.slug, category]));
  const mergedLocal = DEMO_CATEGORIES.map((category) => {
    const remote = remoteBySlug.get(category.slug);
    if (!remote) return category;

    remoteBySlug.delete(category.slug);
    return {
      ...category,
      ...remote,
      articleCount: Math.max(category.articleCount, remote.articleCount || 0),
    };
  });

  return [...mergedLocal, ...remoteBySlug.values()]
    .filter((category) => category.isActive !== false)
    .sort((a, b) => a.order - b.order);
}

async function getCategories(): Promise<Category[]> {
  try {
    const remote = await fetchCategories();
    return mergeCategories(Array.isArray(remote) ? remote as Category[] : []);
  } catch {
    return DEMO_CATEGORIES;
  }
}

export const metadata = {
  title: 'Categories',
  description: 'Explore scientific categories from space and quantum physics to AI, robotics, and biology.',
};

export default async function CategoriesPage() {
  const categories: Category[] = await getCategories();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24">
      {/* Header Banner */}
      <div className="relative overflow-hidden border-b border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-card)] via-[var(--bg-secondary)] to-[var(--bg-primary)] py-16 sm:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/10 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-xs font-semibold text-gold-200 backdrop-blur-md">
            <Compass className="h-3.5 w-3.5 text-gold-400" />
            Scientific Disciplines
          </div>

          <h1
            className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Explore by{' '}
            <span className="bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent">
              Branch of Science
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            Journey into astrophysics, quantum states, biological evolution, artificial intelligence, and robotics.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        {categories.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-16 text-center backdrop-blur-xl">
            <p className="text-lg text-[var(--text-secondary)]">No categories available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
