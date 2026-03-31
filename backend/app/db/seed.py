from datetime import datetime, timedelta
from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models.event import Event
from app.models.reminder import Reminder
from app.models.user import User

def seed() -> None:
    db = SessionLocal()
    try:
        admin = db.query(User).filter(User.email == "admin@lumohub.local").first()
        user = db.query(User).filter(User.email == "user@lumohub.local").first()
        if not admin:
            admin = User(full_name="LumoHub Admin", email="admin@lumohub.local", password_hash=hash_password("Admin@123"), role="admin", is_active=True)
            db.add(admin)
        if not user:
            user = User(full_name="LumoHub User", email="user@lumohub.local", password_hash=hash_password("User@1234"), role="user", is_active=True)
            db.add(user)
        db.commit()
        db.refresh(admin)
        db.refresh(user)
        sample_event = db.query(Event).filter(Event.user_id == user.id, Event.title == "Họp nhóm LumoHub").first()
        if not sample_event:
            start = datetime.utcnow() + timedelta(hours=2)
            end = start + timedelta(hours=1)
            sample_event = Event(user_id=user.id, title="Họp nhóm LumoHub", description="Trao đổi tiến độ dự án", location="Phòng họp A", start_time=start, end_time=end, status="scheduled", priority="high", color="#2563eb")
            db.add(sample_event)
            db.flush()
            db.add(Reminder(event_id=sample_event.id, remind_before_minutes=30, channel="web"))
            db.commit()
    finally:
        db.close()

if __name__ == "__main__":
    seed()
