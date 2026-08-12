import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime, ForeignKey, Integer
from app.core.database import Base

STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"


class Game(Base):
    __tablename__ = "games"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    white_player_id = Column(String, ForeignKey("users.id"), nullable=False)
    
    # Set nullable=True if you decide to store PvC games without a second human user
    black_player_id = Column(String, ForeignKey("users.id"), nullable=True) 
    
    game_mode = Column(String, default="pvp") # "pvp" or "pvc"
    bot_difficulty = Column(Integer, nullable=True) # 1 to 5

    status = Column(String, default="active")
    fen = Column(String, default=STARTING_FEN)
    
    # Modern timezone-aware UTC datetime default
    created_at = Column(
        DateTime(timezone=True), 
        default=lambda: datetime.now(timezone.utc)
    )
    
    winner = Column(String, nullable=True)     # "white", "black", or "draw"
    end_reason = Column(String, nullable=True) # "checkmate", "stalemate", etc.
    completed_at = Column(DateTime(timezone=True), nullable=True)