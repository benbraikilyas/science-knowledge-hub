import type { BookGuide } from './book-guides';

// Reading guides for the classic books linked to scanned Internet Archive and Gutenberg editions.
export const CLASSIC_BOOK_GUIDES: Record<string, BookGuide> = {
  'on-the-origin-of-species': {
    inside: [
      'The Origin opens with variation under domestication: pigeon breeders and farmers show how much living things vary and how selection over generations changes them. Darwin then argues that nature does the same. More individuals are born than can survive, and those with useful variations tend to leave more offspring. Over long periods this natural selection produces new varieties and, eventually, new species.',
      'The second half tests the theory against the evidence: gaps in the fossil record, instinct, hybrids, the geographic distribution of species on islands and continents, and shared anatomy and embryology. Darwin called the book “one long argument”, and he gives whole chapters to the strongest objections to his own idea.',
    ],
    howToRead: 'Read the first four chapters for the core argument, then jump to the final chapter, “Recapitulation and Conclusion”, which sums everything up and ends with the famous “tangled bank” passage. The middle chapters are best read by topic. The prose is long-winded but uses no mathematics; at a chapter a day it takes a few weeks.',
    holdsUp: 'Common descent and natural selection are among the best-supported ideas in science, confirmed by fossils, genetics and direct observation of evolution in bacteria, viruses and animals.',
    changed: 'Darwin had no working theory of heredity and, in later editions, leaned partly on the inheritance of acquired traits. Genetics, DNA and population genetics, combined with natural selection in the 20th century, supplied what he lacked.',
    faqs: [
      { question: 'Is On the Origin of Species hard to read?', answer: 'It is long and written in 19th-century prose, but it uses no mathematics. Most readers manage it in short sections, starting with the first four chapters and the conclusion.' },
      { question: 'Does the Origin discuss human evolution?', answer: 'Barely. Darwin wrote only that “light will be thrown on the origin of man and his history”. He took on human evolution in The Descent of Man (1871).' },
    ],
    related: ['/scientists/charles-darwin', '/articles/the-voyage-of-the-beagle', '/articles/the-descent-of-man', '/guides/best-biology-evolution-articles'],
  },

  'philosophiae-naturalis-principia-mathematica': {
    inside: [
      'The Principia opens with definitions of mass, momentum and force, followed by the three laws of motion. Book I works out how bodies move under forces in empty space, including the proof that an inverse-square force produces elliptical orbits. Book II deals with motion through resisting media such as air and water, and argues against Descartes’s theory that the planets are carried round by vortices.',
      'Book III, “The System of the World”, applies the results to the real universe. Newton uses observations of Jupiter’s moons, the planets and the Moon to establish universal gravitation, then explains the tides, the precession of the equinoxes, the flattened shape of the Earth and the paths of comets.',
    ],
    howToRead: 'Few people read the Principia straight through; Newton made it deliberately demanding. Read the Definitions and the Laws of Motion at the start, then go straight to Book III and its “Rules of Reasoning in Philosophy”. Dip into Book I only for the propositions you want to see proved. Motte’s English is old but clear.',
    holdsUp: 'The laws of motion and universal gravitation still predict the motions of planets, spacecraft and everyday objects with great accuracy, and Newton’s rules for reasoning from evidence remain good scientific advice.',
    changed: 'Einstein’s general relativity replaced Newton’s instantaneous force with curved spacetime and explained small effects Newton could not, such as the extra shift in Mercury’s orbit. Physics is now written in calculus and vectors rather than Newton’s geometric proofs.',
    faqs: [
      { question: 'What language was the Principia written in?', answer: 'Latin. Andrew Motte’s English translation appeared in 1729, and the free edition linked here is an 1848 printing of it.' },
      { question: 'What are Newton’s three laws of motion?', answer: 'A body keeps its state of rest or uniform motion unless a force acts on it; the change in motion is proportional to the force applied; and every action has an equal and opposite reaction.' },
    ],
    related: ['/scientists/isaac-newton', '/articles/opticks-treatise-of-light-colour', '/articles/dialogue-concerning-two-new-sciences', '/articles/general-relativity-curved-spacetime-working-gps'],
  },

  'relativity-the-special-and-general-theory': {
    inside: [
      'Einstein wrote this short book for readers without advanced mathematics. Part I builds special relativity from everyday scenes, a train on an embankment and lightning seen by different observers, to show why simultaneity depends on the observer. It then explains time dilation, length contraction and the link between mass and energy.',
      'Part II introduces general relativity through the equivalence of gravity and acceleration, using a closed chest pulled through empty space, and explains why light should bend near massive bodies. Part III asks what the theory says about the universe as a whole, including the idea of a space that is finite but has no boundary. Later editions added an appendix on experimental confirmations.',
    ],
    howToRead: 'Read it in order; each section is only a few pages and builds on the last. The only real mathematics is the algebra of the Lorentz transformation in the appendix, which you can skim. Most readers finish it in a few sittings.',
    holdsUp: 'The predictions discussed in the book, including time dilation, the bending of light and the gravitational redshift, have all been confirmed, and GPS satellites must correct for relativity to work.',
    changed: 'The picture of the universe in Part III assumed it was static; Edwin Hubble’s observations later showed it is expanding. Modern cosmology also includes dark matter and dark energy, which Einstein did not anticipate.',
    faqs: [
      { question: 'Do I need maths to read Einstein’s Relativity?', answer: 'Only a little algebra. Einstein wrote it for general readers, and the hardest parts can be skimmed without losing the argument.' },
      { question: 'When was Relativity: The Special and General Theory published?', answer: 'Einstein finished the German original at the end of 1916 and it was published in 1917; Robert Lawson’s English translation followed in 1920.' },
    ],
    related: ['/scientists/albert-einstein', '/articles/general-relativity-curved-spacetime-working-gps', '/articles/space-time-matter-hermann-weyl', '/learn#cosmic-explorer'],
  },

  'sidereus-nuncius-starry-messenger': {
    inside: [
      'Sidereus Nuncius is a short book. Galileo first describes his telescope, then the Moon: its bright and dark regions, the jagged line between day and night, and the mountains whose heights he estimated from their shadows. He then reports that the Milky Way and several cloudy patches resolve into crowds of individual stars.',
      'The longest section is a night-by-night log, beginning in January 1610, of four “stars” near Jupiter that keep changing position. Galileo’s sketches show them moving back and forth, and he concludes that they orbit Jupiter. He named them the Medicean stars after his patrons, the Medici family.',
    ],
    howToRead: 'It can be read in an evening. Follow Galileo’s Jupiter log with a pencil, or check it yourself: Jupiter’s four large moons are visible through ordinary binoculars on a clear night. The translation linked here also includes part of the preface to Kepler’s Dioptrics, which discusses Galileo’s discoveries.',
    holdsUp: 'Everything Galileo reported was right: the Moon is mountainous, the Milky Way is made of stars, and Jupiter has moons. His careful, dated observations remain a model of how to record evidence.',
    changed: 'Galileo could not know what stars or the Milky Way really are, and he saw only four of Jupiter’s moons; astronomers have now found more than ninety.',
    faqs: [
      { question: 'What did Galileo discover in Sidereus Nuncius?', answer: 'Mountains and craters on the Moon, countless stars in the Milky Way invisible to the naked eye, and four moons orbiting Jupiter.' },
      { question: 'Why is it called the Starry Messenger?', answer: 'Sidereus Nuncius is Latin and can mean either “starry messenger” or “starry message”. Galileo meant it as a report of news from the heavens.' },
    ],
    related: ['/scientists/galileo-galilei', '/articles/dialogue-concerning-two-new-sciences', '/articles/how-instruments-changed-what-science-could-know', '/guides/best-space-astronomy-articles'],
  },

  'euclids-elements-of-geometry': {
    inside: [
      'Book I starts with 23 definitions, five postulates and five common notions, then proves its first proposition: how to construct an equilateral triangle. Step by step it builds to Proposition 47, the Pythagorean theorem, and its converse. Book II turns geometry toward algebra, proving results about the areas of rectangles and squares that we would now write as algebraic identities.',
      'The later books, not included in the volume linked here, cover circles, proportion, similar figures, number theory, irrational magnitudes and solid geometry, ending with the five regular solids. Heath’s long introduction to this volume explains the history of the text and the commentators who preserved it.',
    ],
    howToRead: 'Work through Book I with paper and a compass, trying each proposition yourself before reading Euclid’s proof. Pause on the fifth postulate, about parallel lines: mathematicians spent two thousand years trying to prove it from the others before non-Euclidean geometry showed that they could not. Heath’s notes after each proposition are optional.',
    holdsUp: 'Every proof in Book I still works, and the idea of stating assumptions and deducing everything else from them is the foundation of all mathematics.',
    changed: 'In the 19th century mathematicians found gaps in Euclid’s axioms, such as unstated assumptions about which points lie between others, and David Hilbert supplied a complete set in 1899. Non-Euclidean geometries also showed that Euclid’s is one consistent geometry among several.',
    faqs: [
      { question: 'How many books are in Euclid’s Elements?', answer: 'Thirteen. The free volume linked here contains Books I and II with Thomas Heath’s introduction; the other books are in Heath’s second and third volumes.' },
      { question: 'What is the parallel postulate?', answer: 'Euclid’s fifth postulate. In a common modern form: through a point not on a line, exactly one line can be drawn parallel to it. Dropping it leads to non-Euclidean geometries.' },
    ],
    related: ['/articles/why-mathematical-proof-is-more-than-calculation', '/scientists/al-khwarizmi', '/articles/an-introduction-to-mathematics'],
  },

  'the-chemical-history-of-a-candle': {
    inside: [
      'The book records six lectures that Faraday gave to young people at the Royal Institution over Christmas 1860–61. Starting from a single candle, he shows how solid wax melts into a little cup, rises up the wick by capillary action and turns to vapour that burns. He then collects and tests what the flame produces: water, which he splits to reveal hydrogen and oxygen, and carbon dioxide.',
      'The last lectures connect the candle to the air we breathe. Faraday shows that breathing, like burning, uses oxygen and gives out carbon dioxide, and that plants take that carbon back from the air. Every point is made with a demonstration the audience could watch.',
    ],
    howToRead: 'Read one lecture at a time, ideally with a candle in front of you; Faraday tells you exactly what to look for. The book needs no science background, which is why teachers still use it with children.',
    holdsUp: 'The chemistry is correct: how combustion works, what water is made of, and the role of oxygen and carbon dioxide in breathing. Faraday’s way of teaching through careful observation is as good as ever.',
    changed: 'Faraday spoke before atoms and molecules were well understood, so a modern explanation of the flame would talk about molecules and energy. Some of his demonstrations use substances that schools now handle with more caution.',
    faqs: [
      { question: 'Who was The Chemical History of a Candle written for?', answer: 'Children and young people. It records Faraday’s Royal Institution Christmas Lectures of 1860–61.' },
      { question: 'Can I try Faraday’s candle experiments at home?', answer: 'The simplest observations, such as the melted cup of wax and the different zones of the flame, are safe with adult supervision. Others use chemicals and belong in a school laboratory.' },
    ],
    related: ['/scientists/michael-faraday', '/articles/experimental-researches-electricity-volume-one', '/guides/best-free-science-books'],
  },

  'dialogue-concerning-two-new-sciences': {
    inside: [
      'Like his earlier Dialogue, this book is a conversation among Salviati, Sagredo and Simplicio, spread over four “days”. The first two days found a new science of the strength of materials: why a beam breaks where it does, and why a larger structure is not simply a scaled-up smaller one, which is why giant animals need proportionally thicker bones.',
      'Days three and four found the science of motion. Galileo defines uniform and uniformly accelerated motion, shows with inclined-plane experiments that the distance a falling body covers grows with the square of the time, and proves that a projectile’s path is a parabola.',
    ],
    howToRead: 'Start with Day Three, where the science of motion is set out; it is the heart of the book. Day One contains famous digressions on the vacuum, infinity and how one might measure the speed of light, and is the most entertaining. The geometric proofs can be read lightly, because the dialogue explains what they mean.',
    holdsUp: 'Uniform acceleration in free fall, the parabolic path of projectiles and the square–cube law of scaling are all still correct and taught in every physics course.',
    changed: 'Galileo had no concept of force as Newton later defined it, so he could describe how bodies fall but not explain why. Modern engineering analyses materials with ideas of stress, strain and elasticity developed long after him.',
    faqs: [
      { question: 'What are the two new sciences?', answer: 'The strength of materials and the science of motion, now called kinematics.' },
      { question: 'Why was the book printed in the Netherlands?', answer: 'After his 1633 conviction Galileo could not publish in Italy, so the Elzevir firm printed it in Leiden in 1638.' },
    ],
    related: ['/scientists/galileo-galilei', '/articles/sidereus-nuncius-starry-messenger', '/articles/philosophiae-naturalis-principia-mathematica'],
  },

  'a-short-history-of-astronomy': {
    inside: [
      'Arthur Berry follows astronomy from the earliest sky-watching in Babylon and Egypt to the end of the 19th century. He explains how Greek astronomers built geometric models of the heavens, how astronomers in the Islamic world preserved and refined them, and how Copernicus, Tycho Brahe, Kepler and Galileo overturned the Earth-centred picture.',
      'The later chapters cover Newton’s gravitation, the age of precise observation, William Herschel’s surveys of stars and nebulae, and the beginning of astrophysics, when spectroscopy and photography let astronomers study what stars are made of.',
    ],
    howToRead: 'Read it chronologically; each chapter covers one period. Berry explains the mathematics in words and diagrams, so a general reader can follow. If you only have time for a few chapters, read those on Copernicus, Kepler and Newton.',
    holdsUp: 'Berry’s account of how astronomical ideas developed, and why each new model replaced the last, is still a sound and readable history.',
    changed: 'The book ends in 1898, before relativity, the discovery of other galaxies, the expanding universe and space telescopes. Historians also now give more credit to Islamic, Indian and Chinese astronomy than most Victorian histories did.',
    faqs: [
      { question: 'Is A Short History of Astronomy still accurate?', answer: 'Its history up to the 1890s is still largely reliable, but it ends before modern astrophysics and cosmology.' },
      { question: 'Who was Arthur Berry?', answer: 'A Cambridge mathematician and fellow of King’s College, who wrote the book in 1898 for general readers.' },
    ],
    related: ['/scientists/galileo-galilei', '/scientists/al-biruni', '/articles/the-story-of-the-heavens', '/guides/best-space-astronomy-articles'],
  },

  'science-and-hypothesis': {
    inside: [
      'Poincaré divides the book into four parts. On number and magnitude, he asks why reasoning by mathematical induction is so powerful. On space, he explains non-Euclidean geometry and argues that experiment alone cannot tell us which geometry is “true”: we choose the most convenient one. On force, he examines which principles of mechanics are experimental laws and which are definitions in disguise.',
      'The final part, on nature, discusses hypotheses in physics, probability, and the theories of light and electricity of his day. Throughout, Poincaré separates three kinds of statement: experimental facts, conventions we adopt, and hypotheses we can test.',
    ],
    howToRead: 'The chapters on space are the most famous and the easiest way in. Read the introduction, then Part II on space, then go back to number. There is little formal mathematics, but the arguments are dense, so one chapter at a time works best.',
    holdsUp: 'Poincaré’s point that theories contain choices as well as facts is still central to the philosophy of science, and his explanation of non-Euclidean geometry remains one of the clearest.',
    changed: 'General relativity, published 13 years later, made the geometry of space a physical question tested by observation, which challenged Poincaré’s view that geometry is purely a convention. His discussion of the ether belongs to physics before relativity.',
    faqs: [
      { question: 'What is conventionalism?', answer: 'Poincaré’s view that some basic principles of science, such as the axioms of geometry, are neither facts nor logical truths but conventions chosen because they are simple and useful.' },
      { question: 'Did Einstein read Science and Hypothesis?', answer: 'Yes. He and his friends in the “Olympia Academy” reading group in Bern read and discussed it a few years before his 1905 papers.' },
    ],
    related: ['/articles/euclids-elements-of-geometry', '/articles/why-mathematical-proof-is-more-than-calculation', '/learn#thinking-like-scientist', '/scientists/albert-einstein'],
  },

  'the-descent-of-man': {
    inside: [
      'In Part One, Darwin brings human beings into the theory of evolution. He compares human and animal anatomy and embryos, describes rudimentary organs, and argues that mental powers, language and even moral feeling differ from those of other animals in degree rather than in kind.',
      'Part Two, the larger part, is about sexual selection: competition for mates and the choice of mates. Darwin surveys insects, fish, birds and mammals to explain features such as antlers, bright plumage and song, then returns to humans in the final chapters.',
    ],
    howToRead: 'For the argument about human origins, read the first chapters of Part One and the general conclusion. In Part Two the chapters on birds are the most vivid. Read the sections on human races and on women with a critical eye.',
    holdsUp: 'Humans share common ancestry with the other apes, and sexual selection is a well-established process in evolutionary biology. Darwin was also right to suggest that Africa was the most likely birthplace of humankind.',
    changed: 'Darwin’s rankings of human races and his claims about the intellectual inferiority of women reflect Victorian prejudice and are rejected by modern science. Genetics shows that human populations differ far less than he assumed.',
    faqs: [
      { question: 'What is The Descent of Man about?', answer: 'Human evolution and sexual selection. Darwin argues that humans descend from earlier primates and explains how competition for mates and mate choice shape animals and people.' },
      { question: 'Is The Descent of Man racist?', answer: 'Parts of it are. It contains Victorian views on race and sex that modern science rejects, alongside arguments about evolution that still stand.' },
    ],
    related: ['/scientists/charles-darwin', '/articles/on-the-origin-of-species', '/articles/casablanca-morocco-hominin-fossils-773000-years-2026', '/articles/mans-place-in-nature-and-other-essays'],
  },

  'opticks-treatise-of-light-colour': {
    inside: [
      'Book One describes Newton’s prism experiments. Passing sunlight through a prism into a darkened room, he shows that it spreads into colours that each bend by a fixed amount, that a single colour cannot be split further, and that the colours recombine into white. He also explains the rainbow and why lens telescopes blur colours.',
      'Book Two studies the coloured rings that appear in thin films, now called Newton’s rings, and Book Three turns to diffraction, the bending of light around edges. The book ends with the Queries, a long list of open questions about light, heat, gravity and the forces between particles.',
    ],
    howToRead: 'Read Part One of Book One, where the key experiments are; Newton describes them clearly enough to follow along with a glass prism. Then read a few of the later Queries to see Newton speculating. The 18th-century spelling slows you down only at first.',
    holdsUp: 'White light is a mixture of colours that bend by different amounts. That discovery is the basis of spectroscopy, which tells astronomers what stars are made of.',
    changed: 'Newton favoured a particle theory of light. In the 19th century, interference experiments by Thomas Young and others established its wave nature, and quantum physics later showed that light has both wave and particle properties.',
    faqs: [
      { question: 'What is Newton’s Opticks about?', answer: 'Experiments on light and colour: the prism experiments showing that white light is a mixture of colours, coloured rings in thin films, and diffraction.' },
      { question: 'Was Opticks written in English?', answer: 'Yes. Unlike the Principia, the first edition of 1704 was in English; a Latin translation followed in 1706.' },
    ],
    related: ['/scientists/isaac-newton', '/scientists/ibn-al-haytham', '/articles/philosophiae-naturalis-principia-mathematica'],
  },

  'the-principles-of-psychology': {
    inside: [
      'William James spent twelve years on this two-volume book, which covers the brain and nervous system, habit, the stream of thought, the self, attention, memory, perception, reasoning, instinct, emotion and the will. He combines the physiology of his day with careful descriptions of what experience feels like from the inside.',
      'Its best-known chapters describe thought as a continuous stream rather than a chain of separate ideas, explain habit as the nervous system being shaped by repetition, and set out what became the James–Lange theory: that an emotion is our feeling of the body’s response to a situation.',
    ],
    howToRead: 'Do not start at page one. Read “Habit”, then “The Stream of Thought”, then “Attention” and “The Emotions”. James later wrote a shorter version, Psychology: Briefer Course (1892), for readers who want the whole system in less space.',
    holdsUp: 'Ideas such as the plasticity of the nervous system, the limits of attention and the power of habit fit well with modern neuroscience, and researchers still quote James’s descriptions of experience.',
    changed: 'The brain science dates from the 1880s, before neurons and synapses were well understood. Emotion research has also moved beyond the original James–Lange theory, keeping the role of bodily signals while adding the role of interpretation.',
    faqs: [
      { question: 'What is the stream of consciousness?', answer: 'James’s description of thought as continuous and ever-changing, flowing like a stream rather than arriving in separate pieces. In this book he calls it the stream of thought.' },
      { question: 'Is The Principles of Psychology still worth reading?', answer: 'Yes, for its ideas and its writing. Its brain science is dated, but many chapters remain insightful about habit, attention and the self.' },
    ],
    related: ['/articles/microns-mouse-visual-cortex-connectome-2025', '/articles/the-expression-of-the-emotions-in-man-and-animals', '/articles/how-transformer-models-process-language-and-fail'],
  },

  'an-introduction-to-mathematics': {
    inside: [
      'Whitehead wrote this short book in 1911 for a general series, to explain what mathematics is about rather than how to calculate. He begins with the idea of abstraction, then introduces variables, the use of symbols, and how mathematics expresses laws of nature.',
      'Later chapters cover negative and imaginary numbers, coordinate geometry, conic sections, functions, periodicity and trigonometry, series and the ideas behind calculus, always asking why each idea was worth inventing.',
    ],
    howToRead: 'Read it straight through; it is short and assumes only school mathematics. The chapters on symbolism and on periodicity in nature are highlights. Keep paper handy for the few worked examples.',
    holdsUp: 'Whitehead’s explanation of why abstraction and good notation make mathematics powerful is timeless, and the mathematics itself is unchanged.',
    changed: 'Some references to the science and schooling of 1911 are dated, and the book predates computers, now one of the main reasons people learn mathematics.',
    faqs: [
      { question: 'Who was Alfred North Whitehead?', answer: 'A British mathematician and philosopher who wrote Principia Mathematica with Bertrand Russell and later taught philosophy at Harvard.' },
      { question: 'Is An Introduction to Mathematics good for beginners?', answer: 'Yes. It assumes only school mathematics and explains ideas rather than drilling methods.' },
    ],
    related: ['/articles/euclids-elements-of-geometry', '/articles/why-mathematical-proof-is-more-than-calculation', '/articles/science-and-the-modern-world'],
  },

  'the-expression-of-the-emotions-in-man-and-animals': {
    inside: [
      'Darwin asks whether facial expressions are learned customs or inherited traits. He proposes three principles: some expressions began as useful actions and became habits, some are the opposite of a useful action, and some come straight from the excited nervous system. He then works through suffering and weeping, grief, joy and love, anger, contempt and disgust, surprise and fear, and blushing.',
      'His evidence came from watching his own children and pets, a questionnaire sent to missionaries and travellers around the world, photographs of actors and infants, and the French physician Duchenne’s photographs of faces whose muscles were stimulated with electricity.',
    ],
    howToRead: 'Start with the introduction and the chapters on the three principles, then choose the emotions that interest you. The photographic plates are part of the argument, so use the scanned edition linked here rather than a text-only version.',
    holdsUp: 'Darwin was right that some expressions are shared with other animals and that many are recognized across cultures, and his use of photographs and questionnaires was ahead of its time.',
    changed: 'Darwin accepted the inheritance of acquired habits, which genetics rejects. Researchers also now debate how universal facial expressions really are, because context and culture shape how people read faces.',
    faqs: [
      { question: 'Did Darwin think facial expressions are universal?', answer: 'He argued that several basic expressions are shared across cultures and with other animals because of common ancestry. Modern research supports some of this but finds more cultural variation than he expected.' },
      { question: 'Why does the book contain photographs?', answer: 'Darwin used them as evidence, which made it one of the first scientific books illustrated with photographs.' },
    ],
    related: ['/scientists/charles-darwin', '/articles/the-descent-of-man', '/articles/the-principles-of-psychology'],
  },

  'astronomy-for-amateurs': {
    inside: [
      'Flammarion wrote this book to turn readers into observers. He starts with the night sky as anyone can see it, the constellations, the pole star and the turning of the stars through the night and the seasons, then moves on to the Moon, the Sun and the planets.',
      'Along the way he covers eclipses, comets and meteor showers, and explains how astronomers work out the sizes and distances of objects in the sky, always with enthusiasm for what a small telescope can show.',
    ],
    howToRead: 'Read a chapter, then go outside. The book works best alongside the real sky or a free planetarium app. Its tone is poetic, so read it for the sense of wonder as much as for the facts.',
    holdsUp: 'Its guidance on finding the constellations and watching the Moon and planets is as useful today as it was when it was written.',
    changed: 'Flammarion was hopeful about life on Mars and other worlds, ideas that spacecraft have since tested. Figures for distances, moons and planetary details are out of date, so check them against current NASA data.',
    faqs: [
      { question: 'Who was Camille Flammarion?', answer: 'A French astronomer and writer (1842–1925) who founded the French Astronomical Society and wrote many popular books on astronomy.' },
      { question: 'Is Astronomy for Amateurs good for beginners?', answer: 'Yes, for learning the sky and catching the excitement of observing. Use a modern guide alongside it for up-to-date facts.' },
    ],
    related: ['/articles/a-field-book-of-the-stars', '/articles/astronomy-for-beginners-carrington', '/guides/best-space-astronomy-articles'],
  },
};
