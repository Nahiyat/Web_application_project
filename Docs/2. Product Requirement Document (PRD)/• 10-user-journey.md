# Online Chess Platform - User Journey Map

### Journey Stages

Registration → Login → Matchmaking → Play Game → Rating Update → Replay/Analysis → Engagement (Tournaments/Friends)

---

## End-to-End Journey Table

| Stage             | User Goal                    | User Actions                   | System Response                             | Pain Risk                               | Improvement Opportunities                    | Linked IDs                    |
| ----------------- | ---------------------------- | ------------------------------ | ------------------------------------------- | --------------------------------------- | -------------------------------------------- | ----------------------------- |
| Registration      | Create chess account quickly | Enter username/email/password  | Validate input, create account, issue token | Signup friction or invalid input errors | Inline validation + social login option      | UC-01, FR-001..FR-003         |
| Login             | Access account securely      | Enter credentials              | Authenticate user, issue JWT session        | Login failures or token issues          | Clear error messages + auto session refresh  | UC-02, FR-004..FR-007         |
| Matchmaking       | Find fair opponent fast      | Join queue / select mode       | Pair players using Elo-based system         | Long wait time or unfair pairing        | Dynamic rating range expansion               | UC-03, FR-001..FR-003         |
| Play Game         | Play smooth real-time match  | Make moves on chessboard       | Sync moves in real-time                     | Lag, disconnect, desync                 | Low-latency architecture + reconnect support | UC-04, NFR-002, NFR-003       |
| Rating Update     | Track competitive progress   | Finish match                   | Update Elo rating, store result             | Rating disputes or inconsistency        | Transparent rating calculation display       | UC-05, FR-010..FR-013         |
| Replay & Analysis | Improve gameplay skills      | Open game history              | Show move-by-move replay + engine analysis  | Lack of learning feedback               | Highlight mistakes + best moves              | UC-06, FR-020..FR-023         |
| Engagement        | Social play & competition    | Join tournaments / add friends | Generate brackets, update leaderboard       | Low community engagement                | Active tournaments + friend challenges       | UC-07, FR-030..FR-033, FR-040 |

---

## Experience Heatmap

<img width="1123" height="443" alt="Screenshot 2026-06-17 050202" src="https://github.com/user-attachments/assets/6f8c37de-6d29-4c0e-92ad-419249c66d3c" />


---

## Key Journey Improvements

* Reduce matchmaking time using adaptive rating-based pairing logic.
* Improve gameplay stability with real-time synchronization and reconnection handling.
* Strengthen anti-cheat integration during gameplay to ensure trust in rating updates.
* Enhance post-game learning loop with analysis and mistake highlighting.
* Increase engagement through tournaments, leaderboards, and friend-based challenges.

