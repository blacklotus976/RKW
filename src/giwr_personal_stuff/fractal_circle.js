import React, { useState, useMemo, useRef, useEffect } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { OrbitControls as OrbitControlsImpl } from "three/examples/jsm/controls/OrbitControls.js";

extend({ Line2, LineGeometry, LineMaterial, OrbitControlsImpl });

function OrbitControls() {
  const { camera, gl, invalidate } = useThree();
  const ref = useRef();

  useEffect(() => {
    const control = ref.current;
    if (!control) return;
    control.addEventListener("change", invalidate);
    return () => control.removeEventListener("change", invalidate);
  }, [invalidate]);

  return <orbitControlsImpl ref={ref} args={[camera, gl.domElement]} enableRotate={false} />;
}

function smoothCircularPoints(p1, p2, depth, direction = 1, progressCallback, total, count) {
  count.count++;
  if (progressCallback && total) progressCallback(Math.min((count.count / total) * 100, 100));

  if (depth === 0) return [p1, p2];

  const v = [p2[0] - p1[0], p2[1] - p1[1]];
  const norm = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
  if (norm === 0) return [p1];

  const v_unit = [v[0] / norm, v[1] / norm];
  const n = [-v_unit[1], v_unit[0]];

  const pA = [p1[0] + v[0] / 3, p1[1] + v[1] / 3];
  const pB = [p1[0] + (2 * v[0]) / 3, p1[1] + (2 * v[1]) / 3];

  const circlePoints = [];
  const numCirclePoints = 30;

  const m = [(pA[0] + pB[0]) / 2, (pA[1] + pB[1]) / 2];
  const radius = norm * 0.15;
  const offsetDist = norm * 0.15 * direction;

  const center = [m[0] + offsetDist * n[0], m[1] + offsetDist * n[1]];

  const circleBase = [];
  for (let i = 0; i < numCirclePoints; i++) {
    const theta = (i / numCirclePoints) * 2 * Math.PI;
    const x = center[0] + radius * Math.cos(theta);
    const y = center[1] + radius * Math.sin(theta);
    circleBase.push([x, y]);
  }

  let fractalCirclePoints = [];
  if (depth > 1) {
    for (let i = 0; i < circleBase.length; i++) {
      const p1_circle = circleBase[i];
      const p2_circle = circleBase[(i + 1) % circleBase.length];
      const segPoints = smoothCircularPoints(p1_circle, p2_circle, depth - 1, direction, progressCallback, total, count);
      if (i > 0) segPoints.shift();
      fractalCirclePoints = fractalCirclePoints.concat(segPoints);
    }
  } else {
    fractalCirclePoints = circleBase;
  }

  const seg1 = smoothCircularPoints(p1, pA, depth - 1, direction, progressCallback, total, count).slice(0, -1);
  const seg2 = smoothCircularPoints(pB, p2, depth - 1, direction, progressCallback, total, count);

  return [...seg1, ...fractalCirclePoints.slice(1, -1), ...seg2];
}

function fractalCircle(depth, resolution = 360, direction = 1, progressCallback) {
  const t = [];
  for (let i = 0; i <= resolution; i++) t.push((i / resolution) * 2 * Math.PI);
  const basePoints = t.map((theta) => [Math.cos(theta), Math.sin(theta)]);
  let points = [];

  // Count total calls for progress estimation
  const totalCalls = Math.pow(7, depth) * resolution;

  const count = { count: 0 };

  for (let i = 0; i < basePoints.length - 1; i++) {
    const segmentPoints = smoothCircularPoints(basePoints[i], basePoints[i + 1], depth, direction, progressCallback, totalCalls, count);
    if (i > 0) segmentPoints.shift();
    points = points.concat(segmentPoints);
  }

  return points.map((p) => [p[0], p[1], 0]);
}

function SmoothLine({ points, color = "black", lineWidth = 2 }) {
  const refLine = useRef();
  const refMaterial = useRef();
  const { size } = useThree();

  const lineGeometry = useMemo(() => {
    const geom = new LineGeometry();
    const positions = new Float32Array(points.flat());
    geom.setPositions(positions);
    return geom;
  }, [points]);

  useEffect(() => {
    if (refMaterial.current) {
      refMaterial.current.resolution.set(size.width, size.height);
    }
  }, [size]);

  useFrame(() => {
    if (refMaterial.current) {
      refMaterial.current.linewidth = lineWidth;
    }
  });

  return (
    <>
      <lineMaterial ref={refMaterial} color={color} linewidth={lineWidth} />
      <line2 ref={refLine} geometry={lineGeometry} material={refMaterial.current} />
    </>
  );
}

export default function FractalViewer() {
  const [depth, setDepth] = useState(2);
  const [offset, setOffset] = useState([0, 0]);
  const [zoom, setZoom] = useState(1);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);

  // Generate fractal points with progress updates
  const points = useMemo(() => {
    setProgress(0);
    return fractalCircle(depth, 360, direction, setProgress).map((p) => [
      p[0] * zoom + offset[0],
      p[1] * zoom + offset[1],
      0,
    ]);
  }, [depth, offset, zoom, direction]);

  return (
    <>
      <Canvas
        frameloop="demand"
        orthographic
        camera={{ zoom: zoom * 100, position: [0, 0, 10] }}
        style={{ width: "100vw", height: "90vh", background: "#eee" }}
      >
        <ambientLight />
        <SmoothLine points={points} color={"black"} lineWidth={1} />
        <OrbitControls />
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: 15,
          right: 15,
          width: 200,
          height: 20,
          backgroundColor: "#ddd",
          borderRadius: 10,
          overflow: "hidden",
          padding: "2px",
          boxSizing: "border-box",
          fontSize: 14,
          color: "#2563eb",
          fontWeight: "bold",
          textAlign: "center",
          userSelect: "none",
          pointerEvents: "none",
          fontFamily: "monospace",
        }}
      >
        Depth: {depth} | Zoom: {zoom.toFixed(2)} | Direction: {direction === 1 ? "Inwards" : "Outwards"} | Resolution: 360
      </div>

      <div
        style={{
          position: "absolute",
          top: 50,
          right: 15,
          width: 200,
          height: 20,
          backgroundColor: "#ddd",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#2563eb",
            borderRadius: 10,
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 10,
          flexWrap: "wrap", 
          maxWidth: 700,
          justifyContent: "center",
        }}
      >
        <button onClick={() => setZoom((z) => Math.min(z * 1.3, 100))}>Zoom In</button>
        <button onClick={() => setZoom((z) => Math.max(z / 1.3, 0.01))}>Zoom Out</button>
        <button onClick={() => setOffset(([x, y]) => [x + 0.2 / zoom, y])}>Left</button>
        <button onClick={() => setOffset(([x, y]) => [x - 0.2 / zoom, y])}>Right</button>
        <button onClick={() => setOffset(([x, y]) => [x, y - 0.2 / zoom])}>Up</button>
        <button onClick={() => setOffset(([x, y]) => [x, y + 0.2 / zoom])}>Down</button>
        <button onClick={() => setDepth((d) => Math.min(d + 1, 7))}>Increase Depth</button>
        <button onClick={() => setDepth((d) => Math.max(d - 1, 1))}>Decrease Depth</button>
        <button onClick={() => setDirection((d) => d * -1)}>
          {direction === 1 ? "⬆ Inwards" : "⬇ Outwards"}
        </button>
      </div>
    </>
  );
}
