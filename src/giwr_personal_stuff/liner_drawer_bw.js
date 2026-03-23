import React, { useRef, useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BlackWhiteStringArt({ width = 800, height = 800 }) {
    const [img, setImg] = useState(null);
    const navigate = useNavigate();
    const [dotCount, setDotCount] = useState(160); 
    const [radiusFactor, setRadiusFactor] = useState(0.44);
    const [lineWeight, setLineWeight] = useState(20);
    const [imgZoom, setImgZoom] = useState(1.0);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [contrast, setContrast] = useState(120);
    const [isRendering, setIsRendering] = useState(false);
    const [hasRendered, setHasRendered] = useState(false);
    
    const [progress, setProgress] = useState(0);
    const [detailedLogs, setDetailedLogs] = useState([]);
    const [allLines, setAllLines] = useState([]);

    const [isSelecting, setIsSelecting] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const currentPath = useRef([]);

    const sourceCanvasRef = useRef(null);
    const displayCanvasRef = useRef(null);
    const selectionCanvasRef = useRef(null);

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

    useEffect(() => {
        if (!img || !sourceCanvasRef.current) return;
        const ctx = sourceCanvasRef.current.getContext("2d");
        ctx.filter = `grayscale(100%) contrast(${contrast}%)`;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);
        
        const dW = img.width * imgZoom;
        const dH = img.height * imgZoom;
        const xPos = (width - dW) / 2 + Number(offsetX);
        const yPos = (height - dH) / 2 + Number(offsetY);
        
        ctx.drawImage(img, xPos, yPos, dW, dH);

        ctx.filter = "none";
        ctx.strokeStyle = "#00f2ff";
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(width/2, height/2, currentRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
    }, [img, imgZoom, offsetX, offsetY, contrast, currentRadius]);

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

    const drawDotLabels = (ctx) => {
        ctx.save();
        dots.forEach(dot => {
            ctx.fillStyle = "#000";
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
            ctx.fill();

            const labelDist = 15;
            const lx = dot.x + Math.cos(dot.angle) * labelDist;
            const ly = dot.y + Math.sin(dot.angle) * labelDist;

            ctx.fillStyle = "#999";
            ctx.font = "9px monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(dot.id, lx, ly);
        });
        ctx.restore();
    };

    const runBWMapper = async () => {
        if (!img) return;
        setIsRendering(true);
        setHasRendered(false);
        setAllLines([]);
        
        const srcCtx = sourceCanvasRef.current.getContext("2d");
        const outCtx = displayCanvasRef.current.getContext("2d");
        
        srcCtx.filter = `grayscale(100%) contrast(${contrast}%)`;
        srcCtx.fillStyle = "white";
        srcCtx.fillRect(0, 0, width, height);
        srcCtx.drawImage(img, (width - (img.width * imgZoom)) / 2 + Number(offsetX), (height - (img.height * imgZoom)) / 2 + Number(offsetY), img.width * imgZoom, img.height * imgZoom);
        
        let imgData = srcCtx.getImageData(0, 0, width, height);
        let pixels = imgData.data;

        outCtx.fillStyle = "white";
        outCtx.fillRect(0, 0, width, height);
        drawDotLabels(outCtx);

        let currentLines = [];
        let lastDotIdx = 0;
        const maxLines = 2000; 

        for (let l = 0; l < maxLines; l++) {
            let bestDot = -1;
            let maxDarkness = -1;

            for (let nextDotIdx = 0; nextDotIdx < dots.length; nextDotIdx++) {
                if (nextDotIdx === lastDotIdx) continue;
                let darknessScore = calculateDarkness(dots[lastDotIdx], dots[nextDotIdx], pixels);
                if (darknessScore > maxDarkness) {
                    maxDarkness = darknessScore;
                    bestDot = nextDotIdx;
                }
            }

            if (bestDot === -1 || maxDarkness < 15) break;

            const p1 = dots[lastDotIdx];
            const p2 = dots[bestDot];
            
            outCtx.beginPath();
            outCtx.strokeStyle = `rgba(0,0,0,${lineWeight/100})`;
            outCtx.lineWidth = 0.4;
            outCtx.moveTo(p1.x, p1.y);
            outCtx.lineTo(p2.x, p2.y);
            outCtx.stroke();

            subtractLine(p1, p2, pixels);
            currentLines.push({ p1, p2 });
            lastDotIdx = bestDot;

            if (l % 100 === 0) {
                setProgress(Math.round((l / maxLines) * 100));
                await new Promise(r => setTimeout(r, 0));
            }
        }

        setAllLines(currentLines);
        setIsRendering(false);
        setHasRendered(true);
        setDetailedLogs(prev => [`[BW-ENGINE] Rendered ${currentLines.length} strings.`, ...prev]);
    };

    const calculateDarkness = (p1, p2, pixels) => {
        let score = 0;
        const steps = 60;
        for (let i = 0; i < steps; i++) {
            const t = i / steps;
            const px = Math.floor(p1.x * (1 - t) + p2.x * t);
            const py = Math.floor(p1.y * (1 - t) + p2.y * t);
            const idx = (py * width + px) * 4;
            score += (255 - pixels[idx]);
        }
        return score;
    };

    const subtractLine = (p1, p2, pixels) => {
        const steps = 80;
        for (let i = 0; i < steps; i++) {
            const t = i / steps;
            const px = Math.floor(p1.x * (1 - t) + p2.x * t);
            const py = Math.floor(p1.y * (1 - t) + p2.y * t);
            const idx = (py * width + px) * 4;
            pixels[idx] = Math.min(255, pixels[idx] + 60);
            pixels[idx+1] = Math.min(255, pixels[idx+1] + 60);
            pixels[idx+2] = Math.min(255, pixels[idx+2] + 60);
        }
    };

    const downloadImage = () => {
        const link = document.createElement("a");
        link.download = "string_art_preview.png";
        link.href = displayCanvasRef.current.toDataURL("image/png");
        link.click();
    };

    const downloadCSV = () => {
        let csvContent = "data:text/csv;charset=utf-8,Order,From_Dot,To_Dot\n";
        allLines.forEach((line, i) => { csvContent += `${i},${line.p1.id},${line.p2.id}\n`; });
        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", "instructions.csv");
        link.click();
    };

    const startDrawing = (e) => {
        if (!isSelecting) return;
        setIsDrawing(true);
        const rect = selectionCanvasRef.current.getBoundingClientRect();
        currentPath.current = [{ x: (e.clientX - rect.left) * (width/rect.width), y: (e.clientY - rect.top) * (height/rect.height) }];
    };

    const drawLine = (e) => {
        if (!isDrawing) return;
        const rect = selectionCanvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (width / rect.width);
        const y = (e.clientY - rect.top) * (height / rect.height);
        currentPath.current.push({ x, y });
        const ctx = selectionCanvasRef.current.getContext("2d");
        ctx.clearRect(0,0,width,height);
        ctx.beginPath(); ctx.strokeStyle = "#00f2ff";
        currentPath.current.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.stroke();
    };

    const finishDrawing = () => {
        setIsDrawing(false);
        const path = currentPath.current;
        if (path.length < 3) return;
        const survivors = allLines.filter(line => {
            const midX = (line.p1.x + line.p2.x) / 2;
            const midY = (line.p1.y + line.p2.y) / 2;
            return !isPointInPoly({x: midX, y: midY}, path);
        });
        setAllLines(survivors);
        const ctx = displayCanvasRef.current.getContext("2d");
        ctx.fillStyle = "white"; ctx.fillRect(0,0,width,height);
        drawDotLabels(ctx);
        ctx.strokeStyle = `rgba(0,0,0,${lineWeight/100})`;
        survivors.forEach(l => {
            ctx.beginPath(); ctx.moveTo(l.p1.x, l.p1.y); ctx.lineTo(l.p2.x, l.p2.y); ctx.stroke();
        });
        setIsSelecting(false);
        selectionCanvasRef.current.getContext("2d").clearRect(0,0,width,height);
    };

    const isPointInPoly = (point, poly) => {
        let inside = false;
        for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
            if (((poly[i].y > point.y) !== (poly[j].y > point.y)) && (point.x < (poly[j].x - poly[i].x) * (point.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)) inside = !inside;
        }
        return inside;
    };

    return (
        
        <div style={{ background: "#0a0a0a", color: "#eee", padding: "20px", fontFamily: "monospace", display: "flex", gap: "20px", height: "100vh" }}>
            <button 
                onClick={() => navigate("/line_art")} 
                style={{ position: "absolute", top: "20px", right: "20px", padding: "10px 20px", background: "#333", color: "#00f2ff", border: "1px solid #00f2ff", cursor: "pointer", zIndex: 100, fontWeight: "bold" }}
            >
                GO TO FULL VERSION
            </button>
            <button 
                onClick={() => window.location.href = "https://stringar.com/"} 
                style={{ 
                    position: "absolute", 
                    top: "60px", 
                    right: "20px", 
                    padding: "10px 20px", 
                    background: "#333", 
                    color: "#00f2ff", 
                    border: "1px solid #00f2ff", 
                    cursor: "pointer", 
                    zIndex: 100, 
                    fontWeight: "bold" 
                }}
            >
                GO TO PRO SITE FOR THIS THINGY
            </button>
            <div style={{ width: "320px", background: "#151515", padding: "20px", borderRadius: "10px", border: "1px solid #333", overflowY: "auto" }}>
                <h2 style={{ color: "#00f2ff", marginTop: 0 }}>B&W ENGINE</h2>
                <input type="file" onChange={handleFile} style={{ marginBottom: "15px" }} />
                
                <div style={{ fontSize: "11px", display: "grid", gap: "8px" }}>
                    <label>ZOOM: {imgZoom}</label>
                    <input type="range" min="0.1" max="4" step="0.1" value={imgZoom} onChange={e => setImgZoom(e.target.value)} />
                    <label>OFFSET X: {offsetX}</label>
                    <input type="range" min="-500" max="500" value={offsetX} onChange={e => setOffsetX(e.target.value)} />
                    <label>OFFSET Y: {offsetY}</label>
                    <input type="range" min="-500" max="500" value={offsetY} onChange={e => setOffsetY(e.target.value)} />
                    <hr style={{ border: "0.5px solid #333" }} />
                    <label>DOTS: {dotCount}</label>
                    <input type="range" min="80" max="360" value={dotCount} onChange={e => setDotCount(Number(e.target.value))} />
                    <label>FRAME RADIUS: {(radiusFactor * 100).toFixed(0)}%</label>
                    <input type="range" min="0.1" max="0.5" step="0.01" value={radiusFactor} onChange={e => setRadiusFactor(Number(e.target.value))} />
                    <label>CONTRAST: {contrast}%</label>
                    <input type="range" min="50" max="300" value={contrast} onChange={e => setContrast(Number(e.target.value))} />
                </div>

                <button onClick={runBWMapper} disabled={isRendering} style={{ width: "100%", marginTop: "15px", padding: "12px", background: "#00f2ff", border: "none", fontWeight: "bold", cursor: "pointer" }}>
                    {isRendering ? `RENDERING ${progress}%` : "RE-RENDER"}
                </button>

                <button onClick={() => setIsSelecting(true)} disabled={!hasRendered} style={{ width: "100%", marginTop: "10px", padding: "12px", background: isSelecting ? "#ffcc00" : "#444", border: "none", color: "#fff", cursor: "pointer" }}>
                    {isSelecting ? "ERASE AREA..." : "SELECT & WHITEN"}
                </button>

                <div style={{ marginTop: "20px" }}>
                    <button onClick={downloadImage} disabled={!hasRendered} style={{ width: "100%", padding: "12px", background: "#fff", color: "#000", fontWeight: "bold", border: "none", cursor: "pointer", marginBottom: "8px" }}>
                        DOWNLOAD PICTURE
                    </button>
                    <button onClick={downloadCSV} disabled={!hasRendered} style={{ width: "100%", padding: "12px", background: "#0f0", color: "#000", fontWeight: "bold", border: "none", cursor: "pointer" }}>
                        DOWNLOAD CSV
                    </button>
                </div>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", gap: "10px", flex: 1 }}>
                    <div style={{ flex: 1, position: "relative" }}>
                        <small style={{ color: "#666" }}>ALIGNMENT BUFFER</small>
                        <canvas ref={sourceCanvasRef} width={width} height={height} style={{ width: "100%", background: "#000", border: "1px solid #333" }} />
                    </div>
                    <div style={{ flex: 1, position: "relative" }}>
                        <small style={{ color: "#666" }}>STRING OUTPUT (WITH LABELS)</small>
                        <canvas ref={displayCanvasRef} width={width} height={height} style={{ width: "100%", background: "#fff", border: "1px solid #333" }} />
                        <canvas ref={selectionCanvasRef} width={width} height={height} 
                            onMouseDown={startDrawing} onMouseMove={drawLine} onMouseUp={finishDrawing}
                            style={{ position: "absolute", top: "18px", left: 0, width: "100%", cursor: isSelecting ? "crosshair" : "default", pointerEvents: isSelecting ? "all" : "none" }} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}