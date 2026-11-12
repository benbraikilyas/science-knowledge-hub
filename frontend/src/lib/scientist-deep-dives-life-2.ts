import type { ScientistDeepDive } from './scientist-deep-dives';

// Deeper profile sections for the second group of life scientists, written for ScienceHub.
export const LIFE_SCIENCE_DEEP_DIVES_2: Record<string, ScientistDeepDive> = {
  'gregor-mendel': {
    summary: 'Gregor Mendel (1822–1884) was an Augustinian friar whose experiments with pea plants revealed the basic laws of heredity and founded genetics.',
    earlyLife: 'Mendel was born Johann Mendel in Heinzendorf, a village in Austrian Silesia that is now Hynčice in the Czech Republic. His parents were small farmers, and paying for his schooling strained the family; his sister gave up part of her dowry to help. In 1843 he entered the Augustinian abbey of St Thomas in Brno, taking the name Gregor. The abbey was a centre of learning, and it sent him to the University of Vienna, where he studied physics under Christian Doppler along with mathematics and botany.',
    work: [
      'Mendel chose the garden pea because it has clear-cut varieties and can be pollinated by hand. He followed seven traits, each with two forms, such as round or wrinkled seeds and purple or white flowers. Crossing two pure varieties gave offspring that all showed one form, which he called dominant. When those offspring were bred together, the hidden form reappeared in about one plant in four.',
      'The steady three-to-one ratio made sense if each plant carries two “factors” for a trait, passes one at random to each offspring, and one factor can mask the other. Following two traits at once, he found that they were inherited independently. His training in physics shows in the method: large numbers, careful controls and a mathematical model tested against counts. He reported the results in two lectures in 1865 and a paper the next year.',
    ],
    timeline: [
      ['1822', 'Born in Heinzendorf on 20 July.'],
      ['1843', 'Enters the Augustinian abbey in Brno.'],
      ['1851–1853', 'Studies at the University of Vienna.'],
      ['1856', 'Begins his pea experiments.'],
      ['1865', 'Presents his results to the Natural Science Society in Brno.'],
      ['1866', 'Publishes “Experiments on Plant Hybrids”.'],
      ['1868', 'Elected abbot; administrative duties end most of his research.'],
      ['1884', 'Dies in Brno on 6 January.'],
      ['1900', 'Hugo de Vries, Carl Correns and Erich von Tschermak rediscover his laws.'],
    ],
    myths: [
      { myth: 'Nobody read Mendel’s paper.', fact: 'It was distributed to more than a hundred libraries and cited about a dozen times before 1900. It was read but not understood, because no one yet connected it with a general theory of inheritance.' },
      { myth: 'Mendel faked his data.', fact: 'In 1936 the statistician Ronald Fisher noted that the results fit the expected ratios unusually closely. Historians have offered several innocent explanations, and there is no evidence of deliberate fraud; the laws themselves have been confirmed countless times.' },
    ],
    legacy: 'Mendel’s factors are today’s genes, and his dominant and recessive patterns are the first thing taught in genetics. Combined with Darwin’s natural selection in the twentieth century, his laws produced the modern theory of evolution. Genetic counselling, plant and animal breeding and the search for disease genes all start from his ratios.',
    faqs: [
      { question: 'What did Gregor Mendel discover?', answer: 'That traits are inherited through discrete units that come in pairs, separate when sex cells form, and can be dominant or recessive.' },
      { question: 'Why did Mendel use pea plants?', answer: 'They grow quickly, have many distinct varieties, normally self-pollinate and are easy to cross by hand, so he could control exactly which plants bred.' },
      { question: 'Did Darwin know about Mendel’s work?', answer: 'There is no evidence that he read it. Darwin never learned how inheritance works, which was the main gap in his theory.' },
    ],
    related: ['/scientists/charles-darwin', '/scientists/barbara-mcclintock', '/articles/crispr-gene-editing-capabilities-limits', '/learn#life-code'],
  },

  'alexander-fleming': {
    summary: 'Alexander Fleming (1881–1955) was a Scottish bacteriologist who discovered penicillin in 1928, opening the age of antibiotics.',
    earlyLife: 'Fleming was born on a hill farm near Darvel in Ayrshire, the seventh of eight children. At thirteen he went to London to live with a brother and worked for four years as a shipping clerk. A small inheritance let him enter St Mary’s Hospital Medical School in 1901, where he won most of the prizes on offer and then joined the research department of Almroth Wright, a pioneer of vaccine therapy.',
    work: [
      'In 1921 Fleming, who had a cold, put some of his own nasal mucus on a culture plate and saw bacteria dissolve around it. The agent was an enzyme he named lysozyme, part of the body’s natural defences. It worked only against harmless microbes, but it taught him what to look for.',
      'Returning from holiday in September 1928, he was sorting through old plates of staphylococci when he noticed one contaminated by a mould. Around the mould the bacterial colonies had disappeared. He grew the mould, found that its broth killed many disease-causing bacteria without harming white blood cells, and published a paper in 1929. But penicillin was unstable and hard to extract, and Fleming, who was not a chemist, let the matter rest. The Oxford team under Howard Florey and Ernst Chain purified it and proved its power in mice in 1940 and in patients from 1941.',
    ],
    timeline: [
      ['1881', 'Born near Darvel, Scotland, on 6 August.'],
      ['1906', 'Qualifies as a doctor and joins Almroth Wright’s laboratory.'],
      ['1914–1918', 'Studies wound infections in a military hospital in France.'],
      ['1921', 'Discovers lysozyme.'],
      ['1928', 'Notices the antibacterial effect of Penicillium mould.'],
      ['1929', 'Publishes his paper on penicillin.'],
      ['1941', 'The Oxford group begins treating patients with purified penicillin.'],
      ['1945', 'Shares the Nobel Prize with Florey and Chain.'],
      ['1955', 'Dies in London on 11 March; buried in St Paul’s Cathedral.'],
    ],
    myths: [
      { myth: 'Fleming’s father saved the young Winston Churchill from drowning.', fact: 'The story is fiction. It appears in neither man’s records, and Fleming himself dismissed it as “a wondrous fable”.' },
      { myth: 'Fleming turned penicillin into a medicine.', fact: 'He discovered its effect and kept the mould alive, but purification, animal tests, the first treatments and mass production were achieved by Florey, Chain, Heatley and their American partners.' },
    ],
    legacy: 'Penicillin made once-deadly infections treatable and made modern surgery, cancer therapy and transplants far safer. In his Nobel lecture Fleming warned that using too little penicillin would train bacteria to resist it, a prediction borne out by today’s crisis of antibiotic resistance.',
    faqs: [
      { question: 'How did Fleming discover penicillin?', answer: 'By noticing that a mould which had accidentally grown on a plate of bacteria was killing the bacteria near it, and then investigating why.' },
      { question: 'Who developed penicillin as a drug?', answer: 'Howard Florey, Ernst Chain and Norman Heatley at the University of Oxford, from 1939, followed by large-scale production in the United States during the Second World War.' },
      { question: 'Did Fleming warn about antibiotic resistance?', answer: 'Yes. In 1945 he cautioned that careless use of penicillin in doses too small to kill all the bacteria would produce resistant strains.' },
    ],
    related: ['/scientists/louis-pasteur', '/scientists/robert-koch', '/articles/the-evolution-of-modern-medicine', '/articles/why-scientific-breakthroughs-rarely-belong-to-one-person'],
  },

  'edward-jenner': {
    summary: 'Edward Jenner (1749–1823) was an English physician who showed that cowpox inoculation protects against smallpox, creating the first vaccine.',
    earlyLife: 'Jenner was born in Berkeley, Gloucestershire, the son of the local vicar, and was orphaned at five. As a schoolboy he was inoculated with smallpox by the method of the day, after weeks of bleeding and fasting that he never forgot. He was apprenticed to a country surgeon at fourteen and at twenty-one became a pupil of the great London surgeon John Hunter, whose advice to him was: “Why think? Why not try the experiment?”',
    work: [
      'The existing defence against smallpox was variolation: scratching matter from a smallpox sore into a healthy person to cause a mild case. It worked, but a small proportion of those treated died, and they could spread the disease. Country people said that milkmaids who had caught cowpox from cows did not get smallpox. On 14 May 1796 Jenner took fluid from a cowpox sore on the milkmaid Sarah Nelmes and inserted it into the arm of James Phipps, his gardener’s son. The boy had a slight fever and recovered. Six weeks later Jenner variolated him with smallpox, and nothing happened.',
      'After more cases he published An Inquiry into the Causes and Effects of the Variolae Vaccinae in 1798. The method spread around the world within a few years: Napoleon had his army vaccinated, and a Spanish expedition carried the vaccine to the Americas and Asia. By modern standards, testing an unproven treatment on a child and then deliberately exposing him to a deadly disease would not be permitted.',
    ],
    timeline: [
      ['1749', 'Born in Berkeley on 17 May.'],
      ['1770', 'Begins training under John Hunter in London.'],
      ['1789', 'Elected a Fellow of the Royal Society for his study of the cuckoo.'],
      ['1796', 'Vaccinates James Phipps on 14 May.'],
      ['1798', 'Publishes the Inquiry.'],
      ['1803', 'The Royal Jennerian Society is founded to promote vaccination.'],
      ['1823', 'Dies in Berkeley on 26 January.'],
      ['1980', 'The World Health Organization declares smallpox eradicated.'],
    ],
    myths: [
      { myth: 'Jenner was the first person to use cowpox against smallpox.', fact: 'The farmer Benjamin Jesty inoculated his wife and sons with cowpox in 1774, and there were others. Jenner was the first to test the protection deliberately, publish it and campaign for its use.' },
      { myth: 'Before Jenner there was no protection from smallpox.', fact: 'Variolation had been practised for centuries in China, India, Africa and the Ottoman Empire, and was brought to Britain in 1721 by Lady Mary Wortley Montagu. Vaccination was a much safer replacement.' },
    ],
    legacy: 'Smallpox, which killed an estimated 300 million people in the twentieth century alone, is the only human disease to have been eradicated, and vaccination did it. The words vaccine and vaccination, from the Latin vacca, cow, were extended by Louis Pasteur to all such immunizations in Jenner’s honour.',
    faqs: [
      { question: 'What did Edward Jenner discover?', answer: 'That deliberately infecting a person with cowpox, a mild disease, protects them from smallpox. This was the first vaccine.' },
      { question: 'Who was the first person vaccinated?', answer: 'In Jenner’s experiment, eight-year-old James Phipps, on 14 May 1796.' },
      { question: 'Where does the word vaccine come from?', answer: 'From vacca, the Latin for cow, because the first vaccine was made from cowpox.' },
    ],
    related: ['/scientists/louis-pasteur', '/scientists/al-razi', '/scientists/robert-koch', '/articles/the-evolution-of-modern-medicine'],
  },

  'robert-koch': {
    summary: 'Robert Koch (1843–1910) was a German physician who identified the bacteria that cause anthrax, tuberculosis and cholera and founded modern bacteriology.',
    earlyLife: 'Koch was born in Clausthal, a mining town in the Harz mountains, one of thirteen children of a mining engineer. He taught himself to read from newspapers before he started school. At the University of Göttingen he studied medicine under Jacob Henle, who had argued years earlier that infectious diseases are caused by living organisms. After serving as a surgeon in the Franco-Prussian War he became district medical officer in the small town of Wollstein.',
    work: [
      'In Wollstein, anthrax was killing farm animals. With a microscope given to him by his wife Emmy, Koch watched the rod-shaped bacteria found in the blood of sick animals, grew them in drops of fluid from an ox’s eye, and saw them form tough spores that could survive in soil for years. Mice injected with the cultured bacteria developed anthrax. His 1876 paper gave the first complete proof that a particular microbe causes a particular disease.',
      'Called to Berlin, he gathered a team that changed laboratory practice. They stained bacteria with dyes to make them visible, photographed them, and grew them on solid jelly so that each colony came from a single cell; the use of agar was suggested by Fanny Hesse, and the lidded dish was designed by Julius Petri. On 24 March 1882 Koch announced that he had found the slow-growing bacillus of tuberculosis, then the cause of roughly one death in seven in Europe.',
    ],
    timeline: [
      ['1843', 'Born in Clausthal on 11 December.'],
      ['1866', 'Graduates in medicine from Göttingen.'],
      ['1876', 'Demonstrates the life cycle of the anthrax bacillus.'],
      ['1882', 'Announces the discovery of the tuberculosis bacterium on 24 March.'],
      ['1884', 'Reports the cholera bacterium after expeditions to Egypt and India.'],
      ['1890', 'Introduces tuberculin as a supposed remedy for tuberculosis.'],
      ['1905', 'Receives the Nobel Prize in Physiology or Medicine.'],
      ['1910', 'Dies in Baden-Baden on 27 May.'],
    ],
    myths: [
      { myth: 'Koch found a cure for tuberculosis.', fact: 'His tuberculin, announced with great publicity in 1890, did not cure the disease and harmed some patients. It later proved useful as a skin test for infection.' },
      { myth: 'Koch’s postulates must all be met to prove a microbe causes a disease.', fact: 'Koch knew of exceptions, such as healthy carriers of cholera. Viruses, which cannot be grown without living cells, and many other cases do not fit, and the criteria have been revised since.' },
    ],
    legacy: 'In about twenty years Koch’s methods led his pupils and rivals to the microbes behind diphtheria, typhoid, tetanus, plague and many other diseases. World Tuberculosis Day is held each year on 24 March. His bitter rivalry with Louis Pasteur, sharpened by the war between their countries, pushed both schools to faster discoveries.',
    faqs: [
      { question: 'What did Robert Koch discover?', answer: 'The causes of anthrax, tuberculosis and cholera, together with the laboratory methods used to isolate and identify bacteria.' },
      { question: 'What are Koch’s postulates?', answer: 'Four criteria for linking a microbe to a disease: it is found in all cases, can be isolated and grown in pure culture, causes the disease when introduced into a healthy host, and can be recovered from that host.' },
      { question: 'Who discovered the cholera bacterium first?', answer: 'The Italian anatomist Filippo Pacini described it in 1854, but his work was overlooked. Koch identified it independently in 1883–1884 and showed how it spreads.' },
    ],
    related: ['/scientists/louis-pasteur', '/scientists/alexander-fleming', '/scientists/edward-jenner', '/articles/how-instruments-changed-what-science-could-know'],
  },

  'barbara-mcclintock': {
    summary: 'Barbara McClintock (1902–1992) was an American geneticist who discovered transposable elements, or “jumping genes”, through her studies of maize.',
    earlyLife: 'McClintock was born in Hartford, Connecticut, and grew up in Brooklyn, an independent child who loved being alone. Her mother feared that a college education would make her unmarriageable, but her father supported her, and in 1919 she enrolled in Cornell University’s College of Agriculture. She took the only genetics course open to undergraduates and was invited to join the graduate class, earning her doctorate in botany in 1927.',
    work: [
      'At Cornell she developed staining methods that let her identify each of the ten maize chromosomes by its shape. In 1931 she and her student Harriet Creighton tracked a chromosome carrying visible markers at both ends and showed that when linked traits are separated in the offspring, the chromosome has physically swapped a segment with its partner. It was the direct proof of crossing-over that genetics had lacked.',
      'In the 1940s she studied plants whose kernels and leaves were streaked and spotted. She traced the patterns to two elements she called Dissociation and Activator. Dissociation could move to a new site on a chromosome, breaking it or switching off a neighbouring pigment gene; when it jumped out again, the gene came back on, leaving a coloured spot. The timing was controlled by Activator. She concluded that the genome is not a fixed string of genes but responds and rearranges, and that such “controlling elements” regulate development.',
    ],
    timeline: [
      ['1902', 'Born in Hartford, Connecticut, on 16 June.'],
      ['1927', 'Receives her doctorate from Cornell.'],
      ['1931', 'With Harriet Creighton, proves the physical basis of crossing-over.'],
      ['1941', 'Joins Cold Spring Harbor Laboratory.'],
      ['1944', 'Elected to the National Academy of Sciences.'],
      ['1951', 'Presents her work on transposition at the Cold Spring Harbor Symposium.'],
      ['1983', 'Awarded the Nobel Prize in Physiology or Medicine.'],
      ['1992', 'Dies in Huntington, New York, on 2 September.'],
    ],
    myths: [
      { myth: 'McClintock was an ignored outsider.', fact: 'She was among the most respected geneticists in America, elected to the National Academy of Sciences at forty-one and president of the Genetics Society in 1945. It was specifically her ideas about transposition and gene control that met with silence.' },
      { myth: 'Her colleagues rejected the idea that genes can move.', fact: 'Many accepted that her elements moved in maize but saw it as an oddity. What they doubted was her larger claim that such elements regulate genes. Transposition was accepted as general once it was found in bacteria in the late 1960s.' },
    ],
    legacy: 'Transposable elements turn out to make up nearly half of human DNA and even more of the maize genome. They drive mutation and evolution, spread antibiotic resistance among bacteria and have been adapted as laboratory tools. McClintock remains the only woman to have won an unshared Nobel Prize in Physiology or Medicine.',
    faqs: [
      { question: 'What are jumping genes?', answer: 'Transposable elements: stretches of DNA that can move, or copy themselves, from one position in the genome to another, sometimes altering the activity of nearby genes.' },
      { question: 'Why did McClintock study maize?', answer: 'Each kernel on a cob is a separate offspring whose colour shows its genetic make-up, and maize chromosomes are large enough to study under a light microscope.' },
      { question: 'When did Barbara McClintock win the Nobel Prize?', answer: 'In 1983, more than thirty years after her key experiments, for the discovery of mobile genetic elements.' },
    ],
    related: ['/scientists/gregor-mendel', '/scientists/rosalind-franklin', '/articles/crispr-gene-editing-capabilities-limits', '/guides/best-biology-evolution-articles'],
  },

  'rachel-carson': {
    summary: 'Rachel Carson (1907–1964) was an American marine biologist and writer whose book Silent Spring exposed the ecological harm of pesticides.',
    earlyLife: 'Carson grew up on a small farm in Springdale, Pennsylvania, exploring the woods with her mother and publishing her first story in a children’s magazine at ten. She entered college to study English and switched to biology after a course with an inspiring teacher. A summer at the Marine Biological Laboratory in Woods Hole gave her a first sight of the sea. She earned a master’s degree in zoology from Johns Hopkins in 1932, but the Depression and the need to support her family ended her plans for a doctorate.',
    work: [
      'She joined the Bureau of Fisheries to write radio scripts and rose to be editor-in-chief of publications for the Fish and Wildlife Service. Her sea trilogy, Under the Sea-Wind, The Sea Around Us and The Edge of the Sea, combined current oceanography with a clear, lyrical style. The success of the second book let her leave government work to write full time.',
      'Silent Spring took four years to research. It explains how chlorinated pesticides such as DDT persist in soil and water, dissolve in fat and become more concentrated at each step up a food chain, so that robins die after eating earthworms from sprayed ground and eagles lay eggs with shells too thin to hatch. Carson also described insects evolving resistance and argued for targeted and biological controls. She had every chapter checked by specialists and supplied more than fifty pages of sources.',
    ],
    timeline: [
      ['1907', 'Born in Springdale, Pennsylvania, on 27 May.'],
      ['1932', 'Receives her master’s degree in zoology.'],
      ['1936', 'Joins the US Bureau of Fisheries as a junior aquatic biologist.'],
      ['1951', 'Publishes The Sea Around Us.'],
      ['1962', 'Silent Spring appears in The New Yorker in June and as a book in September.'],
      ['1963', 'The President’s Science Advisory Committee supports her conclusions; she testifies to the US Senate.'],
      ['1964', 'Dies in Silver Spring, Maryland, on 14 April.'],
      ['1972', 'The United States bans most uses of DDT.'],
    ],
    myths: [
      { myth: 'Carson wanted all pesticides banned.', fact: 'She wrote that she did not argue that chemical insecticides must never be used. Her target was indiscriminate spraying of long-lasting poisons whose effects had not been studied.' },
      { myth: 'Silent Spring caused millions of malaria deaths.', fact: 'DDT has never been banned for disease control; international agreements allow it for that purpose. Carson herself warned that overuse in farming was making mosquitoes resistant, which is a main reason it lost effectiveness.' },
    ],
    legacy: 'Silent Spring changed how the public and governments think about chemicals in the environment. It led within a decade to the Environmental Protection Agency and new pesticide laws, and bald eagles, ospreys and peregrine falcons recovered after DDT was restricted. Carson wrote the book while being treated for breast cancer, a fact she kept private so that her critics could not use it.',
    faqs: [
      { question: 'What is Silent Spring about?', answer: 'The effects of synthetic pesticides, especially DDT, on wildlife, ecosystems and human health, and the case for using them with far more care.' },
      { question: 'Why is the book called Silent Spring?', answer: 'The title imagines a spring in which no birds sing because they have been killed by pesticides.' },
      { question: 'Was Rachel Carson a scientist?', answer: 'Yes. She trained as a zoologist and worked as a government marine biologist for fifteen years before becoming a full-time writer.' },
    ],
    related: ['/scientists/charles-darwin', '/articles/the-natural-history-of-selborne', '/categories/biology', '/guides/best-biology-evolution-articles'],
  },
};
