# Online Chess Platform - API Design

## API Standards

| Item | Standard |
|---|---|
| Base URL | /api/v1 |
| Format | JSON |
| Auth | Bearer JWT |
| Error Model | error_code, message, trace_id, details |
| Time Format | ISO-8601 UTC |


**Path Convention:** Endpoints listed below are relative to `/api/v1`.  
Example: `POST /auth/register` means `POST /api/v1/auth/register`.


---

# Authentication APIs

| Endpoint | Method | Description | Auth |
|---|---|---|---|
| /auth/register | POST | Register user account | Public |
| /auth/login | POST | Login and issue JWT tokens | Public |
| /auth/guest | POST | Guest access session | Public |
| /auth/refresh | POST | Refresh access token | Public (refresh token) |
| /auth/logout | POST | Revoke active session | Bearer |
| /auth/password-reset/request | POST | Request password reset | Public |
| /auth/password-reset/confirm | POST | Confirm password reset | Public |

### Example: POST /auth/register

#### Request


{
  "username": "chessmaster",
  "email": "player@example.com",
  "password": "StrongPass123!"
}



#### Response 201


{
  "user_id": "u_1001",
  "username": "chessmaster",
  "message": "Registration successful"
}



---

# Dashboard APIs

| Endpoint | Method | Description | Auth |
|---|---|---|---|
| /dashboard | GET | User dashboard overview | Bearer |
| /dashboard/stats | GET | Detailed player statistics | Bearer |
| /dashboard/recent-games | GET | Recent match history | Bearer |
| /dashboard/friends-activity | GET | Friend activity feed | Bearer |
| /dashboard/recommended-tournaments | GET | Recommended tournaments | Bearer |

### Example: GET /dashboard

#### Response 200


{
  "username": "chessmaster",
  "rating": 1650,
  "games_played": 250,
  "wins": 145,
  "losses": 82,
  "draws": 23,
  "win_rate": 58,
  "friends_count": 35,
  "active_tournaments": 2
}



---

# User Profile APIs

| Endpoint | Method | Description | Auth |
|---|---|---|---|
| /users/me | GET | View own profile | Bearer |
| /users/me | PATCH | Update profile | Bearer |
| /users/me/history | GET | Match history | Bearer |
| /users/me/rating | GET | View Elo rating | Bearer |
| /users/me/deactivate | PATCH | Deactivate account | Bearer |

### Example: GET /users/me

#### Response 200


{
  "user_id": "u_1001",
  "username": "chessmaster",
  "rating": 1650,
  "games_played": 250,
  "country": "Bangladesh"
}



---

# Matchmaking APIs

| Endpoint | Method | Description | Auth |
|---|---|---|---|
| /matchmaking/join | POST | Join matchmaking queue | Bearer |
| /matchmaking/leave | POST | Leave matchmaking queue | Bearer |
| /matchmaking/status | GET | View matchmaking status | Bearer |

### Example: POST /matchmaking/join

#### Request


{
  "game_mode": "BLITZ"
}



#### Response 200


{
  "status": "SEARCHING",
  "estimated_wait": 15
}



---

# Chess Game APIs

| Endpoint | Method | Description | Auth |
|---|---|---|---|
| /games | GET | List player games | Bearer |
| /games/{game_id} | GET | Game details | Bearer |
| /games/{game_id}/move | POST | Submit move | Bearer |
| /games/{game_id}/resign | POST | Resign game | Bearer |
| /games/{game_id}/draw | POST | Offer draw | Bearer |
| /games/{game_id}/draw/accept | POST | Accept draw | Bearer |
| /games/{game_id}/reconnect | POST | Restore game session | Bearer |

### Example: POST /games/{game_id}/move

#### Request


{
  "from": "e2",
  "to": "e4"
}



#### Response 200


{
  "status": "MOVE_ACCEPTED",
  "fen": "updated-board-state"
}



---

# Rating & Leaderboard APIs

| Endpoint | Method | Description | Auth |
|---|---|---|---|
| /ratings/me | GET | Current Elo rating | Bearer |
| /ratings/history | GET | Rating history | Bearer |
| /leaderboard | GET | Global leaderboard | Public |
| /leaderboard/blitz | GET | Blitz rankings | Public |
| /leaderboard/rapid | GET | Rapid rankings | Public |
| /leaderboard/bullet | GET | Bullet rankings | Public |

### Example: GET /leaderboard

#### Response 200


[
  {
    "rank": 1,
    "username": "grandmaster01",
    "rating": 2450
  }
]



