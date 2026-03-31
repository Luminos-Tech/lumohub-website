from __future__ import annotations

from datetime import datetime
from pydantic import BaseModel, Field
from app.schemas.common import ORMModel

class ReminderCreate(BaseModel):
    remind_before_minutes: int = Field(ge=0, le=10080)
    channel: str = "web"

class ReminderUpdate(BaseModel):
    remind_before_minutes: int | None = Field(default=None, ge=0, le=10080)
    channel: str | None = None
    is_sent: bool | None = None

class ReminderRead(ORMModel):
    id: int
    event_id: int
    remind_before_minutes: int
    channel: str
    is_sent: bool
    sent_at: datetime | None = None
    created_at: datetime
