from datetime import datetime
from sqlalchemy.orm import Session
from app.crud import crud_event

def list_calendar_items(db: Session, *, user_id: int, start: datetime, end: datetime) -> list[dict]:
    events = crud_event.list_events_between(db, user_id=user_id, start=start, end=end)
    return [{"id": event.id, "title": event.title, "start": event.start_time, "end": event.end_time, "color": event.color, "extendedProps": {"status": event.status, "priority": event.priority, "location": event.location, "description": event.description}} for event in events]
