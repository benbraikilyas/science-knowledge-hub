// Hub pages that gather related scientist profiles around one search question,
// such as "famous Muslim scientists" or "famous women scientists".
// Each scientist's line comes from their profile, so the hub never drifts from it.

export interface ScientistCollectionSection {
  heading: string;
  intro: string;
  slugs: string[];
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
];

export function getScientistCollection(slug: string) {
  return SCIENTIST_COLLECTIONS.find((collection) => collection.slug === slug);
}

/** Hubs that list a given scientist, for "part of" links on profile pages. */
export function collectionsForScientist(slug: string) {
  return SCIENTIST_COLLECTIONS.filter((collection) =>
    collection.sections.some((section) => section.slugs.includes(slug)));
}
