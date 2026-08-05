# app/models/game_model.py

import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey
from datetime import datetime
from app.core.database import Base


class Game(Base):
    __tablename__ = "games"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))

    white_player_id = Column(
        String,
        ForeignKey("users.id"),
        nullable=False
    )

    black_player_id = Column(
        String,
        ForeignKey("users.id"),
        nullable=False
    )

    status = Column(String, default="active")

    created_at = Column(DateTime, default=datetime.now())