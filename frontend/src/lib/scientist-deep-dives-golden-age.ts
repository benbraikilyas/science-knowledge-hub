import type { ScientistDeepDive } from './scientist-deep-dives';

// Deeper profile sections for scholars of the Islamic Golden Age, written for ScienceHub.
// Medieval dates and attributions stay cautious where the sources are thin or disputed.
export const GOLDEN_AGE_DEEP_DIVES: Record<string, ScientistDeepDive> = {
  'al-khwarizmi': {
    summary: 'Al-Khwarizmi (c. 780–c. 850) wrote the book that gave algebra its name, spread Indian decimal numerals, and lent his name to the word algorithm.',
    earlyLife: 'Muhammad ibn Musa al-Khwarizmi’s name points to Khwarazm, a region around the Amu Darya delta in today’s Uzbekistan and Turkmenistan, though little is known of his early life. He worked in Baghdad at the House of Wisdom, the library and research centre supported by the Abbasid caliph al-Ma’mun, where scholars translated and extended Greek, Persian and Indian science.',
    work: [
      'His book on calculation by completion and balancing, written around 820, teaches how to solve linear and quadratic equations through general rules rather than one-off tricks. “Completion” (al-jabr) moves subtracted terms to the other side of an equation; “balancing” (al-muqabala) cancels equal terms on both sides. He wrote everything in words, with geometric proofs, and applied the methods to inheritance, trade and land measurement.',
      'A second work explained the Indian decimal place-value system with zero. Its Latin translation began “Dixit Algorizmi” (“so said al-Khwarizmi”), and Europeans came to call step-by-step calculation methods “algorisms”, later “algorithms”. He also compiled astronomical tables and a geography that listed the coordinates of cities and places.',
    ],
    timeline: [
      ['c. 780', 'Born, probably in Khwarazm or to a family from there.'],
      ['813–833', 'Works in Baghdad during the reign of the caliph al-Ma’mun.'],
      ['c. 820', 'Writes his book on algebra, al-jabr wa’l-muqabala.'],
      ['9th century', 'Writes on Indian numerals, astronomical tables and geography.'],
      ['c. 850', 'Dies, probably in Baghdad.'],
      ['1145', 'Robert of Chester translates his algebra into Latin.'],
    ],
    myths: [
      { myth: 'Al-Khwarizmi invented algebra from nothing.', fact: 'Babylonian, Greek and Indian mathematicians solved equations long before him. His achievement was a systematic, general treatment that made algebra a subject of its own.' },
      { myth: 'He invented the numbers we use.', fact: 'The decimal system with zero came from India. His book helped spread it in the Arabic-speaking world and, through Latin translations, to Europe.' },
    ],
    legacy: 'Two words in every computer science course, algebra and algorithm, come from his book and his name. His habit of stating general procedures that anyone can follow is exactly what an algorithm is. A crater on the far side of the Moon is named after him.',
    faqs: [
      { question: 'Why is al-Khwarizmi called the father of algebra?', answer: 'His book of about 820 treated equation-solving as a general method and gave the subject its name, from the Arabic al-jabr.' },
      { question: 'Where does the word algorithm come from?', answer: 'From the Latin form of al-Khwarizmi’s name, used in translations of his book on Indian numerals.' },
      { question: 'What was the House of Wisdom?', answer: 'A centre of learning in Abbasid Baghdad where scholars translated and extended Greek, Persian and Indian works in the 9th century.' },
    ],
    related: ['/scientists/al-biruni', '/scientists/ada-lovelace', '/articles/why-mathematical-proof-is-more-than-calculation', '/learn#golden-age'],
  },

  'ibn-al-haytham': {
    summary: 'Ibn al-Haytham (c. 965–c. 1040), or Alhazen, wrote the Book of Optics, explaining vision as light entering the eye and testing ideas by experiment.',
    earlyLife: 'Abu Ali al-Hasan ibn al-Haytham was born in Basra, in present-day Iraq, around 965, and later moved to Cairo under the Fatimid caliph al-Hakim. A well-known story says he was asked to regulate the Nile, realized the plan was impossible and pretended to be mad to escape the caliph’s anger, spending years confined at home where he wrote. The details may be legend, but Cairo is where much of his work was done.',
    work: [
      'Earlier thinkers argued over whether the eye sends out rays to objects or receives something from them. In the Book of Optics, written around 1011–1021, Ibn al-Haytham argued that we see because light travels from every point of an illuminated object into the eye. He backed this with geometry and with experiments using dark rooms, small apertures, screens and tubes to control the path of light.',
      'He studied reflection from flat and curved mirrors, refraction through water and glass, the camera obscura, and illusions such as the Moon looking larger near the horizon, which he explained as a matter of perception. He also wrote critical “Doubts” about Ptolemy, insisting that even great authorities be tested against evidence.',
    ],
    timeline: [
      ['c. 965', 'Born in Basra.'],
      ['Early 1000s', 'Moves to Cairo during the reign of the Fatimid caliph al-Hakim.'],
      ['c. 1011–1021', 'Writes the Book of Optics (Kitab al-Manazir).'],
      ['11th century', 'Writes Doubts Concerning Ptolemy and many works on mathematics and astronomy.'],
      ['c. 1040', 'Dies in Cairo.'],
      ['c. 1200', 'The Book of Optics is translated into Latin as De aspectibus.'],
    ],
    myths: [
      { myth: 'He invented the scientific method on his own.', fact: 'Experimental reasoning has a long history. He stands out for combining mathematics, controlled experiments and criticism of authorities in an unusually systematic way.' },
      { myth: 'He invented the camera.', fact: 'He studied and explained the camera obscura, which earlier writers had described. Photography came eight centuries later.' },
    ],
    legacy: 'Through Latin translations his optics shaped the work of Roger Bacon, Witelo and Johannes Kepler. His practice of testing claims with controlled arrangements is why historians of science give him a central place. UNESCO’s International Year of Light in 2015 marked a thousand years since his Book of Optics.',
    faqs: [
      { question: 'What is Ibn al-Haytham known for?', answer: 'For the Book of Optics, which explained vision as light entering the eye and studied reflection, refraction and the camera obscura through experiments.' },
      { question: 'Is Ibn al-Haytham the father of optics?', answer: 'He is often called that. Optics existed before him, but his Book of Optics transformed the field and influenced European science for centuries.' },
      { question: 'What is Ibn al-Haytham’s Latin name?', answer: 'Alhazen, also spelled Alhacen.' },
    ],
    related: ['/articles/opticks-treatise-of-light-colour', '/articles/how-instruments-changed-what-science-could-know', '/scientists/isaac-newton', '/learn#golden-age'],
  },

  'ibn-sina': {
    summary: 'Ibn Sina (c. 980–1037), known in Latin as Avicenna, wrote the Canon of Medicine, a standard medical textbook for centuries, and major works of philosophy.',
    earlyLife: 'Abu Ali al-Husayn ibn Sina was born in Afshana, near Bukhara in today’s Uzbekistan, then part of the Samanid state. By his own account he had memorized the Quran by ten and studied logic, mathematics and medicine as a teenager, treating patients by 16. After helping to cure the Samanid ruler he gained access to the royal library. Political upheaval later kept him moving between Persian courts, where he worked as a physician and at times as a vizier.',
    work: [
      'The Canon of Medicine (al-Qanun fi al-Tibb), completed around 1025, organizes medical knowledge into five books: general principles, simple drugs, diseases by part of the body, conditions affecting the whole body, and compound remedies. It combines Greek medicine, especially Galen, with Persian and Arabic practice and his own observations, and stresses diagnosis from symptoms, pulse and urine.',
      'The Canon recognized that some diseases spread by contagion and set out rules for testing drugs, such as trying a remedy on a simple, uncomplicated condition and checking that its effect is consistent. His philosophical encyclopedia, The Book of Healing, covers logic, natural science, mathematics and metaphysics, and includes his “floating man” thought experiment about self-awareness.',
    ],
    timeline: [
      ['c. 980', 'Born in Afshana, near Bukhara.'],
      ['c. 997', 'Treats the Samanid ruler and gains access to his library.'],
      ['c. 1020s', 'Writes The Book of Healing, his philosophical encyclopedia.'],
      ['c. 1025', 'Completes the Canon of Medicine.'],
      ['1037', 'Dies in Hamadan, in present-day Iran.'],
      ['12th century', 'Gerard of Cremona translates the Canon into Latin.'],
    ],
    myths: [
      { myth: 'The Canon is modern medicine.', fact: 'It relies on humoral theory and includes treatments later abandoned. Its value lies in how it organized knowledge and taught clinical reasoning.' },
      { myth: 'Ibn Sina was only a doctor.', fact: 'He was equally influential as a philosopher. Thinkers such as Thomas Aquinas engaged with his ideas on existence and essence.' },
    ],
    legacy: 'The Canon was taught in European universities into the 17th century and remained in use in parts of the Islamic world even longer. His philosophy shaped debates in both Islamic and Christian thought, and his mausoleum in Hamadan is a national monument in Iran.',
    faqs: [
      { question: 'What is Ibn Sina famous for?', answer: 'For the Canon of Medicine, a medical encyclopedia used for centuries in the Islamic world and Europe, and for his philosophy, especially The Book of Healing.' },
      { question: 'What is Ibn Sina’s Latin name?', answer: 'Avicenna.' },
      { question: 'What is the Canon of Medicine?', answer: 'A five-book medical encyclopedia completed around 1025 that organizes anatomy, diseases, drugs and treatments, and became a standard textbook.' },
    ],
    related: ['/scientists/al-razi', '/scientists/ibn-al-nafis', '/scientists/al-biruni', '/articles/the-evolution-of-modern-medicine'],
  },

  'al-zahrawi': {
    summary: 'Al-Zahrawi (c. 936–1013), known in Latin as Albucasis, was a surgeon in al-Andalus whose illustrated surgical treatise shaped surgery in Europe for centuries.',
    earlyLife: 'Abu al-Qasim Khalaf ibn al-Abbas al-Zahrawi was born near Córdoba, in al-Andalus, probably in the palace city of Madinat al-Zahra, which gave him his name. He lived during the Umayyad caliphate of Córdoba, when the city was one of the largest and most learned in Europe, and spent his life practising medicine there.',
    work: [
      'His encyclopedia, the Kitab al-Tasrif, has 30 parts covering medicine, pharmacology and diet. Its final part, on surgery, made his reputation. It describes operations for wounds, fractures, dislocations, bladder stones, eye conditions and childbirth, and gives practical advice on cautery, controlling bleeding and when not to operate.',
      'What made the surgical book unusual was its drawings of instruments, around 200 of them, including scalpels, hooks, forceps and specula, some of which he designed himself. He described using catgut for internal stitches and wrote clear instructions so that other surgeons could reproduce his methods.',
    ],
    timeline: [
      ['c. 936', 'Born near Córdoba, probably at Madinat al-Zahra.'],
      ['c. 1000', 'Completes the Kitab al-Tasrif, a 30-part medical encyclopedia.'],
      ['1013', 'Dies in Córdoba.'],
      ['12th century', 'Gerard of Cremona translates the surgical part into Latin.'],
      ['15th–16th centuries', 'Printed Latin editions keep his surgery in use across Europe.'],
    ],
    myths: [
      { myth: 'Medieval surgery was mostly guesswork.', fact: 'Al-Zahrawi’s treatise gives detailed indications, instruments and warnings, and stresses knowing anatomy before operating.' },
      { myth: 'He invented every instrument he drew.', fact: 'Many tools existed before him. He documented them precisely and added some designs of his own.' },
    ],
    legacy: 'Translated into Latin, his surgical text was used by European surgeons for centuries; the 14th-century French surgeon Guy de Chauliac quoted him extensively. Modern operating rooms, including robot-assisted ones, still depend on the principle he stressed: careful preparation and the right instrument for each step.',
    faqs: [
      { question: 'What is al-Zahrawi known for?', answer: 'For the surgical part of his encyclopedia, the Kitab al-Tasrif, which described operations and illustrated around 200 surgical instruments.' },
      { question: 'Why is al-Zahrawi called the father of surgery?', answer: 'Because his illustrated surgical treatise was the most influential of the Middle Ages and was used in Europe for centuries.' },
      { question: 'What is al-Zahrawi’s Latin name?', answer: 'Albucasis, from Abu al-Qasim.' },
    ],
    related: ['/scientists/al-razi', '/scientists/ibn-sina', '/articles/srt-h-autonomous-gallbladder-surgery-2025', '/articles/the-evolution-of-modern-medicine'],
  },

  'al-biruni': {
    summary: 'Al-Biruni (973–c. 1050) measured the Earth’s radius from a mountaintop, studied India’s sciences and cultures in depth, and wrote major works on astronomy.',
    earlyLife: 'Abu Rayhan al-Biruni was born in Khwarazm, in today’s Uzbekistan; his name refers to the outskirts (birun) of the city of Kath. He studied astronomy and mathematics young, and in his twenties exchanged a famous series of questions and answers with Ibn Sina about physics and astronomy. From 1017 he served the Ghaznavid ruler Mahmud of Ghazni and travelled with him into the Indian subcontinent.',
    work: [
      'To measure the Earth, al-Biruni first found the height of a mountain near Nandana, in present-day Pakistan. From its top he measured how far the horizon dipped below the horizontal. Simple trigonometry then gave the Earth’s radius, and his result was close to the modern value.',
      'His book on India, written around 1030, describes Indian astronomy, mathematics, religion and customs, based on Sanskrit sources he learned to read. In astronomy his Mas’udi Canon reviewed planetary theory and mathematical methods, and he discussed whether the Earth rotates, concluding that the observations then available could not settle the question.',
    ],
    timeline: [
      ['973', 'Born in Khwarazm on 4 September.'],
      ['c. 997', 'Exchanges questions with Ibn Sina on physics and astronomy.'],
      ['c. 1000', 'Writes The Remaining Signs of Past Centuries, a study of calendars and chronology.'],
      ['1017', 'Joins the court of Mahmud of Ghazni.'],
      ['c. 1030', 'Completes his book on India.'],
      ['c. 1050', 'Dies, probably in Ghazni.'],
    ],
    myths: [
      { myth: 'Medieval scholars thought the Earth was flat.', fact: 'Educated scholars of the period, including al-Biruni, took a spherical Earth for granted and set out to measure it.' },
      { myth: 'Al-Biruni was only an astronomer.', fact: 'He also wrote on mineralogy, pharmacology, geography, history and comparative religion, and his study of India is still read by historians.' },
    ],
    legacy: 'Al-Biruni’s insistence on sources, measurement and fair description of other cultures makes him a model of careful scholarship. His book on India remains a key source on 11th-century South Asia, and his Earth measurement is a classic example of using geometry to reach beyond direct observation.',
    faqs: [
      { question: 'How did al-Biruni measure the Earth?', answer: 'He measured a mountain’s height, then the dip of the horizon seen from its summit, and used trigonometry to calculate the Earth’s radius.' },
      { question: 'What did al-Biruni write about India?', answer: 'A detailed study, written around 1030, of Indian sciences, religion, philosophy and customs, based on Sanskrit texts he learned to read.' },
      { question: 'Did al-Biruni and Ibn Sina know each other?', answer: 'They exchanged a series of written questions and answers on physics and astronomy around 997 and disagreed sharply on several points.' },
    ],
    related: ['/scientists/al-khwarizmi', '/scientists/ibn-sina', '/articles/a-short-history-of-astronomy', '/learn#golden-age'],
  },

  'jabir-ibn-hayyan': {
    summary: 'Jabir ibn Hayyan (c. 721–c. 815) is the name behind a vast body of Arabic alchemical writings describing laboratory methods that fed into chemistry.',
    earlyLife: 'Tradition places Jabir in the 8th century, connects him with Kufa in Iraq, and calls him a student of the scholar Ja’far al-Sadiq. Almost nothing about his life can be confirmed, and some historians doubt that he existed as a single person. What survives is the Jabirian corpus, hundreds of treatises attributed to him.',
    work: [
      'Historians including Paul Kraus have shown that much of the corpus was written by several authors in the 9th and 10th centuries. It still matters for chemistry: the texts classify substances such as metals and “spirits” that vaporize, and describe operations like distillation, sublimation, crystallization and calcination in practical detail.',
      'The corpus also presents a “science of the balance”, an attempt to explain substances by numerical proportions of qualities such as hot, cold, dry and moist. The theory was wrong, but the drive to classify, quantify and repeat laboratory procedures helped move alchemy toward experimental chemistry.',
    ],
    timeline: [
      ['c. 721', 'Traditional date of birth.'],
      ['8th century', 'Associated with Kufa and with the scholar Ja’far al-Sadiq.'],
      ['9th–10th centuries', 'Most of the Jabirian corpus is probably written by later authors.'],
      ['c. 815', 'Traditional date of death.'],
      ['13th century', 'Latin works under the name “Geber” appear in Europe, a separate and later body of texts.'],
      ['1940s', 'Paul Kraus publishes his critical study of the corpus.'],
    ],
    myths: [
      { myth: 'Jabir wrote all the books under his name.', fact: 'The corpus is too large and varied for one 8th-century author. Most scholars see it as the work of a school writing over generations.' },
      { myth: 'The Latin “Geber” is the same author.', fact: 'The influential Latin Geber texts on metals were most likely written in Europe around the 13th century and borrowed the famous name.' },
    ],
    legacy: 'Words such as alkali and elixir reached European languages through Arabic alchemy, and laboratory techniques described in the corpus fed into later chemistry. The old dream of turning one element into another was finally achieved by nuclear physics: at the Large Hadron Collider, physicists have measured lead nuclei briefly becoming gold.',
    faqs: [
      { question: 'Who was Jabir ibn Hayyan?', answer: 'An 8th-century figure, traditionally from Kufa, to whom hundreds of alchemical works are attributed. Many were written later by several authors.' },
      { question: 'What did Jabir ibn Hayyan contribute to chemistry?', answer: 'The works under his name classify substances and describe laboratory methods such as distillation and crystallization in practical detail.' },
      { question: 'Is Jabir the same as Geber?', answer: 'Geber is the Latin form of his name, but the famous Latin Geber texts were most likely written in Europe around the 13th century.' },
    ],
    related: ['/scientists/al-razi', '/articles/alice-lead-to-gold-lhc-nuclear-transmutation-2025', '/articles/the-chemical-history-of-a-candle', '/learn#golden-age'],
  },

  'al-jazari': {
    summary: 'Al-Jazari (1136–1206) wrote the Book of Knowledge of Ingenious Mechanical Devices, with detailed designs for automata, water clocks and water-raising machines.',
    earlyLife: 'Ismail ibn al-Razzaz al-Jazari came from the Jazira, the upper Mesopotamian region between the Tigris and Euphrates, which gave him his name. He served for about 25 years as chief engineer to the Artuqid rulers of Diyarbakır, in today’s south-eastern Turkey, following his father in that profession.',
    work: [
      'His book, completed in 1206, describes 50 devices in six categories, from water clocks and drinking vessels to fountains, water-raising machines and automata. For each he explains construction step by step, with drawings, so that others could build them. Unlike many earlier writers, he focused on how to make a working device, not just on the idea behind it.',
      'Among the machines are water-raising devices that turn the rotation of a wheel into back-and-forth pumping strokes, the elaborate Elephant Clock, and programmable automata, including a musical boat whose drummer could play different rhythms when pegs on a rotating drum were moved.',
    ],
    timeline: [
      ['1136', 'Born in the Jazira region of upper Mesopotamia.'],
      ['c. 1180s', 'Becomes chief engineer at the Artuqid court in Diyarbakır.'],
      ['1206', 'Completes the Book of Knowledge of Ingenious Mechanical Devices.'],
      ['1206', 'Dies, probably in Diyarbakır.'],
      ['1974', 'Donald Hill publishes the first full English translation.'],
    ],
    myths: [
      { myth: 'Al-Jazari built the first robot.', fact: 'Automata existed in ancient Greece and China. His stand out for their detailed, reproducible designs and programmable features, which is why roboticists cite him today.' },
      { myth: 'His machines were only toys.', fact: 'Alongside entertainment devices he designed water-raising machines for irrigation and water supply.' },
    ],
    legacy: 'Al-Jazari’s precise construction notes make him an early model of the engineering handbook. Historians of technology study his gears, valves and control mechanisms, and robotics histories often cite his automata as early programmable machines. A large replica of the Elephant Clock stands in Dubai’s Ibn Battuta Mall.',
    faqs: [
      { question: 'What did al-Jazari invent?', answer: 'He designed water clocks, automata, fountains and water-raising machines, described in his Book of Knowledge of Ingenious Mechanical Devices (1206).' },
      { question: 'Is al-Jazari the father of robotics?', answer: 'He is often called that because of his programmable automata. Automata existed earlier, but his designs were unusually detailed and reproducible.' },
      { question: 'What is the Elephant Clock?', answer: 'A water clock by al-Jazari that combined an elephant figure with mechanisms that marked the passing hours with moving figures and sounds.' },
    ],
    related: ['/categories/robotics', '/articles/boston-dynamics-product-atlas-industrial-robot-2026', '/articles/figure-helix-02-full-body-autonomy-2026', '/learn#golden-age'],
  },

  'ibn-al-nafis': {
    summary: 'Ibn al-Nafis (1213–1288) was the first known to describe pulmonary circulation, explaining that blood passes through the lungs between the heart’s chambers.',
    earlyLife: 'Ala al-Din Ali ibn Abi al-Hazm al-Qurashi, known as Ibn al-Nafis, was born near Damascus and studied medicine at the Nuri hospital there. He moved to Cairo, where he practised and taught at major hospitals and became chief physician. He also wrote on law, theology and logic, and left his house and library to the Mansuri hospital in Cairo.',
    work: [
      'Galen taught that blood passes from the right side of the heart to the left through invisible pores in the wall between the ventricles. In his Commentary on Anatomy in Avicenna’s Canon, Ibn al-Nafis rejected this: the wall is thick and has no visible passages. Instead, he wrote, blood from the right ventricle must travel to the lungs, mix with air there, and return to the left ventricle.',
      'This is the pulmonary circulation, the circuit of blood through the lungs. He also argued that the heart muscle is nourished by its own vessels rather than by the blood inside its chambers. In Europe, Michael Servetus described pulmonary circulation in 1553 and William Harvey described the full circulation in 1628; historians still debate whether Ibn al-Nafis’s work reached them.',
    ],
    timeline: [
      ['1213', 'Born near Damascus.'],
      ['1236', 'Moves to Cairo.'],
      ['c. 1240s', 'Writes his Commentary on Anatomy in Avicenna’s Canon, describing pulmonary circulation.'],
      ['1288', 'Dies in Cairo, leaving his library to the Mansuri hospital.'],
      ['1924', 'Egyptian physician Muhyi al-Din al-Tatawi brings the discovery to modern attention from a manuscript in Berlin.'],
    ],
    myths: [
      { myth: 'William Harvey was the first to describe how blood moves through the lungs.', fact: 'Ibn al-Nafis described pulmonary circulation in the 13th century, about 300 years before Servetus and nearly 400 before Harvey’s full account.' },
      { myth: 'He discovered the whole circulatory system.', fact: 'He described the lung circuit and the heart’s own blood supply. Circulation through the whole body was demonstrated by Harvey.' },
    ],
    legacy: 'Ibn al-Nafis shows a medieval physician challenging even Galen when anatomy demanded it. Since al-Tatawi’s 1924 thesis he has taken his place in histories of medicine, and hospitals and medical schools across the Arab world carry his name.',
    faqs: [
      { question: 'What did Ibn al-Nafis discover?', answer: 'Pulmonary circulation: blood flows from the right ventricle to the lungs and back to the left ventricle, rather than through pores in the heart wall.' },
      { question: 'When did Ibn al-Nafis describe pulmonary circulation?', answer: 'In the 13th century, in his Commentary on Anatomy in Avicenna’s Canon.' },
      { question: 'How was his discovery rediscovered?', answer: 'In 1924 the Egyptian physician Muhyi al-Din al-Tatawi described it in a doctoral thesis based on a manuscript in Berlin.' },
    ],
    related: ['/scientists/ibn-sina', '/scientists/al-razi', '/articles/the-evolution-of-modern-medicine', '/learn#golden-age'],
  },

  'al-kindi': {
    summary: 'Al-Kindi (c. 801–c. 873), called the “philosopher of the Arabs”, wrote the earliest known description of frequency analysis for breaking codes.',
    earlyLife: 'Abu Yusuf Ya’qub ibn Ishaq al-Kindi was born in Kufa, in Iraq, into the Arab tribe of Kinda; his father was a governor of Kufa. He studied in Basra and Baghdad and worked at the House of Wisdom under the Abbasid caliphs al-Ma’mun and al-Mu’tasim, where he oversaw translations of Greek philosophy and science and tutored members of the caliph’s family.',
    work: [
      'In a treatise on deciphering cryptographic messages, al-Kindi explained how to break a substitution cipher by counting letters. In any language some letters appear far more often than others. Count the symbols in a long enough secret message, match the most frequent ones to the most frequent letters of the language, and the hidden text starts to appear. This frequency analysis remained the main tool of codebreakers for centuries.',
      'He wrote hundreds of works on philosophy, mathematics, optics, music, medicine and astronomy. He argued that Greek philosophy and Islamic thought could support each other, and in optics he studied how light travels in straight lines. His treatise on cryptography was rediscovered in 1987 in the Süleymaniye Library in Istanbul.',
    ],
    timeline: [
      ['c. 801', 'Born in Kufa.'],
      ['c. 830s', 'Works at the House of Wisdom in Baghdad.'],
      ['9th century', 'Writes his treatise on deciphering cryptographic messages.'],
      ['c. 873', 'Dies in Baghdad.'],
      ['1987', 'His cryptography treatise is found in an Istanbul library.'],
    ],
    myths: [
      { myth: 'Frequency analysis was invented in Renaissance Europe.', fact: 'Al-Kindi described it in the 9th century, centuries before European codebreakers used it.' },
      { myth: 'Al-Kindi was mainly a translator.', fact: 'He supervised translations, but he was also an original philosopher and mathematician with a large body of his own writing.' },
    ],
    legacy: 'Frequency analysis broke many historical ciphers, and the statistical thinking behind it is still basic to cryptanalysis. Al-Kindi’s effort to combine Greek philosophy with Islamic thought began a tradition continued by al-Farabi and Ibn Sina.',
    faqs: [
      { question: 'What is al-Kindi known for?', answer: 'For describing frequency analysis to break codes, and for being one of the first major philosophers writing in Arabic.' },
      { question: 'What is frequency analysis?', answer: 'A codebreaking method that counts how often each symbol appears in a secret message and matches the counts to the usual letter frequencies of a language.' },
      { question: 'Why is al-Kindi called the philosopher of the Arabs?', answer: 'He was among the first scholars to write philosophy in Arabic and to bring Greek philosophy into Islamic thought.' },
    ],
    related: ['/scientists/claude-shannon', '/scientists/alan-turing', '/scientists/al-khwarizmi', '/learn#golden-age'],
  },

  'al-razi': {
    summary: 'Al-Razi (c. 865–c. 925), known as Rhazes, ran hospitals, first clearly distinguished smallpox from measles and advanced practical chemistry.',
    earlyLife: 'Abu Bakr Muhammad ibn Zakariya al-Razi was born in Rayy, near today’s Tehran. Accounts say he studied music, philosophy and alchemy before turning to medicine, possibly in his thirties. He directed the hospital in Rayy and later a hospital in Baghdad, where he taught many students.',
    work: [
      'In his treatise on smallpox and measles, al-Razi described the two diseases in detail and explained how to tell them apart, the earliest known clear clinical distinction between them. His huge clinical notebook, al-Hawi, compiled after his death by his students, records case histories and his own observations alongside earlier authorities, and in a separate book he set out his doubts about Galen where his experience disagreed.',
      'In chemistry, his Book of Secrets classifies substances into groups such as minerals and plant and animal products, and describes apparatus and procedures for distilling, calcining, dissolving and crystallizing. He concentrated on these practical steps rather than the mystical side of alchemy, which made his work useful to later chemists.',
    ],
    timeline: [
      ['c. 865', 'Born in Rayy, Persia.'],
      ['Late 800s', 'Directs the hospital in Rayy and later one in Baghdad.'],
      ['Early 900s', 'Writes on smallpox and measles and on his doubts about Galen.'],
      ['c. 925', 'Dies in Rayy.'],
      ['1279', 'Al-Hawi is translated into Latin as the Continens.'],
    ],
    myths: [
      { myth: 'Al-Razi chose the Baghdad hospital site by hanging meat around the city.', fact: 'The famous story, in which he picked the place where meat rotted slowest, appears in sources written much later and cannot be confirmed.' },
      { myth: 'Medieval physicians simply repeated ancient authorities.', fact: 'Al-Razi kept detailed case notes, recorded what happened to his patients and openly questioned Galen when the evidence did not fit.' },
    ],
    legacy: 'Al-Razi’s clinical approach, recording cases and testing claims against outcomes, is close in spirit to evidence-based medicine. His works were translated into Latin and printed in Europe, Iran celebrates a national Pharmacy Day in his honour, and the Razi Institute near Tehran produces vaccines and serums.',
    faqs: [
      { question: 'What is al-Razi known for?', answer: 'For his clinical medicine, including the first clear account distinguishing smallpox from measles, his clinical notebook al-Hawi, and his practical chemistry.' },
      { question: 'What is al-Razi’s Latin name?', answer: 'Rhazes.' },
      { question: 'What was al-Hawi?', answer: 'A vast collection of al-Razi’s clinical notes and reading, compiled after his death by his students and translated into Latin in 1279 as the Continens.' },
    ],
    related: ['/scientists/ibn-sina', '/scientists/jabir-ibn-hayyan', '/scientists/al-zahrawi', '/articles/the-evolution-of-modern-medicine'],
  },
};
