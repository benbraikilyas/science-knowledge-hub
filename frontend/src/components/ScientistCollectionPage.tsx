import Link from 'next/link';
import { ArrowLeft, ArrowRight, CircleHelp, Lightbulb, Users } from 'lucide-react';
import SafeImage from '@/components/SafeImage';
import StructuredData from '@/components/StructuredData';
import { DEMO_SCIENTISTS } from '@/lib/scientists';
import { getScientistDeepDive } from '@/lib/scientist-deep-dives';
import type { ScientistCollection } from '@/lib/scientist-collections';
import { absoluteUrl, SITE_NAME } from '@/lib/site';
import { imageObject } from '@/lib/image-seo';

const SECTION = 'rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-6 sm:p-8 backdrop-blur-xl';

// "c. 780" stays as written; ISO dates show the year only.
const year = (value?: string) => (value ? value.replace(/^(\d{3,4})-\d{2}-\d{2}$/, '$1') : '');
const lifespan = (birth: string, death?: string) => (death ? `${year(birth)}–${year(death)}` : `born ${year(birth)}`);

function member(slug: string) {
  const profile = DEMO_SCIENTISTS.find((scientist) => scientist.slug === slug);
  // A hub that names a missing profile should fail the build, not ship a dead link.
  if (!profile) throw new Error(`Scientist collection links to unknown profile "${slug}"`);
  return { ...profile, summary: getScientistDeepDive(slug)?.summary ?? profile.breakthrough ?? '' };
}

export default function ScientistCollectionPage({ collection }: { collection: ScientistCollection }) {
  const pageUrl = absoluteUrl(`/scientists/${collection.slug}`);
  const sections = collection.sections.map((section) => ({ ...section, members: section.slugs.map(member) }));
  const everyone = sections.flatMap((section) => section.members);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage', '@id': pageUrl, url: pageUrl, name: collection.title,
        description: collection.description, inLanguage: 'en', dateModified: collection.updatedAt,
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: absoluteUrl('/') },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: everyone.length,
          itemListElement: everyone.map((scientist, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: absoluteUrl(`/scientists/${scientist.slug}`),
            item: {
              '@type': 'Person',
              name: scientist.name,
              description: scientist.breakthrough,
              url: absoluteUrl(`/scientists/${scientist.slug}`),
              ...(scientist.portraitImage ? { image: imageObject(scientist.portraitImage, scientist.name) } : {}),
            },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: collection.faqs.map((faq) => ({
          '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Scientists', item: absoluteUrl('/scientists') },
          { '@type': 'ListItem', position: 3, name: collection.title, item: pageUrl },
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
          <Link href="/scientists" className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-gold-400 transition-colors hover:text-gold-300">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Scientists</span>
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-xs font-semibold text-gold-200">
            <Users className="h-3.5 w-3.5 text-gold-400" />
            {collection.eyebrow} · {everyone.length} profiles
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
            {collection.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed sm:text-lg">{collection.answer}</p>
          <p className="mt-4 text-xs text-[var(--text-secondary)]">
            By the ScienceHub editorial team · Updated{' '}
            <time dateTime={collection.updatedAt}>
              {new Date(`${collection.updatedAt}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}
            </time>
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-10 px-4 pt-12 sm:px-6">
        <section aria-labelledby="at-a-glance" className={SECTION}>
          <h2 id="at-a-glance" className="mb-5 text-xl font-bold text-[var(--text-primary)]">{collection.tableHeading}</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-color)] text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                  <th scope="col" className="py-2 pr-4 font-semibold">Scientist</th>
                  <th scope="col" className="py-2 pr-4 font-semibold">Lived</th>
                  <th scope="col" className="py-2 pr-4 font-semibold">Field</th>
                  <th scope="col" className="py-2 font-semibold">Best known for</th>
                </tr>
              </thead>
              <tbody>
                {everyone.map((scientist) => (
                  <tr key={scientist.slug} className="border-b border-[var(--border-color)]/60 align-top">
                    <th scope="row" className="py-3 pr-4 font-semibold text-[var(--text-primary)]">
                      <Link href={`/scientists/${scientist.slug}`} className="hover:text-gold-300">{scientist.name}</Link>
                    </th>
                    <td className="whitespace-nowrap py-3 pr-4">{lifespan(scientist.birthDate, scientist.deathDate)}</td>
                    <td className="py-3 pr-4">{scientist.field}</td>
                    <td className="py-3">{scientist.breakthrough}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {sections.map((section) => (
          <section key={section.heading} aria-labelledby={`s-${section.slugs[0]}`}>
            <h2 id={`s-${section.slugs[0]}`} className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
              {section.heading}
            </h2>
            <p className="mt-2 max-w-3xl">{section.intro}</p>
            <div className="mt-6 space-y-5">
              {section.members.map((scientist) => (
                <article key={scientist.slug} className={`${SECTION} flex flex-col gap-5 sm:flex-row`}>
                  <div className="h-28 w-24 shrink-0 overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]">
                    <SafeImage
                      src={scientist.portraitImage}
                      alt={scientist.name}
                      width={192}
                      height={224}
                      className="h-full w-full object-cover object-top"
                      fallback={<div className="flex h-full w-full items-center justify-center text-3xl font-bold text-[var(--text-primary)]">{scientist.name.charAt(0)}</div>}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">
                      <Link href={`/scientists/${scientist.slug}`} className="hover:text-gold-300">{scientist.name}</Link>
                      <span className="ml-2 text-sm font-normal text-[var(--text-secondary)]">({lifespan(scientist.birthDate, scientist.deathDate)})</span>
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold-400">{scientist.field} · {scientist.nationality}</p>
                    <p className="mt-3 leading-relaxed">{scientist.summary}</p>
                    {scientist.keyContributions.length > 0 && (
                      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                        {scientist.keyContributions.slice(0, 2).map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    )}
                    <Link href={`/scientists/${scientist.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 hover:text-gold-300">
                      Full profile of {scientist.name} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        <section aria-labelledby="context" className={SECTION}>
          <h2 id="context" className="mb-4 text-xl font-bold text-[var(--text-primary)]">{collection.context.heading}</h2>
          <div className="space-y-4 leading-relaxed">
            {collection.context.paragraphs.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
          </div>
        </section>

        <section aria-labelledby="myths" className={SECTION}>
          <h2 id="myths" className="mb-4 flex items-center gap-2 text-xl font-bold text-[var(--text-primary)]">
            <Lightbulb className="h-5 w-5 text-gold-400" /> Common myths
          </h2>
          <ul className="space-y-4">
            {collection.myths.map((item) => (
              <li key={item.myth}>
                <p className="font-semibold text-[var(--text-primary)]"><span className="text-rose-300">Myth:</span> {item.myth}</p>
                <p className="mt-1"><span className="font-semibold text-emerald-300">Fact:</span> {item.fact}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="faq" className={SECTION}>
          <h2 id="faq" className="mb-4 flex items-center gap-2 text-xl font-bold text-[var(--text-primary)]">
            <CircleHelp className="h-5 w-5 text-gold-400" /> Frequently asked questions
          </h2>
          <div className="space-y-5">
            {collection.faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-[var(--text-primary)]">{faq.question}</h3>
                <p className="mt-1 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <nav aria-labelledby="related" className={SECTION}>
          <h2 id="related" className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">Keep exploring</h2>
          <ul className="grid gap-2.5 text-sm sm:grid-cols-2">
            {collection.related.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gold-300">{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
