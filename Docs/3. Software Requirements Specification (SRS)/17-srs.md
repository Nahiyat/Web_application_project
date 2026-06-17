# Software Requirements Specification (SRS)
# Online Chess Platform

# 1. Introduction
## 1.1 Purpose
This Software Requirements Specification (SRS) document describes the functional and non-functional requirements for the Online Chess Platform. The purpose of this document is to define system behavior, constraints, and interfaces to guide developers, testers, project managers, and stakeholders in the design, implementation, and validation of the system.

## 1.2 Scope
The Online Chess Platform is a web-based application that enables users to:
* Play chess as a guest or registered user
* Play real-time online multiplayer matches
* View game history (for registered users)
* Authenticate securely using JWT-based authentication
* Experience real-time gameplay via WebSocket communication

The system will be built using:
* Backend: FastAPI (Python)
* Frontend: React with TypeScript
* Database: PostgreSQL
* Communication: HTTPS & WebSockets
The platform will support secure, scalable, and real-time chess gameplay without AI engine integration in the initial version.

## 1.3 Definitions and Acronyms
Term|Definition
| -- | -- |
JWT|JSON Web Token – used for secure authentication
API|Application Programming Interface
REST|Representational State Transfer
WebSocket|Full-duplex communication protocol over a single TCP connection
PGN|Portable Game Notation – format for storing chess games
FEN|Forsyth–Edwards Notation – board state representation
HTTPS|Secure HTTP protocol using TLS encryption
WSS|Secure WebSocket protocol
DB|Database
SRS|Software Requirements Specification


# 2. Overall Description
## 2.1 Product Perspective
The Online Chess Platform is a standalone web application consisting of:
* A frontend client (React + TypeScript)
* A backend REST & WebSocket server (FastAPI)
* A relational database (PostgreSQL)
The system architecture follows a client-server model:
* REST APIs for authentication and data retrieval
* WebSockets for real-time gameplay
* Persistent storage of user and game data in PostgreSQL

## 2.2 Product Functions
The system will provide the following major functions:
User registration and authentication
Guest session creation
JWT-based access control
Real-time matchmaking
Real-time move synchronization via WebSockets
Server-side chess move validation
Game result determination (checkmate, draw, timeout, resignation)
Persistent game storage
Viewing game history (registered users only)
Secure logout and token refresh

## 2.3 User Classes
1. Guest User
* Can play without registration
* Limited access to features
* Cannot view historical games
2. Registered User
* Can register and login
* Can play multiplayer games
* Can view game history
* Can maintain profile information
3. Administrator (Optional/Future)
* Monitor active games
* View user activity logs
* Manage reported accounts

## 2.4 Operating Environment
Backend Environment
* Python 3.10+
* FastAPI
* Backend in containerized Linux runtime on AWS

Frontend Environment
* Modern web browsers (Chrome, Firefox, Edge, Safari)
* Responsive design (mobile and desktop)

Database
* PostgreSQL 
* Docker-based containerized environment
* HTTPS-enabled production server

## 2.5 Constraints
* The system must use FastAPI for backend development.
* The frontend must use React with TypeScript.
* PostgreSQL must be used as the primary database.
* Communication must occur over HTTPS and WSS.
* JWT authentication must be used for session management.

## 2.6 Assumptions and Dependencies
Assumptions:
* Users have stable internet connectivity.
* Users access the system via modern browsers.
* PostgreSQL server is continuously available.
* Users understand basic chess rules.

Dependencies:
* FastAPI framework
* PostgreSQL database
* WebSocket protocol support
* Python chess validation library (e.g., python-chess)
* React ecosystem packages

# 3. Functional Requirements
## 3.1 Summary by Domain


Domain|FR Range
| -- | -- |
Authentication & Account|FR-001.. FR-006, FR-28.. FR-024
Game Play & Match Management|FR-007..FR-016 
Rating & Competitive System|FR-020..FR-021
Reminder/Notification|FR-023..FR-024
Store Match History|FR-017..FR-019
Player Inactivity Handling|FR-025..FR-027



# 4. Non-Functional Requirements
## 4.1 Quality Attribute Summary
Attribute|NFR IDs
| -- | -- |
Performance & Scalability|NFR-001..NFR-005, NFR-024
Availability & Reliability|NFR-006..NFR-010, NFR-025, NFR-027
Security & Compliance|NFR-010..NFR-016, NFR-026
Accessibility & Usability|NFR-017, NFR-018
Maintainability & Observability|NFR-019..NFR-021



# 5. External Interface Requirements

## 5.1 User Interfaces
The system shall provide:
* Login page
* Registration page
* Dashboard / Lobby
* Game board interface
* Game history page
* Responsive design supporting desktop 
* The chessboard UI shall:
* Display real-time piece movement
* Highlight legal moves
* Indicate game status (check, checkmate, draw)
* Display player timers

## 5.2 Software Interfaces
Backend Interfaces
REST API endpoints for:
* Registration
* Login
* Token refresh
* Game history
WebSocket endpoint for:
* Real-time gameplay communication
Database Interface
* PostgreSQL connection via ORM (SQLAlchemy or equivalent)
* Structured tables for Users, Games, Moves

## 5.3 Hardware Interfaces
The system does not require specialized hardware.
Minimum client requirements:
* Device capable of running modern web browser
* Keyboard and mouse
Server requirements:
Sufficient CPU and memory to handle concurrent users

## 5.4 Communication Interfaces
* HTTPS (TLS 1.2+) for REST API communication
* WSS (Secure WebSockets) for real-time gameplay
* JSON format for data exchange
* Stateless JWT authentication for API access

# 6. Assumptions and Constraints
Assumptions
* The system will initially support the English language only.
* The expected initial user load will not exceed planned capacity.
* Users will not attempt to manipulate WebSocket communication.
* Time synchronization between server and client is reasonably accurate.
Constraints
* The system must maintain secure authentication and authorization.
* All game logic validation must occur server-side.
* Data must be persisted reliably in PostgreSQL.
WebSocket disconnections must be handled gracefully.
The system must be deployable using Docker containers.

# 7. Appendices
## Appendix A - Use Cases
See 15-use-cases.md.

# Appendix B - DFD and ERD
See 16-dfd.md, 18-erd.md.
