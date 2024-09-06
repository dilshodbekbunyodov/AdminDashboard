from collections import defaultdict
# user_data[ip].append("test")
#
# print(user_data)

# message = ws.open()
#
# ip = message.ip
#
# user_data[ip].push(message.location)


import asyncio
import json

import websockets

user_data = defaultdict(list)


async def connect():
    a = 0
    uri = "ws://192.168.31.88:6789/admin"  # Replace with your WebSocket server URI
    async with websockets.connect(uri) as websocket:
        while True:
            # Send a message

            response = await websocket.recv()
            try:
                data = json.loads(response)
                ip = data.get('ip')

                print(data.get('location'))
                user_data[ip].append(data.get('location'))

            except:
                pass

            print("user_data->>>>> ", user_data)


# Run the event loop
asyncio.get_event_loop().run_until_complete(connect())
