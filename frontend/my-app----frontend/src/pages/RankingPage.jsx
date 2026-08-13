import React, { useEffect, useState } from 'react';
import { fetchLeaderboard } from '../services/ranking_service';
import '../styles/dashboard.css';

const RankingsPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRankings = async () => {
      try {
        const data = await fetchLeaderboard();
        setLeaderboard(data.rankings);
      } catch (err) {
        console.error("Failed to load rankings", err);
      } finally {
        setLoading(false);
      }
    };
    loadRankings();
  }, []);

  if (loading) {
    return <div className="loading-rankings">Loading Leaderboard...</div>;
  }

  const getRankBadgeClass = (rank) => {
    if (rank === 1) return 'rank-badge rank-1';
    if (rank === 2) return 'rank-badge rank-2';
    if (rank === 3) return 'rank-badge rank-3';
    return '';
  };

  return (
    <div className="rankings-container">
      <h2>Global Rankings</h2>
      <div className="rankings-table-wrapper">
        <table className="rankings-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Rating</th>
              <th>Account Type</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player) => (
              <tr key={player.id}>
                <td>
                  <span className={getRankBadgeClass(player.rank)}>
                    #{player.rank}
                  </span>
                </td>
                <td><strong>{player.username}</strong></td>
                <td>{player.rating}</td>
                <td>
                  <span className={`user-type-tag ${player.is_guest ? 'guest' : 'registered'}`}>
                    {player.is_guest ? 'Guest' : 'Registered'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankingsPage;
