from app.websocket.lumo_gateway import lumo_gateway

def push_manual_message_to_lumo(user_id: int, message: str) -> None:
    lumo_gateway.send_to_user(user_id, {"type": "manual_message", "user_id": user_id, "content": message})
