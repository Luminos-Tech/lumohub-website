from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.api.deps import get_current_user
from app.crud import crud_event
from app.db.session import get_db
from app.schemas.event import EventCreate, EventRead, EventUpdate
from app.services.calendar_service import list_calendar_items
from app.services.event_service import create_user_event, delete_user_event, update_user_event

router = APIRouter()

@router.get("", response_model=list[EventRead])
def list_events(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return crud_event.list_events_for_user(db, current_user.id)

@router.get("/calendar")
def get_calendar(start: datetime = Query(...), end: datetime = Query(...), db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return list_calendar_items(db, user_id=current_user.id, start=start, end=end)

@router.get("/{event_id}", response_model=EventRead)
def get_event(event_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    event = crud_event.get_event_for_user(db, event_id, current_user.id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@router.post("", response_model=EventRead, status_code=status.HTTP_201_CREATED)
def create_event(payload: EventCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return create_user_event(db, user_id=current_user.id, payload=payload)

@router.patch("/{event_id}", response_model=EventRead)
def patch_event(event_id: int, payload: EventUpdate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    event = crud_event.get_event_for_user(db, event_id, current_user.id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return update_user_event(db, event=event, payload=payload, user_id=current_user.id)

@router.delete("/{event_id}")
def remove_event(event_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    event = crud_event.get_event_for_user(db, event_id, current_user.id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    delete_user_event(db, event=event, user_id=current_user.id)
    return {"success": True, "message": "Event deleted"}
