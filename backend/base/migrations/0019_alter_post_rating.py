# Generated by Django 4.1.3 on 2022-11-22 00:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0018_notification_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='rating',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=7, null=True),
        ),
    ]
