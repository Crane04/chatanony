from rest_framework.serializers import ModelSerializer
from .models import *
from rest_framework import serializers

class GroupChatSerializer(ModelSerializer):
    class Meta:
        model = GroupChat
        fields =  "__all__"

class MessagesSerializer(ModelSerializer):
    image = serializers.ImageField(required=False)
    message = serializers.CharField(required = False)
    class Meta:
        model = Messages
        fields = "__all__"