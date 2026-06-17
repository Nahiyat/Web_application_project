# Information Gathering Report

## Online Chess Platform

### Why Information Gathering Is Necessary

An online chess platform depends heavily on fairness, real-time performance, and competitive trust. Without structured requirement elicitation, systems often fail in matchmaking balance, anti-cheat enforcement, and low-latency gameplay, leading to poor player retention and credibility loss, especially among rated players.

---

## Requirement Elicitation Goals

| Goal ID | Goal                                                                      |
| ------- | ------------------------------------------------------------------------- |
| EG-01   | Identify core competitive chess player expectations (casual + FIDE-rated) |
| EG-02   | Convert gameplay and fairness issues into FR/NFR requirements             |
| EG-03   | Validate technical constraints for real-time and anti-cheat systems       |
| EG-04   | Ensure traceability for academic and system design documentation          |

---

## Methodology Used

| Method           | Target Group                            | Purpose                            | Output                              |
| ---------------- | --------------------------------------- | ---------------------------------- | ----------------------------------- |
| Expert Interview | GM Niaz Morshed (Bangladesh)            | High-level competitive insights    | Fairness + performance requirements |
| Group Interview  | IUB Chess Club (10+ FIDE-rated players) | Competitive user behavior analysis | Matchmaking + training needs        |
| Survey           | 10+ respondents                         | Quantitative feature ranking       | Demand prioritization               |
| Observation      | Online blitz/bullet sessions            | Real-time behavior tracking        | Latency + UX bottlenecks            |
| Benchmark Study  | Chess platforms (existing systems)      | Gap analysis                       | Feature + anti-cheat comparison     |

---

## Elicitation Process

<img width="436" height="643" alt="Screenshot 2026-06-17 063213" src="https://github.com/user-attachments/assets/028220a6-e534-49e6-a6d6-4b8f8bbe0049" />

---

## Key Findings

| Finding ID | Finding                                                    | Requirement Implication      |
| ---------- | ---------------------------------------------------------- | ---------------------------- |
| IF-01      | Rated players lose trust due to cheating in online games   | Anti-cheat core system       |
| IF-02      | Matchmaking often pairs uneven skill levels                | ELO-based matchmaking        |
| IF-03      | Even small latency affects competitive fairness            | Low-latency architecture     |
| IF-04      | Players need structured tournaments, not only casual games | Tournament system            |
| IF-05      | Post-game analysis is essential for improvement            | Game review + analysis tools |
| IF-06      | Lack of training tools limits player development           | Training modules             |

---

## Requirement Themes

* **Fairness & Integrity:** anti-cheat systems and trusted rating mechanics
* **Real-Time Performance:** ultra-low latency move synchronization
* **Competitive Structure:** tournaments, rankings, and leaderboards
* **Skill Development:** game analysis and training tools
* **Match Quality:** strong ELO-based matchmaking system

---

## Outcome

The information gathering phase established a validated foundation for system design. Outputs directly feed into PRD, SRS, use cases, architecture design, and QA strategy, ensuring the platform is aligned with both casual users and high-level competitive chess players.

