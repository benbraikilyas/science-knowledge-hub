"""Tests for URL resolution."""
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


class URLResolutionTest(MongoTestCase):
    def test_api_root(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)

    def test_articles_list_url(self):
        response = self.client.get('/api/v1/articles/')
        self.assertEqual(response.status_code, 200)

    def test_articles_featured_url(self):
        response = self.client.get('/api/v1/articles/featured/')
        self.assertEqual(response.status_code, 200)

    def test_articles_related_url(self):
        response = self.client.get('/api/v1/articles/related/')
        self.assertEqual(response.status_code, 200)

    def test_articles_detail_url(self):
        response = self.client.get('/api/v1/articles/some-slug/')
        self.assertIn(response.status_code, [200, 404])

    def test_articles_like_url(self):
        response = self.client.post('/api/v1/articles/someid/like/')
        self.assertIn(response.status_code, [200, 404])

    def test_categories_list_url(self):
        response = self.client.get('/api/v1/categories/')
        self.assertEqual(response.status_code, 200)

    def test_categories_detail_url(self):
        response = self.client.get('/api/v1/categories/physics/')
        self.assertIn(response.status_code, [200, 404])

    def test_scientists_list_url(self):
        response = self.client.get('/api/v1/scientists/')
        self.assertEqual(response.status_code, 200)

    def test_scientists_featured_url(self):
        response = self.client.get('/api/v1/scientists/featured/')
        self.assertEqual(response.status_code, 200)

    def test_scientists_detail_url(self):
        response = self.client.get('/api/v1/scientists/einstein/')
        self.assertIn(response.status_code, [200, 404])

    def test_auth_root_url(self):
        response = self.client.get('/api/v1/auth/')
        self.assertEqual(response.status_code, 200)

    def test_auth_register_url(self):
        response = self.client.post('/api/v1/auth/register/', {}, format='json')
        self.assertIn(response.status_code, [200, 201, 400])

    def test_auth_login_url(self):
        response = self.client.post('/api/v1/auth/login/', {}, format='json')
        self.assertIn(response.status_code, [200, 400, 401])

    def test_auth_refresh_url(self):
        response = self.client.post('/api/v1/auth/refresh/', {}, format='json')
        self.assertIn(response.status_code, [200, 400, 401])

    def test_auth_profile_url(self):
        response = self.client.get('/api/v1/auth/profile/')
        self.assertEqual(response.status_code, 401)

    def test_auth_bookmarks_url(self):
        response = self.client.get('/api/v1/auth/bookmarks/')
        self.assertEqual(response.status_code, 401)

    def test_auth_reading_history_url(self):
        response = self.client.get('/api/v1/auth/reading-history/')
        self.assertEqual(response.status_code, 401)

    def test_nonexistent_url(self):
        response = self.client.get('/api/v1/nonexistent/')
        self.assertEqual(response.status_code, 404)
