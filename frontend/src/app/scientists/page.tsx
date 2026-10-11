import Link from 'next/link';
import ScientistCard from '@/components/ScientistCard';
import { fetchScientists } from '@/lib/api';
import { DEMO_SCIENTISTS, mergeScientistProfiles } from '@/lib/scientists';
import type { ScientistGroup, ScientistListItem } from '@/lib/types';
import { Users } from 'lucide-react';

const SCIENTIST_GROUPS: { label: ScientistGroup; icon: string }[] = [
  { label: 'Arab & Muslim Pioneers', icon: '✦' },
  { label: 'Computing & Algorithms', icon: '⌘' },
  { label: 'Physical Sciences', icon: '⚛' },
  { label: 'Life Sciences', icon: '✧' },
];

async function getScientists(): Promise<ScientistListItem[]> {
  try {
    const raw = await fetchScientists();
    return mergeScientistProfiles(raw as ScientistListItem[]);
  } catch {
    return DEMO_SCIENTISTS;
  }
}

export const metadata = {
  title: 'Scientists Directory',
  description: 'Discover the brilliant minds who shaped our understanding of the universe.',
};

export default async function ScientistsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const currentGroup = params.group || '';
  const allScientists: ScientistListItem[] = await getScientists();

  const scientists = currentGroup
    ? allScientists.filter((scientist) => scientist.group === currentGroup)
    : allScientists;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24">
      {/* Header Banner */}
      <div className="relative overflow-hidden border-b border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-card)] via-[var(--bg-secondary)] to-[var(--bg-primary)] py-16 sm:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/10 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-xs font-semibold text-gold-200 backdrop-blur-md">
            <Users className="h-3.5 w-3.5 text-gold-400" />
            Pantheon of Pioneers
          </div>

          <h1
            className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Scientists &amp;{' '}
            <span className="bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent">
              Visionaries
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            From the House of Wisdom to the digital age, explore the breakthroughs that changed how humanity understands and builds the world.
          </p>

          <div className="mt-7 flex flex-wrap gap-5 text-xs font-mono text-[var(--text-secondary)]">
            <span><strong className="text-gold-300">{allScientists.length}</strong> world-changing minds</span>
            <span><strong className="text-gold-300">{allScientists.filter((scientist) => scientist.group === 'Arab & Muslim Pioneers').length}</strong> Arab &amp; Muslim pioneers</span>
            <span><strong className="text-gold-300">{allScientists.filter((scientist) => scientist.group === 'Computing & Algorithms').length}</strong> computing pioneers</span>
          </div>

          {/* Legacy group filters */}
          <div className="mt-8 flex flex-wrap gap-2">
            <Link
              href="/scientists"
              className={`rounded-xl px-4 py-2 text-xs font-semibold backdrop-blur-md transition-all duration-200 ${
                !currentGroup
                  ? 'bg-gold-500 text-slate-950 shadow-[0_0_20px_rgba(255,195,0,0.3)] font-bold'
                  : 'border border-[var(--border-color)] bg-white/[0.04] text-[var(--text-secondary)] hover:border-gold-500/40 hover:bg-white/[0.08] hover:text-[var(--text-primary)]'
              }`}
            >
              All Pioneers
            </Link>
            {SCIENTIST_GROUPS.map(({ label, icon }) => {
              const isActive = currentGroup === label;
              const count = allScientists.filter((scientist) => scientist.group === label).length;
              return (
                <Link
                  key={label}
                  href={`/scientists?group=${encodeURIComponent(label)}`}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold backdrop-blur-md transition-all duration-200 ${
                    isActive
                      ? 'bg-gold-500 text-slate-950 shadow-[0_0_20px_rgba(255,195,0,0.3)] font-bold'
                      : 'border border-[var(--border-color)] bg-white/[0.04] text-[var(--text-secondary)] hover:border-gold-500/40 hover:bg-white/[0.08] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span className="mr-1.5" aria-hidden="true">{icon}</span>
                  {label} <span className="ml-1 opacity-70">{count}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scientists Grid */}
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono">
          <span>Showing {scientists.length} scientists</span>
        </div>

        {scientists.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {scientists.map((scientist) => (
              <ScientistCard key={scientist.id} scientist={scientist} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-16 text-center backdrop-blur-xl">
            <p className="text-lg text-[var(--text-secondary)]">No scientists found matching this filter.</p>
            <Link
              href="/scientists"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-gold-500 px-6 text-sm font-semibold text-white hover:bg-gold-400"
            >
              View all scientists
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
