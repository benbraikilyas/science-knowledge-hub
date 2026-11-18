import type { ScientistDeepDive } from './scientist-deep-dives';

// Deeper profile sections for scientists added in November 2026, written for ScienceHub.
// Ancient sources are late and partly legendary; the text says so wherever a story is uncertain.
// The Nobel profile describes the history of explosives only, never how to make or use them.
export const CLASSICS_DEEP_DIVES: Record<string, ScientistDeepDive> = {
  'emmy-noether': {
    summary: 'Emmy Noether (1882–1935) was a German mathematician who proved that every symmetry in physics corresponds to a conservation law and helped create modern abstract algebra.',
    earlyLife: 'Noether was born in Erlangen, Bavaria, into a Jewish family; her father, Max Noether, was a mathematics professor at the university there. She first qualified to teach English and French at girls’ schools. Women could only sit in on lectures at Erlangen without enrolling, which she did from 1900 until the rules changed in 1904. She earned her doctorate in 1907 with a long calculation in invariant theory that she later dismissed as rubbish, then worked at the university for about seven years without pay or title.',
    work: [
      'In 1915 David Hilbert and Felix Klein brought her to Göttingen, then the world centre of mathematics, to help them with Einstein’s new general theory of relativity, in which energy conservation seemed to behave strangely. Her paper of 1918 answered the question and proved something far more general. Noether’s theorem says that whenever the laws describing a system stay the same under a smooth change, some quantity is conserved. Laws that do not change over time give conservation of energy; laws that are the same everywhere give conservation of momentum; laws that do not depend on direction give conservation of angular momentum. Physicists now use it to find conservation laws in every field, from particle physics to engineering.',
      'From around 1920 she turned to algebra and changed how it is done. Instead of solving particular equations, she studied the general structures behind them, such as rings, ideals and modules, and showed that a few axioms could explain results that had looked unrelated. Rings that satisfy her “ascending chain condition” are still called Noetherian. Her students and visitors, nicknamed the “Noether boys”, spread the approach; Bartel van der Waerden’s textbook Moderne Algebra (1930–1931), drawn largely from lectures by Noether and Emil Artin, made it the standard way algebra is taught.',
    ],
    timeline: [
      ['1882', 'Born in Erlangen, Bavaria, on 23 March.'],
      ['1907', 'Receives her doctorate from the University of Erlangen.'],
      ['1915', 'Invited to Göttingen by David Hilbert and Felix Klein.'],
      ['1918', 'Publishes the paper containing Noether’s theorem.'],
      ['1919', 'Finally allowed to qualify as a university lecturer at Göttingen.'],
      ['1921', 'Publishes her paper on the theory of ideals in rings.'],
      ['1932', 'Gives a plenary address at the International Congress of Mathematicians in Zürich.'],
      ['1933', 'Dismissed under Nazi laws; moves to Bryn Mawr College in the United States.'],
      ['1935', 'Dies in Bryn Mawr, Pennsylvania, on 14 April, after surgery.'],
    ],
    myths: [
      { myth: 'Noether was mainly a physicist.', fact: 'She was a pure mathematician. Physicists know her for one theorem, but most mathematicians remember her for founding modern abstract algebra, which she considered her real work.' },
      { myth: 'Hilbert’s famous line “we are a university, not a bathhouse” is a recorded quotation.', fact: 'Hilbert did defend her against colleagues who objected to a woman lecturer, but the remark was reported long afterwards in several versions. Its spirit is accurate; its exact wording is uncertain.' },
    ],
    legacy: 'Noether’s theorem is one of the foundations of modern physics, used whenever physicists connect a symmetry to a conserved quantity. In mathematics, the structural approach she pioneered shaped algebra, number theory and topology. Shortly after her death, Albert Einstein wrote in The New York Times that she was the most significant creative mathematical genius produced since the higher education of women began.',
    faqs: [
      { question: 'What is Noether’s theorem in simple terms?', answer: 'If the laws of physics stay the same when you shift something smoothly, such as time, position or direction, then a matching quantity is conserved: energy, momentum or angular momentum.' },
      { question: 'Why was Emmy Noether not paid for her work?', answer: 'German universities did not allow women to hold lecturing posts. She worked unpaid at Erlangen for years and taught at Göttingen at first under David Hilbert’s name, receiving only a small salary from 1923.' },
      { question: 'Why did Emmy Noether leave Germany?', answer: 'In 1933 the Nazi government dismissed Jewish academics. She moved to Bryn Mawr College in Pennsylvania and also lectured at the Institute for Advanced Study in Princeton.' },
    ],
    related: ['/scientists/albert-einstein', '/articles/general-relativity-curved-spacetime-working-gps', '/articles/space-time-matter-hermann-weyl', '/scientists/lise-meitner', '/articles/why-mathematical-proof-is-more-than-calculation'],
  },

  'archimedes': {
    summary: 'Archimedes (c. 287–212 BC) was a Greek mathematician and engineer from Syracuse who found the volume of a sphere, estimated π, and discovered the laws of the lever and buoyancy.',
    earlyLife: 'Archimedes was born in Syracuse, a wealthy Greek city on Sicily. In one of his own works he mentions his father, Phidias, as an astronomer. He probably studied in Alexandria, the leading centre of learning, because he later sent his results to mathematicians there, including Conon of Samos and Eratosthenes. Ancient writers say he was a friend, and possibly a relative, of Hiero II, king of Syracuse.',
    work: [
      'His mathematical achievements were extraordinary for any age. To find the area under a parabola and the volume of curved solids, he slipped ever finer shapes inside and outside the figure until only one answer was possible, a technique later called the method of exhaustion and a forerunner of integral calculus. He proved that a sphere has exactly two-thirds of the volume and surface area of the cylinder around it, a result he asked to have carved on his tomb. By working with polygons of 96 sides he showed that π lies between 3 10⁄71 and 3 1⁄7. In The Sand Reckoner he invented a way of writing numbers large enough to count the grains of sand that would fill the universe.',
      'He was equally original in physics. On the Equilibrium of Planes proves the law of the lever: weights balance when they are inversely proportional to their distances from the pivot. On Floating Bodies states that an object in a fluid is pushed up by a force equal to the weight of the fluid it displaces, which is why ships float. A medieval prayer book scraped clean and reused in the 13th century turned out to contain his lost work The Method, which shows him using balance arguments to discover results before proving them; modern imaging recovered much of the hidden text in the early 2000s.',
    ],
    timeline: [
      ['c. 287 BC', 'Born in Syracuse, Sicily.'],
      ['c. 250s BC', 'Corresponds with mathematicians in Alexandria, including Eratosthenes.'],
      ['214 BC', 'Rome besieges Syracuse; ancient writers credit him with machines used in its defence.'],
      ['212 BC', 'Killed by a Roman soldier when Syracuse falls.'],
      ['75 BC', 'Cicero finds his overgrown tomb, marked with a sphere and cylinder.'],
      ['1906', 'Johan Heiberg identifies Archimedes’ lost work The Method in a reused manuscript.'],
      ['1998–2008', 'The manuscript is sold at auction and studied with modern imaging.'],
    ],
    myths: [
      { myth: 'Archimedes ran naked through the streets shouting “Eureka!”', fact: 'The story comes from the Roman architect Vitruvius, writing about two hundred years later, and none of Archimedes’ own works mention it. The method it describes for testing the king’s crown would also have been hard to carry out accurately.' },
      { myth: 'He set Roman ships on fire with giant mirrors.', fact: 'The earliest accounts of the siege do not mention mirrors; the story appears centuries later. Modern tests have struggled to ignite a ship this way under realistic conditions, so historians treat it as a legend.' },
      { myth: 'His last words were “Do not disturb my circles.”', fact: 'Ancient writers agree he was killed when Syracuse fell, but the famous line was attached to the story much later, in several different forms.' },
    ],
    legacy: 'Archimedes anticipated ideas of calculus by almost two thousand years, and Galileo and Newton studied his works closely. His principle of buoyancy is used in designing every ship and submarine, and his lever law underlies all simple machines. The Fields Medal, often called the Nobel Prize of mathematics, carries his portrait.',
    faqs: [
      { question: 'What is Archimedes’ principle?', answer: 'An object placed in a fluid is pushed upward by a force equal to the weight of the fluid it displaces. If that force is greater than the object’s weight, it floats.' },
      { question: 'Did Archimedes invent the Archimedes screw?', answer: 'It carries his name and ancient writers credit him with it, but similar water-raising devices may have existed earlier in Egypt or Assyria. He may have improved or described it rather than invented it.' },
      { question: 'How did Archimedes die?', answer: 'He was killed by a Roman soldier in 212 BC, when Syracuse fell after a two-year siege, reportedly against the orders of the Roman general Marcellus.' },
    ],
    related: ['/articles/euclids-elements-of-geometry', '/scientists/eratosthenes', '/scientists/galileo-galilei', '/articles/why-mathematical-proof-is-more-than-calculation', '/articles/how-instruments-changed-what-science-could-know'],
  },

  'alfred-nobel': {
    summary: 'Alfred Nobel (1833–1896) was a Swedish chemist and inventor who patented dynamite and used his fortune to create the Nobel Prizes.',
    earlyLife: 'Nobel was born in Stockholm, the son of Immanuel Nobel, an engineer and inventor, and Andriette Ahlsell. When Alfred was nine the family moved to St Petersburg, where his father built machinery and naval equipment for the Russian government. Alfred was taught by private tutors, became fluent in five languages and studied chemistry with Nikolai Zinin. In Paris he worked in the laboratory of Théophile-Jules Pelouze, where he met Ascanio Sobrero, the Italian chemist who had discovered nitroglycerin in 1847.',
    work: [
      'Nitroglycerin was far more powerful than gunpowder, but it was so sensitive that it exploded unpredictably during transport and handling, and accidents were common. Nobel set out to make it reliable for engineering. In 1864 an explosion at the family’s workshop in Stockholm killed five people, among them his younger brother Emil. Nobel kept working, moving his experiments away from the city. His breakthrough came when he found that absorbing the liquid into a porous mineral powder made it stable enough to transport and handle; he patented this as dynamite in 1867.',
      'Dynamite transformed mining and construction in the late 19th century, cutting the cost and danger of blasting tunnels, harbours, canals and railway lines. Nobel built companies and factories across Europe and beyond and held more than 350 patents, including improved detonators and blasting gelatin. His explosives were also used in war, and in 1894 he bought the Swedish arms company Bofors. He was a private man who wrote poetry, read widely and corresponded for years with the peace campaigner Bertha von Suttner.',
    ],
    timeline: [
      ['1833', 'Born in Stockholm on 21 October.'],
      ['1842', 'The family moves to St Petersburg.'],
      ['1864', 'An explosion at the family workshop in Stockholm kills his brother Emil.'],
      ['1867', 'Patents dynamite.'],
      ['1875', 'Patents blasting gelatin.'],
      ['1894', 'Buys the Bofors company in Sweden.'],
      ['1895', 'Signs his will in Paris on 27 November, founding the prizes.'],
      ['1896', 'Dies in Sanremo, Italy, on 10 December.'],
      ['1901', 'The first Nobel Prizes are awarded, on the anniversary of his death.'],
    ],
    myths: [
      { myth: 'A newspaper headline calling him “the merchant of death” made Nobel create the prizes.', fact: 'The story of a French paper publishing his obituary by mistake in 1888, when his brother Ludvig died, is widely repeated, but historians have not found reliable evidence of the headline or of its effect on him. His interest in peace was long-standing.' },
      { myth: 'There is no Nobel Prize in mathematics because a mathematician stole Nobel’s wife.', fact: 'Nobel never married, and there is no evidence for the story. His will simply named the fields he valued: physics, chemistry, medicine, literature and peace.' },
      { myth: 'Nobel created the prize in economics.', fact: 'The economics prize was established in 1968 by Sweden’s central bank, the Sveriges Riksbank, “in memory of Alfred Nobel”. It is not one of the five prizes in his will.' },
    ],
    legacy: 'The Nobel Prizes became the world’s best-known awards for science, literature and peace, and their winners include many of the people profiled on this site, from Marie Curie to Niels Bohr. The prizes have also been criticized for overlooking key contributors such as Lise Meitner and Rosalind Franklin, and for rarely recognizing teams. Element 102 was named nobelium in his honour.',
    faqs: [
      { question: 'What did Alfred Nobel invent?', answer: 'He is best known for dynamite, patented in 1867, which made explosives far safer to handle for mining and construction. He also developed improved detonators and blasting gelatin, among more than 350 patents.' },
      { question: 'Why did Alfred Nobel create the Nobel Prize?', answer: 'His will gave his fortune to reward those who had brought the “greatest benefit to humankind”. He left no full explanation, but he had long supported peace efforts and valued science and literature.' },
      { question: 'Who awards the Nobel Prizes?', answer: 'Following his will, Swedish institutions award the prizes in physics, chemistry, medicine and literature, while the Peace Prize is awarded by a committee appointed by the Norwegian parliament.' },
    ],
    related: ['/scientists/marie-curie', '/scientists/lise-meitner', '/scientists/dmitri-mendeleev', '/articles/why-scientific-breakthroughs-rarely-belong-to-one-person'],
  },

  'eratosthenes': {
    summary: 'Eratosthenes (c. 276–194 BC) was a Greek scholar from Cyrene, in modern Libya, who measured the Earth’s circumference and ran the Library of Alexandria.',
    earlyLife: 'Eratosthenes was born in Cyrene, a Greek city on the coast of what is now Libya. He studied there and in Athens, where he mixed with philosophers and poets. Around 245 BC the Egyptian king Ptolemy III invited him to Alexandria to tutor the royal heir and to head the great Library, the largest collection of books in the ancient world. He held the post for the rest of his life.',
    work: [
      'His measurement of the Earth is a model of reasoning from simple observations. He knew that at noon on the summer solstice the Sun stood almost directly overhead at Syene, the modern Aswan, far to the south. At the same moment in Alexandria, a vertical pointer cast a shadow showing the Sun was about one-fiftieth of a full circle away from overhead. If the Sun’s rays arrive in parallel, the distance from Syene to Alexandria must then be one-fiftieth of the Earth’s circumference. Taking that distance as 5,000 stadia, he obtained about 250,000 stadia, later given as 252,000. His own book is lost; the method is described by the later writer Cleomedes.',
      'Eratosthenes worked in many other fields. His Geographika described the inhabited world and placed places on a grid of parallels and meridians; he is credited with coining the word geography. The sieve of Eratosthenes, still taught today, finds prime numbers by crossing out the multiples of each number in turn. He attempted to date events in Greek history from the fall of Troy onward, estimated the tilt of the Earth’s axis, and designed a mechanical device for the ancient problem of doubling a cube. Archimedes addressed his work The Method to him.',
    ],
    timeline: [
      ['c. 276 BC', 'Born in Cyrene, in modern Libya.'],
      ['c. 260s BC', 'Studies in Athens.'],
      ['c. 245 BC', 'Invited to Alexandria by Ptolemy III; becomes head of the Library.'],
      ['c. 240 BC', 'Measures the circumference of the Earth.'],
      ['c. 194 BC', 'Dies in Alexandria; one late source says he stopped eating after losing his sight.'],
    ],
    myths: [
      { myth: 'Ancient people thought the Earth was flat until Columbus.', fact: 'Educated Greeks had accepted a round Earth since at least the 4th century BC. Eratosthenes did not prove it was round; he measured how big it is, some seventeen centuries before Columbus sailed.' },
      { myth: 'Eratosthenes measured the Earth almost exactly.', fact: 'His method was sound, but its accuracy depends on the length of the stadion he used, which is uncertain. Depending on the value chosen, his result was within a few percent or about fifteen percent of the modern figure.' },
    ],
    legacy: 'Eratosthenes showed that the size of the whole planet could be worked out from a shadow, a distance and geometry, and his approach to mapping with a coordinate grid underlies all modern maps. Later scholars, including al-Biruni in the 11th century, refined the measurement with new methods. Schools around the world still repeat his experiment each year by comparing noon shadows between cities.',
    faqs: [
      { question: 'How did Eratosthenes measure the Earth?', answer: 'He compared the Sun’s angle at noon on the summer solstice in Alexandria with Syene, where the Sun was almost overhead. The angle was about one-fiftieth of a circle, so he multiplied the distance between the cities by fifty.' },
      { question: 'What is the sieve of Eratosthenes?', answer: 'A method for finding prime numbers: list the numbers, then repeatedly cross out the multiples of each remaining number. Whatever is never crossed out is prime.' },
      { question: 'Where was Eratosthenes from?', answer: 'Cyrene, a Greek city in North Africa, in what is now eastern Libya. He spent most of his career in Alexandria, Egypt.' },
    ],
    related: ['/scientists/al-biruni', '/scientists/archimedes', '/scientists/al-idrisi', '/articles/a-short-history-of-astronomy'],
  },
};
