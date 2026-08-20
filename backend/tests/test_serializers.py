"""Tests for remaining serializers."""
from datetime import datetime, timezone
from django.test import TestCase
import mongoengine

from categories.serializers import CategorySerializer
from authentication.serializers import RegisterSerializer, UserProfileSerializer
from authentication.models import User, UserProfile
from articles.models import Article
from categories.models import Category
from scientists.models import Scientist


class MongoTestCase(TestCase):
    def setUp(self):
        Article.drop_collection()
        Category.drop_collection()
        Scientist.drop_collection()
        User.drop_collection()
        UserProfile.drop_collection()


class RegisterSerializerTest(MongoTestCase):
    def test_valid_registration(self):
        data = {'username': 'newuser', 'email': 'new@example.com', 'password': 'secret123'}
        serializer = RegisterSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        user = serializer.save()
        self.assertEqual(user.username, 'newuser')
        self.assertTrue(user.check_password('secret123'))

    def test_missing_username(self):
        serializer = RegisterSerializer(data={'email': 'a@a.com', 'password': 'pass123'})
        self.assertFalse(serializer.is_valid())
        self.assertIn('username', serializer.errors)

    def test_missing_email(self):
        serializer = RegisterSerializer(data={'username': 'user1', 'password': 'pass123'})
        self.assertFalse(serializer.is_valid())
        self.assertIn('email', serializer.errors)

    def test_missing_password(self):
        serializer = RegisterSerializer(data={'username': 'user1', 'email': 'a@a.com'})
        self.assertFalse(serializer.is_valid())
        self.assertIn('password', serializer.errors)

    def test_password_too_short(self):
        serializer = RegisterSerializer(data={'username': 'user1', 'email': 'a@a.com', 'password': '123'})
        self.assertFalse(serializer.is_valid())
        self.assertIn('password', serializer.errors)

    def test_invalid_email(self):
        serializer = RegisterSerializer(data={'username': 'user1', 'email': 'not-an-email', 'password': 'pass123'})
        self.assertFalse(serializer.is_valid())
        self.assertIn('email', serializer.errors)

    def test_duplicate_username(self):
        u = User(username='taken', email='a@a.com')
        u.set_password('pass')
        u.save()
        serializer = RegisterSerializer(data={'username': 'taken', 'email': 'b@b.com', 'password': 'pass123'})
        self.assertFalse(serializer.is_valid())
        self.assertIn('username', serializer.errors)

    def test_duplicate_email(self):
        u = User(username='user1', email='dup@example.com')
        u.set_password('pass')
        u.save()
        serializer = RegisterSerializer(data={'username': 'user2', 'email': 'dup@example.com', 'password': 'pass123'})
        self.assertFalse(serializer.is_valid())
        self.assertIn('email', serializer.errors)

    def test_display_name_optional(self):
        serializer = RegisterSerializer(data={'username': 'u1', 'email': 'u1@x.com', 'password': 'pass123'})
        self.assertTrue(serializer.is_valid(), serializer.errors)
        user = serializer.save()
        profile = UserProfile.objects(user_id=str(user.id)).first()
        self.assertIsNotNone(profile)
        self.assertEqual(profile.display_name, 'u1')

    def test_custom_display_name(self):
        serializer = RegisterSerializer(data={
            'username': 'u2', 'email': 'u2@x.com', 'password': 'pass123', 'display_name': 'Custom Name'
        })
        self.assertTrue(serializer.is_valid(), serializer.errors)
        user = serializer.save()
        profile = UserProfile.objects(user_id=str(user.id)).first()
        self.assertEqual(profile.display_name, 'Custom Name')


class UserProfileSerializerTest(MongoTestCase):
    def test_serialize_profile(self):
        profile = UserProfile(user_id='u1', display_name='Test', avatar='img.png', bio='Hello')
        profile.save()
        serializer = UserProfileSerializer(profile)
        data = serializer.data
        self.assertEqual(data['userId'], 'u1')
        self.assertEqual(data['displayName'], 'Test')
        self.assertEqual(data['avatar'], 'img.png')
        self.assertEqual(data['bio'], 'Hello')
        self.assertEqual(data['bookmarks'], [])
        self.assertEqual(data['readingHistory'], [])


class CategorySerializerTest(MongoTestCase):
    def test_serialize_category(self):
        cat = Category(name='Physics', slug='physics', icon='atom', color='#fff', gradient='grad', order=1)
        cat.save()
        serializer = CategorySerializer(cat)
        data = serializer.data
        self.assertEqual(data['name'], 'Physics')
        self.assertEqual(data['slug'], 'physics')
        self.assertTrue(data['isActive'])
        self.assertEqual(data['articleCount'], 0)
        self.assertEqual(data['gradient'], 'grad')

    def test_optional_gradient(self):
        cat = Category(name='Bio', slug='bio', icon='dna', color='#0f0')
        cat.save()
        serializer = CategorySerializer(cat)
        data = serializer.data
        self.assertIsNone(data['gradient'])
