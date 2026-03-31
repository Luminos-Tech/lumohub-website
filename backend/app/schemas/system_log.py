from __future__ import annotations

from datetime import datetime
from pydantic import BaseModel
from app.schemas.common import ORMModel

class SystemLogRead(ORMModel):
    id: int
    user_id: int | None
    action: str
    target_type: str | None
    target_id: int | None
    details: str | None
    ip_address: str | None
    created_at: datetime
