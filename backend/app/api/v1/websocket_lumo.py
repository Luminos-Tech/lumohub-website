from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.websocket.lumo_gateway import lumo_gateway

router = APIRouter()

@router.websocket("/ws/lumo/{user_id}")
async def websocket_lumo(websocket: WebSocket, user_id: int):
    await lumo_gateway.manager.connect(user_id, websocket)
    await websocket.send_json({"type": "connected", "user_id": user_id, "message": "LUMO connected"})
    try:
        while True:
            data = await websocket.receive_json()
            await websocket.send_json({"type": "echo", "payload": data})
    except WebSocketDisconnect:
        lumo_gateway.manager.disconnect(user_id, websocket)
