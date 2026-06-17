# Online Chess Platform -  Acceptance Criteria

### Feature-Level Gherkin Acceptance Criteria

---

## AC-01 User Registration

- Given a new user on the registration page, when valid username/email/password are submitted, then the account is created successfully and confirmation is returned.
- Given an already registered email, when the user attempts registration, the system returns **409 CONFLICT** with a clear error message.
- Given invalid password or weak credentials, when registration is submitted, then the system rejects requests with validation feedback.

---

## AC-02 Login and JWT Session

- Given valid credentials, when a user logs in, then access and refresh tokens are issued.
- Given invalid credentials, when login is attempted, then the system returns **401 UNAUTHORIZED**.
- Given expired access token and valid refresh token, when refresh endpoint is called, then a new access token is generated.
- Given the user logs out, when the session ends, then tokens are invalidated.

---

## AC-03 Matchmaking System

- Given a player enters a matchmaking queue, when the system finds a similarly-rated opponent, then a match is created within an acceptable rating range.
- Given no suitable opponent is available, when wait time exceeds threshold, then matchmaking expands rating range gradually.
- Given two matched players, when the game starts, then both are synchronized in real-time game sessions.

---

## AC-04 Real-Time Gameplay

- Given an active match, when a move is played, then opponent board updates within acceptable latency threshold.
- Given network delay occurs, when synchronization fails, then the system re-syncs game state without data loss.
- Given disconnection happens, when the player reconnects, then the game state is restored.

---

## AC-05 Rating System (ELO)

- Given a completed match, when the result is submitted, then ratings of both players are updated using Elo calculation.
- Given a ranked game, when the result is drawn, then both ratings are adjusted accordingly.
- Given a mismatch or invalid result, when detected, then the system prevents rating update.

---

## AC-06 Anti-Cheat System

- Given an active ranked match, when suspicious engine-like behavior is detected, then the system flags the match for review.
- Given repeated violations, when the threshold is exceeded, then the account is restricted or banned.
- Given fair play mode enabled, when the match starts, then anti-cheat monitoring runs in background.

---

## AC-07 Game Replay & Analysis

- Given a completed match, when the user opens replay, then full move-by-move game history is displayed.
- Given analysis mode enabled, when engine evaluation runs, then best moves and mistakes are highlighted.
- Given a replay export request, when triggered, then a PGN file is generated.

---

## AC-08 Tournament System

- Given tournament creation, when the organizer sets rules, then the tournament is published successfully.
- Given registered players, when the tournament starts, then pairings are generated automatically.
- Given tournament completion, when the winner is determined, then the leaderboard is updated.

---

## AC-09 Social & Friends System

- Given user search, when the player name is entered, then matching profiles are displayed.
- Given friend requests sent, when accepted, then users are added to each other’s friend list.
- Given online status enabled, when a friend is active, then a status indicator is shown.

---

## AC-10 Dashboard & Analytics

- Given the user dashboard load, when the page opens, then win/loss statistics and rating history are displayed.
- Given gameplay history, when analytics are requested, then performance trends are shown.
- Given an inactivity period, when detected, then summary insights are updated.

---
