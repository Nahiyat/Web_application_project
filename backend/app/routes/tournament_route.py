from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.tournament_schema import (
    TournamentCreate,
    TournamentResponse,
)

from app.controllers.tournament_controller import (
    get_offline_tournaments,
    get_online_tournaments,
    get_tournament_by_id,
    create_tournament,
    register_player,
)

router = APIRouter()



@router.get(
    "/offline",
    response_model=list[TournamentResponse]
)
def offline_tournaments(
    db: Session = Depends(get_db)
):

    return get_offline_tournaments(db)



@router.get(
    "/online",
    response_model=list[TournamentResponse]
)
def online_tournaments(
    db: Session = Depends(get_db)
):

    return get_online_tournaments(db)



@router.get(
    "/{tournament_id}",
    response_model=TournamentResponse
)
def tournament_details(
    tournament_id: int,
    db: Session = Depends(get_db)
):

    tournament = get_tournament_by_id(
        tournament_id,
        db
    )

    if tournament is None:
        raise HTTPException(
            status_code=404,
            detail="Tournament not found"
        )

    return tournament



@router.post(
    "/",
    response_model=TournamentResponse
)
def add_tournament(
    tournament: TournamentCreate,
    db: Session = Depends(get_db)
):

    return create_tournament(
        tournament,
        db
    )



@router.post(
    "/register/{tournament_id}",
    response_model=TournamentResponse
)
def register(
    tournament_id: int,
    db: Session = Depends(get_db)
):

    tournament = register_player(
        tournament_id,
        db
    )

    if tournament is None:

        raise HTTPException(
            status_code=400,
            detail="Tournament Full or Not Found"
        )

    return tournament
