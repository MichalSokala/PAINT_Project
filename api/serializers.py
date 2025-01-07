from rest_framework import serializers
from .models import (Travel, User, Cost,
                     Item_list, Places_to_see,
                     Travel_part, Travel_group)

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

class Places_to_see_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Places_to_see
        fields = '__all__'

class Travel_part_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Travel_part
        fields = '__all__'

class Travel_group_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Travel_group
        fields = '__all__'

class Item_listSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item_list
        fields = '__all__'