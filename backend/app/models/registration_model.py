from sqlalchemy import Column, Integer, ForeignKey, DateTime, String
from sqlalchemy.orm import relationship
from datetime import datetime

from app.core.database import Base


class Registration(Base):
    __tablename__ = "registrations"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    tournament_id = Column(
        Integer,
        ForeignKey("tournaments.id"),
        nullable=False
    )

    status = Column(
        String,
        default="Registered"
    )

    registered_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    # Relationships

    user = relationship(
        "User",
        back_populates="registrations"
    )

    tournament = relationship(
        "Tournament",
        back_populates="registrations"
    )
