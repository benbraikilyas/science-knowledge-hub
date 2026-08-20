import Link from 'next/link';
import { ArrowLeft, Award, Quote, Sparkles, BookOpen } from 'lucide-react';

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
    title: `${scientist.name} | Science Knowledge Hub`,
    description: `Discover the life and achievements of ${scientist.name}, pioneer in ${scientist.field}.`,
  };
}

export default async function ScientistDetailPage({ params }: ScientistDetailProps) {
  const { slug } = await params;
  const scientist = await getScientist(slug);

  if (!scientist) {
    return (
      <div className="min-h-screen bg-[#000814] flex items-center justify-center px-4 py-20">
        <div className="max-w-md text-center rounded-3xl border border-white/10 bg-[#001d3d]/80 p-12 backdrop-blur-xl">
          <Sparkles className="mx-auto h-12 w-12 text-slate-500" />
          <h1 className="mt-4 text-2xl font-bold text-white">Scientist Not Found</h1>
          <p className="mt-2 text-sm text-slate-400">The requested scientist profile does not exist.</p>
          <Link
            href="/scientists"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-gold-500 px-6 text-sm font-semibold text-white transition-colors hover:bg-gold-400"
          >
            Browse Scientists
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000814] pb-24 text-slate-200">
      {/* Header Banner */}
      <div className="relative border-b border-white/[0.08] bg-gradient-to-b from-[#001d3d] via-[#000d1f] to-[#000814] py-14 sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/10 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <Link
            href="/scientists"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gold-400 transition-colors hover:text-gold-300 mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Scientists</span>
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-tr from-gold-500 via-navy-600 to-gold-400 p-[2px] shadow-[0_0_40px_rgba(255,195,0,0.25)]">
              <div className="flex h-full w-full items-center justify-center rounded-[22px] bg-[#000d1f] text-5xl font-extrabold text-white">
                {scientist.name?.charAt(0) || '?'}
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-300">
                <span>{scientist.field}</span>
                <span>·</span>
                <span>{scientist.era}</span>
              </div>

              <h1
                className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {scientist.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
                <span>Nationality: <strong className="text-slate-200">{scientist.nationality}</strong></span>
                <span>·</span>
                <span>Born: <strong className="text-slate-200">{scientist.birthDate}</strong></span>
                {scientist.deathDate && (
                  <>
                    <span>·</span>
                    <span>Died: <strong className="text-slate-200">{scientist.deathDate}</strong></span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Details */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Biography & Key Contributions */}
          <div className="lg:col-span-8 space-y-10">
            {scientist.biography && (
              <div className="rounded-3xl border border-white/[0.08] bg-[#001d3d]/60 p-8 backdrop-blur-xl">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-gold-400" />
                  Biography &amp; Life
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-300">
                  {scientist.biography
                    .split('\n')
                    .filter((p: string) => p.trim())
                    .map((paragraph: string, i: number) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                </div>
              </div>
            )}

            {scientist.keyContributions?.length > 0 && (
              <div className="rounded-3xl border border-white/[0.08] bg-[#001d3d]/60 p-8 backdrop-blur-xl">
                <h2 className="text-xl font-bold text-white mb-6">Key Contributions to Science</h2>
                <div className="space-y-4">
                  {scientist.keyContributions.map((contribution: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-gold-500/30 hover:bg-gold-500/8"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gold-500/20 text-xs font-bold text-gold-300">
                        {i + 1}
                      </div>
                      <p className="text-sm leading-relaxed text-slate-300">{contribution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {scientist.famousQuotes?.length > 0 && (
              <div className="rounded-3xl border border-white/[0.08] bg-[#001d3d]/60 p-8 backdrop-blur-xl">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Quote className="h-5 w-5 text-gold-300" />
                  Famous Quotes
                </h2>
                <div className="space-y-4">
                  {scientist.famousQuotes.map((quote: string, i: number) => (
                    <blockquote
                      key={i}
                      className="rounded-2xl border-l-4 border-gold-400 bg-gold-500/10 p-5 italic text-slate-200"
                    >
                      &ldquo;{quote}&rdquo;
                    </blockquote>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Awards & Fast Facts */}
          <div className="lg:col-span-4 space-y-6">
            {scientist.awards?.length > 0 && (
              <div className="rounded-3xl border border-white/[0.08] bg-[#001d3d]/60 p-6 backdrop-blur-xl">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2 mb-4">
                  <Award className="h-4 w-4 text-gold-400" />
                  Awards &amp; Honors
                </h3>
                <ul className="space-y-3 text-xs">
                  {scientist.awards.map((award: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-slate-300"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
