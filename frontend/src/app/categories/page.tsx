import CategoryCard from '@/components/CategoryCard';
import type { Category } from '@/lib/types';

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
  title: 'Categories',
  description: 'Explore scientific categories from Space and Astronomy to Quantum Physics and AI.',
};

export default async function CategoriesPage() {
  const categories: Category[] = await getCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
          Categories
        </h1>
        <p className="text-[var(--text-secondary)]">
          Explore every branch of science through our curated categories
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="mt-20 text-center">
          <p className="text-lg text-[var(--text-muted)]">No categories found.</p>
        </div>
      )}
    </div>
  );
}
