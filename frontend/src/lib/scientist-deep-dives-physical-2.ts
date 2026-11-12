import type { ScientistDeepDive } from './scientist-deep-dives';

// Deeper profile sections for the second group of physical scientists, written for ScienceHub.
export const PHYSICAL_SCIENCE_DEEP_DIVES_2: Record<string, ScientistDeepDive> = {
  'niels-bohr': {
    summary: 'Niels Bohr (1885–1962) was a Danish physicist who explained atomic structure with quantized electron orbits and guided the development of quantum mechanics.',
    earlyLife: 'Bohr was born in Copenhagen; his father was a professor of physiology and his mother came from a prominent Jewish banking family. He and his brother Harald, later a mathematician, were keen footballers. After a doctorate on the behaviour of electrons in metals in 1911 he went to England, first to J. J. Thomson in Cambridge and then to Ernest Rutherford in Manchester, who had just discovered the atomic nucleus.',
    work: [
      'Rutherford’s atom had a problem: by the known laws, an electron circling a nucleus should radiate its energy away and spiral inwards in a fraction of a second. In 1913 Bohr proposed that electrons can occupy only certain orbits with fixed energies, and that an atom gives off light only when an electron drops from a higher orbit to a lower one. The energy difference sets the colour. The model reproduced the measured spectrum of hydrogen exactly.',
      'In the 1920s his Copenhagen institute hosted Heisenberg, Pauli, Dirac and many others while the full theory of quantum mechanics took shape. Bohr’s complementarity principle holds that wave and particle descriptions are both needed but cannot be applied in the same experiment. His long, friendly argument with Einstein over whether the theory is complete sharpened the questions later tested in experiments on entanglement.',
    ],
    timeline: [
      ['1885', 'Born in Copenhagen on 7 October.'],
      ['1912', 'Works with Rutherford in Manchester.'],
      ['1913', 'Publishes his quantum model of the hydrogen atom.'],
      ['1921', 'Opens the Institute for Theoretical Physics in Copenhagen.'],
      ['1922', 'Receives the Nobel Prize in Physics.'],
      ['1927', 'Presents complementarity; debates with Einstein begin at the Solvay Conference.'],
      ['1939', 'Publishes the theory of nuclear fission with John Wheeler.'],
      ['1943', 'Escapes from occupied Denmark to Sweden, then Britain and the United States.'],
      ['1962', 'Dies in Copenhagen on 18 November.'],
    ],
    myths: [
      { myth: 'Electrons really orbit the nucleus like planets.', fact: 'The orbit picture was a stepping stone. Quantum mechanics replaced it in the 1920s with electron clouds that give only the probability of finding an electron in a region. The energy levels survived; the orbits did not.' },
      { myth: 'Bohr and Einstein were bitter rivals.', fact: 'They disagreed deeply about quantum theory and remained close friends who admired each other. Bohr was still thinking about Einstein’s objections the night before he died.' },
    ],
    legacy: 'Energy levels, quantum jumps and the idea that measurement shapes what can be said about a quantum system all trace back to Bohr. He helped found CERN, and the institute in Copenhagen now carries his name. His son Aage Bohr won the Nobel Prize in Physics in 1975.',
    faqs: [
      { question: 'What is the Bohr model?', answer: 'A 1913 model of the atom in which electrons move in fixed orbits with definite energies and emit or absorb light when they jump between them.' },
      { question: 'What did Niels Bohr win the Nobel Prize for?', answer: 'The 1922 Nobel Prize in Physics, for his work on the structure of atoms and the radiation they emit.' },
      { question: 'What is the Copenhagen interpretation?', answer: 'The view of quantum mechanics developed mainly by Bohr and Heisenberg, in which the theory predicts probabilities of measurement results and does not describe definite properties between measurements.' },
    ],
    related: ['/articles/theory-of-spectra-and-atomic-constitution', '/scientists/ernest-rutherford', '/scientists/albert-einstein', '/guides/best-quantum-physics-explainers'],
  },

  'max-planck': {
    summary: 'Max Planck (1858–1947) was a German physicist who introduced the quantum of energy in 1900, founding quantum theory.',
    earlyLife: 'Planck was born in Kiel into a family of lawyers and theologians and grew up in Munich. He was a gifted pianist and considered a career in music. When he asked the Munich professor Philipp von Jolly about studying physics, he was told that nearly everything in the field had already been discovered. He chose it anyway, wrote his doctorate on the second law of thermodynamics at twenty-one and became a professor in Berlin in 1889.',
    work: [
      'In the 1890s physicists were trying to explain black-body radiation: the glow of a perfectly absorbing object, whose colour depends only on its temperature. Existing theories fitted the measurements at some wavelengths and failed at others. In October 1900 Planck found a formula that matched all the data. To derive it, he had to assume that the tiny oscillators in the walls of the body can hold energy only in whole multiples of a basic amount, equal to their frequency times a new constant, h.',
      'He presented the derivation on 14 December 1900, a date often called the birthday of quantum physics. Planck thought of the energy packets as a calculating device and spent years trying to reconcile them with classical physics. It was Einstein who argued in 1905 that light itself consists of quanta. Planck’s constant now appears in every equation of quantum theory, and since 2019 it has defined the kilogram.',
    ],
    timeline: [
      ['1858', 'Born in Kiel on 23 April.'],
      ['1879', 'Receives his doctorate in Munich.'],
      ['1889', 'Moves to the University of Berlin.'],
      ['1900', 'Presents the quantum derivation of the radiation law on 14 December.'],
      ['1918', 'Awarded the Nobel Prize in Physics.'],
      ['1930', 'Becomes president of the Kaiser Wilhelm Society.'],
      ['1945', 'His son Erwin is executed for his part in the plot against Hitler.'],
      ['1947', 'Dies in Göttingen on 4 October.'],
    ],
    myths: [
      { myth: 'Planck set out to overthrow classical physics.', fact: 'He was a conservative thinker who later described the quantum assumption as an act of desperation, made because nothing else gave the right formula. He hoped for years that it could be avoided.' },
      { myth: 'He was trying to solve the “ultraviolet catastrophe”.', fact: 'That phrase was coined by Paul Ehrenfest in 1911. Planck’s aim in 1900 was to explain precise new measurements made in Berlin, not to rescue a theory from an infinite result.' },
    ],
    legacy: 'Quantum theory, and with it lasers, transistors and modern chemistry, begins with Planck’s constant. The Planck length and Planck time, built from fundamental constants, mark the scale at which present physics breaks down. The Max Planck Society runs more than eighty research institutes, and a European space telescope that mapped the afterglow of the Big Bang was named Planck.',
    faqs: [
      { question: 'What did Max Planck discover?', answer: 'That energy is emitted and absorbed in discrete amounts, called quanta, with energy equal to frequency multiplied by Planck’s constant.' },
      { question: 'What is Planck’s constant?', answer: 'A fundamental constant of nature, about 6.626 × 10⁻³⁴ joule-seconds, that sets the scale of quantum effects.' },
      { question: 'Why is Planck called the father of quantum theory?', answer: 'Because his 1900 explanation of black-body radiation was the first to use the idea of quantized energy, on which the whole theory was later built.' },
    ],
    related: ['/articles/the-theory-of-heat-radiation', '/articles/treatise-on-thermodynamics-planck', '/scientists/albert-einstein', '/scientists/niels-bohr'],
  },

  'enrico-fermi': {
    summary: 'Enrico Fermi (1901–1954) was an Italian-American physicist who built the first nuclear reactor and made major discoveries in both theoretical and experimental physics.',
    earlyLife: 'Fermi was born in Rome, the son of a railway official. After the sudden death of his older brother he buried himself in physics and mathematics books bought at a market stall. His entrance essay for the Scuola Normale Superiore in Pisa, written at seventeen, was judged worthy of a doctoral candidate. He studied in Göttingen and Leiden and at twenty-five was appointed to a new chair of theoretical physics in Rome.',
    work: [
      'In 1926 Fermi worked out how to count the states of particles that cannot share the same quantum state, such as electrons. These particles are now called fermions. In 1933 he explained beta decay, in which a nucleus emits an electron, by proposing a new force and using the light neutral particle suggested by Wolfgang Pauli, which Fermi named the neutrino. The following year his group in Rome bombarded element after element with neutrons and found that slowing the neutrons down, by passing them through paraffin or water, made them far more effective.',
      'That discovery became the principle of the nuclear reactor. In a squash court under a stadium at the University of Chicago, Fermi’s team stacked graphite blocks and uranium into a pile, with graphite slowing the neutrons released by each fission so that they would cause more. On 2 December 1942 the control rods were withdrawn and the reaction sustained itself for the first time. Fermi was known for quick estimates: at the first atomic bomb test he dropped scraps of paper as the blast wave passed and judged its strength from how far they moved.',
    ],
    timeline: [
      ['1901', 'Born in Rome on 29 September.'],
      ['1926', 'Develops the statistics of fermions.'],
      ['1933', 'Formulates the theory of beta decay.'],
      ['1934', 'Discovers the effect of slow neutrons.'],
      ['1938', 'Receives the Nobel Prize and emigrates to the United States.'],
      ['1942', 'Chicago Pile-1 achieves a self-sustaining chain reaction on 2 December.'],
      ['1944', 'Joins the Los Alamos laboratory.'],
      ['1954', 'Dies in Chicago on 28 November.'],
    ],
    myths: [
      { myth: 'Fermi discovered new elements heavier than uranium.', fact: 'His Nobel citation credited him with new radioactive elements, but what he had actually produced in uranium was fission, as Otto Hahn, Fritz Strassmann, Lise Meitner and Otto Frisch showed weeks after the prize.' },
      { myth: 'The Fermi paradox comes from a scientific paper.', fact: 'It comes from a lunchtime conversation at Los Alamos in 1950, when Fermi asked, in effect, “Where is everybody?” about extraterrestrial civilizations. He never published on it.' },
    ],
    legacy: 'Every nuclear power station descends from Chicago Pile-1. Fermi’s name is attached to an element, a class of particles, a unit of length, America’s main particle physics laboratory and a gamma-ray space telescope. “Fermi problems”, rough estimates built from simple assumptions, are still used to teach physical reasoning.',
    faqs: [
      { question: 'What is Enrico Fermi famous for?', answer: 'For building the first nuclear reactor in 1942, for the theory of beta decay and for the statistics that describe particles such as electrons.' },
      { question: 'What is the Fermi paradox?', answer: 'The contrast between the apparent likelihood of other civilizations in a vast, old galaxy and the absence of any evidence of them.' },
      { question: 'Why did Fermi leave Italy?', answer: 'Mussolini’s racial laws of 1938 threatened his wife Laura, who was Jewish. The family travelled to Stockholm for the Nobel ceremony and went on to New York instead of returning.' },
    ],
    related: ['/scientists/lise-meitner', '/scientists/ernest-rutherford', '/scientists/john-von-neumann', '/categories/physics'],
  },

  'james-clerk-maxwell': {
    summary: 'James Clerk Maxwell (1831–1879) was a Scottish physicist who unified electricity, magnetism and light in a single theory of the electromagnetic field.',
    earlyLife: 'Maxwell was born in Edinburgh and raised on his family’s estate at Glenlair in south-west Scotland, where his constant question was “What’s the go o’ that?” His mother died when he was eight. At fourteen he wrote a paper on drawing oval curves with pins and thread that was read to the Royal Society of Edinburgh. He studied at Edinburgh and then Cambridge, graduating second in mathematics in 1854.',
    work: [
      'Faraday had pictured electric and magnetic effects as lines of force filling space but had not expressed the idea mathematically. Maxwell did. In papers from 1855 to 1865 he built a set of equations for the electric and magnetic fields and added one new term, which says that a changing electric field produces a magnetic field. With that term the equations predict waves travelling at a speed he could calculate from laboratory measurements of electricity. It came out equal to the measured speed of light.',
      'He also treated a gas as a vast number of molecules moving at different speeds and worked out the statistical distribution of those speeds, introducing probability into physics. From it he predicted, and then confirmed with his wife Katherine’s help, that the viscosity of a gas does not depend on its pressure. In 1861 he showed that any colour can be made from red, green and blue by projecting three photographs of a tartan ribbon through coloured filters.',
    ],
    timeline: [
      ['1831', 'Born in Edinburgh on 13 June.'],
      ['1856', 'Becomes professor of natural philosophy at Marischal College, Aberdeen.'],
      ['1859', 'Publishes his proof that Saturn’s rings consist of many small particles.'],
      ['1860', 'Moves to King’s College London; publishes the distribution of molecular speeds.'],
      ['1861', 'Demonstrates the first colour photograph.'],
      ['1865', 'Publishes “A Dynamical Theory of the Electromagnetic Field”.'],
      ['1871', 'Appointed the first Cavendish Professor at Cambridge.'],
      ['1873', 'Publishes A Treatise on Electricity and Magnetism.'],
      ['1879', 'Dies in Cambridge on 5 November.'],
    ],
    myths: [
      { myth: 'Maxwell wrote down the four Maxwell equations.', fact: 'His own version had twenty equations in twenty unknowns. Oliver Heaviside and others rewrote them in the compact four-equation vector form in the 1880s.' },
      { myth: 'His theory was accepted at once.', fact: 'It was regarded as difficult and speculative for twenty years. Heinrich Hertz produced and detected electromagnetic waves in 1887–1888, eight years after Maxwell’s death, and settled the matter.' },
    ],
    legacy: 'Radio, television, radar, mobile phones and Wi-Fi all rest on Maxwell’s equations. Einstein, who kept a picture of Maxwell on his study wall, started from them when he developed special relativity. Maxwell’s statistical methods led to modern thermodynamics, and his thought experiment about a sorting “demon” still drives research into the physics of information.',
    faqs: [
      { question: 'What are Maxwell’s equations?', answer: 'Four equations that describe how electric charges and currents produce electric and magnetic fields and how those fields change and travel as waves.' },
      { question: 'What did Maxwell discover about light?', answer: 'That light is an electromagnetic wave, a moving pattern of electric and magnetic fields, and that other such waves with different wavelengths must exist.' },
      { question: 'What is Maxwell’s demon?', answer: 'A thought experiment in which a tiny being sorts fast and slow molecules and so appears to defeat the second law of thermodynamics. Resolving it showed that handling information has a physical cost.' },
    ],
    related: ['/articles/five-of-maxwells-papers', '/scientists/michael-faraday', '/scientists/albert-einstein', '/articles/experimental-researches-electricity-volume-one'],
  },

  'johannes-kepler': {
    summary: 'Johannes Kepler (1571–1630) was a German astronomer who discovered that planets move in ellipses and formulated the three laws of planetary motion.',
    earlyLife: 'Kepler was born in Weil der Stadt in south-west Germany into a family in decline; his father was a mercenary who left when Johannes was a child. Smallpox damaged his eyesight and hands. A scholarship took him to the University of Tübingen to train as a Lutheran minister, and there his teacher Michael Maestlin introduced him to the Copernican system. In 1594 he was sent to teach mathematics in Graz.',
    work: [
      'In 1600 Kepler joined Tycho Brahe, whose observations were the most accurate ever made, and was set to work on Mars. After Tycho’s death he inherited the data and the title of imperial mathematician. Years of calculation left a discrepancy of eight minutes of arc between the best circular orbit and Tycho’s positions, and Kepler would not ignore it. He found that Mars moves on an ellipse with the Sun at one focus, and that a line from the Sun to the planet sweeps out equal areas in equal times. Both laws appeared in Astronomia Nova in 1609.',
      'A third law followed in 1619: the square of a planet’s period is proportional to the cube of its average distance from the Sun. Kepler believed some force from the Sun drove the planets, a step towards physical astronomy. He also founded modern optics, showing that the eye’s lens casts an inverted image on the retina, explaining how spectacles correct sight and describing a telescope with two convex lenses.',
    ],
    timeline: [
      ['1571', 'Born in Weil der Stadt on 27 December.'],
      ['1596', 'Publishes Mysterium Cosmographicum, defending Copernicus.'],
      ['1600', 'Joins Tycho Brahe near Prague.'],
      ['1604', 'Observes a supernova and publishes his work on optics.'],
      ['1609', 'Publishes Astronomia Nova with the first two laws.'],
      ['1619', 'Publishes Harmonices Mundi with the third law.'],
      ['1621', 'His mother is released after a six-year witchcraft case in which he led her defence.'],
      ['1627', 'Publishes the Rudolphine Tables.'],
      ['1630', 'Dies in Regensburg on 15 November.'],
    ],
    myths: [
      { myth: 'Kepler poisoned Tycho Brahe to get his data.', fact: 'Tycho’s remains were examined again in 2010, and the tests found mercury levels too low to have killed him. He most likely died of a bladder or kidney condition.' },
      { myth: 'Kepler rejected astrology as superstition.', fact: 'He criticized much of it but cast horoscopes throughout his life, partly for income, and believed the heavens had some influence on the Earth.' },
    ],
    legacy: 'Newton showed that Kepler’s three laws follow from an inverse-square force of gravity, and they are still used to plan spacecraft trajectories and to weigh stars and black holes. The Kepler space telescope, named for him, found thousands of planets around other stars. His Somnium, a story of a journey to the Moon, is sometimes called an early work of science fiction.',
    faqs: [
      { question: 'What are Kepler’s three laws?', answer: 'Planets move in ellipses with the Sun at one focus; a line from the Sun to a planet sweeps equal areas in equal times; and the square of the orbital period is proportional to the cube of the average distance from the Sun.' },
      { question: 'How did Kepler discover that orbits are ellipses?', answer: 'By fitting Tycho Brahe’s precise observations of Mars. No combination of circles matched them closely enough, and an ellipse did.' },
      { question: 'Did Kepler and Galileo know each other?', answer: 'They never met but exchanged letters. Kepler publicly supported Galileo’s telescope discoveries in 1610; Galileo never adopted Kepler’s ellipses.' },
    ],
    related: ['/scientists/nicolaus-copernicus', '/scientists/galileo-galilei', '/scientists/isaac-newton', '/articles/a-short-history-of-astronomy'],
  },

  'nicolaus-copernicus': {
    summary: 'Nicolaus Copernicus (1473–1543) was a Polish astronomer who proposed that the Earth and planets revolve around the Sun.',
    earlyLife: 'Copernicus was born in Toruń, a trading city on the Vistula, the son of a merchant. After his father’s death he was brought up by his uncle Lucas Watzenrode, later bishop of Warmia, who paid for a long education: liberal arts in Kraków, church law in Bologna, where he lodged with the astronomer Domenico Maria Novara, and medicine in Padua. He took a doctorate in canon law at Ferrara in 1503 and returned to serve the cathedral chapter of Warmia.',
    work: [
      'In the system of Ptolemy the Earth stood still at the centre, and each planet needed its own arrangement of circles to account for the loops it traces in the sky. Copernicus saw that if the Earth is itself a planet, the loops are an illusion caused by our own motion as we overtake or are overtaken by the others. The same assumption fixes the order of the planets by the time each takes to circle the Sun, from Mercury out to Saturn.',
      'He circulated a short outline, the Commentariolus, among friends around 1514 and spent decades working out the full mathematics. A young mathematician from Wittenberg, Georg Joachim Rheticus, came to study with him in 1539, published a first report and persuaded him to release the manuscript. On the Revolutions of the Heavenly Spheres was printed in Nuremberg in 1543. Tradition says a copy reached Copernicus on the day he died.',
    ],
    timeline: [
      ['1473', 'Born in Toruń on 19 February.'],
      ['1491', 'Enters the University of Kraków.'],
      ['1496', 'Begins studies in Bologna.'],
      ['1503', 'Receives a doctorate in canon law at Ferrara.'],
      ['c. 1514', 'Circulates the Commentariolus, his first sketch of heliocentrism.'],
      ['1539', 'Rheticus arrives in Frombork.'],
      ['1543', 'On the Revolutions is published; Copernicus dies in Frombork on 24 May.'],
      ['1616', 'The book is placed on the Catholic Index “until corrected”.'],
    ],
    myths: [
      { myth: 'Copernicus was the first to say the Earth goes around the Sun.', fact: 'Aristarchus of Samos proposed it in the third century BC, and Copernicus knew this. What he added was a complete mathematical system able to compete with Ptolemy’s.' },
      { myth: 'His system was simpler and more accurate than Ptolemy’s.', fact: 'He kept perfect circles and still needed small extra circles, and his predictions were about as accurate as the old ones. Its advantage was that it explained the pattern of planetary motions as a whole.' },
    ],
    legacy: 'The “Copernican revolution” removed the Earth from the centre of the universe and prepared the way for Kepler’s laws, Galileo’s telescope and Newton’s gravity. Some of the mathematical devices in his book match those developed earlier by the astronomers of Maragha and Damascus. His remains were identified in Frombork Cathedral using DNA and reburied there in 2010.',
    faqs: [
      { question: 'What did Copernicus discover?', answer: 'He proposed and worked out in detail the heliocentric model, in which the Earth rotates daily and orbits the Sun yearly with the other planets.' },
      { question: 'Was Copernicus punished by the Church?', answer: 'No. He was a church official in good standing and dedicated his book to the pope. It was restricted in 1616, seventy-three years after his death, during the Galileo affair.' },
      { question: 'Why did Copernicus wait so long to publish?', answer: 'He feared ridicule for an idea that seemed to contradict common sense, as he says in his preface, and he wanted the mathematics to be complete.' },
    ],
    related: ['/scientists/johannes-kepler', '/scientists/galileo-galilei', '/scientists/nasir-al-din-al-tusi', '/articles/sidereus-nuncius-starry-messenger'],
  },

  'erwin-schrodinger': {
    summary: 'Erwin Schrödinger (1887–1961) was an Austrian physicist who formulated the wave equation of quantum mechanics and devised the Schrödinger’s cat thought experiment.',
    earlyLife: 'Schrödinger was born in Vienna, the only child of a cultured family, and was taught at home until he was ten. He studied physics at the University of Vienna, where the tradition of Ludwig Boltzmann was strong, and served as an artillery officer in the First World War. After short posts in Germany he became professor of theoretical physics in Zurich in 1921.',
    work: [
      'In 1924 Louis de Broglie suggested that electrons have a wavelength. A colleague in Zurich remarked that if there are waves, there should be a wave equation. Over a few weeks at the end of 1925 Schrödinger found one. Applied to hydrogen, it yields the atom’s energy levels as naturally as the notes of a vibrating string, without Bohr’s arbitrary rules. Four papers in 1926 developed the method, which chemists and physicists use daily.',
      'What the wave represents was disputed from the start. Max Born proposed that it gives the probability of finding a particle at each place, which Schrödinger disliked. In 1935, replying to a paper by Einstein and colleagues, he imagined a cat shut in a box with a device that kills it if a single atom decays. The theory seems to say that until someone looks, the cat is in a blend of alive and dead. He meant the example to show that something was missing.',
    ],
    timeline: [
      ['1887', 'Born in Vienna on 12 August.'],
      ['1921', 'Becomes professor in Zurich.'],
      ['1926', 'Publishes the wave equation in a series of four papers.'],
      ['1927', 'Succeeds Max Planck in Berlin.'],
      ['1933', 'Leaves Germany; shares the Nobel Prize in Physics with Paul Dirac.'],
      ['1935', 'Publishes the cat paradox and introduces the term “entanglement”.'],
      ['1939', 'Settles in Dublin at the invitation of Éamon de Valera.'],
      ['1944', 'Publishes What Is Life?'],
      ['1961', 'Dies in Vienna on 4 January.'],
    ],
    myths: [
      { myth: 'Schrödinger believed a cat could be both alive and dead.', fact: 'He called the idea ridiculous. The cat was his argument that the standard interpretation gives absurd results when carried up to the scale of everyday objects.' },
      { myth: 'The cat experiment was actually carried out.', fact: 'It was only ever a thought experiment. Laboratories do create analogous superpositions in atoms, photons and small circuits, which physicists call “cat states”.' },
    ],
    legacy: 'The Schrödinger equation is the working tool of quantum chemistry, materials science and electronics. Entanglement, which he named and called the characteristic trait of quantum mechanics, is now the resource behind quantum computing and quantum cryptography. James Watson, Francis Crick and Maurice Wilkins each credited What Is Life? with turning them towards the problem of the gene.',
    faqs: [
      { question: 'What is the Schrödinger equation?', answer: 'The equation that tells how the wave function of a quantum system changes over time. From the wave function, physicists calculate the probabilities of measurement results.' },
      { question: 'What is Schrödinger’s cat?', answer: 'A thought experiment in which a cat’s fate depends on a random quantum event, used to question what it means for a quantum system to be in two states at once.' },
      { question: 'What did Schrödinger win the Nobel Prize for?', answer: 'He shared the 1933 prize with Paul Dirac for discovering new productive forms of atomic theory, meaning wave mechanics.' },
    ],
    related: ['/articles/quantum-entanglement-without-faster-than-light-myth', '/articles/how-bell-tests-turned-quantum-debate-into-data', '/scientists/niels-bohr', '/learn#quantum-reality'],
  },

  'ernest-rutherford': {
    summary: 'Ernest Rutherford (1871–1937) was a New Zealand-born physicist who discovered the atomic nucleus, explained radioactivity and achieved the first artificial nuclear reaction.',
    earlyLife: 'Rutherford was born near Nelson on New Zealand’s South Island, the fourth of twelve children of a flax miller and a schoolteacher. Scholarships carried him to Canterbury College in Christchurch and then, in 1895, to the Cavendish Laboratory in Cambridge as one of its first research students from outside the university. He is said to have been digging potatoes when the news came and to have declared it the last potato he would dig.',
    work: [
      'At McGill University in Montreal from 1898 he sorted the rays from radioactive substances into two kinds by their penetrating power and named them alpha and beta. With the chemist Frederick Soddy he showed that radioactivity is the spontaneous change of one element into another, and that each radioactive substance decays by half in a fixed time. The idea that atoms could change contradicted a century of chemistry, and it won him the Nobel Prize in Chemistry.',
      'At Manchester in 1909 Hans Geiger and the student Ernest Marsden, at Rutherford’s suggestion, looked for alpha particles scattered backwards from a thin gold foil, and found some. Rutherford said it was as if a shell fired at tissue paper had come back and hit you. In 1911 he explained it: almost all the atom’s mass is in a nucleus about ten thousand times smaller than the atom. In 1917 he found that alpha particles striking nitrogen knock out hydrogen nuclei, which he later named protons, turning the nitrogen into oxygen.',
    ],
    timeline: [
      ['1871', 'Born at Brightwater, near Nelson, on 30 August.'],
      ['1895', 'Arrives at the Cavendish Laboratory, Cambridge.'],
      ['1899', 'Names alpha and beta radiation at McGill.'],
      ['1902–1903', 'With Soddy, publishes the transformation theory of radioactivity.'],
      ['1908', 'Receives the Nobel Prize in Chemistry.'],
      ['1911', 'Proposes the nuclear atom.'],
      ['1919', 'Reports the first artificial nuclear reaction; becomes director of the Cavendish.'],
      ['1932', 'Chadwick discovers the neutron and Cockcroft and Walton split a nucleus with a particle accelerator, both in his laboratory.'],
      ['1937', 'Dies in Cambridge on 19 October; buried in Westminster Abbey.'],
    ],
    myths: [
      { myth: 'Rutherford performed the gold-foil experiment himself.', fact: 'Geiger and Marsden did the counting, sitting in the dark and recording tiny flashes on a screen. Rutherford proposed the test and worked out what the results meant.' },
      { myth: 'He thought nuclear energy would power the world.', fact: 'In 1933 he dismissed the idea of extracting useful energy from atoms as “moonshine”. The chain reaction that made it possible was conceived shortly afterwards by Leo Szilard.' },
    ],
    legacy: 'Rutherford is often called the father of nuclear physics. His students and co-workers included Niels Bohr, James Chadwick, Otto Hahn, Hans Geiger and Pyotr Kapitsa, and at least eleven of them won Nobel Prizes. The nuclear atom he described is the one found in every chemistry textbook.',
    faqs: [
      { question: 'What did Rutherford discover?', answer: 'The atomic nucleus, the proton, the nature of alpha and beta radiation, the law of radioactive decay and the first artificial transformation of one element into another.' },
      { question: 'What was the gold-foil experiment?', answer: 'An experiment in which alpha particles were fired at very thin gold foil. Most passed through, but a few bounced back, showing that the atom has a tiny, dense, positively charged core.' },
      { question: 'Why did Rutherford win the Chemistry prize and not Physics?', answer: 'The Nobel committee classed the transformation of elements as chemistry. Rutherford, a proud physicist, joked that it was the fastest transformation he had ever seen.' },
    ],
    related: ['/scientists/niels-bohr', '/scientists/marie-curie', '/articles/alice-lead-to-gold-lhc-nuclear-transmutation-2025', '/categories/physics'],
  },

  'dmitri-mendeleev': {
    summary: 'Dmitri Mendeleev (1834–1907) was a Russian chemist who devised the periodic table of the elements and correctly predicted elements not yet discovered.',
    earlyLife: 'Mendeleev was born in Tobolsk in western Siberia, the last child of a headmaster who went blind and died while Dmitri was still at school. His mother, Maria, ran a glass factory to support the family; when it burned down she travelled some two thousand kilometres with him to Moscow and then St Petersburg to get him into college, and died soon after he was admitted. He trained as a teacher, studied in Heidelberg and attended the 1860 Karlsruhe congress, where chemists agreed on consistent atomic weights.',
    work: [
      'Appointed professor at St Petersburg, Mendeleev needed a way to organize the elements for his textbook Principles of Chemistry. Early in 1869 he wrote each element’s weight and properties on a card and tried arrangements. Ordered by atomic weight, the elements fell into families with similar behaviour that recurred at intervals. His table was presented to the Russian Chemical Society in March 1869.',
      'He then did what set him apart. Where the pattern demanded an element that did not exist, he left a space and predicted its atomic weight, density and compounds. Where an accepted atomic weight put an element in the wrong family, he said the measurement must be wrong. Gallium, found in 1875, scandium in 1879 and germanium in 1886 matched his forecasts. The pattern was later explained by atomic number and electron shells, of which he knew nothing.',
    ],
    timeline: [
      ['1834', 'Born in Tobolsk on 8 February.'],
      ['1855', 'Graduates from the Main Pedagogical Institute in St Petersburg.'],
      ['1860', 'Attends the Karlsruhe congress of chemists.'],
      ['1869', 'Presents the periodic system.'],
      ['1871', 'Publishes detailed predictions of three undiscovered elements.'],
      ['1875', 'Gallium is discovered, confirming the first prediction.'],
      ['1893', 'Becomes director of the Russian Bureau of Weights and Measures.'],
      ['1907', 'Dies in St Petersburg on 2 February.'],
    ],
    myths: [
      { myth: 'The periodic table came to him complete in a dream.', fact: 'The story comes from a friend’s recollection years later. Even if he did nap during the work, the table was the result of long study, and he went on revising it for years.' },
      { myth: 'Mendeleev invented the 40 per cent standard for vodka.', fact: 'His doctoral thesis was on mixtures of alcohol and water, but the Russian standard of 40 per cent was set in 1843, when he was nine years old.' },
    ],
    legacy: 'The periodic table now holds 118 elements and still follows Mendeleev’s layout of rows and families. Others, including Lothar Meyer and John Newlands, found periodic patterns in the same decade, but his predictions gave the idea its authority. He was nominated for the Nobel Prize in 1906 and lost by a single vote.',
    faqs: [
      { question: 'What did Mendeleev do?', answer: 'He arranged the chemical elements into the periodic table in 1869 and used it to predict the existence and properties of undiscovered elements.' },
      { question: 'Which elements did Mendeleev predict?', answer: 'Most famously gallium, scandium and germanium, which he called eka-aluminium, eka-boron and eka-silicon.' },
      { question: 'How is the modern periodic table different from Mendeleev’s?', answer: 'It is ordered by atomic number, the number of protons, instead of atomic weight, and it includes the noble gases and many elements unknown in his time.' },
    ],
    related: ['/scientists/marie-curie', '/scientists/jabir-ibn-hayyan', '/scientists/ernest-rutherford', '/articles/the-chemical-history-of-a-candle'],
  },

  'lise-meitner': {
    summary: 'Lise Meitner (1878–1968) was an Austrian-born physicist who, with Otto Frisch, explained nuclear fission in 1938–1939.',
    earlyLife: 'Meitner was born in Vienna, the third of eight children of a Jewish lawyer. Girls were barred from Austrian grammar schools, so she qualified as a French teacher and then prepared privately for the university entrance examination, passing at twenty-three. Inspired by the lectures of Ludwig Boltzmann, she took her doctorate in 1906, the second woman to earn one in physics at Vienna, and moved to Berlin to attend Max Planck’s lectures.',
    work: [
      'In Berlin she teamed up with the chemist Otto Hahn. Because women were not allowed in the chemistry institute, she first worked unpaid in a converted carpenter’s workshop in the basement. Over three decades the pair untangled the chains of radioactive decay; she led the physics, he the chemistry. They found protactinium in 1917–1918, and she headed her own physics department at the Kaiser Wilhelm Institute.',
      'From 1934 Meitner, Hahn and Fritz Strassmann studied what happens when uranium is hit with neutrons. In July 1938 she escaped from Germany with no passport and little money. That December Hahn wrote to her in Sweden that the products included barium, an element about half the weight of uranium, which he could not explain. Walking in the snow with her nephew Otto Frisch, she pictured the nucleus as a wobbling drop of liquid that could pinch in two, and calculated from Einstein’s E = mc² that each split would release about 200 million electron volts.',
    ],
    timeline: [
      ['1878', 'Born in Vienna on 7 November.'],
      ['1906', 'Receives her doctorate in physics.'],
      ['1907', 'Moves to Berlin and begins working with Otto Hahn.'],
      ['1918', 'Meitner and Hahn announce the discovery of protactinium.'],
      ['1926', 'Becomes a professor at the University of Berlin.'],
      ['1938', 'Flees Germany in July; interprets fission with Frisch in December.'],
      ['1939', 'Meitner and Frisch publish the explanation of fission in Nature.'],
      ['1966', 'Shares the Enrico Fermi Award with Hahn and Strassmann.'],
      ['1968', 'Dies in Cambridge, England, on 27 October.'],
    ],
    myths: [
      { myth: 'Meitner was Otto Hahn’s assistant.', fact: 'She was his equal partner and the leader of the physics side of their work, with her own department. The uranium project that led to fission was started at her urging.' },
      { myth: 'She helped build the atomic bomb.', fact: 'She was invited to join the British team going to Los Alamos and refused, saying she would have nothing to do with a bomb. She disliked being called its “mother”.' },
    ],
    legacy: 'The 1944 Nobel Prize in Chemistry went to Hahn alone, a decision now widely seen as unjust; records show that Meitner was nominated for Nobel Prizes dozens of times without success. Element 109 was named meitnerium in 1997. Her gravestone in Hampshire, composed by Frisch, reads: “A physicist who never lost her humanity.”',
    faqs: [
      { question: 'What did Lise Meitner discover?', answer: 'With Otto Frisch she explained that the uranium nucleus can split into two lighter nuclei, a process Frisch named fission, and calculated the energy released. She also co-discovered protactinium.' },
      { question: 'Why did Lise Meitner not receive the Nobel Prize?', answer: 'The committee credited the chemical discovery to Hahn and undervalued the physical explanation. Her exile, which kept her name off the key experimental paper, and bias against her also played a part.' },
      { question: 'What is meitnerium?', answer: 'A synthetic radioactive element with atomic number 109, first made in 1982 and named in her honour in 1997.' },
    ],
    related: ['/scientists/enrico-fermi', '/scientists/marie-curie', '/scientists/max-planck', '/scientists/rosalind-franklin'],
  },
};
