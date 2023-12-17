from django.contrib import admin
from .models import *
# Register your models here.


class GroupChatAdmin(admin.ModelAdmin):
    list_display = ["group_id","name", "created_at"]

class MessagesAdmin(admin.ModelAdmin):
    list_display = ["group", "message", "time"]

admin.site.register(GroupChat, GroupChatAdmin)
admin.site.register(Messages, MessagesAdmin)