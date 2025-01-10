from django.contrib import admin
from .models import Travel

# Rejestracja modelu Travel w panelu admina
@admin.register(Travel)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_completed')  # Wyświetlane pola w panelu admina
