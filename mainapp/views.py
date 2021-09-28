from django.shortcuts import render, redirect, get_list_or_404, get_object_or_404
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from collections import OrderedDict

from django.views import View
from django.views.generic import TemplateView, ListView
from .models import IndicatorModel

from .forms import IndicatorForm
import os


def pars(letter):
    letter = str(letter)
    letter = letter.replace('[', '')
    letter = letter.replace(']', '')
    letter = letter.replace('"', '')
    letter = letter.split(',')
    return letter


class Index(ListView):
    template_name = 'mainapp/index.html'
    model = IndicatorModel

    def get_context_data(self, **kwargs):
        fields_indicator = [field.verbose_name for field in IndicatorModel._meta.get_fields()[1:]]
        indicator_form = IndicatorForm()
        context = super().get_context_data()
        context['fields_indicator'] = fields_indicator[2:]
        # context['indicator_form'] = indicator_form
        unique = IndicatorModel.objects.all()
        unique_names = {}
        for i in unique:
            if not i.name in unique_names:
                unique_names[i.name] = {'fact': [i.fact], 'plan': [i.plan], 'date': [str(i.date)]}
            else:
                unique_names[i.name]['fact'].append(i.fact)
                unique_names[i.name]['plan'].append(i.plan)
                unique_names[i.name]['date'].append(str(i.date))
        labels = []
        for i in unique_names:
            labels.append(i)
        context['indicator_form'] = labels
        return context


class Pie(TemplateView):
    template_name = 'mainapp/pie.html'
    model = IndicatorModel


    def get_context_data(self, **kwargs):
        fields_indicator = [field.verbose_name for field in IndicatorModel._meta.get_fields()[1:]]
        indicator_form = IndicatorForm()
        context = super().get_context_data()
        context['fields_indicator'] = fields_indicator[1:]
        # context['indicator_form'] = indicator_form
        unique = IndicatorModel.objects.all()
        unique_names = {}
        for i in unique:
            if not i.name in unique_names:
                unique_names[i.name] = {'fact': [i.fact], 'plan': [i.plan], 'date': [str(i.date)]}
            else:
                unique_names[i.name]['fact'].append(i.fact)
                unique_names[i.name]['plan'].append(i.plan)
                unique_names[i.name]['date'].append(str(i.date))
        labels = []
        for i in unique_names:
            labels.append(i)
        context['indicator_form'] = labels
        return context
