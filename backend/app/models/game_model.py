import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey
from app.core.database import Base

STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"


class Game(Base):
    __tablename__ = "games"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    white_player_id = Column(String, ForeignKey("users.id"), nullable=False)
    black_player_id = Column(String, ForeignKey("users.id"), nullable=False)
    status = Column(String, default="active")
    fen = Column(String, default=STARTING_FEN)
    created_at = Column(DateTime, default=datetime.now())
    winner = Column(String, nullable=True)    # "white", "black", or "draw"
    end_reason = Column(String, nullable=True) # "checkmate", "stalemate", etc.
    completed_at = Column(DateTime, nullable=True)