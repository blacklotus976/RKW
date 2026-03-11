"use client";

import React, { useState, useRef, useEffect } from "react";

// Heart parametric equation with optional squeeze
function heartEquation(t, size = 1, inverted = false, xSqueeze = 1) {
  let x = 16 * Math.pow(Math.sin(t), 3);
  let y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t);

  x = x * xSqueeze;
  x = x * size * 0.02;
  y = y * size * 0.02;

  if (inverted) y = -y;
  return [x, y];
}

function heartTipOffset(size, inverted = false, xSqueeze = 1) {
  let [, y] = heartEquation(0, size, inverted, xSqueeze);
  return -y;
}

// Generate fractal heart points recursively, returns full shape and tail tip point at index 0
function generateFractalHeart(centerX, centerY, size, depth, inverted, xSqueeze = 1, nestedScale = 0.36) {
  const numPoints = 1000;
  const points = [];

  for (let i = 0; i <= numPoints; i++) {
    const t = (i / numPoints) * 2 * Math.PI;
    const [x, y] = heartEquation(t, size, inverted, xSqueeze);
    points.push([centerX + x, centerY + y]);
  }

  if (depth === 0) return points;

  //   const nestedSize = size * 0.36;
  const nestedSize = size * nestedScale;

  const [tipX, tipY] = heartEquation(0, size, inverted, xSqueeze);
  const [childDipX, childDipY] = heartEquation(Math.PI, nestedSize, !inverted, xSqueeze);
  const childCenterX = centerX + tipX - childDipX;
  const childCenterY = centerY + tipY - childDipY;

  points.push(null);
  points.push(
    ...generateFractalHeart(childCenterX, childCenterY, nestedSize, depth - 1, !inverted, xSqueeze)
  );
  return points;
}

// Shift all points so tail is at y=0 (translates vertically)
function alignTailToZero(points) {
  const validPoints = points.filter((p) => p !== null);
  const minY = Math.min(...validPoints.map((p) => p[1]));
  return points.map((p) => (p === null ? null : [p[0], p[1] - minY]));
}

function rotatePointAroundOrigin(point, originX, originY, angle) {
  if (point === null) return null;
  const [x, y] = point;
  const dx = x - originX, dy = y - originY;
  const cosA = Math.cos(angle), sinA = Math.sin(angle);
  return [dx * cosA - dy * sinA + originX, dx * sinA + dy * cosA + originY];
}



function getTailPoint(points) {
  const valid = points.filter(p => p !== null);
  let tail = valid[0];
  for (const p of valid) {
    if (p[1] < tail[1]) tail = p;
  }
  return tail;
}

function generateFractalFlower(depth, count, xSqueeze = 1, nestedScale = 0.36) {
  const size = 1;
  const tipT = (3 * Math.PI) / 2; // param t value for tail (lowest point)

  // Use t=3pi/2 for correct tip initial and squeezed coordinates
  let initialTip = heartEquation(tipT, size, false, 1);
  let squeezedTip = heartEquation(tipT, size, false, xSqueeze);

  const tipOffset = heartTipOffset(size, false, xSqueeze);
  const uprightCenterY = -tipOffset;

  const allPoints = [];
  const debugInfo = [];

  for (let i = 0; i < count; i++) {
    const points = generateFractalHeart(0, uprightCenterY, size, depth, false, xSqueeze, nestedScale);
    const aligned = alignTailToZero(points);

    let tailAfterAlign = getTailPoint(aligned);

    const angle = (2 * Math.PI * i) / count;
    let rotated = aligned.map(p =>
      p === null ? null : rotatePointAroundOrigin(p, 0, 0, angle)
    );

    let rotatedTip = getTailPoint(rotated);

    allPoints.push(null, ...rotated);

    debugInfo.push({
      i,
      initialTip,
      squeezedTip,
      tailAfterAlign,
      rotatedTip,
      xSqueeze,
      status: xSqueeze === 1 ? "No squeeze applied" : "Squeeze is " + xSqueeze.toFixed(3),
    });
  }

  return { points: allPoints, debugInfo };
}



function fractalHeart(depth, count, xSqueeze, nestedScale = 0.36) {
  const res = generateFractalFlower(depth, count, xSqueeze, nestedScale);
  return res;
}

