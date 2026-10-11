import Link from 'next/link';
import InfoPageShell from '@/components/InfoPageShell';

export const metadata = {
  title: 'Editorial Policy',
  description: 'How Science Knowledge Hub researches, reviews, publishes, and corrects educational content.',
};

export default function EditorialPolicyPage() {
  return (
    <InfoPageShell
      eyebrow="Our Standards"
      title="Editorial Policy"
      description="The standards we use to make scientific material accurate, useful, transparent, and open to correction."
      updated="September 2026"
    >
      <div className="space-y-9 text-[var(--text-secondary)]">
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Purpose and scope</h2>
          <p className="mt-3 leading-relaxed">Science Knowledge Hub publishes educational explanations and historical profiles for general audiences. Our material is not a substitute for original research, formal education, professional medical advice, or engineering and safety guidance.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Source hierarchy</h2>
          <p className="mt-3 leading-relaxed">We prefer peer-reviewed papers, official scientific agencies, universities, museums, professional societies, and primary historical records. High-quality reference works may be used for orientation, but important claims should be checked against a stronger source whenever one is available.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Review before publication</h2>
          <ul className="mt-3 space-y-3 leading-relaxed">
            <li>• Confirm names, dates, quotations, units, and mathematical notation.</li>
            <li>• Distinguish consensus findings, emerging research, hypotheses, and opinion.</li>
            <li>• Add a clear byline, publication date, update date, and source links where relevant.</li>
            <li>• Date news explainers to the primary announcement or research publication they cover.</li>
            <li>• Check that images are reusable and that required attribution is visible.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Automation and AI-assisted work</h2>
          <p className="mt-3 leading-relaxed">Automated tools may assist with outlining, language cleanup, search, or formatting. They are not treated as an authority. Material must be checked by a human against reliable sources before publication, and automation must not be used to mass-publish pages that add no original educational value.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Corrections and updates</h2>
          <p className="mt-3 leading-relaxed">Confirmed factual errors are corrected as soon as practical. Material changes should update the page&apos;s review date and, when useful to readers, include a correction note. Minor spelling or formatting fixes may be made without a public note.</p>
        </section>
        <section className="rounded-2xl border border-gold-500/25 bg-gold-500/8 p-6">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Report a problem</h2>
          <p className="mt-3 leading-relaxed">Include the page URL, the statement you believe is incorrect, and a reliable supporting source. We also welcome notices about missing image attribution or broken source links.</p>
          <Link href="/contact" className="mt-5 inline-flex rounded-xl bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400">Submit a correction</Link>
        </section>
      </div>
    </InfoPageShell>
  );
}
