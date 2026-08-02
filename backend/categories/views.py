from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Category
from .serializers import CategorySerializer

class CategoryViewSet(viewsets.ViewSet):
    def list(self, request):
        categories = Category.objects(is_active=True)
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            category = Category.objects.get(slug=pk)
        except Category.DoesNotExist:
            try:
                category = Category.objects.get(id=pk)
            except (Category.DoesNotExist, Exception):
                return Response({'error': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = CategorySerializer(category)
        return Response(serializer.data)
