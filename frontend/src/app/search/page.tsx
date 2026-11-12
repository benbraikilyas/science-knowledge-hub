import { Suspense } from 'react';
import SearchExperience, { SearchView } from '@/components/SearchExperience';
import { DEMO_ARTICLES } from '@/lib/constants';
import { DEMO_SCIENTISTS } from '@/lib/scientists';
import { toArticleListItem } from '@/lib/article-list';
import type { ArticleListItem, ScientistListItem } from '@/lib/types';
import { Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Search',
  description: 'Search science articles, free science books, scientists and topics on Science Knowledge Hub.',
  robots: { index: false, follow: true },
};

// Card fields only (no article bodies or full biographies), so the page stays light.
const articles = (DEMO_ARTICLES as ArticleListItem[]).map(toArticleListItem);
const scientists: ScientistListItem[] = DEMO_SCIENTISTS.map(
  ({ id, name, slug, portraitImage, birthDate, deathDate, nationality, era, field, group, breakthrough, isFeatured }) => ({
    id, name, slug, portraitImage, birthDate, deathDate, nationality, era, field, group, breakthrough, isFeatured,
  })
);

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24 text-[var(--text-secondary)]">
      <div className="relative overflow-hidden border-b border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-card)] via-[var(--bg-secondary)] to-[var(--bg-primary)] py-16 sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/10 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-xs font-semibold text-gold-200 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-gold-400" />
            Cosmic Knowledge Search
          </div>

          <h1
            className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Search the{' '}
            <span className="bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent">
              Universe
            </span>
          </h1>
        </div>
      </div>

      <Suspense fallback={<SearchView articles={[]} scientists={[]} query="" />}>
        <SearchExperience articles={articles} scientists={scientists} />
      </Suspense>
    </div>
  );
}
