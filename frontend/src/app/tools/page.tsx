import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle2, ExternalLink, Sigma } from 'lucide-react';
import ScienceToolsLab from '@/components/ScienceToolsLab';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Interactive Science Tools',
  description: 'Use free educational calculators for light travel time, photon energy, relativistic time dilation, and escape velocity—with formulas, assumptions, and reliable sources.',
  alternates: { canonical: '/tools' },
  openGraph: {
    title: 'Interactive Science Tools | ScienceHub',
    description: 'Explore physics through transparent calculators that show their formulas, assumptions, and limitations.',
    url: absoluteUrl('/tools'),
    type: 'website',
  },
};

const FORMULAS = [
  {
    title: 'Light travel time',
    formula: 't = d / c',
    explanation: 'Travel time equals distance divided by the speed of light in vacuum. The calculator converts the chosen distance unit into metres before dividing by exactly 299,792,458 metres per second.',
  },
  {
    title: 'Photon energy',
    formula: 'E = hf = hc / λ',
    explanation: 'A photon’s energy is Planck’s constant multiplied by frequency. Because frequency equals light speed divided by wavelength, shorter-wavelength photons carry more energy.',
  },
  {
    title: 'Special-relativistic time dilation',
    formula: 'Δτ = Δt √(1 − v²/c²)',
    explanation: 'Proper time Δτ is measured by a clock moving between the two events. This simplified calculator compares it with coordinate time Δt in a frame that sees that clock move at constant speed.',
  },
  {
    title: 'Escape velocity',
    formula: 'vₑ = √(2GM / R)',
    explanation: 'The ideal escape speed depends on a body’s mass M and starting radius R. It follows from conserving mechanical energy in a spherical gravitational field.',
  },
];

export default function ToolsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ScienceHub Interactive Science Tools',
    url: absoluteUrl('/tools'),
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Any modern web browser',
    description: metadata.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Light travel time calculator',
      'Photon wavelength, frequency, and energy converter',
      'Special-relativistic time dilation calculator',
      'Planetary escape velocity calculator',
    ],
  };

  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="relative overflow-hidden border-b border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-card)] via-[var(--bg-secondary)] to-[var(--bg-primary)] pb-24 pt-16 sm:pb-28 sm:pt-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[430px] w-[760px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="pointer-events-none absolute right-16 top-16 h-72 w-72 rounded-full bg-gold-500/10 blur-[120px]" />
        <div className="relative mx-auto max-w-[1550px] 2xl:max-w-[1720px] px-4 sm:px-6 lg:px-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">
              <Sigma className="h-3.5 w-3.5" /> Interactive Science Lab
            </div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-6xl lg:text-7xl" style={{ fontFamily: 'var(--font-heading)' }}>
              Calculate it.
              <span className="block bg-gradient-to-r from-cyan-300 via-gold-300 to-gold-500 bg-clip-text text-transparent">Then understand it.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl">
              Explore physical relationships with transparent educational calculators. Every result comes with the equation, assumptions, and limitations needed to interpret it responsibly.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--text-secondary)]">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> No account</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> No tracking of inputs</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Sources included</span>
            </div>
          </div>
        </div>
      </section>

      <ScienceToolsLab />

      <section className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">Show the work</p>
            <h2 className="mt-3 text-3xl font-extrabold text-[var(--text-primary)] sm:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>What each calculator is doing</h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">A number without a model can be misleading. These tools expose the mathematical relationship instead of hiding it behind a result button.</p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {FORMULAS.map((item, index) => (
              <article key={item.title} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{item.title}</h3>
                  <span className="font-mono text-xs text-[var(--text-secondary)]">0{index + 1}</span>
                </div>
                <div className="mt-4 rounded-xl border border-gold-500/20 bg-gold-500/[0.06] px-4 py-3 font-mono text-lg font-bold text-gold-300">{item.formula}</div>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">{item.explanation}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <article className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-6 sm:p-8">
              <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">Method, precision, and limits</h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                <p>The tools use SI units internally. Exact defining constants—such as light speed, Planck’s constant, and elementary charge—are stored at their defined values. Displayed results are rounded for readability, while calculations use JavaScript double-precision numbers.</p>
                <p>The results describe idealized models. They do not simulate atmospheric drag, complex trajectories, gravitational fields from multiple bodies, acceleration phases, measurement uncertainty, or instrument calibration. Those omissions are stated next to the relevant calculator.</p>
                <p>These tools are intended for education and estimation. They should not be used for spacecraft operations, laboratory calibration, safety-critical engineering, or other professional decisions.</p>
              </div>
            </article>

            <aside className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-6 sm:p-8">
              <h2 className="text-xl font-extrabold text-[var(--text-primary)]">Primary references</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li>
                  <a href="https://physics.nist.gov/cuu/pdf/wall_2022.pdf" target="_blank" rel="noreferrer" className="group flex items-start gap-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                    <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                    <span><strong className="block text-[var(--text-primary)] group-hover:text-gold-300">NIST 2022 CODATA constants</strong>Light speed, Planck constant, elementary charge, and G.</span>
                  </a>
                </li>
                <li>
                  <a href="https://openstax.org/books/university-physics-volume-3/pages/5-3-time-dilation" target="_blank" rel="noreferrer" className="group flex items-start gap-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                    <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                    <span><strong className="block text-[var(--text-primary)] group-hover:text-gold-300">OpenStax: Time Dilation</strong>Derivation and interpretation of proper time and Lorentz factor.</span>
                  </a>
                </li>
                <li>
                  <a href="https://spacemath.gsfc.nasa.gov/engineering.html" target="_blank" rel="noreferrer" className="group flex items-start gap-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                    <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                    <span><strong className="block text-[var(--text-primary)] group-hover:text-gold-300">NASA Space Math</strong>Educational problems using gravity, escape speed, and spaceflight scales.</span>
                  </a>
                </li>
              </ul>
              <p className="mt-6 border-t border-[var(--border-color)] pt-4 text-xs text-[var(--text-secondary)]">Method reviewed September 2026. Source links are provided so readers can inspect the underlying definitions.</p>
            </aside>
          </div>

          <div className="mt-10 flex flex-col justify-between gap-5 rounded-3xl border border-indigo-400/20 bg-indigo-500/[0.06] p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-sm font-bold text-indigo-300"><BookOpen className="h-4 w-4" /> Continue reading</div>
              <h2 className="mt-2 text-xl font-extrabold text-[var(--text-primary)]">The equation is the beginning, not the end.</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">Connect these calculations to experiments, scientists, and historical source books in the guided Physics and Cosmic Explorer paths.</p>
            </div>
            <Link href="/learn#quantum-reality" className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-indigo-400/30 bg-indigo-500/10 px-5 text-sm font-bold text-indigo-200 transition-colors hover:bg-indigo-500/20">Explore Physics <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}

