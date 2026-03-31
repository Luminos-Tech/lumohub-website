from __future__ import annotations

from datetime import datetime, timedelta, timezone
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.event import Event
from app.models.reminder import Reminder

def list_reminders_for_event(db: Session, event_id: int) -> list[Reminder]:
    return list(db.scalars(select(Reminder).where(Reminder.event_id == event_id).order_by(Reminder.created_at.desc())).all())

def get_reminder(db: Session, reminder_id: int) -> Reminder | None:
    return db.get(Reminder, reminder_id)

def delete_reminder(db: Session, reminder: Reminder) -> None:
    db.delete(reminder)
    db.commit()

def update_reminder(db: Session, reminder: Reminder, data: dict) -> Reminder:
    for key, value in data.items():
        setattr(reminder, key, value)
    db.add(reminder)
    db.commit()
    db.refresh(reminder)
    return reminder

def get_due_reminders(db: Session) -> list[Reminder]:
    now = datetime.now(timezone.utc)
    candidates = list(db.scalars(select(Reminder).join(Event, Reminder.event_id == Event.id).where(Reminder.is_sent.is_(False))).all())
    due_items = []
    for reminder in candidates:
        trigger_at = reminder.event.start_time.replace(tzinfo=timezone.utc) - timedelta(minutes=reminder.remind_before_minutes)
        if trigger_at <= now:
            due_items.append(reminder)
    return due_items
