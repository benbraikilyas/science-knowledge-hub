"""Tests for error handling and edge cases."""
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


class InvalidJSONTest(MongoTestCase):
    def test_invalid_json_body(self):
        response = self.client.post('/api/v1/auth/register/',
                                    data='not json',
                                    content_type='application/json')
        self.assertIn(response.status_code, [400, 415])

    def test_empty_body(self):
        response = self.client.post('/api/v1/auth/register/',
                                    data='',
                                    content_type='application/json')
        self.assertIn(response.status_code, [400, 415])


class MethodNotAllowedTest(MongoTestCase):
    def test_post_on_list_articles(self):
        response = self.client.post('/api/v1/articles/', {}, format='json')
        self.assertEqual(response.status_code, 405)

    def test_put_on_categories(self):
        response = self.client.put('/api/v1/categories/', {}, format='json')
        self.assertEqual(response.status_code, 405)

    def test_delete_on_articles(self):
        response = self.client.delete('/api/v1/articles/')
        self.assertEqual(response.status_code, 405)


class EdgeCaseTest(MongoTestCase):
    def test_empty_database_queries(self):
        self.assertEqual(self.client.get('/api/v1/articles/').json()['results'], [])
        self.assertEqual(self.client.get('/api/v1/categories/').json(), [])
        self.assertEqual(self.client.get('/api/v1/scientists/').json()['results'], [])

    def test_unicode_in_search(self):
        cat = Category(name='Física', slug='fisica', icon='a', color='#fff')
        cat.save()
        Article(
            title='Mecánica Cuántica', slug='mecanica-cuantica',
            category_id=str(cat.id), author_id='a1',
            published_at=datetime.now(timezone.utc), is_published=True,
        ).save()
        response = self.client.get('/api/v1/articles/?search=Mecánica')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()['results']), 1)

    def test_very_long_search_string(self):
        long_query = 'a' * 1000
        response = self.client.get(f'/api/v1/articles/?search={long_query}')
        self.assertEqual(response.status_code, 200)

    def test_special_characters_in_slug(self):
        response = self.client.get('/api/v1/articles/<script>alert(1)</script>/')
        self.assertIn(response.status_code, [400, 404])

    def test_sql_injection_attempt(self):
        response = self.client.get("/api/v1/articles/?search=' OR 1=1 --")
        self.assertEqual(response.status_code, 200)

    def test_xss_in_search(self):
        response = self.client.get('/api/v1/articles/?search=<script>alert(1)</script>')
        self.assertEqual(response.status_code, 200)

    def test_category_with_special_characters(self):
        response = self.client.get('/api/v1/categories/../../etc/passwd/')
        self.assertIn(response.status_code, [400, 404])


class PaginationTest(MongoTestCase):
    def test_returns_array_not_paginated(self):
        for i in range(25):
            cat = Category(name=f'Cat {i}', slug=f'cat-{i}', icon='i', color='#fff')
            cat.save()
        response = self.client.get('/api/v1/categories/')
        data = response.json()
        self.assertIsInstance(data, list)


class ResponseFormatTest(MongoTestCase):
    def test_articles_are_json(self):
        response = self.client.get('/api/v1/articles/')
        self.assertEqual(response['Content-Type'], 'application/json')

    def test_categories_are_json(self):
        response = self.client.get('/api/v1/categories/')
        self.assertEqual(response['Content-Type'], 'application/json')

    def test_scientists_are_json(self):
        response = self.client.get('/api/v1/scientists/')
        self.assertEqual(response['Content-Type'], 'application/json')

    def test_404_is_json(self):
        response = self.client.get('/api/v1/articles/nonexistent/')
        self.assertEqual(response.status_code, 404)
        data = response.json()
        self.assertIn('error', data)
