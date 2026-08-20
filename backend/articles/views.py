from rest_framework import viewsets, status
from rest_framework.decorators import action, throttle_classes
from rest_framework.response import Response
from mongoengine.errors import DoesNotExist, ValidationError
from backend_config.throttles import LikeThrottle
from .models import Article


def _paginate(queryset, request):
    page = int(request.query_params.get('page', 1))
    page_size = int(request.query_params.get('page_size', 20))
    page_size = min(page_size, 100)
    total = queryset.count()
    start = (page - 1) * page_size
    items = list(queryset[start:start + page_size])
    return {
        'count': total,
        'page': page,
        'pageSize': page_size,
        'totalPages': max(1, -(-total // page_size)),
        'results': items,
    }


def _article_to_list_dict(article):
    return {
        'id': str(article.id),
        'title': article.title,
        'slug': article.slug,
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
        'tags': article.tags or [],
        'readTime': article.read_time,
        'isFeatured': article.is_featured,
        'viewsCount': article.views_count,
        'likesCount': article.likes_count,
        'publishedAt': article.published_at.isoformat() if article.published_at else '',
    }


class ArticleViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Article.objects(is_published=True)
        category = request.query_params.get('category')
        featured = request.query_params.get('featured')
        tag = request.query_params.get('tag')
        search = request.query_params.get('search')

        if category:
            queryset = queryset.filter(category_slug=category)
        if featured is not None and featured.lower() == 'true':
            queryset = queryset.filter(is_featured=True)
        if tag:
            queryset = queryset.filter(tags__in=[tag])
        if search:
            queryset = queryset.filter(title__icontains=search)

        queryset = queryset.order_by('-published_at')
        paginated = _paginate(queryset, request)
        data = [_article_to_list_dict(a) for a in paginated['results']]
        return Response({
            'count': paginated['count'],
            'page': paginated['page'],
            'pageSize': paginated['pageSize'],
            'totalPages': paginated['totalPages'],
            'results': data,
        })

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
            'tags': article.tags or [],
            'readTime': article.read_time,
            'isPublished': article.is_published,
            'isFeatured': article.is_featured,
            'viewsCount': article.views_count,
            'likesCount': article.likes_count,
            'likedBy': article.liked_by or [],
            'metaTitle': article.meta_title or '',
            'metaDescription': article.meta_description or '',
            'createdAt': article.created_at.isoformat() if article.created_at else '',
            'updatedAt': article.updated_at.isoformat() if article.updated_at else '',
            'publishedAt': article.published_at.isoformat() if article.published_at else '',
        }
        return Response(data)

    @action(detail=True, methods=['post'])
    @throttle_classes([LikeThrottle])
    def like(self, request, pk=None):
        try:
            article = Article.objects.get(id=pk)
        except (DoesNotExist, ValidationError, Exception):
            return Response({'error': 'Article not found'}, status=404)

        user_id = None
        if hasattr(request, 'user') and request.user and hasattr(request.user, 'id'):
            user_id = str(request.user.id)

        if user_id:
            if user_id in (article.liked_by or []):
                article.update(pull__liked_by=user_id, inc__likes_count=-1)
            else:
                article.update(add_to_set__liked_by=user_id, inc__likes_count=1)
        else:
            article.update(inc__likes_count=1)

        article.reload()
        return Response({
            'likesCount': article.likes_count,
            'liked': user_id in (article.liked_by or []) if user_id else False,
        })

    @action(detail=False, methods=['get'])
    def related(self, request):
        slug = request.query_params.get('slug')
        if not slug:
            return Response([])
        try:
            article = Article.objects.get(slug=slug)
            related = Article.objects(
                category_id=article.category_id,
                is_published=True,
                id__ne=article.id,
            ).order_by('-published_at')[:4]
            data = [_article_to_list_dict(a) for a in related]
            return Response(data)
        except Article.DoesNotExist:
            return Response([])

    @action(detail=False, methods=['get'])
    def featured(self, request):
        articles = Article.objects(is_published=True, is_featured=True).order_by('-published_at')[:6]
        data = [_article_to_list_dict(a) for a in articles]
        return Response(data)
