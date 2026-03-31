from sqlalchemy.orm import Session
from app.crud import crud_event
from app.models.event import Event
from app.models.reminder import Reminder
from app.schemas.event import EventCreate, EventUpdate
from app.services.log_service import write_log

def create_user_event(db: Session, *, user_id: int, payload: EventCreate) -> Event:
    event = Event(user_id=user_id, title=payload.title, description=payload.description, location=payload.location, start_time=payload.start_time, end_time=payload.end_time, status=payload.status, priority=payload.priority, color=payload.color)
    db.add(event)
    db.flush()
    for reminder_item in payload.reminders:
        db.add(Reminder(event_id=event.id, remind_before_minutes=reminder_item.remind_before_minutes, channel=reminder_item.channel))
    db.commit()
    db.refresh(event)
    write_log(db, action="create_event", user_id=user_id, target_type="event", target_id=event.id, details=event.title)
    return crud_event.get_event_by_id(db, event.id)

def update_user_event(db: Session, *, event: Event, payload: EventUpdate, user_id: int) -> Event:
    updated = crud_event.update_event(db, event, payload.model_dump(exclude_none=True))
    write_log(db, action="update_event", user_id=user_id, target_type="event", target_id=updated.id, details=updated.title)
    return updated

def delete_user_event(db: Session, *, event: Event, user_id: int) -> None:
    event_id = event.id
    title = event.title
    crud_event.delete_event(db, event)
    write_log(db, action="delete_event", user_id=user_id, target_type="event", target_id=event_id, details=title)
