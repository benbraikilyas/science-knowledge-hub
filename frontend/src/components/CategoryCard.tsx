import Link from 'next/link';
import type { Category } from '@/lib/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const gradient = `linear-gradient(135deg, ${category.color}20 0%, ${category.color}05 100%)`;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 transition-all duration-300 hover:shadow-[var(--shadow-glow-hover)] hover:-translate-y-1"
      style={{ background: gradient }}
    >
      <div
        className="absolute right-0 top-0 h-24 w-24 rounded-full opacity-10 blur-3xl transition-transform duration-500 group-hover:scale-150"
        style={{ backgroundColor: category.color }}
      />

      <div className="relative">
        <span className="text-3xl">{category.icon}</span>

        <h3 className="mt-4 text-lg font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-primary)]">
          {category.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
          {category.description}
        </p>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-[var(--text-muted)]">{category.articleCount} articles</span>
          <span className="text-[var(--accent-primary)] opacity-0 transition-opacity group-hover:opacity-100">
            Explore &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
