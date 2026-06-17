# Entity Relationship Diagram (ERD)

# Entity Overview


# Entity Attributes
## Table Name: users
Attribute|Type|Description|
| -- | -- | -- |
user_id (PK)|UUID|Unique user identifier|
username|VARCHAR(50)|Unique display name
email|VARCHAR(100)|Unique email (nullable for guest)
password_hash|VARCHAR(255)|Hashed password (nullable for guest)
is_guest|BOOLEAN|True if guest user
rating|INTEGER|Player rating (default 1200)
created_at|TIMESTAMP|Account creation time
updated_at|TIMESTAMP|Last profile update

Note:
Guest users: email and password_hash can be NULL
Registered users: is_guest = FALSE


## Table Name: games
Attribute|Type|Description|
| -- | -- | -- |
game_id (PK)|UUID|Unique game identifier
white_player_id (FK)|UUID|References users(id)
black_player_id (FK)|UUID|References users(id)
status|VARCHAR(20)|pending / active / completed / abandoned
result|VARCHAR(20)|white_win / black_win / draw
current_fen|TEXT|Current board state (FEN)
pgn|TEXT|Full game record in PGN
started_at|TIMESTAMP|Game start time
ended_at|TIMESTAMP|Game end time
created_at|TIMESTAMP|Game creation time

Notes:
Both white_player_id and black_player_id reference users
current_fen updated after every move


## Table Name: moves
Attribute|Type|Description|
| -- | -- | -- |
id (PK)|UUID|Unique move identifier
game_id (FK)|UUID|References games(id)
player_id (FK)|UUID|References users(id)
move_number|INTEGER|Move sequence number
move_notation|VARCHAR(20)|Algebraic notation (e.g., e4, Nf3)
fen_after_move|TEXT|FEN after move
created_at|TIMESTAMP|Move timestamp






Notes:
Each move belongs to one game
Used to reconstruct full game history

## RefreshToken (Optional)
## Table Name: refresh_tokens
Attribute|Type|Description|
| -- | -- | -- |
id (PK)|UUID|Token ID
user_id (FK)|UUID|References users(id)
token|TEXT|Refresh token value
expires_at|TIMESTAMP|Expiration time
created_at|TIMESTAMP|Creation time
revoked|BOOLEAN|If token is invalidated

Notes: Used for secure JWT refresh mechanism


# ER Diagram
<img width="446" height="637" alt="Chess_ERD" src="https://github.com/user-attachments/assets/cf8da3ef-8039-4d61-8e74-d26561b14606" />
