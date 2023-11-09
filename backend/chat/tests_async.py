from channels.testing import WebsocketCommunicator
from django.test import TestCase
from chat.consumers import ChatConsumer

class ChatConsumerTest(TestCase):
    async def connect_ws(self, room_name):
        communicator = WebsocketCommunicator(ChatConsumer, f"/ws/chat/{room_name}/")
        connected, subprotocol = await communicator.connect()
        return communicator

    async def disconnect_ws(self, communicator):
        await communicator.disconnect()

    async def test_chat_consumer(self):
        room_name = "test_room"
        communicator = await self.connect_ws(room_name)

        message = {
            "type": "chat_message",
            "message": "Test message"
        }

        await communicator.send_json_to(message)
        response = await communicator.receive_json_from()

        self.assertEqual(response, message)

        await self.disconnect_ws(communicator)
