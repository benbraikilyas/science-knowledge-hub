from rest_framework import status
from rest_framework.test import APITestCase

from .models import ContactMessage


class ContactMessageTests(APITestCase):
    url = '/api/v1/contact/'

    def tearDown(self):
        ContactMessage.drop_collection()

    def test_valid_message_is_stored(self):
        response = self.client.post(
            self.url,
            {
                'name': 'Curious Reader',
                'email': 'reader@example.com',
                'subject': 'editorial-correction',
                'message': 'Please review the date on this scientist profile.',
                'privacyAccepted': True,
            },
            format='json',
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 1)

    def test_invalid_email_is_rejected(self):
        response = self.client.post(
            self.url,
            {
                'name': 'Curious Reader',
                'email': 'not-an-email',
                'subject': 'general',
                'message': 'This is a sufficiently long message.',
                'privacyAccepted': True,
            },
            format='json',
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(ContactMessage.objects.count(), 0)

    def test_honeypot_submission_is_not_stored(self):
        response = self.client.post(
            self.url,
            {
                'name': 'Automated Bot',
                'email': 'bot@example.com',
                'subject': 'general',
                'message': 'This message should not be stored.',
                'privacyAccepted': True,
                'website': 'https://spam.example',
            },
            format='json',
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 0)
