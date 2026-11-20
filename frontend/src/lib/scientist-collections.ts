// Hub pages that gather related scientist profiles around one search question,
// such as "famous Muslim scientists" or "famous women scientists".
// Each scientist's line comes from their profile, so the hub never drifts from it.

export interface ScientistCollectionSection {
  heading: string;
  intro: string;
  slugs: string[];
  /** Topic-specific notes per scientist (keyed by slug); shown instead of the generic contributions. */
  notes?: Record<string, { short: string; text: string }>;
}

export interface ScientistCollection {
  slug: string;
  /** Visible H1. */
  title: string;
  /** Search-result title, 60 characters or fewer. */
  seoTitle: string;
  description: string;
  eyebrow: string;
  /** Two- or three-sentence direct answer shown first, for readers and answer engines. */
  answer: string;
  /** Heading of the summary table. */
  tableHeading: string;
  /** When set, the table's last column and each card show this note (e.g. "Faith") instead of the breakthrough. */
  noteLabel?: string;
  sections: ScientistCollectionSection[];
  context: { heading: string; paragraphs: string[] };
  myths: { myth: string; fact: string }[];
  faqs: { question: string; answer: string }[];
  related: { label: string; href: string }[];
  updatedAt: string;
}

export const SCIENTIST_COLLECTIONS: ScientistCollection[] = [
  {
    slug: 'muslim-scientists',
    title: 'Famous Muslim Scientists and Their Inventions',
    seoTitle: 'Famous Muslim Scientists and Their Inventions (18 Pioneers)',
    description:
      'Meet 18 famous Muslim scientists of the Islamic Golden Age, from al-Khwarizmi and Ibn Sina to Ibn al-Haytham, and what each one discovered or invented.',
    eyebrow: 'Islamic Golden Age',
    answer:
      'The most famous Muslim scientists include al-Khwarizmi, who made algebra a discipline and gave us the word “algorithm”; Ibn al-Haytham, who explained vision with experiments; Ibn Sina, author of the Canon of Medicine; al-Razi and al-Zahrawi in medicine and surgery; al-Biruni, who measured the Earth; and Ibn al-Nafis, who described the pulmonary circulation. Most worked between the 9th and 14th centuries, in cities from Baghdad and Cairo to Córdoba, Fez and Samarkand.',
    tableHeading: 'Muslim scientists and their inventions at a glance',
    sections: [
      {
        heading: 'Mathematics and astronomy',
        intro: 'Algebra, trigonometry, precise calendars and new planetary models came out of observatories and libraries from Baghdad to Maragha.',
        slugs: ['al-khwarizmi', 'al-battani', 'al-biruni', 'omar-khayyam', 'nasir-al-din-al-tusi'],
      },
      {
        heading: 'Medicine and pharmacology',
        intro: 'Hospitals, clinical case notes, surgical instruments and huge drug encyclopedias made medicine in the Islamic world the most advanced of its time.',
        slugs: ['ibn-sina', 'al-razi', 'al-zahrawi', 'ibn-al-nafis', 'ibn-al-baytar'],
      },
      {
        heading: 'Physics, chemistry and engineering',
        intro: 'Experiments with light, laboratory chemistry, programmable machines and even an early attempt at flight.',
        slugs: ['ibn-al-haytham', 'jabir-ibn-hayyan', 'al-jazari', 'abbas-ibn-firnas'],
      },
      {
        heading: 'Philosophy, geography and the study of society',
        intro: 'Thinkers who mapped the world, defended reason, broke codes and asked why civilizations rise and fall.',
        slugs: ['al-kindi', 'ibn-rushd', 'al-idrisi', 'ibn-khaldun'],
      },
    ],
    context: {
      heading: 'What was the Islamic Golden Age?',
      paragraphs: [
        'Historians use the term for the period from roughly the 8th to the 13th century, when the Abbasid caliphs in Baghdad and rulers across the Islamic world funded translation, libraries, hospitals and observatories. The House of Wisdom in Baghdad, especially under the caliph al-Ma’mun (813–833), gathered scholars who translated Greek, Persian and Indian works into Arabic and then went beyond them.',
        'Arabic was the shared language of science, but the scientists themselves were Arab, Persian, Amazigh, Andalusian, Central Asian and more, and Christian, Jewish and Sabian scholars worked in the same institutions. Science did not stop when the Mongols sacked Baghdad in 1258: the Maragha observatory, the astronomers of Damascus and Samarkand, and Ibn Khaldun in Fez and Cairo all came later.',
        'North Africa and al-Andalus were major centres too. The University of al-Qarawiyyin in Fez, traditionally dated to 859 and founded by Fatima al-Fihri, is often described as the oldest continuously operating university. Al-Idrisi was born in Ceuta, Ibn Rushd died in Marrakesh, Ibn Khaldun served at the court in Fez, and the mathematician Ibn al-Banna taught in Marrakesh.',
      ],
    },
    myths: [
      {
        myth: 'Muslim scholars only preserved Greek science until Europe rediscovered it.',
        fact: 'Translation was the starting point. Al-Khwarizmi’s algebra, Ibn al-Haytham’s experimental optics, Ibn al-Nafis’s pulmonary circulation and the Tusi couple were new work that Europe later learned from.',
      },
      {
        myth: 'All the scientists of the Islamic Golden Age were Arabs.',
        fact: 'Many of the best known were Persian (Ibn Sina, al-Razi, al-Biruni, Omar Khayyam, al-Tusi), Andalusian (al-Zahrawi, Ibn Rushd) or from Central Asia (al-Khwarizmi). Arabic was the common language of learning.',
      },
      {
        myth: 'Science in the Islamic world ended in 1258.',
        fact: 'The Mongol sack of Baghdad was a heavy blow, but major work continued for centuries, including the Maragha observatory (founded 1259), Ibn al-Shatir’s planetary models in Damascus and Ibn Khaldun’s Muqaddimah (1377).',
      },
    ],
    faqs: [
      {
        question: 'Who is the most famous Muslim scientist?',
        answer: 'There is no single answer, but al-Khwarizmi (algebra and algorithms), Ibn Sina (the Canon of Medicine) and Ibn al-Haytham (optics and the experimental method) are the names most often cited by historians of science.',
      },
      {
        question: 'What did Muslim scientists invent or discover?',
        answer: 'Their contributions include algebra as a systematic discipline, step-by-step calculation methods that gave “algorithm” its name, an experimental theory of vision, surgical instruments, the description of pulmonary circulation, frequency analysis for breaking codes, the Tusi couple, the Jalali calendar and al-Jazari’s programmable automata.',
      },
      {
        question: 'What was the House of Wisdom?',
        answer: 'Bayt al-Hikma was a library and centre of translation and research in Baghdad, supported by the Abbasid caliphs and especially al-Ma’mun in the early 9th century. Al-Khwarizmi and al-Kindi are among the scholars associated with it.',
      },
      {
        question: 'Were there famous Muslim scientists from Morocco and North Africa?',
        answer: 'Yes. Al-Idrisi, who made the most accurate world map of the 12th century, was born in Ceuta; Ibn Rushd served as court physician in Marrakesh; Ibn Khaldun worked in Fez; and Ibn al-Banna al-Marrakushi was a leading mathematician in Marrakesh around 1300.',
      },
      {
        question: 'Why did Muslim scientists write in Arabic?',
        answer: 'Arabic was the language of administration and scholarship across the Islamic world, so a scholar in Córdoba could read a book written in Baghdad. Many scientists also wrote in Persian, and Latin translations of their Arabic works later spread their ideas through Europe.',
      },
    ],
    related: [
      { label: 'Learning path: the Islamic Golden Age', href: '/learn#golden-age' },
      { label: 'The House of Wisdom in Abbasid Baghdad', href: '/articles/house-of-wisdom-baghdad-history' },
      { label: 'Who invented zero?', href: '/articles/who-invented-zero-history-of-zero' },
      { label: 'Famous scientists who believed in God', href: '/scientists/scientists-who-believed-in-god' },
      { label: 'Famous women scientists', href: '/scientists/women-scientists' },
      { label: 'Why breakthroughs rarely belong to one person', href: '/articles/why-scientific-breakthroughs-rarely-belong-to-one-person' },
      { label: 'All scientist profiles', href: '/scientists' },
    ],
    updatedAt: '2026-11-18',
  },
  {
    slug: 'women-scientists',
    title: 'Famous Women Scientists Who Changed Science',
    seoTitle: 'Famous Women Scientists: 11 Who Changed Science',
    description:
      'Marie Curie, Emmy Noether, Rosalind Franklin, Lise Meitner, Ada Lovelace and more: what 11 famous women scientists discovered and the credit some were denied.',
    eyebrow: 'Women in science',
    answer:
      'Some of the most famous women scientists are Marie Curie, the first person to win Nobel Prizes in two sciences; Rosalind Franklin, whose X-ray images revealed the helix of DNA; Lise Meitner, who explained nuclear fission; Emmy Noether, whose theorem ties every symmetry in physics to a conservation law; Barbara McClintock, who discovered jumping genes; Rachel Carson, whose Silent Spring launched the environmental movement; and the computing pioneers Ada Lovelace, Grace Hopper, Katherine Johnson and Margaret Hamilton.',
    tableHeading: 'Famous women scientists at a glance',
    sections: [
      {
        heading: 'Physics, chemistry and mathematics',
        intro: 'Radioactivity, nuclear fission, two Nobel Prizes in two different sciences and the theorem behind every conservation law.',
        slugs: ['marie-curie', 'lise-meitner', 'emmy-noether'],
      },
      {
        heading: 'Biology, genetics and the environment',
        intro: 'The structure of DNA, genes that move and the evidence that pesticides poison whole food chains.',
        slugs: ['rosalind-franklin', 'barbara-mcclintock', 'rachel-carson'],
      },
      {
        heading: 'Computing, mathematics and spaceflight',
        intro: 'The first published program, the first compilers, the orbits that took astronauts to space and the software that landed them on the Moon.',
        slugs: ['ada-lovelace', 'grace-hopper', 'katherine-johnson', 'margaret-hamilton', 'hedy-lamarr'],
      },
    ],
    context: {
      heading: 'Why so many women scientists were overlooked',
      paragraphs: [
        'For most of history women were kept out of the places where science was done. Lise Meitner could not attend an Austrian grammar school and first worked in Berlin in a basement because women were barred from the chemistry institute. Marie Curie was refused membership of the French Academy of Sciences in 1911, the year she won her second Nobel Prize.',
        'Credit was often lost even after the work was done. Rosalind Franklin’s data were shown to Watson and Crick without her knowledge, and she died in 1958, four years before the Nobel Prize for the double helix, which is never awarded after death. Meitner’s explanation of fission went unrewarded when the 1944 Chemistry prize went to Otto Hahn alone. Katherine Johnson worked for years in a segregated unit before her name appeared on a NASA report.',
      ],
    },
    myths: [
      {
        myth: 'Women only entered science in the twentieth century.',
        fact: 'Women have done science for as long as it has existed, from the mathematician Hypatia of Alexandria to Ada Lovelace in the 1840s. What changed later was their access to universities, laboratories and recognition.',
      },
      {
        myth: 'Watson and Crick discovered DNA’s structure on their own.',
        fact: 'Their model relied on Rosalind Franklin’s X-ray measurements, including Photo 51. Her paper with Raymond Gosling appeared alongside theirs in Nature in April 1953.',
      },
      {
        myth: 'Hedy Lamarr invented Wi-Fi.',
        fact: 'She and George Antheil patented an early frequency-hopping system in 1942. Modern wireless technologies were developed later by many engineers; Lamarr is better described as a pioneer of the idea.',
      },
    ],
    faqs: [
      {
        question: 'Who is the most famous female scientist?',
        answer: 'Marie Curie. She discovered polonium and radium, pioneered the study of radioactivity and remains the only person to have won Nobel Prizes in two different sciences, physics in 1903 and chemistry in 1911.',
      },
      {
        question: 'Who was the first woman to win a Nobel Prize?',
        answer: 'Marie Curie, who shared the 1903 Nobel Prize in Physics with Pierre Curie and Henri Becquerel for their work on radioactivity.',
      },
      {
        question: 'Who are famous women in computer science?',
        answer: 'Ada Lovelace, who published the first computer program in 1843; Grace Hopper, who built early compilers and shaped COBOL; Margaret Hamilton, who led the Apollo flight software team; and Katherine Johnson, whose calculations sent astronauts into orbit.',
      },
      {
        question: 'Which women scientists were denied a Nobel Prize?',
        answer: 'Lise Meitner, whose explanation of nuclear fission went unrewarded in 1944, and Rosalind Franklin, who died before the 1962 prize for DNA’s structure, are the best-known cases. The astrophysicist Jocelyn Bell Burnell, who discovered pulsars, is another often cited.',
      },
      {
        question: 'What did Rosalind Franklin discover?',
        answer: 'Her X-ray diffraction images of DNA, especially Photo 51, showed that the molecule is a helix and gave key measurements used in the double-helix model. She later mapped the structure of viruses.',
      },
    ],
    related: [
      { label: 'Learning path: computing and intelligence', href: '/learn#computing-intelligence' },
      { label: 'Famous Muslim scientists', href: '/scientists/muslim-scientists' },
      { label: 'Apollo 11: the engineering behind the Moon landing', href: '/articles/apollo-11-engineering-behind-first-moon-landing' },
      { label: 'All scientist profiles', href: '/scientists' },
    ],
    updatedAt: '2026-11-18',
  },
  {
    slug: 'scientists-who-believed-in-god',
    title: 'Famous Scientists Who Believed in God',
    seoTitle: 'Famous Scientists Who Believed in God (16 Examples)',
    description:
      'Newton, Kepler, Faraday, Mendel, Ibn Sina and more: 16 famous scientists who believed in God, what their faith meant to their work, and views often misquoted.',
    eyebrow: 'Science and faith',
    answer:
      'Many founders of modern science were religious. Copernicus was a church official, Kepler trained to be a Lutheran minister, Newton wrote more about theology than about physics, Mendel was an Augustinian friar and Faraday was an elder of a small Christian church. In the Islamic world, scientists such as Ibn al-Nafis, Ibn Rushd and Nasir al-Din al-Tusi were also scholars of religion or law. Their beliefs were far from identical, and some famous names, including Einstein and Darwin, are often presented as believers when their own words say otherwise.',
    tableHeading: 'Scientists and their faith at a glance',
    noteLabel: 'Faith',
    sections: [
      {
        heading: 'Christian scientists of the Scientific Revolution',
        intro: 'The astronomers and physicists who moved the Earth from the centre of the universe were, almost without exception, believing Christians.',
        slugs: ['nicolaus-copernicus', 'galileo-galilei', 'johannes-kepler', 'isaac-newton'],
        notes: {
          'nicolaus-copernicus': {
            short: 'Catholic; church administrator',
            text: 'Copernicus spent his career as a canon, an administrator of the cathedral chapter of Frombork, and dedicated On the Revolutions of the Heavenly Spheres to Pope Paul III. His book was restricted only in 1616, seventy-three years after his death.',
          },
          'galileo-galilei': {
            short: 'Catholic',
            text: 'Galileo remained a Catholic all his life, and both of his daughters became nuns. In his 1615 Letter to the Grand Duchess Christina he argued, quoting Cardinal Baronius, that the Bible teaches how to go to heaven, not how the heavens go. His trial in 1633 turned on church authority and the reading of scripture as much as on astronomy.',
          },
          'johannes-kepler': {
            short: 'Lutheran',
            text: 'Kepler trained to become a Lutheran minister and believed that the mathematical order of the planets reflected the mind of their Creator. His conscience also cost him: he was barred from communion in his own church for refusing to accept a statement of doctrine he disagreed with.',
          },
          'isaac-newton': {
            short: 'Christian, privately unorthodox',
            text: 'Newton wrote more about theology and biblical prophecy than about physics, and the General Scholium added to the Principia in 1713 argues that the order of the solar system points to an intelligent Creator. Privately he rejected the doctrine of the Trinity, a view he kept hidden because it could have cost him his position.',
          },
        },
      },
      {
        heading: 'Christian scientists of the 19th and 20th centuries',
        intro: 'Faith remained common among leading scientists long after the Scientific Revolution, from the founders of electromagnetism to the father of genetics.',
        slugs: ['michael-faraday', 'james-clerk-maxwell', 'gregor-mendel', 'charles-babbage', 'max-planck'],
        notes: {
          'michael-faraday': {
            short: 'Sandemanian Christian',
            text: 'Faraday belonged all his life to the Sandemanians, a small and strict Christian church, and served as one of its elders. He rarely mixed religion and science in his lectures, but believed that the laws he uncovered were the work of God.',
          },
          'james-clerk-maxwell': {
            short: 'Presbyterian Christian',
            text: 'Maxwell was a devout Christian throughout his life, and prayers he wrote survive among his papers. He was wary of using the science of the day to prove religious claims, because scientific theories change.',
          },
          'gregor-mendel': {
            short: 'Augustinian friar',
            text: 'Mendel was an Augustinian friar who ran his pea experiments in the garden of the abbey of St Thomas in Brno and was elected its abbot in 1868. The abbey supported scientific study and paid for his training at the University of Vienna.',
          },
          'charles-babbage': {
            short: 'Christian',
            text: 'Babbage wrote The Ninth Bridgewater Treatise (1837), arguing that natural laws could include apparent exceptions planned in advance by their Creator, much as his calculating engines could be set to change their sequence at a chosen step.',
          },
          'max-planck': {
            short: 'Lutheran',
            text: 'Planck served for many years as a churchwarden in his Lutheran parish and argued in his 1937 lecture Religion and Natural Science that science and religion do not conflict but answer different needs. He described his faith in very general terms and avoided defending particular doctrines.',
          },
        },
      },
      {
        heading: 'Muslim scientists of the Islamic Golden Age',
        intro: 'In the medieval Islamic world the same scholar often studied astronomy, medicine and religious law, and many saw the study of nature as reflection on creation.',
        slugs: ['al-khwarizmi', 'ibn-sina', 'al-biruni', 'ibn-al-nafis', 'ibn-rushd', 'nasir-al-din-al-tusi', 'ibn-khaldun'],
        notes: {
          'al-khwarizmi': {
            short: 'Muslim',
            text: 'Al-Khwarizmi opened his book on algebra with praise of God and wrote it partly to solve practical problems of Islamic law, such as dividing inheritances, which fill a large part of the work.',
          },
          'ibn-sina': {
            short: 'Muslim',
            text: 'Ibn Sina knew the Quran by heart as a boy and spent his life trying to reconcile Aristotle’s philosophy with Islamic belief. Some of his conclusions, such as the eternity of the world, were sharply criticized by the theologian al-Ghazali.',
          },
          'al-biruni': {
            short: 'Muslim',
            text: 'Al-Biruni was a believing Muslim who wrote one of the earliest careful studies of another religion, his book on India, describing Hindu beliefs and science in their own terms and without ridicule.',
          },
          'ibn-al-nafis': {
            short: 'Muslim; jurist',
            text: 'Ibn al-Nafis was also a jurist of the Shafi’i school who taught law and hadith in Cairo. His philosophical novel, known in Latin as Theologus Autodidactus, uses the story of a man growing up alone on an island to discuss reason, revelation and the future of the world.',
          },
          'ibn-rushd': {
            short: 'Muslim; judge',
            text: 'Ibn Rushd served as chief judge of Córdoba and wrote a major handbook of Islamic law. In the Decisive Treatise he argued that the Quran itself calls believers to study nature and philosophy, and that true reasoning cannot contradict revelation.',
          },
          'nasir-al-din-al-tusi': {
            short: 'Muslim; theologian',
            text: 'Al-Tusi was a leading Shi’i theologian as well as an astronomer. His theological treatise Tajrid al-I’tiqad became one of the most widely commented texts of Islamic theology.',
          },
          'ibn-khaldun': {
            short: 'Muslim; judge',
            text: 'Ibn Khaldun served as a judge of the Maliki school in Cairo and wrote the Muqaddimah as a believing Muslim, yet insisted that history be explained through causes that can be checked, such as economics and social cohesion.',
          },
        },
      },
    ],
    context: {
      heading: 'Did science and religion really conflict?',
      paragraphs: [
        'The idea of a long war between science and religion became popular in the late 19th century through books such as John William Draper’s History of the Conflict between Religion and Science (1874) and Andrew Dickson White’s A History of the Warfare of Science with Theology in Christendom (1896). Most historians of science now see the relationship as more varied: there were real clashes, such as Galileo’s trial, but also long periods in which religious institutions funded observatories, universities and hospitals.',
        'Religious scientists did not stop with the 19th century. The Belgian Catholic priest Georges Lemaître proposed in 1927 that the universe is expanding, the idea that grew into the Big Bang theory, and the Indian mathematician Srinivasa Ramanujan credited his family goddess, Namagiri, with inspiring his formulas. At the same time, many leading scientists past and present have been agnostics or atheists. This page records what individual scientists believed; it does not argue that science supports or rules out any faith.',
      ],
    },
    myths: [
      {
        myth: 'Albert Einstein believed in God.',
        fact: 'Einstein rejected a personal God who answers prayers. He spoke of “Spinoza’s God”, a sense of awe at the order of nature, and in a 1954 letter called the word God “the expression and product of human weaknesses”. He also disliked being called an atheist. His line “science without religion is lame, religion without science is blind” is genuine, but he used “religion” in that special sense.',
      },
      {
        myth: 'Charles Darwin renounced evolution and became a believer on his deathbed.',
        fact: 'The story was spread in 1915 by an evangelist, Lady Hope, and was denied by Darwin’s family, including his daughter Henrietta, who was with him at the end. In 1879 Darwin wrote that “agnostic” best described his state of mind.',
      },
      {
        myth: 'Stephen Hawking believed in God because he wrote about knowing “the mind of God”.',
        fact: 'The phrase at the end of A Brief History of Time was a metaphor for a complete theory of physics. Hawking later said plainly that he was not religious and that, in his view, science made a creator unnecessary.',
      },
    ],
    faqs: [
      {
        question: 'Did Isaac Newton believe in God?',
        answer: 'Yes, deeply. He wrote extensively on theology and prophecy and saw the order of the universe as evidence of a Creator, but his beliefs were unorthodox: he privately rejected the doctrine of the Trinity.',
      },
      {
        question: 'Did Albert Einstein believe in God?',
        answer: 'Not in a personal God. Einstein described a feeling of awe at the rational order of nature, which he associated with the philosopher Spinoza’s idea of God, and he rejected both organized religion and the label atheist.',
      },
      {
        question: 'Which Muslim scientists were also religious scholars?',
        answer: 'Ibn al-Nafis was a jurist who taught law and hadith, Ibn Rushd and Ibn Khaldun served as judges of Islamic law, and Nasir al-Din al-Tusi wrote one of the most influential works of Shi’i theology.',
      },
      {
        question: 'Who was the priest behind the Big Bang theory?',
        answer: 'Georges Lemaître, a Belgian Catholic priest and physicist, who proposed in 1927 that the universe is expanding and later suggested it began from a single “primeval atom”.',
      },
      {
        question: 'Are most scientists religious today?',
        answer: 'Surveys find that scientists are on average less religious than the general public, but views vary widely between countries and fields, and many working scientists hold religious beliefs.',
      },
    ],
    related: [
      { label: 'Famous Muslim scientists and their inventions', href: '/scientists/muslim-scientists' },
      { label: 'Science myths about famous scientists', href: '/science-myths' },
      { label: 'Why breakthroughs rarely belong to one person', href: '/articles/why-scientific-breakthroughs-rarely-belong-to-one-person' },
      { label: 'All scientist profiles', href: '/scientists' },
    ],
    updatedAt: '2026-11-19',
  },
];

export function getScientistCollection(slug: string) {
  return SCIENTIST_COLLECTIONS.find((collection) => collection.slug === slug);
}

/** Hubs that list a given scientist, for "part of" links on profile pages. */
export function collectionsForScientist(slug: string) {
  return SCIENTIST_COLLECTIONS.filter((collection) =>
    collection.sections.some((section) => section.slugs.includes(slug)));
}
