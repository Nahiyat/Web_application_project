from sqlalchemy import Column, Integer, String
from app.core.database import Base


class Tournament(Base):
    __tablename__ = "tournaments"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    tournament_type = Column(String, nullable=False)
    # Offline or Online

    city = Column(String, nullable=False)

    venue = Column(String, nullable=False)

    start_date = Column(String, nullable=False)

    end_date = Column(String, nullable=False)

    start_time = Column(String, nullable=False)

    organizer = Column(String, nullable=False)

    players = Column(Integer, default=0)

    max_players = Column(Integer)

    status = Column(String, default="Open")
