import Link from 'next/link';
import { ArrowRight, Atom, Clock3, Gauge, Orbit, Sigma } from 'lucide-react';

const TOOLS = [
  { icon: Clock3, title: 'Light travel time', description: 'Turn cosmic distance into communication delay.', color: '#38bdf8' },
  { icon: Atom, title: 'Photon energy', description: 'Connect wavelength, frequency, joules, and electronvolts.', color: '#a78bfa' },
  { icon: Gauge, title: 'Time dilation', description: 'Explore how proper time changes near light speed.', color: '#fbbf24' },
  { icon: Orbit, title: 'Escape velocity', description: 'Compare gravity across planets and moons.', color: '#34d399' },
];

export default function ScienceToolsSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-primary)] py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.06] blur-[150px]" />
      <div className="relative mx-auto max-w-[1550px] 2xl:max-w-[1720px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">
              <Sigma className="h-3.5 w-3.5" /> Science Tools Lab
            </div>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
              Make the equation tangible
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              Change the inputs, compare scales, and inspect the assumptions. Every calculator shows the model behind its answer and links to reliable references.
            </p>
            <Link href="/tools" className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gold-500 px-6 text-sm font-bold text-navy-950 shadow-[0_0_24px_rgba(255,195,0,0.22)] transition-all hover:-translate-y-0.5 hover:bg-gold-400">
              Open the lab <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.title} href="/tools" className="group rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-xl">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ color: tool.color, backgroundColor: `${tool.color}16` }}><Icon className="h-5 w-5" /></span>
                  <h3 className="mt-4 text-lg font-bold text-[var(--text-primary)]">{tool.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{tool.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

