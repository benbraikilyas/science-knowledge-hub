"""Tests for all MongoEngine models."""
from datetime import datetime, timezone
from django.test import TestCase
import mongoengine

from articles.models import Article, Author
from categories.models import Category
from scientists.models import Scientist
from authentication.models import User, UserProfile


class MongoTestCase(TestCase):
    def setUp(self):
        Article.drop_collection()
        Author.drop_collection()
        Category.drop_collection()
        Scientist.drop_collection()
        User.drop_collection()
        UserProfile.drop_collection()


class UserModelTest(MongoTestCase):
    def test_create_user(self):
        user = User(username='testuser', email='test@example.com')
        user.set_password('secret123')
        user.save()
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.email, 'test@example.com')
        self.assertTrue(user.is_active)
        self.assertIsNotNone(user.created_at)
        self.assertIsNotNone(user.id)

    def test_str(self):
        user = User(username='testuser', email='test@example.com')
        user.set_password('secret123')
        user.save()
        self.assertEqual(str(user), 'testuser')

    def test_password_hashing(self):
        user = User(username='testuser', email='test@example.com')
        user.set_password('secret123')
        user.save()
        self.assertNotEqual(user.password, 'secret123')
        self.assertTrue(user.check_password('secret123'))
        self.assertFalse(user.check_password('wrongpassword'))

    def test_is_authenticated_property(self):
        user = User(username='testuser', email='test@example.com')
        user.set_password('secret123')
        user.save()
        self.assertTrue(user.is_authenticated)
        self.assertFalse(user.is_anonymous)

    def test_unique_username(self):
        u1 = User(username='testuser', email='a@a.com')
        u1.set_password('pass1')
        u1.save()
        with self.assertRaises(Exception):
            u2 = User(username='testuser', email='b@b.com')
            u2.set_password('pass2')
            u2.save()

    def test_unique_email(self):
        u1 = User(username='user1', email='same@example.com')
        u1.set_password('pass1')
        u1.save()
        with self.assertRaises(Exception):
            u2 = User(username='user2', email='same@example.com')
            u2.set_password('pass2')
            u2.save()

    def test_required_fields(self):
        with self.assertRaises(Exception):
            User().save()

    def test_inactive_user(self):
        user = User(username='inactive', email='i@i.com', is_active=False)
        user.set_password('pass')
        user.save()
        self.assertFalse(user.is_active)


class UserProfileModelTest(MongoTestCase):
    def test_create_profile(self):
        profile = UserProfile(user_id='123', display_name='Test User')
        profile.save()
        self.assertEqual(profile.user_id, '123')
        self.assertEqual(profile.display_name, 'Test User')
        self.assertEqual(profile.bookmarks, [])
        self.assertEqual(profile.reading_history, [])

    def test_str_with_display_name(self):
        profile = UserProfile(user_id='123', display_name='Test User')
        profile.save()
        self.assertEqual(str(profile), 'Test User')

    def test_str_without_display_name(self):
        profile = UserProfile(user_id='123')
        profile.save()
        self.assertEqual(str(profile), '123')

    def test_unique_user_id(self):
        UserProfile(user_id='123', display_name='A').save()
        with self.assertRaises(Exception):
            UserProfile(user_id='123', display_name='B').save()

    def test_bookmarks(self):
        profile = UserProfile(user_id='123', bookmarks=['art1', 'art2'])
        profile.save()
        loaded = UserProfile.objects(user_id='123').first()
        self.assertEqual(loaded.bookmarks, ['art1', 'art2'])

    def test_reading_history(self):
        history = [{'articleId': 'a1', 'title': 'Test', 'readAt': '2026-01-01T00:00:00'}]
        profile = UserProfile(user_id='123', reading_history=history)
        profile.save()
        loaded = UserProfile.objects(user_id='123').first()
        self.assertEqual(len(loaded.reading_history), 1)
        self.assertEqual(loaded.reading_history[0]['articleId'], 'a1')


