import Link from 'next/link';
import type { ScientistListItem } from '@/lib/types';

interface ScientistCardProps {
  scientist: ScientistListItem;
}

export default function ScientistCard({ scientist }: ScientistCardProps) {
  return (
    <Link
      href={`/scientists/${scientist.slug}`}
      className="group flex flex-col items-center rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 text-center transition-all duration-300 hover:shadow-[var(--shadow-glow-hover)] hover:-translate-y-1"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--gradient-nebula)] text-3xl font-bold text-white shadow-lg">
        {scientist.name.charAt(0)}
      </div>

      <h3 className="mt-4 text-lg font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-primary)]">
        {scientist.name}
      </h3>

      <p className="mt-1 text-sm text-[var(--text-secondary)]">{scientist.field}</p>

      <div className="mt-3 flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <span>{scientist.nationality}</span>
        <span>·</span>
        <span>{scientist.era}</span>
      </div>

      <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[var(--accent-primary)] opacity-0 transition-opacity group-hover:opacity-100">
        View Profile
        <span className="text-sm">&rarr;</span>
      </div>
    </Link>
  );
}
