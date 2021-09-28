from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from .views import Index, MyViewSet

app_name = 'demo'

router = routers.DefaultRouter()
router.register(r'my_models', MyViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('index/', Index.as_view(), name='index'),
    path('api-my_models/', include('rest_framework.urls', namespace='rest_framework'))

]
