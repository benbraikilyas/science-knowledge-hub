import InfoPageShell from '@/components/InfoPageShell';
import UnsubscribeForm from '@/components/UnsubscribeForm';

export const metadata = {
  title: 'Unsubscribe',
  description: 'Unsubscribe an email address from the Science Knowledge Hub newsletter.',
  robots: { index: false, follow: true },
};

export default function UnsubscribePage() {
  return (
    <InfoPageShell
      eyebrow="Newsletter Preferences"
      title="Unsubscribe from email updates"
      description="Enter the same email address you used to subscribe. We will stop future newsletter messages to that address."
    >
      <UnsubscribeForm />
    </InfoPageShell>
  );
}
