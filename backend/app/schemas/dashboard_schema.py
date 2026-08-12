from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class GameSummary(BaseModel):
    id: str
    game_mode: str
    status: str
    opponent_id: Optional[str]
    your_color: str
    winner: Optional[str]
    end_reason: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class PlayerDashboardResponse(BaseModel):
    user_id: str
    total_games: int
    wins: int
    losses: int
    draws: int
    win_rate: float
    active_games: List[GameSummary]
    recent_games: List[GameSummary]