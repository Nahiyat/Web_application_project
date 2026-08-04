from pydantic import BaseModel


class TournamentBase(BaseModel):
    name: str
    tournament_type: str
    city: str
    venue: str
    start_date: str
    end_date: str
    start_time: str
    organizer: str
    players: int
    max_players: int
    status: str


class TournamentCreate(TournamentBase):
    pass


class TournamentResponse(TournamentBase):
    id: int

    class Config:
        from_attributes = True
