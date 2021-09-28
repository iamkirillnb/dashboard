from django.db.migrations import serializer
from django.urls import path, include
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from mainapp.models import IndicatorModel
from rest_framework import routers, serializers, viewsets

# Serializers define the API representation.
from mainapp.views import pars


class MySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = IndicatorModel
        fields = ['name', 'fact', 'plan', 'date', 'active']


# ViewSets define the view behavior.
class MyViewSet(viewsets.ModelViewSet):
    queryset = IndicatorModel.objects.all()
    serializer_class = MySerializer

    # def list(self, request, *args, **kwargs):
    #     # Получение показателей и фильтров для графиков
    #     my_filter = pars(request.GET.get('values_filter'))
    #     values_indicator = pars(request.GET.get('values_indicator'))
    #
    #     queryset = IndicatorModel.objects.all()
    #     serializer = MySerializer(queryset, many=True)
    #     return Response(serializer.data)
    #
    # def update(self, request, *args, **kwargs):
    #     partial = kwargs.pop('partial', False)
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance, data=request.data, partial=partial)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_update(serializer)
    #
    #     if getattr(instance, '_prefetched_objects_cache', None):
    #         # If 'prefetch_related' has been applied to a queryset, we need to
    #         # forcibly invalidate the prefetch cache on the instance.
    #         instance._prefetched_objects_cache = {}
    #
    #     return Response(serializer.data)



# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'my_models', MyViewSet)

app_name = 'django_rest'
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-models/', include('rest_framework.urls', namespace='rest_framework'))
]
