import json
import time
import websocket

url = "ws://127.0.0.1:8080/ws/chat/2/"
token = "b712ed6d26e50d86d852557ee33c222b3fc4af95"

headers = {
    "Sec-WebSocket-Protocol": f"Token {token}"
}

ws = websocket.create_connection(url, header=headers, timeout=60)

try:
    message_data = {
        "message": "Hello, WebSocket!"
    }

    message_json = json.dumps(message_data)
    ws.send(message_json)
    print(f"Sent: {message_json}")

    time.sleep(1)

    response = ws.recv()
    print(f"Received: {response}")

finally:
    ws.close()
