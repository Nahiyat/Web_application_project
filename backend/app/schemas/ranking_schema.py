

from pydantic import BaseModel
from typing import Optional, List

class LeaderboardUser(BaseModel):
    rank: int
    id: str
    username: str
    rating: int
    is_guest: bool

    class Config:
        from_attributes = True

class LeaderboardResponse(BaseModel):
    total_players: int
    rankings: List[LeaderboardUser]