class AuthorModelTest(MongoTestCase):
    def test_create_author(self):
        author = Author(display_name='Dr. Smith', email='smith@example.com')
        author.save()
        self.assertEqual(author.display_name, 'Dr. Smith')
        self.assertEqual(author.role, 'reader')

    def test_str(self):
        author = Author(display_name='Dr. Smith', email='smith@example.com')
        author.save()
        self.assertEqual(str(author), 'Dr. Smith')

    def test_to_dict(self):
        author = Author(display_name='Dr. Smith', email='smith@example.com', role='editor')
        author.save()
        d = author.to_dict()
        self.assertEqual(d['displayName'], 'Dr. Smith')
        self.assertEqual(d['email'], 'smith@example.com')
        self.assertEqual(d['role'], 'editor')
        self.assertIn('id', d)

    def test_unique_email(self):
        Author(display_name='A', email='dup@example.com').save()
        with self.assertRaises(Exception):
            Author(display_name='B', email='dup@example.com').save()

    def test_role_choices(self):
        author = Author(display_name='Admin', email='admin@example.com', role='admin')
        author.save()
        self.assertEqual(author.role, 'admin')


class CategoryModelTest(MongoTestCase):
    def test_create_category(self):
        cat = Category(name='Physics', slug='physics', description='Study of matter')
        cat.save()
        self.assertEqual(cat.name, 'Physics')
        self.assertEqual(cat.slug, 'physics')
        self.assertTrue(cat.is_active)
        self.assertEqual(cat.article_count, 0)
        self.assertEqual(cat.order, 0)

    def test_str(self):
        cat = Category(name='Physics', slug='physics')
        cat.save()
        self.assertEqual(str(cat), 'Physics')

    def test_to_dict(self):
        cat = Category(name='Physics', slug='physics', icon='atom', color='#fff', gradient='linear', order=1)
        cat.save()
        d = cat.to_dict()
        self.assertEqual(d['name'], 'Physics')
        self.assertEqual(d['icon'], 'atom')
        self.assertTrue(d['isActive'])

    def test_unique_slug(self):
        Category(name='Physics', slug='physics').save()
        with self.assertRaises(Exception):
            Category(name='Physics 2', slug='physics').save()

    def test_parent_reference(self):
        parent = Category(name='Science', slug='science')
        parent.save()
        child = Category(name='Physics', slug='physics', parent=parent)
        child.save()
        self.assertEqual(child.parent.id, parent.id)

    def test_slug_index(self):
        cat = Category(name='Physics', slug='physics-indexed')
        cat.save()
        results = Category.objects(slug='physics-indexed')
        self.assertEqual(len(results), 1)


class ArticleModelTest(MongoTestCase):
    def _make_category(self):
        cat = Category(name='Space', slug='space', icon='rocket', color='#fff')
        cat.save()
        return cat

    def test_create_article(self):
        cat = self._make_category()
        article = Article(
            title='Mars Discovery',
            slug='mars-discovery',
            content='Full content here',
            excerpt='Short excerpt',
            category_id=str(cat.id),
            category_name=cat.name,
            category_slug=cat.slug,
            author_id='author1',
            author_name='Dr. Smith',
            published_at=datetime.now(timezone.utc),
            is_published=True,
            is_featured=True,
        )
        article.save()
        self.assertEqual(article.title, 'Mars Discovery')
        self.assertEqual(article.slug, 'mars-discovery')
        self.assertTrue(article.is_published)
        self.assertTrue(article.is_featured)
        self.assertEqual(article.views_count, 0)
        self.assertEqual(article.likes_count, 0)
        self.assertEqual(article.read_time, 5)

    def test_str(self):
        cat = self._make_category()
        article = Article(
            title='Mars Discovery',
            slug='mars-discovery',
            category_id=str(cat.id),
            author_id='author1',
            published_at=datetime.now(timezone.utc),
        )
        article.save()
        self.assertEqual(str(article), 'Mars Discovery')

    def test_unique_slug(self):
        cat = self._make_category()
        now = datetime.now(timezone.utc)
        Article(title='A', slug='dup', category_id=str(cat.id), author_id='a1', published_at=now).save()
        with self.assertRaises(Exception):
            Article(title='B', slug='dup', category_id=str(cat.id), author_id='a1', published_at=now).save()

    def test_to_list_dict(self):
        cat = self._make_category()
        article = Article(
            title='Mars Discovery',
            slug='mars-discovery',
            excerpt='Short',
            category_id=str(cat.id),
            category_name='Space',
            category_slug='space',
            category_color='#fff',
            category_icon='rocket',
            author_id='a1',
            author_name='Dr. Smith',
            tags=['mars', 'space'],
            published_at=datetime.now(timezone.utc),
            is_featured=True,
            views_count=100,
            likes_count=25,
        )
        article.save()
        d = article.to_list_dict()
        self.assertEqual(d['title'], 'Mars Discovery')
        self.assertEqual(d['category']['name'], 'Space')
        self.assertEqual(d['author']['displayName'], 'Dr. Smith')
        self.assertEqual(d['tags'], ['mars', 'space'])
        self.assertEqual(d['viewsCount'], 100)
        self.assertIn('publishedAt', d)

    def test_default_values(self):
        cat = self._make_category()
        article = Article(
            title='Test',
            slug='test-defaults',
            category_id=str(cat.id),
            author_id='a1',
            published_at=datetime.now(timezone.utc),
        )
        article.save()
        self.assertFalse(article.is_published)
        self.assertFalse(article.is_featured)
        self.assertEqual(article.read_time, 5)
        self.assertEqual(article.views_count, 0)
        self.assertEqual(article.likes_count, 0)

    def test_published_at_nullable(self):
        cat = self._make_category()
        article = Article(title='No Date', slug='no-date', category_id=str(cat.id), author_id='a1')
        article.save()
        self.assertIsNone(article.published_at)

    def test_tags_field(self):
        cat = self._make_category()
        article = Article(
            title='Tagged',
            slug='tagged',
            category_id=str(cat.id),
            author_id='a1',
            published_at=datetime.now(timezone.utc),
            tags=['ai', 'ml', 'deep-learning'],
        )
        article.save()
        self.assertEqual(len(article.tags), 3)

    def test_slug_index(self):
        cat = self._make_category()
        Article(title='A', slug='indexed-art', category_id=str(cat.id), author_id='a1', published_at=datetime.now(timezone.utc)).save()
        results = Article.objects(slug='indexed-art')
        self.assertEqual(len(results), 1)


