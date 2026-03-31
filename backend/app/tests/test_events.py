from datetime import datetime, timedelta
from app.schemas.event import EventCreate

def test_event_time_validation():
    start = datetime.utcnow()
    end = start + timedelta(hours=1)
    payload = EventCreate(title="Demo", start_time=start, end_time=end, reminders=[])
    assert payload.title == "Demo"
