from sqlalchemy.orm import Session
from app.models.user_model import User
from app.models.game_model import Game
import random

# Simple in-memory waiting queue
waiting_players = []

def find_match(current_user: User, db: Session):

    # If someone already waiting
    if waiting_players:
        opponent = waiting_players.pop(0)

        # Randomly assign colors
        if random.choice([True, False]):
            white = current_user.id
            black = opponent.id
        else:
            white = opponent.id
            black = current_user.id

        game = Game(
            white_player_id=white,
            black_player_id=black,
        )

        db.add(game)
        db.commit()
        db.refresh(game)

        return {
            "matched": True,
            "game_id": str(game.id)
        }

    # No one waiting → add current user
    waiting_players.append(current_user)

    return {
        "matched": False,
        "message": "Waiting for opponent..."
    }