class ScientistModelTest(MongoTestCase):
    def test_create_scientist(self):
        s = Scientist(
            name='Albert Einstein',
            slug='albert-einstein',
            nationality='German',
            era='Modern',
            field='Physics',
            biography='Revolutionary physicist.',
            key_contributions=['Special Relativity', 'General Relativity'],
            famous_quotes=['E=mc²'],
            awards=['Nobel Prize'],
            is_featured=True,
        )
        s.save()
        self.assertEqual(s.name, 'Albert Einstein')
        self.assertTrue(s.is_featured)
        self.assertEqual(len(s.key_contributions), 2)

    def test_str(self):
        s = Scientist(name='Albert Einstein', slug='albert-einstein')
        s.save()
        self.assertEqual(str(s), 'Albert Einstein')

    def test_unique_slug(self):
        Scientist(name='A', slug='dup-slug').save()
        with self.assertRaises(Exception):
            Scientist(name='B', slug='dup-slug').save()

    def test_to_list_dict(self):
        s = Scientist(
            name='Einstein', slug='einstein',
            nationality='German', era='Modern', field='Physics',
            is_featured=True,
        )
        s.save()
        d = s.to_list_dict()
        self.assertEqual(d['name'], 'Einstein')
        self.assertTrue(d['isFeatured'])
        self.assertNotIn('biography', d)

    def test_to_detail_dict(self):
        s = Scientist(
            name='Einstein', slug='einstein-detail',
            biography='A physicist.', is_featured=True,
            key_contributions=['Relativity'], famous_quotes=['E=mc²'],
            awards=['Nobel'],
        )
        s.save()
        d = s.to_detail_dict()
        self.assertEqual(d['biography'], 'A physicist.')
        self.assertIn('keyContributions', d)
        self.assertIn('createdAt', d)

    def test_empty_optional_fields(self):
        s = Scientist(name='Minimal', slug='minimal')
        s.save()
        d = s.to_list_dict()
        self.assertEqual(d['portraitImage'], '')
        self.assertEqual(d['nationality'], '')
        self.assertEqual(d['field'], '')

    def test_slug_index(self):
        Scientist(name='A', slug='sci-indexed').save()
        results = Scientist.objects(slug='sci-indexed')
        self.assertEqual(len(results), 1)

    def test_field_index(self):
        Scientist(name='A', slug='field-a', field='Physics').save()
        Scientist(name='B', slug='field-b', field='Biology').save()
        results = Scientist.objects(field='Physics')
        self.assertEqual(len(results), 1)
