// src/ChessGameViewer.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchGameData } from '../external/lichess_api'; // Adjust the path if needed

const gameId = 'jX5EEanH'; // Replace with your actual Lichess game ID

const ChessGameViewer = () => {
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        // Fetch game data
        const data = await fetchGameData(gameId);
        setGameData(data);
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    };

    fetchGame();
  }, []);

  // Get the current move list
  const moves = gameData ? gameData.moves.split(' ') : [];
  
  return (
    <div className="min-h-screen bg-gray-100 font-roboto">
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Chess Game Viewer</h1>
          <div>
          <button className="text-white mr-4">
            <Link to="/giorCV/extras" className="text-white">
              <i className="fas fa-arrow-left"></i> Back
            </Link>
          </button>
          <button className="text-white mr-4">
            <Link to="/giorMainDevCV" className="text-white">
              <i className="fas fa-arrow-left"></i> Home
            </Link>
          </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">Game Viewer !!NOR FINAL VERSION NOR RIGHT GAME LOADED!! THIS IS A TEST MODE!! --NOTE: REST OF THE PAGE (STRATEGIES AND OTHER STUFF) IS YET TO BE DEVELOPED, USING LICHESS API FOR FRONTEND HAS BEEN A REAL PAIN IN THE ASS</h2>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col items-center">
            <p className="text-lg mb-4 text-center">
              This is an example of a high-level chess game played on Lichess. Use the embedded board below to view the game and analyze the moves.
            </p>
            <iframe
              src={`https://lichess.org/embed/${gameId}?moves=${moves.join(' ')}`}
              width="100%"
              height="600"
              frameBorder="0"
              allowFullScreen
              title="Lichess Game"
              className="mb-4"
            ></iframe>
            <p className="text-lg text-center">
              Review the game to gain insights into the strategies and tactics employed by the players. You can navigate through the moves directly on the board.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessGameViewer;
