# Generated by Django 4.1 on 2023-12-21 17:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_messages_replied"),
    ]

    operations = [
        migrations.AddField(
            model_name="messages",
            name="image",
            field=models.ImageField(blank=True, default="", null=True, upload_to=""),
        ),
        migrations.AlterField(
            model_name="messages",
            name="message",
            field=models.CharField(blank=True, max_length=9999, null=True),
        ),
    ]
