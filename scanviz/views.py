from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.template import loader
from engine import scan

# Create your views here.
def index(request):
	if request.POST:
		grinder = request.POST.get("subnet")
		return JsonResponse(scan(grinder))
	else:
		return HttpResponse(loader.get_template("scanviz/index.html").render(request=request))
