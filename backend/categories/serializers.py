from rest_framework import serializers

class CategorySerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField()
    slug = serializers.CharField()
    description = serializers.CharField()
    icon = serializers.CharField()
    color = serializers.CharField()
    gradient = serializers.CharField(required=False, allow_null=True)
    order = serializers.IntegerField()
    isActive = serializers.BooleanField(read_only=True, source='is_active')
    articleCount = serializers.IntegerField(read_only=True, source='article_count')
