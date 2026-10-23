import Link from 'next/link';
import InfoPageShell from '@/components/InfoPageShell';

export const metadata = {
  alternates: { canonical: '/affiliate-disclosure' },
  title: 'Affiliate Disclosure',
  description: 'How Science Knowledge Hub may earn commissions from some links, and what that does not change.',
};

export default function AffiliateDisclosurePage() {
  return (
    <InfoPageShell
      eyebrow="Legal"
      title="Affiliate Disclosure"
      description="How Science Knowledge Hub may earn money from some links, and what that does not change."
      updated="October 2026"
    >
      <div className="space-y-9 text-[var(--text-secondary)]">
        <section><h2 className="text-xl font-bold text-[var(--text-primary)]">Affiliate links</h2><p className="mt-3 leading-relaxed">Some links on this site may be affiliate links. If you click one and buy something, Science Knowledge Hub may earn a commission at no extra cost to you. We may use affiliate programs and link-monetization services for this.</p></section>
        <section><h2 className="text-xl font-bold text-[var(--text-primary)]">What this does not change</h2><p className="mt-3 leading-relaxed">Our content is written to be educational. Affiliate relationships do not decide what we publish or what the evidence says, and we link to books, tools, and courses because we think they may be useful to readers.</p></section>
        <section><h2 className="text-xl font-bold text-[var(--text-primary)]">Sponsored content</h2><p className="mt-3 leading-relaxed">If we ever publish paid or sponsored material, we will label it clearly on the page.</p></section>
        <section><h2 className="text-xl font-bold text-[var(--text-primary)]">Third-party services and cookies</h2><p className="mt-3 leading-relaxed">Affiliate and link services may use cookies to record that a purchase came from this site. See our <Link href="/cookies" className="text-gold-300 hover:underline">Cookie Policy</Link> and <Link href="/privacy" className="text-gold-300 hover:underline">Privacy Policy</Link> for how data is handled and how to change your choices.</p></section>
        <section><h2 className="text-xl font-bold text-[var(--text-primary)]">Questions</h2><p className="mt-3 leading-relaxed">If you have a question about this disclosure, use our <Link href="/contact" className="text-gold-300 hover:underline">contact form</Link>.</p></section>
      </div>
    </InfoPageShell>
  );
}
