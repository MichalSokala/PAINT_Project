from rest_framework import serializers
from .models import Task

# Serializator przekształca dane modelu Task na JSON i odwrotnie
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task  # Używany model
        fields = '__all__'  # Uwzględnia wszystkie pola modelu