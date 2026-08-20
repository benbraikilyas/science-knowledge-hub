'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from '@/lib/gsap';

const EQUATIONS = [
  { tex: 'E = mc²', className: 'left-[3%] top-[20%]', duration: 7, delay: 0.2 },
  { tex: 'Δx Δp ≥ ħ/2', className: 'right-[5%] top-[22%]', duration: 9, delay: 0.5 },
  { tex: 'F = Gm₁m₂ / r²', className: 'left-[4%] bottom-[20%]', duration: 8, delay: 0.3 },
  { tex: 'iħ ∂ψ/∂t = Ĥψ', className: 'right-[7%] bottom-[25%]', duration: 10, delay: 0.6 },
  { tex: '∇ · E = ρ / ε₀', className: 'left-[30%] bottom-[8%]', duration: 7.5, delay: 0.8 },
  { tex: 'v = H₀ d', className: 'right-[22%] top-[14%]', duration: 8.5, delay: 0.4 },
];

const FIELD_CHIPS = [
  { label: 'Space', slug: 'space' },
  { label: 'Quantum Physics', slug: 'quantum-physics' },
  { label: 'Relativity', slug: 'scientific-theories' },
  { label: 'Astrobiology', slug: 'biology' },
  { label: 'Artificial Intelligence', slug: 'artificial-intelligence' },
];

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinklePhase: number;
  twinkleSpeed: number;
  twinkleAmp: number;
  color: string;
}

