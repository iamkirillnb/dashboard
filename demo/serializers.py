from rest_framework import  serializers
from .models import MyData

class MySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MyData
        fields = ['name', 'fact', 'plan', 'date']