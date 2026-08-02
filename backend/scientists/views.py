from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Scientist

class ScientistViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Scientist.objects.all()
        featured = request.query_params.get('featured')
        field = request.query_params.get('field')
        search = request.query_params.get('search')

        if featured:
            queryset = queryset.filter(is_featured=True)
        if field:
            queryset = queryset.filter(field__icontains=field)
        if search:
            queryset = queryset.filter(name__icontains=search)

        queryset = queryset.order_by('name')
        data = [s.to_list_dict() for s in queryset]
        return Response(data)

    def retrieve(self, request, pk=None):
        try:
            scientist = Scientist.objects.get(slug=pk)
        except Scientist.DoesNotExist:
            try:
                scientist = Scientist.objects.get(id=pk)
            except (Scientist.DoesNotExist, Exception):
                return Response({'error': 'Scientist not found'}, status=status.HTTP_404_NOT_FOUND)

        return Response(scientist.to_detail_dict())

    @action(detail=False, methods=['get'])
    def featured(self, request):
        scientists = Scientist.objects(is_featured=True).order_by('name')[:6]
        data = [s.to_list_dict() for s in scientists]
        return Response(data)
