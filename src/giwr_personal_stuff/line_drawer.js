import React, { useRef, useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function StringArtArtist({ width = 600, height = 600 }) {
    const [img, setImg] = useState(null);
    const navigate = useNavigate();
    const [dotCount, setDotCount] = useState(100); // Lowered for your test
    const [radiusFactor, setRadiusFactor] = useState(0.44); // New Radius State
    const [stepGranularity, setStepGranularity] = useState(2.0);
    const [imgZoom, setImgZoom] = useState(1.0);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [contrast, setContrast] = useState(100);
    const [isRendering, setIsRendering] = useState(false);
    const [hasRendered, setHasRendered] = useState(false);
    
    const [useCustomPalette, setUseCustomPalette] = useState(false);
    const [palette, setPalette] = useState(["#000000"]); // Start with one default

    const [progress, setProgress] = useState(0);
    const [detailedLogs, setDetailedLogs] = useState([]);
    const [allLines, setAllLines] = useState([]);

    const [isSelecting, setIsSelecting] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const currentPath = useRef([]);

    const sourceCanvasRef = useRef(null);
    const displayCanvasRef = useRef(null);
    const selectionCanvasRef = useRef(null);

    const addColor = (color) => {
      if (!palette.includes(color)) {
          setPalette([...palette, color]);
          setDetailedLogs(prev => [`[PALETTE] Added color ${color}`, ...prev]);
      }
    };
    const removeColor = (index) => {
        if (palette.length > 1) { // Keep at least one color
            const removed = palette[index];
            setPalette(palette.filter((_, i) => i !== index));
            setDetailedLogs(prev => [`[PALETTE] Removed color ${removed}`, ...prev]);
        }
    };

    // Calculate current pixel radius
    const currentRadius = useMemo(() => Math.min(width, height) * radiusFactor, [width, height, radiusFactor]);

    const dots = useMemo(() => {
        const pts = [];
        for (let i = 0; i < dotCount; i++) {
            const a = (i / dotCount) * Math.PI * 2;
            pts.push({ 
                id: i,
                x: width / 2 + currentRadius * Math.cos(a), 
                y: height / 2 + currentRadius * Math.sin(a),
                angle: a 
            });
        }
        return pts;
    }, [dotCount, width, height, currentRadius]);

    // PREVIEW EFFECT: Updates the source buffer whenever settings change
    useEffect(() => {
        if (!img || !sourceCanvasRef.current) return;
        const ctx = sourceCanvasRef.current.getContext("2d");
        ctx.filter = `contrast(${contrast}%)`;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);
        
        const dW = img.width * imgZoom;
        const dH = img.height * imgZoom;
        const xPos = (width - dW) / 2 + Number(offsetX);
        const yPos = (height - dH) / 2 + Number(offsetY);
        
        ctx.drawImage(img, xPos, yPos, dW, dH);

        // Draw overlay circle to help user position - now responds to Radius
        ctx.filter = "none";
        ctx.strokeStyle = "rgba(0, 242, 255, 0.7)";
        ctx.setLineDash([5, 5]); // Dashed line for preview
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(width/2, height/2, currentRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
    }, [img, imgZoom, offsetX, offsetY, contrast, width, height, currentRadius]);

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (f) => {
            const i = new Image();
            i.onload = () => setImg(i);
            i.src = f.target.result;
        };
        reader.readAsDataURL(file);
    };

    const updatePaletteColor = (index, color) => {
        const newPalette = [...palette];
        newPalette[index] = color;
        setPalette(newPalette);
    };

    const getClosestColor = (r, g, b) => {
        if (!useCustomPalette || palette.length === 0) return `rgb(${r},${g},${b})`;
        let minDistance = Infinity;
        let closest = palette[0];
        palette.forEach(hex => {
            const hr = parseInt(hex.slice(1, 3), 16);
            const hg = parseInt(hex.slice(3, 5), 16);
            const hb = parseInt(hex.slice(5, 7), 16);
            const dist = Math.sqrt((r - hr) ** 2 + (g - hg) ** 2 + (b - hb) ** 2);
            if (dist < minDistance) {
                minDistance = dist;
                closest = `rgb(${hr},${hg},${hb})`;
            }
        });
        return closest;
    };

    const drawDotHeads = (ctx) => {
        ctx.save();
        dots.forEach(dot => {
            ctx.fillStyle = "#000";
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 2.5, 0, Math.PI * 2);
            ctx.fill();

            const labelR = 22;
            const lx = dot.x + Math.cos(dot.angle) * labelR;
            const ly = dot.y + Math.sin(dot.angle) * labelR;

            ctx.fillStyle = "#666";
            ctx.font = "10px monospace";
            ctx.textAlign = Math.abs(Math.cos(dot.angle)) < 0.1 ? "center" : (Math.cos(dot.angle) > 0 ? "left" : "right");
            ctx.textBaseline = "middle";
            ctx.fillText(dot.id, lx, ly);
        });
        ctx.restore();
    };

    const downloadCSV = () => {
        let csvContent = "data:text/csv;charset=utf-8,Line_ID,From_Dot,To_Dot,Color_Sequence_Steps\n";
        allLines.forEach((line, index) => {
            const colorList = line.segments.map(s => `${Math.round(s.t * 100)}%:${s.color}`).join(" | ");
            csvContent += `${index},${line.p1.id},${line.p2.id},"${colorList}"\n`;
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "string_art_instructions.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const runFastMapper = async () => {
        if (!img) return;
        setIsRendering(true);
        setHasRendered(false);
        setAllLines([]);
        
        const srcCtx = sourceCanvasRef.current.getContext("2d", { willReadFrequently: true });
        const outCtx = displayCanvasRef.current.getContext("2d");
        
        // Final redraw without the preview circle for the sampler
        srcCtx.filter = `contrast(${contrast}%)`;
        srcCtx.fillStyle = "white";
        srcCtx.fillRect(0, 0, width, height);
        const dW = img.width * imgZoom;
        const dH = img.height * imgZoom;
        srcCtx.drawImage(img, (width - dW) / 2 + Number(offsetX), (height - dH) / 2 + Number(offsetY), dW, dH);
        
        const imgData = srcCtx.getImageData(0, 0, width, height).data;

        outCtx.clearRect(0, 0, width, height);
        drawDotHeads(outCtx);
        outCtx.globalAlpha = 0.6;

        const totalLines = (dots.length * (dots.length - 1)) / 2;
        let processedLines = 0;
        let linesCollector = [];

        for (let i = 0; i < dots.length; i++) {
            for (let j = i + 1; j < dots.length; j++) {
                const p1 = dots[i];
                const p2 = dots[j];
                const segments = getLineSegments(p1, p2, imgData);
                if (segments.length > 0) {
                    linesCollector.push({ p1, p2, segments });
                    drawSingleLine(outCtx, p1, p2, segments);
                }
                processedLines++;
            }
            setProgress(Math.round((processedLines / totalLines) * 100));
            if (i % 12 === 0) await new Promise(r => setTimeout(r, 0));
        }
        setAllLines(linesCollector);
        setIsRendering(false);
        setHasRendered(true);
        setDetailedLogs(prev => [`[SYSTEM] Render Complete. Total lines: ${linesCollector.length}`, ...prev]);
    };

    const getLineSegments = (p1, p2, imgData) => {
        const segments = [];
        const stepSize = stepGranularity / 100; 
        for (let t = 0; t <= 1.001; t += stepSize) {
            const px = Math.floor(p1.x * (1 - t) + p2.x * t);
            const py = Math.floor(p1.y * (1 - t) + p2.y * t);
            if (px < 0 || px >= width || py < 0 || py >= height) continue;
            const idx = (py * width + px) * 4;
            const color = getClosestColor(imgData[idx], imgData[idx + 1], imgData[idx + 2]);
            segments.push({ t, x: px, y: py, color });
        }
        return segments;
    };

    const drawSingleLine = (ctx, p1, p2, segments, polyMask = null) => {
        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        segments.forEach(seg => {
            let finalColor = seg.color;
            if (polyMask && !isPointInPoly(seg, polyMask)) {
                finalColor = "rgba(255, 255, 255, 0.8)";
            }
            grad.addColorStop(Math.min(1, Math.max(0, seg.t)), finalColor);
        });
        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.4;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    };

    const isPointInPoly = (point, poly) => {
        let inside = false;
        for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
            const xi = poly[i].x, yi = poly[i].y;
            const xj = poly[j].x, yj = poly[j].y;
            const intersect = ((yi > point.y) !== (yj > point.y)) && 
                              (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    };

    const startDrawing = (e) => {
        if (!isSelecting) return;
        const rect = selectionCanvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (width / rect.width);
        const y = (e.clientY - rect.top) * (height / rect.height);
        setIsDrawing(true);
        currentPath.current = [{ x, y }];
        const ctx = selectionCanvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.strokeStyle = "#00f2ff";
        ctx.moveTo(x, y);
    };

    const drawLine = (e) => {
        if (!isDrawing) return;
        const rect = selectionCanvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (width / rect.width);
        const y = (e.clientY - rect.top) * (height / rect.height);
        currentPath.current.push({ x, y });
        const ctx = selectionCanvasRef.current.getContext("2d");
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const finishDrawing = () => {
        if (!isDrawing) return;
        setIsDrawing(false);
        const ctx = selectionCanvasRef.current.getContext("2d");
        ctx.closePath();
        ctx.stroke();
        applyAreaFilter();
    };

    const applyAreaFilter = () => {
        const path = currentPath.current;
        if (path.length < 3) return;
        const survivors = allLines.filter(line => 
            line.segments.some(seg => isPointInPoly(seg, path))
        );
        const outCtx = displayCanvasRef.current.getContext("2d");
        outCtx.clearRect(0, 0, width, height);
        drawDotHeads(outCtx);
        outCtx.globalAlpha = 0.8;
        survivors.forEach(line => {
            drawSingleLine(outCtx, line.p1, line.p2, line.segments, path);
        });
        setAllLines(survivors);
        setDetailedLogs(prev => [`[FILTER] Area applied. ${survivors.length} lines remain.`, ...prev]);
        setIsSelecting(false);
        selectionCanvasRef.current.getContext("2d").clearRect(0, 0, width, height);
    };

    return (
        <div style={{ background: "#080808", color: "#ddd", padding: "20px", fontFamily: "monospace", display: "flex", gap: "20px", minHeight: "100vh" }}>
          <button 
                onClick={() => navigate("/line_art_bw")} 
                style={{ position: "absolute", top: "20px", right: "20px", padding: "10px 20px", background: "#333", color: "#00f2ff", border: "1px solid #00f2ff", cursor: "pointer", zIndex: 100, fontWeight: "bold" }}
            >
                GO TO BLACK-WHITE VERSION
            </button>
            <div style={{ width: "320px", background: "#121212", padding: "20px", borderRadius: "8px", border: "1px solid #222", flexShrink: 0 }}>
                <h3 style={{ color: "#00f2ff", margin: "0 0 15px 0" }}>CONTROL UNIT</h3>
                <input type="file" onChange={handleFile} style={{ width: "100%", marginBottom: "15px" }} />
                
                <div style={{ background: "#000", padding: "10px", borderRadius: "4px", marginBottom: "15px", fontSize: "11px" }}>
                    <label>Frame Radius: {(radiusFactor * 100).toFixed(0)}%</label>
                    <input type="range" min="0.1" max="0.5" step="0.01" value={radiusFactor} onChange={e => setRadiusFactor(Number(e.target.value))} style={{ width: "100%", accentColor: "#00f2ff" }} />
                    <hr style={{ border: "0.5px solid #222", margin: "10px 0" }} />
                    <label>Contrast: {contrast}%</label>
                    <input type="range" min="50" max="250" value={contrast} onChange={e => setContrast(e.target.value)} style={{ width: "100%" }} />
                    <label>Zoom: {imgZoom}</label>
                    <input type="range" min="0.1" max="4" step="0.1" value={imgZoom} onChange={e => setImgZoom(e.target.value)} style={{ width: "100%" }} />
                    <label>Offset X: {offsetX}</label>
                    <input type="range" min="-600" max="600" value={offsetX} onChange={e => setOffsetX(e.target.value)} style={{ width: "100%" }} />
                    <label>Offset Y: {offsetY}</label>
                    <input type="range" min="-600" max="600" value={offsetY} onChange={e => setOffsetY(e.target.value)} style={{ width: "100%" }} />
                    <hr style={{ border: "0.5px solid #222", margin: "10px 0" }} />
                    <label>Dots: {dotCount}</label>
                    <input type="range" min="20" max="400" value={dotCount} onChange={e => setDotCount(Number(e.target.value))} style={{ width: "100%" }} />
                    <label>Precision: {stepGranularity}%</label>
                    <input type="range" min="0.5" max="15" step="0.5" value={stepGranularity} onChange={e => setStepGranularity(Number(e.target.value))} style={{ width: "100%" }} />
                </div>

                <div style={{ background: "#1a1a1a", padding: "10px", borderRadius: "4px", marginBottom: "15px" }}>
                    <label style={{ fontSize: "11px", display: "block", marginBottom: "5px" }}>
                        <input type="checkbox" checked={useCustomPalette} onChange={e => setUseCustomPalette(e.target.checked)} /> USE PALETTE
                    </label>
                    {useCustomPalette && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          {/* The List of Current Colors */}
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                              {palette.map((c, idx) => (
                                  <div key={idx} style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                      <div style={{ width: "30px", height: "30px", background: c, borderRadius: "4px", border: "1px solid #444" }} />
                                      <button 
                                          onClick={() => removeColor(idx)}
                                          style={{ position: "absolute", top: "-5px", right: "-5px", background: "red", color: "white", border: "none", borderRadius: "50%", width: "15px", height: "15px", fontSize: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                                      >
                                          ×
                                      </button>
                                  </div>
                              ))}
                          </div>

                          {/* The "Add New" Picker */}
                          <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#000", padding: "5px", borderRadius: "4px" }}>
                              <label style={{ fontSize: "10px", color: "#666" }}>ADD COLOR:</label>
                              <input 
                                  type="color" 
                                  onChange={(e) => addColor(e.target.value)} 
                                  style={{ cursor: "pointer", background: "none", border: "none", width: "30px", height: "30px" }} 
                              />
                          </div>
                      </div>
                  )}
                </div>

                <button onClick={runFastMapper} disabled={isRendering} style={{ width: "100%", padding: "12px", background: "#00f2ff", color: "#000", fontWeight: "bold", border: "none", cursor: "pointer", marginBottom: "10px" }}>
                    {isRendering ? `MAPPING ${progress}%` : "RE-RENDER ALL"}
                </button>

                <button onClick={() => setIsSelecting(true)} disabled={!hasRendered || isRendering || isSelecting} style={{ width: "100%", padding: "12px", background: isSelecting ? "#f2ff00" : "#333", color: isSelecting ? "#000" : "#888", fontWeight: "bold", border: "none", cursor: "pointer", marginBottom: "10px" }}>
                    {isSelecting ? "DRAW AREA NOW..." : "SELECT & WHITEN"}
                </button>

                <button onClick={downloadCSV} disabled={!hasRendered} style={{ width: "100%", padding: "12px", background: "#0f0", color: "#000", fontWeight: "bold", border: "none", cursor: "pointer" }}>
                    DOWNLOAD CSV
                </button>
                <div style={{ 
                  marginTop: "12px", 
                  padding: "10px", 
                  background: "#000", 
                  border: "1px solid #333", 
                  borderRadius: "4px", 
                  fontSize: "10px", 
                  lineHeight: "1.4",
                  color: "#bbb" 
              }}>
                  <span style={{ color: "#00f2ff", fontWeight: "bold", display: "block", marginBottom: "4px" }}>
                      PHYSICAL CALIBRATION:
                  </span>
                  To get the same result on paper, follow the downloadable instructions and use a 
                  radius of <strong style={{ color: "#fff" }}>{(radiusFactor * 100).toFixed(0)}%</strong> of your paper's total width. 
                  <br/><br/>
                  <span style={{ color: "#666" }}>
                      Example: If your paper is 50cm wide, set your compass to {(50 * radiusFactor).toFixed(1)}cm. 
                      Else, it will look compressed or distorted.
                  </span>
              </div>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "flex", gap: "15px", flex: 1 }}>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <small style={{ color: "#666", marginBottom: "5px" }}>INPUT BUFFER (ALIGN CIRCLE HERE)</small>
                        <div style={{ flex: 1, border: "1px solid #222", background: "#000", position: "relative", overflow: "hidden" }}>
                            <canvas ref={sourceCanvasRef} width={width} height={height} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        </div>
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <small style={{ color: "#666", marginBottom: "5px" }}>OUTPUT CANVAS</small>
                        <div style={{ flex: 1, border: "1px solid #222", background: "#fff", position: "relative" }}>
                            <canvas ref={displayCanvasRef} width={width} height={height} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                            <canvas ref={selectionCanvasRef} width={width} height={height} onMouseDown={startDrawing} onMouseMove={drawLine} onMouseUp={finishDrawing} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", cursor: isSelecting ? "crosshair" : "default", pointerEvents: isSelecting ? "all" : "none" }} />
                        </div>
                    </div>
                </div>

                <div style={{ background: "#000", border: "1px solid #222", padding: "12px", height: "150px", overflowY: "auto", fontSize: "11px", color: "#0f0" }}>
                    <div style={{ borderBottom: "1px solid #333", marginBottom: "5px", color: "#00f2ff", display: "flex", justifyContent: "space-between" }}>
                        <span>SYSTEM LOGS</span>
                    </div>
                    {detailedLogs.map((log, i) => <div key={i} style={{ marginBottom: "2px" }}>{`> ${log}`}</div>)}
                </div>
            </div>
        </div>
    );
}