from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_current_user
from app.crud import crud_event, crud_reminder
from app.db.session import get_db
from app.models.reminder import Reminder
from app.schemas.reminder import ReminderCreate, ReminderRead, ReminderUpdate
from app.services.log_service import write_log

router = APIRouter()

@router.get("/event/{event_id}", response_model=list[ReminderRead])
def list_event_reminders(event_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    event = crud_event.get_event_for_user(db, event_id, current_user.id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return crud_reminder.list_reminders_for_event(db, event_id)

@router.post("/event/{event_id}", response_model=ReminderRead)
def create_event_reminder(event_id: int, payload: ReminderCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    event = crud_event.get_event_for_user(db, event_id, current_user.id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    reminder = Reminder(event_id=event.id, **payload.model_dump())
    db.add(reminder)
    db.commit()
    db.refresh(reminder)
    write_log(db, action="create_reminder", user_id=current_user.id, target_type="reminder", target_id=reminder.id, details=f"Event {event.id}")
    return reminder

@router.patch("/{reminder_id}", response_model=ReminderRead)
def patch_reminder(reminder_id: int, payload: ReminderUpdate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    reminder = crud_reminder.get_reminder(db, reminder_id)
    if not reminder or reminder.event.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Reminder not found")
    updated = crud_reminder.update_reminder(db, reminder, payload.model_dump(exclude_none=True))
    write_log(db, action="update_reminder", user_id=current_user.id, target_type="reminder", target_id=updated.id, details="Reminder updated")
    return updated

@router.delete("/{reminder_id}")
def remove_reminder(reminder_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    reminder = crud_reminder.get_reminder(db, reminder_id)
    if not reminder or reminder.event.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Reminder not found")
    crud_reminder.delete_reminder(db, reminder)
    write_log(db, action="delete_reminder", user_id=current_user.id, target_type="reminder", target_id=reminder_id, details="Reminder deleted")
    return {"success": True, "message": "Reminder deleted"}
