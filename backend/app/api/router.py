from fastapi import APIRouter
from app.api.v1 import admin, auth, events, logs, notifications, reminders, users, websocket_lumo

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(events.router, prefix="/events", tags=["events"])
api_router.include_router(reminders.router, prefix="/reminders", tags=["reminders"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["notifications"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
api_router.include_router(logs.router, prefix="/logs", tags=["logs"])
api_router.include_router(websocket_lumo.router, tags=["lumo"])
