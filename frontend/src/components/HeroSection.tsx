'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  MotionConfig,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const ORBITS = [
  { angle: 0, duration: 9, direction: 1, color: 'var(--accent-primary)' },
  { angle: 60, duration: 13, direction: -1, color: 'var(--accent-secondary)' },
  { angle: 120, duration: 11, direction: 1, color: 'var(--accent-highlight)' },
];

const EQUATIONS = [
  { tex: 'E = mc²', className: 'left-[5%] top-[20%]', duration: 7, delay: 0.4 },
  { tex: 'Δx Δp ≥ ħ/2', className: 'right-[5%] top-[28%]', duration: 9, delay: 0.9 },
  { tex: 'F = Gm₁m₂ / r²', className: 'left-[7%] bottom-[32%]', duration: 8, delay: 0.2 },
  { tex: 'iħ ∂ψ/∂t = Ĥψ', className: 'right-[9%] bottom-[34%]', duration: 10, delay: 0.6 },
  { tex: '∇ · E = ρ / ε₀', className: 'left-[24%] bottom-[10%]', duration: 7.5, delay: 1.1 },
  { tex: 'v = H₀ d', className: 'right-[26%] top-[10%]', duration: 8.5, delay: 0.8 },
];

const FIELD_CHIPS = [
  { label: 'Space', slug: 'space' },
  { label: 'Quantum Physics', slug: 'quantum-physics' },
  { label: 'Relativity', slug: 'scientific-theories' },
  { label: 'Astrobiology', slug: 'biology' },
  { label: 'Artificial Intelligence', slug: 'artificial-intelligence' },
];

function Starfield({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement | null> }) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const stars: { x: number; y: number; size: number; alpha: number; speed: number }[] = [];
    for (let i = 0; i < 160; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.004,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.alpha += (Math.random() - 0.5) * star.speed;
        star.alpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}

function AtomVisual() {
  return (
    <div className="relative mx-auto h-[340px] w-[340px] sm:h-[460px] sm:w-[460px]">
      <motion.div
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #fcd34d 0%, #f59e0b 40%, #7c3aed 100%)',
          boxShadow:
            '0 0 50px rgba(245, 158, 11, 0.5), 0 0 110px rgba(124, 58, 237, 0.35)',
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {ORBITS.map((orbit) => (
        <motion.div
          key={orbit.angle}
          className="absolute inset-0"
          style={{ rotate: orbit.angle }}
          animate={{ rotate: orbit.angle + 360 * orbit.direction }}
          transition={{ duration: orbit.duration, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-x-0 top-1/2 h-[56%] -translate-y-1/2 rounded-[50%] border border-white/10" />
          <motion.div
            className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: orbit.color, boxShadow: `0 0 14px 3px ${orbit.color}` }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 45, damping: 18 });
  const springY = useSpring(my, { stiffness: 45, damping: 18 });
  const parallaxX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const parallaxY = useTransform(springY, [-0.5, 0.5], [-20, 20]);
  const bgParallaxX = useTransform(springX, [-0.5, 0.5], [10, -10]);
  const bgParallaxY = useTransform(springY, [-0.5, 0.5], [10, -10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden bg-[var(--bg-primary)]"
      >
        <Starfield canvasRef={canvasRef} />

        <motion.div
          className="absolute -left-48 top-1/4 h-[30rem] w-[30rem] rounded-full bg-[var(--accent-primary)]/25 blur-[130px]"
          style={{ x: bgParallaxX, y: bgParallaxY }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-40 top-10 h-[26rem] w-[26rem] rounded-full bg-[var(--accent-secondary)]/20 blur-[120px]"
          style={{ x: bgParallaxX, y: bgParallaxY }}
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-primary)]/50 to-[var(--bg-primary)] z-[1]" />

        {EQUATIONS.map((eq) => (
          <motion.div
            key={eq.tex}
            className={`absolute z-[2] hidden lg:flex ${eq.className}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 0.55, y: [0, -12, 0] }}
            transition={{
              opacity: { duration: 1, delay: eq.delay },
              y: { duration: eq.duration, repeat: Infinity, ease: 'easeInOut', delay: eq.delay },
            }}
          >
            <span
              className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-glass)] px-4 py-2 font-mono text-sm text-[var(--text-secondary)] backdrop-blur-md"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {eq.tex}
            </span>
          </motion.div>
        ))}

        <motion.div
          className="relative z-10 mx-auto max-w-7xl px-4 pb-32 pt-20 sm:px-6 sm:pb-40 sm:pt-28 lg:px-8"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.div
                variants={itemVariants}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-glass)] px-4 py-1.5 text-xs font-medium text-[var(--text-secondary)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--aurora-500)] animate-pulse" />
                15+ Scientific Categories
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Explore the{' '}
                <span className="bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-highlight)] bg-clip-text text-transparent">
                  Universe
                </span>{' '}
                of Knowledge
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-6 text-lg leading-relaxed text-[var(--text-secondary)] sm:text-xl"
              >
                From the quantum realm to the cosmic horizon — your gateway to the
                equations, experiments, and discoveries that decoded the laws of nature.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start sm:justify-center"
              >
                <Link
                  href="/articles"
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--accent-primary)] px-8 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-[var(--shadow-glow)]"
                >
                  Start Exploring
                  <span className="text-lg">&rarr;</span>
                </Link>
                <Link
                  href="/categories"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-glass)] px-8 text-sm font-semibold text-[var(--text-primary)] transition-all hover:bg-[var(--bg-card)]"
                >
                  Browse Categories
                </Link>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-9 flex flex-wrap justify-center gap-2 lg:justify-start"
              >
                {FIELD_CHIPS.map((chip) => (
                  <Link
                    key={chip.slug}
                    href={`/categories/${chip.slug}`}
                    className="rounded-full border border-[var(--border-color)] bg-[var(--bg-glass)] px-3.5 py-1.5 font-mono text-xs text-[var(--text-muted)] transition-all hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {chip.label}
                  </Link>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="hidden lg:block"
              style={{ x: parallaxX, y: parallaxY }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.55 }}
            >
              <AtomVisual />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--text-muted)]">
            Scroll to explore
          </span>
          <motion.div
            className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.span
              className="h-1.5 w-1 rounded-full bg-white/70"
              animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
