# Generated by Django 5.0 on 2024-01-16 11:00

import imagehandling.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('imagehandling', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='processedimage',
            name='input_image',
            field=models.ImageField(upload_to=imagehandling.models.input_image_path),
        ),
        migrations.AlterField(
            model_name='processedimage',
            name='output_image',
            field=models.ImageField(upload_to=imagehandling.models.output_image_path),
        ),
    ]
