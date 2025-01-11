from django.contrib import admin
from .models import *

#Rejestracja modeli w panelu admina
#moze trzeba bedzie to zrobic inaczej np. @admin.register(Travel)
# class TaskAdmin(admin.ModelAdmin):
# list_display = ('name', 'is_completed') # Wyświetlane pola w panelu admina
admin.site.register(Travel)
admin.site.register(Travel_part)
admin.site.register(Travel_group)
admin.site.register(User)
admin.site.register(Cost)
admin.site.register(Item_list)
admin.site.register(Places_to_see)