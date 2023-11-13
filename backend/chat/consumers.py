import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework.authtoken.models import Token

from .models import Message, Conversation
from .serializers import MessageSerializer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data=None, bytes_data=None):
        # parse the json data into dictionary object
        text_data_json = json.loads(text_data)

        # Send message to room group
        chat_type = {"type": "chat_message", "user_id": self.scope["user"].id}
        return_dict = {**chat_type, **text_data_json}

        await self.channel_layer.group_send(
            self.room_group_name,
            return_dict,
        )

    async def chat_message(self, event):
        text_data_json = event.copy()
        text_data_json.pop("type")
        message = text_data_json["message"]

        conversation = await self.get_conversation()

        sender_id = event["user_id"]

        # Check if sender is in the group
        if sender_id != self.scope["user"].id:
            _message = await self.create_message(sender_id, message, conversation)

            serializer = MessageSerializer(instance=_message)
            await self.send(text_data=json.dumps(serializer.data))

    async def get_conversation(self):
        return await self.get_conversation_instance()

    async def create_message(self, sender_id, text, conversation):
        return await self.create_message_instance(sender_id, text, conversation)

    @database_sync_to_async
    def get_conversation_instance(self):
        return Conversation.objects.get(id=int(self.room_name))

    @database_sync_to_async
    def create_message_instance(self, sender_id, text, conversation):
        return Message.objects.create(
            sender_id=sender_id,
            text=text,
            conversation_id=conversation,
        )

    @database_sync_to_async
    def get_user_from_token(self, token_key):
        try:
            token = Token.objects.get(key=token_key)
            return token.user
        except Token.DoesNotExist:
            return None
