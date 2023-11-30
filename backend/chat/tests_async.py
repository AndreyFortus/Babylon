import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'babylon_project.settings')
django.setup()

import json
import time
import unittest
import websocket
from .models import Message

class WebSocketTest(unittest.TestCase):
    def setUp(self):
        self.token = "b712ed6d26e50d86d852557ee33c222b3fc4af95"
        self.url = f"ws://127.0.0.1:8080/ws/chat/1/?protocol=Token%20{self.token}"
        self.created_message_id = None

    def tearDown(self):
        # Delete the created object from the database
        if self.created_message_id is not None:
            Message.objects.filter(id=self.created_message_id).delete()

    def test_websocket_connection(self):
        ws = websocket.create_connection(self.url)

        try:
            message_data = {
                "message": "Hello, WebSocket!"
            }

            message_json = json.dumps(message_data)
            ws.send(message_json)
            print(f"Sent: {message_json}")

            time.sleep(2)

            response = ws.recv()
            print(f"Received: {response}")

            self.assertIn("Hello, WebSocket!", response)

            # Capture the created object ID
            self.created_message_id = json.loads(response)['id']

        finally:
            ws.close()


if __name__ == "__main__":
    unittest.main()
