import mongoengine as me
from datetime import datetime, timezone
from django.contrib.auth.hashers import make_password, check_password

class User(me.Document):
    username = me.StringField(required=True, unique=True, max_length=150)
    email = me.EmailField(required=True, unique=True)
    password = me.StringField(required=True)
    is_active = me.BooleanField(default=True)
    created_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))
    updated_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))

    meta = {
        'collection': 'users',
        'indexes': ['username', 'email'],
    }

    def __str__(self):
        return self.username

    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

class UserProfile(me.Document):
    user_id = me.StringField(required=True, unique=True)
    display_name = me.StringField(max_length=200)
    avatar = me.StringField()
    bio = me.StringField()
    bookmarks = me.ListField(me.StringField())
    reading_history = me.ListField(me.DictField())
    created_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))
    updated_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))

    meta = {
        'collection': 'user_profiles',
        'indexes': ['user_id'],
    }

    def __str__(self):
        return self.display_name or str(self.user_id)
