"""Shared test base class — manages MongoEngine connection to a test database."""
import mongoengine
from django.test import TestCase, override_settings
from rest_framework.test import APIClient


TEST_DB = 'science_hub_test'


class MongoTestCase(TestCase):
    """TestCase that connects to a test MongoDB and drops all data after each test."""

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        try:
            mongoengine.disconnect()
        except Exception:
            pass
        mongoengine.connect(db=TEST_DB, host='mongodb://localhost:27017', alias='default')

    @classmethod
    def tearDownClass(cls):
        from mongoengine.connection import get_connection
        conn = get_connection()
        conn.drop_database(TEST_DB)
        mongoengine.disconnect()
        super().tearDownClass()

    def setUp(self):
        from articles.models import Article, Author
        from categories.models import Category
        from scientists.models import Scientist
        from authentication.models import User, UserProfile
        Article.drop_collection()
        Author.drop_collection()
        Category.drop_collection()
        Scientist.drop_collection()
        User.drop_collection()
        UserProfile.drop_collection()

    def _get_client(self):
        return APIClient()
