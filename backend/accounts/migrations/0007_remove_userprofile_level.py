# Generated by Django 4.2.6 on 2023-10-23 12:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_alter_userprofile_level'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='level',
        ),
    ]
