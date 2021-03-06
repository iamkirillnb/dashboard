# Generated by Django 3.2.7 on 2021-09-21 12:55

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='IndicatorModel',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, verbose_name='Показатель')),
                ('fact', models.CharField(max_length=255, verbose_name='значение факт')),
                ('plan', models.CharField(max_length=255, verbose_name='значение план')),
                ('date', models.DateField(verbose_name='дата')),
                ('active', models.BooleanField(default=False, verbose_name='отработано / не отработано')),
            ],
        ),
    ]
