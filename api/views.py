from rest_framework.viewsets import ModelViewSet, ViewSet
from api.serializers import *
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
import requests

class TravelViewSet(ModelViewSet):
    queryset = Travel.objects.all()
    serializer_class = TravelSerializer

    @action(detail=True, methods=['get'], url_path='weather', url_name='weather')
    def get_weather(self, request, pk=None):
        travel = get_object_or_404(Travel, pk=pk)
        destination = request.query_params.get("city",
                        travel.main_destination)

        if not destination:
            return Response({"error": "Należy podać nazwę miasta"},
                            status=status.HTTP_400_BAD_REQUEST)

        start_date = travel.start_date.date()
        end_date = travel.end_date.date()

        geocoding_url = f"https://geocoding-api.open-meteo.com/v1/search?name={destination}"
        geocoding_response = requests.get(geocoding_url)

        if geocoding_response.status_code != 200:
            return Response({"error": "Nie udało się pobrać geolokalizacji"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        geocoding_data = geocoding_response.json()
        if "results" not in geocoding_data or len(geocoding_data["results"]) == 0:
            return Response({"error": f"Nie znaleziono współrzędnych tego miasta: {destination}"},
                            status=status.HTTP_404_NOT_FOUND)

        latitude = geocoding_data["results"][0]["latitude"]
        longitude = geocoding_data["results"][0]["longitude"]

        weather_url = (
            f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}"
            f"&start_date={start_date}&end_date={end_date}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode"
            f"&timezone=auto"
        )
        weather_response = requests.get(weather_url)
        if weather_response.status_code != 200:
            return Response({"error": "Nie udało się pobrać danych o pogodzie"},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        weather_data = weather_response.json()
        if "daily" not in weather_data:
            return Response({"error": "Dane o pogodzie w tych dniach nie są dostępne"},
                            status=status.HTTP_404_NOT_FOUND)

        daily_weather = weather_data["daily"]
        descriptions = []

        for i in range(len(daily_weather["time"])):
            precipitation = daily_weather["precipitation_sum"][i]
            weather_code = daily_weather.get("weathercode", [])[i] if "weathercode" in daily_weather else None

            if weather_code in [0, 1]:
                description = "Słońce"
            elif weather_code in [2, 3]:
                description = "Częściowe zachmurzenie"
            elif precipitation > 0:
                description = "Deszcz"
            else:
                description = "Zachmurzenie"

            descriptions.append({
                "date": daily_weather["time"][i],
                "max_temp": daily_weather["temperature_2m_max"][i],
                "min_temp": daily_weather["temperature_2m_min"][i],
                "precipitation": precipitation,
                "description": description
            })

        return Response({
            "destination": destination,
            "latitude": latitude,
            "longitude": longitude,
            "weather": descriptions
        }, status=status.HTTP_200_OK)


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CostViewSet(ModelViewSet):
    queryset = Cost.objects.all()
    serializer_class = CostSerializer

class ItemListViewSet(ModelViewSet):
    queryset = Item_list.objects.all()
    serializer_class = ItemListSerializer

class PlacesToSeeViewSet(ModelViewSet):
    queryset = Places_to_see.objects.all()
    serializer_class = PlacesToSeeSerializer

class TravelPartViewSet(ModelViewSet):
    queryset = Travel_part.objects.all()
    serializer_class = TravelPartSerializer

class CostManageViewSet(ViewSet):
    @action(detail=True, methods=['get'], url_path='split-cost', url_name='split-cost')
    def split_cost(self, request, pk=None):
        travel = get_object_or_404(Travel, pk=pk)
        costs = Cost.objects.filter(travel_id=travel)
        user_count = travel.users.count()

        if user_count == 0:
            return Response({"error": "Ta podróż nie ma uczestników"}, status=status.HTTP_400_BAD_REQUEST)

        total_cost = sum(cost.amount for cost in costs)
        cost_per_user = total_cost / user_count

        return Response({
            "total_cost": total_cost,
            "user_count": user_count,
            "cost_per_user": round(cost_per_user, 2)
        }, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'], url_path='category-totals', url_name='category-totals')
    def category_totals(self, request, pk=None):
        travel = get_object_or_404(Travel, pk=pk)
        costs = Cost.objects.filter(travel_id=travel)

        category_totals = {
            'zakwaterowanie': 0,
            'transport': 0,
            'jedzenie': 0,
            'rozrywka': 0,
            'inne': 0
        }

        for cost in costs:
            if cost.category in category_totals:
                category_totals[cost.category] += cost.amount

        return Response({
            "total_cost": sum(category_totals.values()),
            "category_totals": category_totals
        }, status=status.HTTP_200_OK)


