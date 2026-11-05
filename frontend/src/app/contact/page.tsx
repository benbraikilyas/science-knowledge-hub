import ContactForm from '@/components/ContactForm';
import InfoPageShell from '@/components/InfoPageShell';
import { API_ENABLED, CONTACT_EMAIL } from '@/lib/site';

export const metadata = {
  alternates: { canonical: '/contact' },
  title: 'Contact',
  description: 'Contact Science Knowledge Hub about corrections, sources, privacy, or general questions.',
};

const SUBJECTS = [
  'A correction, with the page URL and a reliable source',
  'A missing source, image credit or broken link',
  'A privacy or cookie question',
  'A technical problem with the site',
];

export default function ContactPage() {
  return (
    <InfoPageShell
      eyebrow="Contact"
      title="Talk to the editorial team"
      description="Send a correction, request a source or image credit update, ask a privacy question, or report a technical issue."
    >
      <div className="space-y-6">
        {CONTACT_EMAIL && API_ENABLED && (
          <p className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/50 p-5 text-sm text-[var(--text-secondary)]">
            Prefer email? Write to <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-gold-300 hover:underline">{CONTACT_EMAIL}</a>.
          </p>
        )}
        {CONTACT_EMAIL && !API_ENABLED && (
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/50 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">Email the editorial team</h2>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              Write to{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-gold-300 hover:underline">{CONTACT_EMAIL}</a>
              . Please include the page URL if your message is about a specific article.
            </p>
            <p className="mt-5 text-sm font-semibold text-[var(--text-primary)]">Useful things to write about:</p>
            <ul className="mt-2 space-y-1.5 text-sm text-[var(--text-secondary)]">
              {SUBJECTS.map((subject) => (
                <li key={subject}>• {subject}</li>
              ))}
            </ul>
          </div>
        )}
        {API_ENABLED && <ContactForm />}
        <p className="text-xs leading-relaxed text-[var(--text-secondary)]">We use the details you submit only to review and respond to your request. Please do not include passwords, payment information, or sensitive medical information.</p>
      </div>
    </InfoPageShell>
  );
}
