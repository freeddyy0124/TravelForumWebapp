# Generated by Django 4.1.3 on 2022-12-12 02:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0023_userprofile_numcomments_userprofile_numposts'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='numComments',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='numPosts',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
