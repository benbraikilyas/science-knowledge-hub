import InfoPageShell from '@/components/InfoPageShell';

export const metadata = {
  title: 'Sources & Image Credits',
  description: 'Source standards, corrections information, and visible image credits for Science Knowledge Hub.',
};

const SCIENTIST_CREDITS = [
  ['Albert Einstein', 'Ferdinand Schmutzer, 1921 — public domain', 'https://commons.wikimedia.org/wiki/File:Albert_Einstein_Head.jpg'],
  ['Marie Curie', 'Unknown photographer, c. 1920 — public domain', 'https://commons.wikimedia.org/wiki/File:Marie_Curie_c1920.jpg'],
  ['Nikola Tesla', 'Napoleon Sarony, c. 1890s — public domain', 'https://commons.wikimedia.org/wiki/File:N.Tesla.JPG'],
  ['Stephen Hawking', 'NASA, 2008 — US government work', 'https://commons.wikimedia.org/wiki/File:Stephen_hawking_2008_nasa.jpg'],
  ['Isaac Newton', 'Godfrey Kneller, 1689 — public domain', 'https://commons.wikimedia.org/wiki/File:GodfreyKneller-IsaacNewton-1689.jpg'],
  ['Ada Lovelace', 'Margaret Sarah Carpenter, 1836 — public domain', 'https://commons.wikimedia.org/wiki/File:Ada_Lovelace_portrait.jpg'],
  ['Al-Khwarizmi', 'Monument photograph — license on source page', 'https://commons.wikimedia.org/wiki/File:Madrid_-_Ciudad_Universitaria,_Monumento_a_Muhammad_al-Juarismi_(cropped).jpg'],
  ['Ibn al-Haytham', 'Historical depiction — license on source page', 'https://commons.wikimedia.org/wiki/File:Ibn_al-Haytham_crop.jpg'],
  ['Ibn Sina', 'Bust photograph — license on source page', 'https://commons.wikimedia.org/wiki/File:Avicenna_Bust,_left_profile_(cropped).jpg'],
  ['Al-Zahrawi', 'Illustration — CC0 on source page', 'https://commons.wikimedia.org/wiki/File:Al-Zahrawi.png'],
  ['Al-Biruni', 'Historical image — license on source page', 'https://commons.wikimedia.org/wiki/File:Biruni-russian.jpg'],
  ['Jabir ibn Hayyan', 'Historical manuscript — status on source page', 'https://commons.wikimedia.org/wiki/File:Man_Florence,_Ashburnham_1166_fol_12r.jpg'],
  ['Al-Jazari', 'Elephant clock manuscript — status on source page', 'https://commons.wikimedia.org/wiki/File:Al-jazari_elephant_clock.png'],
  ['Ibn al-Nafis', 'Statue photograph — license on source page', 'https://commons.wikimedia.org/wiki/File:Ibn_Al_Nafis_statue.jpg'],
  ['Al-Kindi', 'Iraqi stamp, 1962 — status on source page', 'https://commons.wikimedia.org/wiki/File:Stamp_IQ_1962_6f.jpg'],
  ['Al-Razi', 'Artwork — license on source page', 'https://commons.wikimedia.org/wiki/File:%D8%B2%DA%A9%D8%B1%DB%8C%D8%A7%DB%8C_%D8%B1%D8%A7%D8%B2%DB%8C_%D8%A7%D8%AB%D8%B1_%D8%AD%D8%B3%DB%8C%D9%86_%D8%A8%D9%87%D8%B2%D8%A7%D8%AF_(cropped).jpg'],
  ['Alan Turing', 'Historical photograph — license on source page', 'https://commons.wikimedia.org/wiki/File:Alan_turing_header.jpg'],
  ['Grace Hopper', 'US Navy portrait — status on source page', 'https://commons.wikimedia.org/wiki/File:Commodore_Grace_M._Hopper,_USN_(covered)_head_and_shoulders_crop.jpg'],
  ['Claude Shannon', 'Tekniska museet — license on source page', 'https://commons.wikimedia.org/wiki/File:C.E._Shannon._Tekniska_museet_43069_(2x3_crop).jpg'],
  ['Margaret Hamilton', 'NASA-era photograph — status on source page', 'https://commons.wikimedia.org/wiki/File:Margaret_Hamilton_-_restoration.jpg'],
  ['John von Neumann', 'Los Alamos photograph — status on source page', 'https://commons.wikimedia.org/wiki/File:JohnvonNeumann-LosAlamos.gif'],
  ['Charles Darwin', 'Historical photograph — status on source page', 'https://commons.wikimedia.org/wiki/File:Charles_Darwin_seated_crop.jpg'],
  ['Galileo Galilei', 'Historical painting — status on source page', 'https://commons.wikimedia.org/wiki/File:Galileo_Galilei_(1564-1642)_RMG_BHC2700.tiff'],
  ['Louis Pasteur', 'Paul Nadar photograph — status on source page', 'https://commons.wikimedia.org/wiki/File:Louis_Pasteur,_foto_av_Paul_Nadar,_Crisco_edit.jpg'],
  ['Rosalind Franklin', 'Historical photograph — license on source page', 'https://commons.wikimedia.org/wiki/File:Rosalind_Franklin_(retouched).jpg'],
  ['Michael Faraday', 'Historical photograph — status on source page', 'https://commons.wikimedia.org/wiki/File:Michael_Faraday_sitting_crop.jpg'],
] as const;

