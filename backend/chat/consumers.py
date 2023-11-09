import json

from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from channels.generic.websocket import WebsocketConsumer
from rest_framework.authtoken.admin import User
from rest_framework.authtoken.models import Token

from .models import Message, Conversation
from .serializers import MessageSerializer


class ChatConsumer(WebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.room_group_name = None
        self.room_name = None

    def connect(self):
        print("here", self.scope['user'])
        self.scope['user'] = self.scope["user"]
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    def receive(self, text_data=None, bytes_data=None):
        # parse the json data into dictionary object
        text_data_json = json.loads(text_data)

        # Send message to room group
        chat_type = {"type": "chat_message"}
        return_dict = {**chat_type, **text_data_json}
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            return_dict,
        )

    def chat_message(self, event):
        text_data_json = event.copy()
        text_data_json.pop("type")
        message = text_data_json["message"]

        conversation = Conversation.objects.get(id=int(self.room_name))
        sender = self.scope['user']

        if isinstance(sender, User):
            _message = Message.objects.create(
                sender=sender,
                text=message,
                conversation_id=conversation,
            )
            serializer = MessageSerializer(instance=_message)
            self.send(
                text_data=json.dumps(
                    serializer.data
                )
            )
        else:
            _message = Message.objects.create(
                    sender=sender,
                    text=message,
                    conversation_id=conversation,
                )
            serializer = MessageSerializer(instance=_message)
            # Send message to WebSocket
            self.send(
                text_data=json.dumps(
                    serializer.data
                )
            )

    @database_sync_to_async
    def get_user_from_token(self, token_key):
        try:
            token = Token.objects.get(key=token_key)
            return token.user
        except Token.DoesNotExist:
            return None
