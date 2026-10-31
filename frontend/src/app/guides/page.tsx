import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import InfoPageShell from '@/components/InfoPageShell';
import StructuredData from '@/components/StructuredData';
import { GUIDES, getGuide } from '@/lib/guides';
import { absoluteUrl } from '@/lib/site';

const DESCRIPTION =
  'Editor’s picks of the best science articles, AI explainers and free science books, plus space, quantum physics and biology. Each guide answers first.';

export const metadata: Metadata = {
  title: { absolute: 'Science Reading Guides: Best Articles and Free Books' },
  description: DESCRIPTION,
  alternates: { canonical: '/guides' },
};

export default function GuidesPage() {
  const guides = GUIDES.map((guide) => getGuide(guide.slug)!);
  const pageUrl = absoluteUrl('/guides');

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': pageUrl,
    url: pageUrl,
    name: 'Science Reading Guides',
    description: DESCRIPTION,
    inLanguage: 'en',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: guides.length,
      itemListElement: guides.map((guide, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: guide.title,
        url: absoluteUrl(`/guides/${guide.slug}`),
      })),
    },
  };

  return (
    <InfoPageShell
      eyebrow="Reading guides"
      title="Science Reading Guides"
      description="Not sure what to read? Each guide answers one question, such as which science articles or free science books are best, and then lists our picks with a reason for every one."
    >
      <StructuredData data={structuredData} />
      <ul className="grid gap-5 sm:grid-cols-2">
        {guides.map((guide) => {
          const pickCount = guide.sections.reduce((total, section) => total + section.picks.length, 0);
          return (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/35"
              >
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent-readable)]">{guide.question}</p>
                <h2 className="mt-2 text-xl font-bold text-[var(--text-primary)]">{guide.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">{guide.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 group-hover:text-gold-300">
                  See all {pickCount} picks <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </InfoPageShell>
  );
}
