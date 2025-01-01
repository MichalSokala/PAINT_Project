from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("<int:travel_id>/", views.show_travel, name="show travel id"),
    path("<int:travel_id>/show_main_destination/", views.show_main_destination, name="show main destination"),
    path("<int:travel_id>/show_travel_group/", views.show_travel_group, name="show travel group"),
]