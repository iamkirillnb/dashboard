# Generated by Django 3.2.7 on 2021-09-21 12:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('demo', '0004_alter_mydata_plan'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mydata',
            name='plan',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
