# Online Chess Platform - User Personas

### Persona P1 - Amit Bikram Roy (Student Player)

| Attribute        | Details                                                        |
| ---------------- | -------------------------------------------------------------- |
| Demographics     | 20+, Independent university student                            |
| Goals            | Play chess for fun, improve gradually, compete in campus games |
| Motivations      | Entertainment, skill improvement, social interaction           |
| Pain Points      | Unbalanced matchmaking, cheaters in ranked games               |
| Technology Usage | Mobile-first, quick sessions between classes                   |
| Typical Workflow | Open app → quick matchmaking → play blitz games → check rating |

---

## Persona P2 - GM Niaz Morshed (Professional Chess Player)

| Attribute        | Details                                                                |
| ---------------- | ---------------------------------------------------------------------- |
| Demographics     | 30+, Grandmaster (Bangladesh)                                          |
| Goals            | High-quality training, fair competitive environment                    |
| Motivations      | Competitive integrity, skill refinement                                |
| Pain Points      | Cheating in online games, inconsistent latency, weak analysis tools    |
| Technology Usage | Desktop-first, analysis-heavy usage                                    |
| Typical Workflow | Play rated games → review replays → engine analysis → prepare openings |

---

## Persona P3 - IUB Chess Club Players (FIDE-Rated Group)

| Attribute        | Details                                                                    |
| ---------------- | -------------------------------------------------------------------------- |
| Demographics     | University chess club (10+ FIDE-rated players)                             |
| Goals            | Team practice, tournaments, structured competition                         |
| Motivations      | Competitive improvement, ranking performance                               |
| Pain Points      | Weak matchmaking balance, lack of organized tournaments                    |
| Technology Usage | Mixed mobile + desktop                                                     |
| Typical Workflow | Practice matches → internal tournaments → analyze games → improve strategy |

---

## Persona P4 - Competitive Online Player Abu Hanif (Ranked Player)

| Attribute        | Details                                                                   |
| ---------------- | ------------------------------------------------------------------------- |
| Demographics     | 18–28, active online chess competitor                                     |
| Goals            | Increase rating, climb leaderboards                                       |
| Motivations      | Ranking, recognition, competitive success                                 |
| Pain Points      | Smurf accounts, cheating, rating inconsistency                            |
| Technology Usage | Mobile + desktop hybrid                                                   |
| Typical Workflow | Queue ranked games → play rapid/blitz → check leaderboard → replay losses |

---

## Persona P5 - Chess Learner (Beginner Improving Player)

| Attribute        | Details                                                                     |
| ---------------- | --------------------------------------------------------------------------- |
| Demographics     | 15–25, beginner/intermediate learner                                        |
| Goals            | Learn rules, tactics, and improve gradually                                 |
| Motivations      | Skill development, learning progression                                     |
| Pain Points      | No feedback after games, overwhelming strong opponents                      |
| Technology Usage | Mobile-first with guided learning                                           |
| Typical Workflow | Play casual games → use hints/analysis → replay mistakes → practice tactics |

---

## Persona Coverage to Requirement Themes

| Theme                               | Personas   | Related Requirements           |
| ----------------------------------- | ---------- | ------------------------------ |
| Fair matchmaking & rating integrity | P2, P3, P4 | FR-001..FR-003, FR-010..FR-013 |
| Anti-cheat & trust system           | P2, P4     | NFR-007, NFR-008, NFR-009      |
| Learning & analysis tools           | P2, P5     | FR-020..FR-023                 |
| Competitive play & tournaments      | P3, P4     | FR-030..FR-033                 |
| Casual accessibility & mobile UX    | P1, P5     | FR-040..FR-045                 |
