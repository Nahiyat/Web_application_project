# Non-Functional Requirements

| NFR ID | Category | Requirement (Measurable Target) |
| ------ | -------- | ------------------------------- |
| NFR-01 | Performance | The system shall support at least 200 concurrent active users without degradation of core functionality. |
|NFR-02 |Performance | The average REST API response time shall be ≤ 1 sec under normal load conditions. |
| NFR-03 | Performance | WebSocket move propagation latency shall be ≤ 300 ms between players under normal network conditions. |
| NFR-04 | Performance | Matchmaking shall pair users within ≤ 30 seconds under normal load. |
| NFR-05 | Performance | The system shall handle at least 10 concurrent active games simultaneously. |
| NFR-06 | Availability| The system shall maintain 99% monthly uptime excluding scheduled maintenance. |
|NFR-07 | Availability | Scheduled maintenance shall not exceed 8 hours per month and must be communicated in advance. |
|NFR-08 | Availability | The system shall automatically recover from application-level crashes within ≤ 2 minutes. |
|NFR-09 | Reliability | Data integrity for game records (moves, results) shall be maintained with ACID-compliant transactions.
|NFR-10| Security| All client-server communication shall be encrypted using HTTPS (TLS 1.2 or higher) and asynchronous Websocket .
NFR-11| Security| User passwords shall be hashed using salting
NFR-12| Security| JWT access tokens shall expire within 15 minutes, and refresh tokens within 7 days.
NFR-13| Security| The system shall implement rate limiting to limit login attempts to 5 attempts per minute per IP.
NFR-15|Security|The system shall enforce role-based access control (RBAC) for guest and registered users.
NFR-16|Security|The system shall validate and sanitize all incoming inputs to prevent SQL injection.
NFR-17|Accessibility|The web interface shall comply with WCAG 2.1 (Web Content Accessibility Guideline) Level AA accessibility standards.
NFR-18|Accessibility|The platform shall be fully usable on modern browsers (Chrome, Firefox, Safari, Edge) supporting the last major versions.|
NFR-19|Maintainability|The system shall follow modular architecture principles with clearly separated layers (API, service, data access).
NFR-20|Observability|The system shall log all authentication events, match start/end events, and critical errors.
NFR-21|Observability|The system shall provide centralized logging with log retention of at least 30 days.
NFR-22|Portability|The backend application shall be containerized using Docker for environment consistency.
NFR-23|Portability|The system shall support deployment on major cloud platforms (AWS, Azure, GCP).
NFR-24|Performance|Static frontend assets shall load in ≤ 2 seconds on a standard broadband connection (10 Mbps).
NFR-25|Reliability|The system shall perform automatic daily database backups with a retention period of 7 days minimum.
NFR-26|Security|Sensitive configuration data (e.g., database credentials, JWT secrets) shall be stored using environment variables or a secure secrets manager.
NFR-27|Availability|WebSocket connections shall automatically attempt reconnection within 5 seconds after unexpected disconnection.

# NFR Verification Approach

|Category| Verification Methods|
| ------ | -------- | 
Performance|Load testing , stress testing, endurance testing, API response time measurement, WebSocket latency measurement.
Availability|Uptime monitoring , failover testing, simulated server crash recovery testing, maintenance window review, high-availability configuration validation.
Reliability|Failure injection testing, server restart simulation, transaction integrity testing, backup and restore testing, reconnection scenario testing, long-running session stability testing
Security|SAST/DAST, penetration testing, auth abuse tests , authentication/authorization validation, TLS configuration verification
Accessibility|WCAG 2.1 compliance audit, keyboard navigation testing, screen reader testing, responsive design testing across screen sizes
Maintainability|Code review, unit test coverage analysis, documentation review, CI quality check
Observability|Log verification, alert validation, alert configuration testing, log retention inspection





