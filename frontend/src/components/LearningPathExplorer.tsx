'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  FileText,
  RotateCcw,
  Route,
  Sparkles,
  Trophy,
  UserRound,
} from 'lucide-react';
import {
  LEARNING_MODE_CONFIG,
  LEARNING_PATHS,
  type LearningMode,
  type LearningStep,
} from '@/lib/learning-paths';

const STORAGE_KEY = 'sciencehub-learning-progress-v1';
const MODE_ORDER: Record<LearningMode, number> = { quick: 0, full: 1, deep: 2 };
const MODES = Object.keys(LEARNING_MODE_CONFIG) as LearningMode[];

const STEP_KIND = {
  article: { label: 'Explainer', icon: FileText },
  scientist: { label: 'Scientist', icon: UserRound },
  book: { label: 'Free book', icon: BookOpen },
};

function visibleSteps(steps: LearningStep[], mode: LearningMode) {
  return steps.filter((step) => MODE_ORDER[step.minimumMode] <= MODE_ORDER[mode]);
}

export default function LearningPathExplorer() {
  const [activePathId, setActivePathId] = useState(LEARNING_PATHS[0].id);
  const [mode, setMode] = useState<LearningMode>('full');
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    const hydrateProgress = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        const hashPathId = window.location.hash.slice(1);
        const validHashPath = LEARNING_PATHS.some((path) => path.id === hashPathId);
        if (saved) {
          const parsed = JSON.parse(saved) as { completed?: string[]; mode?: LearningMode; activePathId?: string };
          if (Array.isArray(parsed.completed)) setCompletedIds(new Set(parsed.completed));
          if (parsed.mode && parsed.mode in LEARNING_MODE_CONFIG) setMode(parsed.mode);
          if (validHashPath) {
            setActivePathId(hashPathId);
          } else if (parsed.activePathId && LEARNING_PATHS.some((path) => path.id === parsed.activePathId)) {
            setActivePathId(parsed.activePathId);
          }
        } else if (validHashPath) {
          setActivePathId(hashPathId);
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      } finally {
        setStorageReady(true);
      }
    }, 0);

    return () => window.clearTimeout(hydrateProgress);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
        completed: [...completedIds],
        mode,
        activePathId,
      }));
    } catch {
      // Learning remains fully usable when browser storage is unavailable.
    }
  }, [activePathId, completedIds, mode, storageReady]);

  const activePath = LEARNING_PATHS.find((path) => path.id === activePathId) ?? LEARNING_PATHS[0];
  const activeSteps = useMemo(() => visibleSteps(activePath.steps, mode), [activePath, mode]);
  const completedActiveSteps = activeSteps.filter((step) => completedIds.has(step.id)).length;
  const activeProgress = Math.round((completedActiveSteps / activeSteps.length) * 100);
  const totalMinutes = activeSteps.reduce((total, step) => total + step.minutes, 0);
  const remainingMinutes = activeSteps
    .filter((step) => !completedIds.has(step.id))
    .reduce((total, step) => total + step.minutes, 0);

  const overall = useMemo(() => {
    const steps = LEARNING_PATHS.flatMap((path) => visibleSteps(path.steps, mode));
    const completed = steps.filter((step) => completedIds.has(step.id)).length;
    return {
      completed,
      total: steps.length,
      percentage: Math.round((completed / steps.length) * 100),
    };
  }, [completedIds, mode]);

  const toggleStep = (stepId: string) => {
    setCompletedIds((current) => {
      const next = new Set(current);
      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);
      return next;
    });
  };

  const resetActivePath = () => {
    const pathStepIds = new Set(activePath.steps.map((step) => step.id));
    setCompletedIds((current) => new Set([...current].filter((id) => !pathStepIds.has(id))));
  };

  const selectPath = (pathId: string) => {
    setActivePathId(pathId);
    window.history.replaceState(null, '', `#${pathId}`);
  };

  return (
    <div className="mx-auto max-w-[1550px] 2xl:max-w-[1720px] px-4 pb-24 sm:px-6 lg:px-10">
      <section className="-mt-10 relative z-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/95 p-5 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Route className="h-5 w-5 text-gold-400" />
            <p className="text-sm font-semibold text-[var(--text-primary)]">6 curated paths</p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">Articles, biographies, and primary-source books connected in a useful order.</p>
        </div>
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/95 p-5 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Clock3 className="h-5 w-5 text-cyan-400" />
            <p className="text-sm font-semibold text-[var(--text-primary)]">Learn at your pace</p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">Choose a quick introduction, complete path, or deeper historical reading.</p>
        </div>
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/95 p-5 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Trophy className="h-5 w-5 text-emerald-400" />
            <p className="text-sm font-semibold text-[var(--text-primary)]">{overall.percentage}% overall progress</p>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--border-color)]">
            <div className="h-full rounded-full bg-gradient-to-r from-gold-500 to-cyan-400 transition-all duration-500" style={{ width: `${overall.percentage}%` }} />
          </div>
          <p className="mt-2 text-xs text-[var(--text-secondary)]">{overall.completed} of {overall.total} current-mode stops completed</p>
        </div>
      </section>

      <section className="mt-14">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-400">Choose your depth</p>
            <h2 className="mt-2 text-2xl font-extrabold text-[var(--text-primary)] sm:text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
              One subject, three ways to explore
            </h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-3" role="group" aria-label="Learning depth">
            {MODES.map((option) => {
              const selected = mode === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMode(option)}
                  aria-pressed={selected}
                  className={`rounded-xl border px-4 py-3 text-left transition-all ${selected
                    ? 'border-gold-500/60 bg-gold-500/15 shadow-[0_0_20px_rgba(255,195,0,0.12)]'
                    : 'border-[var(--border-color)] bg-[var(--bg-card)]/60 hover:border-gold-500/30'
                  }`}
                >
                  <span className={`block text-sm font-bold ${selected ? 'text-[var(--accent-readable)]' : 'text-[var(--text-primary)]'}`}>
                    {LEARNING_MODE_CONFIG[option].label}
                  </span>
                  <span className="mt-1 hidden max-w-48 text-xs leading-relaxed text-[var(--text-secondary)] xl:block">
                    {LEARNING_MODE_CONFIG[option].description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LEARNING_PATHS.map((path) => {
            const steps = visibleSteps(path.steps, mode);
            const completed = steps.filter((step) => completedIds.has(step.id)).length;
            const progress = Math.round((completed / steps.length) * 100);
            const selected = path.id === activePath.id;

            return (
              <button
                key={path.id}
                id={path.id}
                type="button"
                onClick={() => selectPath(path.id)}
                aria-pressed={selected}
                className={`group relative scroll-mt-28 overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${selected
                  ? 'border-gold-500/50 bg-[var(--bg-card)] shadow-[0_14px_40px_rgba(0,0,0,0.18)]'
                  : 'border-[var(--border-color)] bg-[var(--bg-card)]/55 hover:-translate-y-1 hover:border-gold-500/25'
                }`}
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-15 blur-3xl" style={{ backgroundColor: path.color }} />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 text-2xl" style={{ backgroundColor: `${path.color}18` }}>{path.icon}</span>
                  <span className="rounded-full border border-[var(--border-color)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)]">{completed}/{steps.length}</span>
                </div>
                <p className="relative mt-5 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: path.color }}>{path.eyebrow}</p>
                <h3 className="relative mt-1 text-xl font-bold text-[var(--text-primary)]">{path.title}</h3>
                <p className="relative mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">{path.description}</p>
                <div className="relative mt-5 h-1.5 overflow-hidden rounded-full bg-[var(--border-color)]">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, backgroundColor: path.color }} />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-12 overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/70 shadow-2xl backdrop-blur-xl">
        <div className="relative border-b border-[var(--border-color)] p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-15 blur-[90px]" style={{ backgroundColor: activePath.color }} />
          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activePath.icon}</span>
                <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: activePath.color }}>{activePath.eyebrow}</p>
              </div>
              <h2 className="mt-3 text-3xl font-extrabold text-[var(--text-primary)] sm:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>{activePath.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">{activePath.description}</p>
              <div className="mt-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)]/50 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gold-400">Learning outcome</p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-primary)]">{activePath.outcome}</p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-5">
              <div
                className="grid h-24 w-24 place-items-center rounded-full"
                style={{ background: `conic-gradient(${activePath.color} ${activeProgress}%, var(--border-color) ${activeProgress}% 100%)` }}
              >
                <div className="grid h-[78px] w-[78px] place-items-center rounded-full bg-[var(--bg-card)] text-center">
                  <span className="text-xl font-extrabold text-[var(--text-primary)]">{activeProgress}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{completedActiveSteps} of {activeSteps.length} complete</p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">{remainingMinutes} of {totalMinutes} min remaining</p>
                {completedActiveSteps > 0 && (
                  <button type="button" onClick={resetActivePath} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:text-red-400">
                    <RotateCcw className="h-3.5 w-3.5" /> Reset path
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <ol className="space-y-3">
            {activeSteps.map((step, index) => {
              const completed = completedIds.has(step.id);
              const kind = STEP_KIND[step.kind];
              const KindIcon = kind.icon;

              return (
                <li key={step.id} className={`rounded-2xl border p-4 transition-all sm:p-5 ${completed ? 'border-emerald-500/30 bg-emerald-500/[0.06]' : 'border-[var(--border-color)] bg-[var(--bg-primary)]/45 hover:border-gold-500/25'}`}>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-sm font-bold ${completed ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400' : 'border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)]'}`}>
                      {completed ? <Check className="h-5 w-5" /> : index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-secondary)]">
                        <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider"><KindIcon className="h-3.5 w-3.5" />{kind.label}</span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />{step.minutes} min</span>
                      </div>
                      <h3 className={`mt-1 text-lg font-bold ${completed ? 'text-emerald-300' : 'text-[var(--text-primary)]'}`}>{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{step.description}</p>
                    </div>
                    <div className="flex shrink-0 gap-2 sm:flex-col lg:flex-row">
                      <button
                        type="button"
                        onClick={() => toggleStep(step.id)}
                        aria-pressed={completed}
                        className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-4 text-xs font-bold transition-all ${completed
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/15'
                          : 'border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-emerald-500/40 hover:text-emerald-300'
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" /> {completed ? 'Completed' : 'Mark complete'}
                      </button>
                      <Link href={step.href} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gold-500 px-4 text-xs font-bold text-navy-950 transition-all hover:bg-gold-400">
                        Open <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className={`mt-6 rounded-2xl border p-5 sm:p-6 ${activeProgress === 100 ? 'border-emerald-500/35 bg-emerald-500/[0.07]' : 'border-gold-500/25 bg-gold-500/[0.05]'}`}>
            <div className="flex items-start gap-3">
              {activeProgress === 100 ? <Trophy className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" /> : <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />}
              <div>
                <p className="font-bold text-[var(--text-primary)]">{activeProgress === 100 ? 'Path completed — excellent work.' : 'Reflection checkpoint'}</p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{activePath.reflection}</p>
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-[var(--text-secondary)]">Progress is private and saved only in this browser. No account is required.</p>
        </div>
      </section>
    </div>
  );
}
