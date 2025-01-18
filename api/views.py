from rest_framework.viewsets import ModelViewSet, ViewSet
from api.serializers import *
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

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

class CostSplitViewSet(ViewSet):
    @action(detail=True, methods=['get'], url_path='split-cost', url_name='split-cost')
    def split_cost(self, request, pk=None):
        travel = get_object_or_404(Travel, pk=pk)
        costs = Cost.objects.filter(travel_id=travel)
        user_count = travel.users.count()

        if user_count == 0:
            return Response({"error": "No users in this travel"}, status=status.HTTP_400_BAD_REQUEST)

        total_cost = sum(cost.amount for cost in costs)
        cost_per_user = total_cost / user_count

        return Response({
            "total_cost": total_cost,
            "user_count": user_count,
            "cost_per_user": round(cost_per_user, 2)
        }, status=status.HTTP_200_OK)