import CookieSettingsButton from '@/components/CookieSettingsButton';
import InfoPageShell from '@/components/InfoPageShell';

export const metadata = {
  title: 'Cookie Policy',
  description: 'How Science Knowledge Hub uses cookies and how visitors can control optional storage.',
};

export default function CookiesPage() {
  return (
    <InfoPageShell
      eyebrow="Privacy Choices"
      title="Cookie Policy"
      description="This page explains the browser storage used by Science Knowledge Hub and how to change your choices."
      updated="August 2026"
    >
      <div className="space-y-9 text-[var(--text-secondary)]">
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">What cookies and local storage do</h2>
          <p className="mt-3 leading-relaxed">Cookies and similar browser technologies remember settings, support security, measure how a site is used, and may support advertising. Some are necessary for a requested service; others require a choice.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Categories we use</h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/50 p-5"><h3 className="font-semibold text-[var(--text-primary)]">Necessary</h3><p className="mt-2 text-sm leading-relaxed">Used for security, authentication where available, theme settings, and remembering your consent choices. These cannot be disabled through our preference panel.</p></div>
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/50 p-5"><h3 className="font-semibold text-[var(--text-primary)]">Analytics</h3><p className="mt-2 text-sm leading-relaxed">May be used to understand page visits, device categories, and navigation patterns. Analytics storage remains denied unless you allow it.</p></div>
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/50 p-5"><h3 className="font-semibold text-[var(--text-primary)]">Advertising</h3><p className="mt-2 text-sm leading-relaxed">May be used by Google and other approved advertising partners to deliver, limit, measure, or personalize ads. Advertising storage remains denied unless you allow it and any legally required consent signal is available.</p></div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Google advertising</h2>
          <p className="mt-3 leading-relaxed">If Google AdSense is enabled in the future, Google and its partners may use cookies or similar identifiers. Visitors can review Google&apos;s advertising controls at <a href="https://adssettings.google.com/" target="_blank" rel="noreferrer" className="text-gold-300 hover:underline">Google Ads Settings</a> and learn how Google uses information from partner sites at <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer" className="text-gold-300 hover:underline">Google&apos;s partner-sites notice</a>.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Change your choices</h2>
          <p className="mt-3 leading-relaxed">You can reopen the preference panel at any time. You may also clear browser storage or block cookies through your browser, although that can reset themes, sign-in state, and other preferences.</p>
          <CookieSettingsButton className="mt-5 rounded-xl bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400" />
        </section>
      </div>
    </InfoPageShell>
  );
}