---

# Friends & Social APIs

| Endpoint | Method | Description | Auth |
|---|---|---|---|
| /friends | GET | Friend list | Bearer |
| /friends/request | POST | Send friend request | Bearer |
| /friends/{user_id}/accept | POST | Accept friend request | Bearer |
| /friends/{user_id}/reject | POST | Reject friend request | Bearer |
| /friends/{user_id} | DELETE | Remove friend | Bearer |
| /players/search | GET | Search players | Bearer |

### Example: POST /friends/request

#### Request


{
  "user_id": "u_2001"
}



#### Response 200


{
  "message": "Friend request sent successfully"
}



---

# Tournament APIs

| Endpoint | Method | Description | Auth |
|---|---|---|---|
| /tournaments | GET | List tournaments | Public |
| /tournaments/{id} | GET | Tournament details | Public |
| /tournaments/search | GET | Search tournaments | Public |
| /tournaments/upcoming | GET | Upcoming tournaments | Public |

### Example: GET /tournaments/upcoming

#### Response 200


[
  {
    "id": "t_101",
    "name": "Dhaka Open Chess Tournament",
    "location": "Dhaka",
    "date": "2026-07-15"
  }
]



---

# Replay & Analysis APIs

| Endpoint | Method | Description | Auth |
|---|---|---|---|
| /games/{game_id}/replay | GET | Replay game | Bearer |
| /games/{game_id}/analysis | GET | Analyze game | Bearer |
| /games/{game_id}/pgn | GET | Download PGN | Bearer |

### Example: GET /games/{game_id}/analysis

#### Response 200


{
  "accuracy": 89,
  "best_moves": 25,
  "mistakes": 3,
  "blunders": 1
}



---

# Notification APIs

| Endpoint | Method | Description | Auth |
|---|---|---|---|
| /notifications | GET | List notifications | Bearer |
| /notifications/{id}/read | POST | Mark notification as read | Bearer |
| /notifications/mark-all-read | POST | Mark all notifications as read | Bearer |

---

# WebSocket APIs

| Endpoint | Purpose |
|---|---|
| /ws/matchmaking | Real-time matchmaking |
| /ws/game/{game_id} | Real-time gameplay |
| /ws/notifications | Real-time notifications |

---

# Admin APIs

| Endpoint | Method | Description | Auth |
|---|---|---|---|
| /admin/users | GET | View users | Admin |
| /admin/users/{id}/ban | PATCH | Ban user | Admin |
| /admin/users/{id}/unban | PATCH | Unban user | Admin |
| /admin/games/flagged | GET | View suspicious games | Admin |

---

# Validation Rules

| Area | Rule |
|---|---|
| Registration | Username and email must be unique |
| Password | Minimum 8 characters |
| Login | Valid credentials required |
| Move Submission | Move must be legal |
| Matchmaking | Supported game mode only |
| Friend Request | Cannot send request to self |
| Tournament Search | Valid search parameters |
| Replay Download | Only game participants can access |

---

# Status Codes

| Code | Meaning | Typical Usage |
|---|---|---|
| 200 | OK | Successful request |
| 201 | Created | Resource created |
| 204 | No Content | Resource deleted |
| 400 | Bad Request | Validation error |
| 401 | Unauthorized | Invalid or expired token |
| 403 | Forbidden | Access denied |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Duplicate request |
| 422 | Unprocessable Entity | Semantic validation error |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unexpected server error |

---

# Error Response Contract


{
  "error_code": "VALIDATION_ERROR",
  "message": "Input validation failed",
  "trace_id": "9f8c2a61-5c0a-4dbd-9d6b-3f7f9f112233",
  "details": [
    {
      "field": "username",
      "issue": "already exists"
    }
  ]
}



---

# API-to-Requirement Mapping Snapshot

| API Domain | Requirement IDs |
|---|---|
| Authentication | FR-001..FR-008 |
| Dashboard & Statistics | FR-009..FR-013 |
| User Profiles | FR-014..FR-018 |
| Matchmaking | FR-019..FR-023 |
| Gameplay | FR-024..FR-029 |
| Rating & Leaderboards | FR-030..FR-033 |
| Replay & Analysis | FR-034..FR-037 |
| Friends & Social | FR-038..FR-042 |
| Tournament System | FR-043..FR-046 |
| Notifications | FR-047..FR-048 |
| WebSocket Services | NFR-001..NFR-004 |
| Security & Admin | NFR-005..NFR-009 | 

