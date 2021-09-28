from django.contrib import admin
from .models import MyData
# Register your models here.

class MyDataAdmin(admin.ModelAdmin):
    list_display = ('name', 'fact', 'plan', 'date')

admin.site.register(MyData, MyDataAdmin)