import type { ScientistDeepDive } from './scientist-deep-dives';

// Deeper profile sections for physicists and astronomers, written for ScienceHub.
export const PHYSICAL_SCIENCE_DEEP_DIVES: Record<string, ScientistDeepDive> = {
  'albert-einstein': {
    summary: 'Albert Einstein (1879–1955) developed special and general relativity, explained the photoelectric effect and showed that mass and energy are equivalent.',
    earlyLife: 'Einstein was born in Ulm, in the German Empire, and grew up in Munich, where his family ran an electrical engineering business. He was strong in mathematics and physics but disliked rote learning. After moving to Switzerland he studied at the Federal Polytechnic in Zurich, graduating in 1900, and struggled to find an academic post. From 1902 he worked as a technical examiner at the Swiss patent office in Bern, a job that left him time to think about physics.',
    work: [
      'Special relativity (1905) starts from two assumptions: the laws of physics are the same for all observers moving at constant velocity, and light in a vacuum always travels at the same speed. Taken together, these force space and time to depend on the observer. Moving clocks run slow, moving objects contract along their direction of motion, and mass and energy become two forms of the same quantity, written E = mc².',
      'General relativity (1915) extends the idea to gravity. Instead of a force pulling across empty space, mass and energy curve spacetime, and objects follow the straightest possible paths through that curved geometry. The theory explained a small anomaly in Mercury’s orbit, predicted that light bends near the Sun, and underpins modern work on black holes, gravitational waves and the expanding universe.',
    ],
    timeline: [
      ['1879', 'Born in Ulm, Germany, on 14 March.'],
      ['1905', 'Publishes papers on the photoelectric effect, Brownian motion, special relativity and E = mc².'],
      ['1915', 'Completes the field equations of general relativity.'],
      ['1919', 'Eclipse observations led by Arthur Eddington support the predicted bending of starlight.'],
      ['1922', 'Receives the 1921 Nobel Prize in Physics, awarded for the photoelectric effect.'],
      ['1933', 'Leaves Germany and settles at the Institute for Advanced Study in Princeton.'],
      ['1955', 'Dies in Princeton on 18 April.'],
    ],
    myths: [
      { myth: 'Einstein failed mathematics at school.', fact: 'He excelled at mathematics. The story may come from a failed entrance exam to the Zurich Polytechnic at 16, where he scored well in mathematics and physics but fell short in other subjects.' },
      { myth: 'Einstein helped build the atomic bomb.', fact: 'He signed a 1939 letter to President Roosevelt warning that Germany might build one, but he did not work on the Manhattan Project.' },
    ],
    legacy: 'GPS satellites correct their clocks for both special and general relativity, gravitational-wave detectors listen for the ripples his theory predicted, and quantum technologies build on the light quanta he proposed in 1905. His debates with Niels Bohr about quantum mechanics also set up the experiments on entanglement that are now central to quantum computing research.',
    faqs: [
      { question: 'What is Albert Einstein most famous for?', answer: 'For the theories of special and general relativity and the equation E = mc², which shows that mass and energy are equivalent.' },
      { question: 'Why did Einstein win the Nobel Prize?', answer: 'The Nobel Prize in Physics for 1921 was awarded for his explanation of the photoelectric effect, not for relativity.' },
      { question: 'Was Einstein right about quantum mechanics?', answer: 'He helped found quantum theory but doubted it was complete. Later Bell-test experiments showed that local hidden-variable explanations, the kind his view pointed toward, cannot reproduce quantum predictions.' },
    ],
    related: ['/articles/general-relativity-curved-spacetime-working-gps', '/articles/relativity-the-special-and-general-theory', '/articles/how-bell-tests-turned-quantum-debate-into-data', '/learn#cosmic-explorer'],
  },

  'marie-curie': {
    summary: 'Marie Curie (1867–1934) pioneered research on radioactivity, discovered polonium and radium, and was the first person to win Nobel Prizes in two sciences.',
    earlyLife: 'Maria Skłodowska was born in Warsaw, then under Russian rule, where women could not attend university. She studied in the clandestine “Flying University” and worked as a governess to help pay for her sister’s medical studies in Paris. In 1891 she followed her to Paris, enrolled at the Sorbonne and earned degrees in physics and mathematics. She married the physicist Pierre Curie in 1895.',
    work: [
      'In 1896 Henri Becquerel noticed that uranium salts emit rays that fog photographic plates. Curie measured these rays with an electrometer built by Pierre and his brother Jacques, and found that their strength depended only on the amount of uranium, not on its chemical form. That pointed to a property of the atom itself. She named it radioactivity.',
      'Pitchblende ore turned out to be more radioactive than its uranium content could explain, so the Curies searched for unknown elements. In 1898 they announced polonium, named after Poland, and radium. Proving radium was a new element took years of processing tonnes of ore residue to obtain a small amount of radium chloride, enough to measure its atomic weight.',
    ],
    timeline: [
      ['1867', 'Born Maria Skłodowska in Warsaw on 7 November.'],
      ['1891', 'Moves to Paris to study at the Sorbonne.'],
      ['1898', 'Announces the discovery of polonium and radium with Pierre Curie.'],
      ['1903', 'Shares the Nobel Prize in Physics with Pierre Curie and Henri Becquerel.'],
      ['1906', 'After Pierre dies in a street accident, takes over his chair as the first woman professor at the Sorbonne.'],
      ['1911', 'Wins the Nobel Prize in Chemistry for the discovery of radium and polonium and the isolation of radium.'],
      ['1914–1918', 'Organizes mobile X-ray units for French field hospitals during the First World War.'],
      ['1934', 'Dies of aplastic anaemia, linked to long exposure to radiation.'],
    ],
    myths: [
      { myth: 'Marie Curie discovered radioactivity.', fact: 'Henri Becquerel first observed uranium’s rays in 1896. Curie showed the effect came from atoms, coined the term radioactivity and found new radioactive elements.' },
      { myth: 'Curie worked alone.', fact: 'She worked closely with Pierre Curie and later with colleagues such as André Debierne. The Radium Institute she led trained many researchers, including her daughter Irène, who won a Nobel Prize in 1935.' },
    ],
    legacy: 'Curie’s methods for measuring radiation shaped nuclear physics and the medical use of radiation, including cancer treatment. Her notebooks are still radioactive and are kept in protective boxes in Paris. Research institutes in Paris and Warsaw carry her name, and the European Union’s main fellowships for researchers are called the Marie Skłodowska-Curie Actions.',
    faqs: [
      { question: 'What did Marie Curie discover?', answer: 'With Pierre Curie she discovered the elements polonium and radium in 1898, and she showed that radioactivity is a property of atoms.' },
      { question: 'How many Nobel Prizes did Marie Curie win?', answer: 'Two: Physics in 1903, shared with Pierre Curie and Henri Becquerel, and Chemistry in 1911. She is still the only person to win Nobel Prizes in two different sciences.' },
      { question: 'How did Marie Curie die?', answer: 'She died in 1934 of aplastic anaemia, a bone-marrow disease very likely caused by years of exposure to radiation.' },
    ],
    related: ['/articles/the-new-physics-and-its-evolution', '/articles/alice-lead-to-gold-lhc-nuclear-transmutation-2025', '/articles/why-scientific-breakthroughs-rarely-belong-to-one-person'],
  },

  'nikola-tesla': {
    summary: 'Nikola Tesla (1856–1943) invented the polyphase AC induction motor and power system that made long-distance electricity practical, and the Tesla coil.',
    earlyLife: 'Tesla was born to Serbian parents in Smiljan, in the Austrian Empire (now Croatia). His father was an Orthodox priest and his mother was known for inventing household tools. He studied engineering at the Polytechnic in Graz but did not graduate, then worked for telegraph and electrical companies in Budapest and Paris before emigrating to New York in 1884, where he briefly worked for Thomas Edison’s company.',
    work: [
      'Early electric systems used direct current, which is hard to send far because its voltage cannot easily be changed. Alternating current can be stepped up by transformers for transmission and stepped down for use, but in the 1880s there was no good AC motor. Tesla’s answer was the rotating magnetic field: several alternating currents, offset in timing, feed coils around a motor so that the magnetic field itself turns and drags the rotor with it.',
      'His 1888 patents for this polyphase induction motor were licensed by George Westinghouse. In the “war of the currents” with Edison’s direct-current interests, AC won: Westinghouse lit the 1893 Chicago World’s Fair and supplied generators for the Niagara Falls power station in the mid-1890s. Tesla also built resonant transformers, now called Tesla coils, to study high-voltage, high-frequency electricity.',
    ],
    timeline: [
      ['1856', 'Born in Smiljan on 10 July.'],
      ['1884', 'Arrives in New York and works briefly for Edison’s company.'],
      ['1888', 'Patents the polyphase AC induction motor and licenses it to Westinghouse.'],
      ['1891', 'Develops the Tesla coil and becomes a US citizen.'],
      ['1893', 'Westinghouse AC power lights the World’s Columbian Exposition in Chicago.'],
      ['1901', 'Begins the Wardenclyffe tower for wireless communication; it is never completed.'],
      ['1943', 'Dies in a New York hotel room on 7 January.'],
    ],
    myths: [
      { myth: 'Tesla invented alternating current.', fact: 'AC generators and transformers existed before him. His key invention was the polyphase induction motor and the system built around it.' },
      { myth: 'A court ruled that Tesla invented radio.', fact: 'A 1943 US Supreme Court decision invalidated some of Marconi’s patent claims because of earlier work by Tesla, Oliver Lodge and John Stone Stone. It settled specific patent claims, not who invented radio.' },
    ],
    legacy: 'Almost every power grid in the world uses alternating current, and induction motors still drive pumps, fans, factory machines and some electric cars. The SI unit of magnetic flux density, the tesla, is named after him. His documented record is strong enough on its own, which is why historians separate it from the exaggerated stories that surround him.',
    faqs: [
      { question: 'What did Nikola Tesla invent?', answer: 'His best-known inventions are the polyphase AC induction motor, the power system built around it, and the Tesla coil.' },
      { question: 'Did Tesla and Edison really fight?', answer: 'Their companies competed in the 1880s and 1890s “war of the currents” over AC versus DC power. Tesla had worked briefly for Edison’s company before going his own way.' },
      { question: 'Is the tesla unit named after him?', answer: 'Yes. The tesla is the SI unit of magnetic flux density, adopted in 1960.' },
    ],
    related: ['/scientists/michael-faraday', '/articles/experimental-researches-electricity-volume-one', '/articles/how-semiconductors-turn-physics-into-computing'],
  },

  'stephen-hawking': {
    summary: 'Stephen Hawking (1942–2018) showed that black holes should emit radiation, proved singularity theorems with Roger Penrose and wrote A Brief History of Time.',
    earlyLife: 'Hawking was born in Oxford on 8 January 1942, 300 years to the day after Galileo’s death. He studied physics at University College, Oxford, then began a PhD in cosmology at Cambridge. At 21 he was diagnosed with motor neurone disease and given a short life expectancy. The disease progressed far more slowly than expected, and he completed his doctorate in 1966.',
    work: [
      'General relativity predicts that matter can collapse until its density becomes infinite, a singularity. With Roger Penrose, Hawking proved theorems showing that under broad conditions singularities are unavoidable, both inside black holes and at the beginning of an expanding universe. Classical relativity therefore breaks down at those points.',
      'In 1974 he combined quantum field theory with the curved spacetime around a black hole and found that black holes should emit thermal radiation, now called Hawking radiation. A black hole therefore has a temperature, slowly loses mass and may eventually evaporate. If it does, what happens to the information that fell in? That question, the black-hole information problem, is still a key test for theories of quantum gravity.',
    ],
    timeline: [
      ['1942', 'Born in Oxford on 8 January.'],
      ['1963', 'Diagnosed with motor neurone disease at age 21.'],
      ['1970', 'Publishes singularity theorems with Roger Penrose.'],
      ['1974', 'Predicts that black holes emit radiation and is elected to the Royal Society.'],
      ['1979', 'Becomes Lucasian Professor of Mathematics at Cambridge, the chair once held by Isaac Newton.'],
      ['1988', 'Publishes A Brief History of Time.'],
      ['2018', 'Dies in Cambridge on 14 March.'],
    ],
    myths: [
      { myth: 'Hawking won a Nobel Prize.', fact: 'He did not. The Nobel committee generally rewards confirmed discoveries, and Hawking radiation from real black holes is far too faint to detect with current instruments.' },
      { myth: 'Hawking proved that black holes exist.', fact: 'Evidence for black holes comes from astronomy: X-ray binaries, stars orbiting the Milky Way’s centre, gravitational waves and Event Horizon Telescope images. Hawking’s work was theoretical.' },
    ],
    legacy: 'Hawking radiation tied together gravity, quantum theory and thermodynamics, and it remains a starting point for research on quantum gravity. A Brief History of Time sold millions of copies and brought cosmology to readers worldwide. His long career, supported by carers, assistants and a speech synthesizer, also changed public ideas about disability and science.',
    faqs: [
      { question: 'What is Stephen Hawking famous for?', answer: 'For predicting that black holes emit radiation (Hawking radiation), for singularity theorems with Roger Penrose, and for his bestseller A Brief History of Time.' },
      { question: 'What illness did Stephen Hawking have?', answer: 'A form of motor neurone disease (amyotrophic lateral sclerosis, ALS), diagnosed in 1963. It gradually paralysed him, and from 1985 he spoke through a computer speech synthesizer.' },
      { question: 'Has Hawking radiation been observed?', answer: 'Not from real black holes. Laboratory analogues using fluids and light show related effects, but direct detection from an astronomical black hole is far beyond current technology.' },
    ],
    related: ['/scientists/albert-einstein', '/articles/general-relativity-curved-spacetime-working-gps', '/articles/how-stars-are-born-live-and-die', '/articles/dark-matter-dark-energy-different-mysteries'],
  },

  'isaac-newton': {
    summary: 'Isaac Newton (1643–1727) formulated the laws of motion and universal gravitation, developed calculus and showed that white light is a mixture of colours.',
    earlyLife: 'Newton was born at Woolsthorpe Manor in Lincolnshire, England, on Christmas Day 1642 by the calendar then used in England (4 January 1643 in today’s calendar). His father died before he was born, and he was raised largely by his grandmother. He entered Trinity College, Cambridge, in 1661. When plague closed the university in 1665–1666, he worked at home on mathematics, optics and motion, laying foundations for much of his later work.',
    work: [
      'Newton’s three laws describe how forces change motion: an object keeps its state of motion unless a force acts on it; force equals mass times acceleration; and every action has an equal and opposite reaction. His law of universal gravitation states that every mass attracts every other mass with a force that weakens with the square of the distance between them.',
      'The power of the Principia (1687) lay in showing that these few rules explain falling bodies, the Moon’s orbit, Kepler’s laws of planetary motion, the tides and the paths of comets. In optics, his prism experiments showed that white light is made of colours that bend by different amounts, and he built the first practical reflecting telescope to avoid the colour fringes produced by lenses.',
    ],
    timeline: [
      ['1643', 'Born at Woolsthorpe, Lincolnshire (25 December 1642 in the old calendar).'],
      ['1665–1666', 'Develops early calculus and studies light and gravity while plague closes Cambridge.'],
      ['1668', 'Builds a working reflecting telescope.'],
      ['1687', 'Publishes the Principia.'],
      ['1696', 'Becomes Warden of the Royal Mint, and later its Master.'],
      ['1704', 'Publishes Opticks.'],
      ['1727', 'Dies in London and is buried in Westminster Abbey.'],
    ],
    myths: [
      { myth: 'An apple fell on Newton’s head.', fact: 'Newton told his biographer William Stukeley that watching an apple fall made him think about gravity. Nothing suggests it hit him.' },
      { myth: 'Newton’s physics has been proven wrong.', fact: 'Relativity and quantum mechanics replaced it at very high speeds, in strong gravity and at atomic scales, but Newton’s laws remain accurate enough to design bridges and plan most spacecraft trajectories.' },
    ],
    legacy: 'Engineering, ballistics and orbital mechanics still rely on Newtonian physics, and calculus is the working language of science. Newton was also President of the Royal Society from 1703 and spent years on alchemy and theology, a reminder that the founder of classical physics worked in an intellectual world very different from ours.',
    faqs: [
      { question: 'What did Isaac Newton discover?', answer: 'The three laws of motion, the law of universal gravitation, key results in calculus, and the fact that white light is a mixture of colours.' },
      { question: 'Did Newton invent calculus?', answer: 'He developed it in the 1660s, and Gottfried Wilhelm Leibniz developed it independently soon after, with the notation we mostly use today. Their supporters fought a bitter priority dispute.' },
      { question: 'What is the Principia?', answer: 'Philosophiæ Naturalis Principia Mathematica (1687), Newton’s book setting out the laws of motion and gravitation. It is free to read online.' },
    ],
    related: ['/articles/philosophiae-naturalis-principia-mathematica', '/articles/opticks-treatise-of-light-colour', '/scientists/galileo-galilei', '/scientists/albert-einstein'],
  },

  'galileo-galilei': {
    summary: 'Galileo Galilei (1564–1642) turned the telescope on the sky, found Jupiter’s moons and the phases of Venus, and laid foundations for the physics of motion.',
    earlyLife: 'Galileo was born in Pisa, the son of the musician and music theorist Vincenzo Galilei. He enrolled to study medicine at the University of Pisa but turned to mathematics. He taught mathematics at Pisa and, from 1592, at the University of Padua, where he spent what he later called the best eighteen years of his life, working on motion, mechanics and instruments.',
    work: [
      'In 1609 Galileo heard of a Dutch spyglass and built improved versions, reaching about 20 times magnification. Pointed at the sky, they showed mountains and craters on the Moon, countless stars in the Milky Way, and four moons circling Jupiter, which he published in Sidereus Nuncius in 1610. He then saw that Venus shows a full set of phases, which fits a Venus that orbits the Sun and contradicts the traditional Ptolemaic arrangement.',
      'On motion, he used inclined planes and careful timing to show that falling bodies accelerate uniformly and that a projectile follows a parabola. His 1632 Dialogue defended the Copernican Sun-centred system and led to his trial by the Roman Inquisition in 1633. Under house arrest he completed Two New Sciences (1638), his book on motion and the strength of materials.',
    ],
    timeline: [
      ['1564', 'Born in Pisa on 15 February.'],
      ['1592', 'Becomes professor of mathematics at the University of Padua.'],
      ['1610', 'Publishes Sidereus Nuncius, reporting Jupiter’s moons and the Moon’s mountains.'],
      ['1616', 'Is warned by the Church not to hold or defend Copernicanism.'],
      ['1632', 'Publishes the Dialogue Concerning the Two Chief World Systems.'],
      ['1633', 'Is tried, forced to recant and sentenced to house arrest.'],
      ['1638', 'Publishes Two New Sciences.'],
      ['1642', 'Dies at Arcetri, near Florence, on 8 January.'],
    ],
    myths: [
      { myth: 'Galileo invented the telescope.', fact: 'The telescope appeared in the Netherlands in 1608. Galileo improved it and was among the first to use it systematically for astronomy.' },
      { myth: 'He dropped balls from the Leaning Tower of Pisa.', fact: 'The story comes from his student Vincenzo Viviani, written years later, and many historians doubt it happened. His documented experiments used inclined planes.' },
    ],
    legacy: 'Galileo showed that careful measurement and mathematics could settle questions about nature, and that instruments could reveal things no one had seen before. In 1992 Pope John Paul II acknowledged that the Church had erred in condemning him. NASA named its 1989 Jupiter mission Galileo, and the four moons he found are still called the Galilean moons.',
    faqs: [
      { question: 'What did Galileo discover?', answer: 'Using a telescope he found Jupiter’s four largest moons, mountains on the Moon, the phases of Venus and countless faint stars. He also showed that falling bodies accelerate at a uniform rate.' },
      { question: 'Why was Galileo put on trial?', answer: 'His 1632 Dialogue defended the idea that the Earth moves around the Sun, which the Church had told him in 1616 not to defend. The Inquisition convicted him in 1633.' },
      { question: 'Did Galileo say “And yet it moves”?', answer: 'There is no evidence he said it at his trial. The phrase first appears in print more than a century later.' },
    ],
    related: ['/articles/sidereus-nuncius-starry-messenger', '/articles/dialogue-concerning-two-new-sciences', '/articles/how-instruments-changed-what-science-could-know', '/scientists/isaac-newton'],
  },

  'michael-faraday': {
    summary: 'Michael Faraday (1791–1867) discovered electromagnetic induction, the principle behind generators and transformers, and started the Christmas Lectures.',
    earlyLife: 'Faraday was born in Newington Butts, south London, into a poor family; his father was a blacksmith. He had little formal schooling and at 14 became an apprentice bookbinder, reading the science books he bound. In 1812 he attended lectures by the chemist Humphry Davy, sent him a bound copy of his notes, and in 1813 was hired as Davy’s laboratory assistant at the Royal Institution.',
    work: [
      'In 1821 Faraday made a current-carrying wire rotate around a magnet, the principle of the electric motor. Ten years later, in 1831, he found the reverse effect: a changing magnetic field induces an electric current in a nearby circuit. This electromagnetic induction is how generators make electricity and how transformers change voltage.',
      'Faraday had no advanced mathematics, so he pictured electric and magnetic effects as “lines of force” filling space. James Clerk Maxwell later turned those ideas into equations that describe light as an electromagnetic wave. Faraday also set out the laws of electrolysis and, with help from William Whewell, introduced words such as electrode, anode, cathode and ion.',
    ],
    timeline: [
      ['1791', 'Born in Newington Butts, London, on 22 September.'],
      ['1805', 'Begins a bookbinding apprenticeship.'],
      ['1813', 'Becomes Humphry Davy’s assistant at the Royal Institution.'],
      ['1821', 'Demonstrates electromagnetic rotation.'],
      ['1825', 'Starts the Royal Institution Christmas Lectures for young people.'],
      ['1831', 'Discovers electromagnetic induction.'],
      ['1845', 'Shows that magnetism can rotate polarized light, now called the Faraday effect.'],
      ['1867', 'Dies at Hampton Court on 25 August.'],
    ],
    myths: [
      { myth: 'Faraday invented electricity.', fact: 'Electric effects were studied long before him. He discovered how to produce a current from magnetism, which made practical electrical power possible.' },
      { myth: 'You need advanced mathematics to do great physics.', fact: 'Faraday’s notebooks contain almost no equations. His experiments and pictures of field lines gave Maxwell the physical ideas that Maxwell then expressed mathematically.' },
    ],
    legacy: 'Every power-station generator and every transformer works by Faraday’s induction. The unit of capacitance, the farad, is named after him, and the Christmas Lectures he started, including The Chemical History of a Candle, still run every year. He declined a knighthood and twice refused to become President of the Royal Society.',
    faqs: [
      { question: 'What did Michael Faraday discover?', answer: 'Electromagnetic induction (1831), the laws of electrolysis, the Faraday effect linking magnetism and light, and the principle of the electric motor.' },
      { question: 'Did Faraday go to university?', answer: 'No. He left school young, trained as a bookbinder and learned science by reading and by working as Humphry Davy’s assistant.' },
      { question: 'What is The Chemical History of a Candle?', answer: 'A series of Christmas lectures Faraday gave in 1860–61 that explain combustion and chemistry through a burning candle. The book is free to read online.' },
    ],
    related: ['/articles/the-chemical-history-of-a-candle', '/articles/experimental-researches-electricity-volume-one', '/articles/five-of-maxwells-papers', '/scientists/nikola-tesla'],
  },
};
