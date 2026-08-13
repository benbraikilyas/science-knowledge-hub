import Link from 'next/link';
import ScientistCard from '@/components/ScientistCard';
import type { ScientistListItem } from '@/lib/types';

async function getScientists() {
  try {
    const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
    const res = await fetch(`${api}/scientists/`, { next: { revalidate: 60 } });
    return await res.json();
  } catch {
    const { DEMO_SCIENTISTS } = await import('@/lib/constants');
    return DEMO_SCIENTISTS;
  }
}

export const metadata = {
  title: 'Scientists',
  description: 'Discover the brilliant minds who shaped our understanding of the universe.',
};

export default async function ScientistsPage() {
  const scientists: ScientistListItem[] = await getScientists();

  const fields = [...new Set(scientists.map((s) => s.field))];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] sm:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
          Scientists
        </h1>
        <p className="text-[var(--text-secondary)]">
          Discover the brilliant minds who shaped our understanding of the universe
        </p>
      </div>

      {fields.length > 1 && (
        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            href="/scientists"
            className="rounded-full border border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-3 py-1.5 text-xs font-medium text-[var(--accent-primary)]"
          >
            All
          </Link>
          {fields.map((field) => (
            <Link
              key={field}
              href={`/scientists?field=${encodeURIComponent(field)}`}
              className="rounded-full border border-[var(--border-color)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-card)]"
            >
              {field}
            </Link>
          ))}
        </div>
      )}

      {scientists.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {scientists.map((scientist) => (
            <ScientistCard key={scientist.id} scientist={scientist} />
          ))}
        </div>
      ) : (
        <div className="mt-20 text-center">
          <p className="text-lg text-[var(--text-muted)]">No scientists found.</p>
          <Link
            href="/scientists"
            className="mt-4 inline-flex h-11 items-center gap-2 rounded-xl border border-[var(--border-color)] px-6 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-card)]"
          >
            View all
          </Link>
        </div>
      )}
    </div>
  );
}
