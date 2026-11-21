import { getNewsArticleImage } from './news-article';

// Evergreen explainers for the thinner categories (mathematics, history of science,
// scientific theories, scientific experiments), written for ScienceHub in November 2026.
// Every source is listed at the end of each article; uncertain history is flagged as such.

interface IdeasArticleInput {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: { id: string; name: string; slug: string; color: string; icon: string };
  tags: string[];
  readTime: number;
  publishedAt: string;
}

const mathematics = { id: '14', name: 'Mathematics', slug: 'mathematics', color: '#ffd60a', icon: '➗' };
const history = { id: '11', name: 'History of Science', slug: 'history-of-science', color: '#fbbf24', icon: '📜' };
const theories = { id: '6', name: 'Scientific Theories', slug: 'scientific-theories', color: '#34d399', icon: '📐' };
const experiments = { id: '7', name: 'Scientific Experiments', slug: 'scientific-experiments', color: '#fb7185', icon: '🧪' };

const makeArticle = (article: IdeasArticleInput) => ({
  ...article,
  featuredImage: getNewsArticleImage(article.category.slug, undefined, article.id),
  thumbnail: getNewsArticleImage(article.category.slug, undefined, article.id),
  author: { id: 'sciencehub-editorial-team', displayName: 'ScienceHub Editorial Team' },
  isPublished: true,
  isFeatured: false,
  viewsCount: 0,
  likesCount: 0,
  metaTitle: article.title,
  metaDescription: article.excerpt,
  createdAt: article.publishedAt,
  updatedAt: article.publishedAt,
});

