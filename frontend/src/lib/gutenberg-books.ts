export interface GutenbergBookSpec {
  title: string;
  slug: string;
  author: string;
  authorId: string;
  firstPublished: number | string;
  ebookId: number;
  excerpt: string;
  subjects: string[];
  tags: string[];
  overview: string;
  pdfUrl?: string;
  hasEpub?: boolean;
}

// Every record below links to an official Project Gutenberg catalog entry.
// The descriptions are original ScienceHub summaries, not publisher copy.
export const GUTENBERG_BOOK_SPECS: GutenbergBookSpec[] = [
  {
    title: 'Astronomy for Beginners',
    slug: 'astronomy-for-beginners-carrington',
    author: 'Hereward Carrington',
    authorId: 'hereward-carrington',
    firstPublished: 1925,
    ebookId: 78112,
    excerpt: 'A compact, approachable tour of the Solar System, stars, observing tools, calendars, and the scale of the universe.',
    subjects: ['Introductory Astronomy', 'Solar System', 'Stars', 'Observing'],
    tags: ['Astronomy', 'Beginner', 'Stargazing', 'Solar System'],
    overview: `Carrington wrote for readers who wanted a map of astronomy before confronting its mathematics. The book moves from familiar sights such as the Moon and planets to eclipses, comets, nebulae, stellar distances, spectroscopy, and the practical work of measuring time.

Some explanations reflect the science and terminology of the 1920s, so this is best read as both an introduction and a historical snapshot. Modern readers can compare its confident descriptions with a century of later spacecraft data and astrophysics.`,
  },
  {
    title: 'The Story of the Heavens',
    slug: 'the-story-of-the-heavens',
    author: 'Robert Stawell Ball',
    authorId: 'robert-stawell-ball',
    firstPublished: 1885,
    ebookId: 27378,
    excerpt: 'A richly illustrated nineteenth-century journey through planets, stars, telescopes, and the history of astronomical discovery.',
    subjects: ['Astronomy', 'Celestial Mechanics', 'Observational History', 'Planets'],
    tags: ['Astronomy', 'History of Science', 'Stars', 'Planets'],
    overview: `Robert Ball combined mathematical knowledge with the instincts of a gifted public lecturer. He explains how astronomers infer size, distance, motion, and mass from observations, then uses those tools to tour the Sun, Moon, planets, comets, and stellar universe.

The observational stories remain valuable even where later astronomy has revised the details. The book shows how nineteenth-century scientists built large conclusions from careful measurements made with comparatively modest instruments.`,
  },
  {
    title: 'Cosmos, Volume I',
    slug: 'cosmos-physical-description-universe-volume-one',
    author: 'Alexander von Humboldt',
    authorId: 'alexander-von-humboldt',
    firstPublished: 1845,
    ebookId: 14565,
    excerpt: 'Humboldt’s ambitious attempt to connect astronomy, geography, climate, geology, and life into one evidence-based portrait of nature.',
    subjects: ['Cosmography', 'Physical Geography', 'Astronomy', 'History of Science'],
    tags: ['Cosmos', 'Earth Science', 'Astronomy', 'Nature'],
    overview: `Cosmos presents nature as a connected system rather than a pile of unrelated facts. Humboldt ranges from nebulae and planetary motion to volcanoes, magnetic fields, climate, and the distribution of living things, continually asking how measurements reveal relationships across scales.

Its synthesis predates modern ecology and Earth-system science, and some factual claims are now outdated. Its lasting importance lies in the method: combine precise observations from many fields while preserving a sense of the whole.`,
  },
  {
    title: 'A Field Book of the Stars',
    slug: 'a-field-book-of-the-stars',
    author: 'William Tyler Olcott',
    authorId: 'william-tyler-olcott',
    firstPublished: 1907,
    ebookId: 20769,
    excerpt: 'A practical constellation guide designed to help beginners identify stars and seasonal patterns without advanced equipment.',
    subjects: ['Constellations', 'Observational Astronomy', 'Star Maps', 'Stargazing'],
    tags: ['Astronomy', 'Constellations', 'Field Guide', 'Stargazing'],
    overview: `Olcott’s field guide is organized around a simple goal: go outside and learn the sky by recognition. It uses prominent stars and geometric “pointer” patterns to lead the observer from one constellation to another across the seasons.

The charts were prepared for northern observers, so visibility changes with latitude and season. Even so, the habit it teaches remains modern: begin with reliable landmarks, check orientation, and build a mental map through repeated observation.`,
  },
  {
    title: 'Curiosities of the Sky',
    slug: 'curiosities-of-the-sky',
    author: 'Garrett Putman Serviss',
    authorId: 'garrett-putman-serviss',
    firstPublished: 1909,
    ebookId: 6630,
    excerpt: 'A lively exploration of dark nebulae, star clusters, auroras, comets, meteors, and questions that challenged early astrophysics.',
    subjects: ['Astronomical Phenomena', 'Nebulae', 'Comets', 'Aurora'],
    tags: ['Astronomy', 'Nebulae', 'Comets', 'Aurora'],
    overview: `Serviss chooses astronomy’s strangest sights rather than following a textbook sequence. Dark regions of the Milky Way, moving stars, eruptive events, zodiacal light, auroras, comets, meteorites, and the asteroid belt become starting points for explaining how observers reason from limited evidence.

Several mysteries in the book have since acquired better explanations, which makes it useful for comparing scientific eras. The reader can see both the durability of observation and the provisional character of interpretation.`,
  },
  {
    title: 'The New Physics and Its Evolution',
    slug: 'the-new-physics-and-its-evolution',
    author: 'Lucien Poincaré',
    authorId: 'lucien-poincare',
    firstPublished: 1908,
    ebookId: 15207,
    excerpt: 'A contemporary account of physics as X-rays, radioactivity, ions, and new ideas about matter disrupted older frameworks.',
    subjects: ['Modern Physics', 'Radioactivity', 'Electromagnetism', 'Matter'],
    tags: ['Physics', 'Radioactivity', 'History of Science', 'Matter'],
    overview: `Written while physics was changing rapidly, this book surveys measurement, states of matter, electrical conduction, cathode rays, radioactivity, and competing ideas about ether and matter. It captures the uncertainty scientists felt before relativity and quantum mechanics had fully reorganized the field.

Readers should treat discarded ether models as history, not current theory. The value is seeing discovery in motion: new instruments created results that old concepts could not comfortably explain.`,
  },
  {
    title: 'Science and Hypothesis',
    slug: 'science-and-hypothesis-poincare',
    author: 'Henri Poincaré',
    authorId: 'henri-poincare',
    firstPublished: 1902,
    ebookId: 37157,
    excerpt: 'A mathematician’s examination of geometry, mechanics, probability, and the role that conventions and hypotheses play in science.',
    subjects: ['Philosophy of Science', 'Geometry', 'Mechanics', 'Probability'],
    tags: ['Mathematics', 'Physics', 'Scientific Method', 'Philosophy'],
    overview: `Poincaré asks how much of science is discovered in nature and how much depends on the conceptual language used to organize experience. His discussions of geometry, measurement, motion, probability, optics, and electrodynamics reject both naive certainty and arbitrary relativism.

The book rewards slow reading because its central question remains active: evidence constrains theories, but scientists still choose definitions, models, and mathematical structures. Those choices are judged by consistency, usefulness, and contact with observation.`,
    pdfUrl: 'https://www.gutenberg.org/files/37157/37157-pdf.pdf',
    hasEpub: false,
  },
  {
    title: "Five of Maxwell's Papers",
    slug: 'five-of-maxwells-papers',
    author: 'James Clerk Maxwell',
    authorId: 'james-clerk-maxwell',
    firstPublished: '1855–1871',
    ebookId: 4908,
    excerpt: 'Five papers spanning colour perception, rotational dynamics, experimental physics, and Maxwell’s view of scientific education.',
    subjects: ['Optics', 'Colour Vision', 'Rotational Dynamics', 'Experimental Physics'],
    tags: ['Physics', 'Maxwell', 'Optics', 'Experiments'],
    overview: `This collection reveals Maxwell working across experiment, mathematics, and scientific communication. The colour papers connect physical mixtures of light to human perception, while the dynamical work turns abstract rotation into a form that can be demonstrated mechanically.

The lectures also show Maxwell thinking about laboratories and education. They are useful reminders that his achievement was broader than the four equations now carrying his name.`,
  },
  {
    title: 'The Theory of Spectra and Atomic Constitution',
    slug: 'theory-of-spectra-and-atomic-constitution',
    author: 'Niels Bohr',
    authorId: 'niels-bohr',
    firstPublished: 1922,
    ebookId: 47464,
    excerpt: 'Three essays from the formative years of quantum theory connecting atomic structure with the spectral lines of elements.',
    subjects: ['Atomic Physics', 'Spectroscopy', 'Quantum Theory', 'Elements'],
    tags: ['Quantum Physics', 'Atoms', 'Spectroscopy', 'Bohr'],
    overview: `Bohr explains how regularities in atomic spectra pushed physics beyond classical pictures of orbiting charges. The essays follow hydrogen, series spectra, correspondence with classical mechanics, and attempts to connect electron arrangements with the periodic behaviour of elements.

This is a historical stage of quantum theory rather than a modern textbook. Its power comes from showing physicists constructing rules that worked before the later formalism of quantum mechanics provided a more general framework.`,
    pdfUrl: 'https://www.gutenberg.org/files/47464/47464-pdf.pdf',
  },
  {
    title: 'The Theory of Heat Radiation',
    slug: 'the-theory-of-heat-radiation',
    author: 'Max Planck',
    authorId: 'max-planck',
    firstPublished: 1906,
    ebookId: 40030,
    excerpt: 'Planck’s systematic treatment of thermal radiation and the problem that led to the quantum of action.',
    subjects: ['Thermal Radiation', 'Thermodynamics', 'Electromagnetism', 'Quantum Origins'],
    tags: ['Physics', 'Planck', 'Radiation', 'Quantum Theory'],
    overview: `Planck develops the thermodynamics and electrodynamics of radiation inside cavities, then confronts the measured distribution of energy across frequencies. The resulting law required a new constant and an unfamiliar restriction on how oscillators exchange energy.

The derivation is mathematically demanding, but historically central. It records the route by which a technical radiation problem opened the quantum era, even before the full meaning of quantization was understood.`,
    pdfUrl: 'https://www.gutenberg.org/files/40030/40030-pdf.pdf',
    hasEpub: false,
  },
  {
    title: 'Space—Time—Matter',
    slug: 'space-time-matter-hermann-weyl',
    author: 'Hermann Weyl',
    authorId: 'hermann-weyl',
    firstPublished: 1918,
    ebookId: 43006,
    excerpt: 'A geometric synthesis of relativity, gravitation, and matter written during the early development of modern spacetime physics.',
    subjects: ['General Relativity', 'Differential Geometry', 'Spacetime', 'Gravitation'],
    tags: ['Relativity', 'Mathematics', 'Spacetime', 'Geometry'],
    overview: `Weyl builds from geometry and measurement toward Einstein’s account of gravity, treating spacetime as a mathematical structure whose curvature has physical consequences. His presentation helped make the geometric language of relativity available to a wider community of physicists and mathematicians.

Some unification proposals in the book did not survive experimental and theoretical scrutiny. They remain historically important because they introduced ideas that later reappeared in very different forms in gauge theory.`,
    pdfUrl: 'https://www.gutenberg.org/files/43006/43006-pdf.pdf',
    hasEpub: false,
  },
  {
    title: 'Elementary Principles in Statistical Mechanics',
    slug: 'elementary-principles-statistical-mechanics',
    author: 'J. Willard Gibbs',
    authorId: 'j-willard-gibbs',
    firstPublished: 1902,
    ebookId: 50992,
    excerpt: 'The foundational ensemble approach connecting microscopic mechanical states with macroscopic thermodynamic behaviour.',
    subjects: ['Statistical Mechanics', 'Thermodynamics', 'Probability', 'Dynamics'],
    tags: ['Physics', 'Statistics', 'Thermodynamics', 'Gibbs'],
    overview: `Gibbs reframes thermodynamics using populations of possible mechanical systems rather than attempting to track every particle in one system. Microcanonical, canonical, and grand-canonical ways of describing ensembles became standard tools across physics and chemistry.

The text assumes substantial mathematics. Its deeper lesson is broadly accessible: macroscopic regularity can emerge from probabilistic descriptions of enormous numbers of microscopic possibilities.`,
    pdfUrl: 'https://www.gutenberg.org/files/50992/50992-pdf.pdf',
    hasEpub: false,
  },
  {
    title: 'Treatise on Thermodynamics',
    slug: 'treatise-on-thermodynamics-planck',
    author: 'Max Planck',
    authorId: 'max-planck',
    firstPublished: 1897,
    ebookId: 50880,
    excerpt: 'A rigorous account of energy, entropy, equilibrium, phase change, gases, and chemical thermodynamics.',
    subjects: ['Thermodynamics', 'Entropy', 'Phase Equilibrium', 'Physical Chemistry'],
    tags: ['Physics', 'Thermodynamics', 'Entropy', 'Chemistry'],
    overview: `Planck organizes thermodynamics around conservation of energy and the directionality expressed by entropy. He applies the framework to gases, mixtures, phase transitions, solutions, and chemical systems while keeping the distinction between empirical laws and microscopic interpretation visible.

Notation has changed, but the architecture remains recognizable in modern courses. The book is especially useful for seeing how thermodynamics became a unified discipline before atomic models were universally accepted.`,
    pdfUrl: 'https://www.gutenberg.org/files/50880/50880-pdf.pdf',
    hasEpub: false,
  },
  {
    title: 'On Growth and Form',
    slug: 'on-growth-and-form',
    author: "D'Arcy Wentworth Thompson",
    authorId: 'darcy-wentworth-thompson',
    firstPublished: 1917,
    ebookId: 55264,
    excerpt: 'A landmark study of how geometry, scaling, forces, and material constraints contribute to biological shape.',
    subjects: ['Mathematical Biology', 'Morphology', 'Scaling', 'Biomechanics'],
    tags: ['Biology', 'Mathematics', 'Morphology', 'Biomechanics'],
    overview: `Thompson asks what physical forces and mathematical relationships can explain about the forms of organisms. Spirals, cell shapes, bones, shells, horns, and transformed coordinate grids become examples of how growth operates under constraints.

The book does not replace genetics or natural selection, and some proposed mechanisms are speculative. Its enduring contribution is to make biological form a quantitative problem and to connect morphology with mechanics, materials, and scale.`,
  },
  {
    title: 'Experimental Researches in Electricity, Volume I',
    slug: 'experimental-researches-electricity-volume-one',
    author: 'Michael Faraday',
    authorId: 'michael-faraday',
    firstPublished: 1839,
    ebookId: 14986,
    excerpt: 'Faraday’s laboratory record of induction, electrochemistry, fields, and the experimental foundations of electrical science.',
    subjects: ['Electromagnetic Induction', 'Electrochemistry', 'Electricity', 'Experiments'],
    tags: ['Physics', 'Electricity', 'Faraday', 'Experiments'],
    overview: `These papers preserve Faraday’s experimental path rather than presenting only polished conclusions. Apparatus, observations, failed interpretations, new terminology, and carefully numbered experiments reveal how electromagnetic induction and electrochemical laws were assembled.

Modern field theory uses mathematics Faraday did not possess, yet many of its physical intuitions are visible here. The collection is a rare opportunity to watch a major experimental programme develop in sequence.`,
  },
  {
    title: 'Science and the Modern World',
    slug: 'science-and-the-modern-world',
    author: 'Alfred North Whitehead',
    authorId: 'alfred-north-whitehead',
    firstPublished: 1925,
    ebookId: 68611,
    excerpt: 'A philosophical history of how scientific concepts reshaped modern thought, culture, and assumptions about nature.',
    subjects: ['Philosophy of Science', 'Scientific Revolution', 'Modernity', 'Nature'],
    tags: ['Science', 'Philosophy', 'History', 'Whitehead'],
    overview: `Whitehead traces the conceptual habits produced by early modern science, especially the picture of nature as matter moving under mathematical laws. He then asks how evolution, relativity, and quantum discoveries complicate that inherited framework.

The book is interpretation rather than experimental science, and readers need not accept its metaphysics to benefit from it. It remains a provocative guide to the way successful scientific models can quietly become assumptions about reality as a whole.`,
  },
  {
    title: 'The Voyage of the Beagle',
    slug: 'the-voyage-of-the-beagle',
    author: 'Charles Darwin',
    authorId: 'charles-darwin',
    firstPublished: 1839,
    ebookId: 944,
    excerpt: 'Darwin’s field journal of geology, wildlife, environments, and people encountered during the global voyage that shaped his science.',
    subjects: ['Natural History', 'Geology', 'Biogeography', 'Exploration'],
    tags: ['Biology', 'Darwin', 'Geology', 'Natural History'],
    overview: `The Beagle narrative shows Darwin before the Origin of Species, collecting specimens and comparing landscapes, fossils, animals, and geographic distributions. South American geology and island biogeography repeatedly force him to think about change across deep time.

The book also contains nineteenth-century descriptions of peoples and colonial settings that require critical reading. Its scientific value lies in the disciplined observation and comparison from which Darwin’s later evolutionary arguments grew.`,
  },
  {
    title: "Man's Place in Nature and Other Essays",
    slug: 'mans-place-in-nature-and-other-essays',
    author: 'Thomas Henry Huxley',
    authorId: 'thomas-henry-huxley',
    firstPublished: 1863,
    ebookId: 40257,
    excerpt: 'Comparative anatomy, fossils, evolution, and scientific reasoning in essays that brought human origins into public debate.',
    subjects: ['Human Evolution', 'Comparative Anatomy', 'Zoology', 'Scientific Method'],
    tags: ['Biology', 'Evolution', 'Anatomy', 'Huxley'],
    overview: `Huxley compares humans with other primates using anatomy and the fossil evidence then available, arguing that humanity must be studied within nature rather than outside it. Later essays explain how hypotheses are built and tested from ordinary observations as well as laboratory work.

The evidence base has expanded enormously since Huxley wrote, and some language is dated. The collection remains important for the history of evolutionary debate and for its unusually direct explanations of scientific inference.`,
  },
  {
    title: 'The Evolution of Modern Medicine',
    slug: 'the-evolution-of-modern-medicine',
    author: 'William Osler',
    authorId: 'william-osler',
    firstPublished: 1921,
    ebookId: 1566,
    excerpt: 'A physician’s historical survey from ancient healing traditions to anatomy, circulation, microscopy, and laboratory medicine.',
    subjects: ['History of Medicine', 'Anatomy', 'Physiology', 'Medical Science'],
    tags: ['Medicine', 'History of Science', 'Biology', 'Public Health'],
    overview: `Osler follows medicine’s uneven movement from inherited authority toward anatomy, bedside observation, experiment, pathology, and laboratory evidence. He gives particular attention to Greek medicine, Renaissance anatomy, Harvey’s circulation, microscopy, and nineteenth-century transformations.

It is a historical lecture series, not medical advice, and parts of its narrative reflect the priorities of its period. Read critically, it offers a useful map of how medical knowledge became tied to reproducible observation.`,
  },
  {
    title: 'The Natural History of Selborne',
    slug: 'the-natural-history-of-selborne',
    author: 'Gilbert White',
    authorId: 'gilbert-white',
    firstPublished: 1789,
    ebookId: 1408,
    excerpt: 'Detailed letters and observations showing how patient attention to one place can reveal migration, behaviour, weather, and ecology.',
    subjects: ['Natural History', 'Birds', 'Ecology', 'Phenology'],
    tags: ['Biology', 'Ecology', 'Birds', 'Field Observation'],
    overview: `White studies a small English parish with extraordinary persistence. Seasonal arrivals, bird behaviour, plants, weather, soils, and local habitats are recorded across years, allowing patterns to emerge from repeated observation rather than one dramatic expedition.

Taxonomy and ecology have changed since the eighteenth century, but the method remains exemplary. Long-term attention to a particular place is still essential for detecting migration shifts, population changes, and ecological responses to climate.`,
  },
];
