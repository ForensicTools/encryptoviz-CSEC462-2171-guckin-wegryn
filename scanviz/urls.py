from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'), #regex that recognizes a url and calls a specific funciton in views.py
]
