import Link from 'next/link';
import { ArrowRight, BookOpen, CheckCircle2, Route } from 'lucide-react';
import { LEARNING_PATHS } from '@/lib/learning-paths';

export default function LearningPathsSection() {
  const previewPaths = LEARNING_PATHS.slice(0, 3);

  return (
    <section className="relative overflow-hidden border-y border-[var(--border-color)] bg-[var(--bg-secondary)] py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/[0.07] blur-[140px]" />
      <div className="relative mx-auto max-w-[1550px] 2xl:max-w-[1720px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-readable)]">
              <Route className="h-3.5 w-3.5" /> New: Learning Paths
            </div>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl" style={{ fontFamily: 'var(--font-heading)' }}>
              Turn curiosity into a journey
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              Follow connected lessons instead of opening random pages. Pick your depth, save progress privately, and move from a clear introduction to original historical sources.
            </p>
          </div>
          <Link href="/learn" className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-gold-500 px-6 text-sm font-bold text-navy-950 shadow-[0_0_24px_rgba(255,195,0,0.25)] transition-all hover:-translate-y-0.5 hover:bg-gold-400">
            Explore all paths <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {previewPaths.map((path) => (
            <Link key={path.id} href={`/learn#${path.id}`} className="group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/35 hover:shadow-2xl">
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-15 blur-3xl" style={{ backgroundColor: path.color }} />
              <div className="relative flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 text-2xl" style={{ backgroundColor: `${path.color}18` }}>{path.icon}</span>
                <ArrowRight className="h-5 w-5 text-[var(--text-secondary)] transition-transform group-hover:translate-x-1 group-hover:text-gold-400" />
              </div>
              <p className="relative mt-5 text-xs font-bold uppercase tracking-[0.15em]" style={{ color: path.color }}>{path.eyebrow}</p>
              <h3 className="relative mt-1 text-xl font-bold text-[var(--text-primary)]">{path.title}</h3>
              <p className="relative mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{path.description}</p>
              <div className="relative mt-5 flex items-center gap-4 border-t border-[var(--border-color)] pt-4 text-xs text-[var(--text-secondary)]">
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> 3 depths</span>
                <span className="inline-flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5 text-cyan-400" /> 7 stops</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

