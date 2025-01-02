from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404
from django.template import loader
from .models import Travel
# Create your views here.

def index(request):
    #return HttpResponse("Hello, world. You're at the polls/travplans index.")
    main_destination_list = Travel.objects.order_by("travel_id")
    # output = ", ".join([t.main_destination for t in main_destination_list])
    # return HttpResponse(output)
    #previous 2 lines with line main_destination_list ... are another option that can be used but without a template
    # template = loader.get_template("travplans/index.html")
    context = {
        "main_destination_list": main_destination_list,
    }
    # return HttpResponse(template.render(context, request))
    # line with template = ... and line with return http ... with template.render, and line with context = ...
    # is another option that can be used but main_destination_list must be used either way
    return render(request, "travplans/index.html", context)

def show_travel(request, travel_id):
    #return HttpResponse("You are looking at a travel %s." % travel_id)
    # try:
    #     travel = Travel.objects.get(pk=travel_id)
    # except Travel.DoesNotExist:
    #     raise Http404("Travel with given travel_id does not exist")
    # return render(request, "travplans/show_travel.html", {"travel": travel})
    #the same thing that previous 5 lines were doing can be achieved like that:
    travel = get_object_or_404(Travel, pk=travel_id)
    return render(request, "travplans/show_travel.html", {"travel": travel})

def show_main_destination(request, travel_id):
    response = "You are looking at a main destination of a travel with id %s."
    return HttpResponse(response % travel_id)

def show_travel_group(request, travel_id):
    response = "You are looking at a travel group for a travel with id %s."
    return HttpResponse(response % travel_id)

