import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchScientist } from '@/lib/api';
import SafeImage from '@/components/SafeImage';
import { DEMO_SCIENTISTS } from '@/lib/scientists';
import { ArrowLeft, Award, Quote, BookOpen, ExternalLink, Lightbulb } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import { imageObject, openGraphImage } from '@/lib/image-seo';
import StructuredData from '@/components/StructuredData';

interface ScientistDetailProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return DEMO_SCIENTISTS.map((scientist) => ({ slug: scientist.slug }));
}

async function getScientist(slug: string) {
  const demoProfile = DEMO_SCIENTISTS.find((scientist) => scientist.slug === slug) || null;

  // Curated profiles are complete local records, so they should never depend on
  // the API being online in order to render.
  if (demoProfile) return demoProfile;

  try {
    const remoteProfile = await fetchScientist(slug);
    return remoteProfile && typeof remoteProfile === 'object' ? remoteProfile : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: ScientistDetailProps) {
  const { slug } = await params;
  const scientist = (await getScientist(slug)) as Record<string, unknown> | null;
  if (!scientist) notFound();
  const description = `Discover the life and achievements of ${scientist.name}, pioneer in ${scientist.field}.`;
  const image = typeof scientist.portraitImage === 'string' && scientist.portraitImage
    ? openGraphImage(scientist.portraitImage, scientist.name as string)
    : undefined;
  return {
    title: scientist.name as string,
    description,
    alternates: { canonical: `/scientists/${slug}` },
    openGraph: {
      type: 'profile',
      url: absoluteUrl(`/scientists/${slug}`),
      title: scientist.name as string,
      description,
      images: image ? [image] : [],
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: scientist.name as string,
      description,
      images: image ? [{ url: image.url, alt: image.alt }] : [],
    },
  };
}

export default async function ScientistDetailPage({ params }: ScientistDetailProps) {
  const { slug } = await params;
  const scientist = (await getScientist(slug)) as Record<string, unknown> | null;

  if (!scientist) notFound();

  const name = scientist.name as string;
  const field = scientist.field as string;
  const era = scientist.era as string;
  const nationality = scientist.nationality as string;
  const birthDate = scientist.birthDate as string;
  const deathDate = scientist.deathDate as string | undefined;
  const portraitImage = (scientist.portraitImage as string) || '';
  const group = scientist.group as string | undefined;
  const breakthrough = scientist.breakthrough as string | undefined;
  const sourceUrl = scientist.sourceUrl as string | undefined;
  const biography = scientist.biography as string | undefined;
  const keyContributions = (scientist.keyContributions as string[]) || [];
  const famousQuotes = (scientist.famousQuotes as string[]) || [];
  const awards = (scientist.awards as string[]) || [];
  const pageUrl = absoluteUrl(`/scientists/${slug}`);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage', '@id': pageUrl, url: pageUrl, name, inLanguage: 'en',
    ...(portraitImage ? { primaryImageOfPage: imageObject(portraitImage, name) } : {}),
    mainEntity: {
      '@type': 'Person', '@id': `${pageUrl}#person`, name,
      description: breakthrough || `Pioneer in ${field}.`,
      knowsAbout: field,
      ...(sourceUrl ? { sameAs: [sourceUrl] } : {}),
      ...(portraitImage ? { image: imageObject(portraitImage, name) } : {}),
    },
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24 text-[var(--text-secondary)]">
      <StructuredData data={structuredData} />
      {/* Header Banner */}
      <div className="relative overflow-hidden border-b border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-card)] via-[var(--bg-secondary)] to-[var(--bg-primary)] py-14 sm:py-20">
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
            <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-tr from-gold-500 via-navy-600 to-gold-400 p-[2px] shadow-[0_0_40px_rgba(255,195,0,0.25)]">
              <SafeImage
                src={portraitImage}
                alt={name}
                width={224}
                height={224}
                className="h-full w-full rounded-[22px] object-cover object-top"
                fallback={
                  <div className="flex h-full w-full items-center justify-center rounded-[22px] bg-[var(--bg-secondary)] text-5xl font-extrabold text-[var(--text-primary)]">
                    {name?.charAt(0) || '?'}
                  </div>
                }
              />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-300">
                <span>{field}</span>
                <span>·</span>
                <span>{era}</span>
              </div>

              <h1
                className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[var(--text-secondary)] font-mono">
                <span>Nationality: <strong className="text-[var(--text-primary)]">{nationality}</strong></span>
                <span>·</span>
                <span>Born: <strong className="text-[var(--text-primary)]">{birthDate}</strong></span>
                {deathDate && (
                  <>
                    <span>·</span>
                    <span>Died: <strong className="text-[var(--text-primary)]">{deathDate}</strong></span>
                  </>
                )}
              </div>

              {group && (
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-gold-300/80">
                  {group}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Details */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Biography & Key Contributions */}
          <div className="lg:col-span-8 space-y-10">
            {breakthrough && (
              <div className="rounded-3xl border border-gold-500/30 bg-gradient-to-br from-gold-500/12 to-transparent p-7 backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gold-500/20 text-gold-300">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">Why this changed the world</p>
                    <p className="mt-2 text-lg font-semibold leading-relaxed text-[var(--text-primary)]">{breakthrough}</p>
                  </div>
                </div>
              </div>
            )}

            {biography && (
              <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-8 backdrop-blur-xl">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-gold-400" />
                  Biography &amp; Life
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-[var(--text-secondary)]">
                  {biography
                    .split('\n')
                    .filter((p: string) => p.trim())
                    .map((paragraph: string, i: number) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                </div>
              </div>
            )}

            {keyContributions.length > 0 && (
              <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-8 backdrop-blur-xl">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Key Contributions to Science</h2>
                <div className="space-y-4">
                  {keyContributions.map((contribution: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 rounded-2xl border border-[var(--border-color)] bg-white/[0.02] p-4 transition-colors hover:border-gold-500/30 hover:bg-gold-500/8"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gold-500/20 text-xs font-bold text-gold-300">
                        {i + 1}
                      </div>
                      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{contribution}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {famousQuotes.length > 0 && (
              <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-8 backdrop-blur-xl">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                  <Quote className="h-5 w-5 text-gold-300" />
                  Famous Quotes
                </h2>
                <div className="space-y-4">
                  {famousQuotes.map((quote: string, i: number) => (
                    <blockquote
                      key={i}
                      className="rounded-2xl border-l-4 border-gold-400 bg-gold-500/10 p-5 italic text-[var(--text-primary)]"
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
            {awards.length > 0 && (
              <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-6 backdrop-blur-xl">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2 mb-4">
                  <Award className="h-4 w-4 text-gold-400" />
                  Awards &amp; Honors
                </h3>
                <ul className="space-y-3 text-xs">
                  {awards.map((award: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 rounded-xl border border-[var(--border-color)] bg-white/[0.02] p-3 text-[var(--text-secondary)]"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-gold-500/40 hover:text-gold-300"
              >
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-[var(--text-secondary)]">Reference</span>
                  Read the source profile
                </span>
                <ExternalLink className="h-4 w-4 text-gold-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}

            <Link
              href="/sources#image-credits"
              className="group flex items-center justify-between rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-gold-500/40 hover:text-gold-300"
            >
              <span>
                <span className="block text-[10px] uppercase tracking-[0.16em] text-[var(--text-secondary)]">Transparency</span>
                Portrait source &amp; license
              </span>
              <ExternalLink className="h-4 w-4 text-gold-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
