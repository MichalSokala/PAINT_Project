from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

# Inicjalizacja routera
router = DefaultRouter()
router.register('travel', TravelViewSet, basename='travel')
router.register('user', UserViewSet, basename='user')
router.register('places_to_see', PlacesToSeeViewSet, basename='places_to_see')
router.register('cost', CostViewSet, basename='cost')
router.register('item_list', ItemListViewSet, basename='item_list')
router.register('travel_part', TravelPartViewSet, basename='travel_part')
router.register('cost_split', CostManageViewSet, basename='cost_split')

# podział kosztów: http://127.0.0.1:8000/api/cost_split/{id}/split-cost/
# podział na kategorie: http://127.0.0.1:8000/api/cost_split/{id}/category-totals/
# zapytanie o pogodę (np Londyn): http://127.0.0.1:8000/api/travel/{id}/weather/?city=London

# Dodanie ścieżek wygenerowanych przez router
urlpatterns = [
    path('', include(router.urls)),  # Ścieżki CRUD dla TaskViewSet
]