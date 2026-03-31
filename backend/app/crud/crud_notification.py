from datetime import datetime, timezone
from sqlalchemy import select, update
from sqlalchemy.orm import Session
from app.models.notification import Notification

def list_notifications_for_user(db: Session, user_id: int) -> list[Notification]:
    return list(db.scalars(select(Notification).where(Notification.user_id == user_id).order_by(Notification.created_at.desc())).all())

def get_notification_for_user(db: Session, notification_id: int, user_id: int) -> Notification | None:
    return db.scalar(select(Notification).where(Notification.id == notification_id, Notification.user_id == user_id))

def mark_notification_read(db: Session, notification: Notification) -> Notification:
    notification.is_read = True
    notification.read_at = datetime.now(timezone.utc)
    db.add(notification)
    db.commit()
    db.refresh(notification)
    return notification

def mark_all_notifications_read(db: Session, user_id: int) -> None:
    db.execute(update(Notification).where(Notification.user_id == user_id, Notification.is_read.is_(False)).values(is_read=True, read_at=datetime.now(timezone.utc)))
    db.commit()
