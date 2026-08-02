from django.urls import path
from . import views

urlpatterns = [
    path('', views.ArticleViewSet.as_view({'get': 'list'}), name='article-list'),
    path('featured/', views.ArticleViewSet.as_view({'get': 'featured'}), name='article-featured'),
    path('related/', views.ArticleViewSet.as_view({'get': 'related'}), name='article-related'),
    path('<slug:pk>/', views.ArticleViewSet.as_view({'get': 'retrieve'}), name='article-detail'),
    path('<slug:pk>/like/', views.ArticleViewSet.as_view({'post': 'like'}), name='article-like'),
]
