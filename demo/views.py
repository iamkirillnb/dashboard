import datetime
from rest_framework import viewsets
from django.shortcuts import render
from django.views.generic import ListView
from mainapp.models import IndicatorModel as MyData

# Create your views here.
from .serializers import MySerializer


class Index(ListView):
    queryset = MyData.objects.all()
    ordering = ['date']
    template_name = 'demo/index.html'

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data()
        context['title'] = 'мой калькулятор'
        context['names'] = MyData.objects.filter(
            name='Количество обращений',
            date__gte=datetime.date(2021, 9, 1),
            date__lte=datetime.date(2021, 9, 3)
        )
        unique = MyData.objects.all()
        unique_names = {}
        for i in unique:
            if not i.name in unique_names:
                unique_names[i.name] = {'fact': [i.fact], 'plan': [i.plan], 'date': [str(i.date)]}
            else:
                unique_names[i.name]['fact'].append(i.fact)
                unique_names[i.name]['plan'].append(i.plan)
                unique_names[i.name]['date'].append(str(i.date))
        context['unique'] = unique_names

        return context



class MyViewSet(viewsets.ModelViewSet):
    queryset = MyData.objects.all()
    serializer_class = MySerializer

