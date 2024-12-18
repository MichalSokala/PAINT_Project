from django.db import models

# Model Task reprezentuje pojedyncze zadanie w bazie danych
class Task(models.Model):
    title = models.CharField(max_length=255)  # Krótki tytuł zadania (do 255 znaków)
    description = models.TextField(blank=True)  # Opcjonalny opis zadania
    completed = models.BooleanField(default=False)  # Status zadania (czy zakończone)

    def __str__(self):
        return self.title  # Zwraca tytuł jako reprezentację tekstową modelu
