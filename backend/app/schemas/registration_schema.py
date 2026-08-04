from pydantic import BaseModel
from datetime import datetime


# -----------------------------
# Create Registration
# -----------------------------
class RegistrationCreate(BaseModel):
    user_id: int
    tournament_id: int


# -----------------------------
# Registration Response
# -----------------------------
class RegistrationResponse(BaseModel):
    id: int
    user_id: int
    tournament_id: int
    status: str
    registered_at: datetime

    class Config:
        from_attributes = True


# -----------------------------
# My Tournament Response
# -----------------------------
class MyTournamentResponse(BaseModel):
    registration_id: int

    tournament_id: int
    tournament_name: str

    organizer: str

    city: str

    venue: str

    start_date: str

    end_date: str

    start_time: str

    tournament_type: str

    players: int

    max_players: int

    status: str

    class Config:
        from_attributes = True
