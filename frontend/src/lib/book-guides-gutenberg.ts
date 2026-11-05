import type { BookGuide } from './book-guides';

// Reading guides for the Project Gutenberg editions in the library.
export const GUTENBERG_BOOK_GUIDES: Record<string, BookGuide> = {
  'astronomy-for-beginners-carrington': {
    inside: [
      'Hereward Carrington gives a quick tour of astronomy for readers meeting it for the first time: the Earth and Moon, eclipses, the Sun and planets, comets and meteors, then the stars, nebulae and the scale of the universe. He also covers practical topics such as telescopes, calendars and how astronomers measure distances and time.',
      'Because it was written in 1925, it captures astronomy at a turning point. Edwin Hubble had just shown that some nebulae are separate galaxies far beyond our own, and the idea of an expanding universe had not yet taken hold.',
    ],
    howToRead: 'It is short and non-mathematical, so it suits an afternoon. Read it as a historical snapshot and check any surprising claim against a modern source.',
    holdsUp: 'The layout of the Solar System, the causes of eclipses and seasons, and the basic methods for measuring distance in space are all still correct.',
    changed: 'Pluto, found in 1930, is missing, and so are the expanding universe and everything learned from spacecraft. Numbers for distances and planetary details are out of date.',
    faqs: [
      { question: 'Is Astronomy for Beginners outdated?', answer: 'Its facts reflect 1925, so details about planets, galaxies and the universe are out of date, but its explanations of the basics still help beginners.' },
      { question: 'Who was Hereward Carrington?', answer: 'A British-American writer (1880–1958) best known for books on psychical research, who also wrote popular science.' },
    ],
    related: ['/articles/astronomy-for-amateurs', '/articles/a-field-book-of-the-stars', '/guides/best-space-astronomy-articles'],
  },

  'the-story-of-the-heavens': {
    inside: [
      'Robert Ball, then Royal Astronomer of Ireland, wrote this as a grand tour for the general public. He explains how astronomers measure the size, distance and mass of bodies in the sky, then visits the Sun, the Moon, each of the planets, comets and meteors, and finally the stars, double stars and nebulae.',
      'Ball was a famous public lecturer, and the book reads like a lecture series: each chapter tells the story of how something was discovered as well as what was found.',
    ],
    howToRead: 'Pick the chapters on the objects you care about, since each stands on its own. The early chapters on measurement explain the reasoning behind everything else and are worth reading first.',
    holdsUp: 'Its method, reasoning from careful measurements to large conclusions such as the distance of the Sun or the masses of the planets, is still how astronomy works.',
    changed: 'It predates the discovery of galaxies beyond the Milky Way, the explanation of the Sun’s energy by nuclear fusion and all space exploration, so many specific facts are out of date.',
    faqs: [
      { question: 'Who was Robert Ball?', answer: 'An Irish astronomer (1840–1913) who was Royal Astronomer of Ireland and later Lowndean Professor of Astronomy at Cambridge, famous for his popular lectures.' },
      { question: 'Is The Story of the Heavens still accurate?', answer: 'Its methods and many observations are sound, but its picture of the universe dates from 1885, before galaxies, stellar fusion and spaceflight.' },
    ],
    related: ['/articles/a-short-history-of-astronomy', '/articles/curiosities-of-the-sky', '/guides/best-space-astronomy-articles'],
  },

  'cosmos-physical-description-universe-volume-one': {
    inside: [
      'Volume I of Cosmos is Humboldt’s general overview. After an introduction on the pleasures of studying nature, he sweeps from the stars and nebulae through the Solar System to the Earth itself: its shape and inner heat, magnetism, earthquakes and volcanoes, oceans and atmosphere, and the distribution of plants, animals and people.',
      'Humboldt, who had explored the Americas from 1799 to 1804, insisted that measurements from many sciences reveal connections that no single science could see. His earlier travel writing had inspired the young Charles Darwin, and Cosmos itself became a bestseller across Europe.',
    ],
    howToRead: 'Read the introduction for Humboldt’s vision, then the sections on the Earth, which are the most original. The text is long and full of digressions, so dip in rather than reading cover to cover.',
    holdsUp: 'Humboldt’s view of nature as one connected system anticipates modern ecology and Earth-system science, and his attention to climate and the distribution of life is still influential.',
    changed: 'Plate tectonics, the true age of the Earth, evolution and modern astrophysics were all unknown, so many explanations, especially about geology and the stars, are outdated.',
    faqs: [
      { question: 'Who was Alexander von Humboldt?', answer: 'A Prussian naturalist and explorer (1769–1859) whose expedition to the Americas and whose writings shaped geography, ecology and climate science.' },
      { question: 'How many volumes does Cosmos have?', answer: 'Five in the German original, published between 1845 and 1862. This guide covers Volume I.' },
    ],
    related: ['/scientists/charles-darwin', '/articles/the-voyage-of-the-beagle', '/articles/north-pacific-winter-storm-track-poleward-shift-2026'],
  },

  'a-field-book-of-the-stars': {
    inside: [
      'William Tyler Olcott wrote a pocket guide for learning the constellations with the naked eye. With simple star maps and short descriptions, it leads the reader from well-known patterns such as the Big Dipper to their neighbours, season by season, and points out bright stars, double stars and other sights worth finding.',
      'Olcott, a lawyer turned amateur astronomer, co-founded the American Association of Variable Star Observers in 1911, and the book reflects his belief that anyone can do real astronomy from a back garden.',
    ],
    howToRead: 'Take it outside. Start with the current season, find one bright pattern, then follow the book’s directions to the next. A red torch keeps your night vision while you read.',
    holdsUp: 'The constellations and the directions for finding them have not changed in any noticeable way in a century, so the method still works.',
    changed: 'Light pollution now hides many of the fainter stars it describes from city skies, and some facts about stellar distances and names are out of date.',
    faqs: [
      { question: 'Can I still use A Field Book of the Stars today?', answer: 'Yes. The constellations are the same, so its maps and directions work; you may need darker skies to see the fainter stars.' },
      { question: 'Who was William Tyler Olcott?', answer: 'An American amateur astronomer (1873–1936) who co-founded the American Association of Variable Star Observers in 1911.' },
    ],
    related: ['/articles/astronomy-for-amateurs', '/articles/curiosities-of-the-sky', '/guides/best-space-astronomy-articles'],
  },

  'curiosities-of-the-sky': {
    inside: [
      'Garrett P. Serviss, a popular American science writer, collected strange and striking questions about the sky: dark patches in the Milky Way, star clusters, auroras, comets, meteors and other puzzles that challenged astronomers in the early 20th century.',
      'Each chapter is a self-contained essay that explains what astronomers knew in 1909 and what they were still arguing about.',
    ],
    howToRead: 'Dip in by chapter; the essays are short and lively. Read them as a window on astronomy just before the great discoveries of the 1920s.',
    holdsUp: 'Serviss’s descriptions of what observers can see, and his habit of separating established facts from speculation, still make the book a good read.',
    changed: 'Many of the puzzles he discusses have since been solved: dark nebulae are clouds of dust, auroras are caused by particles from the Sun, and the Milky Way is one galaxy among billions.',
    faqs: [
      { question: 'Who was Garrett P. Serviss?', answer: 'An American astronomer and popular science writer (1851–1929), also known for early science fiction.' },
      { question: 'Is Curiosities of the Sky scientifically accurate?', answer: 'It reflects 1909 knowledge, so some explanations are outdated, but it is clear about which questions were still open.' },
    ],
    related: ['/articles/the-story-of-the-heavens', '/articles/how-stars-are-born-live-and-die', '/guides/best-space-astronomy-articles'],
  },

  'the-new-physics-and-its-evolution': {
    inside: [
      'Lucien Poincaré, a French physicist and cousin of the mathematician Henri Poincaré, surveyed physics at a moment of upheaval. He explains measurement and the principles of physics, then the discoveries that were transforming the field: X-rays, radioactivity, ions and electrons, and new ideas about matter and the ether.',
      'Written just before relativity and quantum theory took over, it shows how physicists made sense of the new discoveries in their own terms, and how much was still uncertain.',
    ],
    howToRead: 'Read the chapters on radioactivity and the electron first, because they show a science being reshaped. Then compare them with a modern explanation of the atom.',
    holdsUp: 'Its accounts of the experiments, such as the discovery of the electron and of radioactivity, are accurate and clearly explained.',
    changed: 'The atomic nucleus (1911), quantum theory and relativity changed the interpretation of almost everything in the book, and the ether it discusses was abandoned.',
    faqs: [
      { question: 'Who was Lucien Poincaré?', answer: 'A French physicist and educator (1862–1920), cousin of the mathematician Henri Poincaré.' },
      { question: 'Why read an old physics book?', answer: 'To see how scientists made sense of new discoveries before modern theories existed, and how much they got right with the tools they had.' },
    ],
    related: ['/scientists/marie-curie', '/articles/science-and-hypothesis', '/articles/alice-lead-to-gold-lhc-nuclear-transmutation-2025'],
  },

  'five-of-maxwells-papers': {
    inside: [
      'This short collection gathers five pieces by James Clerk Maxwell, the physicist who unified electricity, magnetism and light. They range from experiments on colour perception and a study of rotating bodies to his reflections on how experimental physics should be taught.',
      'They show a different side of Maxwell from his famous equations: a careful experimenter and teacher who cared about how students learn by doing.',
    ],
    howToRead: 'Start with the pieces on experimental physics and science teaching, which are the most readable. The more technical papers can be skimmed for Maxwell’s style of reasoning.',
    holdsUp: 'Maxwell’s colour work underlies how cameras and screens mix red, green and blue light, and his case for hands-on teaching is still sound.',
    changed: 'Some technical details and units belong to the 19th century, and later physics extended his ideas through relativity and quantum theory.',
    faqs: [
      { question: 'Who was James Clerk Maxwell?', answer: 'A Scottish physicist (1831–1879) whose equations unified electricity, magnetism and light, and who also made major contributions to the kinetic theory of gases and colour vision.' },
      { question: 'Is Five of Maxwell’s Papers technical?', answer: 'Partly. The pieces on teaching are readable by anyone, while the papers on colour and rotation use some mathematics.' },
    ],
    related: ['/scientists/michael-faraday', '/articles/experimental-researches-electricity-volume-one', '/articles/how-semiconductors-turn-physics-into-computing'],
  },

  'theory-of-spectra-and-atomic-constitution': {
    inside: [
      'This book collects three essays in which Niels Bohr explained his quantum theory of the atom. Atoms of each element give off light only at particular colours, their spectral lines. Bohr’s model, first published in 1913, explained those lines for hydrogen by allowing electrons only certain orbits and having them emit light when they jump between them.',
      'The essays extend the idea to more complex atoms and to the periodic table, showing how the arrangement of electrons could explain the chemical properties of the elements.',
    ],
    howToRead: 'Read the first essay, on the hydrogen spectrum, which is the clearest. Some algebra helps, but Bohr explains the physical ideas in words. Read it alongside a modern introduction to the atom.',
    holdsUp: 'Energy levels, quantum jumps and the link between electron arrangement and chemistry all survive in modern quantum mechanics, and the Bohr model is still taught as a first picture of the atom.',
    changed: 'Within a few years quantum mechanics replaced fixed electron orbits with wave functions and probability clouds, which explain the spectra of all atoms, not just hydrogen-like ones.',
    faqs: [
      { question: 'What is the Bohr model?', answer: 'Bohr’s 1913 model of the atom, in which electrons move only in certain allowed orbits and emit or absorb light when they jump between them.' },
      { question: 'Did Bohr win a Nobel Prize?', answer: 'Yes, the 1922 Nobel Prize in Physics, for his work on the structure of atoms and the radiation they emit.' },
    ],
    related: ['/articles/the-theory-of-heat-radiation', '/articles/quantum-entanglement-without-faster-than-light-myth', '/guides/best-quantum-physics-explainers'],
  },

  'the-theory-of-heat-radiation': {
    inside: [
      'Max Planck’s lectures set out the theory of thermal radiation, the light and heat that every warm object gives off. He begins with classical principles such as Kirchhoff’s law and the thermodynamics of radiation, then tackles black-body radiation: the exact mix of colours a perfect absorber emits at each temperature.',
      'To match the experiments, Planck had to assume in 1900 that energy is exchanged in small fixed amounts, quanta, proportional to frequency. The constant of proportionality, now called Planck’s constant, became the foundation of quantum physics.',
    ],
    howToRead: 'This is a demanding physics text that uses calculus and thermodynamics. Read the introduction and the parts where Planck introduces the quantum of action, and skim the derivations unless you have studied physics.',
    holdsUp: 'Planck’s radiation law is exact. Astronomers use it to measure the temperatures of stars and of the cosmic microwave background.',
    changed: 'Planck interpreted the quantum cautiously. Einstein, Bohr and others later showed that quantization is a deep feature of nature, not just of how matter emits radiation.',
    faqs: [
      { question: 'What is black-body radiation?', answer: 'The light an ideal object gives off purely because of its temperature. Its spectrum depends only on temperature, which made it a key puzzle for physics around 1900.' },
      { question: 'What is Planck’s constant?', answer: 'The constant h that links a quantum’s energy to its frequency (E = hf). Since 2019 it has been used to define the kilogram.' },
    ],
    related: ['/articles/theory-of-spectra-and-atomic-constitution', '/articles/treatise-on-thermodynamics-planck', '/guides/best-quantum-physics-explainers'],
  },

  'space-time-matter-hermann-weyl': {
    inside: [
      'Hermann Weyl wrote one of the first full textbooks of Einstein’s relativity. He builds the mathematics from the ground up, starting with Euclidean space and tensor calculus, then treats special relativity and electromagnetism, and finally general relativity and gravitation.',
      'Later editions also included Weyl’s own attempt to unify gravity and electromagnetism through a new kind of geometry. That theory failed, but its central idea, a symmetry he called gauge invariance, became a foundation of modern particle physics.',
    ],
    howToRead: 'This book needs university-level mathematics. Readers with that background should start with the chapters on special relativity; others can read the introduction for Weyl’s philosophical view of space and time.',
    holdsUp: 'Its presentation of special and general relativity is still correct, and the gauge idea it introduced underpins the Standard Model of particle physics.',
    changed: 'Weyl’s unified theory was abandoned, and modern textbooks use different notation and cover later results such as black holes and gravitational waves.',
    faqs: [
      { question: 'Who was Hermann Weyl?', answer: 'A German mathematician and physicist (1885–1955) who worked in Zurich, Göttingen and Princeton, known for his work on geometry, symmetry and quantum theory.' },
      { question: 'Is Space–Time–Matter for beginners?', answer: 'No. It assumes university mathematics. Einstein’s own short book on relativity is a better first read.' },
    ],
    related: ['/articles/relativity-the-special-and-general-theory', '/scientists/albert-einstein', '/articles/general-relativity-curved-spacetime-working-gps'],
  },

  'elementary-principles-statistical-mechanics': {
    inside: [
      'J. Willard Gibbs, a physicist at Yale, wrote the book that gave statistical mechanics its modern form. Instead of following one system, he imagines a huge collection, an ensemble, of copies of it in every possible state, and shows how averages over that ensemble reproduce the laws of thermodynamics.',
      'He introduced the canonical and microcanonical ensembles still used today and explained how temperature and entropy emerge from the behaviour of very many particles.',
    ],
    howToRead: 'A text for readers with calculus and some physics. Read the preface, where Gibbs explains his aims, then the chapters on the canonical ensemble.',
    holdsUp: 'Gibbs’s ensembles remain the standard framework of statistical physics and carried over almost unchanged into quantum statistical mechanics.',
    changed: 'Gibbs worked with classical mechanics and was puzzled by some results, such as heat capacities, that quantum theory later explained.',
    faqs: [
      { question: 'What is statistical mechanics?', answer: 'The branch of physics that explains properties like temperature and pressure from the motion of enormous numbers of atoms and molecules.' },
      { question: 'Who was J. Willard Gibbs?', answer: 'An American scientist (1839–1903) at Yale whose work founded chemical thermodynamics and modern statistical mechanics.' },
    ],
    related: ['/articles/treatise-on-thermodynamics-planck', '/articles/the-theory-of-heat-radiation', '/scientists/claude-shannon'],
  },

  'treatise-on-thermodynamics-planck': {
    inside: [
      'Max Planck’s Treatise is a systematic course in classical thermodynamics. It begins with temperature, gases and heat, states the first law (conservation of energy) and then the second law and entropy, and applies them to equilibrium, changes of state such as melting and boiling, chemical reactions and solutions.',
      'Planck treats thermodynamics as a set of general principles that do not depend on any picture of atoms, which made it a clean foundation for both physics and chemistry.',
    ],
    howToRead: 'For readers with calculus. Read the chapters on the first and second laws, and use the later applications to chemistry as needed.',
    holdsUp: 'The laws of thermodynamics as Planck presents them are unchanged and still form the core of physics, chemistry and engineering courses.',
    changed: 'Modern teaching links thermodynamics to statistical mechanics and the behaviour of atoms, an approach Planck’s own quantum work helped make necessary.',
    faqs: [
      { question: 'What are the laws of thermodynamics?', answer: 'Energy is conserved (first law), the entropy of an isolated system never decreases (second law), and, as added after this book, entropy approaches a minimum near absolute zero (third law).' },
      { question: 'Is Planck’s Treatise on Thermodynamics still useful?', answer: 'Yes, as a clear classical treatment, though modern textbooks add statistical and quantum perspectives.' },
    ],
    related: ['/articles/elementary-principles-statistical-mechanics', '/articles/the-theory-of-heat-radiation', '/articles/the-chemical-history-of-a-candle'],
  },

  'experimental-researches-electricity-volume-one': {
    inside: [
      'This volume gathers the first series of Faraday’s research papers on electricity, published in the Royal Society’s Philosophical Transactions. It includes his 1831 discovery of electromagnetic induction, his demonstration that electricity from batteries, friction, magnets and animals is one and the same, and his laws of electrolysis.',
      'The papers are written as numbered paragraphs, so the reader can follow every experiment, including the ones that did not work, in the order Faraday did them.',
    ],
    howToRead: 'Start with the First Series, on induction, which describes his famous iron-ring experiment. Faraday uses almost no mathematics, so the main challenge is length; read one series at a time.',
    holdsUp: 'Electromagnetic induction and the laws of electrolysis are exactly as Faraday found them, and they underpin generators, transformers and electroplating.',
    changed: 'Faraday did not know about electrons, which were discovered in 1897. Modern explanations of the same effects use electrons and Maxwell’s equations.',
    faqs: [
      { question: 'What did Faraday discover in 1831?', answer: 'Electromagnetic induction: a changing magnetic field produces an electric current. This volume contains his original report.' },
      { question: 'Do I need maths to read Faraday’s papers?', answer: 'No. Faraday described his experiments in words and numbered paragraphs, with almost no equations.' },
    ],
    related: ['/scientists/michael-faraday', '/articles/the-chemical-history-of-a-candle', '/articles/five-of-maxwells-papers'],
  },

  'on-growth-and-form': {
    inside: [
      'D’Arcy Wentworth Thompson, a Scottish biologist and classical scholar, argued that the shapes of living things are governed by physics and mathematics as well as by evolution. He shows how size changes what an animal can do, how surface tension shapes cells and splashes, why shells grow in spirals, and how bones are built along the lines of the forces they carry.',
      'In the famous final chapter, on the theory of transformations, he draws one fish on a grid and then distorts the grid to turn it into a related species, suggesting that simple changes in growth can produce very different forms.',
    ],
    howToRead: 'Read the chapters on magnitude and on the theory of transformations first; they are the best known and need little mathematics. The 1917 edition is long, so treat the rest as a collection of essays.',
    holdsUp: 'His insight that physical forces and growth rules constrain biological form is central to modern biomechanics and developmental biology.',
    changed: 'Thompson gave little role to natural selection and genetics. Biologists now combine his physical approach with the genes that control growth and development.',
    faqs: [
      { question: 'What is On Growth and Form about?', answer: 'How mathematics and physics, such as scaling, surface tension and mechanical forces, help explain the shapes of living things.' },
      { question: 'Who was D’Arcy Wentworth Thompson?', answer: 'A Scottish biologist, mathematician and classical scholar (1860–1948) who taught at Dundee and St Andrews.' },
    ],
    related: ['/scientists/charles-darwin', '/articles/euclids-elements-of-geometry', '/guides/best-biology-evolution-articles'],
  },

  'science-and-the-modern-world': {
    inside: [
      'Based on Alfred North Whitehead’s 1925 Lowell Lectures, this book traces how scientific ideas shaped modern thought from the 17th century to relativity and quantum theory. Whitehead follows the role of mathematics, the rise of a mechanical view of nature, the Romantic reaction against it, and the upheavals in physics of his own day.',
      'He warns against what he called the “fallacy of misplaced concreteness”: mistaking abstractions, such as particles moving in empty space, for the full reality they simplify. In its place he proposed a philosophy built on processes and relationships.',
    ],
    howToRead: 'Read the early chapters on the origins of modern science and on mathematics in the history of thought; the later chapters become more philosophical and demanding.',
    holdsUp: 'His argument that scientific abstractions are powerful but partial remains a valuable warning for scientists and philosophers alike.',
    changed: 'His discussion of quantum theory predates its full development in 1925–27, and historians now tell the story of the Scientific Revolution in more detail and from more perspectives.',
    faqs: [
      { question: 'What is the fallacy of misplaced concreteness?', answer: 'Whitehead’s name for mistaking an abstract model for concrete reality, such as treating the simplified objects of a theory as the whole truth about nature.' },
      { question: 'What are the Lowell Lectures?', answer: 'A long-running public lecture series in Boston. Whitehead gave the lectures behind this book in 1925.' },
    ],
    related: ['/articles/an-introduction-to-mathematics', '/articles/science-and-hypothesis', '/articles/how-instruments-changed-what-science-could-know'],
  },

  'the-voyage-of-the-beagle': {
    inside: [
      'This is Darwin’s account of his voyage around the world on HMS Beagle from 1831 to 1836. Most of the time was spent around South America, and he describes the geology of the Andes, giant fossil mammals in Argentina, an earthquake in Chile, the people of Tierra del Fuego and the wildlife of the Galápagos Islands.',
      'It first appeared in 1839 as Darwin’s Journal of Researches, and he revised it for later editions. It reads as a travel book written by a young naturalist learning to see.',
    ],
    howToRead: 'Read it as a travel book, a chapter at a time. The Galápagos chapter is the most famous, but the South American chapters on fossils, earthquakes and the Andes show Darwin’s thinking taking shape.',
    holdsUp: 'Darwin’s observations of geology, fossils and island wildlife were accurate, and his explanation of how coral reefs and atolls form, developed on the voyage, is still accepted.',
    changed: 'Some of his descriptions of the peoples he met reflect the prejudices of his time, and the book predates his theory of evolution, which later editions only hint at.',
    faqs: [
      { question: 'How long was Darwin’s voyage on the Beagle?', answer: 'Almost five years, from December 1831 to October 1836.' },
      { question: 'Is The Voyage of the Beagle easier to read than On the Origin of Species?', answer: 'Yes. It is a travel narrative full of vivid scenes, and the best first book for readers new to Darwin.' },
    ],
    related: ['/scientists/charles-darwin', '/articles/on-the-origin-of-species', '/articles/the-natural-history-of-selborne'],
  },

  'mans-place-in-nature-and-other-essays': {
    inside: [
      'Thomas Henry Huxley, known as “Darwin’s bulldog”, published Man’s Place in Nature in 1863. Its essays describe what was then known about the great apes, compare human anatomy in detail with that of gorillas and chimpanzees, and examine fossil human skulls, including the Neanderthal skull found in 1856.',
      'Huxley concluded that humans differ from the great apes less than the great apes differ from lower primates. It was the first major application of Darwin’s ideas to human origins, eight years before The Descent of Man.',
    ],
    howToRead: 'Start with the essay on the relations of man to the lower animals, which carries the main argument. The other essays in this collection show Huxley’s skill as a public explainer of science.',
    holdsUp: 'Huxley’s anatomical comparison was right: humans are closely related to the African great apes, a conclusion now confirmed by DNA.',
    changed: 'Very few human fossils were known in 1863. Today’s record, from early African hominins to finds such as the 773,000-year-old Casablanca fossils, gives a far richer picture.',
    faqs: [
      { question: 'Why was Huxley called Darwin’s bulldog?', answer: 'Because he defended Darwin’s theory fiercely in public, including a famous exchange with Bishop Samuel Wilberforce in Oxford in 1860.' },
      { question: 'What did Huxley conclude about humans and apes?', answer: 'That humans and the great apes are closely related in anatomy and belong in the same order of mammals, the primates.' },
    ],
    related: ['/articles/the-descent-of-man', '/articles/casablanca-morocco-hominin-fossils-773000-years-2026', '/scientists/charles-darwin'],
  },

  'the-evolution-of-modern-medicine': {
    inside: [
      'Sir William Osler, one of the most influential physicians of his era, traces medicine from ancient Egypt and Greece through the medieval Islamic world and Europe to the laboratory medicine of the 19th century. The book grew out of lectures he gave at Yale in 1913 and was published after his death.',
      'He follows the key turning points: Hippocrates and Galen, the Arabic medical writers, Vesalius’s anatomy, Harvey’s discovery of the circulation, the microscope, and the rise of public health and germ theory.',
    ],
    howToRead: 'Read it chapter by chapter as a story. The chapters on Greek and Arabic medicine and on the Renaissance are especially readable.',
    holdsUp: 'Osler’s central theme, that medicine improves when observation and experiment replace authority, is the core of evidence-based medicine today.',
    changed: 'Written before antibiotics, insulin and modern genetics, it ends before most of 20th-century medicine. Historians now also give more weight to medical traditions outside Europe.',
    faqs: [
      { question: 'Who was William Osler?', answer: 'A Canadian physician (1849–1919) who shaped medical training at Johns Hopkins and later became Regius Professor of Medicine at Oxford.' },
      { question: 'Does the book cover medicine in the Islamic world?', answer: 'Yes. Osler discusses Arabic medical writers such as al-Razi and Ibn Sina as part of the story.' },
    ],
    related: ['/scientists/ibn-sina', '/scientists/al-razi', '/scientists/louis-pasteur', '/scientists/ibn-al-nafis'],
  },

  'the-natural-history-of-selborne': {
    inside: [
      'Gilbert White, a country parson in the Hampshire village of Selborne, wrote letters over many years to two naturalists, Thomas Pennant and Daines Barrington, describing the birds, insects, plants, weather and seasons around his home. The letters were published together in 1789.',
      'White recorded when birds arrived and left, how swifts and swallows behaved, and how his tortoise Timothy passed the year. He was one of the first to tell apart three similar warblers, the chiffchaff, willow warbler and wood warbler, by their songs.',
    ],
    howToRead: 'Read a few letters at a time, ideally alongside your own notes on the nature around you. No science background is needed.',
    holdsUp: 'White’s patient, dated observations are a model for citizen science and phenology, the study of seasonal timing that now tracks the effects of climate change.',
    changed: 'White wondered whether swallows hibernate in winter instead of migrating; ringing and tracking studies have since shown that they fly to Africa.',
    faqs: [
      { question: 'Why is The Natural History of Selborne famous?', answer: 'It is often described as one of the most reprinted books in English and is a founding work of nature writing and careful field observation.' },
      { question: 'What is phenology?', answer: 'The study of the timing of seasonal events such as bird migration and flowering. White’s records are an early example.' },
    ],
    related: ['/articles/the-voyage-of-the-beagle', '/articles/north-pacific-winter-storm-track-poleward-shift-2026', '/guides/best-biology-evolution-articles'],
  },
};
