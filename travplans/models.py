import datetime
from django.db import models
from django.utils import timezone
# Create your models here.

class Travel(models.Model):
    user_id = models.IntegerField()
    travel_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    main_destination = models.CharField(max_length=100)
    start_date = models.DateTimeField("Beginning of travel date")
    end_date = models.DateTimeField("End of travel date")
    def is_starting(self):
        return self.start_date >= timezone.now() + datetime.timedelta(days=1)

    def __str__(self):
        return self.name

class Travel_group(models.Model):
    group_id = models.IntegerField()
    user_id = models.IntegerField()
    travel_id = models.ForeignKey("Travel", on_delete=models.CASCADE)#definition of foreign key

    def __str__(self):
        return self.group_id