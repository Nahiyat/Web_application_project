# Stakeholder Analysis

## Primary Stakeholders

| Stakeholder                                                 | Role                                             | Key Expectation                                                                                  |
| ----------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| End Users (Players: Students, Professionals, Casual Gamers) | Daily platform users who play chess matches      | Fast matchmaking, smooth real-time gameplay, game history tracking, and fair play environment    |
| Product Owner                                               | Defines feature priorities and product direction | Value-driven development and timely delivery of core features like matchmaking and game tracking |

## Secondary Stakeholders

| Stakeholder                  | Role                                     | Key Expectation                                                     |
| ---------------------------- | ---------------------------------------- | ------------------------------------------------------------------- |
| Community / Spectators       | Users who watch games and follow players | Live game viewing, player rankings, and engaging community features |
| Support Team (if applicable) | Handles user issues and reports          | Clear issue tracking system and reliable user experience            |

## Internal Stakeholders

Engineering Team, UI/UX Designers, QA Testers, DevOps Engineers, Security Team, and Project Management.

* **Engineering Team:** System development and feature implementation
* **QA Team:** Testing gameplay, matchmaking, and system reliability
* **UI/UX Designers:** Ensuring smooth and user-friendly interface
* **DevOps:** Deployment, performance, and server stability
* **Security Team:** Preventing cheating, protecting accounts and data
* **Project Management:** Coordinating development and delivery timeline

## External Stakeholders

Cloud service providers (e.g., hosting servers), database services, university reviewers, and academic evaluators.

## Stakeholder Influence–Interest Matrix

| Stakeholder                                | Influence | Interest |
| ------------------------------------------ | --------- | -------- |
| Product Owner                              | High      | High     |
| Engineering Lead                           | High      | High     |
| QA Lead                                    | Medium    | High     |
| DevOps Lead                                | Medium    | Medium   |
| Security Team                              | High      | Medium   |
| End Users                                  | Medium    | High     |
| UI/UX Team                                 | Medium    | Medium   |
| University Instructor / Reviewer           | Medium    | High     |
| External Service Providers (Cloud/Hosting) | Low       | Medium   |

# RACI Matrix

| Deliverable                           | Product Owner | BA | Architect | Engineering | QA  | DevOps | Security | Instructor/Reviewer |
| ------------------------------------- | ------------- | -- | --------- | ----------- | --- | ------ | -------- | ------------------- |
| Project Vision & PRD                  | A             | R  | C         | C           | C   | I      | C        | C                   |
| Requirements (SRS)                    | A             | R  | C         | C           | C   | I      | C        | C                   |
| System Architecture Design            | C             | C  | A/R       | R           | C   | C      | C        | I                   |
| Database Design                       | C             | C  | A         | R           | C   | C      | C        | I                   |
| Frontend Development                  | I             | I  | C         | A/R         | C   | C      | C        | I                   |
| Backend Development                   | I             | I  | C         | A/R         | C   | C      | C        | I                   |
| Real-time Matchmaking System          | A             | C  | A/R       | R           | C   | C      | C        | I                   |
| Game Logic (Chess Engine Integration) | C             | C  | A         | R           | C   | C      | C        | I                   |
| Testing & QA Plan                     | I             | C  | C         | C           | A/R | I      | C        | I                   |
| Deployment & Release                  | A             | I  | C         | R           | C   | A/R    | C        | I                   |
| Security & Anti-Cheat System          | C             | I  | C         | R           | C   | C      | A/R      | I                   |
| Final Project Signoff                 | A             | C  | C         | C           | C   | C      | C        | R                   |

## Legend

* **R = Responsible**
* **A = Accountable**
* **C = Consulted**
* **I = Informed**

