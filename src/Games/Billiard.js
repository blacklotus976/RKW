"use client";
import React from "react";
function Billiard() {
  const tableWidth = 10;
  const tableHeight = 5;
  const ballRadius = 0.08;
  const friction = 0.988;
  const wallBounce = 0.8;
  const pocketRadius = 0.3; // Radius for pocket detection

  const ballColors = {
    1: "#FFD700",
    2: "#0000FF",
    3: "#FF0000",
    4: "#800080",
    5: "#FFA500",
    6: "#008000",
    7: "#8B0000",
    8: "#000000",
    9: "#FFD700",
    10: "#0000FF",
    11: "#FF0000",
    12: "#800080",
    13: "#FFA500",
    14: "#008000",
    15: "#8B0000",
  };

  const [gameState, setGameState] = React.useState("aiming");
  const [currentPlayer, setCurrentPlayer] = React.useState(1);
  const [scores, setScores] = React.useState({ player1: 0, player2: 0 });
  const [power, setPower] = React.useState(0);
  const [aimDirection, setAimDirection] = React.useState({ x: 0, z: 1 });
  const [showAimLine, setShowAimLine] = React.useState(false);
  const [isDraggingStick, setIsDraggingStick] = React.useState(false);
  const [animating, setAnimating] = React.useState(false);

  const ballsRef = React.useRef([]);
  const cueBallRef = React.useRef({
    position: [-2, ballRadius, 0],
    velocity: [0, 0, 0],
  });
  const cueStickRef = React.useRef({
    position: [-2, ballRadius, 0.5],
    rotation: [0, 0, 0],
  });

  const [balls, setBalls] = React.useState([]);
  const [cueBall, setCueBall] = React.useState(cueBallRef.current);
  const [cueStick, setCueStick] = React.useState(cueStickRef.current);

  React.useEffect(() => {
    const initialBalls = [];
    const startX = 2;
    const startZ = 0;
    const ballSpacing = ballRadius * 2.1;
    const triangleOrder = [1, 9, 2, 10, 8, 3, 11, 4, 12, 5, 13, 6, 14, 7, 15];
    let ballIndex = 0;

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col <= row; col++) {
        const x = startX + row * ballSpacing * 0.866;
        const z = startZ + (col - row / 2) * ballSpacing;
        const ballNumber = triangleOrder[ballIndex];

        initialBalls.push({
          id: ballNumber,
          position: [x, ballRadius, z],
          velocity: [0, 0, 0],
          color: ballColors[ballNumber] || "#FFFFFF",
          inPocket: false,
          isStripe: ballNumber > 8 && ballNumber !== 8,
        });
        ballIndex++;
      }
    }
    ballsRef.current = initialBalls;
    setBalls(initialBalls);
    cueBallRef.current = {
      position: [-2, ballRadius, 0],
      velocity: [0, 0, 0],
    };
    setCueBall(cueBallRef.current);
  }, []);

  React.useEffect(() => {
    if (gameState !== "aiming") return;
    if (!power && !isDraggingStick) return;

    const stickDistance = 0.8 + power * 0.3;
    const pos = [
      cueBallRef.current.position[0] - aimDirection.x * stickDistance,
      cueBallRef.current.position[1],
      cueBallRef.current.position[2] - aimDirection.z * stickDistance,
    ];
    const rotY = Math.atan2(aimDirection.x, aimDirection.z);
    cueStickRef.current = {
      position: pos,
      rotation: [0, rotY, 0],
    };
    setCueStick(cueStickRef.current);
  }, [aimDirection, power, gameState, isDraggingStick]);

  React.useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();

    function updatePhysics(deltaTime) {
      let allBallsStopped = true;

      function updateBall(ball) {
        if (ball.inPocket) return ball;
        const newVel = [
          ball.velocity[0] * friction,
          0,
          ball.velocity[2] * friction,
        ];

        const speed = Math.hypot(newVel[0], newVel[2]);
        if (speed > 0.001) allBallsStopped = false;

        let newPos = [
          ball.position[0] + newVel[0] * deltaTime * 60,
          ball.position[1],
          ball.position[2] + newVel[2] * deltaTime * 60,
        ];

        // Keep balls within the inner white lines (table boundaries minus cushion)
        const innerBoundary = 0.3; // Distance from edge to inner white line
        if (
          newPos[0] <= -tableWidth / 2 + ballRadius + innerBoundary ||
          newPos[0] >= tableWidth / 2 - ballRadius - innerBoundary
        ) {
          newVel[0] *= -wallBounce;
          newPos[0] = Math.max(
            -tableWidth / 2 + ballRadius + innerBoundary,
            Math.min(tableWidth / 2 - ballRadius - innerBoundary, newPos[0]),
          );
        }
        if (
          newPos[2] <= -tableHeight / 2 + ballRadius + innerBoundary ||
          newPos[2] >= tableHeight / 2 - ballRadius - innerBoundary
        ) {
          newVel[2] *= -wallBounce;
          newPos[2] = Math.max(
            -tableHeight / 2 + ballRadius + innerBoundary,
            Math.min(tableHeight / 2 - ballRadius - innerBoundary, newPos[2]),
          );
        }

        // Check if ball is in a pocket
        const pockets = [
          [-tableWidth / 2, -tableHeight / 2], // top-left
          [tableWidth / 2, -tableHeight / 2], // top-right
          [-tableWidth / 2, tableHeight / 2], // bottom-left
          [tableWidth / 2, tableHeight / 2], // bottom-right
          [0, -tableHeight / 2], // top-middle
          [0, tableHeight / 2], // bottom-middle
        ];

        for (const [pocketX, pocketZ] of pockets) {
          const distToPocket = Math.sqrt(
            (newPos[0] - pocketX) ** 2 + (newPos[2] - pocketZ) ** 2,
          );
          if (distToPocket <= pocketRadius) {
            return { ...ball, inPocket: true, velocity: [0, 0, 0] };
          }
        }

        return { ...ball, position: newPos, velocity: newVel };
      }

      // Check cue ball for pockets too
      const cueBallResult = updateBall(cueBallRef.current);
      if (cueBallResult.inPocket) {
        // Reset cue ball position if it goes in a pocket
        cueBallRef.current = {
          position: [-2, ballRadius, 0],
          velocity: [0, 0, 0],
        };
      } else {
        cueBallRef.current = cueBallResult;
      }

      ballsRef.current = ballsRef.current.map(updateBall);

      function handleCollision(b1, b2) {
        if (b1.inPocket || b2.inPocket) return;

        const dx = b1.position[0] - b2.position[0];
        const dz = b1.position[2] - b2.position[2];
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist >= ballRadius * 2 || dist === 0) return;

        const angle = Math.atan2(dz, dx);
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);

        let vx1 = b1.velocity[0] * cos + b1.velocity[2] * sin;
        let vy1 = b1.velocity[2] * cos - b1.velocity[0] * sin;
        let vx2 = b2.velocity[0] * cos + b2.velocity[2] * sin;
        let vy2 = b2.velocity[2] * cos - b2.velocity[0] * sin;

        const finalVx1 = vx2 * 0.9;
        const finalVx2 = vx1 * 0.9;

        vx1 = finalVx1;
        vx2 = finalVx2;

        b1.velocity[0] = vx1 * cos - vy1 * sin;
        b1.velocity[2] = vy1 * cos + vx1 * sin;
        b2.velocity[0] = vx2 * cos - vy2 * sin;
        b2.velocity[2] = vy2 * cos + vx2 * sin;

        const overlap = ballRadius * 2 - dist;
        const separationX = (overlap / 2) * cos;
        const separationZ = (overlap / 2) * sin;

        b1.position[0] += separationX;
        b1.position[2] += separationZ;
        b2.position[0] -= separationX;
        b2.position[2] -= separationZ;
      }

      ballsRef.current.forEach((ball) => {
        handleCollision(cueBallRef.current, ball);
      });

      for (let i = 0; i < ballsRef.current.length; i++) {
        for (let j = i + 1; j < ballsRef.current.length; j++) {
          handleCollision(ballsRef.current[i], ballsRef.current[j]);
        }
      }

      if (allBallsStopped) {
        setAnimating(false);
        setGameState("aiming");
        setCurrentPlayer((cur) => (cur === 1 ? 2 : 1));
      }

      return allBallsStopped;
    }

    function animate(time) {
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      if (!animating) {
        setCueBall({ ...cueBallRef.current });
        setBalls(ballsRef.current.map((b) => ({ ...b })));
        return;
      }

      updatePhysics(deltaTime);

      if (time % 33 < 16) {
        setCueBall({ ...cueBallRef.current });
        setBalls(ballsRef.current.map((b) => ({ ...b })));
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    if (gameState === "shooting" && animating) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [animating, gameState]);

  const handleMouseMove = (e) => {
    if (!isDraggingStick || animating) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const tableMouseX = mouseX * (tableWidth / 2);
    const tableMouseZ = mouseY * (tableHeight / 2);

    const dx = tableMouseX - cueBallRef.current.position[0];
    const dz = tableMouseZ - cueBallRef.current.position[2];
    const length = Math.sqrt(dx * dx + dz * dz);
    if (length > 0) {
      setAimDirection({ x: dx / length, z: dz / length });
      setShowAimLine(true);
    }
  };

  const handleMouseDown = (e) => {
    if (gameState !== "aiming" || animating) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const tableMouseX = mouseX * (tableWidth / 2);
    const tableMouseZ = mouseY * (tableHeight / 2);

    const stickX = cueStickRef.current.position[0];
    const stickZ = cueStickRef.current.position[2];
    const distToStick = Math.sqrt(
      (tableMouseX - stickX) ** 2 + (tableMouseZ - stickZ) ** 2,
    );

    const distToCue = Math.sqrt(
      (tableMouseX - cueBallRef.current.position[0]) ** 2 +
        (tableMouseZ - cueBallRef.current.position[2]) ** 2,
    );

    if (distToStick < 1.5 || distToCue < 1) {
      setIsDraggingStick(true);
      setShowAimLine(true);
    }
  };

  const handleMouseUp = () => {
    if (isDraggingStick) {
      setIsDraggingStick(false);
      setShowAimLine(false);
    }
  };

  const handlePowerClick = (event) => {
    if (gameState !== "aiming" || animating) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const clickY = event.clientY - rect.top;
    const height = rect.height;

    const newPower = 1 - clickY / height;
    setPower(Math.max(0, Math.min(1, newPower)));
  };

  const shootCueBall = () => {
    if (gameState !== "aiming" || animating || power === 0) return;

    setAnimating(true);
    setGameState("shooting");

    const force = power * 0.4; // Increased from 0.15 to 0.4 for more power
    cueBallRef.current.velocity = [
      aimDirection.x * force,
      0,
      aimDirection.z * force,
    ];
    setPower(0);
    setShowAimLine(false);
    setIsDraggingStick(false);
  };

  const resetGame = () => {
    setGameState("aiming");
    setCurrentPlayer(1);
    setScores({ player1: 0, player2: 0 });
    setPower(0);
    setAnimating(false);
    setIsDraggingStick(false);
    setShowAimLine(false);
    setAimDirection({ x: 0, z: 1 });

    const initialBalls = [];
    const startX = 2;
    const startZ = 0;
    const ballSpacing = ballRadius * 2.1;
    const triangleOrder = [1, 9, 2, 10, 8, 3, 11, 4, 12, 5, 13, 6, 14, 7, 15];
    let ballIndex = 0;

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col <= row; col++) {
        const x = startX + row * ballSpacing * 0.866;
        const z = startZ + (col - row / 2) * ballSpacing;
        const ballNumber = triangleOrder[ballIndex];

        initialBalls.push({
          id: ballNumber,
          position: [x, ballRadius, z],
          velocity: [0, 0, 0],
          color: ballColors[ballNumber] || "#FFFFFF",
          inPocket: false,
          isStripe: ballNumber > 8 && ballNumber !== 8,
        });
        ballIndex++;
      }
    }
    ballsRef.current = initialBalls;
    cueBallRef.current = { position: [-2, ballRadius, 0], velocity: [0, 0, 0] };
    cueStickRef.current = {
      position: [-2, ballRadius, 0.5],
      rotation: [0, 0, 0],
    };
    setBalls(initialBalls);
    setCueBall(cueBallRef.current);
    setCueStick(cueStickRef.current);
  };

  return (
    <div
      className="w-full h-screen bg-[#1a1a1a] flex flex-col font-roboto"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="h-[6.67%] bg-[#2d2d2d] flex items-center justify-between px-6 text-white border-b border-gray-600">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold">3D Billiards</h1>
          <button
            onClick={resetGame}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
          >
            Reset Game
          </button>
          <button
            onClick={shootCueBall}
            disabled={gameState !== "aiming" || animating || power === 0}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-2 rounded transition-colors font-bold"
          >
            SHOOT
          </button>
        </div>

        <div className="flex items-center space-x-8">
          <div className="text-center">
            <div className="text-sm text-gray-300">Player 1</div>
            <div
              className={`text-lg font-bold ${
                currentPlayer === 1 ? "text-yellow-400" : "text-white"
              }`}
            >
              {scores.player1}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-300">Player 2</div>
            <div
              className={`text-lg font-bold ${
                currentPlayer === 2 ? "text-yellow-400" : "text-white"
              }`}
            >
              {scores.player2}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm">Current: Player {currentPlayer}</div>
          <div className="text-sm">State: {gameState}</div>
          <div className="text-sm">
            Dragging: {isDraggingStick ? "Yes" : "No"}
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 relative cursor-crosshair">
          <div className="w-full h-full">
            <div className="w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[1000px] h-[500px] bg-[#0F5132] border-8 border-[#8B4513] relative shadow-2xl">
                  <div className="absolute inset-4 border-2 border-white opacity-20"></div>

                  <div className="absolute top-2 left-2 w-8 h-8 rounded-full border-4 border-black bg-[#0F5132]"></div>
                  <div className="absolute top-2 right-2 w-8 h-8 rounded-full border-4 border-black bg-[#0F5132]"></div>
                  <div className="absolute bottom-2 left-2 w-8 h-8 rounded-full border-4 border-black bg-[#0F5132]"></div>
                  <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full border-4 border-black bg-[#0F5132]"></div>
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-black bg-[#0F5132]"></div>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-4 border-black bg-[#0F5132]"></div>

                  <div
                    className="absolute w-6 h-6 bg-white rounded-full shadow-lg border-2 border-gray-300 transition-all duration-75"
                    style={{
                      left: `${
                        ((cueBall.position[0] + tableWidth / 2) / tableWidth) *
                        100
                      }%`,
                      top: `${
                        ((cueBall.position[2] + tableHeight / 2) /
                          tableHeight) *
                        100
                      }%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  ></div>

                  {balls
                    .filter((ball) => !ball.inPocket)
                    .map((ball) => (
                      <div
                        key={ball.id}
                        className="absolute w-6 h-6 rounded-full shadow-md flex items-center justify-center text-xs font-bold border-2 border-gray-400 transition-all duration-75"
                        style={{
                          backgroundColor: ball.color,
                          left: `${
                            ((ball.position[0] + tableWidth / 2) / tableWidth) *
                            100
                          }%`,
                          top: `${
                            ((ball.position[2] + tableHeight / 2) /
                              tableHeight) *
                            100
                          }%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        {ball.isStripe ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                              <span className="text-black text-[10px] font-bold">
                                {ball.id}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span
                            className="text-white text-[10px] font-bold drop-shadow-sm"
                            style={{
                              color:
                                ball.id === 1 || ball.id === 5
                                  ? "#000"
                                  : "#FFF",
                            }}
                          >
                            {ball.id}
                          </span>
                        )}
                      </div>
                    ))}

                  {showAimLine && isDraggingStick && (
                    <div
                      className="absolute"
                      style={{
                        left: `${
                          ((cueBall.position[0] + tableWidth / 2) /
                            tableWidth) *
                          100
                        }%`,
                        top: `${
                          ((cueBall.position[2] + tableHeight / 2) /
                            tableHeight) *
                          100
                        }%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div
                        className="absolute w-1 h-32 bg-red-500 opacity-70 origin-bottom"
                        style={{
                          transform: `rotate(${
                            (Math.atan2(aimDirection.x, -aimDirection.z) *
                              180) /
                            Math.PI
                          }deg)`,
                        }}
                      >
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-red-500"></div>
                      </div>
                    </div>
                  )}

                  {showAimLine && isDraggingStick && power > 0 && (
                    <div
                      className="absolute"
                      style={{
                        left: `${
                          ((cueBall.position[0] + tableWidth / 2) /
                            tableWidth) *
                          100
                        }%`,
                        top: `${
                          ((cueBall.position[2] + tableHeight / 2) /
                            tableHeight) *
                          100
                        }%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div
                        className="absolute w-1 bg-yellow-400 opacity-60 origin-bottom"
                        style={{
                          height: `${power * 100}px`,
                          transform: `rotate(${
                            (Math.atan2(aimDirection.x, -aimDirection.z) *
                              180) /
                            Math.PI
                          }deg)`,
                        }}
                      ></div>
                    </div>
                  )}

                  {gameState === "aiming" && !animating && (
                    <div
                      className="absolute"
                      style={{
                        left: `${
                          ((cueStick.position[0] + tableWidth / 2) /
                            tableWidth) *
                          100
                        }%`,
                        top: `${
                          ((cueStick.position[2] + tableHeight / 2) /
                            tableHeight) *
                          100
                        }%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div
                        className={`absolute w-2 h-32 bg-[#8B4513] origin-top rounded-sm transition-all duration-150 ${
                          isDraggingStick
                            ? "shadow-lg scale-105"
                            : "hover:shadow-md cursor-pointer"
                        }`}
                        style={{
                          transform: `rotate(${
                            (Math.atan2(aimDirection.x, -aimDirection.z) *
                              180) /
                            Math.PI
                          }deg)`,
                        }}
                      >
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-black rounded-sm"></div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-[#654321] rounded-sm"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-20 bg-[#2d2d2d] border-l border-gray-600 flex flex-col items-center py-4"
          onClick={handlePowerClick}
        >
          <div className="text-white text-sm mb-2 transform -rotate-90 whitespace-nowrap">
            Power
          </div>
          <div className="flex-1 w-8 bg-gray-700 rounded-full relative mx-auto cursor-pointer">
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-500 via-yellow-500 to-red-500 rounded-full transition-all duration-200"
              style={{ height: `${power * 100}%` }}
            ></div>
          </div>
          <div className="text-white text-xs mt-2">
            {Math.round(power * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billiard;


