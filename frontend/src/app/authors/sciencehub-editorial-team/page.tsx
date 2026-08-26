import Link from 'next/link';
import InfoPageShell from '@/components/InfoPageShell';

export const metadata = {
  title: 'ScienceHub Editorial Team',
  description: 'About the editorial team responsible for content on Science Knowledge Hub.',
};

export default function EditorialTeamPage() {
  return (
    <InfoPageShell
      eyebrow="Author Profile"
      title="ScienceHub Editorial Team"
      description="The shared byline for material researched, written, reviewed, or maintained by the Science Knowledge Hub project."
    >
      <div className="space-y-6 text-[var(--text-secondary)]">
        <section className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-8">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Editorial responsibility</h2>
          <p className="mt-4 leading-relaxed">This byline is used instead of fictional expert identities. It does not claim a doctorate, university affiliation, or professional license. When a named specialist contributes or reviews material in the future, that person&apos;s real role and relevant credentials will be disclosed transparently.</p>
        </section>
        <section className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-8">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Standards</h2>
          <ul className="mt-4 space-y-3 leading-relaxed">
            <li>• Prefer primary research, scientific institutions, and reputable reference works.</li>
            <li>• Separate established findings from open questions and interpretation.</li>
            <li>• Review dates, names, quotations, and technical claims before publication.</li>
            <li>• Correct material openly when a substantive error is confirmed.</li>
          </ul>
        </section>
        <div className="flex flex-wrap gap-3">
          <Link href="/editorial-policy" className="rounded-xl bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400">Editorial policy</Link>
          <Link href="/contact" className="rounded-xl border border-[var(--border-color)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] hover:border-gold-500/40">Request a correction</Link>
        </div>
      </div>
    </InfoPageShell>
  );
}
