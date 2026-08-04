from sqlalchemy.orm import Session

from app.models.tournament_model import Tournament
from app.schemas.tournament_schema import TournamentCreate


# -----------------------------
# Get Offline Tournaments
# -----------------------------
def get_offline_tournaments(db: Session):

    tournaments = (
        db.query(Tournament)
        .filter(Tournament.tournament_type == "Offline")
        .all()
    )

    return tournaments


# -----------------------------
# Get Online Tournaments
# -----------------------------
def get_online_tournaments(db: Session):

    tournaments = (
        db.query(Tournament)
        .filter(Tournament.tournament_type == "Online")
        .all()
    )

    return tournaments


# -----------------------------
# Get Tournament by ID
# -----------------------------
def get_tournament_by_id(
    tournament_id: int,
    db: Session
):

    tournament = (
        db.query(Tournament)
        .filter(Tournament.id == tournament_id)
        .first()
    )

    return tournament


# -----------------------------
# Create Tournament
# -----------------------------
def create_tournament(
    tournament: TournamentCreate,
    db: Session
):

    new_tournament = Tournament(

        name=tournament.name,

        tournament_type=tournament.tournament_type,

        city=tournament.city,

        venue=tournament.venue,

        start_date=tournament.start_date,

        end_date=tournament.end_date,

        start_time=tournament.start_time,

        organizer=tournament.organizer,

        players=tournament.players,

        max_players=tournament.max_players,

        status=tournament.status,

    )

    db.add(new_tournament)

    db.commit()

    db.refresh(new_tournament)

    return new_tournament


# -----------------------------
# Register Player
# -----------------------------
def register_player(
    tournament_id: int,
    db: Session
):

    tournament = (
        db.query(Tournament)
        .filter(Tournament.id == tournament_id)
        .first()
    )

    if tournament is None:
        return None

    if tournament.players >= tournament.max_players:
        return None

    tournament.players += 1

    db.commit()

    db.refresh(tournament)

    return tournament
