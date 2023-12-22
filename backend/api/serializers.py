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
    image_url = serializers.SerializerMethodField(method_name='get_image_url', read_only=True)

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request and request.method == 'GET' and obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None
    class Meta:
        model = Messages
        fields = "__all__"