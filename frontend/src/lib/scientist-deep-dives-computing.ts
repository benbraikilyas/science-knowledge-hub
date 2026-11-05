import type { ScientistDeepDive } from './scientist-deep-dives';

// Deeper profile sections for the pioneers of computing, written for ScienceHub.
export const COMPUTING_DEEP_DIVES: Record<string, ScientistDeepDive> = {
  'ada-lovelace': {
    summary: 'Ada Lovelace (1815–1852) wrote the Notes on Babbage’s Analytical Engine, with a method for Bernoulli numbers often called the first published program.',
    earlyLife: 'Augusta Ada Byron was born in London, the only legitimate child of the poet Lord Byron and Annabella Milbanke. Byron left when she was about a month old and she never knew him. Her mother had her educated in mathematics and science, partly to steer her away from her father’s temperament. Her mentors included the scientist Mary Somerville and, later, the mathematician Augustus De Morgan. In 1835 she married William King, who became Earl of Lovelace.',
    work: [
      'In 1833 Lovelace met Charles Babbage and saw part of his Difference Engine, a machine for calculating mathematical tables. Babbage then designed the far more ambitious Analytical Engine, which would read instructions from punched cards, store numbers and make decisions. In 1843 Lovelace translated an article about it by the Italian engineer Luigi Menabrea and added seven Notes, labelled A to G, that were longer than the article itself.',
      'Note G sets out, step by step, how the Engine could calculate Bernoulli numbers, with a table tracking each operation and variable. In other notes she argued that the machine could manipulate any symbols that follow rules, not only numbers, and might one day compose music. She also wrote that it could originate nothing by itself and only did what it was ordered to perform, an argument Alan Turing later answered as “Lady Lovelace’s objection”.',
    ],
    timeline: [
      ['1815', 'Born in London on 10 December.'],
      ['1833', 'Meets Charles Babbage.'],
      ['1835', 'Marries William King, later Earl of Lovelace.'],
      ['1843', 'Publishes her translation of Menabrea’s article with her own Notes A to G.'],
      ['1852', 'Dies of cancer at 36 on 27 November.'],
      ['1980', 'The US Department of Defense names the Ada programming language after her.'],
    ],
    myths: [
      { myth: 'Lovelace was without question the first programmer.', fact: 'Babbage had sketched earlier programs for his Engine in unpublished notes. Lovelace published the most complete and detailed one, and historians still debate how to divide the credit.' },
      { myth: 'The Analytical Engine ran her program.', fact: 'The Engine was never built, so her program never ran during her lifetime.' },
    ],
    legacy: 'Lovelace’s idea that a machine can process any symbols, not just numbers, is close to how we think of computers today. Ada Lovelace Day, held every October, celebrates women in science, technology, engineering and mathematics, and the Ada programming language is still used in aviation and defence systems.',
    faqs: [
      { question: 'Why is Ada Lovelace famous?', answer: 'For her 1843 Notes on Charles Babbage’s Analytical Engine, which include a detailed method for calculating Bernoulli numbers and the idea that computers could work with symbols beyond numbers.' },
      { question: 'Was Ada Lovelace the first computer programmer?', answer: 'She is often called that because she published the first detailed program for a general-purpose computer design. Babbage wrote earlier, unpublished examples, so the title is debated.' },
      { question: 'Who was Ada Lovelace’s father?', answer: 'The poet Lord Byron. He left when she was about a month old, and she never knew him.' },
    ],
    related: ['/scientists/alan-turing', '/scientists/al-khwarizmi', '/scientists/grace-hopper', '/learn#computing-intelligence'],
  },

  'alan-turing': {
    summary: 'Alan Turing (1912–1954) defined the Turing machine, helped break Enigma at Bletchley Park and proposed the imitation game as a test for machine intelligence.',
    earlyLife: 'Turing was born in Maida Vale, London, while his father served in the Indian Civil Service, and he spent much of his childhood with foster families in England. At Sherborne School his interest in science often clashed with the school’s classical focus. He studied mathematics at King’s College, Cambridge, and was elected a fellow there in 1935, at just 22.',
    work: [
      'In 1936 Turing asked whether there is a mechanical method that can decide every mathematical statement. To answer it he imagined a simple machine that reads and writes symbols on a tape by following a table of rules. He showed that one universal machine could imitate any other if given its rule table, the core idea of the stored-program computer, and he proved that some problems cannot be solved by any such machine, a result now usually stated as the halting problem.',
      'During the Second World War he worked at Bletchley Park on German naval Enigma messages and led the design of the Bombe, an electromechanical machine that built on earlier Polish work to find Enigma settings. After the war he designed the ACE computer, worked on early computers at Manchester, and in 1950 proposed the imitation game, now called the Turing test, as a practical way to discuss whether machines can think.',
    ],
    timeline: [
      ['1912', 'Born in London on 23 June.'],
      ['1936', 'Publishes “On Computable Numbers”, introducing the Turing machine.'],
      ['1939', 'Joins Bletchley Park and works on Enigma.'],
      ['1945', 'Designs the Automatic Computing Engine at the National Physical Laboratory.'],
      ['1950', 'Publishes “Computing Machinery and Intelligence”.'],
      ['1952', 'Is convicted for a homosexual relationship and forced into hormone treatment.'],
      ['1954', 'Dies of cyanide poisoning on 7 June; the inquest rules it suicide.'],
      ['2013', 'Receives a posthumous royal pardon.'],
    ],
    myths: [
      { myth: 'Turing broke Enigma by himself.', fact: 'Polish mathematicians led by Marian Rejewski first broke Enigma in the 1930s, and Bletchley Park employed thousands of people. Turing’s work on naval Enigma and the Bombe was crucial but part of a team effort.' },
      { myth: 'Turing invented the computer.', fact: 'He supplied the theory of universal machines and designed early computers, but many people built the first working machines, including teams in Manchester, Cambridge and the United States.' },
    ],
    legacy: 'Every programmable device is a practical version of Turing’s universal machine, and his questions about machine intelligence still frame today’s debates about AI. The highest award in computer science, the ACM Turing Award, is named after him, and since 2021 his portrait has appeared on the Bank of England £50 note.',
    faqs: [
      { question: 'What is Alan Turing famous for?', answer: 'For the Turing machine, which defines what computers can do in principle, for his codebreaking at Bletchley Park, and for the Turing test.' },
      { question: 'What is the Turing test?', answer: 'A thought experiment from 1950: if a judge talking to a machine and a person by text cannot reliably tell them apart, Turing argued it is reasonable to say the machine thinks. He called it the imitation game.' },
      { question: 'How did Alan Turing die?', answer: 'He died of cyanide poisoning in 1954, two years after his conviction for homosexuality. The inquest ruled it suicide, although some historians have questioned that verdict.' },
    ],
    related: ['/scientists/ada-lovelace', '/scientists/john-von-neumann', '/scientists/claude-shannon', '/guides/best-ai-explainers'],
  },

  'grace-hopper': {
    summary: 'Grace Hopper (1906–1992) programmed the Harvard Mark I, built one of the first compilers and championed English-like programming languages that led to COBOL.',
    earlyLife: 'Grace Brewster Murray was born in New York City and was curious from childhood about how things work. She studied mathematics and physics at Vassar College, graduating in 1928, and earned a PhD in mathematics from Yale in 1934, rare for a woman at the time. She taught mathematics at Vassar until the Second World War.',
    work: [
      'In 1943 Hopper joined the US Navy Reserve and was assigned to Harvard, where she became one of the first programmers of the Harvard Mark I, an electromechanical computer, and wrote much of its manual. After the war she joined the Eckert–Mauchly Computer Corporation, working on UNIVAC, one of the first commercial computers in the United States.',
      'Her key idea was that programmers should write instructions in words and let the computer translate them into machine code. In 1952 her team produced the A-0 system, one of the first compilers, and later FLOW-MATIC, which used English-like commands for business data processing. FLOW-MATIC strongly influenced COBOL, designed in 1959 by a committee of industry and government experts.',
    ],
    timeline: [
      ['1906', 'Born in New York City on 9 December.'],
      ['1934', 'Earns a PhD in mathematics from Yale.'],
      ['1944', 'Starts programming the Harvard Mark I.'],
      ['1947', 'Her Mark II team logs a moth found in a relay as the “first actual case of bug being found”.'],
      ['1952', 'Her team completes the A-0 compiler.'],
      ['1959', 'COBOL is designed, drawing heavily on her FLOW-MATIC language.'],
      ['1986', 'Retires from the Navy as a rear admiral, aged 79.'],
      ['1992', 'Dies on 1 January.'],
    ],
    myths: [
      { myth: 'Hopper coined the term “bug”.', fact: 'Engineers used “bug” for faults long before, including Thomas Edison in the 1870s. Her team’s moth made it a famous story, and she enjoyed retelling it.' },
      { myth: 'Hopper invented COBOL single-handedly.', fact: 'COBOL was designed by the CODASYL committee in 1959. Hopper was a technical adviser, and her FLOW-MATIC language was its most important model.' },
    ],
    legacy: 'Compilers are now part of all programming, and COBOL still runs many banking and government systems. The US Navy named the destroyer USS Hopper after her, the Grace Hopper Celebration is one of the largest gatherings of women in computing, and in 2016 she was posthumously awarded the Presidential Medal of Freedom.',
    faqs: [
      { question: 'What did Grace Hopper invent?', answer: 'She led development of one of the first compilers, A-0 (1952), and of FLOW-MATIC, an English-like programming language that shaped COBOL.' },
      { question: 'Did Grace Hopper find the first computer bug?', answer: 'In 1947 her team found a moth in a Harvard Mark II relay and taped it into the logbook. The word “bug” for a fault already existed.' },
      { question: 'What rank did Grace Hopper reach in the Navy?', answer: 'Rear admiral. When she retired in 1986 at 79, she was the oldest serving commissioned officer in the US armed forces.' },
    ],
    related: ['/scientists/ada-lovelace', '/scientists/margaret-hamilton', '/scientists/john-von-neumann', '/learn#computing-intelligence'],
  },

  'claude-shannon': {
    summary: 'Claude Shannon (1916–2001) founded information theory, made the bit the unit of information and showed that switching circuits can carry out logic.',
    earlyLife: 'Shannon was born in Petoskey, Michigan, and grew up in nearby Gaylord, where he built model planes, a radio-controlled boat and a telegraph line to a friend’s house. He earned degrees in electrical engineering and mathematics from the University of Michigan in 1936, then went to MIT to work on Vannevar Bush’s differential analyzer, an early analog computer.',
    work: [
      'His 1937 master’s thesis showed that Boolean algebra, the logic of true and false, can describe and simplify circuits built from relays and switches. That link between logic and electronics is the basis of digital circuit design, and the thesis is often called one of the most important ever written.',
      'At Bell Labs he published “A Mathematical Theory of Communication” (1948). It measures information in bits, defines entropy as the average uncertainty of a message source, and proves that every noisy channel has a capacity: below that rate, error-correcting codes can make transmission as reliable as needed. Those results underpin data compression, mobile networks, the internet and deep-space communication.',
    ],
    timeline: [
      ['1916', 'Born in Petoskey, Michigan, on 30 April.'],
      ['1937', 'His master’s thesis applies Boolean algebra to switching circuits.'],
      ['1941', 'Joins Bell Labs.'],
      ['1948', 'Publishes “A Mathematical Theory of Communication”.'],
      ['1949', 'Publishes a mathematical theory of secrecy systems for cryptography.'],
      ['1950', 'Builds Theseus, a maze-solving mechanical mouse.'],
      ['1956', 'Returns to MIT, where he later becomes a permanent professor.'],
      ['2001', 'Dies on 24 February after years with Alzheimer’s disease.'],
    ],
    myths: [
      { myth: 'Shannon invented the word “bit”.', fact: 'His colleague John Tukey suggested “bit” as short for binary digit. Shannon’s 1948 paper made it the standard unit of information.' },
      { myth: 'Information theory is about meaning.', fact: 'Shannon deliberately set meaning aside. His theory measures how much uncertainty a message removes, whatever the message says.' },
    ],
    legacy: 'Every compressed file, video stream and phone call relies on Shannon’s theory, and the error-correcting codes in Wi-Fi and 5G come close to the limits he proved. He also wrote an early paper on programming computers to play chess and built juggling machines, part of a playful curiosity that shaped early artificial intelligence research.',
    faqs: [
      { question: 'Why is Claude Shannon called the father of information theory?', answer: 'His 1948 paper created the field: it defined information in bits, introduced entropy for message sources, and proved the limits of reliable communication over noisy channels.' },
      { question: 'What is Shannon entropy?', answer: 'A measure of the average uncertainty, or information, in a message source. A fair coin flip carries one bit; a more predictable source carries less.' },
      { question: 'What did Shannon’s master’s thesis show?', answer: 'That circuits of relays and switches can carry out Boolean logic, which made digital circuit design systematic.' },
    ],
    related: ['/scientists/alan-turing', '/scientists/al-kindi', '/articles/how-semiconductors-turn-physics-into-computing'],
  },

  'margaret-hamilton': {
    summary: 'Margaret Hamilton (born 1936) led the MIT team that built the Apollo on-board flight software and helped establish software engineering as a discipline.',
    earlyLife: 'Margaret Heafield was born in Paoli, Indiana, and studied mathematics at Earlham College, graduating in 1958. She planned graduate study in abstract mathematics but in 1960 took a programming job at MIT, first writing weather-prediction software for the meteorologist Edward Lorenz and then working on the SAGE air-defence system.',
    work: [
      'At the MIT Instrumentation Laboratory, later the Charles Stark Draper Laboratory, Hamilton led the software engineering division responsible for the on-board flight software of the Apollo command and lunar modules. The code had to run on a small computer with very little memory, and it could not simply crash and restart during a landing.',
      'During Apollo 11’s descent on 20 July 1969, the guidance computer raised 1202 and 1201 alarms because it was overloaded with extra work linked to the rendezvous radar configuration. The software’s priority scheduling dropped lower-priority tasks and kept the landing functions running, so mission control could tell the crew to continue. Her team’s focus on detecting and recovering from errors became a model for reliable software.',
    ],
    timeline: [
      ['1936', 'Born in Paoli, Indiana, on 17 August.'],
      ['1958', 'Graduates in mathematics from Earlham College.'],
      ['1960', 'Starts writing software at MIT, first for meteorologist Edward Lorenz.'],
      ['1965', 'Joins the Apollo program at the MIT Instrumentation Laboratory.'],
      ['1969', 'Her team’s software lands Apollo 11 safely despite computer alarms.'],
      ['1976', 'Co-founds Higher Order Software.'],
      ['2016', 'Receives the Presidential Medal of Freedom.'],
    ],
    myths: [
      { myth: 'She wrote all the Apollo code herself.', fact: 'Hundreds of people worked on Apollo software at MIT. Hamilton led the team for the on-board flight software and shaped how it was designed and tested.' },
      { myth: 'The Apollo 11 alarms were a software bug.', fact: 'They were caused by the computer receiving more work than planned. The software handled the overload as designed, which is why the landing could continue.' },
    ],
    legacy: 'Hamilton is often credited with popularizing the term “software engineering” to give programming the same rigour and respect as other engineering fields. The famous photo of her beside a stack of printed Apollo code has become a symbol of that work, and ideas her team used, such as priority scheduling and error recovery, are standard in safety-critical systems today.',
    faqs: [
      { question: 'What did Margaret Hamilton do for Apollo 11?', answer: 'She led the MIT team that developed the on-board flight software for the Apollo command and lunar modules, including the error handling that kept the landing on track.' },
      { question: 'Did Margaret Hamilton invent software engineering?', answer: 'She is widely credited with popularizing the term to show that software deserved the discipline of engineering. The field itself grew from the work of many people.' },
      { question: 'What was the 1202 alarm?', answer: 'An Apollo guidance computer alarm meaning it had more work than it could schedule. During Apollo 11’s landing the software dropped low-priority tasks and the descent continued.' },
    ],
    related: ['/articles/apollo-11-engineering-behind-first-moon-landing', '/scientists/grace-hopper', '/articles/nasa-cadre-cooperative-moon-rovers-2025'],
  },

  'john-von-neumann': {
    summary: 'John von Neumann (1903–1957) shaped quantum mechanics, founded game theory and described the stored-program design called the von Neumann architecture.',
    earlyLife: 'János Neumann was born in Budapest to a wealthy banking family and was recognized early as a mathematical prodigy. To satisfy his father he took a diploma in chemical engineering in Zurich in 1925 while completing a PhD in mathematics in Budapest in 1926. He taught in Germany, moved to Princeton in 1930 and joined the Institute for Advanced Study in 1933.',
    work: [
      'His 1945 “First Draft of a Report on the EDVAC” described a computer that stores both its program and its data in the same memory, with units for processing, control, memory, input and output. This stored-program design became the template for nearly all later computers and is called the von Neumann architecture, although the ideas came out of discussions with the ENIAC team, including J. Presper Eckert and John Mauchly.',
      'Von Neumann also gave quantum mechanics a rigorous mathematical framework in 1932, founded game theory with the minimax theorem and the 1944 book Theory of Games and Economic Behavior with Oskar Morgenstern, and worked on the Manhattan Project, including the implosion design. With Stanislaw Ulam he helped develop Monte Carlo simulation methods, and he studied self-reproducing machines through cellular automata.',
    ],
    timeline: [
      ['1903', 'Born in Budapest on 28 December.'],
      ['1928', 'Proves the minimax theorem, a foundation of game theory.'],
      ['1932', 'Publishes Mathematical Foundations of Quantum Mechanics.'],
      ['1933', 'Joins the Institute for Advanced Study in Princeton.'],
      ['1944', 'Publishes Theory of Games and Economic Behavior with Oskar Morgenstern.'],
      ['1945', 'Writes the First Draft of a Report on the EDVAC.'],
      ['1957', 'Dies of cancer in Washington, D.C., on 8 February.'],
    ],
    myths: [
      { myth: 'Von Neumann designed the stored-program computer alone.', fact: 'His report described a design developed with the ENIAC group. Eckert and Mauchly felt it took credit for shared ideas, and its circulation affected their later patent claims.' },
      { myth: 'Game theory is only about games.', fact: 'It is the mathematics of strategic decisions, used in economics, evolutionary biology, auction design and computer security.' },
    ],
    legacy: 'Most computers still follow the stored-program design his report described. Game theory became central to economics, with several Nobel prizes awarded for work built on it, and Monte Carlo simulation is used everywhere from physics to finance. His work on self-reproducing automata anticipated questions now studied in artificial life.',
    faqs: [
      { question: 'What is the von Neumann architecture?', answer: 'A computer design in which the program and the data share the same memory and are processed by a central unit. It comes from his 1945 EDVAC report.' },
      { question: 'What did von Neumann contribute to game theory?', answer: 'He proved the minimax theorem in 1928 and wrote the 1944 book Theory of Games and Economic Behavior with Oskar Morgenstern, which founded the field.' },
      { question: 'Did von Neumann work on the atomic bomb?', answer: 'Yes. He was a consultant to the Manhattan Project and contributed to the mathematics of the implosion design.' },
    ],
    related: ['/scientists/alan-turing', '/scientists/claude-shannon', '/articles/quantum-computing-after-hype-engineering-reality'],
  },
};