function Starfield({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement | null> }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];

    const STAR_COLORS = [
      '255, 255, 255',
      '255, 243, 176',
      '255, 224, 102',
      '224, 231, 255',
      '255, 214, 10',
    ];

    const initStars = (w: number, h: number) => {
      const count = Math.min(320, Math.max(150, Math.floor((w * h) / 4200)));
      const newStars: Star[] = [];

      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        let size = 0.5 + Math.random() * 0.9;
        let baseAlpha = 0.25 + Math.random() * 0.35;
        let twinkleAmp = 0.12 + Math.random() * 0.2;

        if (rand > 0.72 && rand <= 0.93) {
          size = 1.3 + Math.random() * 0.7;
          baseAlpha = 0.45 + Math.random() * 0.35;
          twinkleAmp = 0.18 + Math.random() * 0.25;
        } else if (rand > 0.93) {
          size = 1.9 + Math.random() * 0.9;
          baseAlpha = 0.7 + Math.random() * 0.3;
          twinkleAmp = 0.22 + Math.random() * 0.25;
        }

        const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];

        newStars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size,
          baseAlpha,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.007 + Math.random() * 0.012,
          twinkleAmp,
          color,
        });
      }
      return newStars;
    };

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent ? parent.getBoundingClientRect() : canvas.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars = initStars(width, height);
    };

    resize();

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.twinklePhase += star.twinkleSpeed;
        const alpha = Math.max(
          0.08,
          Math.min(1, star.baseAlpha + Math.sin(star.twinklePhase) * star.twinkleAmp)
        );

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${alpha})`;
        ctx.fill();

        if (star.size > 1.8 && alpha > 0.6) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.color}, ${alpha * 0.12})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none z-0"
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}

function AtomVisual() {
  const atomRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (ring1Ref.current) {
        gsap.to(ring1Ref.current, {
          rotation: 360,
          duration: 10,
          repeat: -1,
          ease: 'none',
        });
      }
      if (ring2Ref.current) {
        gsap.to(ring2Ref.current, {
          rotation: -360,
          duration: 14,
          repeat: -1,
          ease: 'none',
        });
      }
      if (ring3Ref.current) {
        gsap.to(ring3Ref.current, {
          rotation: 360,
          duration: 12,
          repeat: -1,
          ease: 'none',
        });
      }
    }, atomRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={atomRef} className="relative mx-auto h-[340px] w-[340px] sm:h-[460px] sm:w-[460px]">
      {/* Glowing Nucleus / Star Core */}
      <div
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full animate-glow-pulse"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #ffe066 0%, #ffc300 45%, #003566 100%)',
          boxShadow: '0 0 60px rgba(255, 195, 0, 0.55), 0 0 120px rgba(0, 53, 102, 0.4)',
        }}
      />

      {/* Orbit 1 */}
      <div
        ref={ring1Ref}
        className="absolute inset-0"
        style={{ transform: 'rotate(0deg)' }}
      >
        <div className="absolute inset-x-0 top-1/2 h-[56%] -translate-y-1/2 rounded-[50%] border border-gold-500/20" />
        <div
          className="absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-gold-400 shadow-[0_0_16px_4px_rgba(255,195,0,0.8)]"
        />
      </div>

      {/* Orbit 2 */}
      <div
        ref={ring2Ref}
        className="absolute inset-0"
        style={{ transform: 'rotate(60deg)' }}
      >
        <div className="absolute inset-x-0 top-1/2 h-[56%] -translate-y-1/2 rounded-[50%] border border-cyan-500/20" />
        <div
          className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_16px_4px_rgba(34,211,238,0.8)]"
        />
      </div>

      {/* Orbit 3 */}
      <div
        ref={ring3Ref}
        className="absolute inset-0"
        style={{ transform: 'rotate(120deg)' }}
      >
        <div className="absolute inset-x-0 top-1/2 h-[56%] -translate-y-1/2 rounded-[50%] border border-navy-400/30" />
        <div
          className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-navy-400 shadow-[0_0_16px_4px_rgba(0,102,179,0.8)]"
        />
      </div>
    </div>
  );
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const visualWrapperRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: 0.1 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.4'
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          chipsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          visualWrapperRef.current,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 1.1, ease: 'back.out(1.2)' },
          '-=0.9'
        )
        .fromTo(
          '.hero-equation',
          { opacity: 0, scale: 0.8 },
          { opacity: 0.7, scale: 1, stagger: 0.1, duration: 0.8 },
          '-=0.7'
        );

      const visual = visualWrapperRef.current;
      if (visual) {
        const visualX = gsap.quickTo(visual, 'x', { duration: 0.8, ease: 'power3.out' });
        const visualY = gsap.quickTo(visual, 'y', { duration: 0.8, ease: 'power3.out' });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = section.getBoundingClientRect();
          const normX = (e.clientX - rect.left) / rect.width - 0.5;
          const normY = (e.clientY - rect.top) / rect.height - 0.5;
          visualX(normX * 30);
          visualY(normY * 30);
        };

        section.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => section.removeEventListener('mousemove', handleMouseMove);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#000814] min-h-[92vh] flex items-center justify-center"
      style={{
        background:
          'radial-gradient(ellipse 90% 70% at 50% -15%, #001d3d 0%, #000d1f 50%, #000814 100%)',
      }}
    >
      <Starfield canvasRef={canvasRef} />

      {/* Atmospheric Soft Nebula Glows */}
      <div
        className="pointer-events-none absolute -left-36 top-1/4 h-[32rem] w-[32rem] rounded-full bg-gold-500/10 blur-[140px] animate-pulse"
        style={{ animationDuration: '8s' }}
      />
      <div
        className="pointer-events-none absolute -right-32 top-12 h-[30rem] w-[30rem] rounded-full bg-navy-500/20 blur-[140px] animate-pulse"
        style={{ animationDuration: '10s' }}
      />
      <div className="pointer-events-none absolute left-1/3 bottom-8 h-[24rem] w-[24rem] rounded-full bg-gold-400/8 blur-[130px]" />

      {/* Bottom fade transition */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#000814] z-[1]" />

      {/* Floating Equations */}
      {EQUATIONS.map((eq) => (
        <div
          key={eq.tex}
          className={`hero-equation absolute z-[2] hidden lg:flex ${eq.className} animate-float`}
          style={{ animationDuration: `${eq.duration}s`, animationDelay: `${eq.delay}s` }}
        >
          <span
            className="rounded-xl border border-white/10 bg-navy-950/70 px-4 py-2 font-mono text-xs sm:text-sm text-slate-300/80 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {eq.tex}
          </span>
        </div>
      ))}

      {/* Hero Content Container */}
      <div
        ref={heroContentRef}
        className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 w-full"
      >
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Side-aligned text content */}
          <div className="lg:col-span-7 text-left mx-auto max-w-2xl lg:mx-0">
            <div
              ref={badgeRef}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-medium text-gold-300 backdrop-blur-md shadow-[0_0_20px_rgba(255,195,0,0.1)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
              15+ Scientific Categories
            </div>

            <h1
              ref={titleRef}
              className="text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Explore the{' '}
              <span className="bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,195,0,0.3)]">
                Universe
              </span>{' '}
              of Knowledge
            </h1>

            <p
              ref={descRef}
              className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg lg:text-xl font-light"
            >
              From the quantum realm to the cosmic horizon — your gateway to the equations,
              experiments, and discoveries that decoded the laws of nature.
            </p>

            <div
              ref={ctaRef}
              className="mt-10 flex flex-wrap items-center gap-4 justify-start"
            >
              <Link
                href="/articles"
                className="group inline-flex h-12 items-center gap-2 rounded-xl bg-gold-500 px-8 text-sm font-semibold text-navy-950 shadow-[0_0_25px_rgba(255,195,0,0.35)] transition-all duration-200 hover:bg-gold-400 hover:shadow-[0_0_35px_rgba(255,195,0,0.5)] hover:-translate-y-0.5 active:translate-y-0"
              >
                Start Exploring
                <span className="text-lg transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
              <Link
                href="/categories"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-8 text-sm font-semibold text-slate-100 backdrop-blur-md transition-all duration-200 hover:bg-white/[0.12] hover:border-white/25 hover:-translate-y-0.5"
              >
                Browse Categories
              </Link>
            </div>

            <div
              ref={chipsRef}
              className="mt-9 flex flex-wrap gap-2 justify-start"
            >
              {FIELD_CHIPS.map((chip) => (
                <Link
                  key={chip.slug}
                  href={`/categories/${chip.slug}`}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs text-slate-400 backdrop-blur-sm transition-all duration-200 hover:border-gold-400/50 hover:bg-gold-500/10 hover:text-gold-300"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {chip.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Visual Atom on the right side */}
          <div
            ref={visualWrapperRef}
            className="lg:col-span-5 hidden lg:flex justify-center items-center"
          >
            <AtomVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
