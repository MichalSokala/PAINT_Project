from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Task, Travel
from api.serializers import TaskSerializer, TravelSerializer

# Widok API obsługujący CRUD (Create, Read, Update, Delete) dla modelu Task
class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()  # Pobiera wszystkie zadania z bazy danych
    serializer_class = TaskSerializer  # Używa TaskSerializer do konwersji danych

class TravelViewSet(ModelViewSet):
    queryset = Travel.objects.all()  # Pobiera wszystkie zadania z bazy danych
    serializer_class = TravelSerializer  # Używa TaskSerializer do konwersji danych
