import mongoengine as me
from datetime import datetime, timezone

class Author(me.Document):
    display_name = me.StringField(required=True, max_length=200)
    email = me.EmailField(required=True, unique=True)
    avatar = me.StringField()
    bio = me.StringField()
    role = me.StringField(choices=['admin', 'editor', 'reader'], default='reader')
    created_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))
    updated_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))

    meta = {'collection': 'authors'}

    def __str__(self):
        return self.display_name

    def save(self, *args, **kwargs):
        self.updated_at = datetime.now(timezone.utc)
        return super().save(*args, **kwargs)

    def to_dict(self):
        return {
            'id': str(self.id),
            'displayName': self.display_name,
            'email': self.email,
            'avatar': self.avatar or '',
            'bio': self.bio or '',
            'role': self.role,
        }


class Article(me.Document):
    title = me.StringField(required=True, max_length=500)
    slug = me.StringField(required=True, unique=True, max_length=500)
    content = me.StringField()
    excerpt = me.StringField(max_length=500)
    featured_image = me.StringField()
    thumbnail = me.StringField()
    category_id = me.StringField(required=True)
    category_name = me.StringField()
    category_slug = me.StringField()
    category_color = me.StringField()
    category_icon = me.StringField()
    author_id = me.StringField(required=True)
    author_name = me.StringField()
    author_avatar = me.StringField()
    tags = me.ListField(me.StringField())
    read_time = me.IntField(default=5)
    is_published = me.BooleanField(default=False)
    is_featured = me.BooleanField(default=False)
    views_count = me.IntField(default=0)
    likes_count = me.IntField(default=0)
    liked_by = me.ListField(me.StringField())
    meta_title = me.StringField(max_length=500)
    meta_description = me.StringField(max_length=1000)
    created_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))
    updated_at = me.DateTimeField(default=lambda: datetime.now(timezone.utc))
    published_at = me.DateTimeField()

    meta = {
        'collection': 'articles',
        'ordering': ['-published_at'],
        'indexes': ['slug', 'category_id', 'is_published', 'is_featured', 'tags'],
    }

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.updated_at = datetime.now(timezone.utc)
        return super().save(*args, **kwargs)

    def to_list_dict(self):
        return {
            'id': str(self.id),
            'title': self.title,
            'slug': self.slug,
            'excerpt': self.excerpt,
            'featuredImage': self.featured_image or '',
            'thumbnail': self.thumbnail or '',
            'category': {
                'id': self.category_id,
                'name': self.category_name or '',
                'slug': self.category_slug or '',
                'color': self.category_color or '',
                'icon': self.category_icon or '',
            },
            'author': {
                'id': self.author_id,
                'displayName': self.author_name or '',
                'avatar': self.author_avatar or '',
            },
            'tags': self.tags,
            'readTime': self.read_time,
            'isFeatured': self.is_featured,
            'viewsCount': self.views_count,
            'likesCount': self.likes_count,
            'publishedAt': self.published_at.isoformat() if self.published_at else '',
        }
