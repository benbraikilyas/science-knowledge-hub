import CategoryCard from '@/components/CategoryCard';
import type { Category } from '@/lib/types';
import { Compass } from 'lucide-react';

async function getCategories() {
  try {
    const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
    const res = await fetch(`${api}/categories/`, { next: { revalidate: 60 } });
    return await res.json();
  } catch {
    const { DEMO_CATEGORIES } = await import('@/lib/constants');
    return DEMO_CATEGORIES;
  }
}

export const metadata = {
  title: 'Categories | Science Knowledge Hub',
  description: 'Explore scientific categories from Space and Astronomy to Quantum Physics and AI.',
};

export default async function CategoriesPage() {
  const categories: Category[] = await getCategories();

  return (
    <div className="min-h-screen bg-[#000814] pb-24">
      {/* Header Banner */}
      <div className="relative overflow-hidden border-b border-white/[0.08] bg-gradient-to-b from-[#001d3d] via-[#000d1f] to-[#000814] py-16 sm:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/10 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-xs font-semibold text-gold-200 backdrop-blur-md">
            <Compass className="h-3.5 w-3.5 text-gold-400" />
            Scientific Disciplines
          </div>

          <h1
            className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Explore by{' '}
            <span className="bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent">
              Branch of Science
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Journey into astrophysics, quantum states, biological evolution, and cognitive machine systems.
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
          <div className="rounded-3xl border border-white/[0.08] bg-[#001d3d]/60 p-16 text-center backdrop-blur-xl">
            <p className="text-lg text-slate-400">No categories available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
