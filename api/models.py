import datetime
from django.db import models
from django.utils import timezone


class Travel(models.Model):
    """class describing a travel"""
    user_id = models.ForeignKey("User", on_delete=models.CASCADE)
    travel_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    main_destination = models.CharField(max_length=100)
    start_date = models.DateTimeField("Beginning of travel date")
    end_date = models.DateTimeField("End of travel date")
    is_completed = models.BooleanField(default=False)
    def is_starting(self):
        return self.start_date >= timezone.now() + datetime.timedelta(days=1)

    def __str__(self):
        return self.name


class Travel_group(models.Model):
    """class describing a travel group"""
    group_id = models.IntegerField()
    user_id = models.ForeignKey("User", on_delete=models.CASCADE)
    travel_id = models.ForeignKey("Travel", on_delete=models.CASCADE)#definition of foreign key

    def __str__(self):
        return self.group_id


class User(models.Model):
    """class describing a user"""
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)
    surname = models.CharField(max_length=30)

    def __str__(self):
        return self.name

class Cost(models.Model):
    """class describing a cost"""
    cost_id = models.AutoField(primary_key=True)
    travel_id = models.ForeignKey("Travel", on_delete=models.CASCADE)
    category = models.CharField(max_length=40)
    amount = models.IntegerField()

    def __str__(self):
        return self.cost_id

class Travel_part(models.Model):
    """class describing a part of a travel"""
    part_id = models.AutoField(primary_key=True)
    travel_id = models.ForeignKey("Travel", on_delete=models.CASCADE)
    start_location = models.CharField(max_length=120)
    end_location = models.CharField(max_length=120)
    transport = models.CharField(max_length=120) # describes the means of transport used during
    # a certain part of a travel
    part_start_date = models.DateTimeField("Date on which said part of a travel starts")
    part_end_date = models.DateTimeField("Date on which said part of a travel ends")

    def __str__(self):
        return self.part_id

class Item_list(models.Model):
    """class describing a list of items that user can take when travelling"""
    item_id = models.AutoField(primary_key=True)
    travel_id = models.ForeignKey("Travel", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    is_packed = models.BooleanField(default=False)

    def __str__(self):
        return self.item_id

class Places_to_see(models.Model):
    """class describing places to see"""
    place_id = models.AutoField(primary_key=True)
    part_id = models.ForeignKey("Travel_part", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)

    def __str__(self):
        return self.place_id
