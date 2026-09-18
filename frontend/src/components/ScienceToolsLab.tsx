'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Atom,
  Calculator,
  Clock3,
  Gauge,
  Info,
  Orbit,
  Sparkles,
} from 'lucide-react';
import {
  calculateEscapeVelocity,
  calculateLightTravelTime,
  calculatePhotonFromWavelength,
  calculateTimeDilation,
  describeSpectrum,
  type DistanceUnit,
} from '@/lib/science-calculations';

const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 6 });

function decimal(value: number, maximumFractionDigits = 4) {
  if (!Number.isFinite(value)) return '—';
  return new Intl.NumberFormat('en-US', { maximumFractionDigits }).format(value);
}

function scientific(value: number, digits = 5) {
  if (!Number.isFinite(value)) return '—';
  return value.toExponential(digits);
}

function humanDuration(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '—';
  if (seconds < 1e-3) return `${decimal(seconds * 1e6, 3)} microseconds`;
  if (seconds < 1) return `${decimal(seconds * 1e3, 3)} milliseconds`;
  if (seconds < 60) return `${decimal(seconds, 4)} seconds`;
  if (seconds < 3_600) return `${decimal(seconds / 60, 3)} minutes`;
  if (seconds < 86_400) return `${decimal(seconds / 3_600, 3)} hours`;
  if (seconds < 31_557_600) return `${decimal(seconds / 86_400, 3)} days`;
  return `${decimal(seconds / 31_557_600, 6)} years`;
}

function ResultTile({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)]/55 p-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-secondary)]">{label}</p>
      <p className="mt-1 break-words text-lg font-extrabold text-[var(--text-primary)]">{value}</p>
      {detail && <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">{detail}</p>}
    </div>
  );
}

const inputClass = 'h-12 w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)]/70 px-4 text-sm text-[var(--text-primary)] outline-none transition-all focus:border-gold-500/60 focus:ring-2 focus:ring-gold-500/10';
const presetClass = 'rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)]/45 px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:border-gold-500/40 hover:text-[var(--text-primary)]';

