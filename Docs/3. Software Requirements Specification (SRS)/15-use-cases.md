# Use Cases

## UC-01 Register

|Field|Details|
| -- | -- |
|Actor|Guest User|
Preconditions|User is not authenticated; email not registered|
Primary Flow|1) User opens register page 2) Enters profile and password 3) Submits form 4) System validates and creates account 5) Success response returned|
Alternative Flow|A1: Email already exists -> show conflict error. A2: Invalid password -> show policy guidance.|
Post Conditions|Account persisted; user can login|
Related FR|FR-001, FR-002, FR-003 |


## UC-02 Login

|Field|Details|
| -- | -- |
Actor|Registered User|
Preconditions|Valid account exists|
Primary Flow|1) User enters credentials 2) System authenticates 3) JWT tokens issued 4) User redirected to dashboard|
Alternative Flow|A1: System error → Display retry message A2: Too many attempts → Temporarily block login |
Post Conditions|Authenticated session established|
Related FR|FR-003, FR-004 |


## UC-03 Play as Guest

|Field|Details|
| -- | -- |
Actor| Guest User|
Preconditions|User is not authenticated 
Primary Flow|1)User clicks “Play as a guest” 2)System generates temporary guest ID 3)System issues temporary JWT 4) User redirected to game lobby|
Alternative Flow|A1: System error → Display retry message 
Post Conditions|Guest session created 
Related FR|FR-001, FR-007 


## UC-04 Start Online Match (Matchmaking)

|Field|Details|
| -- | -- |
Actor|Authenticated User (Guest or Registered) 
Preconditions|User authenticated; not currently in a game 
Primary Flow|User selects “Play Online” ->System places user in matchmaking queue ->System finds opponent ->System creates game session ->Both players notified via WebSocket ->Game board loads|
Alternative Flow|A1: No opponent found → User remains in queue. A2: User cancels search → Removed from queue |
Post Conditions|Game session created; both players connected |
Related FR| FR-008, FR-009 


## UC-05 Make a Move

|Field|Details|
| -- | -- |
Actor | Player
Preconditions | Active game session; player’s turn
Primary Flow |Player selects piece->Player selects destination square->Move sent via WebSocket->System validates move using chess engine->Board state updated->Opponent notified in real time
Alternative Flow |A1: Illegal move → Reject move and show error. A2: Not player’s turn → Reject action
Post Conditions | Valid move recorded; board state updated
Related FR | FR-011, FR-012

## UC-06 Resign Game

|Field|Details|
| -- | -- |
Actor | Player
Preconditions | Active game session
Primary Flow |Player clicks “Resign” →System confirms action →System declares opponent winner →Game status updated →Players notified
Alternative Flow |A1: Player cancels confirmation → Return to game.
Post Conditions | Game marked completed; result stored
Related FR | FR-014

## UC-07 Game Timeout

|Field|Details|
| -- | -- |
Actor | System
Preconditions | Active timed game; player’s clock reaches zero
Primary Flow |System detects time expiration → System declares opponent winner → Game status updated → Result stored in database → Both players notified


## UC-08 View Game History

|Field|Details|
| -- | -- |
Actor | Registered User
Preconditions | User authenticated; past games exist
Primary Flow |User navigates to “Game History” → System retrieves past games → System displays list of games → User selects a game → System displays replay board with moves
Alternative Flow |A1: No past games → Show empty state message. 
Post Conditions | Game history viewed
Related FR | FR-017, FR-018, FR-019

## UC-09 Reconnect to Ongoing Game

|Field|Details|
| -- | -- |
Actor | Player
Preconditions | Active game exists; temporary disconnection occurred
Primary Flow |Player reconnects to platform → System detects active session → System restores game state → WebSocket re-established → Game resumes
Alternative Flow |A1: Reconnect window expired → Game marked as abandoned.
Post Conditions | Game resumed or terminated
Related FR | FR-025, FR-026, FR-027

