# Generated by Django 4.1 on 2023-12-15 15:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="groupchat",
            name="group_id",
            field=models.CharField(
                editable=False,
                max_length=100,
                primary_key=True,
                serialize=False,
                unique=True,
            ),
        ),
    ]