// frontend/src/pages/MatchHistory.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css"; // Reuses dashboard styling or your custom CSS

export default function MatchHistory() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
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
          setMatches(data.recent_games || []);
        }
      } catch (err) {
        console.error("Failed to fetch match history:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  return (
    <div className="dashboard-container" style={{ padding: "2rem" }}>
      <button onClick={() => navigate("/dashboard")} style={{ marginBottom: "1rem" }}>
        ← Back to Dashboard
      </button>

      <h2>Match History</h2>

      {loading ? (
        <p>Loading past matches...</p>
      ) : matches.length === 0 ? (
        <p>No matches played yet.</p>
      ) : (
        <div style={{ marginTop: "1rem" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #ccc" }}>
                <th style={{ padding: "8px" }}>Game ID</th>
                <th style={{ padding: "8px" }}>Your Color</th>
                <th style={{ padding: "8px" }}>Winner</th>
                <th style={{ padding: "8px" }}>Reason</th>
                <th style={{ padding: "8px" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((game) => (
                <tr key={game.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "8px" }}>{game.id.slice(0, 8)}...</td>
                  <td style={{ padding: "8px", textTransform: "capitalize" }}>
                    {game.your_color}
                  </td>
                  <td style={{ padding: "8px", fontWeight: "bold" }}>
                    {game.winner === "draw"
                      ? "Draw"
                      : game.winner === game.your_color
                      ? "Victory"
                      : "Defeat"}
                  </td>
                  <td style={{ padding: "8px" }}>{game.end_reason || "N/A"}</td>
                  <td style={{ padding: "8px" }}>
                    {new Date(game.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}