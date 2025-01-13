from django.contrib import admin
from .models import *

#Rejestracja modeli w panelu admina
#moze trzeba bedzie to zrobic inaczej np. @admin.register(Travel)
# class TaskAdmin(admin.ModelAdmin):
# list_display = ('name', 'is_completed') # Wyświetlane pola w panelu admina
class TravelAdmin(admin.ModelAdmin):
    list_display = ("travel_id" , "name", "main_destination", "start_date", "end_date", "is_completed")
admin.site.register(Travel,TravelAdmin)

class Travel_partAdmin(admin.ModelAdmin):
    list_display = ("part_id", "travel_id", "start_location", "end_location", "transport", "part_start_date", "part_end_date")
admin.site.register(Travel_part, Travel_partAdmin)

class Travel_groupAdmin(admin.ModelAdmin):
    list_display = ("group_id", "user_id","travel_id")
admin.site.register(Travel_group, Travel_groupAdmin)

class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "surname")
admin.site.register(User, UserAdmin)

class CostAdmin(admin.ModelAdmin):
    list_display = ("cost_id", "travel_id", "category", "amount")
admin.site.register(Cost, CostAdmin)

class Item_listAdmin(admin.ModelAdmin):
    list_display = ("item_id", "travel_id", "name", "is_packed")
admin.site.register(Item_list, Item_listAdmin)

class Places_to_seeAdmin(admin.ModelAdmin):
    list_display = ("place_id", "part_id", "name", "country")
admin.site.register(Places_to_see, Places_to_seeAdmin)
