

import api from './api';

export const fetchLeaderboard = async (limit = 100) => {
  try {
    const response = await api.get(`/rankings/leaderboard?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
};
