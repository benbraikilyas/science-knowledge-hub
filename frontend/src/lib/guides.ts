import { DEMO_ARTICLES } from './constants';
import type { ArticleListItem } from './types';

// Editor's-pick reading guides. Each one answers a "what are the best ..." question directly,
// then lists picks from this library and trusted outside sources for comparison.

export interface GuidePick {
  slug: string;
  /** Overrides the shared note when a guide needs a different angle on the same piece. */
  note?: string;
}

export interface GuideSection {
  heading: string;
  picks: GuidePick[];
}

export interface GuideSource {
  name: string;
  href: string;
  note: string;
}

export interface Guide {
  slug: string;
  question: string;
  title: string;
  seoTitle: string;
  description: string;
  answer: string;
  criteria: string[];
  sections: GuideSection[];
  elsewhereHeading: string;
  elsewhere: GuideSource[];
  /** Category pages that send readers to this guide first. */
  categories: string[];
  related: { label: string; href: string }[];
  updatedAt: string;
}

// One note per article or book, reused wherever it is picked.
const NOTES: Record<string, string> = {
  'how-james-webb-space-telescope-reads-early-universe':
    'How infrared instruments, a segmented mirror and a cold orbit let Webb study light that has travelled for billions of years.',
  'how-stars-are-born-live-and-die':
    'From collapse inside a cold cloud to a white dwarf, neutron star or black hole, and why a star’s mass decides the path.',
  'dark-matter-dark-energy-different-mysteries':
    'Two ideas that share a word but not a job: one helps hold cosmic structures together, the other describes the accelerating expansion.',
  'general-relativity-curved-spacetime-working-gps':
    'Gravity as the geometry of spacetime, and why satellite navigation has to correct its clocks for it.',
  'crispr-gene-editing-capabilities-limits':
    'What programmable gene editing can change today, and why delivery, unintended edits, biological complexity and ethics still set the limits.',
  'quantum-entanglement-without-faster-than-light-myth':
    'Why entangled particles show correlations no classical local model can copy, and why that still cannot carry a message faster than light.',
  'how-bell-tests-turned-quantum-debate-into-data':
    'How Bell’s inequality turned an argument about reality into experiments that rule out an important family of hidden-variable explanations.',
  'how-transformer-models-process-language-and-fail':
    'Tokens, attention and next-token prediction, and why fluent output is not the same as verified knowledge or reasoning.',
  'how-semiconductors-turn-physics-into-computing':
    'How engineers steer electrons through patterned materials to build the billions of switches inside every chip.',
  'how-instruments-changed-what-science-could-know':
    'How telescopes, microscopes, clocks, detectors and computers created new kinds of scientific questions, not just better measurements.',
  'why-mathematical-proof-is-more-than-calculation':
    'Why examples can suggest a rule but only a proof shows it holds for every case its assumptions cover.',
  'why-scientific-breakthroughs-rarely-belong-to-one-person':
    'Why discoveries usually grow from instruments, technicians, rival ideas and shared data rather than one lone genius.',
  'apollo-11-engineering-behind-first-moon-landing':
    'Navigation, staged spacecraft, software and mission control: the chain of engineering decisions behind the first crewed Moon landing.',
  'quantum-computing-after-hype-engineering-reality':
    'What useful quantum computers still need: controlled qubits, error correction, suitable algorithms and an honest comparison with classical machines.',
  'webb-confirms-mom-z14-earliest-galaxy-2026':
    'Webb spectroscopy confirms a bright galaxy seen 280 million years after the Big Bang, sharpening questions about how galaxies grew so early.',
  'desi-three-year-results-evolving-dark-energy-2025':
    'A map of more than 14 million galaxies and quasars that fits standard cosmology, yet keeps the evolving-dark-energy question open.',
  'nasa-spherex-launch-all-sky-infrared-survey-2025':
    'A compact observatory that maps the whole sky in 102 infrared colours to study inflation, galaxy light and frozen molecules.',
  'nasa-cadre-cooperative-moon-rovers-2025':
    'Three carry-on-size rovers built to plan, drive in formation and take measurements together on the Moon.',
  'casablanca-morocco-hominin-fossils-773000-years-2026':
    'Securely dated fossils from Thomas Quarry I in Casablanca that sit close to the split between African and Eurasian human lineages.',
  'personalized-base-editing-infant-cps1-deficiency-2025':
    'How a team designed and delivered a CRISPR base editor for a single infant, and what that means for bespoke genetic medicine.',
  'microns-mouse-visual-cortex-connectome-2025':
    'A cubic millimetre of mouse brain where the wiring seen by electron microscopy is matched to recorded activity from tens of thousands of neurons.',
  'beyond-epica-antarctic-oldest-ice-core-2025':
    'A 2,800-metre Antarctic core that may extend the continuous ice-core climate record to about 1.2 million years.',
  'alice-lead-to-gold-lhc-nuclear-transmutation-2025':
    'How near-miss collisions of lead nuclei at the LHC briefly create gold, and why that makes a precise test for physicists.',
  'deepseek-r1-open-weight-reasoning-model-2025':
    'How reinforcement learning on tasks with checkable answers produced an open-weight reasoning model, and the evaluation questions it left open.',
  'gemini-2-5-thinking-model-reasoning-2025':
    'What a “thinking” model is, and the cost, speed and reliability trade-offs that come with deliberate reasoning.',
  'claude-4-long-running-ai-agents-coding-2025':
    'Why frontier models shifted toward long-running agents that write code, use tools and keep memory, and the safety decisions that came with them.',
  'gpt-5-5-agentic-work-computer-use-safety-2026':
    'Multi-step computer work and research, and why its developer classified the model’s cyber and biological capabilities as High.',
  'model-hardware-standard-ai-agents-physical-equipment-2026':
    'A proposed common interface that lets AI agents discover and operate programmable laboratory instruments.',
  'llama-4-open-weight-multimodal-mixture-experts-2025':
    'Mixture-of-experts design and native image input explained, plus the licensing and hardware limits of downloadable weights.',
  'meta-muse-spark-multimodal-multi-agent-model-2026':
    'Multimodal reasoning with several agents working in parallel, released with a revised scaling framework and a public safety report.',
  'alphaevolve-ai-agent-algorithm-discovery-2025':
    'How model-written code, automated evaluators and evolutionary search found new algorithms in areas where answers can be checked.',
  'weathernext-3-hourly-global-ai-weather-forecasting-2026':
    'AI weather forecasting that ingests near-real-time satellite data, and the uncertainty and warning limits it keeps.',
  'eu-ai-act-general-purpose-ai-model-rules-2025':
    'What the EU now requires from general-purpose AI providers: documentation, copyright rules, training-content summaries and extra risk controls.',
  'the-chemical-history-of-a-candle':
    'Faraday’s Royal Institution lectures that use a burning candle to explain combustion, respiration and the chemistry of air.',
  'relativity-the-special-and-general-theory':
    'Einstein’s own account of special and general relativity, written for curious readers without advanced mathematics.',
  'astronomy-for-amateurs':
    'Flammarion’s warm guide to the constellations, the Moon’s landscape and the planets for anyone with a night sky.',
  'the-voyage-of-the-beagle':
    'Darwin’s field journal of rocks, wildlife and people from the voyage that shaped his thinking, and the easiest way into Darwin.',
  'on-the-origin-of-species':
    'The 1859 book that set out evolution by natural selection, argued from a mass of observations.',
  'sidereus-nuncius-starry-messenger':
    'Galileo’s 1610 report of what his telescope revealed: mountains on the Moon, countless new stars and four moons circling Jupiter.',
  'philosophiae-naturalis-principia-mathematica':
    'Newton’s laws of motion and universal gravitation. Demanding to read, but worth seeing in the original.',
  'opticks-treatise-of-light-colour':
    'Newton’s prism experiments showing that white light is a mixture of colours, written in English rather than Latin.',
  'euclids-elements-of-geometry':
    'The model for proof-based mathematics for more than two thousand years.',
  'the-theory-of-heat-radiation':
    'Planck’s treatment of thermal radiation and the problem that led to the quantum of action. For readers comfortable with equations.',
  'theory-of-spectra-and-atomic-constitution':
    'Three essays from the early years of quantum theory that link the structure of atoms to their spectral lines.',
  'science-and-hypothesis':
    'Poincaré asks which parts of science are experimental fact, which are convention and which are hypothesis.',
  'a-field-book-of-the-stars':
    'A practical constellation guide for finding stars and seasonal patterns without special equipment.',
  'a-short-history-of-astronomy':
    'How astronomy grew from Babylonian sky-watching to Victorian astrophysics.',
  'the-descent-of-man':
    'Darwin applies evolution to human origins and develops his theory of sexual selection.',
  'mans-place-in-nature-and-other-essays':
    'Huxley’s essays on anatomy and fossils that brought human origins into public debate.',
  'on-growth-and-form':
    'How geometry, scaling and physical forces help shape living things.',
};

