import type { ScientistDeepDive } from './scientist-deep-dives';

// Deeper profile sections for the life scientists, written for ScienceHub.
export const LIFE_SCIENCE_DEEP_DIVES: Record<string, ScientistDeepDive> = {
  'charles-darwin': {
    summary: 'Charles Darwin (1809–1882) explained evolution by natural selection in On the Origin of Species, building on observations from the Beagle voyage.',
    earlyLife: 'Darwin was born in Shrewsbury, England, into a wealthy family; his grandfathers were the physician Erasmus Darwin and the potter Josiah Wedgwood. He began studying medicine at Edinburgh but disliked surgery, then studied at Cambridge with a view to becoming a clergyman. There the botanist John Stevens Henslow encouraged his interest in natural history and recommended him for a place on HMS Beagle.',
    work: [
      'Natural selection rests on observations anyone can check. Individuals in a population vary, much of that variation is inherited, and more offspring are born than can survive. Those whose traits suit their environment slightly better tend to leave more descendants, so over many generations populations change and can split into new species.',
      'Darwin developed the idea from 1837 onwards, gathering evidence from fossils, the geographic distribution of species, animal breeding and anatomy. When Alfred Russel Wallace sent him a paper describing the same mechanism in 1858, their work was presented together at the Linnean Society, and Darwin published On the Origin of Species the following year. He did not know how inheritance worked; that came with genetics in the twentieth century.',
    ],
    timeline: [
      ['1809', 'Born in Shrewsbury on 12 February.'],
      ['1831', 'Sails on HMS Beagle for a voyage of almost five years.'],
      ['1835', 'Visits the Galápagos Islands.'],
      ['1858', 'Joint papers by Darwin and Wallace are presented at the Linnean Society.'],
      ['1859', 'Publishes On the Origin of Species on 24 November.'],
      ['1871', 'Publishes The Descent of Man.'],
      ['1882', 'Dies at Down House, Kent, and is buried in Westminster Abbey.'],
    ],
    myths: [
      { myth: 'Darwin said humans evolved from monkeys.', fact: 'Evolution says humans and other apes share common ancestors. Living monkeys and apes are our evolutionary cousins, not our ancestors.' },
      { myth: '“Survival of the fittest” is Darwin’s phrase.', fact: 'The philosopher Herbert Spencer coined it in 1864. Darwin added it to later editions of the Origin, and “fittest” means best suited to an environment, not strongest.' },
    ],
    legacy: 'Evolution by natural selection is the organizing idea of biology. It explains antibiotic resistance, guides updates to vaccines for evolving viruses, and underpins genetics, ecology and medicine. Darwin’s later books on emotions, orchids and earthworms show how widely he applied patient observation.',
    faqs: [
      { question: 'What did Charles Darwin discover?', answer: 'He explained how species change over time through natural selection, setting it out in On the Origin of Species (1859).' },
      { question: 'What did Darwin find in the Galápagos?', answer: 'Birds, tortoises and plants that differed from island to island. He grasped their significance only after returning, when experts such as the ornithologist John Gould classified his specimens.' },
      { question: 'Where can I read On the Origin of Species for free?', answer: 'It is in the public domain. Our book guide links to a free, legal online edition.' },
    ],
    related: ['/articles/on-the-origin-of-species', '/articles/the-voyage-of-the-beagle', '/articles/the-descent-of-man', '/guides/best-biology-evolution-articles'],
  },

  'louis-pasteur': {
    summary: 'Louis Pasteur (1822–1895) showed that microbes cause fermentation and disease, invented pasteurization and developed vaccines against anthrax and rabies.',
    earlyLife: 'Pasteur was born in Dole, in eastern France, the son of a tanner. He was an average student at first and a talented painter, but he went on to the École Normale Supérieure in Paris to study chemistry and physics. His research on crystals of tartaric acid in 1848 showed that some molecules exist in mirror-image forms, a discovery at the root of stereochemistry.',
    work: [
      'Asked to help with problems in the alcohol industry, Pasteur showed that fermentation is carried out by living microorganisms and that unwanted microbes spoil wine and beer. Gentle heating killed them without ruining the product, a process now called pasteurization. His swan-neck flask experiments showed that boiled broth stays sterile when dust and microbes cannot reach it, undermining the idea that life arises spontaneously.',
      'These results supported the germ theory of disease, which he, Robert Koch and others established. Pasteur found that weakened forms of a microbe could protect animals, and he developed vaccines for chicken cholera and anthrax. In 1885 he and his colleagues treated nine-year-old Joseph Meister, who had been bitten by a rabid dog, with a rabies vaccine, and the boy survived.',
    ],
    timeline: [
      ['1822', 'Born in Dole, France, on 27 December.'],
      ['1848', 'Discovers molecular chirality in tartaric acid crystals.'],
      ['1859–1862', 'Swan-neck flask experiments challenge spontaneous generation.'],
      ['1860s', 'Shows that fermentation is microbial and develops pasteurization.'],
      ['1881', 'Runs a public anthrax vaccine trial at Pouilly-le-Fort.'],
      ['1885', 'The first person is treated with his rabies vaccine.'],
      ['1888', 'The Pasteur Institute opens in Paris.'],
      ['1895', 'Dies near Paris on 28 September.'],
    ],
    myths: [
      { myth: 'Pasteur invented germ theory alone.', fact: 'Agostino Bassi, Ignaz Semmelweis, John Snow, Joseph Lister and Robert Koch, among others, made key contributions. Pasteur supplied much of the experimental evidence and the public persuasion.' },
      { myth: 'The famous 1881 anthrax trial used the method Pasteur announced.', fact: 'When his private notebooks became available, the historian Gerald Geison found that the vaccine had been prepared with a chemical method close to a rival’s, not the method Pasteur described in public.' },
    ],
    legacy: 'Pasteurized milk and food safety, routine vaccination and sterile medical practice all trace back to the germ theory he helped prove. The Pasteur Institute and its international network of institutes still research infectious diseases.',
    faqs: [
      { question: 'What is Louis Pasteur known for?', answer: 'For proving that microbes cause fermentation and many diseases, inventing pasteurization, and developing vaccines for anthrax and rabies.' },
      { question: 'What is pasteurization?', answer: 'Heating a liquid such as milk or wine to a moderate temperature for a set time to kill harmful microbes while keeping its taste and quality.' },
      { question: 'Who was the first person to receive Pasteur’s rabies vaccine?', answer: 'Joseph Meister, a nine-year-old boy bitten by a rabid dog, in July 1885. He survived.' },
    ],
    related: ['/articles/the-evolution-of-modern-medicine', '/scientists/al-razi', '/scientists/ibn-sina'],
  },

  'rosalind-franklin': {
    summary: 'Rosalind Franklin (1920–1958) made the X-ray images, including Photo 51, that revealed DNA’s helical structure, and later mapped the structure of viruses.',
    earlyLife: 'Franklin was born in London into a prominent Jewish family and decided early on a career in science. She studied natural sciences at Newnham College, Cambridge. During the Second World War she researched the microstructure of coal for the British Coal Utilisation Research Association, earning her PhD in 1945, then spent several years in Paris mastering X-ray diffraction.',
    work: [
      'X-ray crystallography works out a molecule’s structure from the way X-rays scatter off it. At King’s College London from 1951, Franklin improved the method for DNA fibres and found that DNA takes two forms, A and B, depending on humidity. In May 1952 she and her student Raymond Gosling recorded Photo 51, a sharp diffraction pattern of the B form whose X shape signals a helix.',
      'Without her knowledge, Maurice Wilkins showed Photo 51 to James Watson in early 1953, and Watson and Francis Crick also saw a research report containing her measurements. Combined with their model-building, these data led to the double-helix model published in April 1953, alongside papers by Franklin and Gosling and by Wilkins’s group. At Birkbeck College she then led pioneering work on the structure of the tobacco mosaic virus with Aaron Klug.',
    ],
    timeline: [
      ['1920', 'Born in London on 25 July.'],
      ['1945', 'Earns her PhD from Cambridge for research on coal.'],
      ['1947', 'Begins X-ray diffraction work in Paris.'],
      ['1951', 'Joins King’s College London to study DNA.'],
      ['1952', 'Records Photo 51 with Raymond Gosling.'],
      ['1953', 'Her DNA paper appears in Nature beside Watson and Crick’s; she moves to Birkbeck College.'],
      ['1958', 'Dies of ovarian cancer at 37 on 16 April.'],
    ],
    myths: [
      { myth: 'Franklin did not understand her own data.', fact: 'Her notebooks show she had concluded that the B form was helical with its phosphate backbone on the outside, and she was close to the full structure.' },
      { myth: 'She was passed over for the 1962 Nobel Prize.', fact: 'She died in 1958, and Nobel Prizes are not awarded posthumously. Watson, Crick and Wilkins shared the 1962 prize.' },
    ],
    legacy: 'Photo 51 is one of the most important images in science, and Franklin’s virus research helped launch structural virology; Aaron Klug later won a Nobel Prize for work that built on it. Her story is now central to discussions of credit in science, and a research institute and the European Mars rover carry her name.',
    faqs: [
      { question: 'What did Rosalind Franklin discover?', answer: 'Her X-ray diffraction work, especially Photo 51, provided key evidence that DNA is a double helix. She also determined important features of virus structures.' },
      { question: 'What is Photo 51?', answer: 'An X-ray diffraction image of DNA’s B form taken in 1952 by Franklin and Raymond Gosling. Its X-shaped pattern indicates a helical molecule.' },
      { question: 'Why didn’t Rosalind Franklin get a Nobel Prize?', answer: 'She died in 1958, four years before the 1962 Nobel Prize for DNA’s structure, and the prize is not given posthumously.' },
    ],
    related: ['/articles/crispr-gene-editing-capabilities-limits', '/articles/why-scientific-breakthroughs-rarely-belong-to-one-person', '/guides/best-biology-evolution-articles'],
  },
};