export const IDEAS_EDITORIAL_ARTICLES = [
  makeArticle({
    id: 'editorial-riemann-hypothesis-claim-2026',
    title: 'Has the Riemann Hypothesis Been Proved? What We Know About the 2026 Claim',
    slug: 'has-the-riemann-hypothesis-been-proved-claude-lean-2026',
    excerpt:
      'On November 20, 2026, mathematician Levent Alpöge said he and the AI system Claude had proved the Riemann hypothesis, releasing the proof as Lean code. What is claimed, what has been checked, and why it matters.',
    category: mathematics,
    tags: ['Riemann Hypothesis', 'Prime Numbers', 'Zeta Function', 'AI in Mathematics', 'Lean', 'Number Theory', 'Millennium Prize Problems'],
    readTime: 9,
    publishedAt: '2026-11-21T18:00:00Z',
    content: `## Has the Riemann hypothesis been proved?

Not yet, at least not in the way mathematicians use the word: on November 20, 2026, Anthropic mathematician Levent Alpöge announced that he and the AI system Claude had found a proof, and released it as computer-checkable Lean code, but as of November 21 no one has confirmed the full argument, and checking it properly could take months.

Every few years someone announces a proof of the Riemann hypothesis, and mathematicians quietly go back to work. This time the reaction was different. Within a day, specialists had downloaded the code, compiled it and started arguing about details on public forums, and one of the most respected number theorists alive said he suspects it will turn out to be correct. That is unusual enough to be worth slowing down for, so here is what is actually known, kept separate from what is hoped.

| Question | Status as of November 21, 2026 |
| --- | --- |
| What is claimed? | A proof of the Riemann hypothesis, and of the Generalized Riemann Hypothesis |
| How was it released? | A four-page note plus Lean code split into 14 archive files |
| Is there a human-readable proof? | Not yet; an AI-written informal version reportedly passed 250,000 pages and was not posted |
| Does the code run? | Yes, according to MIT’s Andrew Sutherland and others who compiled it |
| Does the code state exactly the right theorem? | That check was still under way |
| Peer review | None so far |
| Clay Millennium Prize | Not eligible yet: it requires journal publication and two years of acceptance |

## What is the Riemann hypothesis, in plain words?

The Riemann hypothesis is a prediction, made by the German mathematician Bernhard Riemann in 1859, that all the "nontrivial zeros" of a function called the zeta function lie on one straight line, and it matters because those zeros control how the prime numbers are spread out.

The zeta function starts innocently, as an infinite sum:

$$ ζ(s) = 1 + 1/2ˢ + 1/3ˢ + 1/4ˢ + … $$

Put s = 2 and you get 1 + 1/4 + 1/9 + 1/16 + …, which Leonhard Euler showed in the 1730s adds up to exactly π²/6, about 1.6449. Euler also found the link to primes: the same sum can be rewritten as a product with one factor for every prime number, so anything you learn about zeta tells you something about primes.

$$ ζ(s) = 1/(1 − 2⁻ˢ) × 1/(1 − 3⁻ˢ) × 1/(1 − 5⁻ˢ) × … $$

Riemann’s leap, in a paper only eight pages long, was to let s be a complex number, with a real part and an imaginary part. The function then has some easy zeros at −2, −4, −6 and so on, and infinitely many harder ones in a narrow strip. Riemann suspected that every one of the hard ones has real part exactly ½, so they all sit on a single vertical line, now called the critical line. The first one sits at ½ + 14.1347i. Computers have since checked more than ten trillion of them, and every single one is on the line. But ten trillion is not all of them, and in mathematics only all of them counts.

![Portrait photograph of Bernhard Riemann, a bearded man in a dark coat](/images/articles/bernhard-riemann-portrait.webp "Bernhard Riemann (1826 to 1866), whose eight-page paper of 1859 posed the problem.")

## Why do prime numbers care about zeta zeros?

The zeros work a little like the notes in a chord: together they decide how far the real count of primes drifts away from its smooth average, and the Riemann hypothesis says that drift is as small as it could possibly be.

Primes look random up close, but they thin out in a very regular way. The prime number theorem, proved in 1896, says the number of primes up to x is roughly x divided by the natural logarithm of x. A sharper estimate, the logarithmic integral Li(x), does even better. Here is how they compare:

| Up to x | Actual number of primes | x / ln x | Li(x) |
| --- | --- | --- | --- |
| 10 | 4 | 4.3 | 5.1 |
| 100 | 25 | 21.7 | 29.1 |
| 1,000 | 168 | 144.8 | 176.6 |
| 1,000,000 | 78,498 | 72,382 | about 78,628 |

Li(x) is impressively close, but how close will it stay as x grows? That is exactly what the zeros decide. If the Riemann hypothesis is true, the mathematician Lowell Schoenfeld showed in 1976 that the gap obeys a tight bound for every x of at least 2,657:

$$ |π(x) − Li(x)| < √x × ln x / (8π) $$

Here π(x) is the traditional symbol for the number of primes up to x, while the π on the right is the familiar 3.14159. For x of one million, the right-hand side is about 550, and the true gap is only about 130. Without the hypothesis, nobody can promise anything nearly that good. That is why so many results in number theory begin with the words "assuming the Riemann hypothesis": hundreds of theorems are waiting on it.

![Plot of the size of the zeta function along the critical line, dipping to zero again and again](/images/articles/riemann-zeta-critical-line-zeros-plot.webp "The size of the zeta function along the critical line. Each point where the curve touches zero is one of the nontrivial zeros.")

## What exactly did Alpöge and Claude claim?

In a four-page note posted on his website on November 20, Alpöge wrote that he believes he has, working with Claude, discovered a proof of the Riemann hypothesis, and that the method "easily extends much further", to the Generalized Riemann Hypothesis, with the Extended Riemann Hypothesis expected "with more time".

The note is unusually personal. Alpöge says the problem had been his private goal since his student days, and that "this time Claude far outpaced me near the finish line." His own contribution, he writes, was steering the work toward the right setting; after that, much of the technical machinery came from Claude, including in areas where he admits he has "little mastery". The strategy descends from Stepanov’s method, the technique behind a proof of the Riemann hypothesis for curves over finite fields, a simpler cousin of the real problem that was settled decades ago. The note’s own timeline runs from October 6, 2026 to November 16, the date it gives for the Generalized Riemann Hypothesis.

What he did not release is a normal paper. He writes that posting "some massive unreadable travesty" of AI-generated text would be inappropriate, so he published only the Lean code, and he mentions in a footnote that the informal write-up ran past 250,000 pages. He says he intends to understand the argument properly, write it up and talk about it, and that he expects much shorter proofs to follow.

## How can a computer check a proof that no one understands yet?

Lean is a proof assistant: every step of a proof written in it must follow from basic axioms by rules the software checks mechanically, so if the code compiles and its final statement really is the Riemann hypothesis, the proof is correct even before any human can follow its ideas.

That "if" carries a lot of weight, and it splits into two questions. The first is whether the code runs cleanly. Andrew Sutherland of MIT and others compiled it and reported that the Lean kernel accepted it using only the three standard axioms. "Honestly the chance that anything is fishy here is approximately zero," Sutherland said. The second question is whether the theorem stated at the end of all that code is genuinely the Riemann hypothesis, with no definitions quietly changed along the way. Kevin Buzzard of Imperial College London, who leads a long-running project to formalize the proof of Fermat’s Last Theorem in Lean, pointed out that this statement check, and a further check that the code exploits no bugs, were still pending.

Even if both checks pass, mathematicians will want more than a verdict. A proof is supposed to explain why something is true. "Somewhat frustratingly, it looks like it will require quite a lot of work to really gain this understanding," said Oxford’s James Maynard, a Fields Medal winner, who also said: "If this fully checks out, it is clearly a historic milestone in mathematics." Youness Lamzouri of the University of Lorraine said checking and understanding it could take "months or even years".

## Why are mathematicians still cautious?

Because the Riemann hypothesis has attracted many confident claims that later collapsed, and because a proof is only accepted once experts have checked it, understood it and published it.

Well-known mathematicians have announced proofs before, including Louis de Branges in manuscripts from the 2000s and Michael Atiyah in a 2018 lecture, and none was accepted. The current claim is different in one important way, the Lean code, but the process still has to run. It is also worth keeping two AI stories apart. In August 2026, Anthropic reported that a research version of Claude had raised the proven share of zeta zeros lying on the critical line from about 41.6 percent to roughly 67 percent, and said at the time that it did not expect those techniques to prove the full hypothesis. A share, however large, is not the same as all of them, which is what the new claim asserts.

Then there is the coincidence. On the same day, Stanford mathematician Ravi Vakil posted a draft proof of the Generalized Riemann Hypothesis by Alessandro Masullo, which Masullo describes as the product of 12 years of work, and which Vakil stressed is "all human, with no AI". That draft is written for human readers, is not formalized in Lean, and has not been checked either. Two independent claims on one day is extraordinary, and experts will need time with both.

## What happens next, and would it break internet encryption?

Next comes careful checking: the Lean statement, then human understanding, then a written proof, journal publication and, eventually, the Clay Mathematics Institute’s judgment; and no, a proof would not break the encryption that protects your bank account.

The Clay institute lists the Riemann hypothesis among its seven Millennium Prize Problems, each with a reward of one million US dollars, but its rules require a proof published in a qualifying journal and two years of general acceptance in the mathematics community, so nothing will happen quickly on that front. Meanwhile, a common worry is that solving the problem would expose the prime numbers behind modern cryptography. It would not. The hypothesis says the primes are spread out in a very regular way, which is what most mathematicians already believe and what cryptographers already assume. It does not hand anyone a fast way to factor large numbers into primes, which is what breaking that kind of encryption would require.

The bigger change may be in how mathematics gets done. If this proof survives, it will be the clearest sign yet that AI systems can contribute deep new ideas, not just check routine steps or search for examples, a direction we have followed in pieces such as [AlphaEvolve and AI-driven algorithm discovery](/articles/alphaevolve-ai-agent-algorithm-discovery-2025). It would also sharpen an old question about what a proof is for. A result that is certified by a computer but understood by no one would be true, but not yet knowledge in the full human sense. For more on that tension, see [why mathematical proof is more than calculation](/articles/why-mathematical-proof-is-more-than-calculation), and for a much older story about a number that changed mathematics, read [who invented zero](/articles/who-invented-zero-history-of-zero). We will update this article as the checks come in.

## References

- [Levent Alpöge: Remark (the four-page announcement, PDF)](https://alpo.ge/remark.pdf)
- [IBM Think: Anthropic mathematician claims AI helped solve a 167-year-old math mystery](https://www.ibm.com/think/news/anthropic-claude-riemann-hypothesis-math-proof)
- [MLQ.ai: Levent Alpöge posts a claimed proof of the Riemann hypothesis made with Claude](https://mlq.ai/news/anthropic-mathematician-levent-alpoge-posts-a-claimed-proof-of-the-riemann-hypothesis-made-with-claude/)
- [Science: AI may have solved math’s greatest mystery. Can humans understand the answer?](https://www.science.org/content/article/ai-may-have-solved-math-s-greatest-mystery-can-humans-understand-answer)
- [Clay Mathematics Institute: The Riemann hypothesis](https://www.claymath.org/millennium/riemann-hypothesis/)
- [MacTutor History of Mathematics: Bernhard Riemann biography](https://mathshistory.st-andrews.ac.uk/Biographies/Riemann/)
- [Lean theorem prover](https://lean-lang.org/)`,
  }),

  makeArticle({
    id: 'editorial-history-of-zero',
    title: 'Who Invented Zero? The Long, Strange History of Nothing',
    slug: 'who-invented-zero-history-of-zero',
    excerpt:
      'No single person invented zero. Babylonian scribes, Maya astronomers and Indian mathematicians all played a part, and Brahmagupta wrote the first rules for calculating with it in 628 AD.',
    category: mathematics,
    tags: ['History of Zero', 'Brahmagupta', 'Indian Mathematics', 'Number Systems', 'Al-Khwarizmi', 'Fibonacci', 'Place Value'],
    readTime: 8,
    publishedAt: '2026-11-20T16:00:00Z',
    content: `## Who invented zero?

No single person invented zero, but the Indian astronomer Brahmagupta comes closest: in 628 AD he wrote down the first known rules for treating zero as a number you can add, subtract and multiply.

That answer tends to surprise people, because zero feels too obvious to need inventing. Try this, though. Write the number two hundred and five without using a zero. The Romans wrote CCV, and they ran an empire, collected taxes and built aqueducts that way. What they could not do easily was calculate on paper, because their numerals had no idea of place, and no symbol that said "nothing in this column". Zero fixes both problems at once. How it did so is one of the better detective stories in mathematics, and it runs through Iraq, India, Central America, Baghdad and medieval Italy.

| Culture | Roughly when | What their zero did | Used as a number? |
| --- | --- | --- | --- |
| Babylonian | By about 300 BC | A placeholder sign between digits in base 60 | No |
| Greek astronomy (Ptolemy) | About 150 AD | A placeholder in astronomical tables | No |
| Maya | First millennium AD | A zero sign in calendar counts, in base 20 | Unclear |
| India | 3rd to 9th centuries AD | A dot, later a circle, in a decimal place-value system | Yes, with rules from 628 AD |
| Islamic world | From the 8th and 9th centuries | Adopted with Indian numerals and spread by al-Khwarizmi | Yes |
| Europe | From 1202 | Introduced in Fibonacci’s Liber Abaci | Yes |

## Why did people need a zero at all?

Zero first earned its keep as a placeholder: in a place-value system it marks an empty column, so that 205 cannot be confused with 25.

Here is what a place-value number really says:

$$ 205 = 2 × 10² + 0 × 10¹ + 5 × 10⁰ $$

That middle zero is doing honest work. It tells you there are no tens, and it pushes the 2 up into the hundreds column. Take it away and the number shrinks to 25, about eight times smaller.

The Babylonians hit this problem first. From around 2000 BC their scribes used a positional system in base 60, which is why we still have 60 minutes in an hour and 360 degrees in a circle. For many centuries, though, they simply left a gap where a column was empty, and a gap on a clay tablet is easy to miss. By about 300 BC some scribes were pressing a small double-wedge sign into those gaps. It was a placeholder and nothing more: they never put it at the end of a number, and nobody did arithmetic with it.

## Did the Maya invent zero too?

Yes, and they did it entirely on their own: Maya astronomers in Central America used a zero sign, often drawn as a shell, in their calendar counts, with no contact at all with Asia or Europe.

The Maya counted mostly in base 20, and their Long Count calendar needed a way to show an empty position in dates. That is the same placeholder problem the Babylonians had, solved independently on the other side of the world. Meanwhile in Alexandria, around 150 AD, the astronomer Ptolemy used a small circle with a bar over it in his tables of angles, sometimes even at the end of a number. Many people reached for something like zero. None of them, as far as we can tell, treated it as a number in its own right.

## Was zero invented in India?

Zero as we use it today, a symbol that holds an empty place and also counts as a number you can calculate with, took shape in India between roughly the 3rd and 7th centuries AD.

The evidence comes from three famous sources. The first is the Bakhshali manuscript, a set of birch-bark leaves dug up in 1881 near the village of Bakhshali, in what is now Pakistan, and kept today in Oxford’s Bodleian Library. It writes zero as a dot. In 2017, radiocarbon tests commissioned by the Bodleian dated some of its leaves to the 3rd or 4th century AD, which would make those dots the oldest surviving zero symbols. Be a little careful with that headline, though: other leaves came back as 8th or 10th century, and a group of historians argued in print that the oldest leaf cannot date the whole text.

The second is a stone inscription from Sambor, in Cambodia, that writes the year 605 of the Shaka calendar, which is 683 AD, with a dot for zero. The third is the best known: an inscription dated to 876 AD inside the Chaturbhuj Temple at Gwalior Fort, in central India, where the numbers 270 and 50 are written with a small circle that looks very much like our own 0.

![The rock-cut Chaturbhuj Temple at Gwalior Fort in India, a small carved stone shrine with pillars](/images/articles/gwalior-zero-inscription-876.webp "The Chaturbhuj Temple at Gwalior Fort, Madhya Pradesh. An inscription inside, dated 876 AD, contains one of the oldest dated written zeros.")

So what about the common search question, Aryabhata or Brahmagupta? Aryabhata, writing in 499 AD, worked with a decimal place-value system, but no symbol for zero appears in his surviving text. Brahmagupta is the one who sat down and wrote the rules.

## What rules did Brahmagupta give for zero?

In his book Brahmasphutasiddhanta, finished in 628 AD, Brahmagupta stated that adding or subtracting zero leaves a number unchanged, that any number multiplied by zero gives zero, and that a number minus itself is zero.

In modern notation, his core rules look like this:

$$ a + 0 = a,   a − 0 = a,   a × 0 = 0 $$

He wrote them in verse, and he also gave rules for negative numbers, which he described as debts, alongside positive numbers as fortunes. That is a remarkable leap for the 7th century. Where he slipped was division: he said that zero divided by zero is zero, and left a number divided by zero as a fraction with zero underneath. About five centuries later the Indian mathematician Bhaskara II suggested that dividing a number by zero gives something infinite.

Modern mathematics simply refuses to divide by zero, and the reason is short enough to fit in a sentence or two. Division undoes multiplication: 12 ÷ 3 = 4 because 4 × 3 = 12. So if 6 ÷ 0 had an answer, call it x, then x × 0 would have to equal 6.

$$ if 6 ÷ 0 = x, then x × 0 = 6 $$

But anything times zero is zero, so no such x exists. And 0 ÷ 0 fails the opposite way: every number times zero gives zero, so there is no single answer to choose.

## How did zero reach Europe?

Zero traveled west through the Islamic world: scholars in Baghdad adopted Indian numerals in the 8th and 9th centuries, al-Khwarizmi wrote a book on calculating with them around 825, and Fibonacci brought them to Europe in 1202.

[Al-Khwarizmi](/scientists/al-khwarizmi), who worked in the scholarly world of Abbasid Baghdad described in our article on the [House of Wisdom](/articles/house-of-wisdom-baghdad-history), wrote a short book explaining the Indian way of writing and calculating with numbers. The Arabic original is lost; it survives in Latin, under a title that begins "Algoritmi de numero Indorum". Our word algorithm comes from that Latin version of his name. The word zero has a similar trail: the Arabic sifr, meaning empty, became the Latin zephirum and then the Italian zero. English kept a second descendant, cipher.

The Italian merchant’s son Leonardo of Pisa, better known as Fibonacci, learned these numerals as a boy in Béjaïa, on the coast of present-day Algeria, where his father worked as a trade official. In 1202 he published Liber Abaci, which opens by introducing the nine Indian figures together with the sign 0, which in Arabic is called zephirum. Merchants were slow to give up their counting boards, but over the next few centuries the new numerals won, mostly because they make written arithmetic so much easier.

## Is zero even, and why does 0! equal 1?

Zero is an even number, because it can be divided by 2 with nothing left over; and zero factorial, written 0!, equals 1, because that is the only value that keeps the factorial rule consistent.

The factorial n! means multiplying all the whole numbers from n down to 1, so 4! = 4 × 3 × 2 × 1 = 24. Every factorial obeys a simple rule:

$$ n! = n × (n − 1)! $$

Put n = 1 into it and you get 1! = 1 × 0!. Since 1! is 1, 0! must be 1 as well. There is also a friendlier way to see it: n! counts the ways to line up n different objects, and there is exactly one way to arrange no objects at all. You do nothing.

## Why does zero matter today?

Zero sits underneath almost all modern mathematics and technology: place-value arithmetic, algebra, calculus, graphs and coordinates all depend on it, and every digital computer stores information as patterns of 0s and 1s.

In binary, the number system computers use, each place is a power of 2 instead of 10, and the zero carries the same job it did on that Babylonian tablet: marking an empty place. The number 5, for example, is written 101, meaning one four, no twos and one one. Without a symbol for nothing, none of that works.

It is worth pausing on how strange the idea is. For thousands of years, people counted sheep, coins and soldiers perfectly well without a number for none. Making "nothing" into a thing you can write down, add up and reason about took Babylonian scribes, Maya astronomers, Indian mathematicians, Baghdad translators and an Italian trader. For more of the people who shaped mathematics, see our profiles of [famous Muslim scientists](/scientists/muslim-scientists) and [Archimedes](/scientists/archimedes), or read [why mathematical proof is more than calculation](/articles/why-mathematical-proof-is-more-than-calculation).

## References

- [MacTutor History of Mathematics: A history of zero](https://mathshistory.st-andrews.ac.uk/HistTopics/Zero/)
- [MacTutor: Brahmagupta biography](https://mathshistory.st-andrews.ac.uk/Biographies/Brahmagupta/)
- [MacTutor: Al-Khwarizmi biography](https://mathshistory.st-andrews.ac.uk/Biographies/Al-Khwarizmi/)
- [MacTutor: Fibonacci biography](https://mathshistory.st-andrews.ac.uk/Biographies/Fibonacci/)
- [University of Oxford (Bodleian): Carbon dating of the Bakhshali manuscript (2017)](https://www.glam.ox.ac.uk/node/218481)
- [Archaeology magazine: New dates push back use of zero](https://www.archaeology.org/news/5916-170914-bakhshali-manuscript-dates)
- [History of Science in South Asia: A response to the Bakhshali dating claims (2017)](https://doaj.org/article/362904e31c7c466e910bb18389a6dcf6)`,
  }),

  makeArticle({
    id: 'editorial-house-of-wisdom',
    title: 'The House of Wisdom: What Really Happened in Abbasid Baghdad',
    slug: 'house-of-wisdom-baghdad-history',
    excerpt:
      'The House of Wisdom was the Abbasid caliphs’ library in Baghdad, at the center of a translation movement that carried Greek, Persian and Indian science into Arabic. What we know, and what is legend.',
    category: history,
    tags: ['House of Wisdom', 'Abbasid Caliphate', 'Islamic Golden Age', 'Baghdad', 'Translation Movement', 'Al-Khwarizmi', 'History of Science'],
    readTime: 8,
    publishedAt: '2026-11-20T15:30:00Z',
    content: `## What was the House of Wisdom?

The House of Wisdom, Bayt al-Hikma in Arabic, was a royal library in Baghdad that the Abbasid caliphs built up from the late 8th century, and under Caliph al-Ma’mun, who ruled from 813 to 833, it became a place for collecting, copying and translating books from the Greek, Persian and Indian worlds.

That is the careful version. The popular version, a grand university where the world’s greatest minds gathered under one roof, is more fun but harder to prove, and we will come back to it. Either way, the House of Wisdom sits at the heart of one of the most important episodes in the history of science: the moment when much of the learning of the ancient world was translated into Arabic, checked, argued over and pushed further.

To picture it, start with the city. The caliph al-Mansur founded Baghdad in 762 as a round city on the Tigris, and within a few decades it was one of the largest cities on Earth, a crossroads of Arabic, Persian, Syriac and Greek speakers. Paper making had spread west from Central Asia, Baghdad had paper mills by the 790s, and a whole street of booksellers and copyists grew up to serve readers. Cheap paper did for Abbasid scholarship roughly what cheap printing would later do for Europe.

| Question | Short answer |
| --- | --- |
| When was it founded? | It began as a palace library under the early Abbasid caliphs in the late 8th century |
| When did it flourish? | Mostly in the 9th century, especially under al-Ma’mun (813 to 833) |
| Where was it? | In Baghdad; its exact site is unknown and nothing of it survives |
| What languages did scholars translate? | Greek, Syriac, Middle Persian and Sanskrit, into Arabic |
| Who is linked with it? | Al-Khwarizmi, al-Kindi, the Banu Musa brothers, Hunayn ibn Ishaq, Thabit ibn Qurra |
| How did it end? | Its role faded long before the Mongol sack of Baghdad in 1258 destroyed the city’s libraries |

![A medieval painting of scholars in turbans seated in a library, with books stacked on shelves behind them](/images/articles/house-of-wisdom-baghdad-history.webp "Scholars in a library, painted by Yahya al-Wasiti in a 1237 manuscript from Baghdad. It shows a later library, not the House of Wisdom itself, but gives a sense of the book culture of the time.")

## Who worked at the House of Wisdom?

The scholars most often linked with the House of Wisdom are the mathematician al-Khwarizmi, the philosopher al-Kindi, the three wealthy Banu Musa brothers, the translator Hunayn ibn Ishaq and the mathematician Thabit ibn Qurra.

They were a mixed group, and that mix is part of the story. [Al-Khwarizmi](/scientists/al-khwarizmi), whose name gave us the word algorithm, dedicated his book on algebra to al-Ma’mun. [Al-Kindi](/scientists/al-kindi), often called the philosopher of the Arabs, worked with translators to bring Aristotle into Arabic and wrote the first known treatise on breaking codes by counting letters. Hunayn ibn Ishaq was a Christian physician who translated the medical works of Galen. He was famously fussy about sources: he gathered several Greek copies of a text, compared them, and only then translated. Thabit ibn Qurra came from the Sabian community of Harran and translated works by Euclid, Archimedes and Ptolemy, while the Banu Musa brothers paid translators, built machines and wrote a book of clever mechanical devices around 850.

Muslims, Christians and Sabians, writing in Arabic for patrons at court: this was the working world of Baghdad science. It also explains why historians say "translation movement" rather than giving all the credit to a single building.

## What did the scholars actually do there?

They translated, but they also corrected, commented and created: Greek, Persian and Indian works came into Arabic, and new mathematics and astronomy came out.

Translation started early. Under al-Mansur, in the 770s, an Indian astronomical text was rendered into Arabic and became the basis of tables known as the Zij al-Sindhind. Over the next century, Arabic readers gained Aristotle, Euclid’s Elements, Ptolemy’s great astronomy book (known in Arabic as the Almagest, the name it still has), Galen and Hippocrates, alongside Persian works on astronomy and statecraft.

Translation was never the end of the job. Al-Ma’mun sponsored astronomical observations in Baghdad and Damascus, and around 830 his astronomers measured the length of one degree of latitude on the plain of Sinjar, in northern Iraq, to estimate the size of the Earth. The logic is the same one [Eratosthenes](/scientists/eratosthenes) used a thousand years earlier:

$$ circumference = 360 × (length of one degree) $$

Their result was 56⅔ Arabic miles per degree. With today’s value of about 111 kilometers per degree, the same formula gives 360 × 111 ≈ 40,000 kilometers, which is very close to Earth’s real circumference. How close their own answer came depends on the length of the mile they used, and historians still debate that.

## Was the House of Wisdom a university?

Probably not, at least not in the way we picture a university: many historians now describe it as mainly a palace library and archive, while the translation movement itself was paid for much more widely, by caliphs, courtiers and rich families.

The trouble is the evidence. Most of what we read about the House of Wisdom comes from writers of the 10th to 13th centuries, looking back. The historian Dimitri Gutas, in a well-known 1998 study, argued that the translation movement was a broad social phenomenon in Abbasid society, driven by many patrons and practical needs such as medicine, astrology and administration, rather than the project of one institution. Encyclopaedia Britannica similarly notes that there is little evidence that the House of Wisdom was the center of the translation activity of the period.

None of that makes the scholars smaller. It just moves them out of a single famous building and into a whole city that cared about books. If you are looking for the oldest institution of learning still working today, look west instead: the University of al-Qarawiyyin in Fez, Morocco, traditionally dated to 859 and founded by Fatima al-Fihri, is often described that way. You will find it, with the scientists of the period, in our guide to [famous Muslim scientists](/scientists/muslim-scientists).

## What happened to the House of Wisdom in 1258?

When the Mongol army of Hulagu Khan captured Baghdad in February 1258, the city’s libraries were destroyed, although the House of Wisdom itself seems to have faded from the record long before.

The most famous image of the sack, the Tigris running black with ink from thrown-away books, comes from later accounts. It is probably best read as a vivid way of describing a real catastrophe rather than as an eyewitness measurement. Some of the learning survived, partly through people. The astronomer [Nasir al-Din al-Tusi](/scientists/nasir-al-din-al-tusi), who was in Hulagu’s service, persuaded him to fund an observatory at Maragha in 1259 and gathered a large library there.

## Why does the House of Wisdom matter today?

It matters because the books translated, studied and improved in Abbasid Baghdad became a bridge between ancient and modern science, and later reached medieval Europe in Latin translation.

In the 12th century, translators in Toledo and Sicily turned Arabic books into Latin. Gerard of Cremona, working in Toledo, translated dozens of works, including Ptolemy’s Almagest from its Arabic version in 1175. Al-Khwarizmi’s arithmetic and algebra, Ibn Sina’s medicine and Ibn Rushd’s commentaries on Aristotle followed similar routes into European universities. For students of world history, that is the significance in one line: Baghdad did not just store old knowledge, it made it usable, extended it and passed it on.

Today nothing of the House of Wisdom survives, and its exact location in old Baghdad is unknown, though a modern Iraqi research institute in the city carries its name. What survives is its influence. If you have ever used an algorithm, the word itself is a small souvenir of that world. You can read how it reached us in our story of [who invented zero](/articles/who-invented-zero-history-of-zero), and see how science myths about the period grow in the retelling on our [science myths](/science-myths) page.

## References

- [Encyclopaedia Britannica: Bayt al-Hikmah](https://www.britannica.com/place/Bayt-al-Hikmah)
- [Stanford Encyclopedia of Philosophy: Greek sources in Arabic and Islamic philosophy](https://plato.stanford.edu/entries/arabic-islamic-greek/)
- [History of Information: Foundation of the House of Wisdom and Gutas’s view](https://www.historyofinformation.com/detail.php?entryid=1905)
- [MacTutor History of Mathematics: Arabic mathematics, forgotten brilliance?](https://mathshistory.st-andrews.ac.uk/HistTopics/Arabic_mathematics/)
- [MacTutor: Al-Khwarizmi biography](https://mathshistory.st-andrews.ac.uk/Biographies/Al-Khwarizmi/)
- [The Institute of Ismaili Studies: Bayt al-Hikma glossary entry](https://www.iis.ac.uk/glossary/bayt-al-%e1%b8%a5ikma/)`,
  }),

  makeArticle({
    id: 'editorial-theory-law-hypothesis',
    title: 'Theory vs Law vs Hypothesis: What Scientists Actually Mean',
    slug: 'scientific-theory-vs-law-vs-hypothesis',
    excerpt:
      'A scientific law describes what nature does, a theory explains why, and a hypothesis is a testable idea. Theories never "graduate" into laws. Clear definitions, real examples and a little math.',
    category: theories,
    tags: ['Scientific Theory', 'Scientific Law', 'Hypothesis', 'Scientific Method', 'Philosophy of Science', 'Falsifiability', 'Newton'],
    readTime: 8,
    publishedAt: '2026-11-20T15:00:00Z',
    content: `## What is the difference between a theory, a law and a hypothesis?

A hypothesis is a testable idea about how something works, a scientific law describes a pattern in nature, often as an equation, and a scientific theory is a well-tested explanation of why that pattern happens; they are different kinds of statements, not steps on a ladder.

If you have ever heard someone wave away evolution or climate science as "just a theory", you have met the problem this article is about. In everyday English, a theory is a hunch: "My theory is the cat knocked it over." In science, the word means almost the opposite. Mixing the two up causes endless confusion, so let’s pin the terms down, with examples you can check.

| Term | What it is | Example | The question it answers |
| --- | --- | --- | --- |
| Fact | A repeatable observation | A dropped stone falls | What did we see? |
| Hypothesis | A testable proposed explanation or prediction | Heavier objects fall faster (tested, and rejected) | What might be going on? |
| Law | A description, often mathematical, of a reliable pattern | Newton’s law of universal gravitation | What happens, and how much? |
| Theory | A broad, well-tested explanation that ties facts and laws together | Einstein’s general theory of relativity | Why does it happen? |

## What is a scientific hypothesis?

A hypothesis is a specific, testable idea, framed so that an experiment or an observation could show it to be wrong.

That last part is the key, and it is mostly thanks to the philosopher Karl Popper, who argued in 1934 that what makes a claim scientific is that it could, in principle, be refuted. "Heavier objects fall faster" is a good hypothesis precisely because you can test it, and when you do, it fails: without air resistance, a hammer and a feather hit the ground together. "Invisible fairies push the planets" is not, because no observation could ever count against it.

A classic example of a hypothesis tested well is [Louis Pasteur](/scientists/louis-pasteur)’s swan-neck flask. People then believed microbes could appear spontaneously in broth. Pasteur suspected they arrived from the air on dust. He boiled broth in flasks with long curved necks that let air in but trapped dust in the bend. The broth stayed clear. Tip the flask so broth touched the dust, and it soon clouded. A clear prediction, a clean test, a decisive result.

## What is a scientific law?

A scientific law sums up what nature reliably does under stated conditions, usually as a mathematical relationship, without explaining why it happens.

Take Boyle’s law, published by Robert Boyle in 1662. It says that if you keep the temperature and amount of a gas fixed, its pressure and volume are inversely related:

$$ P₁ × V₁ = P₂ × V₂ $$

Squeeze 2.0 liters of air at 100 kilopascals down to 1.0 liter, and the pressure rises to 200 kilopascals. The law gets the number right every time, within its limits. What it does not tell you is why gas behaves that way.

Newton’s law of universal gravitation is another description of this kind:

$$ F = G × m₁ × m₂ / r² $$

Plug in Earth’s mass (5.97 × 10²⁴ kg), its radius (6,371 km), the gravitational constant G (6.674 × 10⁻¹¹ N·m²/kg²) and a 1-kilogram object, and you get a force of about 9.8 newtons, which is exactly the weight a kilogram has at Earth’s surface. Newton himself refused to guess what caused gravity. The law tells you how strongly bodies pull on each other, not why.

Laws also have edges. Boyle’s law breaks down for real gases at very high pressure or very low temperature, and Newton’s law could not account for a tiny drift in Mercury’s orbit, about 43 seconds of arc per century, which turned out to need a new theory.

## What is a scientific theory?

A scientific theory is a broad, well-tested explanation that ties together many observations and laws and keeps making successful predictions; the US National Academy of Sciences describes it as a comprehensive explanation of some aspect of nature that is supported by a vast body of evidence.

The kinetic theory of gases explains Boyle’s law. Gas is made of countless molecules flying around and bouncing off the walls of their container, and pressure is the push of all those collisions. Halve the volume and each patch of wall gets hit about twice as often, so the pressure doubles. The law describes; the theory explains.

[Albert Einstein](/scientists/albert-einstein)’s general theory of relativity does the same for gravity. It says gravity is the curving of space and time by mass and energy. It explained Mercury’s drift and made new predictions, including that starlight passing the Sun should bend by about 1.75 seconds of arc, twice the value a Newtonian calculation gives. Observations of the 1919 solar eclipse supported Einstein, and the theory has passed many sharper tests since, from gravitational waves to the clocks on GPS satellites, explained in our article on [general relativity and GPS](/articles/general-relativity-curved-spacetime-working-gps).

![Charles Darwin’s 1837 notebook sketch of a branching tree, headed with the words I think](/images/articles/scientific-theory-vs-law-vs-hypothesis.webp "Charles Darwin’s 1837 notebook sketch of a branching tree of species. The idea grew into the theory of evolution by natural selection, one of the best-tested theories in science.")

Other famous examples include the atomic theory, the germ theory of disease, plate tectonics and evolution by natural selection, which [Charles Darwin](/scientists/charles-darwin) first sketched as a branching tree in a notebook in 1837.

## Can a theory become a law?

No: a theory never "graduates" into a law, because laws and theories do different jobs, and a mature science needs both.

This is probably the single most common misunderstanding, and science teaching resources such as the University of California’s Understanding Science project and the National Science Teaching Association both go out of their way to correct it. A law describes a regularity; a theory explains it. More evidence makes a theory more trusted, but it stays a theory. Newton’s law of gravitation and Einstein’s theory of gravity live side by side today: engineers still use Newton’s simpler law to plan most spacecraft trajectories, while Einstein’s theory explains what gravity is and where Newton’s law stops working.

## Is evolution "just a theory"?

Evolution is a theory in the scientific sense, which is about the highest status an explanation can reach in science, not a guess.

The phrase "just a theory" only works if you quietly swap the everyday meaning of theory for the scientific one. In science, calling evolution a theory puts it in the same family as the atomic theory and the germ theory: explanations supported by many independent lines of evidence. For evolution, those lines include the fossil record, the genetic code shared by all living things, and changes that can be watched happening, such as bacteria becoming resistant to antibiotics.

## Can scientific theories be proven wrong?

Yes: any scientific theory can in principle be revised or replaced if new evidence demands it, and that openness is one of science’s strengths, not a weakness.

History offers plenty of examples. Chemists once explained burning with phlogiston, a substance thought to escape from things as they burned, until Antoine Lavoisier’s work on oxygen in the 1770s and 1780s replaced it. Physicists assumed light needed a medium called the luminiferous aether, until the Michelson and Morley experiment of 1887 found no sign of it. Alfred Wegener’s idea of drifting continents, proposed in 1912, was rejected for decades, then folded into plate tectonics in the 1960s once evidence from the ocean floor arrived.

Notice that the strongest theories are rarely thrown out entirely. More often they turn out to be special cases of something bigger, the way Newton’s physics still works perfectly well at everyday speeds. You can see more examples of how ideas get simplified, and sometimes distorted, in our collection of [science myths about famous scientists](/science-myths).

## References

- [University of California Museum of Paleontology, Understanding Science: Science at multiple levels](https://undsci.berkeley.edu/understanding-science-101/how-science-works/science-at-multiple-levels/)
- [Understanding Science: How science really works](https://undsci.berkeley.edu/)
- [National Science Teaching Association: How does a scientific theory become a scientific law?](https://www.nsta.org/science-101-how-does-scientific-theory-become-scientific-law)
- [National Academy of Sciences: Science, Evolution, and Creationism (2008)](https://nap.nationalacademies.org/read/11876/chapter/1)
- [Stanford Encyclopedia of Philosophy: Karl Popper](https://plato.stanford.edu/entries/popper/)`,
  }),

  makeArticle({
    id: 'editorial-double-slit',
    title: 'The Double-Slit Experiment Explained: Why Watching Changes the Result',
    slug: 'double-slit-experiment-explained',
    excerpt:
      'Fire single electrons at two slits and they still build up an interference pattern, unless you record which slit each one used. What the experiment shows, the math of the fringes, and the myth about consciousness.',
    category: experiments,
    tags: ['Double-Slit Experiment', 'Wave-Particle Duality', 'Quantum Mechanics', 'Interference', 'Thomas Young', 'Observer Effect', 'Electrons'],
    readTime: 9,
    publishedAt: '2026-11-20T14:30:00Z',
    content: `## What is the double-slit experiment?

The double-slit experiment sends light, or particles such as electrons, through two narrow openings and records where they land; instead of two bright stripes you get a row of alternating bright and dark bands, an interference pattern that only waves should be able to make.

That sounds harmless until you send the particles through one at a time and the bands still appear. Richard Feynman, in his famous lectures, called it a phenomenon that is impossible to explain in any classical way and that holds the heart of quantum mechanics. When the magazine Physics World asked its readers in 2002 to name the most beautiful experiment in physics, the double-slit experiment with single electrons came top.

Here is the short history of the experiment, which has now been done with almost everything physicists can fire at a pair of slits.

| Year | What went through the slits | Who did it |
| --- | --- | --- |
| Early 1800s | Light | Thomas Young |
| 1909 | Very faint light | Geoffrey Ingram Taylor |
| 1961 | Electrons | Claus Jönsson |
| 1974 | Electrons, one at a time | Pier Giorgio Merli, GianFranco Missiroli and Giulio Pozzi |
| 1988 | Neutrons | Anton Zeilinger and colleagues |
| 1989 | Single electrons, recorded as they built up | Akira Tonomura and colleagues at Hitachi |
| 1991 | Helium atoms | Olivier Carnal and Jürgen Mlynek |
| 1999 | Carbon-60 "buckyball" molecules | Markus Arndt, Anton Zeilinger and colleagues |
| 2019 | Molecules heavier than 25,000 atomic mass units | Yaakov Fein, Markus Arndt and colleagues |

## What did Thomas Young show about light?

In the early 1800s Thomas Young showed that light behaves like a wave: light spreading from two openings overlaps, making bright bands where the waves reinforce each other and dark bands where they cancel.

Young presented his interference experiments to the Royal Society in 1803, and in lectures published in 1807 he drew the now-famous diagram of waves spreading from two points. It is easiest to understand with water. Drop two pebbles into a pond and the rings cross each other. Where two crests meet, the water heaves higher; where a crest meets a trough, the surface goes flat. Light does the same, and on a screen the result is a set of stripes.

![Thomas Young’s diagram of waves spreading from two openings marked A and B and overlapping into bands labelled C, D, E and F](/images/articles/thomas-young-two-slit-sketch.webp "A modern redrawing of Thomas Young’s sketch of waves from two openings, A and B, overlapping to form bright and dark bands.")

The geometry is simple enough to calculate. A bright band appears wherever the paths from the two slits differ by a whole number of wavelengths:

$$ d × sin θ = m × λ $$

Here d is the distance between the slits, θ the angle to the band, λ the wavelength and m a whole number. For a screen much farther away than the slits are apart, that gives a handy formula for the spacing between bands:

$$ Δy = λ × L / d $$

With a green laser (λ = 532 nanometers), slits 0.4 millimeters apart and a screen 2 meters away, Δy = 532 × 10⁻⁹ × 2 ÷ 0.0004, about 2.7 millimeters between bright stripes. Move the slits closer together and the stripes spread out.

## What happens when you send one particle at a time?

Each particle arrives as a single dot at one spot on the detector, but after thousands of them the dots pile up into the same striped interference pattern, as if every particle had passed through both slits like a wave.

This is the part that breaks intuition. In the 1989 experiment by Akira Tonomura’s team, electrons were sent so sparsely that only one was ever in the apparatus at a time. At first the screen shows random dots. Keep going, and bands appear out of the noise. Nothing is interfering with anything else, because there is nothing else in there. Each electron, on its own, behaves as a spread-out wave on the way through and as a point on arrival.

![Four panels showing scattered single dots that gradually build up into vertical bands of an interference pattern](/images/articles/electron-double-slit-buildup-tonomura.webp "Electrons recorded one at a time in Tonomura’s experiment: a few scattered dots at first, then clear interference bands as thousands arrive.")

The wave idea for matter came from Louis de Broglie in 1924, who proposed that any particle has a wavelength set by its momentum:

$$ λ = h / p $$

where h is Planck’s constant, 6.626 × 10⁻³⁴ joule-seconds. For an electron with 100 electronvolts of energy, that works out to about 0.12 nanometers, roughly the spacing of atoms in a crystal. That is why, in 1927, Clinton Davisson and Lester Germer saw electrons bouncing off a nickel crystal form a diffraction pattern, the first direct confirmation of de Broglie’s idea.

## Does observing the particles really change the result?

Yes, but "observing" in physics means any physical interaction that records which slit a particle went through, not a person looking; as soon as that which-path information exists anywhere, the interference pattern disappears.

To find out which slit an electron used, you have to interact with it, for example by bouncing light off it near one slit. That interaction leaves a record, and the record is what matters. With which-path information, you get two plain stripes, the way you would expect from particles. Without it, you get interference. This trade-off is what [Niels Bohr](/scientists/niels-bohr) called complementarity: the wave and particle pictures are both needed, but you can never see both at once in the same experiment.

The popular idea that a human mind collapses reality is a myth. A detector does exactly the same job with nobody in the room, and the pattern vanishes all the same. Later "quantum eraser" experiments, in which the which-path record is scrambled before anyone reads it, bring the interference back in the selected data, but they never allow signals to be sent backwards in time or faster than light. If you want a sense of how far physicists have pushed these tests, read our explainers on [quantum entanglement without the faster-than-light myth](/articles/quantum-entanglement-without-faster-than-light-myth) and [how Bell tests turned the quantum debate into data](/articles/how-bell-tests-turned-quantum-debate-into-data).

## Why don’t everyday objects show interference?

Everyday objects are too heavy to show interference, because their wavelengths are unimaginably small, and because constant bumping into air and light destroys their wave behavior almost instantly, a process called decoherence.

Put numbers on it. A baseball of 0.145 kilograms thrown at 40 meters per second has a momentum of 5.8 kilogram-meters per second, so its de Broglie wavelength is 6.626 × 10⁻³⁴ ÷ 5.8, about 10⁻³⁴ meters. That is far smaller than a proton. No pair of slits could ever be fine enough to separate its waves. Molecules of tens of thousands of atomic mass units are about the current frontier, and keeping them isolated long enough is the hard part.

## Can you do the double-slit experiment at home?

Yes: shine a laser pointer through two thin parallel slits, or two scratches in a blackened glass slide, and you will see a row of bright and dark bands on a wall a few meters away.

A common recipe is to coat a microscope slide with soot or paint, then draw two razor blades held together across it to make two scratches very close together. Darken the room, point the laser through the scratches at a wall, and look at the wall, never into the beam. Use only a low-power laser pointer and keep it away from eyes, including pets’. The fringes you see are Young’s experiment, done with a pocket light source he could only have dreamed of.

## What does the double-slit experiment tell us about reality?

It tells us that quantum objects are neither little balls nor ripples, but something that quantum mechanics describes perfectly with waves of probability; what that description means about reality is still debated.

The predictions themselves are not in doubt. Quantum mechanics calculates the pattern to astonishing precision for photons, electrons, neutrons, atoms and molecules. The arguments are about interpretation. In the Copenhagen view associated with Bohr, the theory predicts the odds of measurement results and does not say what happens in between. The many-worlds interpretation says every possible outcome happens in branching worlds. Pilot-wave theory says particles have definite paths guided by a real wave. All three give the same predictions for this experiment, so for now the choice rests on taste and argument. That an experiment first done with sunlight over two centuries ago can still keep physicists up at night is, perhaps, the most beautiful part.

## References

- [Physics World: The double-slit experiment, readers’ choice for most beautiful experiment](https://physicsworld.com/a/the-double-slit-experiment/)
- [Hitachi: The double-slit experiment with single electrons](https://www.hitachi.com/rd/research/materials/quantum/doubleslit/index.html)
- [The Feynman Lectures on Physics, Volume III, Chapter 1: Quantum behavior](https://www.feynmanlectures.caltech.edu/III_01.html)
- [Royal Society: Thomas Young, Experiments and calculations relative to physical optics (1804)](https://royalsocietypublishing.org/doi/10.1098/rstl.1804.0001)
- [Nature: Wave-particle duality of C60 molecules (Arndt et al., 1999)](https://www.nature.com/articles/44348)
- [Nature Physics: Quantum superposition of molecules beyond 25 kDa (Fein et al., 2019)](https://www.nature.com/articles/s41567-019-0663-9)`,
  }),
];
