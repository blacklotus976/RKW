import React, { useState, useRef } from 'react';

const SteganoTool = () => {
  const [step, setStep] = useState(1); // 1: Upload, 2: Choose Mode, 3: Action
  const [mode, setMode] = useState(null); // 'hide' or 'detect'
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const canvasRef = useRef(null);

  const MAGIC_PREFIX = "SPY!"; 

  // --- STEGANOGRAPHY LOGIC ---
  const textToBin = (text) => {
    const fullText = MAGIC_PREFIX + text;
    return fullText.split('').map(char => 
      char.charCodeAt(0).toString(2).padStart(8, '0')
    ).join('') + '00000000';
  };

  const binToText = (binString) => {
    let text = '';
    for (let i = 0; i < binString.length; i += 8) {
      let byte = binString.slice(i, i + 8);
      if (byte === '00000000' || byte.length < 8) break;
      text += String.fromCharCode(parseInt(byte, 2));
    }
    return text;
  };

  // --- HANDLERS ---
  const handleImageUpload = (e) => {
    if (!e.target.files[0]) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        setImage({ width: img.width, height: img.height });
        setStep(2); // Move to Choose Mode
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const hideMessage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const binaryMessage = textToBin(message);

    if (binaryMessage.length > data.length / 4) {
      alert("Message too long for this image!");
      return;
    }

    for (let i = 0; i < binaryMessage.length; i++) {
      const pixelIndex = i * 4 + 3; 
      data[pixelIndex] = (data[pixelIndex] & 0xFE) | parseInt(binaryMessage[i], 10);
    }

    ctx.putImageData(imageData, 0, 0);
    const link = document.createElement('a');
    link.download = 'secret_image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const detectMessage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let binaryMessage = '';
    const maxCheck = Math.min(data.length, 800000); 

    for (let i = 0; i < maxCheck; i += 4) {
      binaryMessage += (data[i + 3] & 1).toString();
      if (binaryMessage.length % 8 === 0) {
        const currentText = binToText(binaryMessage);
        if (currentText.length === 4 && currentText !== MAGIC_PREFIX) {
          setResultMessage("No secret message found.");
          return;
        }
        if (binaryMessage.endsWith('00000000')) break;
      }
    }
    const decoded = binToText(binaryMessage);
    setResultMessage(decoded.replace(MAGIC_PREFIX, '') || "Empty message.");
  };

  const reset = () => {
    setStep(1);
    setMode(null);
    setMessage('');
    setResultMessage('');
  };

  // Capacity calculation
  const maxChars = image ? Math.floor((image.width * image.height) / 8) - 5 : 0;

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif', maxWidth: '500px', margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>🕵️ Spy Tool</h2>
        <button onClick={() => setShowInfo(!showInfo)} style={{ borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}>?</button>
      </div>

      {showInfo && (
        <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '8px', fontSize: '14px', marginBottom: '20px' }}>
          <strong>How it works:</strong>
          <p>We use "Least Significant Bit" (LSB) steganography. Every pixel has an Alpha (transparency) value. We tweak that value by just 1 point to store a 0 or a 1. It's invisible because your eyes can't see a 1/255th change in transparency!</p>
          <strong>The Math:</strong>
          <p>1 Character = 8 bits. We use 1 pixel per bit. <br/> 
          <em>Max Characters = (Width × Height) / 8</em></p>
          <button onClick={() => setShowInfo(false)}>Close</button>
        </div>
      )}

      <hr />

      {/* STEP 1: UPLOAD */}
      {step === 1 && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p><strong>Step 1:</strong> Upload a photo to begin</p>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      )}

      {/* STEP 2: CHOOSE MODE */}
      {step === 2 && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p><strong>Step 2:</strong> What do you want to do?</p>
          <button onClick={() => { setMode('hide'); setStep(3); }} style={{ margin: '10px', padding: '10px 20px' }}>Hide a Message</button>
          <button onClick={() => { setMode('detect'); setStep(3); detectMessage(); }} style={{ margin: '10px', padding: '10px 20px' }}>Detect Message</button>
          <br/><button onClick={reset} style={{ background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>Cancel</button>
        </div>
      )}

      {/* STEP 3: ACTION */}
      {step === 3 && (
        <div>
          <button onClick={reset} style={{ marginBottom: '10px' }}>← Back</button>
          
          {mode === 'hide' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <p><strong>Step 3:</strong> Write your secret message</p>
                <textarea 
                style={{ width: '100%', height: '100px', color: 'black', background: 'white', padding: '10px' }}
                value={message}
                placeholder="Enter text..."
                onChange={(e) => setMessage(e.target.value)}
                />
                <small>Space left: {maxChars - message.length} characters</small>
                <button onClick={hideMessage} style={{ padding: '10px', background: '#007bff', color: 'white' }}>Download Secret Photo</button>
            </div>
            ) : (
            <div style={{ 
                padding: '20px', 
                border: '2px dashed #ccc', 
                textAlign: 'center',
                overflowWrap: 'break-word', // Forces long strings to wrap
                wordBreak: 'break-word' 
            }}>
                <p><strong>Result:</strong></p>
                <h3 style={{ 
                color: '#d32f2f', 
                whiteSpace: 'pre-wrap' // Preserves line breaks and wraps text
                }}>
                {resultMessage || "Scanning..."}
                </h3>
            </div>
            )}
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default SteganoTool;