function FractalCanvas({ depth, count, xSqueeze, offset, zoom, setDebug, nestedScale=0.36, colorize=false, colors }) {
  const canvasRef = useRef(null);
//   const colors = [
//     "#e91e63", "#2196f3", "#4caf50", "#ff9800", "#9c27b0",
//     "#00bcd4", "#ffc107", "#8bc34a", "#ff5722", "#673ab7"
//   ];

  useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  // Background fill
  ctx.fillStyle = "#f5f5f5";
  ctx.fillRect(0, 0, width, height);

  const { points: rawPoints, debugInfo } = fractalHeart(depth, count, xSqueeze, nestedScale);
  setDebug(debugInfo);

  

  const centerX = width / 2;
  const centerY = height / 2;

  // Draw axes
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(width, centerY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, height);
  ctx.stroke();

  ctx.lineWidth = 2;

  let drawing = false;
  let shapeIndex = 0;

  for (const point of rawPoints) {
    if (point === null) {
      if (drawing) {
        ctx.closePath();
        if(colorize){
          ctx.fillStyle = colors[shapeIndex % colors.length];
          ctx.fill();
        }
        ctx.stroke();
      }
      drawing = false;
      shapeIndex++;
      continue;
    }
    const x = centerX + (point[0] * zoom - offset[0] * zoom) * 150;
    const y = centerY - (point[1] * zoom - offset[1] * zoom) * 150;
    if (!drawing) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      drawing = true;
    } else {
      ctx.lineTo(x, y);
    }
  }
  if (drawing) {
    ctx.closePath();
    if(colorize){
      ctx.fillStyle = colors[shapeIndex % colors.length];
      ctx.fill();
    }
    ctx.stroke();
  }
}, [depth, count, xSqueeze, offset, zoom, setDebug, nestedScale, colorize]);


  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight - 120}
      style={{ display: "block", cursor: "grab" }}
    />
  );
}


