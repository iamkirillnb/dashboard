from django.db import models

# Create your models here.

class MyData(models.Model):
    name = models.CharField(max_length=255)
    fact = models.PositiveIntegerField()
    plan = models.PositiveIntegerField(blank=True, null=True)
    date = models.DateField()

    def __str__(self):
        return self.name

