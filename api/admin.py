from django.contrib import admin
from .models import Task

# Rejestracja modelu Task w panelu admina
@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'completed')  # Wyświetlane pola w panelu admina
