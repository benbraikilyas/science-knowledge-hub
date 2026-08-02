from django.urls import path
from django.http import JsonResponse
from . import views

def auth_root(request):
    return JsonResponse({
        'endpoints': {
            'login': '/api/v1/auth/login/',
            'refresh': '/api/v1/auth/refresh/',
            'register': '/api/v1/auth/register/',
            'profile': '/api/v1/auth/profile/',
            'bookmarks': '/api/v1/auth/bookmarks/',
            'reading_history': '/api/v1/auth/reading-history/',
        }
    })

urlpatterns = [
    path('', auth_root, name='auth-root'),
    path('login/', views.login, name='login'),
    path('refresh/', views.refresh, name='refresh'),
    path('register/', views.register, name='register'),
    path('profile/', views.profile, name='profile'),
    path('bookmarks/', views.bookmarks, name='bookmarks'),
    path('reading-history/', views.reading_history, name='reading-history'),
]
