# Database Design

## Design Approach
* Relational Model with normalized structure (up to 3NF)
* UUID-based primary keys for global uniqueness
* Strict foreign key constraints to maintain referential integrity
* ACID-compliant transactions for game state updates
* Indexed columns for optimized query performance

## Core Entities
The database consists of four primary entities:

## Users
Stores both guest and registered users.

* Unique identifier (UUID)
* Authentication details (email, password hash)
* Role flag (is_guest)
* Rating information
* Audit timestamps
## Games
Represents each chess match between two players.

* References white and black players
* Game status (pending, active, completed)
* Game result (win/draw)
* Current board state (FEN)
* Complete game notation (PGN)
* Start and end timestamps
##  Moves
Stores individual moves within a game.

* Linked to a specific game
* Linked to the player who made the move
* Move sequence number
* Algebraic notation
* Board state after move (FEN)
This allows:

Game replay
Historical analysis
Accurate state reconstruction
## Refresh Tokens
Supports secure JWT authentication.

* Linked to user
* Expiration tracking
* Revocation support

## Relationships
* A User can participate in multiple Games
* A Game contains multiple Moves
* A User can make multiple Moves
* A User can own multiple Refresh Tokens
* All relationships are enforced using foreign key constraints.

## Data Integrity Strategy
* Server-side move validation before persistence
* Database transactions for:
* Game completion
* Rating updates
* No game state is stored only in memory
* All important events persisted in the database

## Scalability Considerations
* Stateless backend with JWT
* Database indexing for large game histories
* Potential future support for read replicas
* Horizontal backend scaling supported
