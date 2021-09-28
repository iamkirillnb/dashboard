from django.contrib import admin

# Register your models here.
from .models import IndicatorModel



class IndicatorAdmin(admin.ModelAdmin):
    list_display = ('name', 'fact', 'plan', 'date', 'active',)
    list_display_links = ('name', 'fact', 'plan', 'date',)



admin.site.register(IndicatorModel, IndicatorAdmin)