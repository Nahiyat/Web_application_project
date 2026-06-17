# Interview Report

## Online Chess Platform

### Interview Framework

* **Format:** Semi-structured, 30–50 minutes per participant
* **Focus:** Matchmaking experience, rating trust, gameplay performance, community needs, anti-cheat expectations
* **Artifact linkage:** Findings mapped to FR/NFR IDs

---

## Persona 1 - GM Niaz Morshed (Bangladesh)

### Background

Grandmaster from Bangladesh with extensive experience in international tournaments and competitive online chess platforms.

| Question                                    | Interviewee Answer                                                 | Pain Point                             | Requirement Extracted | Insight                                                |
| ------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------- | --------------------- | ------------------------------------------------------ |
| How do you evaluate online chess platforms? | Mostly good for casual play, but inconsistent for serious training | Lack of professional-grade consistency | NFR-001, NFR-003      | Platform must support high-level competitive integrity |
| What is the biggest issue in online chess?  | Cheating and engine assistance                                     | Trust deficit in ranked games          | NFR-007, NFR-008      | Anti-cheat must be core system, not add-on             |
| What matters most in gameplay?              | Low latency and accurate move sync                                 | Lag and desync issues                  | NFR-002, NFR-004      | Real-time performance is critical for fairness         |

---

## Persona 2 - (IUB Chess Club) 10+ FIDE Rated Players

### Background

Chess club from Independent University, Bangladesh (IUB) consisting of 10+ FIDE-rated players actively participating in tournaments and online competitions.

| Question                          | Interviewee Answer                    | Pain Point                        | Requirement Extracted  | Insight                                    |
| --------------------------------- | ------------------------------------- | --------------------------------- | ---------------------- | ------------------------------------------ |
| What do you use online chess for? | Practice games and blitz training     | Limited structured training tools | FR-020, FR-021         | Training tools and analysis needed         |
| What frustrates you most?         | Unbalanced matchmaking in rated games | Skill mismatch                    | FR-001, FR-002, FR-003 | Strong ELO-based matchmaking required      |
| What features do you want most?   | Tournament system + team play         | Lack of organized competition     | FR-030, FR-031         | Community-driven tournaments are important |
| How important is game review?     | Very important for improvement        | No deep analysis tools            | FR-022, FR-023         | Post-game analysis increases engagement    |
| What about anti-cheat?            | Absolutely necessary in rated matches | Fairness concerns                 | NFR-007, NFR-008       | Integrity determines platform credibility  |

---

## Consolidated Pain Points

* Trust issues due to cheating in online rated games
* Weak matchmaking quality for competitive players
* Lack of advanced training and analysis tools
* Insufficient tournament and structured competitive ecosystem
* Performance issues affecting real-time gameplay fairness

---

## Requirements Extracted (Top 12)

* FR-001
* FR-002
* FR-003
* FR-020
* FR-021
* FR-022
* FR-023
* FR-030
* FR-031
* NFR-001
* NFR-002
* NFR-007
* NFR-008

---

## Interview Insight Summary

Competitive chess players, including a Grandmaster and a university-level FIDE-rated group, emphasize that the success of an online chess platform depends less on basic gameplay and more on fairness, anti-cheat enforcement, and professional-level competitive infrastructure.

Without strong integrity systems and structured competition features, even well-designed platforms risk being treated as casual-only tools.

