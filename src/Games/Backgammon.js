"use client";
import React, { useState, useRef, useEffect } from "react";
function Backgammon() {
  const [gameState, setGameState] = React.useState({
    currentPlayer: 1,
    phase: "roll", // 'roll', 'move', 'waiting'
    dice: [0, 0],
    diceUsed: [false, false],
    moves: [],
    selectedPoint: null,
    availableMoves: [],
    doubleValue: 1,
    canDouble: [true, true],
    pipCount: [167, 167],
    capturedPieces: [0, 0],
    collectedPieces: [0, 0], // pieces that have been borne off
    winner: null,
  });

  
// PRELOAD your sound files
const moveAudio = useRef(null);
const captureAudio = useRef(null);
const rollDiceAudio = useRef(null);
const collectAudio = useRef(null);

// Initialize audio refs once
useEffect(() => {
  moveAudio.current = new Audio(require('./move_sound.mp3'));
  captureAudio.current = new Audio(require('./capture_sound.mp3'));
  rollDiceAudio.current = new Audio(require('./dice_roll.mp3'));
  collectAudio.current = new Audio(require('./collect_sound.mp3'));

  // Optional: allow immediate replay if click many times
  [moveAudio, captureAudio, rollDiceAudio, collectAudio].forEach(ref => {
    if (ref.current) ref.current.load();
  });
}, []);

  
const TOTAL_PAWNS_PER_PLAYER = 15; // For your test setup only; normally 15

  const [board, setBoard] = React.useState(() => {
    const initialBoard = Array.from({ length: 24 })
      .fill(null)
      .map(() => ({ pieces: 0, player: 0 }));

    // Player 1 starting positions (moving counter-clockwise)
    initialBoard[0] = { pieces: 2, player: 1 }; // Point 1
    initialBoard[11] = { pieces: 5, player: 1 }; // Point 12
    initialBoard[16] = { pieces: 3, player: 1 }; // Point 17
    initialBoard[18] = { pieces: 5, player: 1 }; // Point 19

    // Player 2 starting positions (moving clockwise)
    initialBoard[23] = { pieces: 2, player: 2 }; // Point 24
    initialBoard[12] = { pieces: 5, player: 2 }; // Point 13
    initialBoard[7] = { pieces: 3, player: 2 }; // Point 8
    initialBoard[5] = { pieces: 5, player: 2 }; // Point 6

    return initialBoard;
  });
//   const [board, setBoard] = React.useState(() => {
//   const initialBoard = Array.from({ length: 24 })
//     .fill(null)
//     .map(() => ({ pieces: 0, player: 0 }));

//   // Put 5 pawns for Player 1 in their home quadrant (points 18 to 23)
//   initialBoard[18] = { pieces: TOTAL_PAWNS_PER_PLAYER, player: 1 };

//   // Put 5 pawns for Player 2 in their home quadrant (points 0 to 5)
//   initialBoard[5] = { pieces: TOTAL_PAWNS_PER_PLAYER, player: 2 };

//   return initialBoard;
// });
  const [showWinModal, setShowWinModal] = useState(false);


  const boardRef = useRef(board); // Initialize ref with current board
  React.useEffect(() => {
  if (gameState.phase === "move") {
    const remainingDice = gameState.moves.filter((_, idx) => !gameState.diceUsed[idx]);
    const hasMoves = canPlayerMakeAnyMove(
        board,
        gameState.currentPlayer,
        gameState.moves,
        gameState.diceUsed,
        gameState.capturedPieces
        );
    if (!hasMoves) {
      setShowNoMovesModal(true);
    }
    }
    }, [board, gameState.moves, gameState.diceUsed, gameState.phase, gameState.currentPlayer, gameState.capturedPieces]);

  const [animatingDice, setAnimatingDice] = React.useState(false);
  const [showBetModal, setShowBetModal] = React.useState(false);
  const [showSettingsModal, setShowSettingsModal] = React.useState(false);
  const [showNoMovesModal, setShowNoMovesModal] = React.useState(false);
  const [currentBet, setCurrentBet] = React.useState(1);
  const [settings, setSettings] = React.useState({
    theme: "classic", // 'classic', 'ocean', 'forest', 'sunset', 'royal'
    pawnColors: "classic", // 'classic', 'redblue', 'greenwhite', 'goldsilver', 'purpleorange'
  });
  const [dicePhysics, setDicePhysics] = React.useState({
    dice1: { x: 0, y: 0, rotation: 0, value: 1 },
    dice2: { x: 0, y: 0, rotation: 0, value: 1 },
  });

  const resetGame = () => {
  // Replace with your exact initial state values
  setBoard(() => {
    const initialBoard = Array.from({ length: 24 }, () => ({ pieces: 0, player: 0 }));
    // Your initial setup...
    initialBoard[0] = { pieces: 2, player: 1 };
    initialBoard[11] = { pieces: 5, player: 1 };
    initialBoard[16] = { pieces: 3, player: 1 };
    initialBoard[18] = { pieces: 5, player: 1 };
    initialBoard[23] = { pieces: 2, player: 2 };
    initialBoard[12] = { pieces: 5, player: 2 };
    initialBoard[7] = { pieces: 3, player: 2 };
    initialBoard[5] = { pieces: 5, player: 2 };
    return initialBoard;
  });

  // Reset other gameState properties to initial
  setGameState({
    currentPlayer: 1,
    phase: "roll",
    dice: [0, 0],
    diceUsed: [false, false],
    moves: [],
    selectedPoint: null,
    availableMoves: [],
    doubleValue: 1,
    canDouble: [true, true],
    pipCount: [167, 167],
    capturedPieces: [0, 0],
    collectedPieces: [0, 0],
    winner: null,
  });
};


  const [selectedCapturedPawn, setSelectedCapturedPawn] = React.useState(false);
const [availableEntryPoints, setAvailableEntryPoints] = React.useState([]);
const triggerWin = (winner) => {
  const loser = winner === 1 ? 2 : 1;
  const winnerCollected = gameState.collectedPieces[winner - 1];
  const loserCollected = gameState.collectedPieces[loser - 1];
  const doubled = loserCollected === 0;
  const payout = doubled
    ? currentBet * 2
    : (currentBet * winnerCollected) / Math.max(1, loserCollected);

  setGameState(prev => ({
    ...prev,
    phase: "finished",
    winner: {
      player: winner,
      color: winner === 1 ? "White" : "Black",
      winnerCollected,
      loserCollected,
      doubled,
      payout: payout.toFixed(2)
    }
  }));
  setShowWinModal(true);
};

React.useEffect(() => {
  // Check if either player collected all 15 pawns
  if (gameState.phase !== "finished") {
    if (gameState.collectedPieces[0] === TOTAL_PAWNS_PER_PLAYER) {
      triggerWin(1);
    } else if (gameState.collectedPieces[1] === TOTAL_PAWNS_PER_PLAYER) {
      triggerWin(2);
    }
  }
}, [gameState.collectedPieces, gameState.phase]);


  const themes = {
    classic: {
      board: "bg-amber-100",
      point1: "bg-amber-700",
      point2: "bg-amber-900",
      center: "bg-amber-200 border-amber-800",
      highlight: "ring-yellow-300",
    },
    ocean: {
      board: "bg-blue-100",
      point1: "bg-blue-600",
      point2: "bg-blue-800",
      center: "bg-cyan-200 border-cyan-800",
      highlight: "ring-cyan-300",
    },
    forest: {
      board: "bg-green-100",
      point1: "bg-green-600",
      point2: "bg-green-800",
      center: "bg-lime-200 border-lime-800",
      highlight: "ring-lime-300",
    },
    sunset: {
      board: "bg-orange-100",
      point1: "bg-red-600",
      point2: "bg-orange-800",
      center: "bg-yellow-200 border-yellow-800",
      highlight: "ring-yellow-300",
    },
    royal: {
      board: "bg-purple-100",
      point1: "bg-purple-600",
      point2: "bg-indigo-800",
      center: "bg-pink-200 border-pink-800",
      highlight: "ring-pink-300",
    },
  };

  const pawnColors = {
    classic: {
      player1: {
        bg: "bg-white",
        border: "border-gray-300",
        text: "text-black",
      },
      player2: {
        bg: "bg-black",
        border: "border-gray-700",
        text: "text-white",
      },
    },
    redblue: {
      player1: {
        bg: "bg-red-500",
        border: "border-red-700",
        text: "text-white",
      },
      player2: {
        bg: "bg-blue-500",
        border: "border-blue-700",
        text: "text-white",
      },
    },
    greenwhite: {
      player1: {
        bg: "bg-green-500",
        border: "border-green-700",
        text: "text-white",
      },
      player2: {
        bg: "bg-white",
        border: "border-gray-300",
        text: "text-black",
      },
    },
    goldsilver: {
      player1: {
        bg: "bg-yellow-400",
        border: "border-yellow-600",
        text: "text-black",
      },
      player2: {
        bg: "bg-gray-400",
        border: "border-gray-600",
        text: "text-black",
      },
    },
    purpleorange: {
      player1: {
        bg: "bg-purple-500",
        border: "border-purple-700",
        text: "text-white",
      },
      player2: {
        bg: "bg-orange-500",
        border: "border-orange-700",
        text: "text-white",
      },
    },
  };


    // --- START: Add this helper function ---
  function canPlayerMakeAnyMove(currentBoard, player, moves, diceUsed, capturedPiecesState) {
  if (!currentBoard || !Array.isArray(currentBoard)) {
    console.warn("canPlayerMakeAnyMove: currentBoard is invalid", currentBoard);
    return false;
  }
  if (!moves || !Array.isArray(moves)) {
    console.warn("canPlayerMakeAnyMove: moves is invalid", moves);
    return false;
  }
  if (!diceUsed || !Array.isArray(diceUsed)) {
    console.warn("canPlayerMakeAnyMove: diceUsed is invalid", diceUsed);
    return false;
  }
  if (!capturedPiecesState || !Array.isArray(capturedPiecesState)) {
    console.warn("canPlayerMakeAnyMove: capturedPiecesState is invalid", capturedPiecesState);
    return false;
  }
  if (capturedPiecesState[player - 1] > 0) {
    for (let i = 0; i < moves.length; i++) {
      if (!diceUsed[i]) {
        const die = moves[i];
        const entryPoint = player === 1 ? die - 1 : 24 - die;
        if (entryPoint >= 0 && entryPoint < 24) {
          const target = currentBoard[entryPoint];
          if (target.player === 0 || target.player === player || target.pieces <= 1) {
            return true;
          }
        }
      }
    }
    return false;
  }

  // Normal moves
  for (let pt = 0; pt < board.length; pt++) {
    if (board[pt].player === player && board[pt].pieces > 0) {
      const movesAvailable = getValidMoves(pt, moves, diceUsed);
      if (movesAvailable.length > 0) return true;
    }
  }

  return false;
}



    // --- END: Add this helper function ---



const rollDice = () => {
  if (gameState.phase === "finished") return;
  if (gameState.phase !== "roll") return;

  if (!rollDiceAudio.current) return;

  // Reset previous handler to prevent duplicates
  rollDiceAudio.current.onended = null;

  rollDiceAudio.current.currentTime = 0;
  rollDiceAudio.current.play();

  setAnimatingDice(true); // Start animation loop

  let animationFrameId;

  const animate = () => {
    const now = Date.now();

    const dice1X = Math.sin(now / 100) * 20;
    const dice1Y = Math.cos(now / 150) * 15;
    const dice1Rotation = (now / 3) % 360;

    const dice2X = Math.cos(now / 120) * 25;
    const dice2Y = Math.sin(now / 130) * 18;
    const dice2Rotation = (now / 2.5) % 360;

    setDicePhysics({
      dice1: {
        x: dice1X,
        y: dice1Y,
        rotation: dice1Rotation,
        value: Math.floor(Math.random() * 6) + 1,
      },
      dice2: {
        x: dice2X,
        y: dice2Y,
        rotation: dice2Rotation,
        value: Math.floor(Math.random() * 6) + 1,
      },
    });

    animationFrameId = requestAnimationFrame(animate);
  };

  animate();

  rollDiceAudio.current.onended = () => {
    cancelAnimationFrame(animationFrameId);
    setAnimatingDice(false);

    const dice1Final = Math.floor(Math.random() * 6) + 1;
    const dice2Final = Math.floor(Math.random() * 6) + 1;

    setDicePhysics({
      dice1: { x: 0, y: 0, rotation: 0, value: dice1Final },
      dice2: { x: 0, y: 0, rotation: 0, value: dice2Final },
    });

    const newMoves =
      dice1Final === dice2Final
        ? [dice1Final, dice1Final, dice1Final, dice1Final]
        : [dice1Final, dice2Final];

    const newDiceUsed = newMoves.map(() => false);

    setGameState((prev) => ({
      ...prev,
      dice: [dice1Final, dice2Final],
      diceUsed: newDiceUsed,
      phase: "move",
      moves: newMoves,
    }));

    // Check possible moves asynchronously after game state update
    setTimeout(() => {
      const hasPossibleMoves = canPlayerMakeAnyMove(
        boardRef.current,
        gameState.currentPlayer,
        newMoves,
        newDiceUsed,
        gameState.capturedPieces
      );
      if (!hasPossibleMoves) setShowNoMovesModal(true);
    }, 50);

    // Remove handler to avoid leaks
    rollDiceAudio.current.onended = null;
  };
};




  const checkForAvailableMoves = (moves) => {
    const player = gameState.currentPlayer;
    let hasAvailableMoves = false;

    // If player has captured pieces, they must enter them first
    if (gameState.capturedPieces[player - 1] > 0) {
      // Check if can enter from bar
      moves.forEach((move, index) => {
        if (gameState.diceUsed[index]) return;

        let entryPoint;
        if (player === 1) {
          entryPoint = move - 1; // Points 0-23, so dice 1 goes to point 0
        } else {
          entryPoint = 24 - move; // Points 23-0, so dice 1 goes to point 23
        }

        if (entryPoint >= 0 && entryPoint < 24) {
          const targetPoint = board[entryPoint];
          if (
            targetPoint.player !== (player === 1 ? 2 : 1) ||
            targetPoint.pieces <= 1
          ) {
            hasAvailableMoves = true;
          }
        }
      });
    } else {
      // Check normal moves
      board.forEach((point, pointIndex) => {
        if (point.player === player && point.pieces > 0) {
          const validMoves = getValidMoves(pointIndex, moves);
          if (validMoves.length > 0) {
            hasAvailableMoves = true;
          }
        }
      });
    }

    if (!hasAvailableMoves) {
      setShowNoMovesModal(true);
    }
  };

  const handleNoMovesOk = () => {
    setShowNoMovesModal(false);
    setGameState((prev) => ({
      ...prev,
      currentPlayer: prev.currentPlayer === 1 ? 2 : 1,
      phase: "roll",
      diceUsed: [false, false],
      moves: [],
      selectedPoint: null,
      availableMoves: [],
    }));
  };

  const endTurn = () => {
    setGameState((prev) => ({
      ...prev,
      currentPlayer: prev.currentPlayer === 1 ? 2 : 1,
      phase: "roll",
      diceUsed: [false, false],
      moves: [],
      selectedPoint: null,
      availableMoves: [],
    }));
  };

  const calculatePipCount = (board, player) => {
    let count = 0;
    board.forEach((point, index) => {
      if (point.player === player) {
        const distance = player === 1 ? 24 - index : index + 1;
        count += point.pieces * distance;
      }
    });
    return count;
  };

  const getValidMoves = (fromPoint, moves, diceUsed) => {
  const validMoves = [];
  const player = gameState.currentPlayer;

  // If player has captured pieces and fromPoint is not -1 (not from bar), no regular moves allowed
  if (gameState.capturedPieces[player - 1] > 0 && fromPoint !== -1) {
    console.log(`[getValidMoves] Player ${player} has captured pieces, blocking moves from point ${fromPoint}`);
    return validMoves;
  }

  let foundAnyMoveForPoint = false;

  moves.forEach((die, idx) => {
    if (diceUsed[idx]) {
      console.log(`[getValidMoves] Die index ${idx} (value ${die}) already used.`);
      return; // skip used dice
    }

    let toPoint;
    if (player === 1) {
      toPoint = fromPoint + die;
    } else {
      toPoint = fromPoint - die;
    }

    if (toPoint >= 0 && toPoint < 24) {
      const targetPoint = board[toPoint];
      // Normal board move allowed if target point is empty, owned by player, or blot to hit
      if (targetPoint.player !== (player === 1 ? 2 : 1) || targetPoint.pieces <= 1) {
        validMoves.push({
          from: fromPoint,
          to: toPoint,
          die: die,
          dieIndex: idx,
        });
        foundAnyMoveForPoint = true;
        console.log(`[getValidMoves] Valid move: from ${fromPoint} to ${toPoint} with die ${die} (dieIndex ${idx}).`);
      } else {
        console.log(`[getValidMoves] Point ${toPoint} blocked by opponent (pieces: ${targetPoint.pieces}).`);
      }
    } else if ((player === 1 && toPoint >= 24) || (player === 2 && toPoint < 0)) {
      // Bear-off checks:
      // Player must have all pieces in home quadrant
      const canBearOff = board.every((point, idx) => {
        if (point.player === player) {
          return player === 1 ? idx >= 18 : idx <= 5;  // home area check
        }
        return true;
      });

      // Also piece must be inside home quadrant to bear off
      const isInHomeQuadrant = (player === 1 && fromPoint >= 18) || (player === 2 && fromPoint <= 5);

      if (canBearOff && isInHomeQuadrant) {
        validMoves.push({
          from: fromPoint,
          to: -1,       // to -1 means bear off / remove from board
          die: die,
          dieIndex: idx,
        });
        foundAnyMoveForPoint = true;
        console.log(`[getValidMoves] Bearing off allowed from ${fromPoint} using die ${die} (dieIndex ${idx}).`);
      } else {
        console.log(`[getValidMoves] Cannot bear off from ${fromPoint} when pieces not all in home area.`);
      }
    } else {
      console.log(`[getValidMoves] Calculated toPoint ${toPoint} out of valid range.`);
    }
  });

  if (!foundAnyMoveForPoint) {
    console.log(`[getValidMoves] No valid moves found for point ${fromPoint} with current dice and usage.`);
  }

  return validMoves;
};





  const selectPoint = (pointIndex) => {
  if (gameState.phase !== "move") return;
    if (selectedCapturedPawn) {
    // Ignore board point selection while re-entering captured pawn
    return;
  }
  if (gameState.capturedPieces[gameState.currentPlayer -1] > 0) return;

  if (gameState.selectedPoint === pointIndex) {
    setGameState(prev => ({
      ...prev,
      selectedPoint: null,
      availableMoves: [],
    }));
    return;
  }

  if (gameState.selectedPoint !== null) {
    const validMove = gameState.availableMoves.find(move => move.to === pointIndex);
    if (validMove) {
      makeMove(validMove);
    }
    return;
  }

  const point = board[pointIndex];
  if (point.player === gameState.currentPlayer && point.pieces > 0) {
    const validMoves = getValidMoves(pointIndex, gameState.moves, gameState.diceUsed);
    setGameState(prev => ({
      ...prev,
      selectedPoint: pointIndex,
      availableMoves: validMoves,
    }));
  }
};



const makeMove = (move) => {
  const newBoard = [...board];
  const tempGameState = { ...gameState };

  console.log("makeMove called:", move);

  let captured = false;
  const movingFromBar = move.from === -1;

  // Remove piece from source or captured
  if (movingFromBar) {
    tempGameState.capturedPieces[tempGameState.currentPlayer - 1]--;
  } else {
    newBoard[move.from].pieces--;
    if (newBoard[move.from].pieces === 0) {
      newBoard[move.from].player = 0;
    }
  }

  // Place piece or bear off
  if (move.to === -1) {
    // Bearing off
    tempGameState.collectedPieces[tempGameState.currentPlayer - 1]++;
  } else {
    // Detect capturing:
    if (
      newBoard[move.to].player !== 0 &&
      newBoard[move.to].player !== tempGameState.currentPlayer &&
      newBoard[move.to].pieces === 1
    ) {
      captured = true;
      tempGameState.capturedPieces[newBoard[move.to].player - 1]++;
      newBoard[move.to] = { pieces: 0, player: 0 };
    }
    if (newBoard[move.to].player === 0) {
      newBoard[move.to].player = tempGameState.currentPlayer;
      newBoard[move.to].pieces = 1;
    } else {
      newBoard[move.to].pieces++;
    }
  }

  // Play sounds according to your updated logic (no waiting):
  if (move.to === -1) {
    // Collect sound only
    if (collectAudio.current) {
      collectAudio.current.currentTime = 0;
      collectAudio.current.play();
    }
  } else if (captured) {
    // Capture sound only if captured (no move sound)
    if (captureAudio.current) {
      captureAudio.current.currentTime = 0;
      captureAudio.current.play();
    }
  } else if (movingFromBar && !captured) {
    // Entering from bar without hitting blot -> move sound
    if (moveAudio.current) {
      moveAudio.current.currentTime = 0;
      moveAudio.current.play();
    }
  } else {
    // Normal move sound for non-capturing regular move
    if (moveAudio.current) {
      moveAudio.current.currentTime = 0;
      moveAudio.current.play();
    }
  }

  // MARK DIE USED:
  const newDiceUsed = [...tempGameState.diceUsed];
  newDiceUsed[move.dieIndex] = true;
  console.log(`Marking die at index ${move.dieIndex} as used.`);
  tempGameState.diceUsed = newDiceUsed;
  console.log("Dice used after move:", tempGameState.diceUsed);

  // Update pip counts
  tempGameState.pipCount[0] = calculatePipCount(newBoard, 1);
  tempGameState.pipCount[1] = calculatePipCount(newBoard, 2);

  // Remaining dice after used ones are marked
  const remainingDice = tempGameState.moves.filter((_, idx) => !tempGameState.diceUsed[idx]);
  console.log(`Remaining dice after move: ${remainingDice}`);

  // Check if player has moves left with remaining dice
  const hasMovesRemaining = canPlayerMakeAnyMove(
    newBoard,
    tempGameState.currentPlayer,
    tempGameState.moves, // FULL moves array
    tempGameState.diceUsed, // FULL diceUsed array
    tempGameState.capturedPieces
  );

  function endTurnLogic(state) {
    state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;
    state.phase = "roll";
    state.moves = [];
    state.diceUsed = [];
    state.selectedPoint = null;
    state.availableMoves = [];
    setBoard(newBoard);
    setGameState(state);
  }

  function continueTurnLogic(state) {
    state.phase = "move";
    state.selectedPoint = null;
    state.availableMoves = [];
    setBoard(newBoard);
    setGameState(state);
  }

  console.log(`Remaining dice count: ${remainingDice.length}`);
  console.log(`Has moves remaining: ${hasMovesRemaining}`);

  if (remainingDice.length === 0 || !hasMovesRemaining) {
    console.log("Ending turn");
    endTurnLogic(tempGameState);
  } else {
    console.log("Continuing turn");
    continueTurnLogic(tempGameState);
  }

  // Update board and game state again (optional redundancy)
  setBoard(newBoard);
  setGameState(tempGameState);
};



  const offerDouble = () => {
    if (!gameState.canDouble[gameState.currentPlayer - 1]) return;
    setShowBetModal(true);
  };

  const acceptDouble = () => {
    setGameState((prev) => ({
      ...prev,
      doubleValue: prev.doubleValue * 2,
      canDouble: [false, false],
    }));
    setCurrentBet(gameState.doubleValue * 2);
    setShowBetModal(false);
  };

  function handleBarEntry(player) {
    // Only allow if active player's turn and has bar pieces
    if (player !== gameState.currentPlayer || gameState.capturedPieces[player - 1] <= 0) return;

    // Use available moves/dice
    const dice = gameState.moves.filter((_, idx) => !gameState.diceUsed[idx]);
    let moved = false;
    const newBoard = [...board];
    const targetPlayer = player === 1 ? 1 : 2;

    for (let idx = 0; idx < dice.length; idx++) {
        const die = dice[idx];
        let entryPoint;
        if (player === 1) {
        entryPoint = die - 1;
        } else {
        entryPoint = 24 - die;
        }
        // Is entry point valid?
        if (
        entryPoint >= 0 &&
        entryPoint < 24 &&
        (newBoard[entryPoint].player !== (player === 1 ? 2 : 1) || newBoard[entryPoint].pieces <= 1)
        ) {
        // Perform capture if needed
        if (
            newBoard[entryPoint].player === (player === 1 ? 2 : 1) &&
            newBoard[entryPoint].pieces === 1
        ) {
            // Opponent piece captured
            newBoard[entryPoint].player = player;
            newBoard[entryPoint].pieces = 1;
            // Add to opponent's bar
            let newCapturedPieces = [...gameState.capturedPieces];
            newCapturedPieces[(player === 1 ? 1 : 0)]++;
            newCapturedPieces[player - 1] -= 1;  // Remove from current player's bar

            let newDiceUsed = [...gameState.diceUsed];
            newDiceUsed[idx] = true;

            const nextPhase = newDiceUsed.every(Boolean) ? "roll" : "move";

            setBoard(newBoard);
            setGameState((prev) => ({
              ...prev,
              capturedPieces: newCapturedPieces,
              diceUsed: newDiceUsed,
              selectedPoint: null,
              availableMoves: [],
              phase: nextPhase,
              currentPlayer: nextPhase === "roll" ? (prev.currentPlayer === 1 ? 2 : 1) : prev.currentPlayer,
            }));

        } else {
            // Move piece from bar onto board
            newBoard[entryPoint].player = player;
            newBoard[entryPoint].pieces += 1;
        }
        // Remove from bar
        let newCapturedPieces = [...gameState.capturedPieces];
        newCapturedPieces[player - 1] -= 1;

        // Update dice used for this move
        let newDiceUsed = [...gameState.diceUsed];
        newDiceUsed[idx] = true;

        // End turn if all dice used
        let nextPhase = "move";
        if (newDiceUsed.every(Boolean)) {
            nextPhase = "roll";
        }

        setBoard(newBoard);
        setGameState((prev) => ({
            ...prev,
            capturedPieces: newCapturedPieces,
            diceUsed: newDiceUsed,
            selectedPoint: null,
            availableMoves: [],
            phase: nextPhase,
            currentPlayer: nextPhase === "roll" ? (prev.currentPlayer === 1 ? 2 : 1) : prev.currentPlayer,
        }));

        moved = true;
        break;
        }
  }

  // If couldn't place, show no moves popup
  if (!moved) {
    setShowNoMovesModal(true);
  }
}

  function getAvailableEntryPoints(player, moves, diceUsed, board) {
  const entryPoints = [];
  for (let i = 0; i < moves.length; i++) {
    if (diceUsed[i]) continue;
    const die = moves[i];
    const pointIndex = player === 1 ? die - 1 : 24 - die;
    if (pointIndex < 0 || pointIndex > 23) continue;
    const point = board[pointIndex];
    if (
      point.player === 0 ||                       // Empty
      point.player === player ||                   // Own pieces
      point.pieces <= 1                            // Blot to capture
    ) {
      entryPoints.push({ pointIndex, die, dieIndex: i });
    }
  }
  return entryPoints;
}


function enterFromBar(entry) {
  const { pointIndex, dieIndex } = entry;
  const newBoard = [...board];
  const tempGameState = { ...gameState };

  // Check if capturing opponent blot on entry point
  const isCapture =
    newBoard[pointIndex].player !== 0 &&
    newBoard[pointIndex].player !== tempGameState.currentPlayer &&
    newBoard[pointIndex].pieces === 1;

  if (isCapture) {
    // Increment opponent's bar count
    const opponent = newBoard[pointIndex].player;
    const newCapturedPieces = [...tempGameState.capturedPieces];
    newCapturedPieces[opponent - 1]++;
    tempGameState.capturedPieces = newCapturedPieces;

    // Remove opponent piece from board point
    newBoard[pointIndex] = { pieces: 0, player: 0 };
  }

  // Place piece from bar to board
  if (newBoard[pointIndex].player === 0) {
    newBoard[pointIndex].player = tempGameState.currentPlayer;
    newBoard[pointIndex].pieces = 1;
  } else {
    newBoard[pointIndex].pieces++;
  }

  // Remove one piece from bar for current player
  const newCapturedCurrent = [...tempGameState.capturedPieces];
  newCapturedCurrent[tempGameState.currentPlayer - 1]--;
  tempGameState.capturedPieces = newCapturedCurrent;

  // Play sounds:
  if (isCapture) {
    // Play capture sound only
    if (captureAudio.current) {
      captureAudio.current.currentTime = 0;
      captureAudio.current.play();
    }
  } else {
    // Play normal move sound
    if (moveAudio.current) {
      moveAudio.current.currentTime = 0;
      moveAudio.current.play();
    }
  }

  // Mark die used
  const newDiceUsed = [...tempGameState.diceUsed];
  newDiceUsed[dieIndex] = true;
  tempGameState.diceUsed = newDiceUsed;

  // Reset selected capturedPawn and available entries
  setSelectedCapturedPawn(false);
  setAvailableEntryPoints([]);

  // Update board and game state
  setBoard(newBoard);
  setGameState(tempGameState);

  // You can run further checks here for remaining moves if needed
}



  const currentTheme = themes[settings.theme];
  const currentPawnColors = pawnColors[settings.pawnColors];

  const renderPoint = (pointIndex, isTop = false) => {
  const point = board[pointIndex];
  const pieces = [];
  for (let i = 0; i < Math.min(point.pieces, 5); i++) {
    const colors =
      point.player === 1
        ? currentPawnColors.player1
        : currentPawnColors.player2;
    pieces.push(
      <div
        key={i}
        className={`w-12 h-12 rounded-full border-2 ${colors.bg} ${colors.border} ${colors.text} ${gameState.selectedPoint === pointIndex ? "ring-4 ring-yellow-400" : ""} flex items-center justify-center text-xs font-bold`}
        style={{
          position: "absolute",
          [isTop ? "top" : "bottom"]: `${i * 45}px`,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100 + i,
        }}
      >
        {point.pieces > 5 && i === 4 ? point.pieces : ""}
      </div>,
    );
  }
  // render pieces same as before...

  const isAvailableMove = gameState.availableMoves.some(
    (move) => move.to === pointIndex
  );
  
  // New: highlight if available for bar entry when pawn is selected
  const isAvailableEntryPoint = selectedCapturedPawn && availableEntryPoints.some(
    (entry) => entry.pointIndex === pointIndex
  );

  return (
    <div
      key={pointIndex}
      className={`relative flex-1 h-full cursor-pointer ${
        pointIndex % 2 === 0 ? currentTheme.point1 : currentTheme.point2
      } ${isAvailableMove ? `ring-4 ${currentTheme.highlight} ring-inset` : ""} ${
        isAvailableEntryPoint ? 'ring-4 ring-green-400 ring-inset' : ''
      }`}
      onClick={() => {
        if (selectedCapturedPawn && isAvailableEntryPoint) {
          // Call enterFromBar to place captured pawn here
          const entry = availableEntryPoints.find(e => e.pointIndex === pointIndex)
          if (entry) enterFromBar(entry);
        } else {
          selectPoint(pointIndex);
        }
      }}
      style={{
        clipPath: isTop
          ? "polygon(0 0, 100% 0, 50% 100%)"
          : "polygon(50% 0, 0 100%, 100% 100%)",
        zIndex: 1,
      }}
    >
      {pieces}
    </div>
  );
};

  const renderDice = (diceData, index) => {
    const faces = [
        [{ x: 50, y: 50 }], // 1
        [
        { x: 25, y: 25 },
        { x: 75, y: 75 },
        ], // 2
        [
        { x: 25, y: 25 },
        { x: 50, y: 50 },
        { x: 75, y: 75 },
        ], // 3
        [
        { x: 25, y: 25 },
        { x: 75, y: 25 },
        { x: 25, y: 75 },
        { x: 75, y: 75 },
        ], // 4
        [
        { x: 25, y: 25 },
        { x: 75, y: 25 },
        { x: 50, y: 50 },
        { x: 25, y: 75 },
        { x: 75, y: 75 },
        ], // 5
        [
        { x: 25, y: 25 },
        { x: 75, y: 25 },
        { x: 25, y: 50 },
        { x: 75, y: 50 },
        { x: 25, y: 75 },
        { x: 75, y: 75 },
        ], // 6
    ];

  const dots = faces[diceData.value - 1] || [];

  return (
    <div
      className="w-16 h-16 bg-white border-2 border-black rounded-lg shadow-lg flex items-center justify-center transition-transform"
      style={{
        transform: `rotate(${diceData.rotation}deg) translate(${diceData.x}px, ${diceData.y}px)`,
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        {dots.map((dot, i) => (
          <circle key={i} cx={dot.x} cy={dot.y} r="8" fill="black" />
        ))}
      </svg>
    </div>
  );
};


  const renderCaptureBox = (player, position) => {
  const colors = player === 1 ? currentPawnColors.player1 : currentPawnColors.player2;
  const capturedCount = gameState.capturedPieces[player - 1];
  const title = player === 1 ? "Captured White" : "Captured Black";

  return (
    <div className="bg-gray-800 border-4 border-black rounded-lg p-4 w-32 h-48">
      <div className="text-white text-sm font-bold mb-2 text-center">{title}</div>
      <div className="flex flex-col items-center space-y-1">
        {capturedCount > 0 && player === gameState.currentPlayer && (
          <button
            className="mb-2 px-4 py-1 bg-yellow-500 rounded font-bold cursor-pointer"
            onClick={() => {
              setSelectedCapturedPawn(true);
              const entryPoints = getAvailableEntryPoints(
                player,
                gameState.moves,
                gameState.diceUsed,
                board
              );
              setAvailableEntryPoints(entryPoints);
              setGameState(prev => ({
                ...prev,
                selectedPoint: null,
                availableMoves: [],
              }));
            }}
          >
            Enter Captured Piece
          </button>
        )}
        {/* Existing render of captured pieces */}
        {Array(Math.min(capturedCount, 8))
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={`w-8 h-8 ${colors.bg} border ${colors.border} rounded-full flex items-center justify-center text-xs font-bold ${colors.text}`}
            >
              {capturedCount > 8 && i === 7 ? capturedCount : ""}
            </div>
          ))}
      </div>
    </div>
  );
};



  const renderCollectionBox = (player, position) => {
  const capturedCount = gameState.capturedPieces[player - 1];
  const canCollectHere = gameState.currentPlayer === player &&
                      gameState.availableMoves.some(m => m.to === -1);


  const colors = player === 1 ? currentPawnColors.player1 : currentPawnColors.player2;
  const collectedCount = gameState.collectedPieces[player - 1];
  const title = player === 1 ? "White Home" : "Black Home";

  return (
    <div
      className={`bg-gray-800 border-4 border-black rounded-lg p-4 w-32 h-48 ${
        canCollectHere ? "ring-4 ring-yellow-400 ring-inset cursor-pointer" : ""
      }`}
      onClick={() => {
        if (canCollectHere) {
          const bearOffMove = gameState.availableMoves.find(m => m.to === -1);
          if (bearOffMove) makeMove(bearOffMove);
        }
      }}
    >
      <div className="text-white text-sm font-bold mb-2 text-center">{title}</div>
      <div className="flex flex-col items-center space-y-1">
        {Array(Math.min(collectedCount, 8))
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={`w-8 h-8 ${colors.bg} border ${colors.border} rounded-full flex items-center justify-center text-xs font-bold ${colors.text} ${
                player === gameState.currentPlayer && capturedCount > 0 ? "cursor-pointer ring-2 ring-yellow-400" : ""
              }`}
            >
              {collectedCount > 8 && i === 7 ? collectedCount : ""}
            </div>
          ))}
      </div>
    </div>
  );
};


  useEffect(() => {
  if (gameState.collectedPieces[0] === 15 || gameState.collectedPieces[1] === 15) {
    const winner = gameState.collectedPieces[0] === 15 ? 1 : 2;
    const loser = winner === 1 ? 2 : 1;
    const winnerCollected = gameState.collectedPieces[winner - 1];
    const loserCollected = gameState.collectedPieces[loser - 1];
    const doubled = loserCollected === 0;
    const payout = doubled
      ? currentBet * 2
      : (currentBet * gameState.collectedPieces[winner - 1]) /
        Math.max(1, gameState.collectedPieces[loser - 1]);
    setGameState(prev => ({
      ...prev,
      phase: "finished",
      winner: {
        player: winner,
        color: winner === 1 ? "White" : "Black",
        winnerCollected,
        loserCollected,
        doubled,
        payout: payout.toFixed(2)
      }
    }));
    setShowWinModal(true);
  }
}, [gameState.collectedPieces]);


  return (
    <div className="min-h-screen bg-green-800 font-roboto">
      {/* Top Menu */}
      <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <button
            onClick={offerDouble}
            disabled={!gameState.canDouble[gameState.currentPlayer - 1]}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-4 py-2 rounded"
          >
            Double ({gameState.doubleValue})
          </button>
          <div className="text-lg">Bet: {currentBet}</div>
        </div>

        <div className="flex items-center space-x-8">
          <div
            className={`${currentPawnColors.player1.bg} ${currentPawnColors.player1.text} px-4 py-2 rounded font-bold border-2 ${currentPawnColors.player1.border}`}
          >
            Player 1 Pips: {gameState.pipCount[0]}
          </div>
          <div
            className={`${currentPawnColors.player2.bg} ${currentPawnColors.player2.text} px-4 py-2 rounded font-bold border-2 ${currentPawnColors.player2.border}`}
          >
            Player 2 Pips: {gameState.pipCount[1]}
          </div>
        </div>

        <button
          onClick={() => setShowSettingsModal(true)}
          className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded font-bold"
        >
          Settings
        </button>
      </div>

      {/* Player Turn Indicator */}
      <div className="bg-amber-200 text-black p-3 text-center">
        <div className="text-xl font-bold">
          Player {gameState.currentPlayer}'s Turn
          {gameState.capturedPieces[gameState.currentPlayer - 1] > 0 && (
            <span className="text-red-600 ml-2">
              (Must enter{" "}
              {gameState.capturedPieces[gameState.currentPlayer - 1]} captured
              piece
              {gameState.capturedPieces[gameState.currentPlayer - 1] > 1
                ? "s"
                : ""}
              )
            </span>
          )}
        </div>
        {gameState.phase === "move" && (
          <div className="flex justify-center items-center space-x-4 mt-2">
            <div className="text-sm">
              Dice Used: {gameState.diceUsed.filter((used) => used).length} /{" "}
              {gameState.moves.length}
            </div>
            <button
              onClick={endTurn}
              className="bg-orange-600 hover:bg-orange-700 px-4 py-1 rounded text-white font-bold text-sm"
            >
              End Turn
            </button>
          </div>
        )}
      </div>

      {/* Game Board with Side Boxes */}
      <div className="flex justify-center items-center p-8 space-x-8">
        {/* Left Side - Capture Boxes */}
        <div className="flex flex-col space-y-8">
          {renderCaptureBox(1, "left-top")}
          {renderCaptureBox(2, "left-bottom")}
        </div>

        {/* Main Game Board */}
        <div
          className={`${currentTheme.board} border-8 border-black rounded-lg relative`}
          style={{ width: "1400px", height: "800px" }}
        >
          {/* Top half of board */}
          <div className="absolute top-0 left-0 right-0 h-1/2 flex">
            {/* Points 13-18 */}
            <div className="flex flex-1">
              {[12, 13, 14, 15, 16, 17].map((i) => renderPoint(i, true))}
            </div>

            {/* Center vertical bar - reduced width to accommodate larger circle */}
            <div className="w-24 bg-black relative"></div>

            {/* Points 19-24 */}
            <div className="flex flex-1">
              {[18, 19, 20, 21, 22, 23].map((i) => renderPoint(i, true))}
            </div>
          </div>

          {/* Bottom half of board */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 flex">
            {/* Points 12-7 */}
            <div className="flex flex-1">
              {[11, 10, 9, 8, 7, 6].map((i) => renderPoint(i, false))}
            </div>

            {/* Center vertical bar - reduced width */}
            <div className="w-24 bg-black relative"></div>

            {/* Points 6-1 */}
            <div className="flex flex-1">
              {[5, 4, 3, 2, 1, 0].map((i) => renderPoint(i, false))}
            </div>
          </div>

          {/* Expanded Dice circle in the exact center - much larger to extend beyond separator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div
              className={`w-48 h-48 ${currentTheme.center} border-4 rounded-full flex items-center justify-center relative`}
            >
              {gameState.dice[0] > 0 && (
                <div className="flex gap-6 justify-center items-center w-full h-full">
                    {renderDice(dicePhysics.dice1, 0)}
                    {renderDice(dicePhysics.dice2, 1)}
                </div>
              )}
            </div>
          </div>

          {/* Roll Dice Button - positioned under the central circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-32 z-10">
            <button
              onClick={rollDice}
              disabled={gameState.phase !== "roll"}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-6 py-2 rounded font-bold text-white shadow-lg"
            >
              Roll Dice
            </button>
          </div>
        </div>

        {/* Right Side - Collection Boxes */}
        <div className="flex flex-col space-y-8">
          {renderCollectionBox(1, "right-top")}
          {renderCollectionBox(2, "right-bottom")}
        </div>
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Game Settings
            </h3>

            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Theme</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(themes).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setSettings((prev) => ({ ...prev, theme }))}
                    className={`p-3 rounded border-2 capitalize ${
                      settings.theme === theme
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-300"
                    }`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3">Pawn Colors</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(pawnColors).map((colorSet) => (
                  <button
                    key={colorSet}
                    onClick={() =>
                      setSettings((prev) => ({ ...prev, pawnColors: colorSet }))
                    }
                    className={`p-3 rounded border-2 capitalize ${
                      settings.pawnColors === colorSet
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-300"
                    }`}
                  >
                    {colorSet.replace(/([A-Z])/g, " $1").trim()}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No Moves Modal */}
      {showNoMovesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">No Available Moves!</h3>
            <p className="mb-4">
              Player {gameState.currentPlayer} has no available moves and must
              pass the turn.
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleNoMovesOk}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Double Modal */}
      {showBetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Double Offered!</h3>
            <p className="mb-4">
              Player {gameState.currentPlayer} wants to double the bet to{" "}
              {gameState.doubleValue * 2}.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={acceptDouble}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Accept
              </button>
              <button
                onClick={() => setShowBetModal(false)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 0.1s linear infinite;
        }
      `}</style>

      {showWinModal && gameState.winner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md mx-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Game Over</h2>
            <p className="mb-2 text-xl">
              {gameState.winner.color} won!
            </p>
            <p>
              {gameState.winner.color} collected: {gameState.winner.winnerCollected} <br />
              {gameState.winner.player === 1 ? "Black" : "White"} collected: {gameState.winner.loserCollected}
            </p>
            <p className="mt-3">
              {gameState.winner.doubled
                ? "Gammon! Winner gets double the pot."
                : `Payout Ratio: ${(
                    gameState.winner.winnerCollected /
                    Math.max(1, gameState.winner.loserCollected)
                  ).toFixed(2)} : 1`}
            </p>
            <p>
              Winner receives: ${gameState.winner.payout}
            </p>
            <button
              onClick={() => {
                setShowWinModal(false);
                resetGame();  // You need to create this function
              }}
            >
              Close
            </button>

          </div>
        </div>
      )}
      {/* Footer Below the Board */}
      <div className="flex flex-col items-center mt-6 mb-12 space-y-2 text-white text-sm select-none">
        <span>
          Provided to you by <strong>RKW</strong> (my company) and <strong>Perplexity AI</strong>
        </span>
        <img
          src="./images/PAI.png"
          alt="Perplexity AI Logo"
          width={100}
          height={100}
          className="object-contain"
        />
</div>
    </div>
  );
}


export default Backgammon;