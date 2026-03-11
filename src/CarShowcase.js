import React from 'react';
import { Link } from 'react-router-dom';

function CarShowcase() {
  const cars = [
    {
      name: 'Toyota Celica',
      hp: 180,
      engine: '1.8L',
      description: 'The Toyota Celica is a sports car produced by Toyota from 1970 to 2006. It was known for its sleek design and performance.',
      mileage: '25 mpg city / 32 mpg highway',
      manufacturer: 'Toyota',
      image: '/images/toyota-celica.jpg'
    },
    {
      name: 'Mazda MX-5 Miata NA',
      hp: 116,
      engine: '1.6L',
      description: 'The Mazda MX-5 Miata NA is the first generation of the Mazda MX-5 manufactured from 1989 to 1997. It\'s known for its lightweight and nimble handling.',
      mileage: '22 mpg city / 28 mpg highway',
      manufacturer: 'Mazda',
      image: '/images/mazda-mx5-miata.jpg'
    },
    {
      name: 'Porsche 911 (992)',
      hp: 379,
      engine: '3.0L',
      description: 'The Porsche 911 (992) is the eighth generation of the Porsche 911 sports car. It features a twin-turbocharged flat-six engine and advanced technology.',
      mileage: '18 mpg city / 24 mpg highway',
      manufacturer: 'Porsche',
      image: '/images/porsche-911.jpg'
    },
    {
      name: 'Toyota Yaris',
      hp: 106,
      engine: '1.5L',
      description: 'The Toyota Yaris is a subcompact car produced by Toyota since 1999. Known for its fuel efficiency and compact size, it\'s perfect for city driving.',
      mileage: '32 mpg city / 40 mpg highway',
      manufacturer: 'Toyota',
      image: '/images/toyota-yaris.jpg'
    },
    {
      name: 'Nissan 200SX',
      hp: 140,
      engine: '2.0L',
      description: 'The Nissan 200SX, also known as Silvia in some markets, is a sports car that was produced by Nissan from 1974 to 2002. It\'s popular among drifting enthusiasts.',
      mileage: '21 mpg city / 29 mpg highway',
      manufacturer: 'Nissan',
      image: '/images/nissan-200sx.jpg'
    }
  ];

  return (
    <div className="bg-blue-100 min-h-screen p-4">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold text-center">Car Showcase</h1>
      </header>
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Classic (Balkan), Nice and Beatifull Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <img src={car.image} alt={`${car.name} - a ${car.manufacturer} model car`} className="w-full h-48 object-cover mb-4 rounded" />
              <h2 className="text-xl font-bold text-blue-600">{car.name}</h2>
              <p className="text-blue-700">{car.hp} HP / {car.engine} Engine</p>
              <p className="text-blue-600 mt-2">{car.description}</p>
              <Link to={`/cars/${car.name}`} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block">Explore {car.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarShowcase;
