from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Article
from .serializers import ArticleListSerializer, ArticleDetailSerializer

class ArticleViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Article.objects(is_published=True)
        category = request.query_params.get('category')
        featured = request.query_params.get('featured')
        tag = request.query_params.get('tag')
        search = request.query_params.get('search')

        if category:
            queryset = queryset.filter(category_slug=category)
        if featured:
            queryset = queryset.filter(is_featured=True)
        if tag:
            queryset = queryset.filter(tags__in=[tag])
        if search:
            queryset = queryset.filter(title__icontains=search)

        queryset = queryset.order_by('-published_at')
        serializer = ArticleListSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            article = Article.objects.get(slug=pk, is_published=True)
        except Article.DoesNotExist:
            try:
                article = Article.objects.get(id=pk, is_published=True)
            except (Article.DoesNotExist, Exception):
                return Response({'error': 'Article not found'}, status=status.HTTP_404_NOT_FOUND)

        article.update(inc__views_count=1)
        article.reload()

        data = {
            'id': str(article.id),
            'title': article.title,
            'slug': article.slug,
            'content': article.content or '',
            'excerpt': article.excerpt or '',
            'featuredImage': article.featured_image or '',
            'thumbnail': article.thumbnail or '',
            'category': {
                'id': article.category_id,
                'name': article.category_name or '',
                'slug': article.category_slug or '',
                'color': article.category_color or '',
                'icon': article.category_icon or '',
            },
            'author': {
                'id': article.author_id,
                'displayName': article.author_name or '',
                'avatar': article.author_avatar or '',
            },
            'tags': article.tags,
            'readTime': article.read_time,
            'isPublished': article.is_published,
            'isFeatured': article.is_featured,
            'viewsCount': article.views_count,
            'likesCount': article.likes_count,
            'metaTitle': article.meta_title or '',
            'metaDescription': article.meta_description or '',
            'createdAt': article.created_at.isoformat() if article.created_at else '',
            'updatedAt': article.updated_at.isoformat() if article.updated_at else '',
            'publishedAt': article.published_at.isoformat() if article.published_at else '',
        }
        return Response(data)

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        try:
            article = Article.objects.get(id=pk)
            article.update(inc__likes_count=1)
            article.reload()
            return Response({'likesCount': article.likes_count})
        except Article.DoesNotExist:
            return Response({'error': 'Article not found'}, status=404)

    @action(detail=False, methods=['get'])
    def related(self, request):
        slug = request.query_params.get('slug')
        if not slug:
            return Response([])
        try:
            article = Article.objects.get(slug=slug)
            related = Article.objects(
                category_id=article.category_id,
                is_published=True
            ).exclude(id=article.id).order_by('-published_at')[:4]
            serializer = ArticleListSerializer(related, many=True)
            return Response(serializer.data)
        except Article.DoesNotExist:
            return Response([])

    @action(detail=False, methods=['get'])
    def featured(self, request):
        articles = Article.objects(is_published=True, is_featured=True).order_by('-published_at')[:6]
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)
