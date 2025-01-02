from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404
from django.template import loader
from .models import Travel
# Create your views here.

def index(request):
    return HttpResponse("Hello, world. You're at the polls/travplans index.")

def show_travel(request, travel_id):
    return HttpResponse("You are looking at a travel %s." % travel_id)

def show_main_destination(request, travel_id):
    response = "You are looking at a main destination of a travel with id %s."
    return HttpResponse(response % travel_id)

def show_travel_group(request, travel_id):
    response = "You are looking at a travel group for a travel with id %s."
    return HttpResponse(response % travel_id)

