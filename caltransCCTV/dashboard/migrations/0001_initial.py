# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-08 21:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Camera',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_link', models.CharField(max_length=250)),
                ('name', models.CharField(max_length=200)),
                ('region', models.CharField(max_length=100)),
                ('feed', models.CharField(max_length=300)),
            ],
            options={
                'db_table': 'cameras',
            },
        ),
    ]