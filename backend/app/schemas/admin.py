from __future__ import annotations

from datetime import datetime
from pydantic import BaseModel
from app.schemas.common import ORMModel

class AdminActionRead(ORMModel):
    id: int
    admin_user_id: int
    action: str
    target_type: str | None
    target_id: int | None
    note: str | None
    created_at: datetime
