import React from 'react';

function DevProfilePage() {
  return (
    <div className="font-roboto bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        <img 
          src="/images/gojosendsawaynoobs.jpg" // Replace with your image path
          alt="Page not found"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center text-white p-4">
            <h1 className="text-4xl font-bold mb-4">Oops!</h1>
            <p className="text-xl">The page you are looking for does not exist yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DevProfilePage;
