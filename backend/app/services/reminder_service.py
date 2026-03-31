from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.crud import crud_reminder
from app.models.notification import Notification
from app.services.log_service import write_log
from app.websocket.lumo_gateway import lumo_gateway

def process_due_reminders(db: Session) -> int:
    due_reminders = crud_reminder.get_due_reminders(db)
    processed = 0
    for reminder in due_reminders:
        event = reminder.event
        content = f"Sắp đến lịch: {event.title} lúc {event.start_time.isoformat()}"
        db.add(Notification(user_id=event.user_id, event_id=event.id, title="Nhắc lịch", content=content, channel=reminder.channel))
        reminder.is_sent = True
        reminder.sent_at = datetime.now(timezone.utc)
        db.add(reminder)
        db.commit()
        if reminder.channel == "lumo":
            lumo_gateway.send_to_user(event.user_id, {"type": "reminder", "event_id": event.id, "title": event.title, "content": content, "start_time": event.start_time.isoformat()})
        write_log(db, action="send_reminder", user_id=event.user_id, target_type="reminder", target_id=reminder.id, details=content)
        processed += 1
    return processed
