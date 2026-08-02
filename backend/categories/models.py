import mongoengine as me
from datetime import datetime, timezone

class Category(me.Document):
    name = me.StringField(required=True, max_length=200)
    slug = me.StringField(required=True, unique=True, max_length=200)
    description = me.StringField(max_length=500)
    icon = me.StringField(max_length=50)
    color = me.StringField(max_length=50)
    gradient = me.StringField(max_length=200)
    parent = me.ReferenceField('self', null=True)
    order = me.IntField(default=0)
    is_active = me.BooleanField(default=True)
    article_count = me.IntField(default=0)
    created_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))
    updated_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))

    meta = {
        'collection': 'categories',
        'ordering': ['order'],
        'indexes': ['slug', 'is_active'],
    }

    def __str__(self):
        return self.name

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'slug': self.slug,
            'description': self.description,
            'icon': self.icon,
            'color': self.color,
            'gradient': self.gradient,
            'order': self.order,
            'isActive': self.is_active,
            'articleCount': self.article_count,
        }
