// src/AllDevsPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const developers = [
  { id: 1, name: 'Alice Smith', role: 'Frontend Developer', image: '/images/gojosendsawaynoobs.jpg' },
  { id: 2, name: 'Bob Johnson', role: 'Backend Developer', image: '/images/gojosendsawaynoobs.jpg' },
  { id: 3, name: 'Charlie Brown', role: 'Full Stack Developer', image: '/images/gojosendsawaynoobs.jpg' },
  { id: 4, name: 'Jane Doe', role: 'UI/UX Designer', image: '/images/gojosendsawaynoobs.jpg' },
  { id: 5, name: 'Georgios Bakas Melissaratos', role: 'Does Everything Apparently', image: '/images/giorCV.jpg' }, // This will be your profile
];

function AllDevsPage() {
  return (
    <div className="font-roboto bg-gray-100 min-h-screen p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#333333]">Our Developers</h1>
        <p className="text-xl text-[#666666]">Meet the talented team behind our projects</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {developers.map(dev => (
          <div key={dev.id} className="bg-white rounded-lg shadow-md p-6 mb-8 text-center">
            <img src={dev.image} alt={dev.name} className="w-48 h-48 object-cover mb-4 rounded-full mx-auto" />
            <h2 className="text-2xl font-semibold mb-2 text-[#333333]">{dev.name}</h2>
            <p className="text-lg text-[#666666]">{dev.role}</p>
            <Link to={dev.id === 5 ? '/giorMainDevCV' : '/botdev'} className="text-blue-600 hover:underline mt-4 block">
              View Profile
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}

export default AllDevsPage;
