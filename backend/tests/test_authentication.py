"""Tests for authentication & authorization."""
from datetime import datetime, timezone
from django.test import TestCase
from rest_framework.test import APIClient
import mongoengine

from authentication.models import User, UserProfile
from articles.models import Article
from categories.models import Category


class MongoTestCase(TestCase):
    def setUp(self):
        User.drop_collection()
        UserProfile.drop_collection()
        Article.drop_collection()
        Category.drop_collection()
        self.client = APIClient()

    def _register_and_get_token(self, username='testuser', email='test@test.com'):
        resp = self.client.post('/api/v1/auth/register/', {
            'username': username, 'email': email, 'password': 'pass123',
        }, format='json')
        return resp.json()['access']


class AuthenticationTest(MongoTestCase):
    def test_token_required_for_profile(self):
        response = self.client.get('/api/v1/auth/profile/')
        self.assertEqual(response.status_code, 401)

    def test_token_required_for_bookmarks(self):
        response = self.client.get('/api/v1/auth/bookmarks/')
        self.assertEqual(response.status_code, 401)

    def test_token_required_for_reading_history(self):
        response = self.client.get('/api/v1/auth/reading-history/')
        self.assertEqual(response.status_code, 401)

    def test_valid_token_grants_access(self):
        token = self._register_and_get_token()
        response = self.client.get('/api/v1/auth/profile/', HTTP_AUTHORIZATION=f'Bearer {token}')
        self.assertEqual(response.status_code, 200)

    def test_invalid_token_rejected(self):
        response = self.client.get('/api/v1/auth/profile/', HTTP_AUTHORIZATION='Bearer invalidtoken')
        self.assertEqual(response.status_code, 401)

    def test_malformed_auth_header(self):
        response = self.client.get('/api/v1/auth/profile/', HTTP_AUTHORIZATION='Token abc')
        self.assertEqual(response.status_code, 401)

    def test_empty_auth_header(self):
        response = self.client.get('/api/v1/auth/profile/', HTTP_AUTHORIZATION='')
        self.assertEqual(response.status_code, 401)


class AuthorizationTest(MongoTestCase):
    def test_user_a_cannot_see_user_b_profile(self):
        token_a = self._register_and_get_token('userA', 'a@test.com')
        token_b = self._register_and_get_token('userB', 'b@test.com')

        resp_a = self.client.get('/api/v1/auth/profile/', HTTP_AUTHORIZATION=f'Bearer {token_a}')
        resp_b = self.client.get('/api/v1/auth/profile/', HTTP_AUTHORIZATION=f'Bearer {token_b}')

        self.assertNotEqual(resp_a.json()['userId'], resp_b.json()['userId'])

    def test_user_a_bookmarks_dont_appear_for_user_b(self):
        token_a = self._register_and_get_token('userA2', 'a2@test.com')
        token_b = self._register_and_get_token('userB2', 'b2@test.com')

        self.client.post('/api/v1/auth/bookmarks/', {'articleId': 'art_a'},
                         format='json', HTTP_AUTHORIZATION=f'Bearer {token_a}')

        resp_b = self.client.get('/api/v1/auth/bookmarks/', HTTP_AUTHORIZATION=f'Bearer {token_b}')
        self.assertNotIn('art_a', resp_b.json()['bookmarks'])

    def test_inactive_user_rejected(self):
        user = User(username='inactive', email='inactive@test.com', is_active=False)
        user.set_password('pass123')
        user.save()

        response = self.client.post('/api/v1/auth/login/', {
            'username': 'inactive', 'password': 'pass123',
        }, format='json')
        self.assertEqual(response.status_code, 401)


class ContentAccessTest(MongoTestCase):
    def test_content_endpoints_public(self):
        cat = Category(name='Space', slug='space', icon='r', color='#fff')
        cat.save()
        Article(
            title='Public Art', slug='public-art',
            category_id=str(cat.id), author_id='a1',
            published_at=datetime.now(timezone.utc), is_published=True,
        ).save()

        endpoints = [
            '/api/v1/articles/',
            '/api/v1/articles/featured/',
            '/api/v1/articles/public-art/',
            '/api/v1/categories/',
            '/api/v1/categories/space/',
            '/api/v1/scientists/',
            '/api/v1/scientists/featured/',
        ]
        for url in endpoints:
            response = self.client.get(url)
            self.assertIn(response.status_code, [200, 404],
                          f'{url} returned {response.status_code}')

    def test_like_requires_no_auth(self):
        cat = Category(name='Space', slug='space', icon='r', color='#fff')
        cat.save()
        article = Article(
            title='Like Art', slug='like-art',
            category_id=str(cat.id), author_id='a1',
            published_at=datetime.now(timezone.utc),
        )
        article.save()
        response = self.client.post(f'/api/v1/articles/{article.id}/like/')
        self.assertEqual(response.status_code, 200)


class PasswordSecurityTest(MongoTestCase):
    def test_password_not_in_register_response(self):
        response = self.client.post('/api/v1/auth/register/', {
            'username': 'secuser', 'email': 'sec@test.com', 'password': 'pass123',
        }, format='json')
        data = response.json()
        self.assertNotIn('password', data)
        self.assertNotIn('password_hash', data)
        if 'user' in data:
            self.assertNotIn('password', data['user'])

    def test_password_not_in_login_response(self):
        self.client.post('/api/v1/auth/register/', {
            'username': 'seclogin', 'email': 'seclogin@test.com', 'password': 'pass123',
        }, format='json')
        response = self.client.post('/api/v1/auth/login/', {
            'username': 'seclogin', 'password': 'pass123',
        }, format='json')
        data = response.json()
        self.assertNotIn('password', data)

    def test_password_hashed_in_database(self):
        self.client.post('/api/v1/auth/register/', {
            'username': 'hashuser', 'email': 'hash@test.com', 'password': 'mypassword',
        }, format='json')
        user = User.objects(username='hashuser').first()
        self.assertIsNotNone(user)
        self.assertNotEqual(user.password, 'mypassword')
        self.assertTrue(user.password.startswith('pbkdf2_') or user.password.startswith('$'))
