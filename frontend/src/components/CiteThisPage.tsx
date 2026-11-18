import { Quote } from 'lucide-react';
import { EDITORIAL_TEAM, SITE_NAME, absoluteUrl } from '@/lib/site';

// Ready-made citations for students and teachers. Biography pages are often cited in
// school work, so making the citation easy to copy is also how such pages earn links.
// No date is given: these pages are revised over time, so APA's "n.d." form applies.
export default function CiteThisPage({ title, path }: { title: string; path: string }) {
  const url = absoluteUrl(path);
  const bareUrl = url.replace(/^https?:\/\//, '');
  const author = EDITORIAL_TEAM.displayName;
  const citations = [
    { style: 'APA (7th ed.)', text: `${author}. (n.d.). ${title}. ${SITE_NAME}. ${url}` },
    { style: 'MLA (9th ed.)', text: `“${title}.” ${SITE_NAME}, ${bareUrl}.` },
    { style: 'Chicago', text: `${author}. “${title}.” ${SITE_NAME}. ${url}.` },
  ];

  return (
    <section aria-labelledby="cite-this-page" className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-6 sm:p-8 backdrop-blur-xl">
      <h2 id="cite-this-page" className="mb-2 flex items-center gap-2 text-xl font-bold text-[var(--text-primary)]">
        <Quote className="h-5 w-5 text-gold-400" />
        How to Cite This Page
      </h2>
      <p className="mb-5 text-sm text-[var(--text-secondary)]">
        Using this page for a school project or article? Copy the citation in the style you need.
      </p>
      <dl className="space-y-4">
        {citations.map(({ style, text }) => (
          <div key={style}>
            <dt className="text-xs font-semibold uppercase tracking-wider text-gold-400">{style}</dt>
            <dd className="mt-1.5 select-all break-words rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-3 font-mono text-xs leading-relaxed text-[var(--text-primary)]">
              {text}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
