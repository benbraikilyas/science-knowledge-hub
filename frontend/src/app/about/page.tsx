import Link from 'next/link';
import InfoPageShell from '@/components/InfoPageShell';

export const metadata = {
  title: 'About Us',
  description: 'Learn about the mission, scope, and people behind Science Knowledge Hub.',
};

export default function AboutPage() {
  return (
    <InfoPageShell
      eyebrow="About the Project"
      title="Science should feel understandable"
      description="Science Knowledge Hub is an independent educational project that connects landmark discoveries, the people behind them, and the ideas shaping modern science."
    >
      <div className="space-y-8 text-[var(--text-secondary)]">
        <section className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-7 sm:p-9">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Our mission</h2>
          <p className="mt-4 leading-relaxed">We build clear entry points into complex scientific subjects without pretending that a short explanation replaces formal study or the original research. The project is currently growing, and new material is published only as it becomes ready.</p>
        </section>
        <div className="grid gap-6 sm:grid-cols-2">
          <section className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-7">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">What we publish</h2>
            <p className="mt-3 leading-relaxed">Scientist profiles, historical context, explainers, and carefully sourced summaries across physics, astronomy, biology, computing, mathematics, and technology.</p>
          </section>
          <section className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-7">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">How we work</h2>
            <p className="mt-3 leading-relaxed">We distinguish established evidence from interpretation, link readers to sources, review drafts before publication, and correct material when better evidence becomes available.</p>
          </section>
        </div>
        <section className="rounded-3xl border border-gold-500/25 bg-gold-500/8 p-7">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Who is responsible?</h2>
          <p className="mt-3 leading-relaxed">Content is published by the <Link href="/authors/sciencehub-editorial-team" className="text-gold-300 hover:underline">ScienceHub Editorial Team</Link>. We do not use invented academic credentials or present fictional people as experts.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/editorial-policy" className="rounded-xl bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400">Read our editorial policy</Link>
            <Link href="/contact" className="rounded-xl border border-[var(--border-color)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)] hover:border-gold-500/40">Contact us</Link>
          </div>
        </section>
      </div>
    </InfoPageShell>
  );
}
