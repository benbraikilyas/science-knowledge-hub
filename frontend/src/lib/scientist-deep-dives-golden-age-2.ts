import type { ScientistDeepDive } from './scientist-deep-dives';

// Deeper profile sections for the second group of Arab and Muslim pioneers, written for ScienceHub.
// Medieval dates and attributions are stated cautiously where the sources are late or incomplete.
export const GOLDEN_AGE_DEEP_DIVES_2: Record<string, ScientistDeepDive> = {
  'omar-khayyam': {
    summary: 'Omar Khayyam (1048–1131) was a Persian mathematician and astronomer who solved cubic equations with geometry, helped create the Jalali calendar and is credited with the Rubaiyat.',
    earlyLife: 'Khayyam was born in Nishapur, a major city of Khorasan in north-eastern Iran. His name means “tent-maker”, which may have been his family’s trade. He studied in Nishapur and by his early twenties had moved to Samarkand, where the patronage of the chief judge Abu Tahir allowed him to write his treatise on algebra.',
    work: [
      'Khayyam’s Treatise on Demonstration of Problems of Algebra, written around 1070, sorts equations of the first, second and third degree into twenty-five types. For the cubics, which no one could then solve with a formula, he gave geometric constructions: draw two conic sections, such as a circle and a parabola, and the point where they cross gives the answer. He recognized that a cubic can have more than one solution and hoped that a purely arithmetical method would be found later. It was, in sixteenth-century Italy.',
      'In 1074 the Seljuk sultan Malik-Shah and his vizier Nizam al-Mulk invited him to Isfahan to lead an observatory. The team’s measurement of the year led to the Jalali calendar, adopted in 1079, whose pattern of leap years keeps it in step with the seasons for thousands of years. In a commentary on Euclid he also tried to prove the parallel postulate, using a four-sided figure that Giovanni Saccheri would study again six centuries later.',
    ],
    timeline: [
      ['1048', 'Born in Nishapur on 18 May.'],
      ['c. 1070', 'Writes his treatise on algebra in Samarkand.'],
      ['1074', 'Invited to Isfahan to direct an observatory for Malik-Shah.'],
      ['1077', 'Completes his commentary on the difficulties in Euclid’s postulates.'],
      ['1079', 'The Jalali calendar is introduced.'],
      ['1092', 'Malik-Shah and Nizam al-Mulk die; funding for the observatory ends.'],
      ['1131', 'Dies in Nishapur on 4 December.'],
      ['1859', 'Edward FitzGerald publishes his English version of the Rubaiyat.'],
    ],
    myths: [
      { myth: 'Khayyam was first of all a poet.', fact: 'In his lifetime he was known as a mathematician, astronomer and philosopher. Quatrains were attributed to him only decades after his death, and scholars still disagree about how many of the hundreds bearing his name he actually wrote.' },
      { myth: 'He was a schoolmate of Nizam al-Mulk and Hassan-i Sabbah.', fact: 'The tale of the three schoolfriends is a later legend. Nizam al-Mulk was about thirty years older than Khayyam, so they cannot have studied together.' },
    ],
    legacy: 'Khayyam’s idea of connecting algebra with geometry anticipated the analytic geometry of Descartes. The Iranian calendar used today descends from the Jalali reform, and the arithmetical triangle known in Europe as Pascal’s triangle is called the Khayyam triangle in Iran, after a method of extracting roots he described in a work now lost.',
    faqs: [
      { question: 'What is Omar Khayyam famous for?', answer: 'In mathematics, for classifying cubic equations and solving them with conic sections; in astronomy, for the Jalali calendar; and in literature, for the Rubaiyat.' },
      { question: 'Did Omar Khayyam write the Rubaiyat?', answer: 'Some quatrains are probably his, but many were added to the collection over the centuries. The famous English Rubaiyat is a very free translation by Edward FitzGerald.' },
      { question: 'How accurate was the Jalali calendar?', answer: 'Very accurate. Its year length is within seconds of the true solar year, and it tracks the seasons at least as well as the Gregorian calendar introduced five centuries later.' },
    ],
    related: ['/scientists/al-khwarizmi', '/articles/euclids-elements-of-geometry', '/articles/why-mathematical-proof-is-more-than-calculation', '/learn#golden-age'],
  },

  'nasir-al-din-al-tusi': {
    summary: 'Nasir al-Din al-Tusi (1201–1274) was a Persian polymath who founded the Maragha observatory, invented the Tusi couple and made trigonometry an independent science.',
    earlyLife: 'Al-Tusi was born in Tus, in north-eastern Iran, and first studied religious sciences with his father. As a young man he went to Nishapur to learn philosophy, medicine and mathematics. When Mongol armies invaded the region in the 1220s he took refuge with the Ismaili rulers, living for about twenty-five years in their mountain strongholds, including Alamut, where he wrote on ethics, logic and astronomy.',
    work: [
      'Ptolemy’s astronomy made planets speed up and slow down around a point called the equant, which broke the ancient rule that heavenly motions should be uniform and circular. Al-Tusi found a way around it. If a small circle rolls inside a circle twice its size, a point on the rim of the small one moves back and forth along a straight line. With this “Tusi couple” he could reproduce Ptolemy’s results using only uniform circular motions.',
      'After the Mongols took Alamut in 1256, al-Tusi became adviser to Hulagu Khan and persuaded him to build an observatory at Maragha. It had a large mural quadrant, a library and a staff of astronomers from across Asia. Twelve years of observation produced the Zij-i Ilkhani tables. His Treatise on the Quadrilateral set out plane and spherical trigonometry as a subject in its own right, including the law of sines.',
    ],
    timeline: [
      ['1201', 'Born in Tus on 18 February.'],
      ['c. 1230s', 'Enters the service of the Ismaili rulers in Quhistan and later Alamut.'],
      ['1235', 'Completes the Nasirean Ethics.'],
      ['1247', 'Describes the Tusi couple in his revision of Ptolemy’s Almagest.'],
      ['1256', 'Alamut falls to the Mongols; al-Tusi joins Hulagu Khan.'],
      ['1259', 'Construction of the Maragha observatory begins.'],
      ['1272', 'The Zij-i Ilkhani tables are completed.'],
      ['1274', 'Dies in Baghdad on 26 June.'],
    ],
    myths: [
      { myth: 'It is proven that Copernicus copied the Tusi couple.', fact: 'Copernicus used the same device, even with similar lettering in his diagram, and many historians think knowledge of it reached him through Byzantine or Italian sources. No document showing the route has been found, so the link remains likely but unproven.' },
      { myth: 'The Maragha astronomers believed the Earth moved around the Sun.', fact: 'Their models were still Earth-centred. What they changed was the mathematics of the planetary mechanisms. Al-Tusi did note that observation alone cannot decide whether the Earth is at rest.' },
    ],
    legacy: 'The Maragha observatory became the model for later ones at Samarkand and Istanbul, and its astronomers, including Ibn al-Shatir in the next century, produced the mathematical tools that reappear in Copernicus. Al-Tusi’s editions of Euclid, Ptolemy and other Greek authors were standard textbooks for centuries, and his Nasirean Ethics is still read.',
    faqs: [
      { question: 'What is the Tusi couple?', answer: 'A geometric device in which a circle rolls inside another circle twice as large, so that a point on the smaller circle moves in a straight line. It converts circular motion into linear motion.' },
      { question: 'What was the Maragha observatory?', answer: 'An astronomical research centre founded in 1259 in north-west Iran, with large instruments, a major library and an international staff, directed by al-Tusi.' },
      { question: 'What did al-Tusi contribute to mathematics?', answer: 'He wrote the first treatise that treats trigonometry separately from astronomy and gave a clear statement and proof of the law of sines for plane triangles.' },
    ],
    related: ['/scientists/nicolaus-copernicus', '/scientists/al-battani', '/scientists/al-biruni', '/articles/a-short-history-of-astronomy'],
  },

  'ibn-rushd': {
    summary: 'Ibn Rushd, or Averroes (1126–1198), was an Andalusian judge, physician and philosopher whose commentaries on Aristotle shaped European and Islamic thought.',
    earlyLife: 'Ibn Rushd was born in Córdoba, then one of the largest cities in Europe. His grandfather and father had both served as chief judge there, and he received a thorough training in Maliki law, theology, medicine and philosophy. Around 1169 the philosopher Ibn Tufayl introduced him to the Almohad caliph Abu Yaqub Yusuf, who complained that Aristotle was hard to follow and encouraged the young scholar to explain him.',
    work: [
      'Over the next three decades Ibn Rushd wrote short, middle and long commentaries on nearly all of Aristotle’s surviving works, trying to recover what Aristotle had meant beneath later layers of interpretation. In The Incoherence of the Incoherence he answered al-Ghazali’s attack on the philosophers point by point, and in the Decisive Treatise he argued as a jurist that the Quran itself calls on people to reflect on creation, so demonstrative reasoning is a duty for those capable of it.',
      'He practised and wrote on medicine too. His al-Kulliyat fi al-Tibb, or “Generalities of Medicine”, covers anatomy, health, disease, diagnosis, drugs and treatment, and was taught in Latin translation as the Colliget. He observed that people who survive smallpox do not catch it again, and he suggested that the retina, not the lens, is the part of the eye that receives light. In astronomy he criticized Ptolemy’s epicycles as physically impossible, a complaint that later reformers shared.',
    ],
    timeline: [
      ['1126', 'Born in Córdoba.'],
      ['c. 1169', 'Presented to the caliph Abu Yaqub Yusuf; begins his commentaries on Aristotle.'],
      ['1169', 'Appointed judge in Seville.'],
      ['c. 1180', 'Writes The Incoherence of the Incoherence.'],
      ['1182', 'Becomes court physician in Marrakesh and chief judge of Córdoba.'],
      ['1195', 'Falls from favour; exiled to Lucena and his philosophical books are burned.'],
      ['1198', 'Restored to favour; dies in Marrakesh on 11 December.'],
    ],
    myths: [
      { myth: 'Averroes taught a “double truth”, one for religion and another for philosophy.', fact: 'That doctrine was attributed to some of his Latin followers by their critics. Ibn Rushd wrote that truth does not contradict truth: where scripture and demonstration seem to differ, scripture should be read figuratively.' },
      { myth: 'He was an opponent of religion.', fact: 'He was a practising judge who wrote a major manual of Islamic law, Bidayat al-Mujtahid, that is still consulted. His argument was that philosophy and revelation, properly understood, agree.' },
    ],
    legacy: 'In Latin Europe his commentaries were read beside Aristotle for four hundred years, provoking Thomas Aquinas and a movement known as Latin Averroism; Dante placed him among the great thinkers, and Raphael painted him in The School of Athens. Jewish philosophers studied him closely in Hebrew translation. His influence in the Islamic world was smaller at first, but he was taken up again by Arab reformers from the nineteenth century.',
    faqs: [
      { question: 'Who was Averroes?', answer: 'Averroes is the Latin name of Ibn Rushd, a twelfth-century philosopher, physician and judge from Córdoba, best known for his commentaries on Aristotle.' },
      { question: 'Where is Ibn Rushd buried?', answer: 'He died in Marrakesh, Morocco, and was first buried there. About three months later his remains were moved to the family tomb in Córdoba.' },
      { question: 'Why were Ibn Rushd’s books burned?', answer: 'In 1195, under pressure from conservative scholars during a war with the Christian kingdoms, the caliph al-Mansur banished him and ordered philosophical works destroyed. He was pardoned shortly before his death.' },
    ],
    related: ['/scientists/ibn-sina', '/scientists/al-kindi', '/scientists/ibn-khaldun', '/learn#golden-age'],
  },

  'al-idrisi': {
    summary: 'Al-Idrisi (c. 1100–c. 1165) was a geographer born in Ceuta who made the Tabula Rogeriana, the most accurate world map of the twelfth century, for King Roger II of Sicily.',
    earlyLife: 'Al-Idrisi was born in Ceuta, a port on the Strait of Gibraltar, into the Hammudid family, which claimed descent from the Idrisid dynasty of Morocco and from the Prophet Muhammad. He was educated in Córdoba and travelled while still young through al-Andalus, North Africa and Anatolia, and probably along the Atlantic coasts of Portugal and France.',
    work: [
      'Around 1138 he arrived in Palermo, the capital of Norman Sicily, where Arabic, Greek and Latin cultures met. King Roger II commissioned a description of the world, and the two men spent years questioning ship captains, pilgrims and merchants. Where informants agreed, their reports were accepted; where they contradicted one another, they were set aside. The findings were combined with Ptolemy’s geography and earlier Arabic works.',
      'The book, completed in January 1154, is known as the Book of Roger or by its Latin name, Tabula Rogeriana. It divides the inhabited world into seven climate bands from south to north and each band into ten sections, giving seventy maps that fit together into one rectangular map of Europe, Asia and northern Africa. Each section has a text on its towns, roads, distances, products and peoples. A circular world map was also engraved on a silver disc, which was destroyed in a riot a few years later.',
    ],
    timeline: [
      ['c. 1100', 'Born in Ceuta.'],
      ['c. 1116', 'Begins years of travel through Spain, North Africa and beyond.'],
      ['c. 1138', 'Settles at the court of Roger II in Palermo.'],
      ['1154', 'Completes the Tabula Rogeriana in January; Roger II dies in February.'],
      ['c. 1160', 'The silver world map is lost during unrest in Palermo.'],
      ['c. 1165', 'Dies, in Sicily or Ceuta.'],
      ['1592', 'An abridged Arabic text of his geography is printed in Rome.'],
    ],
    myths: [
      { myth: 'His maps are upside down by mistake.', fact: 'They place south at the top deliberately, as many Islamic maps of the period did. North-up became the norm in Europe later; neither choice is more correct.' },
      { myth: 'Medieval geographers thought the Earth was flat.', fact: 'Al-Idrisi states plainly that the Earth is round like a ball, with water held to it naturally. Educated scholars in both the Islamic world and Europe accepted this.' },
    ],
    legacy: 'Copies of his maps were made for three centuries, and they stayed more accurate than most European maps until the age of Portuguese and Spanish voyages. His work is a major source for the geography of medieval Africa, the Mediterranean and northern Europe. IDRISI, a widely used program for analysing geographic data, was named after him.',
    faqs: [
      { question: 'What is the Tabula Rogeriana?', answer: 'A world geography and atlas completed by al-Idrisi in 1154 for Roger II of Sicily. Its title means “The Book of Roger”.' },
      { question: 'Where was al-Idrisi from?', answer: 'He was born in Ceuta, on the Moroccan side of the Strait of Gibraltar, studied in Córdoba and worked for most of his career in Palermo, Sicily.' },
      { question: 'Why is south at the top of al-Idrisi’s map?', answer: 'It was the usual convention of Islamic cartographers of his time. The orientation of a map is a choice, not a fact about the world.' },
    ],
    related: ['/scientists/al-biruni', '/scientists/ibn-khaldun', '/scientists/ibn-al-baytar', '/categories/history-of-science'],
  },

  'ibn-khaldun': {
    summary: 'Ibn Khaldun (1332–1406) was a North African historian whose Muqaddimah explained the rise and fall of states through social cohesion, economics and environment.',
    earlyLife: 'Ibn Khaldun was born in Tunis into a family of scholars and officials that had emigrated from Seville. He studied the Quran, law, Arabic literature, mathematics and philosophy with leading teachers. When he was seventeen the Black Death reached Tunis and killed both his parents and many of his teachers. At twenty he took his first court post and soon moved to Fez, the Marinid capital in Morocco.',
    work: [
      'The Muqaddimah, or “Introduction”, opens with a complaint: historians repeat reports without asking whether they could be true. Ibn Khaldun proposes checking them against the nature of human society, which he treats as a new field of study. Its central idea is asabiyyah, the solidarity that binds a group. Tough, close-knit peoples from the margins conquer settled states, grow rich and comfortable in the cities, lose their cohesion within about three generations and are replaced in turn.',
      'Around this cycle he builds chapters on geography and climate, the economy, education, crafts and the sciences. He observes that the value of goods comes largely from the labour put into them, that specialization increases output, and that prices move with supply and demand. He argues that low tax rates at the start of a dynasty bring in large revenues, while the high rates of its decline discourage work and shrink the total.',
    ],
    timeline: [
      ['1332', 'Born in Tunis on 27 May.'],
      ['1348–1349', 'Loses his parents in the Black Death.'],
      ['1354', 'Joins the Marinid court in Fez.'],
      ['1364', 'Leads a diplomatic mission from Granada to Pedro I of Castile in Seville.'],
      ['1375–1378', 'Withdraws to Qalat Ibn Salama and writes the Muqaddimah.'],
      ['1382', 'Moves to Cairo; later appointed a chief judge.'],
      ['1401', 'Meets the conqueror Timur outside the walls of Damascus.'],
      ['1406', 'Dies in Cairo on 17 March.'],
    ],
    myths: [
      { myth: 'The Muqaddimah is a complete book in itself.', fact: 'It is the introduction and first part of a much longer universal history, the Kitab al-Ibar, whose later volumes are an important source on the Amazigh and Arab dynasties of North Africa.' },
      { myth: 'Ibn Khaldun founded sociology as a continuous tradition.', fact: 'He described a “science of human society” five centuries before the word sociology existed, but he had few followers. Ottoman scholars read him from the seventeenth century, and Europe discovered him in the nineteenth. Modern sociology developed separately and recognized him afterwards.' },
    ],
    legacy: 'The Muqaddimah is regarded as one of the great works of historical thought. The historian Arnold Toynbee called it the greatest work of its kind created by any mind in any time or place. Economists cite its passages on taxation and labour, and asabiyyah is still used by scholars analysing how states and movements hold together.',
    faqs: [
      { question: 'What is the Muqaddimah about?', answer: 'It explains why societies and dynasties rise and decline, using causes such as group solidarity, economic life, geography and education, and sets out a method for judging historical reports.' },
      { question: 'What does asabiyyah mean?', answer: 'Group feeling or social cohesion: the willingness of people to support and sacrifice for one another. Ibn Khaldun saw it as the force that creates political power.' },
      { question: 'Did Ibn Khaldun live in Morocco?', answer: 'Yes. He spent about eight years at the Marinid court in Fez in the 1350s and 1360s, studied with the city’s scholars, and returned to Fez later in his career.' },
    ],
    related: ['/scientists/ibn-rushd', '/scientists/al-idrisi', '/scientists/al-biruni', '/articles/why-scientific-breakthroughs-rarely-belong-to-one-person'],
  },

  'al-battani': {
    summary: 'Al-Battani (c. 858–929) was an astronomer who measured the solar year and the tilt of the Earth’s axis with great precision and introduced trigonometric methods used for centuries.',
    earlyLife: 'Al-Battani was born in or near Harran, in what is now south-eastern Turkey, a city with an old tradition of star study. His family name al-Sabi suggests ancestors who belonged to the Sabian community of Harran, though he himself was Muslim. His father, Jabir ibn Sinan, was a well-known instrument maker and probably taught him the craft. He settled in Raqqa on the Euphrates, where his dated observations run from 877 to 918.',
    work: [
      'Using large instruments, including sundials and a wall quadrant, al-Battani measured the positions of the Sun and stars more exactly than anyone before him. He gave the year a length of 365 days, 5 hours, 46 minutes and 24 seconds, about two minutes short of the modern value, and found the tilt of the Earth’s axis to be 23 degrees 35 minutes, very close to its value in his day. He redetermined the slow drift of the equinoxes as one degree in 66 years, much better than Ptolemy’s one degree per century.',
      'Comparing his data with Ptolemy’s, he saw that the direction in which the Sun appears smallest and most distant had shifted by more than sixteen degrees. The Sun’s apparent size therefore varies enough that the Moon sometimes fails to cover it, producing a ring-shaped, or annular, eclipse, which Ptolemy had thought impossible. In his calculations he used sines in place of the awkward Greek chords and worked with what we now call tangents and cotangents.',
    ],
    timeline: [
      ['c. 858', 'Born in or near Harran.'],
      ['877', 'Begins systematic observations at Raqqa.'],
      ['c. 900', 'Compiles the first version of his astronomical tables, the Zij.'],
      ['918', 'Last recorded observation.'],
      ['929', 'Dies near Samarra while returning from Baghdad.'],
      ['c. 1116', 'Plato of Tivoli translates the Zij into Latin.'],
      ['1537', 'The Latin translation is printed in Nuremberg.'],
    ],
    myths: [
      { myth: 'Al-Battani used a telescope.', fact: 'The telescope was invented around 1608, almost seven centuries after his death. His accuracy came from large, carefully built naked-eye instruments and from decades of repeated observation.' },
      { myth: 'He discovered that the Earth orbits the Sun.', fact: 'He worked within the Earth-centred system of Ptolemy. His contribution was to correct its numbers, and those corrected numbers later helped Copernicus.' },
    ],
    legacy: 'Copernicus quotes al-Battani repeatedly in On the Revolutions, and Tycho Brahe, Kepler and Galileo all knew his work. His measurements of the year were among the data consulted in the debates that led to the Gregorian calendar reform. The use of sines and tangents in astronomy passed from his Zij into the European mathematical tradition.',
    faqs: [
      { question: 'What did al-Battani discover?', answer: 'He showed that the Sun’s apogee moves, that annular solar eclipses can occur, and he measured the solar year, precession and the obliquity of the ecliptic far more accurately than Ptolemy.' },
      { question: 'Who was Albategnius?', answer: 'Albategnius is the Latin form of al-Battani’s name, under which he was known to European astronomers. A large crater on the Moon carries it.' },
      { question: 'How accurate was al-Battani’s measurement of the year?', answer: 'His value was about two minutes shorter than the true length of the solar year, a remarkable result for observations made without optical instruments.' },
    ],
    related: ['/scientists/nicolaus-copernicus', '/scientists/nasir-al-din-al-tusi', '/scientists/al-biruni', '/articles/a-short-history-of-astronomy'],
  },

  'abbas-ibn-firnas': {
    summary: 'Abbas ibn Firnas (c. 810–887) was an Andalusian inventor credited with an early attempt at gliding flight, a water clock and methods for making clear glass.',
    earlyLife: 'Ibn Firnas was born near Ronda in southern Spain to a family of Amazigh origin whose ancestors had arrived with the Muslim conquest. He moved to Córdoba, the capital of the Umayyad emirate, where he taught music and poetry and joined the circle of court scholars under the emirs Abd al-Rahman II and Muhammad I. The city was then importing books, instruments and ideas from Baghdad, and he became one of its main channels for them.',
    work: [
      'The sources describe him as a man of practical cleverness. He built a water clock called al-Maqata and a ringed model of the heavens to show the motions of the planets. In his house he constructed a room in which visitors saw stars, clouds and lightning produced by hidden mechanisms. He worked out how to make colourless glass from local sand and stone, and how to cut rock crystal, which had previously been sent to Egypt for cutting.',
      'The flight is reported by the historian al-Maqqari, writing in the seventeenth century from earlier Andalusian chronicles, and is alluded to in a satirical verse by a poet of Ibn Firnas’s own time. He is said to have dressed in feathers, attached a pair of wings to his body and launched himself from a height, staying in the air for a considerable distance. He landed badly and hurt his back, because, the account says, he had not noticed that birds come down on their tails and had given himself none.',
    ],
    timeline: [
      ['c. 810', 'Born near Ronda in al-Andalus.'],
      ['c. 822–852', 'Active at the court of Abd al-Rahman II in Córdoba.'],
      ['c. 875', 'Makes his gliding attempt near Córdoba, in his sixties.'],
      ['887', 'Dies in Córdoba.'],
      ['c. 1630', 'Al-Maqqari records the flight in his history of al-Andalus.'],
      ['1976', 'A crater on the far side of the Moon is named Ibn Firnas.'],
      ['2011', 'The Abbas Ibn Firnas Bridge opens over the Guadalquivir in Córdoba.'],
    ],
    myths: [
      { myth: 'He made the first controlled flight in history.', fact: 'At most it was a short glide, known from a brief account written centuries later. It cannot be confirmed in detail, and there was no means of control. It is best described as one of the earliest recorded attempts.' },
      { myth: 'A man called Armen Firman jumped from a tower in Córdoba in 852.', fact: 'No reliable early source mentions such a person. “Armen Firman” is most likely a garbled Latin form of the name Ibn Firnas, and the two stories are probably one.' },
    ],
    legacy: 'Whatever exactly happened near Córdoba, the story shows a ninth-century inventor treating flight as an engineering problem and learning from a failure. Ibn Firnas has become a symbol of Andalusian science: an airport and a statue near Baghdad, a lunar crater and a bridge in Córdoba carry his name.',
    faqs: [
      { question: 'Did Abbas ibn Firnas really fly?', answer: 'Medieval sources say he glided for some distance with a winged apparatus and was injured on landing. The main account was written long afterwards, so historians treat it as plausible but unverifiable.' },
      { question: 'What did Abbas ibn Firnas invent?', answer: 'He is credited with a water clock, a mechanical model of the planets, a process for making clear glass and a technique for cutting rock crystal.' },
      { question: 'When did Abbas ibn Firnas live?', answer: 'From about 810 to 887, in the Umayyad emirate of Córdoba in al-Andalus, present-day Spain.' },
    ],
    related: ['/scientists/al-jazari', '/scientists/ibn-al-haytham', '/articles/how-instruments-changed-what-science-could-know', '/learn#golden-age'],
  },

  'ibn-al-baytar': {
    summary: 'Ibn al-Baytar (c. 1197–1248) was an Andalusian botanist and pharmacist whose encyclopedia of about 1,400 medicinal substances was the most complete of the Middle Ages.',
    earlyLife: 'Ibn al-Baytar was born near Málaga; his family name means “son of the veterinarian”. He studied in Seville with the botanist Abu al-Abbas al-Nabati, who insisted on examining plants in the field instead of relying on books, and the two collected specimens together around the city. About 1220 he left al-Andalus for good and crossed North Africa, stopping in Morocco, Algeria, Tunisia and Libya to study the local flora and talk with herbalists.',
    work: [
      'His main work, the Compendium on Simple Medicaments and Foods, is arranged alphabetically so that a physician could look up any substance. A typical entry gives the names in Arabic and other languages, quotes what Dioscorides, Galen, al-Razi, Ibn Sina and others said, and then adds Ibn al-Baytar’s own observations, corrections and doses. Of roughly 1,400 plants, minerals and animal products, several hundred had not appeared in the Greek sources.',
      'He was careful about identity. The same plant could have different names in different regions, and one name could be used for different plants, which was dangerous when medicines were involved. By giving synonyms in Greek, Persian, Amazigh and the Romance speech of al-Andalus, and by describing where each plant grew, he made the tradition usable across the whole Mediterranean. A second book, al-Mughni, arranges remedies by the part of the body they treat.',
    ],
    timeline: [
      ['c. 1197', 'Born in the region of Málaga.'],
      ['c. 1216', 'Studies botany in Seville with Abu al-Abbas al-Nabati.'],
      ['c. 1220', 'Leaves al-Andalus and travels across North Africa.'],
      ['c. 1224', 'Appointed chief herbalist in Egypt by the sultan al-Kamil.'],
      ['1227', 'Follows the Ayyubid court to Damascus and collects plants in Syria.'],
      ['c. 1240s', 'Completes the Compendium on Simple Medicaments and Foods.'],
      ['1248', 'Dies in Damascus.'],
    ],
    myths: [
      { myth: 'He simply copied Dioscorides.', fact: 'He quotes Dioscorides and about 150 other authors by name, compares them, corrects them and adds hundreds of substances and observations of his own. Careful citation was part of his method.' },
      { myth: 'He discovered a cure for cancer.', fact: 'He described a plant remedy, known as hindiba, as useful against tumours. Modern studies have examined related plants in the laboratory, but that is not the same as a proven treatment.' },
    ],
    legacy: 'The Compendium was the standard reference on drugs in the Islamic world for centuries and was translated into Latin, German and French. His pupil Ibn Abi Usaybia, the historian of medicine, left a vivid account of plant-collecting trips with him near Damascus. Historians of botany value the book for preserving plant names and local knowledge from Spain to Syria.',
    faqs: [
      { question: 'What is Ibn al-Baytar known for?', answer: 'For the Compendium on Simple Medicaments and Foods, a pharmacological encyclopedia describing about 1,400 substances, many of them recorded for the first time.' },
      { question: 'Did Ibn al-Baytar travel through Morocco?', answer: 'Yes. On leaving al-Andalus around 1220 he crossed Morocco and the rest of North Africa, studying plants and recording their Amazigh and Arabic names.' },
      { question: 'What is a “simple” in medieval medicine?', answer: 'A single medicinal substance, such as one plant or mineral, as opposed to a compound remedy mixed from several ingredients.' },
    ],
    related: ['/scientists/al-razi', '/scientists/ibn-sina', '/scientists/al-zahrawi', '/articles/the-evolution-of-modern-medicine'],
  },
};
