import random
from threading import Lock
from sqlalchemy.orm import Session
from app.models.user_model import User
from app.models.game_model import Game

# Store only user IDs, not ORM objects
waiting_players: list[str] = []
waiting_lock = Lock()

matched_games: dict[str, str] = {}  # user_id -> game_id



def find_match(current_user: User, db: Session):
    current_id = str(current_user.id)

    if current_id in matched_games:
            game_id = matched_games.pop(current_id)
            return {
                "matched": True,
                "game_id": game_id
            }
    if current_id in waiting_players:
            return {
                "matched": False,
                "message": "Already waiting for opponent..."
            }


    with waiting_lock:

        # Prevent duplicate queue entries (double-click protection)
        if current_id in waiting_players:
            return {
                "matched": False,
                "message": "Already waiting for opponent..."
            }

        if waiting_players:
            opponent_id = waiting_players.pop(0)

            # never match with self
            if opponent_id == current_id:
                waiting_players.append(current_id)
                return {
                    "matched": False,
                    "message": "Waiting for opponent..."
                }

            opponent = db.query(User).filter(User.id == opponent_id).first()

            if opponent is None:
                # Opponent no longer exists — re-queue current user
                waiting_players.append(current_id)
                return {
                    "matched": False,
                    "message": "Waiting for opponent..."
                }

            # Randomly assign colors
            if random.choice([True, False]):
                white_id, black_id = current_id, opponent_id
            else:
                white_id, black_id = opponent_id, current_id

            game = Game(
                white_player_id=white_id,
                black_player_id=black_id,
            )

            db.add(game)
            db.commit()
            db.refresh(game)

            matched_games[white_id] = str(game.id)
            matched_games[black_id] = str(game.id)

            return {
                "matched": True,
                "game_id": str(game.id)
            }

        # No one waiting yet
        waiting_players.append(current_id)

    return {
        "matched": False,
        "message": "Waiting for opponent..."
    }