export default function FractalHeartFlowerViewer() {
  const [depth, setDepth] = useState(2);
  const [count, setCount] = useState(3);
  const [offset, setOffset] = useState([0, 0]);
  const [zoom, setZoom] = useState(1);
  const [xSqueeze, setXSqueeze] = useState(1);
  const [nestedScale, setNestedScale] = useState(0.36);

  const defaultColors = [
    "#e91e63", "#2196f3", "#4caf50", "#ff9800", "#9c27b0",
    "#00bcd4", "#ffc107", "#8bc34a", "#ff5722", "#673ab7"
  ];

  // Color arrays for active colors and editing colors in sidebar
  const [colors, setColors] = useState(defaultColors.slice(0, count));
  const [editColors, setEditColors] = useState(defaultColors.slice(0, count));

  const [colorize, setColorize] = useState(false);
  const [showColorSidebar, setShowColorSidebar] = useState(false);

  const [debug, setDebug] = useState([]);

  // Synchronize colors when count changes: add or remove colors
  useEffect(() => {
    if (count > editColors.length) {
      const additional = defaultColors.slice(editColors.length, count);
      setEditColors([...editColors, ...additional]);
      setColors([...colors, ...additional]);
    } else if (count < editColors.length) {
      setEditColors(editColors.slice(0, count));
      setColors(colors.slice(0, count));
    }
  }, [count]);

  function getOptimalSqueeze(n) {
    if (n <= 2) return 1;
    return Math.sin(Math.PI / n);
  }

  // Recalculate xSqueeze whenever count or depth changes
  useEffect(() => {
    const size = 1;
    const tipOffsetBase = heartTipOffset(size, false);
    const uprightCenterYBase = -tipOffsetBase;
    const baseHeart = generateFractalHeart(0, uprightCenterYBase, size, depth, false);
    const alignedBase = alignTailToZero(baseHeart);
    const maxXOriginal = Math.max(...alignedBase.filter(p => p !== null).map(p => Math.abs(p[0])));

    const optimalSqueeze = getOptimalSqueeze(count);
    setXSqueeze(optimalSqueeze);
  }, [count, depth]);

  // Toggle colors and show/hide sidebar
  function toggleColorSidebar() {
    setColorize(c => !c);
    setShowColorSidebar(s => !s);
    setEditColors(colors.slice());
  }

  // Wheel zoom handler remains unchanged
  const handleWheel = (e) => {
    if (e.target.tagName !== "CANVAS") return;
    e.preventDefault();
    const factor = e.deltaY > 0 ? 1.2 : 1 / 1.2;
    setZoom(z => Math.max(z * factor, 0.0001));
  };

  // Mouse drag handlers remain unchanged
  const handleMouseDown = (e) => {
    if (e.target.tagName !== "CANVAS" || e.button !== 0) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const startOffset = [...offset];

    const handleMouseMove = (moveE) => {
      const dx = (moveE.clientX - startX) / (zoom * 100);
      const dy = (moveE.clientY - startY) / (zoom * 100);
      setOffset([startOffset[0] - dx, startOffset[1] + dy]);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f5f5f5",
      }}
    >
      <div style={{ padding: "8px", textAlign: "center" }}>
        <label>
          Number of Hearts:{" "}
          <input
            type="number"
            min={1}
            max={200}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(200, +e.target.value)))}
            style={{ width: "50px", fontSize: "16px" }}
          />
        </label>
        <label style={{ marginLeft: "20px" }}>
          X Squeeze:{" "}
          <input
            type="number"
            min={0.1}
            max={1}
            step={0.01}
            value={xSqueeze}
            onChange={e => setXSqueeze(Number(e.target.value))}
            style={{ width: "50px", fontSize: "16px" }}
          />
          {xSqueeze === 1 ? " (no squeeze)" : ""}
        </label>
        <button
          onClick={() => {
            setColorize(c => !c);
            setShowColorSidebar(s => !s);
            setEditColors(colors.slice());
        }}
          style={{
            padding: "8px 12px",
            cursor: "pointer",
            border: "1px solid #2563eb",
            borderRadius: "4px",
            background: colorize ? "#2563eb" : "white",
            color: colorize ? "white" : "#2563eb",
            fontSize: "14px",
            fontWeight: "bold",
            marginLeft: "20px",
          }}
        >
          {colorize ? "Disable Colors" : "Enable Colors"}
        </button>
      </div>
      <div style={{ flex: 1 }}>
        <FractalCanvas
          depth={depth}
          count={count}
          xSqueeze={xSqueeze}
          offset={offset}
          zoom={zoom}
          setDebug={setDebug}
          nestedScale={nestedScale}
          colorize={colorize}
          colors={colors}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          padding: "16px",
          background: "white",
          borderTop: "1px solid #ddd",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button onClick={() => setZoom(z => Math.min(z * 1.3, 100))} style={{ padding: "8px 12px", cursor: "pointer", border: "1px solid #ddd", borderRadius: "4px", background: "white", fontSize: "14px" }}>
          🔍 Zoom In
        </button>
        <button onClick={() => setZoom(z => Math.max(z / 1.3, 0.01))} style={{ padding: "8px 12px", cursor: "pointer", border: "1px solid #ddd", borderRadius: "4px", background: "white", fontSize: "14px" }}>
          🔍 Zoom Out
        </button>
        <div style={{ width: "100%", height: "1px", background: "#ddd" }} />
        <button onClick={() => setOffset(([x, y]) => [x + 0.2 / zoom, y])} style={{ padding: "8px 12px", cursor: "pointer", border: "1px solid #ddd", borderRadius: "4px", background: "white", fontSize: "14px" }}>
          ← Left
        </button>
        <button onClick={() => setOffset(([x, y]) => [x - 0.2 / zoom, y])} style={{ padding: "8px 12px", cursor: "pointer", border: "1px solid #ddd", borderRadius: "4px", background: "white", fontSize: "14px" }}>
          Right →
        </button>
        <button onClick={() => setOffset(([x, y]) => [x, y - 0.2 / zoom])} style={{ padding: "8px 12px", cursor: "pointer", border: "1px solid #ddd", borderRadius: "4px", background: "white", fontSize: "14px" }}>
          ↑ Up
        </button>
        <button onClick={() => setOffset(([x, y]) => [x, y + 0.2 / zoom])} style={{ padding: "8px 12px", cursor: "pointer", border: "1px solid #ddd", borderRadius: "4px", background: "white", fontSize: "14px" }}>
          Down ↓
        </button>
        <div style={{ width: "100%", height: "1px", background: "#ddd" }} />
        <button onClick={() => setDepth(d => Math.min(d + 1, 200))} style={{ padding: "8px 12px", cursor: "pointer", border: "1px solid #2563eb", borderRadius: "4px", background: "#2563eb", color: "white", fontSize: "14px", fontWeight: "bold" }}>
          + Depth ({depth})
        </button>
        <button onClick={() => setDepth(d => Math.max(d - 1, 1))} style={{ padding: "8px 12px", cursor: "pointer", border: "1px solid #2563eb", borderRadius: "4px", background: "#2563eb", color: "white", fontSize: "14px", fontWeight: "bold" }}>
          - Depth
        </button>
        <label style={{ marginLeft: "20px" }}>
          Nested Scale:{" "}
          <input
            type="range"
            min="0.1"
            max="0.9"
            step="0.01"
            value={nestedScale}
            onChange={(e) => setNestedScale(parseFloat(e.target.value))}
          />
          {nestedScale.toFixed(2)}
        </label>

      </div>
      {/* Color picker sidebar */}
      {showColorSidebar && (
        <div style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "220px",
          background: "#fff",
          borderLeft: "1px solid #ddd",
          padding: "10px",
          overflowY: "auto",
          zIndex: 100,
        }}>
          <h3> Select Colors (at least {count}): </h3>
          {editColors.map((c, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <input
                type="color"
                value={c}
                onChange={(e) => {
                  const newColors = [...editColors];
                  newColors[i] = e.target.value;
                  setEditColors(newColors);
                }}
                style={{ width: "100%" }}
              />
            </div>
          ))}
          <div>
            <strong>Selected Colors Preview:</strong>
            <div style={{
              display: "flex",
              gap: "5px",
              marginTop: "5px",
              flexWrap: "wrap"
            }}>
              {editColors.map((c, i) => (
                <div key={i} style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: c,
                  border: "1px solid #000"
                }} />
              ))}
            </div>
          </div>
          <button
            onClick={() => {
                setColors(editColors.slice(0, count));
                // Do NOT close sidebar here to keep it open:
                // setShowColorSidebar(false);
            }}
            style={{ marginTop: "10px", width: "100%", padding: "8px", cursor: "pointer" }}
            >
            Apply Colors |Applicable after irgendeine Move
        </button>

        </div>
      )}
    </div>
  );
}
