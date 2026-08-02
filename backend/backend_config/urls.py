from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        'name': 'Science Knowledge Hub API',
        'version': '1.0.0',
        'endpoints': {
            'categories': '/api/v1/categories/',
            'articles': '/api/v1/articles/',
            'scientists': '/api/v1/scientists/',
            'auth': '/api/v1/auth/',
        },
    })

urlpatterns = [
    path('', api_root, name='api-root'),
    path('api/v1/categories/', include('categories.urls')),
    path('api/v1/articles/', include('articles.urls')),
    path('api/v1/scientists/', include('scientists.urls')),
    path('api/v1/auth/', include('authentication.urls')),
]
