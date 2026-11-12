import type { ScientistDeepDive } from './scientist-deep-dives';

// Deeper profile sections for the second group of computing pioneers, written for ScienceHub.
export const COMPUTING_DEEP_DIVES_2: Record<string, ScientistDeepDive> = {
  'charles-babbage': {
    summary: 'Charles Babbage (1791–1871) was an English mathematician who designed the Difference Engine and the Analytical Engine, the first design for a general-purpose computer.',
    earlyLife: 'Babbage was born in London, the son of a banker, and was often ill as a child, which meant much of his schooling was private. He arrived at Cambridge in 1810 already knowing more modern mathematics than his tutors. With John Herschel and George Peacock he founded the Analytical Society to bring the Continental notation of calculus to England. A large inheritance in 1827 left him free to pursue his own projects.',
    work: [
      'Mathematical tables were calculated by teams of clerks and set in type by hand, and they were full of errors. Babbage’s Difference Engine would compute polynomial values by repeated addition, a method that needs no multiplication, and stamp the results directly into printing plates. A working section built in 1832 still survives. The full machine needed some 25,000 parts, and after a quarrel with his engineer, Joseph Clement, and the spending of about £17,000 of public money, work stopped.',
      'The Analytical Engine was a different kind of machine. Numbers were held in a “store” and operated on in a “mill”. Instructions came on punched cards borrowed from the Jacquard loom, and the machine could repeat a set of operations and take different paths depending on a result. Babbage refined the design until his death. Ada Lovelace, who translated and annotated an account of it in 1843, saw that such a machine could handle symbols of any kind, not only numbers.',
    ],
    timeline: [
      ['1791', 'Born in London on 26 December.'],
      ['1812', 'Co-founds the Analytical Society at Cambridge.'],
      ['1822', 'Proposes the Difference Engine to the Royal Astronomical Society.'],
      ['1828', 'Appointed Lucasian Professor of Mathematics.'],
      ['1832', 'A demonstration section of Difference Engine No. 1 is completed.'],
      ['1834', 'Begins designing the Analytical Engine.'],
      ['1843', 'Ada Lovelace publishes her notes on the Analytical Engine.'],
      ['1871', 'Dies in London on 18 October.'],
      ['1991', 'The Science Museum completes Difference Engine No. 2 from his drawings.'],
    ],
    myths: [
      { myth: 'Victorian engineering was too crude to build his machines.', fact: 'In 1991 the Science Museum in London built Difference Engine No. 2 to his plans, using tolerances achievable in his day, and it works. The original projects failed over cost, management and politics.' },
      { myth: 'Babbage built the first computer.', fact: 'He designed one but completed only small trial pieces. The first working programmable computers were built in the 1940s, by engineers who mostly did not know his work in detail.' },
    ],
    legacy: 'The separation of memory and processor, programs supplied from outside, loops and conditional branching all appear first in the Analytical Engine. Babbage also wrote an influential study of manufacturing, broke the Vigenère cipher without publishing the method, and helped found the Royal Astronomical Society and the Statistical Society of London.',
    faqs: [
      { question: 'What did Charles Babbage invent?', answer: 'He designed the Difference Engine, a mechanical calculator for producing tables, and the Analytical Engine, a programmable mechanical computer.' },
      { question: 'Why is Babbage called the father of the computer?', answer: 'Because the Analytical Engine had the essential logical parts of a modern computer a century before electronic machines were built.' },
      { question: 'How did Ada Lovelace work with Babbage?', answer: 'She translated an Italian paper on the Analytical Engine and added notes three times its length, including a step-by-step method for the machine to calculate Bernoulli numbers.' },
    ],
    related: ['/scientists/ada-lovelace', '/scientists/alan-turing', '/scientists/george-boole', '/learn#computing-intelligence'],
  },

  'george-boole': {
    summary: 'George Boole (1815–1864) was a self-taught English mathematician who created the algebra of logic that underlies digital electronics and computer programming.',
    earlyLife: 'Boole was born in Lincoln. His father, a shoemaker more interested in building telescopes than in his business, taught him mathematics, and a local bookseller helped him with Latin; he then taught himself Greek, French, German and Italian. When the family business failed, sixteen-year-old George became a schoolteacher to support his parents and siblings, and at nineteen he opened a school of his own. He read Newton, Laplace and Lagrange in the evenings.',
    work: [
      'Logic had been a branch of philosophy since Aristotle, expressed in words. Boole’s idea was to treat it as algebra. Let x stand for a class of things, such as “sheep”, and y for another, such as “white things”. Then xy stands for things that are both. Since “white white sheep” are just white sheep, his symbols obey the odd rule xx = x, which in ordinary arithmetic is true only of 0 and 1. He let 1 stand for the universe and 0 for the empty class.',
      'With these rules, an argument becomes a set of equations that can be solved mechanically. Boole set this out in The Mathematical Analysis of Logic in 1847 and at greater length in An Investigation of the Laws of Thought in 1854, which also applies the method to probability. Later logicians, including William Stanley Jevons and Charles Sanders Peirce, simplified his system into what is now called Boolean algebra, with the operations AND, OR and NOT.',
    ],
    timeline: [
      ['1815', 'Born in Lincoln on 2 November.'],
      ['1834', 'Opens his own school in Lincoln.'],
      ['1844', 'Awarded the Royal Society’s Royal Medal for a paper on analysis.'],
      ['1847', 'Publishes The Mathematical Analysis of Logic.'],
      ['1849', 'Becomes professor of mathematics at Queen’s College, Cork.'],
      ['1854', 'Publishes The Laws of Thought.'],
      ['1855', 'Marries Mary Everest.'],
      ['1864', 'Dies at Ballintemple, Cork, on 8 December.'],
    ],
    myths: [
      { myth: 'Boole designed his algebra for computers.', fact: 'He died more than seventy years before the first electronic computers. He aimed to describe the laws of human reasoning. The link to circuits was made by Claude Shannon in 1937.' },
      { myth: 'Modern Boolean algebra is exactly Boole’s system.', fact: 'His original algebra treated “or” as exclusive and used ordinary arithmetic in ways that later logicians found awkward. The cleaner version taught today was developed after his death.' },
    ],
    legacy: 'Every search query that combines terms, every “if” statement in a program and every logic gate in a chip uses Boole’s algebra, and the true-or-false data type in programming languages is called Boolean. He died at forty-nine of pneumonia after walking to a lecture in heavy rain. His wife Mary was a writer on mathematics education, and their daughters included the geometer Alicia Boole Stott and the novelist Ethel Voynich.',
    faqs: [
      { question: 'What is Boolean algebra?', answer: 'A system of algebra in which variables take only two values, true and false or 1 and 0, combined by operations such as AND, OR and NOT.' },
      { question: 'Why is Boolean logic important for computers?', answer: 'Digital circuits are built from switches that are either on or off. Boolean algebra describes exactly how to combine such switches to compute and to make decisions.' },
      { question: 'Did George Boole go to university?', answer: 'No. He was largely self-taught and became a professor on the strength of his published research.' },
    ],
    related: ['/scientists/claude-shannon', '/scientists/charles-babbage', '/articles/why-mathematical-proof-is-more-than-calculation', '/articles/how-semiconductors-turn-physics-into-computing'],
  },

  'katherine-johnson': {
    summary: 'Katherine Johnson (1918–2020) was an American mathematician whose orbital calculations were essential to NASA’s first crewed spaceflights and the Apollo Moon landings.',
    earlyLife: 'Johnson was born Creola Katherine Coleman in White Sulphur Springs, West Virginia. She counted everything as a child and was so far ahead that she started high school at ten. Because the county offered Black children no schooling past the eighth grade, her father moved the family 120 miles each school year so that she and her siblings could attend. At West Virginia State College the mathematician W. W. Schieffelin Claytor created advanced courses for her. She graduated at eighteen, taught school, and in 1939 was one of three Black students chosen to integrate West Virginia University’s graduate programme.',
    work: [
      'In 1953 she was hired at the Langley Memorial Aeronautical Laboratory in Virginia, joining the West Area Computing unit led by Dorothy Vaughan. Within two weeks she was lent to the Flight Research Division and never went back, because the engineers found they needed her. She asked questions, insisted on attending briefings that women had not attended before, and in 1960 became the first woman in her division to be named as an author of a research report, on placing a satellite over a chosen point on the Earth.',
      'That report’s equations were used for the Mercury flights. For Alan Shepard’s 1961 suborbital flight she computed the path from launch to splashdown. Orbital flight in 1962 was planned on new IBM computers, which the astronauts did not fully trust. John Glenn asked the engineers to “get the girl” to run the same numbers by hand; if she said they were good, he was ready to go. She later worked on the Apollo lunar rendezvous, on backup navigation charts for astronauts and on the Space Shuttle.',
    ],
    timeline: [
      ['1918', 'Born in White Sulphur Springs, West Virginia, on 26 August.'],
      ['1937', 'Graduates with highest honours in mathematics and French.'],
      ['1953', 'Joins NACA’s Langley laboratory.'],
      ['1960', 'Co-authors her first technical report with Ted Skopinski.'],
      ['1961', 'Calculates the trajectory for Alan Shepard’s flight.'],
      ['1962', 'Checks the orbital calculations for John Glenn’s Friendship 7 mission.'],
      ['1969', 'Her rendezvous calculations support the Apollo 11 landing.'],
      ['1986', 'Retires from NASA.'],
      ['2015', 'Receives the Presidential Medal of Freedom.'],
      ['2020', 'Dies in Newport News, Virginia, on 24 February, aged 101.'],
    ],
    myths: [
      { myth: 'The film Hidden Figures shows events exactly as they happened.', fact: 'It compresses time and invents scenes. The long runs to a distant “colored” restroom reflect Mary Jackson’s experience more than Johnson’s, who said she simply used the nearest one, and the supervisor who tears down the sign is a fictional character.' },
      { myth: 'She calculated the missions single-handedly.', fact: 'Trajectory work was done by teams of engineers and mathematicians, and by the 1960s increasingly by electronic computers. Johnson’s special role was to derive, check and vouch for the mathematics.' },
    ],
    legacy: 'Johnson co-authored twenty-six research reports in a thirty-three-year career. The book and film Hidden Figures in 2016 made her story, and those of Dorothy Vaughan and Mary Jackson, widely known. NASA has named two facilities after her, and a spacecraft that carried supplies to the International Space Station in 2021 bore her name.',
    faqs: [
      { question: 'What did Katherine Johnson do at NASA?', answer: 'She calculated and verified flight paths, launch windows and return trajectories for the Mercury, Apollo and early Space Shuttle programmes.' },
      { question: 'Did John Glenn really ask for Katherine Johnson?', answer: 'Yes. Before his 1962 orbital flight he asked that she check the electronic computer’s output by hand, a request NASA’s own history records.' },
      { question: 'How old was Katherine Johnson when she died?', answer: 'She was 101. She died on 24 February 2020.' },
    ],
    related: ['/articles/apollo-11-engineering-behind-first-moon-landing', '/scientists/margaret-hamilton', '/scientists/grace-hopper', '/categories/space-missions'],
  },

  'tim-berners-lee': {
    summary: 'Tim Berners-Lee (born 1955) is the British computer scientist who invented the World Wide Web at CERN in 1989–1990.',
    earlyLife: 'Berners-Lee was born in London to two mathematicians, Conway Berners-Lee and Mary Lee Woods, who had met while programming the Ferranti Mark 1. He grew up building model railways with home-made electronics. At Queen’s College, Oxford, he made a computer from an old television, a soldering iron and a Motorola processor, and graduated with first-class honours in physics in 1976. During a six-month contract at CERN in 1980 he wrote a private program called ENQUIRE to keep track of links between people, programs and projects.',
    work: [
      'When he returned to CERN, thousands of visiting physicists were bringing incompatible computers and document formats. In March 1989 he gave his manager, Mike Sendall, a proposal for a “web” of documents linked across the network. Sendall wrote “Vague but exciting…” on the cover and let him go ahead. Working with the Belgian engineer Robert Cailliau, Berners-Lee wrote a language for pages (HTML), a protocol for fetching them (HTTP), an addressing scheme (the URL), a browser that could also edit, and a server, all running on a NeXT computer by the end of 1990.',
      'The design was deliberately simple and decentralized: anyone could publish a page and link to any other without asking permission, and a broken link was tolerated. In April 1993 CERN declared the web software free for anyone to use, with no royalties. Berners-Lee moved to the Massachusetts Institute of Technology in 1994 and founded the World Wide Web Consortium, where companies and researchers agree on common standards.',
    ],
    timeline: [
      ['1955', 'Born in London on 8 June.'],
      ['1976', 'Graduates in physics from Oxford.'],
      ['1980', 'Writes ENQUIRE during a contract at CERN.'],
      ['1989', 'Submits “Information Management: A Proposal” in March.'],
      ['1990', 'Completes the first browser and server; the first web page goes live at CERN.'],
      ['1991', 'Announces the web publicly on Internet newsgroups in August.'],
      ['1993', 'CERN places the web’s software in the public domain.'],
      ['1994', 'Founds the World Wide Web Consortium at MIT.'],
      ['2004', 'Knighted by Queen Elizabeth II.'],
      ['2016', 'Receives the Turing Award.'],
    ],
    myths: [
      { myth: 'Tim Berners-Lee invented the Internet.', fact: 'The Internet, the global network of networks, grew out of work by Vinton Cerf, Robert Kahn and many others from the 1960s onwards. The web is a system of linked pages that runs on top of it, like email.' },
      { myth: 'He became rich from the web.', fact: 'He never patented it or charged for it, believing it would only succeed if it were free and open to all.' },
    ],
    legacy: 'Within five years of the 1993 release the web had tens of millions of users, and it is now used by most of humanity. Berners-Lee has spent the years since defending its openness, through the World Wide Web Foundation, his support for net neutrality and Solid, a project to let people control their own data.',
    faqs: [
      { question: 'When was the World Wide Web invented?', answer: 'Berners-Lee proposed it in March 1989 and had a working system in December 1990. It was opened to the public in 1991.' },
      { question: 'What is the difference between the web and the Internet?', answer: 'The Internet is the network that connects computers. The web is one service that uses it: pages and applications reached through browsers and linked by URLs.' },
      { question: 'What was the first website?', answer: 'A page at info.cern.ch, hosted on Berners-Lee’s NeXT computer, that explained what the World Wide Web was and how to use it.' },
    ],
    related: ['/scientists/claude-shannon', '/scientists/dennis-ritchie', '/scientists/alan-turing', '/categories/technology'],
  },

  'dennis-ritchie': {
    summary: 'Dennis Ritchie (1941–2011) was an American computer scientist who created the C programming language and co-created the Unix operating system.',
    earlyLife: 'Ritchie was born in Bronxville, New York. His father, Alistair Ritchie, was a switching-systems engineer at Bell Labs and co-author of a book on switching circuits. Dennis studied physics at Harvard, where a lecture on the university’s computer caught his interest, and stayed for graduate work in applied mathematics. He wrote a doctoral thesis on the theory of computation in 1968 but never submitted the bound copy the library required, so the degree was never formally awarded. He had joined Bell Labs the year before.',
    work: [
      'Bell Labs had been part of Multics, an ambitious time-sharing system that grew too complicated. When the company withdrew in 1969, Ken Thompson wrote a much smaller system on a little-used PDP-7 computer, and Ritchie soon joined him. Unix, as it was named, was built on a few ideas: files as plain streams of bytes, a tree of directories, small programs that each do one job, and “pipes” to connect them.',
      'Thompson had written a compact language, B, for the new system. Ritchie added data types and structures so that it could make good use of newer machines, and by 1972 it had become C. C lets a programmer work close to the hardware while writing code that can be recompiled for a different computer. In 1973 Unix itself was rewritten in C, which was almost unheard of for an operating system, and it could then be carried to one machine after another.',
    ],
    timeline: [
      ['1941', 'Born in Bronxville, New York, on 9 September.'],
      ['1967', 'Joins Bell Labs.'],
      ['1969', 'Unix development begins with Ken Thompson.'],
      ['1972', 'The C language takes shape.'],
      ['1973', 'The Unix kernel is rewritten in C.'],
      ['1978', 'Kernighan and Ritchie publish The C Programming Language.'],
      ['1983', 'Ritchie and Thompson receive the Turing Award.'],
      ['2011', 'Dies at his home in Berkeley Heights, New Jersey; his death is reported on 12 October.'],
    ],
    myths: [
      { myth: 'C was invented from nothing.', fact: 'It evolved from Thompson’s B, which came from Martin Richards’s BCPL. Ritchie himself described C as a development of that line and not a fresh start.' },
      { myth: 'Ritchie wrote Unix on his own.', fact: 'Ken Thompson began it, and Ritchie, Doug McIlroy, Brian Kernighan and others at Bell Labs shaped it together. Ritchie’s distinctive contribution was C and the portability it made possible.' },
    ],
    legacy: 'Most of the world’s servers, phones and embedded devices run systems descended from or modelled on Unix, and their kernels are still written largely in C. C++, Java, C#, JavaScript and Go all borrow its syntax. Ritchie died a week after Steve Jobs, with far less public notice, though the software that Apple and almost everyone else ships rests on his work.',
    faqs: [
      { question: 'Who created the C programming language?', answer: 'Dennis Ritchie, at Bell Labs, between about 1969 and 1973, building on Ken Thompson’s language B.' },
      { question: 'What is Unix?', answer: 'An operating system first written at Bell Labs in 1969. Its design ideas shaped Linux, macOS, Android and most server software.' },
      { question: 'What is K&R?', answer: 'The nickname for The C Programming Language, the 1978 book by Brian Kernighan and Dennis Ritchie that served as the language’s definition for years and popularized the “hello, world” example.' },
    ],
    related: ['/scientists/tim-berners-lee', '/scientists/grace-hopper', '/scientists/john-von-neumann', '/articles/how-semiconductors-turn-physics-into-computing'],
  },

  'hedy-lamarr': {
    summary: 'Hedy Lamarr (1914–2000) was an Austrian-American film star and inventor who co-patented a frequency-hopping radio system in 1942.',
    earlyLife: 'Lamarr was born Hedwig Kiesler in Vienna, the only child of a bank director who liked to explain to her how machines worked. She left school for the theatre and at eighteen became notorious for the film Ecstasy. Her first husband, Friedrich Mandl, was an arms manufacturer who entertained military engineers and officials at home; she later said she learned about weapons technology by listening at those dinners. She left him in 1937, met the head of MGM in London and arrived in Hollywood with a new name.',
    work: [
      'A radio-controlled torpedo can be thrown off course if the enemy finds the control frequency and broadcasts noise on it. In 1940 Lamarr discussed the problem with George Antheil, an avant-garde composer who had once synchronized sixteen player pianos for a concert piece. Their answer was to change frequency many times a second in an agreed sequence. A jammer who did not know the sequence could block only brief fragments of the signal.',
      'To keep the ship’s transmitter and the torpedo’s receiver in step, they proposed identical perforated paper rolls, as in a player piano, stepping through eighty-eight frequencies, the number of keys on a keyboard. They sent the idea to the National Inventors Council and were granted US Patent 2,292,387, “Secret Communication System”, on 11 August 1942. The navy judged the mechanism impractical and shelved it. Lamarr was told she could help more by selling war bonds, which she did with great success.',
    ],
    timeline: [
      ['1914', 'Born in Vienna on 9 November.'],
      ['1937', 'Leaves Austria and signs with MGM in Hollywood.'],
      ['1941', 'Files the frequency-hopping patent with George Antheil in June.'],
      ['1942', 'The patent is granted on 11 August.'],
      ['1959', 'The patent expires without having earned its inventors anything.'],
      ['1997', 'Receives the Electronic Frontier Foundation Pioneer Award.'],
      ['2000', 'Dies in Casselberry, Florida, on 19 January.'],
      ['2014', 'Inducted into the National Inventors Hall of Fame.'],
    ],
    myths: [
      { myth: 'Hedy Lamarr invented Wi-Fi and Bluetooth.', fact: 'She and Antheil patented one early frequency-hopping scheme. Related ideas had been patented before, and modern wireless systems were developed independently by many engineers. Bluetooth does use frequency hopping; most Wi-Fi today uses other techniques.' },
      { myth: 'The navy used her design in the Cuban Missile Crisis.', fact: 'This is often repeated but poorly documented. Frequency-hopping radios were in military service by the 1960s, but a direct line from the 1942 patent to those systems has not been shown.' },
    ],
    legacy: 'Lamarr received no money and, for decades, no credit for the patent. Recognition came in the 1990s as spread-spectrum radio became part of everyday life. Her story is now used to show that invention is not confined to laboratories, and that a public image can hide a serious technical mind. Inventors’ Day in German-speaking countries is celebrated on her birthday.',
    faqs: [
      { question: 'What did Hedy Lamarr invent?', answer: 'With George Antheil, a “secret communication system” in which a radio transmitter and receiver hop between frequencies in step, to prevent jamming.' },
      { question: 'What is frequency hopping?', answer: 'A way of sending a radio signal by switching rapidly among many frequencies in a sequence known to both sender and receiver, which makes the signal hard to jam or intercept.' },
      { question: 'Did Hedy Lamarr have scientific training?', answer: 'No formal training. She was self-taught, inventive by habit and picked up technical knowledge from conversations with engineers.' },
    ],
    related: ['/scientists/claude-shannon', '/scientists/nikola-tesla', '/scientists/ada-lovelace', '/categories/technology'],
  },
};
