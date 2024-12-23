from django.test import TestCase
from .models import Task

class TaskModelTestCase(TestCase):
    def test_task_creation(self):
        task = Task.objects.create(title="Test Task", completed=False)
        self.assertEqual(task.title, "Test Task")
        self.assertFalse(task.completed)