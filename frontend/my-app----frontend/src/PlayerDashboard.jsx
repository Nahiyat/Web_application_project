import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../src/styles/dashboard.css";
import { findMatch } from "./services/match_making";

function PlayerDashboard({ user }) {
  const navigate = useNavigate();
  const playerName = user?.name || "Player";

  const [searching, setSearching] = useState(false);
  const [loadingStats, setLoadingStats] = useState(true);
  const [stats, setStats] = useState({
    rating: 1200,
    wins: 0,
    losses: 0,
    draws: 0,
    total_games: 0,
    win_rate: 0,
  });

  // Fetch real-time user statistics from backend handler
  useEffect(() => {
    let isSubscribed = true;

    async function fetchDashboardStats() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8000/api/dashboard/player", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (isSubscribed) {
            setStats({
              rating: user?.rating || 1200,
              wins: data.wins,
              losses: data.losses,
              draws: data.draws,
              total_games: data.total_games,
              win_rate: data.win_rate,
            });
          }
        }
      } catch (err) {
        console.error("Failed to load dashboard statistics:", err);
      } finally {
        if (isSubscribed) setLoadingStats(false);
      }
    }

    fetchDashboardStats();

    return () => {
      isSubscribed = false;
    };
  }, [user]);

  const handleMatchmaking = async () => {
    setSearching(true);

    const poll = async () => {
      try {
        const result = await findMatch();

        if (result.matched) {
          setSearching(false);
          navigate(`/chessboard/${result.game_id}`);
        } else {
          // 🔁 try again after 2 seconds
          setTimeout(poll, 2000);
        }
      } catch (err) {
        console.error(err);
        setSearching(false);
      }
    };

    poll();
  };

  const menuItems = [
    {
      id: "matchmaking",
      title: "Play with Players",
      description: "Challenge players from around the world.",
      button: "Play Now",
      onClick: handleMatchmaking,
      isMatchmaking: true,
    },
    {
      id: "computer",
      title: "Play against Computer",
      description: "Play with computer in a match.",
      button: "Player Vs Computer",
      onClick: () => navigate("/pvc"),
    },
    {
      id: "tournament",
      title: "Tournament",
      description: "Join exciting online tournaments.",
      button: "Join Tournament",
      onClick: () => console.log("Tournament clicked"),
    },
    {
      id: "history",
      title: "Match History",
      description: "View all your previous matches.",
      button: "View History",
      onClick: () => navigate("/history"),
    },
    {
      id: "rankings",
      title: "Rankings",
      description: "See your position on the leaderboard.",
      button: "View Rankings",
      onClick: () => navigate("/rankings"),
    },
    {
      id: "profile",
      title: "Profile",
      description: "Update your profile information.",
      button: "Open Profile",
      onClick: () => navigate("/profile"),
    },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="logo">Online Chess Platform</h1>

          <div className="user-info">
            <p className="small-text">Logged in as</p>
            <p className="username">{playerName}</p>
          </div>
        </div>
      </header>

      <section className="welcome-section">
        <h2>
          Welcome,
          <span className="highlight"> {playerName}</span>
        </h2>

        <p className="subtitle">
          Choose an option below to start your next chess adventure.
        </p>
      </section>

      <div className="cards-wrapper">
        <div className="cards-grid">
          {menuItems.map((item) => {
            const isSearching = item.isMatchmaking && searching;

            return (
              <div key={item.id} className="dashboard-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button
                  onClick={item.onClick}
                  disabled={searching && !item.isMatchmaking}
                >
                  {isSearching ? "Searching for opponent..." : item.button}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="stats-wrapper">
        <h2>Quick Statistics</h2>

        <div className="stats-grid">
          <div className="stat-card rating">
            <h3>{loadingStats ? "..." : stats.rating}</h3>
            <p>Rating</p>
          </div>

          <div className="stat-card wins">
            <h3>{loadingStats ? "..." : stats.wins}</h3>
            <p>Wins</p>
          </div>

          <div className="stat-card losses">
            <h3>{loadingStats ? "..." : stats.losses}</h3>
            <p>Losses</p>
          </div>

          <div className="stat-card draws">
            <h3>{loadingStats ? "..." : stats.draws}</h3>
            <p>Draws</p>
          </div>
        </div>
      </div>

      <footer className="dashboard-footer">
        <div className="footer-content">
          <p>© 2026 Online Chess Platform</p>

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              localStorage.removeItem("refresh_token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </footer>
    </div>
  );
}

export default PlayerDashboard;