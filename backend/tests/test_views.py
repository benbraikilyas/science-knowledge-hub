"""Tests for all API endpoints (views)."""
from datetime import datetime, timezone
from django.test import TestCase
from rest_framework.test import APIClient
import mongoengine

from articles.models import Article
from categories.models import Category
from scientists.models import Scientist
from authentication.models import User, UserProfile


class MongoTestCase(TestCase):
    def setUp(self):
        Article.drop_collection()
        Category.drop_collection()
        Scientist.drop_collection()
        User.drop_collection()
        UserProfile.drop_collection()
        self.client = APIClient()


class APIRootTest(MongoTestCase):
    def test_api_root(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('endpoints', data)
        self.assertIn('articles', data['endpoints'])


# ─── Articles ───

class ArticleListTest(MongoTestCase):
    def _make_article(self, **kwargs):
        cat_slug = kwargs.pop('_cat_slug', 'space')
        cat_name = kwargs.pop('_cat_name', 'Space')
        existing = Category.objects(slug=cat_slug).first()
        if not existing:
            cat = Category(name=cat_name, slug=cat_slug, icon='rocket', color='#fff')
            cat.save()
        else:
            cat = existing
        defaults = {
            'title': 'Test Article',
            'slug': 'test-article',
            'excerpt': 'Short excerpt',
            'category_id': str(cat.id),
            'category_name': cat.name,
            'category_slug': cat.slug,
            'author_id': 'author1',
            'author_name': 'Dr. Smith',
            'published_at': datetime.now(timezone.utc),
            'is_published': True,
        }
        defaults.update(kwargs)
        article = Article(**defaults)
        article.save()
        return article

    def test_list_empty(self):
        response = self.client.get('/api/v1/articles/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['results'], [])

    def test_list_articles(self):
        self._make_article(slug='art1', title='Art 1')
        self._make_article(slug='art2', title='Art 2', is_published=False)
        response = self.client.get('/api/v1/articles/')
        self.assertEqual(response.status_code, 200)
        data = response.json()['results']
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['title'], 'Art 1')

    def test_filter_by_category(self):
        cat1 = Category(name='Space', slug='space', icon='r', color='#fff')
        cat1.save()
        cat2 = Category(name='Bio', slug='bio', icon='d', color='#0f0')
        cat2.save()
        self._make_article(slug='space-art', category_id=str(cat1.id), category_slug='space')
        self._make_article(slug='bio-art', category_id=str(cat2.id), category_slug='bio')
        response = self.client.get('/api/v1/articles/?category=space')
        data = response.json()['results']
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['slug'], 'space-art')

    def test_filter_featured(self):
        self._make_article(slug='feat', is_featured=True)
        self._make_article(slug='not-feat', is_featured=False)
        response = self.client.get('/api/v1/articles/?featured=true')
        data = response.json()['results']
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['slug'], 'feat')

    def test_search(self):
        self._make_article(slug='quantum', title='Quantum Computing')
        self._make_article(slug='mars', title='Mars Exploration')
        response = self.client.get('/api/v1/articles/?search=quantum')
        data = response.json()['results']
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['slug'], 'quantum')

    def test_filter_by_tag(self):
        self._make_article(slug='tagged', tags=['ai', 'ml'])
        self._make_article(slug='untagged', tags=['space'])
        response = self.client.get('/api/v1/articles/?tag=ai')
        data = response.json()['results']
        self.assertEqual(len(data), 1)


