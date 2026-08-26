from datetime import datetime, timezone

import mongoengine as me


class ContactMessage(me.Document):
    SUBJECTS = (
        'editorial-correction',
        'source-or-credit',
        'privacy-request',
        'technical-issue',
        'general',
    )

    name = me.StringField(required=True, min_length=2, max_length=120)
    email = me.EmailField(required=True, max_length=254)
    subject = me.StringField(required=True, choices=SUBJECTS)
    message = me.StringField(required=True, min_length=10, max_length=5000)
    status = me.StringField(default='new', choices=('new', 'reviewing', 'resolved'))
    created_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))

    meta = {
        'collection': 'contact_messages',
        'indexes': ['status', '-created_at', 'email'],
    }

    def __str__(self):
        return f'{self.subject}: {self.email}'
