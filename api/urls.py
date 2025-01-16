from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

# Inicjalizacja routera
router = DefaultRouter()
router.register('travel', TravelViewSet, basename='travel')
router.register('user', UserViewSet, basename='user')
router.register('places_to_see', Places_to_see_ViewSet, basename='places_to_see')
router.register('cost', CostViewSet, basename='cost')
router.register('item_list', Item_list_ViewSet, basename='item_list')
router.register('travel_part', Travel_part_ViewSet, basename='travel_part')
router.register('cost_split', CostSplitViewSet, basename='cost_split')
# Dodanie ścieżek wygenerowanych przez router
urlpatterns = [
    path('', include(router.urls)),
]