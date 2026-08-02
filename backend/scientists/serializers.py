from rest_framework import serializers

class ScientistListSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField()
    slug = serializers.CharField()
    portraitImage = serializers.CharField()
    birthDate = serializers.CharField()
    deathDate = serializers.CharField(allow_null=True, required=False)
    nationality = serializers.CharField()
    era = serializers.CharField()
    field = serializers.CharField()
    isFeatured = serializers.BooleanField()


class ScientistDetailSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField()
    slug = serializers.CharField()
    portraitImage = serializers.CharField()
    birthDate = serializers.CharField()
    deathDate = serializers.CharField(allow_null=True, required=False)
    nationality = serializers.CharField()
    era = serializers.CharField()
    field = serializers.CharField()
    biography = serializers.CharField()
    keyContributions = serializers.ListField()
    famousQuotes = serializers.ListField()
    awards = serializers.ListField()
    isFeatured = serializers.BooleanField()
    createdAt = serializers.CharField()
    updatedAt = serializers.CharField()
