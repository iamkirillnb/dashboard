# Generated by Django 3.2.7 on 2021-09-21 07:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('demo', '0002_auto_20210921_1039'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mydata',
            name='plan',
            field=models.PositiveIntegerField(blank=True),
        ),
    ]
