import ContactForm from '@/components/ContactForm';
import InfoPageShell from '@/components/InfoPageShell';
import { CONTACT_EMAIL } from '@/lib/site';

export const metadata = {
  title: 'Contact',
  description: 'Contact Science Knowledge Hub about corrections, sources, privacy, or general questions.',
};

export default function ContactPage() {
  return (
    <InfoPageShell
      eyebrow="Contact"
      title="Talk to the editorial team"
      description="Send a correction, request a source or image credit update, ask a privacy question, or report a technical issue."
    >
      <div className="space-y-6">
        {CONTACT_EMAIL && (
          <p className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/50 p-5 text-sm text-[var(--text-secondary)]">
            Prefer email? Write to <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-gold-300 hover:underline">{CONTACT_EMAIL}</a>.
          </p>
        )}
        <ContactForm />
        <p className="text-xs leading-relaxed text-[var(--text-secondary)]">We use the details you submit only to review and respond to your request. Please do not include passwords, payment information, or sensitive medical information.</p>
      </div>
    </InfoPageShell>
  );
}
