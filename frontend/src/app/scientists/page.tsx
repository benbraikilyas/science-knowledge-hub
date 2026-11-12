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
  alternates: { canonical: '/scientists' },
  title: 'Scientists Directory',
  description: 'Discover the brilliant minds who shaped our understanding of the universe.',
};

const groupId = (label: string) => label.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-');

// Every group is listed on the page in its own section; the buttons jump to a section,
// so the directory is one static page that crawlers see in full.
export default async function ScientistsPage() {
  const allScientists: ScientistListItem[] = await getScientists();
  const sections = [
    ...SCIENTIST_GROUPS.map(({ label, icon }) => ({
      label,
      icon,
      members: allScientists.filter((scientist) => scientist.group === label),
    })),
    {
      label: 'More Pioneers',
      icon: '✶',
      members: allScientists.filter((scientist) => !SCIENTIST_GROUPS.some(({ label }) => label === scientist.group)),
    },
  ].filter((section) => section.members.length > 0);

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

          {/* Group shortcuts: each jumps to its section below */}
          <nav aria-label="Scientist groups" className="mt-8 flex flex-wrap gap-2">
            {sections.map(({ label, icon, members }) => (
              <a
                key={label}
                href={`#${groupId(label)}`}
                className="rounded-xl border border-[var(--border-color)] bg-white/[0.04] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] backdrop-blur-md transition-all duration-200 hover:border-gold-500/40 hover:bg-white/[0.08] hover:text-[var(--text-primary)]"
              >
                <span className="mr-1.5" aria-hidden="true">{icon}</span>
                {label} <span className="ml-1 opacity-70">{members.length}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Scientists, one section per group */}
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        {sections.map(({ label, icon, members }) => (
          <section key={label} id={groupId(label)} aria-labelledby={`${groupId(label)}-heading`} className="mb-16 scroll-mt-24">
            <h2
              id={`${groupId(label)}-heading`}
              className="mb-6 flex items-center gap-2 text-2xl font-bold text-[var(--text-primary)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span aria-hidden="true" className="text-gold-400">{icon}</span>
              {label}
              <span className="text-sm font-normal text-[var(--text-secondary)]">({members.length})</span>
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {members.map((scientist) => (
                <ScientistCard key={scientist.id} scientist={scientist} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
