import Link from 'next/link';
import InfoPageShell from '@/components/InfoPageShell';
import { CONTACT_EMAIL } from '@/lib/site';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Science Knowledge Hub collects, uses, stores, and shares personal information.',
};

export default function PrivacyPage() {
  return (
    <InfoPageShell
      eyebrow="Privacy"
      title="Privacy Policy"
      description="This policy explains what information Science Knowledge Hub handles, why we use it, and the choices available to visitors."
      updated="August 2026"
    >
      <div className="space-y-9 text-[var(--text-secondary)]">
        <section><h2 className="text-xl font-bold text-[var(--text-primary)]">Information you provide</h2><p className="mt-3 leading-relaxed">We may collect your name, email address, account information, newsletter preference, and the content of messages you send through our contact form. Please do not submit sensitive information that is not needed for your request.</p></section>
        <section><h2 className="text-xl font-bold text-[var(--text-primary)]">Information collected automatically</h2><p className="mt-3 leading-relaxed">Our hosting, security, and service providers may process IP addresses, browser and device information, request timestamps, referring pages, and diagnostic logs. If optional analytics is enabled with your permission, it may also measure page visits and navigation patterns.</p></section>
        <section><h2 className="text-xl font-bold text-[var(--text-primary)]">How we use information</h2><ul className="mt-3 space-y-2 leading-relaxed"><li>• Provide accounts, site features, and requested services.</li><li>• Deliver newsletters and process unsubscribe requests.</li><li>• Review corrections, source notices, privacy requests, and technical reports.</li><li>• Protect the site from abuse and understand reliability problems.</li><li>• Measure and support advertising only when legally permitted and configured.</li></ul></section>
        <section><h2 className="text-xl font-bold text-[var(--text-primary)]">Cookies, Google AdSense, and advertising partners</h2><p className="mt-3 leading-relaxed">If advertising is enabled, third-party vendors including Google may use cookies, web beacons, IP addresses, or similar identifiers to serve, limit, measure, and personalize ads. Google&apos;s use of advertising cookies can depend on your consent choices and location. You can manage Google ad personalization through <a href="https://adssettings.google.com/" target="_blank" rel="noreferrer" className="text-gold-300 hover:underline">Google Ads Settings</a>, and learn how Google uses information from partner sites in <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer" className="text-gold-300 hover:underline">Google&apos;s partner-sites notice</a>.</p><p className="mt-3 leading-relaxed">For visitors in regions where consent is required, optional advertising and analytics storage remain denied until a valid choice is recorded. See our <Link href="/cookies" className="text-gold-300 hover:underline">Cookie Policy</Link> to change your preferences.</p></section>
        <section><h2 className="text-xl font-bold text-[var(--text-primary)]">Sharing and service providers</h2><p className="mt-3 leading-relaxed">We do not sell personal information. We may share the minimum necessary information with providers that host the site, store data, deliver email, prevent abuse, measure traffic, or provide advertising. We may also disclose information when required by law or to protect users and the service.</p></section>
        <section><h2 className="text-xl font-bold text-[var(--text-primary)]">Retention and security</h2><p className="mt-3 leading-relaxed">We keep information only as long as needed for the purposes described here, legal obligations, dispute resolution, and security. We use reasonable technical and organizational safeguards, but no internet service can guarantee absolute security.</p></section>
        <section><h2 className="text-xl font-bold text-[var(--text-primary)]">Your choices and rights</h2><p className="mt-3 leading-relaxed">Depending on where you live, you may have rights to access, correct, delete, restrict, or object to processing of personal information, and to withdraw consent. You can unsubscribe from newsletters through our <Link href="/unsubscribe" className="text-gold-300 hover:underline">unsubscribe page</Link> and submit other requests through <Link href="/contact" className="text-gold-300 hover:underline">Contact</Link>.</p></section>
        <section><h2 className="text-xl font-bold text-[var(--text-primary)]">Children</h2><p className="mt-3 leading-relaxed">The site provides general educational material and is not directed to children under 13. We do not knowingly collect personal information from children under 13. A parent or guardian may contact us to request removal.</p></section>
        <section><h2 className="text-xl font-bold text-[var(--text-primary)]">International processing and policy changes</h2><p className="mt-3 leading-relaxed">Providers may process information in countries other than your own, subject to appropriate legal safeguards where required. We may update this policy as the project or applicable requirements change; the date above identifies the current version.</p></section>
        <section className="rounded-2xl border border-gold-500/25 bg-gold-500/8 p-6"><h2 className="text-xl font-bold text-[var(--text-primary)]">Contact</h2><p className="mt-3 leading-relaxed">Use our <Link href="/contact" className="text-gold-300 hover:underline">contact form</Link> for privacy questions or requests.{CONTACT_EMAIL ? <> You may also email <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold-300 hover:underline">{CONTACT_EMAIL}</a>.</> : null}</p></section>
      </div>
    </InfoPageShell>
  );
}
