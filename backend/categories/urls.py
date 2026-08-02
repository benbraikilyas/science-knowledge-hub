from django.urls import path
from . import views

urlpatterns = [
    path('', views.CategoryViewSet.as_view({'get': 'list'}), name='category-list'),
    path('<slug:pk>/', views.CategoryViewSet.as_view({'get': 'retrieve'}), name='category-detail'),
]
