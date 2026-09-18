export type LearningMode = 'quick' | 'full' | 'deep';
export type LearningStepKind = 'article' | 'scientist' | 'book';

export interface LearningStep {
  id: string;
  kind: LearningStepKind;
  minimumMode: LearningMode;
  title: string;
  description: string;
  href: string;
  minutes: number;
}

export interface LearningPath {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  icon: string;
  color: string;
  outcome: string;
  reflection: string;
  steps: LearningStep[];
}

export const LEARNING_MODE_CONFIG: Record<LearningMode, {
  label: string;
  description: string;
}> = {
  quick: {
    label: 'Quick start',
    description: 'Three essential stops for a focused introduction.',
  },
  full: {
    label: 'Full path',
    description: 'Five connected lessons for a rounded understanding.',
  },
  deep: {
    label: 'Deep dive',
    description: 'The complete path, including primary-source books.',
  },
};

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'cosmic-explorer',
    title: 'Cosmic Explorer',
    eyebrow: 'Space & astronomy',
    description: 'Move from the light collected by telescopes to stellar life cycles, curved spacetime, and lunar engineering.',
    icon: '🚀',
    color: '#38bdf8',
    outcome: 'Explain how observations, physical models, and spacecraft engineering work together to reveal the universe.',
    reflection: 'What can astronomers infer from light alone, and where do those inferences depend on a model?',
    steps: [
      { id: 'cosmos-jwst', kind: 'article', minimumMode: 'quick', title: 'How JWST Reads the Early Universe', description: 'Begin with the evidence: ancient infrared light, redshift, and telescope instruments.', href: '/articles/how-james-webb-space-telescope-reads-early-universe', minutes: 9 },
      { id: 'cosmos-stars', kind: 'article', minimumMode: 'quick', title: 'How Stars Are Born, Live, and Die', description: 'Follow matter through gravity, fusion, giant stars, remnants, and recycled elements.', href: '/articles/how-stars-are-born-live-and-die', minutes: 10 },
      { id: 'cosmos-einstein', kind: 'scientist', minimumMode: 'quick', title: 'Meet Albert Einstein', description: 'Connect the person, evidence, and ideas behind modern spacetime physics.', href: '/scientists/albert-einstein', minutes: 8 },
      { id: 'cosmos-gps', kind: 'article', minimumMode: 'full', title: 'Relativity Inside Everyday GPS', description: 'See why satellite clocks must account for motion and gravity.', href: '/articles/general-relativity-curved-spacetime-working-gps', minutes: 10 },
      { id: 'cosmos-apollo', kind: 'article', minimumMode: 'full', title: 'Apollo 11 as a Systems Problem', description: 'Study navigation, computing, propulsion, teamwork, and risk in one mission.', href: '/articles/apollo-11-engineering-behind-first-moon-landing', minutes: 12 },
      { id: 'cosmos-relativity-book', kind: 'book', minimumMode: 'deep', title: 'Relativity: The Special and General Theory', description: 'Read Einstein’s own public-facing explanation through a free archive edition.', href: '/articles/relativity-the-special-and-general-theory', minutes: 24 },
      { id: 'cosmos-heavens-book', kind: 'book', minimumMode: 'deep', title: 'The Story of the Heavens', description: 'Compare a historical astronomy narrative with what modern instruments now reveal.', href: '/articles/the-story-of-the-heavens', minutes: 18 },
    ],
  },
  {
    id: 'quantum-reality',
    title: 'Quantum Reality',
    eyebrow: 'Physics & experiments',
    description: 'Separate quantum evidence from popular myths, then connect foundational tests to present-day engineering.',
    icon: '⚛️',
    color: '#818cf8',
    outcome: 'Describe what entanglement experiments establish, what they do not permit, and why quantum computers are difficult to build.',
    reflection: 'How does a Bell test turn a philosophical disagreement into a measurable experimental question?',
    steps: [
      { id: 'quantum-entanglement', kind: 'article', minimumMode: 'quick', title: 'Entanglement Without the Myth', description: 'Learn correlations, measurement, and why entanglement cannot send messages faster than light.', href: '/articles/quantum-entanglement-without-faster-than-light-myth', minutes: 10 },
      { id: 'quantum-bell', kind: 'article', minimumMode: 'quick', title: 'How Bell Tests Became Data', description: 'Trace the logic from hidden-variable proposals to laboratory evidence.', href: '/articles/how-bell-tests-turned-quantum-debate-into-data', minutes: 11 },
      { id: 'quantum-computing', kind: 'article', minimumMode: 'quick', title: 'Quantum Computing After the Hype', description: 'Understand qubits, noise, error correction, and today’s engineering constraints.', href: '/articles/quantum-computing-after-hype-engineering-reality', minutes: 12 },
      { id: 'quantum-einstein', kind: 'scientist', minimumMode: 'full', title: 'Einstein and the Quantum Debate', description: 'Place Einstein’s quantum contributions and objections in their historical context.', href: '/scientists/albert-einstein', minutes: 8 },
      { id: 'quantum-bohr', kind: 'book', minimumMode: 'full', title: 'Atomic Constitution and Spectra', description: 'Read Niels Bohr’s historical account of atomic structure and spectral evidence.', href: '/articles/theory-of-spectra-and-atomic-constitution', minutes: 20 },
      { id: 'quantum-planck-radiation', kind: 'book', minimumMode: 'deep', title: 'The Theory of Heat Radiation', description: 'Explore the problem that pushed Planck toward energy quantization.', href: '/articles/the-theory-of-heat-radiation', minutes: 24 },
      { id: 'quantum-planck-thermo', kind: 'book', minimumMode: 'deep', title: 'A Treatise on Thermodynamics', description: 'Deepen the classical background from which early quantum theory emerged.', href: '/articles/treatise-on-thermodynamics-planck', minutes: 24 },
    ],
  },
  {
    id: 'life-code',
    title: 'Life, Evolution & the Genetic Code',
    eyebrow: 'Biology',
    description: 'Connect natural selection, field observation, molecular evidence, and today’s gene-editing tools.',
    icon: '🧬',
    color: '#2dd4bf',
    outcome: 'Relate evolutionary change across generations to molecular mechanisms that scientists can now observe and edit.',
    reflection: 'What is the difference between explaining how a trait evolved and explaining how its genes function?',
    steps: [
      { id: 'life-crispr', kind: 'article', minimumMode: 'quick', title: 'CRISPR: Capabilities and Limits', description: 'Start with a modern tool and the biological repair processes it depends on.', href: '/articles/crispr-gene-editing-capabilities-limits', minutes: 11 },
      { id: 'life-darwin', kind: 'scientist', minimumMode: 'quick', title: 'Meet Charles Darwin', description: 'See how observation, comparison, and argument shaped evolutionary theory.', href: '/scientists/charles-darwin', minutes: 8 },
      { id: 'life-origin', kind: 'book', minimumMode: 'quick', title: 'On the Origin of Species', description: 'Enter the primary source through a guided, free archive edition.', href: '/articles/on-the-origin-of-species', minutes: 25 },
      { id: 'life-franklin', kind: 'scientist', minimumMode: 'full', title: 'Meet Rosalind Franklin', description: 'Connect X-ray diffraction evidence to the molecular structure of DNA.', href: '/scientists/rosalind-franklin', minutes: 8 },
      { id: 'life-growth-form', kind: 'book', minimumMode: 'full', title: 'On Growth and Form', description: 'Explore how geometry and physical forces can shape living structures.', href: '/articles/on-growth-and-form', minutes: 22 },
      { id: 'life-beagle', kind: 'book', minimumMode: 'deep', title: 'The Voyage of the Beagle', description: 'Read Darwin’s observations before the mature theory took shape.', href: '/articles/the-voyage-of-the-beagle', minutes: 24 },
      { id: 'life-huxley', kind: 'book', minimumMode: 'deep', title: 'Man’s Place in Nature', description: 'Study an early comparative argument about human evolutionary history.', href: '/articles/mans-place-in-nature-and-other-essays', minutes: 22 },
    ],
  },
  {
    id: 'computing-intelligence',
    title: 'Computing & Intelligence',
    eyebrow: 'AI & technology',
    description: 'Travel from semiconductor physics and information theory to algorithms, language models, and quantum hardware.',
    icon: '🤖',
    color: '#a78bfa',
    outcome: 'Explain the layered chain from physical switches to information, programs, and machine-learning behavior.',
    reflection: 'At which layer—hardware, data, objective, or evaluation—does an AI system’s limitation originate?',
    steps: [
      { id: 'computing-semiconductors', kind: 'article', minimumMode: 'quick', title: 'How Semiconductors Become Computing', description: 'Begin at the material layer: bands, doping, transistors, and switching.', href: '/articles/how-semiconductors-turn-physics-into-computing', minutes: 11 },
      { id: 'computing-transformers', kind: 'article', minimumMode: 'quick', title: 'How Transformer Models Process Language', description: 'Move from tokens and attention to useful capabilities and failure modes.', href: '/articles/how-transformer-models-process-language-and-fail', minutes: 12 },
      { id: 'computing-turing', kind: 'scientist', minimumMode: 'quick', title: 'Meet Alan Turing', description: 'Learn the conceptual foundations of general computation and machine intelligence.', href: '/scientists/alan-turing', minutes: 8 },
      { id: 'computing-shannon', kind: 'scientist', minimumMode: 'full', title: 'Meet Claude Shannon', description: 'Connect bits, communication channels, noise, and reliable information.', href: '/scientists/claude-shannon', minutes: 8 },
      { id: 'computing-lovelace', kind: 'scientist', minimumMode: 'full', title: 'Meet Ada Lovelace', description: 'Explore an early vision of symbolic machines operating beyond arithmetic.', href: '/scientists/ada-lovelace', minutes: 8 },
      { id: 'computing-quantum', kind: 'article', minimumMode: 'deep', title: 'Quantum Computing: Engineering Reality', description: 'Compare classical computing layers with fragile quantum information hardware.', href: '/articles/quantum-computing-after-hype-engineering-reality', minutes: 12 },
      { id: 'computing-whitehead', kind: 'book', minimumMode: 'deep', title: 'Science and the Modern World', description: 'Step back and examine how scientific abstractions reshape culture and technology.', href: '/articles/science-and-the-modern-world', minutes: 20 },
    ],
  },
  {
    id: 'thinking-like-scientist',
    title: 'Thinking Like a Scientist',
    eyebrow: 'Evidence & method',
    description: 'Learn how instruments, proof, collaboration, uncertainty, and replication turn curiosity into dependable knowledge.',
    icon: '🧪',
    color: '#fb7185',
    outcome: 'Evaluate a scientific claim by asking about its evidence, method, uncertainty, and independent checks.',
    reflection: 'Which part of a conclusion comes directly from measurement, and which part comes from interpretation?',
    steps: [
      { id: 'method-teamwork', kind: 'article', minimumMode: 'quick', title: 'Why Breakthroughs Rarely Belong to One Person', description: 'Replace the lone-genius story with the real structure of scientific work.', href: '/articles/why-scientific-breakthroughs-rarely-belong-to-one-person', minutes: 10 },
      { id: 'method-instruments', kind: 'article', minimumMode: 'quick', title: 'How Instruments Changed Knowledge', description: 'See how better tools create new observations—and new sources of error.', href: '/articles/how-instruments-changed-what-science-could-know', minutes: 11 },
      { id: 'method-proof', kind: 'article', minimumMode: 'quick', title: 'Why Proof Is More Than Calculation', description: 'Compare mathematical certainty with evidence-based scientific confidence.', href: '/articles/why-mathematical-proof-is-more-than-calculation', minutes: 10 },
      { id: 'method-faraday', kind: 'scientist', minimumMode: 'full', title: 'Meet Michael Faraday', description: 'Study a career built on careful experiments, visualization, and repeatable demonstrations.', href: '/scientists/michael-faraday', minutes: 8 },
      { id: 'method-candle', kind: 'book', minimumMode: 'full', title: 'The Chemical History of a Candle', description: 'Follow a model of clear experimental teaching using an everyday object.', href: '/articles/the-chemical-history-of-a-candle', minutes: 18 },
      { id: 'method-poincare', kind: 'book', minimumMode: 'deep', title: 'Science and Hypothesis', description: 'Examine conventions, models, geometry, and the assumptions inside explanation.', href: '/articles/science-and-hypothesis-poincare', minutes: 22 },
      { id: 'method-euclid', kind: 'book', minimumMode: 'deep', title: 'Euclid’s Elements', description: 'Read a foundational example of definitions, axioms, and deductive structure.', href: '/articles/euclids-elements-of-geometry', minutes: 24 },
    ],
  },
  {
    id: 'golden-age',
    title: 'The Islamic Golden Age of Science',
    eyebrow: 'History across cultures',
    description: 'Meet scholars who advanced algebra, optics, medicine, astronomy, mechanics, and experimental reasoning.',
    icon: '🌙',
    color: '#fbbf24',
    outcome: 'Recognize scientific history as a connected, multilingual exchange rather than a single-country timeline.',
    reflection: 'How did translation, preservation, criticism, and new experimentation reinforce one another?',
    steps: [
      { id: 'golden-khwarizmi', kind: 'scientist', minimumMode: 'quick', title: 'Al-Khwarizmi: Algebra and Algorithms', description: 'Trace two ideas whose names still shape mathematics and computing.', href: '/scientists/al-khwarizmi', minutes: 8 },
      { id: 'golden-haytham', kind: 'scientist', minimumMode: 'quick', title: 'Ibn al-Haytham: Evidence and Optics', description: 'Study experiments with light, vision, geometry, and controlled observation.', href: '/scientists/ibn-al-haytham', minutes: 8 },
      { id: 'golden-sina', kind: 'scientist', minimumMode: 'quick', title: 'Ibn Sina: Medicine as a System', description: 'Explore synthesis, clinical observation, and the long influence of the Canon.', href: '/scientists/ibn-sina', minutes: 8 },
      { id: 'golden-biruni', kind: 'scientist', minimumMode: 'full', title: 'Al-Biruni: Measuring the World', description: 'Connect astronomy, geodesy, comparison, and remarkably careful measurement.', href: '/scientists/al-biruni', minutes: 8 },
      { id: 'golden-jazari', kind: 'scientist', minimumMode: 'full', title: 'Al-Jazari: Machines and Automation', description: 'See how documented mechanisms turned water, timing, and motion into engineering systems.', href: '/scientists/al-jazari', minutes: 8 },
      { id: 'golden-razi', kind: 'scientist', minimumMode: 'deep', title: 'Al-Razi: Clinical Observation', description: 'Learn how case comparison and practical chemistry informed medical reasoning.', href: '/scientists/al-razi', minutes: 8 },
      { id: 'golden-nafis', kind: 'scientist', minimumMode: 'deep', title: 'Ibn al-Nafis: Pulmonary Circulation', description: 'Study a major anatomical correction built through critical reading and reasoning.', href: '/scientists/ibn-al-nafis', minutes: 8 },
    ],
  },
];

