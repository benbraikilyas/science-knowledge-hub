import Link from 'next/link';

interface ScientistDetailProps {
  params: Promise<{ slug: string }>;
}

async function getScientist(slug: string) {
  try {
    const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
    const res = await fetch(`${api}/scientists/${slug}/`, { next: { revalidate: 60 } });
    return await res.json();
  } catch {
    const { DEMO_SCIENTISTS } = await import('@/lib/constants');
    return DEMO_SCIENTISTS.find((s: { slug: string }) => s.slug === slug) || null;
  }
}

export async function generateMetadata({ params }: ScientistDetailProps) {
  const { slug } = await params;
  const scientist = await getScientist(slug);
  if (!scientist) return { title: 'Scientist Not Found' };
  return {
    title: `${scientist.name} - Scientist Profile`,
    description: `Learn about ${scientist.name}, the ${scientist.nationality} ${scientist.field} scientist.`,
    openGraph: {
      title: scientist.name,
      description: scientist.biography?.substring(0, 200) || `${scientist.name} - ${scientist.field}`,
    },
  };
}

export default async function ScientistDetailPage({ params }: ScientistDetailProps) {
  const { slug } = await params;
  const scientist = await getScientist(slug);

  if (!scientist) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Scientist Not Found</h1>
        <p className="mt-2 text-[var(--text-secondary)]">The scientist you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/scientists" className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--accent-primary)] px-6 text-sm font-medium text-white">
          Browse Scientists
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
        <div className="text-center lg:text-left">
          <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-[var(--gradient-nebula)] text-6xl font-bold text-white shadow-xl lg:mx-0">
            {scientist.name?.charAt(0) || '?'}
          </div>

          <h1 className="mt-6 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
            {scientist.name}
          </h1>

          <div className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
            <p><span className="font-medium text-[var(--text-primary)]">Field:</span> {scientist.field}</p>
            <p><span className="font-medium text-[var(--text-primary)]">Nationality:</span> {scientist.nationality}</p>
            <p><span className="font-medium text-[var(--text-primary)]">Born:</span> {scientist.birthDate}</p>
            {scientist.deathDate && (
              <p><span className="font-medium text-[var(--text-primary)]">Died:</span> {scientist.deathDate}</p>
            )}
            <p><span className="font-medium text-[var(--text-primary)]">Era:</span> {scientist.era}</p>
          </div>

          {scientist.awards?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Awards & Honors</h3>
              <ul className="mt-2 space-y-1">
                {scientist.awards.map((award: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[var(--accent-highlight)]" />
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          {scientist.biography && (
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Biography</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-[var(--text-secondary)]">
                {scientist.biography.split('\n').filter((p: string) => p.trim()).map((paragraph: string, i: number) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}

          {scientist.keyContributions?.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Key Contributions</h2>
              <ul className="mt-4 space-y-3">
                {scientist.keyContributions.map((contribution: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent-primary)]/20 text-xs font-bold text-[var(--accent-primary)]">
                      {i + 1}
                    </span>
                    <span className="text-sm text-[var(--text-secondary)]">{contribution}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {scientist.famousQuotes?.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Famous Quotes</h2>
              <div className="mt-4 space-y-4">
                {scientist.famousQuotes.map((quote: string, i: number) => (
                  <blockquote key={i} className="rounded-xl border-l-4 border-[var(--accent-primary)] bg-[var(--bg-card)] px-4 py-3 italic text-[var(--text-secondary)]">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10">
            <Link
              href="/scientists"
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-primary)] transition-colors hover:underline"
            >
              &larr; Back to Scientists
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
