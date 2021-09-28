import uuid as uuid
from django.db import models


class IndicatorModel(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    name = models.CharField(max_length=255, verbose_name='Показатель')
    fact = models.CharField(max_length=255, verbose_name='значение факт')
    plan = models.CharField(max_length=255, verbose_name='значение план', null=True, blank=True)
    date = models.DateField(verbose_name='дата')
    active = models.BooleanField(default=False, verbose_name='отработано / не отработано')

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['date']