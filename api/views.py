from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import (Travel, User, Cost, Item_list,
                     Places_to_see, Travel_part, Travel_group)


from api.serializers import (TravelSerializer, UserSerializer,
                CostSerializer, Item_listSerializer, Places_to_see_Serializer,
                             Travel_part_Serializer, Travel_group_Serializer)

class TravelViewSet(ModelViewSet):
    queryset = Travel.objects.all()
    serializer_class = TravelSerializer

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CostViewSet(ModelViewSet):
    queryset = Cost.objects.all()
    serializer_class = CostSerializer

class Item_list_ViewSet(ModelViewSet):
    queryset = Item_list.objects.all()
    serializer_class = Item_listSerializer

class Places_to_see_ViewSet(ModelViewSet):
    queryset = Places_to_see.objects.all()
    serializer_class = Places_to_see_Serializer

class Travel_part_ViewSet(ModelViewSet):
    queryset = Travel_part.objects.all()
    serializer_class = Travel_part_Serializer

class Travel_group_ViewSet(ModelViewSet):
    queryset = Travel_group.objects.all()
    serializer_class = Travel_group_Serializer