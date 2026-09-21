// ===================================================================
// Science Knowledge Hub — Free & Legal Public Domain Science Books
// Curated from Project Gutenberg and Internet Archive public-access editions.
// Copyright status can vary by jurisdiction, so each record links to its source.
// ===================================================================

import { GUTENBERG_BOOK_SPECS } from './gutenberg-books';

export interface BookDetails {
  originalAuthor: string;
  firstPublished: number | string;
  pages: number;
  subjects: string[];
  license: string;
  readOnlineUrl: string;
  downloadPdfUrl?: string;
  downloadEpubUrl?: string;
  iaDetailsUrl?: string;
  archiveName?: string;
}

export interface ScienceBook {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  thumbnail?: string;
  category: {
    id: string;
    name: string;
    slug: string;
    color: string;
    icon: string;
  };
  author: {
    id: string;
    displayName: string;
    avatar?: string;
  };
  tags: string[];
  readTime: number;
  isFeatured: boolean;
  viewsCount: number;
  likesCount: number;
  publishedAt: string;
  bookDetails: BookDetails;
}

const ARCHIVE_BOOKS: ScienceBook[] = [
  {
    id: 'book-1',
    title: 'On the Origin of Species',
    slug: 'on-the-origin-of-species',
    excerpt: 'Charles Darwin’s epochal masterpiece introducing the theory of evolution through natural selection — the bedrock of modern biological science.',
    featuredImage: 'https://archive.org/services/img/originofspeciesb00darw_0',
    thumbnail: 'https://archive.org/services/img/originofspeciesb00darw_0',
    category: {
      id: '12',
      name: 'Books',
      slug: 'books',
      color: '#818cf8',
      icon: '📚',
    },
    author: {
      id: 'charles-darwin',
      displayName: 'Charles Darwin',
      avatar: '/images/scientists/charles-darwin.webp',
    },
    tags: ['Biology', 'Evolution', 'Natural Selection', 'Darwin', 'Classics'],
    readTime: 25,
    isFeatured: false,
    viewsCount: 1420,
    likesCount: 384,
    publishedAt: '2024-12-18T10:00:00Z',
    bookDetails: {
      originalAuthor: 'Charles Darwin, M.A.',
      firstPublished: 1859,
      pages: 502,
      subjects: ['Evolutionary Biology', 'Natural Selection', 'Genetics Origins', 'Biodiversity'],
      license: 'Public-domain archive edition — free access; verify local copyright rules.',
      readOnlineUrl: 'https://archive.org/details/originofspeciesb00darw_0/mode/2up',
      downloadPdfUrl: 'https://archive.org/download/originofspeciesb00darw_0/originofspeciesb00darw_0.pdf',
      downloadEpubUrl: 'https://archive.org/download/originofspeciesb00darw_0/originofspeciesb00darw_0.epub',
      iaDetailsUrl: 'https://archive.org/details/originofspeciesb00darw_0',
    },
    content: `Published on 24 November 1859, On the Origin of Species by Means of Natural Selection is considered the foundation of evolutionary biology. Darwin introduced the revolutionary scientific idea that populations evolve over generations through natural selection.

Drawing from his historic five-year voyage aboard HMS Beagle — particularly his meticulous observations of finches and tortoises in the Galápagos archipelago — Darwin presented comprehensive empirical evidence that the diversity of life arose by common descent through a branching pattern of evolution.

The book provoked immediate international debate across scientific, philosophical, and theological spheres. Darwin rigorously anticipated counter-arguments, dedicating entire chapters to difficulties on theory, hybridism, the imperfection of the geological record, and geographical distribution.

Today, Darwinian natural selection forms the central unifying paradigm of all life sciences. From evolutionary biology and immunology to machine learning genetic algorithms, the core insights of this work continue to steer scientific progress.`,
  },
  {
    id: 'book-2',
    title: 'Philosophiæ Naturalis Principia Mathematica',
    slug: 'philosophiae-naturalis-principia-mathematica',
    excerpt: 'Sir Isaac Newton’s monumental treatise formulating the three laws of motion and universal gravitation, establishing classical physics for centuries.',
    featuredImage: 'https://archive.org/services/img/philosophiaenatu00newt',
    thumbnail: 'https://archive.org/services/img/philosophiaenatu00newt',
    category: {
      id: '12',
      name: 'Books',
      slug: 'books',
      color: '#818cf8',
      icon: '📚',
    },
    author: {
      id: 'isaac-newton',
      displayName: 'Isaac Newton',
      avatar: '/images/scientists/newton.webp',
    },
    tags: ['Physics', 'Newton', 'Classical Mechanics', 'Gravitation', 'Calculus'],
    readTime: 30,
    isFeatured: false,
    viewsCount: 1890,
    likesCount: 512,
    publishedAt: '2024-12-16T12:00:00Z',
    bookDetails: {
      originalAuthor: 'Sir Isaac Newton',
      firstPublished: 1687,
      pages: 591,
      subjects: ['Classical Mechanics', 'Celestial Gravitation', 'Fluid Dynamics', 'Calculus'],
      license: 'Public-domain archive edition — free access; verify local copyright rules.',
      readOnlineUrl: 'https://archive.org/details/philosophiaenatu00newt/mode/2up',
      downloadPdfUrl: 'https://archive.org/download/philosophiaenatu00newt/philosophiaenatu00newt.pdf',
      downloadEpubUrl: 'https://archive.org/download/philosophiaenatu00newt/philosophiaenatu00newt.epub',
      iaDetailsUrl: 'https://archive.org/details/philosophiaenatu00newt',
    },
    content: `First published on 5 July 1687, the Principia Mathematica is universally celebrated as the most influential publication in the history of physical science. Newton stated his three fundamental laws of motion: the law of inertia, force equals mass times acceleration (F=ma), and the law of reciprocal action and reaction.

In the third volume, "The System of the World," Newton demonstrated that the very force causing an apple to fall to the earth also holds the Moon in its orbit and governs the motions of all planets and comets around the Sun — thereby creating the first mathematical unification of terrestrial and celestial physics.

The work also pioneered the mathematical foundation of infinitesimal calculus (described through geometric proportions) and derived Johannes Kepler’s empirical laws of planetary motion from first mathematical principles.

Newton’s classical physics proved so profoundly accurate that it remains the engineering backbone behind modern architecture, aviation, ballistics, and orbital satellite trajectory design.`,
  },
  {
    id: 'book-3',
    title: 'Relativity: The Special and General Theory',
    slug: 'relativity-the-special-and-general-theory',
    excerpt: 'Albert Einstein’s own accessible exposition of special and general relativity, crafted for readers curious about the spacetime universe without advanced mathematics.',
    featuredImage: 'https://archive.org/services/img/cu31924011804774',
    thumbnail: 'https://archive.org/services/img/cu31924011804774',
    category: {
      id: '12',
      name: 'Books',
      slug: 'books',
      color: '#818cf8',
      icon: '📚',
    },
    author: {
      id: 'albert-einstein',
      displayName: 'Albert Einstein',
      avatar: '/images/scientists/einstein.webp',
    },
    tags: ['Physics', 'Relativity', 'Einstein', 'Spacetime', 'Quantum'],
    readTime: 18,
    isFeatured: false,
    viewsCount: 2310,
    likesCount: 680,
    publishedAt: '2024-12-14T09:30:00Z',
    bookDetails: {
      originalAuthor: 'Albert Einstein, Ph.D.',
      firstPublished: 1916,
      pages: 168,
      subjects: ['Theoretical Physics', 'Special Relativity', 'General Relativity', 'Cosmology'],
      license: 'Public-domain archive edition — free access; verify local copyright rules.',
      readOnlineUrl: 'https://archive.org/details/cu31924011804774/mode/2up',
      downloadPdfUrl: 'https://archive.org/download/cu31924011804774/cu31924011804774.pdf',
      downloadEpubUrl: 'https://archive.org/download/cu31924011804774/cu31924011804774.epub',
      iaDetailsUrl: 'https://archive.org/details/cu31924011804774',
    },
    content: `Written by Albert Einstein in 1916 and translated into English by Robert W. Lawson in 1920, this book was expressly intended for anyone who, from a general scientific viewpoint, is interested in the theory of relativity but lacks the apparatus of theoretical physics.

In Part I, Einstein outlines Special Relativity: the constancy of the speed of light in all inertial reference frames, the relativity of simultaneity, Lorentz transformations, time dilation, length contraction, and the equivalence of mass and energy embodied in E=mc².

In Part II, Einstein transitions to General Relativity, replacing Newton’s mechanical attraction with the geometric curvature of four-dimensional spacetime caused by mass and energy. The famous thought experiments of the accelerating elevator and gravity bending light beams are articulated in crystal clarity.

Part III concludes with reflections on the universe as a whole, introducing relativistic cosmology and the geometry of finite yet unbounded space.`,
  },
  {
    id: 'book-4',
    title: 'Sidereus Nuncius (The Starry Messenger)',
    slug: 'sidereus-nuncius-starry-messenger',
    excerpt: 'Galileo Galilei’s 1610 astronomical revelation — the very first scientific observations made through a telescope, shattering geocentric cosmology.',
    featuredImage: 'https://archive.org/services/img/siderealnuncioso00gali',
    thumbnail: 'https://archive.org/services/img/siderealnuncioso00gali',
    category: {
      id: '12',
      name: 'Books',
      slug: 'books',
      color: '#818cf8',
      icon: '📚',
    },
    author: {
      id: 'galileo-galilei',
      displayName: 'Galileo Galilei',
      avatar: '/images/scientists/galileo-galilei.webp',
    },
    tags: ['Astronomy', 'Galileo', 'Telescopes', 'Jupiter', 'Space Missions'],
    readTime: 12,
    isFeatured: false,
    viewsCount: 1120,
    likesCount: 295,
    publishedAt: '2024-12-12T14:15:00Z',
    bookDetails: {
      originalAuthor: 'Galileo Galilei',
      firstPublished: 1610,
      pages: 118,
      subjects: ['Observational Astronomy', 'Lunar Topography', 'Moons of Jupiter', 'Milky Way'],
      license: 'Public-domain archive edition — free access; verify local copyright rules.',
      readOnlineUrl: 'https://archive.org/details/siderealnuncioso00gali/mode/2up',
      downloadPdfUrl: 'https://archive.org/download/siderealnuncioso00gali/siderealnuncioso00gali.pdf',
      downloadEpubUrl: 'https://archive.org/download/siderealnuncioso00gali/siderealnuncioso00gali.epub',
      iaDetailsUrl: 'https://archive.org/details/siderealnuncioso00gali',
    },
    content: `Published in Venice in March 1610, Sidereus Nuncius (The Starry Messenger) was the opening salvo of modern observational astronomy. Upon polishing his own convex and concave lenses to achieve roughly 20x magnification, Galileo turned his spyglass skyward.

He announced three epochal discoveries:
1. The Moon is not a smooth, crystalline Aristotelian sphere, but rugged, scarred with deep craters and towering mountain ranges whose heights Galileo measured using shadow trigonometry.
2. The nebulous glow of the Milky Way is in reality an immense congregation of countless individual stars invisible to the unaided eye.
3. Four companion bodies orbit the planet Jupiter — the Galilean moons (Io, Europa, Ganymede, and Callisto) — delivering decisive proof that heavenly bodies can and do orbit centers other than Earth.

This brief treatise completely upended the thousand-year Ptolemaic dogma and furnished indispensable physical confirmation for Nicolaus Copernicus’s heliocentric model.`,
  },
  {
    id: 'book-5',
    title: 'Euclid’s Elements of Geometry',
    slug: 'euclids-elements-of-geometry',
    excerpt: 'The most enduring mathematical textbook of all human civilization, establishing rigorous deductive reasoning, geometric proofs, and prime number theory.',
    featuredImage: 'https://archive.org/services/img/thirteenbooksofeuclid01euclrich',
    thumbnail: 'https://archive.org/services/img/thirteenbooksofeuclid01euclrich',
    category: {
      id: '12',
      name: 'Books',
      slug: 'books',
      color: '#818cf8',
      icon: '📚',
    },
    author: {
      id: 'euclid-alexandria',
      displayName: 'Euclid of Alexandria',
    },
    tags: ['Mathematics', 'Geometry', 'Euclid', 'Proofs', 'Number Theory'],
    readTime: 28,
    isFeatured: false,
    viewsCount: 1670,
    likesCount: 440,
    publishedAt: '2024-12-10T11:00:00Z',
    bookDetails: {
      originalAuthor: 'Euclid of Alexandria (trans. Sir Thomas L. Heath)',
      firstPublished: 'c. 300 BCE',
      pages: 527,
      subjects: ['Plane Geometry', 'Incommensurable Ratios', 'Prime Number Theory', 'Solid Geometry'],
      license: 'Public-domain archive edition — free access; verify local copyright rules.',
      readOnlineUrl: 'https://archive.org/details/thirteenbooksofeuclid01euclrich/mode/2up',
      downloadPdfUrl: 'https://archive.org/download/thirteenbooksofeuclid01euclrich/thirteenbooksofeuclid01euclrich.pdf',
      downloadEpubUrl: 'https://archive.org/download/thirteenbooksofeuclid01euclrich/thirteenbooksofeuclid01euclrich.epub',
      iaDetailsUrl: 'https://archive.org/details/thirteenbooksofeuclid01euclrich',
    },
    content: `Compiled around 300 BCE in Alexandria, Euclid’s Elements is second only to the Bible in the total number of editions published, printed, and studied across world history. It formulated the deductive axiomatic methodology that governs modern mathematics and computer logic.

Starting from just five fundamental postulates (such as the famous Parallel Postulate) and five common notions, Euclid systematically built 465 propositions with watertight geometric proofs.

Beyond plane and solid geometry, Books VII through IX establish foundational number theory: the Euclidean algorithm for greatest common divisors, the fundamental theorem of arithmetic, and the celebrated proof of the infinitude of prime numbers.

Philosophers, scientists, and statesmen — including Spinoza, Newton, Abraham Lincoln, and Bertrand Russell — credited Euclid with teaching them how to construct rigorous, irrefutable logical arguments.`,
  },
  {
    id: 'book-6',
    title: 'The Chemical History of a Candle',
    slug: 'the-chemical-history-of-a-candle',
    excerpt: 'Michael Faraday’s celebrated Royal Institution lecture series using a burning candle to explain combustion, respiration, and atmospheric chemistry.',
    featuredImage: 'https://archive.org/services/img/chemicalhistoryo00faraiala',
    thumbnail: 'https://archive.org/services/img/chemicalhistoryo00faraiala',
    category: {
      id: '12',
      name: 'Books',
      slug: 'books',
      color: '#818cf8',
      icon: '📚',
    },
    author: {
      id: 'michael-faraday',
      displayName: 'Michael Faraday',
      avatar: '/images/scientists/michael-faraday.webp',
    },
    tags: ['Chemistry', 'Physics', 'Faraday', 'Experiments', 'Combustion'],
    readTime: 14,
    isFeatured: false,
    viewsCount: 890,
    likesCount: 230,
    publishedAt: '2024-12-08T15:20:00Z',
    bookDetails: {
      originalAuthor: 'Michael Faraday, D.C.L., F.R.S.',
      firstPublished: 1861,
      pages: 226,
      subjects: ['Combustion Chemistry', 'Gaseous Elements', 'Atmospheric Physics', 'Respiration'],
      license: 'Public-domain archive edition — free access; verify local copyright rules.',
      readOnlineUrl: 'https://archive.org/details/chemicalhistoryo00faraiala/mode/2up',
      downloadPdfUrl: 'https://archive.org/download/chemicalhistoryo00faraiala/chemicalhistoryo00faraiala.pdf',
      downloadEpubUrl: 'https://archive.org/download/chemicalhistoryo00faraiala/chemicalhistoryo00faraiala.epub',
      iaDetailsUrl: 'https://archive.org/details/chemicalhistoryo00faraiala',
    },
    content: `First delivered in 1848 as part of the Christmas Lectures for young people at the Royal Institution of Great Britain, Michael Faraday’s The Chemical History of a Candle remains one of the finest introductions to scientific pedagogy ever produced.

"There is not a law under which any part of this universe is governed," declared Faraday, "which does not come into play and is not touched upon in these phenomena."

Through a sequence of live chemical demonstrations, Faraday showed how capillary action draws wax up the wick, how vaporized hydrocarbons ignite inside the luminous zone, how water vapor and carbon dioxide are produced, and how the chemical process of combustion is fundamentally identical to biological respiration within the lungs.

Faraday’s clarity, infectious enthusiasm, and insistence on direct experimental proof make this classic an indispensable model for contemporary science communicators.`,
  },
  {
    id: 'book-7',
    title: 'Dialogue Concerning Two New Sciences',
    slug: 'dialogue-concerning-two-new-sciences',
    excerpt: 'Galileo’s culminating masterpiece exploring kinematic acceleration, free fall, projectile arcs, and the resistance of solid structures to fracture.',
    featuredImage: 'https://archive.org/services/img/dialoguesconcern00galiuoft',
    thumbnail: 'https://archive.org/services/img/dialoguesconcern00galiuoft',
    category: {
      id: '12',
      name: 'Books',
      slug: 'books',
      color: '#818cf8',
      icon: '📚',
    },
    author: {
      id: 'galileo-galilei',
      displayName: 'Galileo Galilei',
      avatar: '/images/scientists/galileo-galilei.webp',
    },
    tags: ['Physics', 'Galileo', 'Kinematics', 'Materials Science', 'Mechanics'],
    readTime: 22,
    isFeatured: false,
    viewsCount: 950,
    likesCount: 260,
    publishedAt: '2024-12-06T13:00:00Z',
    bookDetails: {
      originalAuthor: 'Galileo Galilei',
      firstPublished: 1638,
      pages: 300,
      subjects: ['Strength of Materials', 'Uniform & Accelerated Motion', 'Projectile Parabolic Paths', 'Pendulums'],
      license: 'Public-domain archive edition — free access; verify local copyright rules.',
      readOnlineUrl: 'https://archive.org/details/dialoguesconcern00galiuoft/mode/2up',
      downloadPdfUrl: 'https://archive.org/download/dialoguesconcern00galiuoft/dialoguesconcern00galiuoft.pdf',
      downloadEpubUrl: 'https://archive.org/download/dialoguesconcern00galiuoft/dialoguesconcern00galiuoft.epub',
      iaDetailsUrl: 'https://archive.org/details/dialoguesconcern00galiuoft',
    },
    content: `Published covertly in Leiden in 1638 while Galileo was living under house arrest by the Inquisition, the Discorsi e dimostrazioni matematiche intorno a due nuove scienze is the foundational treatise of modern kinematics and structural engineering.

Written as an engaging philosophical dialogue between Salviati (Galileo’s voice of reason), Sagredo (the educated gentleman), and Simplicio (the traditional Aristotelian), the work treats two distinct fields:
1. The resistance of solid bodies to fracture (strength of materials, scaling laws, and why giant animals cannot maintain bone proportions of small creatures).
2. The science of motion (kinematics): demonstrating that freely falling bodies accelerate uniformly regardless of mass, formulating the distance law (d ∝ t²), and proving that projectile motion combines uniform horizontal velocity with accelerated vertical fall to trace a parabola.

This book replaced qualitative Aristotelian physics with quantitative, mathematically described physical laws, directly preparing the ground for Isaac Newton.`,
  },
  {
    id: 'book-8',
    title: 'A Short History of Astronomy',
    slug: 'a-short-history-of-astronomy',
    excerpt: 'Arthur Berry’s definitive historical narrative tracing observational and theoretical astronomy from Babylonian sky-watchers to Victorian astrophysics.',
    featuredImage: 'https://archive.org/services/img/shorthistoryofas00berruoft',
    thumbnail: 'https://archive.org/services/img/shorthistoryofas00berruoft',
    category: {
      id: '12',
      name: 'Books',
      slug: 'books',
      color: '#818cf8',
      icon: '📚',
    },
    author: {
      id: 'arthur-berry',
      displayName: 'Arthur Berry, M.A.',
    },
    tags: ['Astronomy', 'History of Science', 'Copernicus', 'Kepler', 'Astrophysics'],
    readTime: 24,
    isFeatured: false,
    viewsCount: 780,
    likesCount: 195,
    publishedAt: '2024-12-04T16:40:00Z',
    bookDetails: {
      originalAuthor: 'Arthur Berry, M.A.',
      firstPublished: 1898,
      pages: 428,
      subjects: ['Ancient Astronomy', 'Copernican Revolution', 'Planetary Orbits', 'Spectroscopy Origins'],
      license: 'Public-domain archive edition — free access; verify local copyright rules.',
      readOnlineUrl: 'https://archive.org/details/shorthistoryofas00berruoft/mode/2up',
      downloadPdfUrl: 'https://archive.org/download/shorthistoryofas00berruoft/shorthistoryofas00berruoft.pdf',
      downloadEpubUrl: 'https://archive.org/download/shorthistoryofas00berruoft/shorthistoryofas00berruoft.epub',
      iaDetailsUrl: 'https://archive.org/details/shorthistoryofas00berruoft',
    },
    content: `Published by Cambridge University Fellow Arthur Berry in 1898, A Short History of Astronomy from the Earliest Times Through the Nineteenth Century stands as a classic among historical science chronicles.

Berry carefully documents the evolution of astronomical understanding: the sky-mapping of Egyptian and Babylonian priests; the geometric planetary epicycles of Hipparchus and Ptolemy; the crucial preservation and mathematical expansion of astronomy in the Islamic Golden Age by al-Battani and al-Sufi; through to Copernicus, Tycho Brahe, Johannes Kepler, Galileo, Newton, William Herschel, and Laplace.

The work concludes with the dawn of astronomical spectroscopy and astrophotography, showing how astronomers shifted from merely cataloging celestial coordinates to analyzing the chemical composition and temperature of distant stars.`,
  },
  {
    id: 'book-9',
    title: 'Science and Hypothesis',
    slug: 'science-and-hypothesis',
    excerpt: 'Henri Poincaré’s profound epistemological inquiry into mathematical intuition, non-Euclidean geometry, and the conceptual foundations of physical reality.',
    featuredImage: 'https://archive.org/services/img/scienceandhypoth00poinuoft',
    thumbnail: 'https://archive.org/services/img/scienceandhypoth00poinuoft',
    category: {
      id: '12',
      name: 'Books',
      slug: 'books',
      color: '#818cf8',
      icon: '📚',
    },
    author: {
      id: 'henri-poincare',
      displayName: 'Henri Poincaré',
    },
    tags: ['Mathematics', 'Philosophy of Science', 'Physics', 'Poincaré', 'Geometry'],
    readTime: 20,
    isFeatured: false,
    viewsCount: 1340,
    likesCount: 390,
    publishedAt: '2024-12-02T10:15:00Z',
    bookDetails: {
      originalAuthor: 'Henri Poincaré',
      firstPublished: 1902,
      pages: 244,
      subjects: ['Mathematical Reasoning', 'Non-Euclidean Geometries', 'Classical Mechanics Limits', 'Electrodynamics'],
      license: 'Public-domain archive edition — free access; verify local copyright rules.',
      readOnlineUrl: 'https://archive.org/details/scienceandhypoth00poinuoft/mode/2up',
      downloadPdfUrl: 'https://archive.org/download/scienceandhypoth00poinuoft/scienceandhypoth00poinuoft.pdf',
      downloadEpubUrl: 'https://archive.org/download/scienceandhypoth00poinuoft/scienceandhypoth00poinuoft.epub',
      iaDetailsUrl: 'https://archive.org/details/scienceandhypoth00poinuoft',
    },
    content: `Published in Paris in 1902, Science and Hypothesis (La Science et l'Hypothèse) was read intensely by the young Albert Einstein and his "Olympia Academy" circle in Bern prior to the 1905 Annus Mirabilis papers.

Poincaré, one of history’s greatest polymaths, probes the true nature of scientific laws:
- Are mathematical truths synthetic a priori, empirical conventions, or analytical tautologies?
- How do non-Euclidean geometries (Lobachevsky and Riemann) demonstrate that physical space is not an immutable absolute, but an empirical convention of convenience?
- Does absolute time exist, or are simultaneous events merely convention?

Poincaré’s insights foreshadowed both special relativity and quantum indeterminacy, establishing scientific conventionalism and highlighting how creative hypotheses drive genuine physical discovery.`,
  },
  {
    id: 'book-10',
    title: 'The Descent of Man',
    slug: 'the-descent-of-man',
    excerpt: 'Darwin’s groundbreaking extension of evolutionary theory to human species origins, social morality, and sexual selection across the animal kingdom.',
    featuredImage: 'https://archive.org/services/img/descentofman1871darwin01',
    thumbnail: 'https://archive.org/services/img/descentofman1871darwin01',
    category: {
      id: '12',
      name: 'Books',
      slug: 'books',
      color: '#818cf8',
      icon: '📚',
    },
    author: {
      id: 'charles-darwin',
      displayName: 'Charles Darwin',
      avatar: '/images/scientists/charles-darwin.webp',
    },
    tags: ['Biology', 'Evolution', 'Anthropology', 'Darwin', 'Sexual Selection'],
    readTime: 26,
    isFeatured: false,
    viewsCount: 1150,
    likesCount: 310,
    publishedAt: '2024-11-30T09:00:00Z',
    bookDetails: {
      originalAuthor: 'Charles Darwin, M.A., F.R.S.',
      firstPublished: 1871,
      pages: 450,
      subjects: ['Human Evolution', 'Comparative Anatomy', 'Sexual Dimorphism', 'Evolutionary Ethics'],
      license: 'Public-domain archive edition — free access; verify local copyright rules.',
      readOnlineUrl: 'https://archive.org/details/descentofman1871darwin01/mode/2up',
      downloadPdfUrl: 'https://archive.org/download/descentofman1871darwin01/descentofman1871darwin01.pdf',
      downloadEpubUrl: 'https://archive.org/download/descentofman1871darwin01/descentofman1871darwin01.epub',
      iaDetailsUrl: 'https://archive.org/details/descentofman1871darwin01',
    },
    content: `Published twelve years after Origin of Species, The Descent of Man, and Selection in Relation to Sex directly confronted the question Darwin had previously avoided: does humanity share common ancestry with other primates?

Darwin mobilized evidence from comparative embryology, rudimentary/vestigial organs, comparative physiology, and mental faculties to demonstrate that Homo sapiens descended from an ancestral primate branch.

Crucially, the book introduced Darwin’s second major evolutionary mechanism: Sexual Selection — explaining physical ornamentation, vocal courtship, and behavioral dimorphism across species that could not be explained by natural survival pressure alone.

Darwin also laid the groundwork for evolutionary psychology and anthropology, analyzing how sympathy, altruism, and social cooperation evolved as vital survival adaptations for social mammals.`,
  },
  {
    id: 'book-11',
    title: 'Opticks: Or, A Treatise of Light and Colour',
    slug: 'opticks-treatise-of-light-colour',
    excerpt: 'Newton’s experimental tour-de-force proving white light is a composite spectrum, investigating prism refractions, diffraction rings, and corpuscular optics.',
    featuredImage: 'https://archive.org/services/img/optabortreatise00newt',
    thumbnail: 'https://archive.org/services/img/optabortreatise00newt',
    category: {
      id: '12',
      name: 'Books',
      slug: 'books',
      color: '#818cf8',
      icon: '📚',
    },
    author: {
      id: 'isaac-newton',
      displayName: 'Sir Isaac Newton',
      avatar: '/images/scientists/newton.webp',
    },
    tags: ['Physics', 'Optics', 'Light', 'Newton', 'Experiments'],
    readTime: 21,
    isFeatured: false,
    viewsCount: 840,
    likesCount: 215,
    publishedAt: '2024-11-27T12:00:00Z',
    bookDetails: {
      originalAuthor: 'Sir Isaac Newton, Knt.',
      firstPublished: 1704,
      pages: 382,
      subjects: ['Dispersion of Light', 'Prism Experiments', 'Newtonian Rings', 'Reflecting Telescopes'],
      license: 'Public-domain archive edition — free access; verify local copyright rules.',
      readOnlineUrl: 'https://archive.org/details/optabortreatise00newt/mode/2up',
      downloadPdfUrl: 'https://archive.org/download/optabortreatise00newt/optabortreatise00newt.pdf',
      downloadEpubUrl: 'https://archive.org/download/optabortreatise00newt/optabortreatise00newt.epub',
      iaDetailsUrl: 'https://archive.org/details/optabortreatise00newt',
    },
    content: `Published in London in 1704, Opticks represents Isaac Newton at his most brilliant experimental peak. In contrast to the heavy geometric Latin of the Principia, Opticks was composed in clear vernacular English, presenting repeatable laboratory procedures.

Through his celebrated experimentum crucis with glass prisms in a darkened room, Newton proved that white sunlight is not a homogeneous fundamental entity, but a composite blend of all colors of the rainbow, each possessing its own characteristic angle of refrangibility.

Newton explained how chromatic aberration plagued refracting lenses, which prompted him to invent the reflecting telescope utilizing a curved mirror (the Newtonian reflector still in widespread astronomical use).

The concluding "Queries" of Opticks were visionary speculations where Newton anticipated radiant heat, chemical affinity, and the particulate nature of light that would later materialize in Einstein’s photon theory.`,
  },
  {
    id: 'book-12',
    title: 'The Principles of Psychology',
    slug: 'the-principles-of-psychology',
    excerpt: 'William James’s monumental exploration of consciousness, habit formation, memory, attention, and the biological foundations of human mental experience.',
    featuredImage: 'https://archive.org/services/img/theprinciplesofp01jameuoft',
    thumbnail: 'https://archive.org/services/img/theprinciplesofp01jameuoft',
    category: {
      id: '12',
      name: 'Books',
      slug: 'books',
      color: '#818cf8',
      icon: '📚',
    },
    author: {
      id: 'william-james',
      displayName: 'William James',
    },
    tags: ['Psychology', 'Neuroscience', 'Consciousness', 'Brain', 'Life Sciences'],
    readTime: 32,
    isFeatured: false,
    viewsCount: 1220,
    likesCount: 345,
    publishedAt: '2024-11-24T14:30:00Z',
    bookDetails: {
      originalAuthor: 'William James, M.D.',
      firstPublished: 1890,
      pages: 689,
      subjects: ['Stream of Consciousness', 'Neurophysiology', 'Habit Architecture', 'Emotion Theories'],
      license: 'Public-domain archive edition — free access; verify local copyright rules.',
      readOnlineUrl: 'https://archive.org/details/theprinciplesofp01jameuoft/mode/2up',
      downloadPdfUrl: 'https://archive.org/download/theprinciplesofp01jameuoft/theprinciplesofp01jameuoft.pdf',
      downloadEpubUrl: 'https://archive.org/download/theprinciplesofp01jameuoft/theprinciplesofp01jameuoft.epub',
      iaDetailsUrl: 'https://archive.org/details/theprinciplesofp01jameuoft',
    },
    content: `Taking twelve years to complete and published in 1890, William James’s The Principles of Psychology established scientific psychology in the English-speaking world. Bridging empirical physiology and philosophical introspection, James treated mind and brain as an inseparable biological evolutionary system.

It introduced concepts that became cornerstones of modern cognitive science:
- The "Stream of Thought / Consciousness": mental life is not discrete static ideas linked like beads, but continuous, ever-flowing, and constantly modified by prior context.
- Habit Formation as plastic neuro-pathways: early recognition of synaptic plasticity.
- The James-Lange Theory of Emotion: emotional feelings arise from physiological bodily changes in response to stimuli ("we feel sorry because we cry, angry because we strike").

James’s luminous prose and profound respect for lived subjective experience make this masterwork required reading for neuroscientists and AI cognitive architects alike.`,
  },
  {
    id: 'book-13',
    title: 'An Introduction to Mathematics',
    slug: 'an-introduction-to-mathematics',
    excerpt: 'Alfred North Whitehead’s illuminating masterpiece on mathematical philosophy, variables, coordinate geometry, and the symbolic language of science.',
    featuredImage: 'https://archive.org/services/img/introductiontoma00whit',
    thumbnail: 'https://archive.org/services/img/introductiontoma00whit',
    category: {
      id: '12',
      name: 'Books',
      slug: 'books',
      color: '#818cf8',
      icon: '📚',
    },
    author: {
      id: 'alfred-north-whitehead',
      displayName: 'Alfred North Whitehead',
    },
    tags: ['Mathematics', 'Philosophy', 'Logic', 'Calculus', 'Computing Foundations'],
    readTime: 16,
    isFeatured: false,
    viewsCount: 910,
    likesCount: 275,
    publishedAt: '2024-11-20T11:45:00Z',
    bookDetails: {
      originalAuthor: 'Alfred North Whitehead, Sc.D., F.R.S.',
      firstPublished: 1911,
      pages: 256,
      subjects: ['Symbolic Notation', 'Variables & Functions', 'Coordinate Geometry', 'Infinitesimal Calculus'],
      license: 'Public-domain archive edition — free access; verify local copyright rules.',
      readOnlineUrl: 'https://archive.org/details/introductiontoma00whit/mode/2up',
      downloadPdfUrl: 'https://archive.org/download/introductiontoma00whit/introductiontoma00whit.pdf',
      downloadEpubUrl: 'https://archive.org/download/introductiontoma00whit/introductiontoma00whit.epub',
      iaDetailsUrl: 'https://archive.org/details/introductiontoma00whit',
    },
    content: `Written in 1911 by Alfred North Whitehead — co-author with Bertrand Russell of the monumental Principia Mathematica — this gem was designed not to drill routine formulas, but to explain what mathematics is truly about and why it is the indispensable engine of natural science.

Whitehead demystifies abstract notation, variables, trigonometric periodicity, imaginary numbers (√-1), and differential calculus.

He famously reflected on the cognitive power of mathematical symbolism: "Civilization advances by extending the number of important operations which we can perform without thinking about them. Operations of thought are like cavalry charges in a battle — they are strictly limited in number, they require fresh horses, and must only be made at decisive moments."

A timeless, lucid orientation into the mathematical mindset for programmers, physicists, and curious thinkers.`,
  },
  {
    id: 'book-14',
    title: 'The Expression of the Emotions in Man and Animals',
    slug: 'the-expression-of-the-emotions-in-man-and-animals',
    excerpt: 'Darwin’s pioneer study linking facial expressions, biological communication, and evolutionary continuity across species — the seed of modern AI vision and ethology.',
    featuredImage: 'https://archive.org/services/img/expressionofemot1872darw',
    thumbnail: 'https://archive.org/services/img/expressionofemot1872darw',
    category: {
      id: '12',
      name: 'Books',
      slug: 'books',
      color: '#818cf8',
      icon: '📚',
    },
    author: {
      id: 'charles-darwin',
      displayName: 'Charles Darwin',
      avatar: '/images/scientists/charles-darwin.webp',
    },
    tags: ['Biology', 'Psychology', 'Darwin', 'Artificial Intelligence', 'Neuroscience'],
    readTime: 19,
    isFeatured: false,
    viewsCount: 760,
    likesCount: 205,
    publishedAt: '2024-11-17T08:30:00Z',
    bookDetails: {
      originalAuthor: 'Charles Darwin, M.A., F.R.S.',
      firstPublished: 1872,
      pages: 374,
      subjects: ['Facial Muscle Mechanics', 'Universal Expressions', 'Animal Ethology', 'Neuromuscular Responses'],
      license: 'Public-domain archive edition — free access; verify local copyright rules.',
      readOnlineUrl: 'https://archive.org/details/expressionofemot1872darw/mode/2up',
      downloadPdfUrl: 'https://archive.org/download/expressionofemot1872darw/expressionofemot1872darw.pdf',
      downloadEpubUrl: 'https://archive.org/download/expressionofemot1872darw/expressionofemot1872darw.epub',
      iaDetailsUrl: 'https://archive.org/details/expressionofemot1872darw',
    },
    content: `Published in 1872, The Expression of the Emotions in Man and Animals was one of the first scientific books to use photographs as empirical evidence. Darwin investigated whether emotional facial expressions (fear, rage, grief, joy, disgust) are arbitrary cultural conventions or biological, universal evolutionary traits.

By surveying missionaries and travelers across diverse human cultures, observing infants, studying psychiatric patients, and comparing human expressions with primates, dogs, and cats, Darwin proved that fundamental emotions share identical neuromuscular pathways worldwide.

He formulated three core explanatory principles: Serviceable Associated Habits, Antithesis, and the Direct Action of the Excited Nervous System.

In the 21st century, Darwin’s findings form the empirical bedrock for Paul Ekman’s universal micro-expressions and computer vision algorithms in affective computing and AI emotion detection.`,
  },
  {
    id: 'book-15',
    title: 'Astronomy for Amateurs',
    slug: 'astronomy-for-amateurs',
    excerpt: 'Camille Flammarion’s poetic guide to observational stargazing, constellations, lunar landscapes, and planetary wonders for the curious night-sky observer.',
    featuredImage: 'https://archive.org/services/img/astronomyforamat00flamrich',
    thumbnail: 'https://archive.org/services/img/astronomyforamat00flamrich',
    category: {
      id: '12',
      name: 'Books',
      slug: 'books',
      color: '#818cf8',
      icon: '📚',
    },
    author: {
      id: 'camille-flammarion',
      displayName: 'Camille Flammarion',
    },
    tags: ['Astronomy', 'Stargazing', 'Constellations', 'Planets', 'Space'],
    readTime: 17,
    isFeatured: false,
    viewsCount: 820,
    likesCount: 220,
    publishedAt: '2024-11-14T15:00:00Z',
    bookDetails: {
      originalAuthor: 'Camille Flammarion',
      firstPublished: 1904,
      pages: 324,
      subjects: ['Naked-Eye Astronomy', 'Solar System Exploration', 'Stellar Constellations', 'Comets & Meteors'],
      license: 'Public-domain archive edition — free access; verify local copyright rules.',
      readOnlineUrl: 'https://archive.org/details/astronomyforamat00flamrich/mode/2up',
      downloadPdfUrl: 'https://archive.org/download/astronomyforamat00flamrich/astronomyforamat00flamrich.pdf',
      downloadEpubUrl: 'https://archive.org/download/astronomyforamat00flamrich/astronomyforamat00flamrich.epub',
      iaDetailsUrl: 'https://archive.org/details/astronomyforamat00flamrich',
    },
    content: `French astronomer Camille Flammarion was arguably the greatest astronomical popularizer of the 19th and early 20th centuries. Astronomy for Amateurs (translated by Frances A. Welby) was crafted to awaken a love for the celestial vault in every reader.

Flammarion guides the observer through seasonal night skies, teaching how to recognize Ursa Major, the North Star, Orion, and the Andromeda Galaxy with nothing more than the naked eye and binoculars.

He describes the changing phases and craters of the Moon, the ring geometry of Saturn, the fiery storms of Jupiter, and the breathtaking majesty of meteor swarms. Flammarion’s poetic reverence for cosmic scale makes this handbook a beloved classic of astronomical literature.`,
  },
];

