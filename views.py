from rest_framework.viewsets import ModelViewSet
from .models import Task
from .serializers import TaskSerializer

# Widok API obsługujący CRUD (Create, Read, Update, Delete) dla modelu Task
class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()  # Pobiera wszystkie zadania z bazy danych
    serializer_class = TaskSerializer  # Używa TaskSerializer do konwersji danych
