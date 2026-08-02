from rest_framework import serializers
from .models import User, UserProfile


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=6)
    display_name = serializers.CharField(required=False, allow_blank=True)

    def validate_username(self, value):
        if User.objects(username=value).first():
            raise serializers.ValidationError('A user with that username already exists.')
        return value

    def validate_email(self, value):
        if User.objects(email=value).first():
            raise serializers.ValidationError('A user with that email already exists.')
        return value

    def create(self, validated_data):
        display_name = validated_data.pop('display_name', '')
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        UserProfile(
            user_id=str(user.id),
            display_name=display_name or user.username,
        ).save()
        return user


class UserProfileSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    userId = serializers.CharField(read_only=True, source='user_id')
    displayName = serializers.CharField(source='display_name', allow_null=True, required=False)
    avatar = serializers.CharField(allow_null=True, required=False)
    bio = serializers.CharField(allow_null=True, required=False)
    bookmarks = serializers.ListField(required=False)
    readingHistory = serializers.ListField(read_only=True, source='reading_history')