const GUTENBERG_BOOKS: ScienceBook[] = GUTENBERG_BOOK_SPECS.map((book, index) => ({
  id: `gutenberg-${book.ebookId}`,
  title: book.title,
  slug: book.slug,
  excerpt: book.excerpt,
  content: `${book.overview}\n\n## About this free edition\n\nThis catalog record links to Project Gutenberg’s public-domain edition. Historical science books are valuable primary sources, but older claims should be compared with current evidence before being treated as modern scientific guidance.`,
  featuredImage: `https://www.gutenberg.org/cache/epub/${book.ebookId}/pg${book.ebookId}.cover.medium.jpg`,
  thumbnail: `https://www.gutenberg.org/cache/epub/${book.ebookId}/pg${book.ebookId}.cover.small.jpg`,
  category: {
    id: '12',
    name: 'Books',
    slug: 'books',
    color: '#818cf8',
    icon: '📚',
  },
  author: {
    id: book.authorId,
    displayName: book.author,
  },
  tags: book.tags,
  readTime: Math.max(10, Math.min(30, 12 + book.subjects.length * 2)),
  isFeatured: index < 4,
  viewsCount: 0,
  likesCount: 0,
  publishedAt: '2026-09-17T09:00:00Z',
  bookDetails: {
    originalAuthor: book.author,
    firstPublished: book.firstPublished,
    pages: 0,
    subjects: book.subjects,
    license: 'Public domain in the USA — free access; readers outside the USA should check local copyright law.',
    readOnlineUrl: `https://www.gutenberg.org/ebooks/${book.ebookId}`,
    downloadPdfUrl: book.pdfUrl,
    downloadEpubUrl: book.hasEpub === false
      ? undefined
      : `https://www.gutenberg.org/ebooks/${book.ebookId}.epub3.images`,
    iaDetailsUrl: `https://www.gutenberg.org/ebooks/${book.ebookId}`,
    archiveName: 'Project Gutenberg',
  },
}));

const NORMALIZED_ARCHIVE_BOOKS: ScienceBook[] = ARCHIVE_BOOKS.map((book) => ({
  ...book,
  bookDetails: {
    ...book.bookDetails,
    license: 'Public-domain archive edition — free access; readers should check the copyright rules that apply where they live.',
    archiveName: 'Internet Archive',
  },
}));

export const SCIENCE_BOOKS: ScienceBook[] = [
  ...NORMALIZED_ARCHIVE_BOOKS,
  ...GUTENBERG_BOOKS,
];