const ARTICLE_CREDITS = [
  ['Webb’s First Deep Field', 'NASA, ESA, CSA, STScI, 2022 — public-domain NASA imagery', 'https://commons.wikimedia.org/wiki/File:Webb%27s_First_Deep_Field.jpg'],
  ['Quantum computing laboratory', 'ManoBV16 — CC0 1.0', 'https://commons.wikimedia.org/wiki/File:Quantum_Computing_AI_Lab.jpg'],
  ['CRISPR-Cas9 illustration', 'National Institutes of Health — US government work', 'https://www.flickr.com/photos/132318516@N08/41124064215'],
  ['Data center infrastructure', 'US government source — public domain', 'https://commons.wikimedia.org/wiki/File:Data_center_infrastructure_in_the_United_States.jpg'],
  ['Dark matter ring', 'NASA / ESA Hubble, 2007 — public-domain agency imagery', 'https://commons.wikimedia.org/wiki/File:Hubble_finds_dark_matter_ring_in_galaxy_cluster_(heic0709b).jpg'],
  ['Apollo 11', 'Neil Armstrong / NASA, 1969 — public domain', 'https://commons.wikimedia.org/wiki/File:Aldrin_Apollo_11_original.jpg'],
] as const;

function CreditList({ entries }: { entries: ReadonlyArray<readonly [string, string, string]> }) {
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {entries.map(([title, credit, url]) => (
        <a key={title} href={url} target="_blank" rel="noreferrer" className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/50 p-4 transition-colors hover:border-gold-500/40">
          <span className="block font-semibold text-[var(--text-primary)]">{title}</span>
          <span className="mt-1 block text-xs leading-relaxed text-[var(--text-secondary)]">{credit}</span>
          <span className="mt-2 block text-xs font-semibold text-gold-300">Open source record &rarr;</span>
        </a>
      ))}
    </div>
  );
}

export default function SourcesPage() {
  return (
    <InfoPageShell
      eyebrow="Transparency"
      title="Sources & Image Credits"
      description="Where our information and visual material come from, and how to report a missing or incorrect credit."
      updated="September 2026"
    >
      <div className="space-y-12 text-[var(--text-secondary)]">
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Information sources</h2>
          <p className="mt-3 leading-relaxed">Individual scientist profiles link to a named reference profile. Articles list their references when published. Our preferred sources include peer-reviewed journals, official scientific agencies, universities, museums, professional societies, and primary historical documents.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">How editorial content is prepared</h2>
          <p className="mt-3 leading-relaxed">Research tools help collect and organize material from multiple named sources. Drafts are written as original explanations rather than copied summaries, checked for source coverage and unsupported claims, and kept out of the production database until an editor approves them. Automation supports the research process; it does not replace source verification or editorial responsibility.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Free book editions</h2>
          <p className="mt-3 leading-relaxed">Book records link to the official Project Gutenberg or Internet Archive catalog page used for access. Project Gutenberg identifies its editions as public domain in the United States and advises readers elsewhere to check local law. ScienceHub provides original introductions and links to the archive; it does not sell or repackage the book files.</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a href="https://www.gutenberg.org/" target="_blank" rel="noreferrer" className="font-semibold text-gold-300 hover:text-gold-200">Project Gutenberg &rarr;</a>
            <a href="https://archive.org/" target="_blank" rel="noreferrer" className="font-semibold text-gold-300 hover:text-gold-200">Internet Archive &rarr;</a>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Interactive tool methodology</h2>
          <p className="mt-3 leading-relaxed">Science Tools Lab calculations run from visible equations and SI constants. Exact constants and the gravitational constant follow the NIST 2022 CODATA publication; relativity definitions are cross-checked against OpenStax University Physics; the escape-speed model is compared with NASA educational material. Every tool states the assumptions it omits and is intended for education, not safety-critical or professional calculations.</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a href="https://physics.nist.gov/cuu/pdf/wall_2022.pdf" target="_blank" rel="noreferrer" className="font-semibold text-gold-300 hover:text-gold-200">NIST CODATA &rarr;</a>
            <a href="https://openstax.org/books/university-physics-volume-3/pages/5-3-time-dilation" target="_blank" rel="noreferrer" className="font-semibold text-gold-300 hover:text-gold-200">OpenStax Relativity &rarr;</a>
            <a href="https://spacemath.gsfc.nasa.gov/engineering.html" target="_blank" rel="noreferrer" className="font-semibold text-gold-300 hover:text-gold-200">NASA Space Math &rarr;</a>
          </div>
        </section>
        <section id="image-credits" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Scientist image credits</h2>
          <p className="mt-3 text-sm leading-relaxed">The linked file page is the authoritative record for the author, license, and any attribution or share-alike conditions.</p>
          <CreditList entries={SCIENTIST_CREDITS} />
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Article image credits</h2>
          <CreditList entries={ARTICLE_CREDITS} />
          <div className="mt-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/50 p-5">
            <h3 className="font-semibold text-[var(--text-primary)]">Original ScienceHub visualizations</h3>
            <p className="mt-2 text-sm leading-relaxed">Eight additional article illustrations were generated specifically for this project with OpenAI image generation: stellar evolution, team science, relativity and GPS, Bell tests, semiconductors, scientific instruments, mathematical proof, and quantum computing. They were reviewed for subject fit and contain no third-party logos or copied artwork.</p>
          </div>
        </section>
        <section className="rounded-2xl border border-gold-500/25 bg-gold-500/8 p-6">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Is a credit incomplete?</h2>
          <p className="mt-3 leading-relaxed">Please send the page URL and the corrected creator, source, or license information through our contact form. We will review and update confirmed notices.</p>
          <a href="/contact" className="mt-5 inline-flex rounded-xl bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400">Report a credit issue</a>
        </section>
      </div>
    </InfoPageShell>
  );
}
