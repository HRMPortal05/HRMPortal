# Generated by Django 5.0.7 on 2024-09-23 10:05

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('attendance', '0003_alter_attendance_created_date_alter_attendance_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attendance',
            name='created_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]