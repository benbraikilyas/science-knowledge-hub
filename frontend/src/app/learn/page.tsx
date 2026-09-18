import type { Metadata } from 'next';
import LearningPathExplorer from '@/components/LearningPathExplorer';
import { LEARNING_PATHS } from '@/lib/learning-paths';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Science Learning Paths',
  description: 'Build a guided science curriculum from original explainers, scientist biographies, and free public-domain books. Choose a quick start or a complete deep dive.',
  alternates: { canonical: '/learn' },
  openGraph: {
    title: 'Science Learning Paths | ScienceHub',
    description: 'Six guided journeys through space, quantum physics, biology, computing, scientific thinking, and the Islamic Golden Age.',
    url: absoluteUrl('/learn'),
    type: 'website',
  },
};

export default function LearnPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'ScienceHub Learning Paths',
    description: metadata.description,
    numberOfItems: LEARNING_PATHS.length,
    itemListElement: LEARNING_PATHS.map((path, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: path.title,
      description: path.description,
      url: `${absoluteUrl('/learn')}#${path.id}`,
    })),
  };

  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="relative overflow-hidden border-b border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-card)] via-[var(--bg-secondary)] to-[var(--bg-primary)] pb-24 pt-16 sm:pb-28 sm:pt-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[150px]" />
        <div className="pointer-events-none absolute right-10 top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="relative mx-auto max-w-[1550px] 2xl:max-w-[1720px] px-4 sm:px-6 lg:px-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-readable)]">
              Guided discovery
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-6xl lg:text-7xl" style={{ fontFamily: 'var(--font-heading)' }}>
              Don&apos;t just browse science.
              <span className="block bg-gradient-to-r from-gold-400 via-gold-300 to-cyan-300 bg-clip-text text-transparent">Build understanding.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl">
              Choose a question worth following. Each path connects clear explainers, the people behind the discoveries, and legal free books in a deliberate learning sequence.
            </p>
          </div>
        </div>
      </section>

      <LearningPathExplorer />
    </main>
  );
}

