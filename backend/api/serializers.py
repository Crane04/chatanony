from rest_framework.serializers import ModelSerializer
from .models import *

class GroupChatSerializer(ModelSerializer):
    class Meta:
        model = GroupChat
        fields =  "__all__"

class MessagesSerializer(ModelSerializer):
    class Meta:
        model = Messages
        fields = "__all__"