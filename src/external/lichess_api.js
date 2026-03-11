// src/lichessApi.js
const LICHESS_API_URL = 'https://lichess.org/api';
const LICHESS_API_TOKEN = 'lip_C20Yvhz1SsktDXrBbJx7'; // Replace with your actual API token

const headers = {
  'Authorization': `Bearer ${LICHESS_API_TOKEN}`,
  'Content-Type': 'application/json',
};

export const fetchGameStream = async (gameId) => {
  const response = await fetch(`${LICHESS_API_URL}/board/game/stream/${gameId}`, { headers });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response;
};

export const fetchGameData = async (gameId) => {
  const response = await fetch(`${LICHESS_API_URL}/board/game/${gameId}`, { headers });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};


export const fetchStudyData = async (studyId) => {
    const response = await fetch(`${LICHESS_API_URL}/study/${studyId}`, { headers });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
