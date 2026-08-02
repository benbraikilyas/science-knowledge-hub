from django.urls import path
from . import views

urlpatterns = [
    path('', views.ScientistViewSet.as_view({'get': 'list'}), name='scientist-list'),
    path('featured/', views.ScientistViewSet.as_view({'get': 'featured'}), name='scientist-featured'),
    path('<slug:pk>/', views.ScientistViewSet.as_view({'get': 'retrieve'}), name='scientist-detail'),
]
