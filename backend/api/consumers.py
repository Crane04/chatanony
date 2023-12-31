import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = self.scope['url_route']['kwargs']['room_name']

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()


    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        replied = text_data_json["replied"]

        if "image" in text_data_json:
            image = text_data_json["image"]
        else:
            image = None

        

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
                "replied": replied,
                "image": image
            }
        )

    def chat_message(self, event):
        message = event["message"]
        replied = event["replied"]
        image = event["image"]

        if "image" in event:
            image = event["image"]
        else:
            image = None

        self.send(
            text_data=json.dumps({
                "type": "chat",
                "message": message,
                "replied": replied,
                "image": image
            })
        )