const pick = (slug: string, note?: string): GuidePick => ({ slug, note });

type ArticleRecord = ArticleListItem & { bookDetails?: unknown };

const ARTICLES_BY_SLUG = new Map(
  (DEMO_ARTICLES as ArticleRecord[]).map((article) => [article.slug, article])
);

const BOOK_COUNT = [...ARTICLES_BY_SLUG.values()].filter((article) => article.category.slug === 'books').length;

export const GUIDES: Guide[] = [
  {
    slug: 'best-science-articles',
    question: 'What are the best science articles?',
    title: 'The Best Science Articles to Read First',
    seoTitle: 'Best Science Articles to Read First: Editor’s Picks',
    description:
      'Our editors’ picks of the clearest science articles, from JWST and CRISPR to quantum entanglement, plus trusted science magazines to read next.',
    answer:
      'The best science articles explain how we know something, not just what was found. Start with these four: how the James Webb Space Telescope reads the early universe, why dark matter and dark energy are different mysteries, what CRISPR can and cannot change, and why quantum entanglement does not allow faster-than-light messages. Each takes about ten minutes and is built on named sources. When you want more, the trusted magazines at the end of this guide are good next steps.',
    criteria: [
      'Explains the evidence and the method, not only the headline.',
      'Says plainly what the science does not show yet.',
      'Readable in about ten minutes without a science degree.',
      'Built on named sources you can check yourself.',
    ],
    sections: [
      {
        heading: 'Start here: explainers for any curious reader',
        picks: [
          pick('how-james-webb-space-telescope-reads-early-universe'),
          pick('dark-matter-dark-energy-different-mysteries'),
          pick('crispr-gene-editing-capabilities-limits'),
          pick('quantum-entanglement-without-faster-than-light-myth'),
          pick('how-transformer-models-process-language-and-fail'),
        ],
      },
      {
        heading: 'Go deeper: how science actually works',
        picks: [
          pick('general-relativity-curved-spacetime-working-gps'),
          pick('how-bell-tests-turned-quantum-debate-into-data'),
          pick('why-mathematical-proof-is-more-than-calculation'),
          pick('why-scientific-breakthroughs-rarely-belong-to-one-person'),
        ],
      },
      {
        heading: 'Recent discoveries worth your time',
        picks: [
          pick('webb-confirms-mom-z14-earliest-galaxy-2026'),
          pick('casablanca-morocco-hominin-fossils-773000-years-2026'),
          pick('desi-three-year-results-evolving-dark-energy-2025'),
          pick('beyond-epica-antarctic-oldest-ice-core-2025'),
        ],
      },
    ],
    elsewhereHeading: 'Other trusted places to read science',
    elsewhere: [
      { name: 'Quanta Magazine', href: 'https://www.quantamagazine.org/', note: 'Long, careful stories on mathematics, physics, biology and computer science, published by the Simons Foundation.' },
      { name: 'Knowable Magazine', href: 'https://knowablemagazine.org/', note: 'Research explained for general readers by the nonprofit publisher Annual Reviews.' },
      { name: 'Nature News', href: 'https://www.nature.com/news', note: 'News and analysis from one of the oldest scientific journals, published since 1869.' },
      { name: 'NASA Science', href: 'https://science.nasa.gov/', note: 'Mission updates and space science explainers directly from NASA.' },
      { name: 'The Conversation', href: 'https://theconversation.com/', note: 'Articles written by researchers and edited by journalists.' },
    ],
    categories: [],
    related: [
      { label: 'All science articles', href: '/articles' },
      { label: 'Guided learning paths', href: '/learn' },
      { label: 'Free science books', href: '/categories/books' },
    ],
    updatedAt: '2026-10-31',
  },
  {
    slug: 'best-ai-explainers',
    question: 'What are the best artificial intelligence explainers?',
    title: 'The Best Artificial Intelligence Explainers',
    seoTitle: 'Best AI Explainers: How Modern AI Actually Works',
    description:
      'A reading order for understanding modern AI: how transformers work, what reasoning models and agents are, open weights, AI in science, and the rules.',
    answer:
      'Start with how transformer models process language, because most of today’s chatbots are built on them. Then read about reasoning models (DeepSeek-R1, Gemini 2.5), agents (Claude 4, GPT-5.5) and open-weight models (Llama 4), so you can tell what each wave changed and what it did not. For free hands-on learning beyond this site, Jay Alammar’s Illustrated Transformer and 3Blue1Brown’s neural network videos are two of the clearest starting points.',
    criteria: [
      'Explains the mechanism, not just the product launch.',
      'Separates what a system was shown to do from what was claimed.',
      'Names the limits: cost, reliability, licensing and safety.',
    ],
    sections: [
      {
        heading: '1. The foundation: how language models work',
        picks: [
          pick('how-transformer-models-process-language-and-fail'),
          pick('how-semiconductors-turn-physics-into-computing', 'The hardware underneath AI: how engineers steer electrons through patterned materials to build the billions of switches in every chip.'),
        ],
      },
      {
        heading: '2. Reasoning models: AI that works through problems',
        picks: [
          pick('deepseek-r1-open-weight-reasoning-model-2025'),
          pick('gemini-2-5-thinking-model-reasoning-2025'),
        ],
      },
      {
        heading: '3. Agents: AI that uses tools and computers',
        picks: [
          pick('claude-4-long-running-ai-agents-coding-2025'),
          pick('gpt-5-5-agentic-work-computer-use-safety-2026'),
          pick('model-hardware-standard-ai-agents-physical-equipment-2026'),
        ],
      },
      {
        heading: '4. Open weights and model design',
        picks: [
          pick('llama-4-open-weight-multimodal-mixture-experts-2025'),
          pick('meta-muse-spark-multimodal-multi-agent-model-2026'),
        ],
      },
      {
        heading: '5. AI in science, and the rules around it',
        picks: [
          pick('alphaevolve-ai-agent-algorithm-discovery-2025'),
          pick('weathernext-3-hourly-global-ai-weather-forecasting-2026'),
          pick('eu-ai-act-general-purpose-ai-model-rules-2025'),
        ],
      },
    ],
    elsewhereHeading: 'Free AI explainers beyond this site',
    elsewhere: [
      { name: 'The Illustrated Transformer', href: 'https://jalammar.github.io/illustrated-transformer/', note: 'Jay Alammar’s visual, step-by-step walk through the transformer architecture.' },
      { name: '3Blue1Brown: Neural networks', href: 'https://www.3blue1brown.com/topics/neural-networks', note: 'Animated lessons from basic neural networks up to attention in transformers.' },
      { name: 'Google Machine Learning Crash Course', href: 'https://developers.google.com/machine-learning/crash-course', note: 'A free course with interactive exercises on core machine-learning ideas.' },
      { name: 'Neural Networks: Zero to Hero', href: 'https://karpathy.ai/zero-to-hero.html', note: 'Andrej Karpathy builds neural networks, then a small GPT, in code.' },
      { name: 'Attention Is All You Need', href: 'https://arxiv.org/abs/1706.03762', note: 'The 2017 paper that introduced the transformer, for readers who want the original.' },
    ],
    categories: ['artificial-intelligence'],
    related: [
      { label: 'All AI articles', href: '/categories/artificial-intelligence' },
      { label: 'Robotics articles', href: '/categories/robotics' },
      { label: 'Guided learning paths', href: '/learn' },
    ],
    updatedAt: '2026-10-31',
  },
  {
    slug: 'best-free-science-books',
    question: 'What are the best free science books?',
    title: 'The Best Free Science Books to Read Online',
    seoTitle: 'Best Free Science Books to Read Online, Legally',
    description:
      `Our picks from ${BOOK_COUNT} public-domain science classics by Darwin, Newton, Einstein, Faraday and Galileo, each with a free, legal edition to read online.`,
    answer:
      'The best free science books are the classics written by the scientists themselves, now in the public domain in the United States. Begin with Faraday’s The Chemical History of a Candle or Einstein’s Relativity: The Special and General Theory, both written for general readers. Then read Darwin’s On the Origin of Species and Galileo’s Starry Messenger to see great ideas argued from the original evidence. Every pick below links to a guide with a free, legal copy from Project Gutenberg or the Internet Archive.',
    criteria: [
      'Written by the scientist behind the idea, or by one of its great explainers.',
      'Still readable today. We flag the demanding ones.',
      'Free and legal: public domain in the United States, with editions hosted by Project Gutenberg or the Internet Archive. Copyright terms differ by country, so readers elsewhere should check local rules.',
    ],
    sections: [
      {
        heading: 'Easy first reads',
        picks: [
          pick('the-chemical-history-of-a-candle'),
          pick('relativity-the-special-and-general-theory'),
          pick('astronomy-for-amateurs'),
          pick('the-voyage-of-the-beagle'),
        ],
      },
      {
        heading: 'Classics that changed science',
        picks: [
          pick('on-the-origin-of-species'),
          pick('sidereus-nuncius-starry-messenger'),
          pick('opticks-treatise-of-light-colour'),
          pick('philosophiae-naturalis-principia-mathematica'),
          pick('euclids-elements-of-geometry'),
        ],
      },
      {
        heading: 'For readers who want a challenge',
        picks: [
          pick('science-and-hypothesis'),
          pick('theory-of-spectra-and-atomic-constitution'),
          pick('the-theory-of-heat-radiation'),
        ],
      },
    ],
    elsewhereHeading: 'More places to find free science books',
    elsewhere: [
      { name: 'Project Gutenberg', href: 'https://www.gutenberg.org/', note: 'Free public-domain ebooks in several formats, including many science classics.' },
      { name: 'Internet Archive', href: 'https://archive.org/', note: 'Scans of historic books, often with the original illustrations and plates.' },
      { name: 'Biodiversity Heritage Library', href: 'https://www.biodiversitylibrary.org/', note: 'Free natural-history and biology literature, from field guides to Darwin’s contemporaries.' },
      { name: 'OpenStax', href: 'https://openstax.org/', note: 'Free, peer-reviewed modern textbooks in physics, chemistry, biology and astronomy, if you want today’s science rather than the classics.' },
    ],
    categories: ['books'],
    related: [
      { label: 'All free science books', href: '/categories/books' },
      { label: 'Guided learning paths', href: '/learn' },
      { label: 'Science articles', href: '/articles' },
    ],
    updatedAt: '2026-10-31',
  },
  {
    slug: 'best-space-astronomy-articles',
    question: 'What are the best space and astronomy articles?',
    title: 'The Best Space and Astronomy Articles',
    seoTitle: 'Best Space and Astronomy Articles for Curious Readers',
    description:
      'Clear space and astronomy reads: how JWST sees the early universe, how stars live and die, dark energy, Apollo 11, and the newest Webb galaxy record.',
    answer:
      'For a strong start in space science, read how the James Webb Space Telescope reads the early universe, then how stars are born, live and die. Together they cover the evidence astronomers collect and the physics behind it. After that, choose by interest: cosmology (dark matter and dark energy, the DESI map), missions and engineering (Apollo 11, SPHEREx) or the latest record-breaking galaxy, MoM-z14.',
    criteria: [
      'Shows how astronomers know, from light and instruments to models.',
      'Separates confirmed results from open questions.',
      'Mixes timeless explainers with the most important recent results.',
    ],
    sections: [
      {
        heading: 'Start here',
        picks: [
          pick('how-james-webb-space-telescope-reads-early-universe'),
          pick('how-stars-are-born-live-and-die'),
          pick('dark-matter-dark-energy-different-mysteries'),
          pick('general-relativity-curved-spacetime-working-gps'),
        ],
      },
      {
        heading: 'Missions and engineering',
        picks: [
          pick('apollo-11-engineering-behind-first-moon-landing'),
          pick('nasa-spherex-launch-all-sky-infrared-survey-2025'),
          pick('nasa-cadre-cooperative-moon-rovers-2025'),
        ],
      },
      {
        heading: 'New results',
        picks: [
          pick('webb-confirms-mom-z14-earliest-galaxy-2026'),
          pick('desi-three-year-results-evolving-dark-energy-2025'),
        ],
      },
      {
        heading: 'Free classic astronomy books',
        picks: [
          pick('sidereus-nuncius-starry-messenger'),
          pick('a-field-book-of-the-stars'),
          pick('a-short-history-of-astronomy'),
        ],
      },
    ],
    elsewhereHeading: 'Other trusted space sources',
    elsewhere: [
      { name: 'NASA Science', href: 'https://science.nasa.gov/', note: 'Mission news, images and explainers directly from NASA.' },
      { name: 'ESA/Webb', href: 'https://esawebb.org/', note: 'Webb images and science releases from the European Space Agency.' },
      { name: 'Astronomy Picture of the Day', href: 'https://apod.nasa.gov/apod/', note: 'A new image of the universe every day, explained by a professional astronomer.' },
    ],
    categories: ['space', 'astronomy', 'space-missions'],
    related: [
      { label: 'Space articles', href: '/categories/space' },
      { label: 'Astronomy articles', href: '/categories/astronomy' },
      { label: 'Space mission articles', href: '/categories/space-missions' },
    ],
    updatedAt: '2026-10-31',
  },
  {
    slug: 'best-quantum-physics-explainers',
    question: 'What are the best quantum physics explainers?',
    title: 'The Best Quantum Physics Explainers',
    seoTitle: 'Best Quantum Physics Explainers Without the Myths',
    description:
      'Quantum physics without the hype: entanglement, Bell tests, quantum computing’s real limits and the chips it powers, plus Planck and Bohr in their own words.',
    answer:
      'Start with quantum entanglement without the faster-than-light myth, because it fixes the most common misunderstanding. Then read how Bell tests turned a debate about reality into data, and quantum computing after the hype for what today’s machines can and cannot do. For where the quantum idea began, Planck’s The Theory of Heat Radiation and Bohr’s essays on atomic spectra are free to read.',
    criteria: [
      'Corrects popular myths instead of repeating them.',
      'Explains the experiments behind the claims.',
      'Keeps the maths optional, with books for readers who want it.',
    ],
    sections: [
      {
        heading: 'Start here',
        picks: [
          pick('quantum-entanglement-without-faster-than-light-myth'),
          pick('how-bell-tests-turned-quantum-debate-into-data'),
          pick('quantum-computing-after-hype-engineering-reality'),
        ],
      },
      {
        heading: 'Quantum physics at work',
        picks: [
          pick('how-semiconductors-turn-physics-into-computing', 'How the quantum behaviour of electrons in materials makes every computer chip possible.'),
          pick('distributed-quantum-computing-optical-link-2025', 'Two separate trapped-ion processors linked by light to run one small algorithm, a modular route to bigger quantum computers.'),
        ],
      },
      {
        heading: 'Where it began: free classic books',
        picks: [
          pick('the-theory-of-heat-radiation'),
          pick('theory-of-spectra-and-atomic-constitution'),
        ],
      },
    ],
    elsewhereHeading: 'Other good quantum explainers',
    elsewhere: [
      { name: 'Quantum Country', href: 'https://quantum.country/', note: 'Andy Matuschak and Michael Nielsen’s free essays on quantum computing, with built-in review questions.' },
      { name: 'Quanta Magazine: Physics', href: 'https://www.quantamagazine.org/physics/', note: 'In-depth reporting on new results in quantum and fundamental physics.' },
    ],
    categories: ['quantum-physics', 'physics'],
    related: [
      { label: 'Quantum physics articles', href: '/categories/quantum-physics' },
      { label: 'Physics articles', href: '/categories/physics' },
      { label: 'Guided learning paths', href: '/learn' },
    ],
    updatedAt: '2026-10-31',
  },
  {
    slug: 'best-biology-evolution-articles',
    question: 'What are the best biology and evolution articles?',
    title: 'The Best Biology and Evolution Articles',
    seoTitle: 'Best Biology and Evolution Articles, Plus Free Classics',
    description:
      'Biology and evolution picks: what CRISPR can and cannot do, a custom gene therapy for one infant, brain mapping, 773,000-year-old fossils and Darwin, free.',
    answer:
      'Read CRISPR gene editing: what it can change and what it cannot first; it is the clearest way into modern biology. Then pick by interest: personalised gene therapy, brain mapping (MICrONS) or human origins (the Casablanca fossils). For evolution itself, nothing beats Darwin’s On the Origin of Species, free to read online, with The Voyage of the Beagle as the gentler way in.',
    criteria: [
      'Explains the biology behind the headline.',
      'Is clear about limits, risks and open questions.',
      'Connects new findings with the classic texts of evolution.',
    ],
    sections: [
      {
        heading: 'Start here',
        picks: [
          pick('crispr-gene-editing-capabilities-limits'),
          pick('personalized-base-editing-infant-cps1-deficiency-2025'),
        ],
      },
      {
        heading: 'New discoveries',
        picks: [
          pick('casablanca-morocco-hominin-fossils-773000-years-2026'),
          pick('microns-mouse-visual-cortex-connectome-2025'),
        ],
      },
      {
        heading: 'Evolution in the original: free classics',
        picks: [
          pick('on-the-origin-of-species'),
          pick('the-voyage-of-the-beagle'),
          pick('the-descent-of-man'),
          pick('mans-place-in-nature-and-other-essays'),
          pick('on-growth-and-form'),
        ],
      },
    ],
    elsewhereHeading: 'Other trusted biology sources',
    elsewhere: [
      { name: 'Understanding Evolution', href: 'https://evolution.berkeley.edu/', note: 'A free evolution primer from the University of California Museum of Paleontology.' },
      { name: 'Darwin Online', href: 'https://darwin-online.org.uk/', note: 'Darwin’s complete publications and many of his manuscripts, free to read.' },
      { name: 'Khan Academy Biology', href: 'https://www.khanacademy.org/science/biology', note: 'Free lessons and practice questions from cells to ecology.' },
    ],
    categories: ['biology'],
    related: [
      { label: 'Biology articles', href: '/categories/biology' },
      { label: 'Free science books', href: '/categories/books' },
      { label: 'Guided learning paths', href: '/learn' },
    ],
    updatedAt: '2026-10-31',
  },
];

export function getGuide(slug: string) {
  const guide = GUIDES.find((item) => item.slug === slug);
  if (!guide) return null;

  let position = 0;
  return {
    ...guide,
    sections: guide.sections.map((section) => ({
      heading: section.heading,
      picks: section.picks.map(({ slug: pickSlug, note }) => {
        const article = ARTICLES_BY_SLUG.get(pickSlug);
        const text = note ?? NOTES[pickSlug];
        // Fail the build rather than publish a guide with a dead link or an empty note.
        if (!article) throw new Error(`Guide "${slug}" picks missing article "${pickSlug}"`);
        if (!text) throw new Error(`Guide "${slug}" has no note for "${pickSlug}"`);
        position += 1;
        return {
          position,
          slug: pickSlug,
          title: article.title,
          note: text,
          readTime: article.readTime,
          category: article.category,
          isBook: article.category.slug === 'books',
          author: article.author.displayName,
        };
      }),
    })),
  };
}

export function guidesForCategory(categorySlug: string) {
  return GUIDES.filter((guide) => guide.categories.includes(categorySlug));
}