class ArticleRetrieveTest(MongoTestCase):
    def _make_article(self, **kwargs):
        cat_slug = kwargs.pop('_cat_slug', 'space')
        cat_name = kwargs.pop('_cat_name', 'Space')
        existing = Category.objects(slug=cat_slug).first()
        if not existing:
            cat = Category(name=cat_name, slug=cat_slug, icon='rocket', color='#fff')
            cat.save()
        else:
            cat = existing
        defaults = {
            'title': 'Test Article',
            'slug': 'test-retrieve',
            'content': 'Full content body',
            'excerpt': 'Short excerpt',
            'category_id': str(cat.id),
            'category_name': cat.name,
            'category_slug': cat.slug,
            'author_id': 'author1',
            'author_name': 'Dr. Smith',
            'published_at': datetime.now(timezone.utc),
            'is_published': True,
        }
        defaults.update(kwargs)
        article = Article(**defaults)
        article.save()
        return article

    def test_retrieve_by_slug(self):
        article = self._make_article(slug='my-article')
        response = self.client.get('/api/v1/articles/my-article/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['title'], 'Test Article')
        self.assertEqual(data['content'], 'Full content body')

    def test_retrieve_increments_views(self):
        article = self._make_article(slug='view-test')
        self.assertEqual(article.views_count, 0)
        self.client.get(f'/api/v1/articles/{article.slug}/')
        article.reload()
        self.assertEqual(article.views_count, 1)
        self.client.get(f'/api/v1/articles/{article.slug}/')
        article.reload()
        self.assertEqual(article.views_count, 2)

    def test_retrieve_not_found(self):
        response = self.client.get('/api/v1/articles/nonexistent/')
        self.assertEqual(response.status_code, 404)

    def test_retrieve_unpublished_not_found(self):
        article = self._make_article(slug='unpublished', is_published=False)
        response = self.client.get(f'/api/v1/articles/{article.slug}/')
        self.assertEqual(response.status_code, 404)


class ArticleLikeTest(MongoTestCase):
    def test_like_article(self):
        cat = Category(name='Space', slug='space', icon='r', color='#fff')
        cat.save()
        article = Article(
            title='Like Me', slug='like-me', category_id=str(cat.id),
            author_id='a1', published_at=datetime.now(timezone.utc),
            likes_count=5,
        )
        article.save()
        response = self.client.post(f'/api/v1/articles/{article.id}/like/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['likesCount'], 6)

    def test_like_nonexistent(self):
        response = self.client.post('/api/v1/articles/000000000000000000000000/like/')
        self.assertEqual(response.status_code, 404)


class ArticleFeaturedTest(MongoTestCase):
    def test_featured(self):
        cat = Category(name='Space', slug='space', icon='r', color='#fff')
        cat.save()
        for i in range(8):
            Article(
                title=f'Art {i}', slug=f'feat-{i}',
                category_id=str(cat.id), author_id='a1',
                published_at=datetime.now(timezone.utc),
                is_published=True, is_featured=True,
            ).save()
        response = self.client.get('/api/v1/articles/featured/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 6)


class ArticleRelatedTest(MongoTestCase):
    def test_related(self):
        cat = Category(name='Space', slug='space', icon='r', color='#fff')
        cat.save()
        Article(
            title='Main', slug='main-art',
            category_id=str(cat.id), author_id='a1',
            published_at=datetime.now(timezone.utc), is_published=True,
        ).save()
        for i in range(3):
            Article(
                title=f'Related {i}', slug=f'related-{i}',
                category_id=str(cat.id), author_id='a1',
                published_at=datetime.now(timezone.utc), is_published=True,
            ).save()
        response = self.client.get('/api/v1/articles/related/?slug=main-art')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_related_no_slug(self):
        response = self.client.get('/api/v1/articles/related/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [])

    def test_related_nonexistent_slug(self):
        response = self.client.get('/api/v1/articles/related/?slug=nonexistent')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [])


# ─── Categories ───

class CategoryListTest(MongoTestCase):
    def test_list_empty(self):
        response = self.client.get('/api/v1/categories/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [])

    def test_list_categories(self):
        Category(name='Physics', slug='physics', icon='atom', color='#fff', order=1).save()
        Category(name='Bio', slug='bio', icon='dna', color='#0f0', order=2).save()
        response = self.client.get('/api/v1/categories/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 2)

    def test_only_active(self):
        Category(name='Active', slug='active', is_active=True).save()
        Category(name='Inactive', slug='inactive', is_active=False).save()
        response = self.client.get('/api/v1/categories/')
        data = response.json()
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['slug'], 'active')


class CategoryRetrieveTest(MongoTestCase):
    def test_retrieve_by_slug(self):
        Category(name='Physics', slug='physics-test').save()
        response = self.client.get('/api/v1/categories/physics-test/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['name'], 'Physics')

    def test_retrieve_not_found(self):
        response = self.client.get('/api/v1/categories/nonexistent/')
        self.assertEqual(response.status_code, 404)


# ─── Scientists ───

class ScientistListTest(MongoTestCase):
    def test_list_empty(self):
        response = self.client.get('/api/v1/scientists/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['results'], [])

    def test_list_scientists(self):
        Scientist(name='Einstein', slug='einstein-list', field='Physics', is_featured=True).save()
        Scientist(name='Darwin', slug='darwin-list', field='Biology').save()
        response = self.client.get('/api/v1/scientists/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()['results']), 2)

    def test_filter_featured(self):
        Scientist(name='E', slug='e-feat', is_featured=True).save()
        Scientist(name='D', slug='d-not-feat', is_featured=False).save()
        response = self.client.get('/api/v1/scientists/?featured=true')
        data = response.json()['results']
        self.assertEqual(len(data), 1)

    def test_filter_by_field(self):
        Scientist(name='E', slug='e-field', field='Physics').save()
        Scientist(name='D', slug='d-field', field='Biology').save()
        response = self.client.get('/api/v1/scientists/?field=Physics')
        data = response.json()['results']
        self.assertEqual(len(data), 1)

    def test_search(self):
        Scientist(name='Albert Einstein', slug='search-einstein').save()
        Scientist(name='Charles Darwin', slug='search-darwin').save()
        response = self.client.get('/api/v1/scientists/?search=Albert')
        data = response.json()['results']
        self.assertEqual(len(data), 1)


class ScientistRetrieveTest(MongoTestCase):
    def test_retrieve_by_slug(self):
        Scientist(name='Einstein', slug='retrieve-einstein', biography='Physicist').save()
        response = self.client.get('/api/v1/scientists/retrieve-einstein/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['name'], 'Einstein')
        self.assertEqual(data['biography'], 'Physicist')

    def test_retrieve_not_found(self):
        response = self.client.get('/api/v1/scientists/nonexistent/')
        self.assertEqual(response.status_code, 404)


class ScientistFeaturedTest(MongoTestCase):
    def test_featured(self):
        for i in range(8):
            Scientist(name=f'S {i}', slug=f'featured-{i}', is_featured=True).save()
        response = self.client.get('/api/v1/scientists/featured/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 6)


# ─── Authentication ───

class RegisterTest(MongoTestCase):
    def test_register_success(self):
        response = self.client.post('/api/v1/auth/register/', {
            'username': 'newuser',
            'email': 'new@example.com',
            'password': 'secret123',
        }, format='json')
        self.assertEqual(response.status_code, 201)
        data = response.json()
        self.assertIn('access', data)
        self.assertIn('refresh', data)
        self.assertIn('user', data)
        self.assertEqual(data['user']['username'], 'newuser')

    def test_register_missing_fields(self):
        response = self.client.post('/api/v1/auth/register/', {}, format='json')
        self.assertEqual(response.status_code, 400)

    def test_register_short_password(self):
        response = self.client.post('/api/v1/auth/register/', {
            'username': 'u1', 'email': 'u1@x.com', 'password': '123',
        }, format='json')
        self.assertEqual(response.status_code, 400)

    def test_register_duplicate_username(self):
        self.client.post('/api/v1/auth/register/', {
            'username': 'dup', 'email': 'a@a.com', 'password': 'pass123',
        }, format='json')
        response = self.client.post('/api/v1/auth/register/', {
            'username': 'dup', 'email': 'b@b.com', 'password': 'pass123',
        }, format='json')
        self.assertEqual(response.status_code, 400)


class LoginTest(MongoTestCase):
    def _register(self):
        self.client.post('/api/v1/auth/register/', {
            'username': 'logintest', 'email': 'login@test.com', 'password': 'pass123',
        }, format='json')

    def test_login_with_username(self):
        self._register()
        response = self.client.post('/api/v1/auth/login/', {
            'username': 'logintest', 'password': 'pass123',
        }, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.json())

    def test_login_with_email(self):
        self._register()
        response = self.client.post('/api/v1/auth/login/', {
            'email': 'login@test.com', 'password': 'pass123',
        }, format='json')
        self.assertEqual(response.status_code, 200)

    def test_login_wrong_password(self):
        self._register()
        response = self.client.post('/api/v1/auth/login/', {
            'username': 'logintest', 'password': 'wrongpass',
        }, format='json')
        self.assertEqual(response.status_code, 401)

    def test_login_nonexistent_user(self):
        response = self.client.post('/api/v1/auth/login/', {
            'username': 'ghost', 'password': 'pass123',
        }, format='json')
        self.assertEqual(response.status_code, 401)

    def test_login_missing_fields(self):
        response = self.client.post('/api/v1/auth/login/', {}, format='json')
        self.assertEqual(response.status_code, 400)


class RefreshTokenTest(MongoTestCase):
    def _get_refresh_token(self):
        resp = self.client.post('/api/v1/auth/register/', {
            'username': 'refreshuser', 'email': 'refresh@test.com', 'password': 'pass123',
        }, format='json')
        return resp.json()['refresh']

    def test_refresh_success(self):
        refresh = self._get_refresh_token()
        response = self.client.post('/api/v1/auth/refresh/', {'refresh': refresh}, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.json())

    def test_refresh_missing_token(self):
        response = self.client.post('/api/v1/auth/refresh/', {}, format='json')
        self.assertEqual(response.status_code, 400)

    def test_refresh_invalid_token(self):
        response = self.client.post('/api/v1/auth/refresh/', {'refresh': 'invalid'}, format='json')
        self.assertEqual(response.status_code, 401)


class ProfileTest(MongoTestCase):
    def _get_token(self):
        resp = self.client.post('/api/v1/auth/register/', {
            'username': 'profileuser', 'email': 'profile@test.com', 'password': 'pass123',
        }, format='json')
        return resp.json()['access']

    def test_get_profile(self):
        token = self._get_token()
        response = self.client.get('/api/v1/auth/profile/', HTTP_AUTHORIZATION=f'Bearer {token}')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('userId', data)
        self.assertIsNotNone(data['userId'])

    def test_update_profile(self):
        token = self._get_token()
        response = self.client.patch('/api/v1/auth/profile/', {
            'displayName': 'New Name', 'bio': 'New bio',
        }, format='json', HTTP_AUTHORIZATION=f'Bearer {token}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['displayName'], 'New Name')

    def test_profile_unauthenticated(self):
        response = self.client.get('/api/v1/auth/profile/')
        self.assertEqual(response.status_code, 401)


class BookmarksTest(MongoTestCase):
    def _get_token(self):
        resp = self.client.post('/api/v1/auth/register/', {
            'username': 'bmuser', 'email': 'bm@test.com', 'password': 'pass123',
        }, format='json')
        return resp.json()['access']

    def test_add_bookmark(self):
        token = self._get_token()
        response = self.client.post('/api/v1/auth/bookmarks/', {
            'articleId': 'art123',
        }, format='json', HTTP_AUTHORIZATION=f'Bearer {token}')
        self.assertEqual(response.status_code, 200)
        self.assertIn('art123', response.json()['bookmarks'])

    def test_toggle_bookmark_off(self):
        token = self._get_token()
        self.client.post('/api/v1/auth/bookmarks/', {'articleId': 'art1'}, format='json',
                         HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.post('/api/v1/auth/bookmarks/', {'articleId': 'art1'}, format='json',
                                    HTTP_AUTHORIZATION=f'Bearer {token}')
        self.assertNotIn('art1', response.json()['bookmarks'])

    def test_get_bookmarks(self):
        token = self._get_token()
        self.client.post('/api/v1/auth/bookmarks/', {'articleId': 'art1'}, format='json',
                         HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.get('/api/v1/auth/bookmarks/', HTTP_AUTHORIZATION=f'Bearer {token}')
        self.assertEqual(response.status_code, 200)
        self.assertIn('art1', response.json()['bookmarks'])

    def test_bookmarks_unauthenticated(self):
        response = self.client.get('/api/v1/auth/bookmarks/')
        self.assertEqual(response.status_code, 401)

    def test_bookmark_missing_article_id(self):
        token = self._get_token()
        response = self.client.post('/api/v1/auth/bookmarks/', {}, format='json',
                                    HTTP_AUTHORIZATION=f'Bearer {token}')
        self.assertEqual(response.status_code, 400)


class ReadingHistoryTest(MongoTestCase):
    def _get_token(self):
        resp = self.client.post('/api/v1/auth/register/', {
            'username': 'rhuser', 'email': 'rh@test.com', 'password': 'pass123',
        }, format='json')
        return resp.json()['access']

    def test_add_reading_history(self):
        token = self._get_token()
        response = self.client.post('/api/v1/auth/reading-history/', {
            'articleId': 'art1', 'title': 'Test Article',
        }, format='json', HTTP_AUTHORIZATION=f'Bearer {token}')
        self.assertEqual(response.status_code, 200)
        history = response.json()['readingHistory']
        self.assertEqual(len(history), 1)
        self.assertEqual(history[0]['articleId'], 'art1')

    def test_get_reading_history(self):
        token = self._get_token()
        self.client.post('/api/v1/auth/reading-history/', {
            'articleId': 'art1', 'title': 'T',
        }, format='json', HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.get('/api/v1/auth/reading-history/', HTTP_AUTHORIZATION=f'Bearer {token}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()['readingHistory']), 1)

    def test_reading_history_deduplication(self):
        token = self._get_token()
        self.client.post('/api/v1/auth/reading-history/', {
            'articleId': 'art1', 'title': 'V1',
        }, format='json', HTTP_AUTHORIZATION=f'Bearer {token}')
        self.client.post('/api/v1/auth/reading-history/', {
            'articleId': 'art1', 'title': 'V2',
        }, format='json', HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.get('/api/v1/auth/reading-history/', HTTP_AUTHORIZATION=f'Bearer {token}')
        history = response.json()['readingHistory']
        self.assertEqual(len(history), 1)
        self.assertEqual(history[0]['title'], 'V2')

    def test_reading_history_unauthenticated(self):
        response = self.client.get('/api/v1/auth/reading-history/')
        self.assertEqual(response.status_code, 401)
