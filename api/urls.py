from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, TravelViewSet  # Import TaskViewSet bez test_view

# Inicjalizacja routera
router = DefaultRouter()
router.register('tasks', TaskViewSet, basename='task')  # Rejestracja widoku TaskViewSet
router.register('travel', TravelViewSet, basename='travel')  # Rejestracja widoku TaskViewSet

# Dodanie ścieżek wygenerowanych przez router
urlpatterns = [
    path('', include(router.urls)),  # Ścieżki CRUD dla TaskViewSet
]