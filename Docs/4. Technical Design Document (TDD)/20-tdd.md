# Technical Design Document (TDD)

# Technology Stack

| Layer | Technology |
|---------|------------|
| Frontend | React + TypeScript |
| Backend | FastAPI (Python) |
| Authentication | JWT Authentication |
| Real-Time Communication | WebSockets |
| Database | AWS DynamoDB |
| Containerization | Docker |
| Cloud Platform | AWS |
| Monitoring | AWS CloudWatch |
| Tournament Data | External APIs + Web Scraping |
| Chess Logic | Chess Engine / Chess.js / Python-Chess |


# Backend Design by Layer
## Controller Layer
The Controller Layer handles incoming HTTP and WebSocket requests.
It is responsible for:

* Request validation
* Routing
* Calling appropriate services
* Returning structured responses

Auth Controller
* POST /auth/register
* POST /auth/login
* POST /auth/refresh

Game Controller
* POST /game/match
* GET /game/history
* GET /game/{id}

WebSocket Controller
* /ws/game/{game_id}

# Service Layer

Contains business logic.
Acts as intermediary between Controller and Repository layers.

* User registration logic
* Password hashing validation
* Matchmaking logic
* Move validation using python-chess
* Game result determination
* Rating calculation


#  Repository Layer

Uses DynamoDB to handle all database operations.

Responsibilities
* CRUD operations
* Query filtering
* Matchmaking operations

# Authentication Layer
* JWT issuance and refresh token rotation.
* Password hashing 
* Dependency-based auth guards for protected routes.

# Notification Service

* Broadcast moves
* Notify opponent on game start
* Notify game completion
* Notify resignation or timeout

# Error Handling
Example: ValidationError

{
  "error": "Invalid move",
  "code": 400
}

Type	|Example|
| -- | -- |
ValidationError|	Invalid move
AuthenticationError|	Invalid token
AuthorizationError	|Access denied
NotFoundError|	Game not found
ConflictError|	Email already exists

# Logging

Use Python logging module or use Structured JSON logs with correlation IDs.

# Monitoring
Metrics: latency, error rate, reminder lag, queue depth.
Traces: end-to-end API and background job spans.
Alerts: SLO breach and critical failure thresholds.

# Caching
(Without Redis – lightweight approach)
(If time is available try and apply redis cacching)

# Scalability Strategy
## 10.1 Stateless API Design
* JWT-based authentication
* No server session storage
## 10.2 Horizontal Scaling
* Multiple FastAPI instances behind Nginx
* Load balancing for REST endpoints
10.3 WebSocket Consideration

Without Redis:
* WebSockets tied to server instance
* Sticky sessions required at load balancer

10.4 Performance Optimization
* Avoid unnecessary DB calls
* Store FEN for fast board restoration

#  Frontend Design Highlights

* React + TypeScript for type safety and scalable UI development
* Vite for fast builds and development server
* Chessboard UI Design
* Type-safe API client generation.
