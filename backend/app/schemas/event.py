from __future__ import annotations

from datetime import datetime
from pydantic import BaseModel, Field, model_validator
from app.schemas.common import ORMModel
from app.schemas.reminder import ReminderCreate, ReminderRead

class EventBase(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = None
    location: str | None = Field(default=None, max_length=255)
    start_time: datetime
    end_time: datetime
    status: str = "scheduled"
    priority: str = "normal"
    color: str | None = Field(default="#2563eb", max_length=30)

    @model_validator(mode="after")
    def validate_times(self):
        if self.end_time <= self.start_time:
            raise ValueError("end_time must be greater than start_time")
        return self

class EventCreate(EventBase):
    reminders: list[ReminderCreate] = []

class EventUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = None
    location: str | None = Field(default=None, max_length=255)
    start_time: datetime | None = None
    end_time: datetime | None = None
    status: str | None = None
    priority: str | None = None
    color: str | None = Field(default=None, max_length=30)

class EventRead(ORMModel):
    id: int
    user_id: int
    title: str
    description: str | None
    location: str | None
    start_time: datetime
    end_time: datetime
    status: str
    priority: str
    color: str | None
    created_at: datetime
    updated_at: datetime
    reminders: list[ReminderRead] = []