export default function ScienceToolsLab() {
  const [distance, setDistance] = useState(1);
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('au');
  const [wavelength, setWavelength] = useState(550);
  const [speedPercent, setSpeedPercent] = useState(90);
  const [stationaryYears, setStationaryYears] = useState(10);
  const [massEarths, setMassEarths] = useState(1);
  const [radiusEarths, setRadiusEarths] = useState(1);

  const lightResult = useMemo(() => {
    try { return calculateLightTravelTime(distance, distanceUnit); } catch { return null; }
  }, [distance, distanceUnit]);

  const photonResult = useMemo(() => {
    try { return calculatePhotonFromWavelength(wavelength); } catch { return null; }
  }, [wavelength]);

  const relativityResult = useMemo(() => {
    try { return calculateTimeDilation(speedPercent, stationaryYears); } catch { return null; }
  }, [speedPercent, stationaryYears]);

  const escapeResult = useMemo(() => {
    try { return calculateEscapeVelocity(massEarths, radiusEarths); } catch { return null; }
  }, [massEarths, radiusEarths]);

  return (
    <div className="mx-auto max-w-[1550px] 2xl:max-w-[1720px] px-4 pb-24 sm:px-6 lg:px-10">
      <div className="-mt-8 relative z-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Clock3, label: 'Light travel time', color: '#38bdf8', anchor: 'light-travel' },
          { icon: Atom, label: 'Photon energy', color: '#a78bfa', anchor: 'photon-energy' },
          { icon: Gauge, label: 'Time dilation', color: '#fbbf24', anchor: 'time-dilation' },
          { icon: Orbit, label: 'Escape velocity', color: '#34d399', anchor: 'escape-velocity' },
        ].map((tool) => {
          const Icon = tool.icon;
          return (
            <a key={tool.anchor} href={`#${tool.anchor}`} className="group flex items-center gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/95 p-4 shadow-xl backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-gold-500/30">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${tool.color}18`, color: tool.color }}><Icon className="h-5 w-5" /></span>
              <span className="text-sm font-bold text-[var(--text-primary)]">{tool.label}</span>
              <ArrowRight className="ml-auto h-4 w-4 text-[var(--text-secondary)] transition-transform group-hover:translate-x-1" />
            </a>
          );
        })}
      </div>

      <div className="mt-12 grid gap-6 xl:grid-cols-2">
        <section id="light-travel" className="scroll-mt-28 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/65 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400"><Clock3 className="h-6 w-6" /></span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-400">Space scale</p>
              <h2 className="mt-1 text-2xl font-extrabold text-[var(--text-primary)]">Light Travel Time</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">See how long light takes to cross a distance in vacuum. This is also the minimum one-way delay for any signal carrying information.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_180px]">
            <label>
              <span className="mb-2 block text-xs font-semibold text-[var(--text-secondary)]">Distance</span>
              <input className={inputClass} type="number" min="0" step="any" value={distance} onChange={(event) => setDistance(Number(event.target.value))} />
            </label>
            <label>
              <span className="mb-2 block text-xs font-semibold text-[var(--text-secondary)]">Unit</span>
              <select className={inputClass} value={distanceUnit} onChange={(event) => setDistanceUnit(event.target.value as DistanceUnit)}>
                <option value="km">Kilometres</option>
                <option value="au">Astronomical units</option>
                <option value="light-year">Light-years</option>
                <option value="parsec">Parsecs</option>
              </select>
            </label>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className={presetClass} onClick={() => { setDistance(384_400); setDistanceUnit('km'); }}>Earth → Moon</button>
            <button type="button" className={presetClass} onClick={() => { setDistance(1); setDistanceUnit('au'); }}>Sun → Earth</button>
            <button type="button" className={presetClass} onClick={() => { setDistance(4.2465); setDistanceUnit('light-year'); }}>Proxima Centauri</button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2" aria-live="polite">
            <ResultTile label="Travel time" value={lightResult ? humanDuration(lightResult.seconds) : 'Enter a positive distance'} />
            <ResultTile label="Exact seconds" value={lightResult ? scientific(lightResult.seconds) : '—'} detail="distance ÷ 299,792,458 m/s" />
          </div>
          <div className="mt-5 flex items-start gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.06] p-3 text-xs leading-relaxed text-[var(--text-secondary)]"><Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />Real communications can take longer because of routing, processing, atmosphere, and spacecraft operations.</div>
        </section>

        <section id="photon-energy" className="scroll-mt-28 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/65 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400"><Atom className="h-6 w-6" /></span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-400">Quantum physics</p>
              <h2 className="mt-1 text-2xl font-extrabold text-[var(--text-primary)]">Photon Energy</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">Convert wavelength into frequency and single-photon energy using E = hf and f = c/λ.</p>
            </div>
          </div>

          <label className="mt-6 block">
            <span className="mb-2 block text-xs font-semibold text-[var(--text-secondary)]">Wavelength in nanometres</span>
            <input className={inputClass} type="number" min="0" step="any" value={wavelength} onChange={(event) => setWavelength(Number(event.target.value))} />
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {[{ value: 365, label: 'UV' }, { value: 450, label: 'Blue' }, { value: 550, label: 'Green' }, { value: 650, label: 'Red' }, { value: 10_000, label: 'Infrared' }].map((preset) => (
              <button key={preset.value} type="button" className={presetClass} onClick={() => setWavelength(preset.value)}>{preset.label}</button>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2" aria-live="polite">
            <ResultTile label="Spectrum region" value={photonResult ? describeSpectrum(wavelength) : 'Enter a positive wavelength'} />
            <ResultTile label="Frequency" value={photonResult ? `${scientific(photonResult.frequencyHz)} Hz` : '—'} />
            <ResultTile label="Energy" value={photonResult ? `${scientific(photonResult.energyJoules)} J` : '—'} />
            <ResultTile label="Energy" value={photonResult ? `${decimal(photonResult.energyElectronVolts, 6)} eV` : '—'} detail="Energy of one photon" />
          </div>
          <div className="mt-5 flex items-start gap-2 rounded-xl border border-violet-500/20 bg-violet-500/[0.06] p-3 text-xs leading-relaxed text-[var(--text-secondary)]"><Info className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />Spectrum labels are approximate boundaries; scientific conventions can vary slightly between fields.</div>
        </section>

        <section id="time-dilation" className="scroll-mt-28 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/65 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400"><Gauge className="h-6 w-6" /></span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">Special relativity</p>
              <h2 className="mt-1 text-2xl font-extrabold text-[var(--text-primary)]">Relativistic Time Dilation</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">Compare elapsed coordinate time with the proper time measured by an ideal clock moving at constant speed.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <label>
              <span className="mb-2 block text-xs font-semibold text-[var(--text-secondary)]">Speed (% of light speed)</span>
              <input className={inputClass} type="number" min="0.0001" max="99.999999" step="any" value={speedPercent} onChange={(event) => setSpeedPercent(Number(event.target.value))} />
            </label>
            <label>
              <span className="mb-2 block text-xs font-semibold text-[var(--text-secondary)]">Stationary-frame years</span>
              <input className={inputClass} type="number" min="0" step="any" value={stationaryYears} onChange={(event) => setStationaryYears(Number(event.target.value))} />
            </label>
          </div>
          <input aria-label="Speed as percentage of light speed" className="mt-4 w-full accent-amber-400" type="range" min="1" max="99.99" step="0.01" value={Math.min(99.99, Math.max(1, speedPercent || 1))} onChange={(event) => setSpeedPercent(Number(event.target.value))} />
          <div className="mt-3 flex flex-wrap gap-2">
            {[50, 90, 99, 99.9].map((preset) => <button key={preset} type="button" className={presetClass} onClick={() => setSpeedPercent(preset)}>{preset}% c</button>)}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3" aria-live="polite">
            <ResultTile label="Lorentz factor γ" value={relativityResult ? decimal(relativityResult.lorentzFactor, 8) : 'Use a speed below 100% c'} />
            <ResultTile label="Traveler time" value={relativityResult ? `${decimal(relativityResult.travelerYears, 8)} years` : '—'} />
            <ResultTile label="Time difference" value={relativityResult ? `${decimal(relativityResult.differenceYears, 8)} years` : '—'} />
          </div>
          <div className="mt-5 flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-3 text-xs leading-relaxed text-[var(--text-secondary)]"><Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />Idealized inertial motion only. Acceleration, turnaround, and gravitational time dilation are not included.</div>
        </section>

        <section id="escape-velocity" className="scroll-mt-28 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/65 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400"><Orbit className="h-6 w-6" /></span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">Gravity</p>
              <h2 className="mt-1 text-2xl font-extrabold text-[var(--text-primary)]">Escape Velocity</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">Estimate the ideal launch speed needed to escape a spherical body without further propulsion.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <label>
              <span className="mb-2 block text-xs font-semibold text-[var(--text-secondary)]">Mass (Earth = 1)</span>
              <input className={inputClass} type="number" min="0" step="any" value={massEarths} onChange={(event) => setMassEarths(Number(event.target.value))} />
            </label>
            <label>
              <span className="mb-2 block text-xs font-semibold text-[var(--text-secondary)]">Radius (Earth = 1)</span>
              <input className={inputClass} type="number" min="0" step="any" value={radiusEarths} onChange={(event) => setRadiusEarths(Number(event.target.value))} />
            </label>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { label: 'Earth', mass: 1, radius: 1 },
              { label: 'Moon', mass: 0.0123, radius: 0.2727 },
              { label: 'Mars', mass: 0.1074, radius: 0.532 },
              { label: 'Jupiter', mass: 317.8, radius: 10.97 },
            ].map((preset) => <button key={preset.label} type="button" className={presetClass} onClick={() => { setMassEarths(preset.mass); setRadiusEarths(preset.radius); }}>{preset.label}</button>)}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2" aria-live="polite">
            <ResultTile label="Escape velocity" value={escapeResult ? `${decimal(escapeResult.escapeVelocityKps, 5)} km/s` : 'Enter positive mass and radius'} />
            <ResultTile label="Surface gravity" value={escapeResult ? `${decimal(escapeResult.surfaceGravityMps2, 5)} m/s²` : '—'} />
            <ResultTile label="Mass used" value={escapeResult ? `${scientific(escapeResult.massKg)} kg` : '—'} />
            <ResultTile label="Radius used" value={escapeResult ? `${numberFormatter.format(escapeResult.radiusMeters / 1_000)} km` : '—'} />
          </div>
          <div className="mt-5 flex items-start gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-3 text-xs leading-relaxed text-[var(--text-secondary)]"><Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />This ideal model ignores atmosphere, rotation, terrain, drag, and propulsion after launch.</div>
        </section>
      </div>

      <section className="mt-10 rounded-3xl border border-gold-500/25 bg-gradient-to-r from-gold-500/[0.07] via-[var(--bg-card)] to-cyan-500/[0.07] p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-bold text-gold-400"><Sparkles className="h-4 w-4" /> Turn numbers into understanding</div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">Calculators are starting points, not substitutes for models and assumptions. Continue with a guided path to see where each equation comes from and what evidence supports it.</p>
          </div>
          <Link href="/learn" className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-gold-500 px-5 text-sm font-bold text-navy-950 transition-colors hover:bg-gold-400">Open Learning Paths <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-[var(--text-secondary)]"><Calculator className="h-3.5 w-3.5" />All calculations run privately in your browser. No input values are uploaded or stored.</div>
    </div>
  );
}

