# Functional Requirements

FR ID|Description|Priority|Business Justification|Related User Story|
| --- | --- | --- | --- | --- |
FR-001|The system shall allow users to play chess as a Guest without mandatory registration.|High|Reduces entry barrier and increases user acquisition.|US-001
FR-002|The system shall allow users to register using email and password.|High|Enables long-term engagement and user retention.|US-001
FR-003|The system shall securely authenticate registered users using JWT-based authentication.|High|Ensures secure access control and protects user data.|US-001|
FR-004|The system shall allow registered users to log in and log out securely.|High|Provides session control and account security.|US-002, US-004|
FR-005|The system shall allow registered users to refresh authentication tokens securely.|High|Maintains seamless user experience without frequent logins.|US-003|
FR-006|The system shall hash and securely store user passwords.|High|Prevents credential compromise and ensures compliance with security best practices.|US-001|
FR-007|The system shall allow guest users to start a game immediately after entering the platform.|Medium|Improves onboarding speed and engagement.|US-010|
FR-008|The system shall allow users to choose between “Play Online” and (optionally) “Play with Friend”.|Medium|Provides multiple gameplay options to increase user retention.|US-010, US-011|
FR-009|The system shall match players in real time using an automated matchmaking queue.|High|Enables real-time multiplayer functionality.|US-009|
FR-010|The system shall establish a WebSocket connection for real-time gameplay communication.|High|Ensures low-latency move synchronization between players.|US-010|
FR-011|The system shall validate all chess moves according to official chess rules.|High|Maintains fairness and prevents illegal gameplay.|US-016|
FR-012|The system shall synchronize board state in real time between both players.|High|Ensures consistent gameplay experience.|US-010|
FR-013|The system shall detect and declare game outcomes (checkmate, stalemate, draw, resignation, timeout).|High|Ensures automated and accurate game completion handling.|US-016|
FR-014|The system shall allow a player to resign from an ongoing game.|High|Provides realistic gameplay control.|US-012|
FR-015|The system shall implement a configurable chess clock for timed matches.|Low|Supports competitive gameplay formats.|US-030|
FR-016|The system shall automatically detect time expiration and declare a winner accordingly.|Medium|Ensures fairness in timed games.|US-010|
FR-017|The system shall maintain game history for registered users.|High|Encourages replayability and performance tracking.|US-020|
FR-018|The system shall store completed game records including moves (PGN format).|High|Allows analysis and review of games.|US-026|
FR-019|The system shall allow users to view past games.|High|Improves user engagement and skill improvement.|US-026|
FR-020|The system shall update player ratings after ranked matches.|Low|Introduces competitive ranking system to increase engagement.|US-017, US-018, US-019|
FR-021|The system shall support an Elo-based rating system (or similar).|Low|Provides measurable skill progression.| US-017|
FR-022|The system shall provide a responsive and interactive chessboard UI.|High|Ensures user engagement.|US-039|
FR-023|The system shall notify players in real time when an opponent joins a match.|Medium|Enhances user experience and clarity.|US-038|
FR-024|The system shall notify players of opponent moves instantly.|Medium|Maintains real-time gameplay integrity.|US-038|
FR-025|The system shall handle player disconnections gracefully.|High|Prevents game disruption and improves reliability.|US-014|
FR-026|The system shall allow a disconnected player to reconnect to an ongoing game within a defined time window.|Medium|Improves user experience and fairness.|US-014|
FR-027|The system shall automatically terminate inactive games after a defined timeout.|High|Maintains system performance and resource optimization.|US-014
FR-028|The system shall restrict illegal actions based on user role (guest vs registered).|Low|Maintains system integrity and proper access control.|US-008
FR-029|The system shall allow registered users to update their profile (username, password etc.).|Medium|Improves personalization and engagement.|US-005|
FR-030|The system shall provide secure REST APIs for authentication, user management, and game history.|High|Ensures structured and secure backend communication.|US-001,|
FR-031|The system shall provide WebSocket endpoints for live game sessions.|High|Enables persistent real-time communication.|US- 10
FR-032|The system shall log significant events (login, match start, match end, errors).|High|Supports monitoring, debugging, and audit requirements.|US-020|
FR-033|The system shall enforce rate limiting on authentication and gameplay endpoints.|Medium|Protects against brute force and denial-of-service attacks.|US-001|
FR-034|The system shall allow administrators (optional future feature) to monitor active games.|Medium|Enables operational oversight and moderation.|US-022|


## Requirement Notes


1. FR IDs are baseline-controlled and referenced in use cases, API design, test cases.
2. Implementation prioritizes High requirements for MVP, then Medium/Low by roadmap phase 


## SMART Quality Check for Functional Requirements

|SMART Element|Functional Requirement Quality Rule|
| --- | --- |
Specific|Each FR states a clear system behavior with unambiguous language.|
Measurable|Each FR is testable through acceptance criteria and mapped test cases.|
Achievable|FR scope aligns with approved architecture and delivery phases.|
Relevant|Each FR links to at least one user story and business justification.|
Timely|FR execution is phase-prioritized and release planned in roadmap/milestones.|


## MoSCoW Mapping for Functional Requirement

MoSCoW Category|Priority Mapping|FR Coverage (examples)|
| --- | --- | --- | 
Must Have|High|FR-001..FR-006, FR-009..FR-014, FR-017..FR-019,FR-022..FR-025, FR-027, FE-030..FR-032|
Should Have|Medium|FR-007, FR-008, FR-016, FR-023, FR-024, FR-026, FR-029, FR-033, FR-034|
Could Have|Low|FR-015, FR-020..FR-021, FR-028|
Won't Have (this release)|Not in FR baseline|Collaboration and AI capabilities deferred to later roadmap phases|







