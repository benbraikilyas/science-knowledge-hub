import InfoPageShell from '@/components/InfoPageShell';
import catalog from '@/lib/image-metadata.json';

export const metadata = {
  alternates: { canonical: '/sources' },
  title: 'Sources & Image Credits',
  description: 'Source standards, corrections information, and visible image credits for Science Knowledge Hub.',
};

type CatalogEntry = { title: string; creditText?: string; source?: string };
type Credit = readonly [title: string, credit: string, url?: string];

function creditsFor(prefix: string): Credit[] {
  return Object.entries(catalog as Record<string, CatalogEntry>)
    .filter(([src]) => src.startsWith(prefix))
    .map(([, entry]) => [entry.title, entry.creditText ?? '', entry.source]);
}

const SCIENTIST_CREDITS = creditsFor('/images/scientists/');
const ARTICLE_CREDITS = creditsFor('/images/articles/');
const CATEGORY_CREDITS = creditsFor('/images/categories/');
const BOOK_CREDITS = creditsFor('/images/books/');

function CreditList({ entries }: { entries: ReadonlyArray<Credit> }) {
  const card = 'rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/50 p-4';
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {entries.map(([title, credit, url], index) => {
        const body = (
          <>
            <span className="block font-semibold text-[var(--text-primary)]">{title}</span>
            <span className="mt-1 block text-xs leading-relaxed text-[var(--text-secondary)]">{credit}</span>
            {url && <span className="mt-2 block text-xs font-semibold text-gold-300">Open source record &rarr;</span>}
          </>
        );
        return url ? (
          <a key={`${title}-${index}`} href={url} target="_blank" rel="noreferrer" className={`${card} transition-colors hover:border-gold-500/40`}>{body}</a>
        ) : (
          <div key={`${title}-${index}`} className={card}>{body}</div>
        );
      })}
    </div>
  );
}

function CreditGroup({ summary, entries }: { summary: string; entries: ReadonlyArray<Credit> }) {
  return (
    <details className="mt-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/30 p-5">
      <summary className="cursor-pointer font-semibold text-[var(--text-primary)]">{summary} ({entries.length})</summary>
      <CreditList entries={entries} />
    </details>
  );
}

export default function SourcesPage() {
  return (
    <InfoPageShell
      eyebrow="Transparency"
      title="Sources & Image Credits"
      description="Where our information and visual material come from, and how to report a missing or incorrect credit."
      updated="October 2026"
    >
      <div className="space-y-12 text-[var(--text-secondary)]">
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Information sources</h2>
          <p className="mt-3 leading-relaxed">Individual scientist profiles link to a named reference profile. Articles list their references when published. Our preferred sources include peer-reviewed journals, official scientific agencies, universities, museums, professional societies, and primary historical documents.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">How editorial content is prepared</h2>
          <p className="mt-3 leading-relaxed">Research tools help collect and organize material from multiple named sources. Drafts are written as original explanations rather than copied summaries, checked for source coverage and unsupported claims, and kept out of the production database until an editor approves them. Automation supports the research process; it does not replace source verification or editorial responsibility.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Free book editions</h2>
          <p className="mt-3 leading-relaxed">Book records link to the official Project Gutenberg or Internet Archive catalog page used for access. Project Gutenberg identifies its editions as public domain in the United States and advises readers elsewhere to check local law. ScienceHub provides original introductions and links to the archive; it does not sell or repackage the book files.</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a href="https://www.gutenberg.org/" target="_blank" rel="noreferrer" className="font-semibold text-gold-300 hover:text-gold-200">Project Gutenberg &rarr;</a>
            <a href="https://archive.org/" target="_blank" rel="noreferrer" className="font-semibold text-gold-300 hover:text-gold-200">Internet Archive &rarr;</a>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Interactive tool methodology</h2>
          <p className="mt-3 leading-relaxed">Science Tools Lab calculations run from visible equations and SI constants. Exact constants and the gravitational constant follow the NIST 2022 CODATA publication; relativity definitions are cross-checked against OpenStax University Physics; the escape-speed model is compared with NASA educational material. Every tool states the assumptions it omits and is intended for education, not safety-critical or professional calculations.</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a href="https://physics.nist.gov/cuu/pdf/wall_2022.pdf" target="_blank" rel="noreferrer" className="font-semibold text-gold-300 hover:text-gold-200">NIST CODATA &rarr;</a>
            <a href="https://openstax.org/books/university-physics-volume-3/pages/5-3-time-dilation" target="_blank" rel="noreferrer" className="font-semibold text-gold-300 hover:text-gold-200">OpenStax Relativity &rarr;</a>
            <a href="https://spacemath.gsfc.nasa.gov/engineering.html" target="_blank" rel="noreferrer" className="font-semibold text-gold-300 hover:text-gold-200">NASA Space Math &rarr;</a>
          </div>
        </section>
        <section id="image-credits" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Scientist image credits</h2>
          <p className="mt-3 text-sm leading-relaxed">The linked file page is the authoritative record for the author, license, and any attribution or share-alike conditions.</p>
          <CreditList entries={SCIENTIST_CREDITS} />
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Article image credits</h2>
          <p className="mt-3 text-sm leading-relaxed">Every article uses its own photograph, diagram or illustration published in the public domain or under an open license, mostly from Wikimedia Commons, NASA, NOAA, NIH and NIST. Where a picture is a stand-in for a company product or event that has no open image, its description says what it actually shows. The linked file page is the authoritative record for the author and license.</p>
          <CreditGroup summary="Show all article image credits" entries={ARTICLE_CREDITS} />
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Category and book images</h2>
          <p className="mt-3 text-sm leading-relaxed">Most category cover photographs come from Unsplash contributors and are used under the Unsplash License. The Physics and Quantum Physics covers are from Wikimedia Commons. Book covers are scans of public-domain editions digitised by the Internet Archive, covers supplied by Project Gutenberg, or typographic covers designed for this site.</p>
          <CreditGroup summary="Show category image credits" entries={CATEGORY_CREDITS} />
          <CreditGroup summary="Show book cover credits" entries={BOOK_CREDITS} />
        </section>
        <section className="rounded-2xl border border-gold-500/25 bg-gold-500/8 p-6">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Is a credit incomplete?</h2>
          <p className="mt-3 leading-relaxed">Please send the page URL and the corrected creator, source, or license information through our contact form. We will review and update confirmed notices.</p>
          <a href="/contact" className="mt-5 inline-flex rounded-xl bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400">Report a credit issue</a>
        </section>
      </div>
    </InfoPageShell>
  );
}
