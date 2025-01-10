from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (TravelViewSet, UserViewSet, CostViewSet,
                    Item_list_ViewSet, Places_to_see_ViewSet,
                    Travel_group_ViewSet, Travel_part_ViewSet)

# Inicjalizacja routera
router = DefaultRouter()
router.register('travel', TravelViewSet, basename='travel')
router.register('user', UserViewSet, basename='user')
router.register('places_to_see', Places_to_see_ViewSet, basename='places_to_see')
router.register('cost', CostViewSet, basename='cost')
router.register('item_list', Item_list_ViewSet, basename='item_list')
router.register('travel_group', Travel_group_ViewSet, basename='travel_group')
router.register('travel_part', Travel_part_ViewSet, basename='travel_part')

# Dodanie ścieżek wygenerowanych przez router
urlpatterns = [
    path('', include(router.urls)),  # Ścieżki CRUD dla TaskViewSet
]