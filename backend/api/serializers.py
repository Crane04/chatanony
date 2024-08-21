from rest_framework.serializers import ModelSerializer
from .models import *
from rest_framework import serializers

from rest_framework.serializers import ModelSerializer
from .models import GroupChat, Messages
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

class GroupChatSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = GroupChat
        fields = "__all__"

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request and obj.image and hasattr(obj.image, 'url'):
            return request.build_absolute_uri(obj.image.url)
        return None

    def validate(self, data):
        if not data.get('name') and not data.get('image'):
            raise ValidationError("Either 'name' or 'image' must be provided.")
        return data



class MessagesSerializer(ModelSerializer):
    image = serializers.ImageField(required=False)
    message = serializers.CharField(required=False)
    image_url = serializers.SerializerMethodField(method_name='get_image_url', read_only=True)

    def get_image_url(self, obj):
        request = self.context.get('request')
        if request and obj.image:
            scheme = request.scheme
            host = request.get_host()
            return f"{scheme}://{host}{obj.image.url}"
        return None

    class Meta:
        model = Messages
        fields = "__all__"


class LastMessageSerializer(ModelSerializer):
    group_name = serializers.CharField(source='group.name')

    class Meta:
        model = Messages
        fields = ['group_id', 'group_name', 'message', 'time']
