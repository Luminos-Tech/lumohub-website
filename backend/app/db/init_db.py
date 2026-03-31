from app.core.database import engine
from app.models.base import Base
from app.models import user, event, reminder, notification, system_log, user_session, admin_action  # noqa

def init_db() -> None:
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    init_db()
