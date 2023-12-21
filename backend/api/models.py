from django.db import models
from datetime import timezone
import uuid, re
# Create your models here.


class GroupChat(models.Model):
    group_id = models.CharField(max_length = 100, primary_key=True, unique=True, editable = False)
    name = models.CharField(max_length=100)
    created_at = models.CharField(max_length=1000)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.group_id:
            group_id = re.findall(r"[a-zA-Z0-9]", self.name)
            group_id = "".join(group_id)
            self.group_id = group_id + str(uuid.uuid4()).replace("-", "")[:6]
        super().save(*args, **kwargs)


def upload_image_path(instance, filename):
    # Define the upload path for images
    return f"images/{filename}"

class Messages(models.Model):
    group = models.ForeignKey(GroupChat, on_delete=models.CASCADE, related_name = "room")
    message = models.CharField(max_length=9999, blank = True, null = True)
    image = models.ImageField(default = "", blank = True, null= True, upload_to = upload_image_path)

    # Any of message or Image field can be blank, but not both...
    # Both of them can be filled though...

    time = models.CharField(max_length=1000)
    replied = models.CharField(max_length = 1000, blank = True, null = True)

    def __str__(self):
        return str(self.group)
    