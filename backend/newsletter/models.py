import mongoengine as me
from datetime import datetime, timezone


class Subscriber(me.Document):
    email = me.EmailField(required=True, unique=True)
    is_active = me.BooleanField(default=True)
    created_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))

    meta = {
        'collection': 'newsletter_subscribers',
        'indexes': ['email'],
    }

    def __str__(self):
        return self.email

    def to_dict(self):
        return {
            'id': str(self.id),
            'email': self.email,
            'is_active': self.is_active,
            'subscribedAt': self.created_at.isoformat() if self.created_at else '',
        }
