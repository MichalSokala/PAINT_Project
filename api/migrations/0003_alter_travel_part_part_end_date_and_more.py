# Generated by Django 5.1.4 on 2025-01-16 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_cost_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='travel_part',
            name='part_end_date',
            field=models.DateTimeField(verbose_name='End of travel part'),
        ),
        migrations.AlterField(
            model_name='travel_part',
            name='part_start_date',
            field=models.DateTimeField(verbose_name='Beginning of travel part'),
        ),
    ]
