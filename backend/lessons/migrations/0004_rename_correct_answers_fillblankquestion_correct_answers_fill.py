# Generated by Django 4.2.6 on 2023-10-12 14:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lessons', '0003_alter_fillblankquestion_correct_answers'),
    ]

    operations = [
        migrations.RenameField(
            model_name='fillblankquestion',
            old_name='correct_answers',
            new_name='correct_answers_fill',
        ),
    ]
