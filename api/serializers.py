from rest_framework import serializers
from .models import *

class TravelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Travel
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class CostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cost
        fields = '__all__'

class PlacesToSeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Places_to_see
        fields = '__all__'

class TravelPartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Travel_part
        fields = '__all__'

class ItemListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item_list
        fields = '__all__'