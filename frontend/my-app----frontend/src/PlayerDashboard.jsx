import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../src/styles/dashboard.css";
import { findMatch } from "./services/match_making";

function PlayerDashboard({ user }) {
  const navigate = useNavigate();
  const playerName = user?.name || "Player";

  const [searching, setSearching] = useState(false);

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
      id: "friend",
      title: "Play with Friend",
      description: "Invite your friends for a private match.",
      button: "Invite Friend",
      onClick: () => console.log("Invite Friend clicked"),
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
            <h3>1250</h3>
            <p>Rating</p>
          </div>

          <div className="stat-card wins">
            <h3>42</h3>
            <p>Wins</p>
          </div>

          <div className="stat-card losses">
            <h3>18</h3>
            <p>Losses</p>
          </div>

          <div className="stat-card draws">
            <h3>8</h3>
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