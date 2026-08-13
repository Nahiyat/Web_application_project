
from sqlalchemy.orm import Session
from app.models.user_model import User
from app.schemas.ranking_schema import LeaderboardResponse, LeaderboardUser

def get_leaderboard(db: Session, limit: int = 100) -> LeaderboardResponse:
    # Query users sorted by rating (highest first)
    users = (
        db.query(User)
        .order_by(User.rating.desc())
        .limit(limit)
        .all()
    )

    rankings = []
    for idx, user in enumerate(users, start=1):
        rankings.append(
            LeaderboardUser(
                rank=idx,
                id=user.id,
                username=user.username,
                rating=user.rating,
                is_guest=user.is_guest,
            )
        )

    return LeaderboardResponse(
        total_players=len(rankings),
        rankings=rankings
    )
