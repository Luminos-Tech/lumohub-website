from __future__ import annotations

from datetime import datetime
from sqlalchemy import and_, select
from sqlalchemy.orm import Session, selectinload
from app.models.event import Event

def get_event_by_id(db: Session, event_id: int) -> Event | None:
    return db.scalar(select(Event).options(selectinload(Event.reminders)).where(Event.id == event_id))

def get_event_for_user(db: Session, event_id: int, user_id: int) -> Event | None:
    return db.scalar(select(Event).options(selectinload(Event.reminders)).where(and_(Event.id == event_id, Event.user_id == user_id)))

def list_events_for_user(db: Session, user_id: int) -> list[Event]:
    stmt = select(Event).options(selectinload(Event.reminders)).where(Event.user_id == user_id).order_by(Event.start_time.asc())
    return list(db.scalars(stmt).all())

def list_events_between(db: Session, user_id: int, start: datetime, end: datetime) -> list[Event]:
    stmt = select(Event).options(selectinload(Event.reminders)).where(and_(Event.user_id == user_id, Event.start_time < end, Event.end_time > start)).order_by(Event.start_time.asc())
    return list(db.scalars(stmt).all())

def update_event(db: Session, event: Event, data: dict) -> Event:
    for key, value in data.items():
        setattr(event, key, value)
    db.add(event)
    db.commit()
    db.refresh(event)
    return event

def delete_event(db: Session, event: Event) -> None:
    db.delete(event)
    db.commit()

def list_all_events(db: Session) -> list[Event]:
    return list(db.scalars(select(Event).options(selectinload(Event.reminders)).order_by(Event.start_time.desc())).all())
