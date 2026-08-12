import { API_BASE_URL } from './api'; // Adjust path if API_BASE_URL is stored elsewhere

/**
 * Sends current FEN and player move to backend and returns engine counter-move.
 * @param {string} fen - Current board position in FEN format.
 * @param {string} move - Player move in UCI format (e.g., "e2e4").
 * @param {number} difficulty - Search depth level (1 to 5).
 */
export async function makePvCMove(fen, move, difficulty = 3) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/pvc/move`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fen: fen,
        move: move,
        difficulty: difficulty,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to process move.');
    }

    return await response.json();
  } catch (error) {
    console.error('PvC Service Error:', error);
    throw error;
  }
}