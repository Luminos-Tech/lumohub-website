from __future__ import annotations

from datetime import datetime
from pydantic import BaseModel
from app.schemas.common import ORMModel

class NotificationRead(ORMModel):
    id: int
    user_id: int
    event_id: int | None
    title: str
    content: str
    channel: str
    is_read: bool
    created_at: datetime
    read_at: datetime | None = None

class NotificationCreate(BaseModel):
    user_id: int
    event_id: int | None = None
    title: str
    content: str
    channel: str = "web"
