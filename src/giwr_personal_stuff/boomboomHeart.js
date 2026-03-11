"use client";
import React, { useState, useRef, useEffect } from "react";

function BoomBoomHeart() {
  const [isExploding, setIsExploding] = React.useState(false);
  const [particles, setParticles] = React.useState([]);
  const [showButton, setShowButton] = React.useState(true);

  const createParticles = () => {
    const newParticles = [];
    const colors = ['#ff69b4', '#ff1493', '#dc143c', '#ff6347', '#ffd700', '#ff4500', '#ff69b4', '#ff91a4'];
    
    for (let i = 0; i < 50; i++) {
      const angle = (Math.PI * 2 * i) / 50;
      const velocity = 2 + Math.random() * 4;
      const size = 4 + Math.random() * 8;
      
      newParticles.push({
        id: i,
        x: 0,
        y: 0,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: size,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: 0.02 + Math.random() * 0.02,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }
    
    // Add heart-shaped particles
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 1 + Math.random() * 3;
      
      newParticles.push({
        id: i + 50,
        x: 0,
        y: 0,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: 8 + Math.random() * 12,
        color: '#ff1493',
        life: 1,
        decay: 0.015,
        isHeart: true,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 5
      });
    }
    
    setParticles(newParticles);
  };

  const handleHeartClick = () => {
    setIsExploding(true);
    setShowButton(false);
    createParticles();
    
    setTimeout(() => {
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }, 3000);
  };

  React.useEffect(() => {
    if (!isExploding) return;
    
    const interval = setInterval(() => {
      setParticles(prevParticles => {
        return prevParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - particle.decay,
          rotation: particle.rotation + particle.rotationSpeed,
          vy: particle.vy + 0.1 // gravity effect
        })).filter(particle => particle.life > 0);
      });
    }, 16);
    
    return () => clearInterval(interval);
  }, [isExploding]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-red-200 to-purple-300 flex items-center justify-center relative overflow-hidden font-roboto">
      <div className="absolute inset-0 bg-gradient-to-t from-pink-400/20 to-transparent"></div>
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-pink-600 mb-8 animate-pulse">
          {/* 💕 Love Explosion 💕 */}
            💖 Invitation For YOU 💖
        </h1>
        
        <p className="text-2xl text-pink-700 mb-12 max-w-2xl mx-auto">
          {/* Click the heart below to experience a magical moment of love and wonder */}
          Click below to reveal the invitation, specially designed for you (keep in mind it's a different for each one, so don't share it with others and appreciate my effort to design so many and).
        </p>

        {showButton && (
          <button
            onClick={handleHeartClick}
            className="relative group transform transition-all duration-300 hover:scale-110 focus:outline-none"
          >
            <div className="w-64 h-64 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-pink-500/50 transition-all duration-300">
              <div className="w-56 h-56 bg-gradient-to-br from-pink-300 to-red-400 rounded-full flex items-center justify-center">
                <div className="text-white text-2xl font-bold text-center leading-tight">
                  <div className="text-6xl mb-2">💖</div>
                  <div>PRESS HERE</div>
                </div>
              </div>
            </div>
            
            <div className="absolute inset-0 rounded-full bg-pink-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300 animate-ping"></div>
          </button>
        )}

        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {particles.map(particle => (
            <div
              key={particle.id}
              className="absolute transition-all duration-75"
              style={{
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.life,
                transform: `rotate(${particle.rotation}deg)`
              }}
            >
              {particle.isHeart ? (
                <div 
                  className="text-pink-500"
                  style={{ fontSize: `${particle.size}px` }}
                >
                  💖
                </div>
              ) : (
                <div
                  className="rounded-full"
                  style={{
                    backgroundColor: particle.color,
                    width: '100%',
                    height: '100%',
                    boxShadow: `0 0 ${particle.size}px ${particle.color}`
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {isExploding && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-pink-500 rounded-full animate-ping"></div>
          </div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      )}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-pink-600 text-lg">
        {/* Made with 💕 for someone special */}
        Made with 💕 for a guest to be (since you haven't opened the invitation yet) of the Avli
      </div>

      <style jsx global>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}


export default BoomBoomHeart;


