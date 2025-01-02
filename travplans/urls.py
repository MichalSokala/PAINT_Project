from django.urls import path
from . import views

#the following line is a namespace, thanks to it django will know for which app will the urls be used
app_name = 'travplans'
urlpatterns = [
    path("", views.index, name="index"),
    path("<int:travel_id>/show_travel/", views.show_travel, name="show travel id"),
    path("<int:travel_id>/show_main_destination/", views.show_main_destination, name="show main destination"),
    path("<int:travel_id>/show_travel_group/", views.show_travel_group, name="show travel group"),
]