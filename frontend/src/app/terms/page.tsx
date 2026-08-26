import Link from 'next/link';
import InfoPageShell from '@/components/InfoPageShell';

export const metadata = {
  title: 'Terms of Use',
  description: 'Terms governing use of Science Knowledge Hub.',
};

export default function TermsPage() {
  return (
    <InfoPageShell
      eyebrow="Legal"
      title="Terms of Use"
      description="These terms govern access to and use of Science Knowledge Hub."
      updated="August 2026"
    >
      <div className="space-y-9 text-[var(--text-secondary)]">
        <section><h2 className="text-xl font-bold text-[var(--text-primary)]">Acceptance</h2><p className="mt-3 leading-relaxed">By using this site, you agree to these terms and our Privacy Policy. If you do not agree, please stop using the service.</p></section>
        <section><h2 className="text-xl font-bold text-[var(--text-primary)]">Educational purpose</h2><p className="mt-3 leading-relaxed">Content is provided for general educational and informational use. It is not professional medical, legal, financial, safety, or engineering advice and should not replace qualified guidance or original scientific sources.</p></section>
        <section><h2 className="text-xl font-bold text-[var(--text-primary)]">Accuracy and availability</h2><p className="mt-3 leading-relaxed">We work to improve accuracy but cannot guarantee that every page is complete, current, or error-free. Scientific understanding changes, and parts of this early-stage project may be updated, moved, or removed. Report suspected errors through our <Link href="/contact" className="text-gold-300 hover:underline">contact form</Link>.</p></section>
        <section><h2 className="text-xl font-bold text-[var(--text-primary)]">Accounts and acceptable use</h2><p className="mt-3 leading-relaxed">You are responsible for your credentials and activity. Do not attempt unauthorized access, interfere with the service, submit malicious code, scrape the site in a way that disrupts it, impersonate others, or use the service unlawfully.</p></section>
        <section><h2 className="text-xl font-bold text-[var(--text-primary)]">Copyright, sources, and third-party material</h2><p className="mt-3 leading-relaxed">Original site text and design may not be republished as your own. Images, quotations, scientific papers, and other third-party material remain subject to their respective rights and licenses. See <Link href="/sources" className="text-gold-300 hover:underline">Sources & Image Credits</Link> for attribution information.</p></section>
        <section><h2 className="text-xl font-bold text-[var(--text-primary)]">External links and advertising</h2><p className="mt-3 leading-relaxed">Links and advertisements may lead to third-party services with their own terms and privacy practices. Their inclusion does not automatically constitute an endorsement, and we are not responsible for third-party content or transactions.</p></section>
        <section><h2 className="text-xl font-bold text-[var(--text-primary)]">Disclaimer and limitation</h2><p className="mt-3 leading-relaxed">The service is provided on an “as available” basis to the extent permitted by law. We are not liable for indirect or consequential losses arising from reliance on site content, service interruptions, or third-party services.</p></section>
        <section><h2 className="text-xl font-bold text-[var(--text-primary)]">Changes</h2><p className="mt-3 leading-relaxed">We may update these terms as the project changes. The updated date identifies the current version. Continued use after an update means you accept the revised terms.</p></section>
      </div>
    </InfoPageShell>
  );
}
