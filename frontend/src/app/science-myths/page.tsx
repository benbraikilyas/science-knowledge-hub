import Link from 'next/link';
import { ArrowRight, SearchCheck } from 'lucide-react';
import CiteThisPage from '@/components/CiteThisPage';
import SafeImage from '@/components/SafeImage';
import StructuredData from '@/components/StructuredData';
import { getScientistDeepDive } from '@/lib/scientist-deep-dives';
import { DEMO_SCIENTISTS } from '@/lib/scientists';
import { pageTitle } from '@/lib/seo-copy';
import { EDITORIAL_TEAM, SITE_NAME, absoluteUrl } from '@/lib/site';
import type { ScientistGroup } from '@/lib/types';

// Every myth/fact pair from the scientist profiles, gathered on one page. The page is built
// from the profiles, so a correction made on a profile shows up here automatically.

const GROUPS: { label: ScientistGroup; heading: string; intro: string }[] = [
  { label: 'Physical Sciences', heading: 'Physics, chemistry and astronomy', intro: 'Falling apples, dreams of periodic tables and a cat that was never meant to be alive and dead.' },
  { label: 'Life Sciences', heading: 'Biology and medicine', intro: 'Evolution, germs, vaccines and the people who are often credited, or blamed, for them.' },
  { label: 'Computing & Algorithms', heading: 'Computing and mathematics', intro: 'Who really built the first computer, and what the pioneers of software actually did.' },
  { label: 'Arab & Muslim Pioneers', heading: 'Scientists of the Islamic Golden Age', intro: 'Inventions, flights and attributions that grew in the retelling.' },
];

const entries = DEMO_SCIENTISTS.flatMap((scientist) => {
  const deepDive = getScientistDeepDive(scientist.slug);
  return (deepDive?.myths ?? []).map((item) => ({ ...item, scientist }));
});

const TITLE = `Science Myths Debunked: ${entries.length} Myths About Famous Scientists`;
const DESCRIPTION = `Did Newton’s apple fall on his head? Did Mendeleev dream the periodic table? ${entries.length} popular myths about famous scientists, each with what the evidence actually shows.`;
const UPDATED = '2026-11-18';

export const metadata = {
  title: pageTitle(TITLE, SITE_NAME),
  description: DESCRIPTION,
  alternates: { canonical: '/science-myths' },
  openGraph: { type: 'article', url: absoluteUrl('/science-myths'), title: TITLE, description: DESCRIPTION },
};

const SECTION = 'rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-6 sm:p-8 backdrop-blur-xl';

export default function ScienceMythsPage() {
  const pageUrl = absoluteUrl('/science-myths');
  const groups = GROUPS.map((group) => ({
    ...group,
    scientists: DEMO_SCIENTISTS
      .filter((scientist) => scientist.group === group.label)
      .map((scientist) => ({ scientist, myths: entries.filter((entry) => entry.scientist.slug === scientist.slug) }))
      .filter((item) => item.myths.length > 0),
  })).filter((group) => group.scientists.length > 0);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article', '@id': `${pageUrl}#article`, headline: TITLE, description: DESCRIPTION,
        url: pageUrl, mainEntityOfPage: pageUrl, inLanguage: 'en', dateModified: UPDATED,
        author: { '@type': 'Organization', name: EDITORIAL_TEAM.displayName, url: absoluteUrl(EDITORIAL_TEAM.href) },
        publisher: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/') },
        about: groups.flatMap((group) => group.scientists.map(({ scientist }) => ({
          '@type': 'Person', name: scientist.name, url: absoluteUrl(`/scientists/${scientist.slug}`),
        }))),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Science Myths', item: pageUrl },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24 text-[var(--text-secondary)]">
      <StructuredData data={structuredData} />

      <header className="relative overflow-hidden border-b border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-card)] via-[var(--bg-secondary)] to-[var(--bg-primary)] py-14 sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/10 blur-[140px]" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-xs font-semibold text-gold-200">
            <SearchCheck className="h-3.5 w-3.5 text-gold-400" />
            Myths and facts · {entries.length} checked
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Science Myths Debunked: What Famous Scientists Really Did
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed sm:text-lg">
            Stories about famous scientists get simpler every time they are retold. An apple becomes a blow to the head, a decade of work becomes a dream, and a team becomes one genius. Below are {entries.length} of the most repeated myths about {groups.reduce((sum, group) => sum + group.scientists.length, 0)} scientists, each paired with what the historical evidence shows and a link to the full profile.
          </p>
          <p className="mt-4 text-xs">
            By the {EDITORIAL_TEAM.displayName} · Updated <time dateTime={UPDATED}>18 November 2026</time>
          </p>
          <nav aria-label="Jump to a field" className="mt-7 flex flex-wrap gap-2">
            {groups.map((group) => (
              <a key={group.label} href={`#${group.label.toLowerCase().replace(/[^a-z]+/g, '-')}`} className="rounded-xl border border-[var(--border-color)] bg-white/[0.04] px-4 py-2 text-xs font-semibold transition-colors hover:border-gold-500/40 hover:text-[var(--text-primary)]">
                {group.heading} <span className="opacity-70">{group.scientists.reduce((sum, item) => sum + item.myths.length, 0)}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-14 px-4 pt-12 sm:px-6">
        {groups.map((group) => (
          <section key={group.label} id={group.label.toLowerCase().replace(/[^a-z]+/g, '-')} aria-labelledby={`h-${group.label}`} className="scroll-mt-24">
            <h2 id={`h-${group.label}`} className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
              {group.heading}
            </h2>
            <p className="mt-2">{group.intro}</p>
            <div className="mt-6 space-y-5">
              {group.scientists.map(({ scientist, myths }) => (
                <article key={scientist.slug} className={SECTION}>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-14 w-12 shrink-0 overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)]">
                      <SafeImage
                        src={scientist.portraitImage}
                        alt={scientist.name}
                        width={96}
                        height={112}
                        className="h-full w-full object-cover object-top"
                        fallback={<div className="flex h-full w-full items-center justify-center font-bold text-[var(--text-primary)]">{scientist.name.charAt(0)}</div>}
                      />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">
                      <Link href={`/scientists/${scientist.slug}`} className="hover:text-gold-300">{scientist.name}</Link>
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {myths.map((item) => (
                      <li key={item.myth}>
                        <p className="font-semibold text-[var(--text-primary)]"><span className="text-rose-300">Myth:</span> {item.myth}</p>
                        <p className="mt-1 leading-relaxed"><span className="font-semibold text-emerald-300">Fact:</span> {item.fact}</p>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/scientists/${scientist.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 hover:text-gold-300">
                    Read the full profile of {scientist.name} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ))}

        <CiteThisPage title={TITLE} path="/science-myths" />

        <nav aria-labelledby="more" className={SECTION}>
          <h2 id="more" className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">Keep exploring</h2>
          <ul className="grid gap-2.5 text-sm sm:grid-cols-2">
            <li><Link href="/scientists/muslim-scientists" className="hover:text-gold-300">Famous Muslim scientists and their inventions</Link></li>
            <li><Link href="/scientists/women-scientists" className="hover:text-gold-300">Famous women scientists</Link></li>
            <li><Link href="/articles/why-scientific-breakthroughs-rarely-belong-to-one-person" className="hover:text-gold-300">Why breakthroughs rarely belong to one person</Link></li>
            <li><Link href="/scientists" className="hover:text-gold-300">All scientist profiles</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
