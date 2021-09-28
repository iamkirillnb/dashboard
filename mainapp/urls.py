from django.contrib import admin
from django.urls import path
from .views import Index, Pie

app_name = 'mainapp'

urlpatterns = [
    path('', Index.as_view(), name='index'),
    path('pie/', Pie.as_view(), name='pie'),

]
