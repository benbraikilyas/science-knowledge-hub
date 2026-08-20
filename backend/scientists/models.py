import mongoengine as me
from datetime import datetime, timezone

class Scientist(me.Document):
    name = me.StringField(required=True, max_length=300)
    slug = me.StringField(required=True, unique=True, max_length=300)
    portrait_image = me.StringField()
    birth_date = me.StringField()
    death_date = me.StringField()
    nationality = me.StringField(max_length=200)
    era = me.StringField(max_length=200)
    field = me.StringField(max_length=200)
    biography = me.StringField()
    key_contributions = me.ListField(me.StringField())
    famous_quotes = me.ListField(me.StringField())
    awards = me.ListField(me.StringField())
    is_featured = me.BooleanField(default=False)
    created_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))
    updated_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))

    meta = {
        'collection': 'scientists',
        'ordering': ['name'],
        'indexes': ['slug', 'is_featured', 'field'],
    }

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.updated_at = datetime.now(timezone.utc)
        return super().save(*args, **kwargs)

    def to_list_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'slug': self.slug,
            'portraitImage': self.portrait_image or '',
            'birthDate': self.birth_date or '',
            'deathDate': self.death_date or '',
            'nationality': self.nationality or '',
            'era': self.era or '',
            'field': self.field or '',
            'isFeatured': self.is_featured,
        }

    def to_detail_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'slug': self.slug,
            'portraitImage': self.portrait_image or '',
            'birthDate': self.birth_date or '',
            'deathDate': self.death_date or '',
            'nationality': self.nationality or '',
            'era': self.era or '',
            'field': self.field or '',
            'biography': self.biography or '',
            'keyContributions': self.key_contributions or [],
            'famousQuotes': self.famous_quotes or [],
            'awards': self.awards or [],
            'isFeatured': self.is_featured,
            'createdAt': self.created_at.isoformat() if self.created_at else '',
            'updatedAt': self.updated_at.isoformat() if self.updated_at else '',
        }
