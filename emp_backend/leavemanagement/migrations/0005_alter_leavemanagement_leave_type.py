# Generated by Django 5.0.7 on 2024-08-04 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leavemanagement', '0004_alter_leavemanagement_pending_work_of_employee_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leavemanagement',
            name='leave_type',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
