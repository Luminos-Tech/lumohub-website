import asyncio
from app.websocket.connection_manager import ConnectionManager

class LumoGateway:
    def __init__(self) -> None:
        self.manager = ConnectionManager()

    def send_to_user(self, user_id: int, data: dict) -> None:
        try:
            loop = asyncio.get_running_loop()
            loop.create_task(self.manager.send_json(user_id, data))
        except RuntimeError:
            pass

lumo_gateway = LumoGateway()
