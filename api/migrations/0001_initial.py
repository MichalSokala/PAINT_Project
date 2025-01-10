# Generated by Django 5.1.4 on 2025-01-10 15:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Travel',
            fields=[
                ('travel_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('main_destination', models.CharField(max_length=100)),
                ('start_date', models.DateTimeField(verbose_name='Beginning of travel date')),
                ('end_date', models.DateTimeField(verbose_name='End of travel date')),
                ('is_completed', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20)),
                ('surname', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Item_list',
            fields=[
                ('item_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('is_packed', models.BooleanField(default=False)),
                ('travel_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.travel')),
            ],
        ),
        migrations.CreateModel(
            name='Cost',
            fields=[
                ('cost_id', models.AutoField(primary_key=True, serialize=False)),
                ('category', models.CharField(max_length=40)),
                ('amount', models.IntegerField()),
                ('travel_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.travel')),
            ],
        ),
        migrations.CreateModel(
            name='Travel_part',
            fields=[
                ('part_id', models.AutoField(primary_key=True, serialize=False)),
                ('start_location', models.CharField(max_length=120)),
                ('end_location', models.CharField(max_length=120)),
                ('transport', models.CharField(max_length=120)),
                ('part_start_date', models.DateTimeField(verbose_name='Date on which said part of a travel starts')),
                ('part_end_date', models.DateTimeField(verbose_name='Date on which said part of a travel ends')),
                ('travel_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.travel')),
            ],
        ),
        migrations.CreateModel(
            name='Places_to_see',
            fields=[
                ('place_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('country', models.CharField(max_length=100)),
                ('part_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.travel_part')),
            ],
        ),
        migrations.CreateModel(
            name='Travel_group',
            fields=[
                ('group_id', models.AutoField(primary_key=True, serialize=False)),
                ('travel_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.travel')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
        migrations.AddField(
            model_name='travel',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user'),
        ),
    ]
