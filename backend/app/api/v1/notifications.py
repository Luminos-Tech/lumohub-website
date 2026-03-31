from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_current_user
from app.crud import crud_notification
from app.db.session import get_db
from app.schemas.notification import NotificationRead

router = APIRouter()

@router.get("", response_model=list[NotificationRead])
def list_notifications(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return crud_notification.list_notifications_for_user(db, current_user.id)

@router.patch("/{notification_id}/read", response_model=NotificationRead)
def mark_read(notification_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    notification = crud_notification.get_notification_for_user(db, notification_id, current_user.id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return crud_notification.mark_notification_read(db, notification)

@router.patch("/read-all")
def mark_all_read(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    crud_notification.mark_all_notifications_read(db, current_user.id)
    return {"success": True, "message": "All notifications marked as read"}
