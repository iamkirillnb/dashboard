from django.contrib import admin
from django.urls import path
from .views import Index, Pie, my_func

app_name = 'mainapp'

urlpatterns = [
    path('', Index.as_view(), name='index'),
    path('pie/', Pie.as_view(), name='pie'),
    path('my_func/', my_func, name='my_func'),

]
