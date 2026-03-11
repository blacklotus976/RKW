import React from 'react';
import { useParams } from 'react-router-dom';

function CarDetails() {
  const { carName } = useParams();

  // Array of car details with comments included
  const cars = [
    {
      name: 'Toyota Celica',
      hp: 180,
      engine: '1.8L',
      description: 'The Toyota Celica is a sports car produced by Toyota from 1970 to 2006. It was known for its sleek design and performance.',
      mileage: '25 mpg city / 32 mpg highway',
      manufacturer: 'Toyota',
      images: [
        '/images/toyota-celica-front.jpg',
        '/images/toyota-celica-side.jpg',
        '/images/toyota-celica-interior.jpg',
        '/images/toyota-celica-rear.jpg'
      ],
      comments: [
        { id: 1, author: 'John Doe', content: 'The Toyota Celica has always been my favorite! Great performance and design.', date: '2023-07-01' },
        { id: 2, author: 'Alice Smith', content: 'I love the sleek look of this car. Definitely on my wishlist!', date: '2023-07-05' },
        { id: 3, author: 'Bob Johnson', content: 'Excellent reliability and fun to drive. A classic!', date: '2023-07-10' },
        { id: 4, author: 'Charlie Brown', content: 'Great car for the price. Good fuel economy too.', date: '2023-07-15' },
        { id: 5, author: 'Diana Prince', content: 'The Toyota Celica has a rich history. A must-have for car enthusiasts.', date: '2023-07-20' }
      ]
    },
    {
      name: 'Mazda MX-5 Miata NA',
      hp: 116,
      engine: '1.6L',
      description: 'The Mazda MX-5 Miata NA is the first generation of the Mazda MX-5 manufactured from 1989 to 1997. It\'s known for its lightweight and nimble handling.',
      mileage: '22 mpg city / 28 mpg highway',
      manufacturer: 'Mazda',
      images: [
        '/images/mazda-mx5-miata-front.jpg',
        '/images/mazda-mx5-miata-side.jpg',
        '/images/mazda-mx5-miata-interior.jpg',
        '/images/mazda-mx5-miata-rear.jpg'
      ],
      comments: [
        { id: 1, author: 'James Bond', content: 'The Miata is the perfect blend of fun and practicality. Love it!', date: '2023-07-02' },
        { id: 2, author: 'Emma Watson', content: 'Such a joy to drive. The handling is unparalleled.', date: '2023-07-06' },
        { id: 3, author: 'Lucas Scott', content: 'A classic roadster with timeless appeal. Great car for weekends.', date: '2023-07-12' },
        { id: 4, author: 'Sophia Turner', content: 'Lightweight and responsive. A real driver\'s car.', date: '2023-07-18' },
        { id: 5, author: 'Oliver Twist', content: 'Mazda nailed it with the Miata. Still a favorite among enthusiasts.', date: '2023-07-22' }
      ]
    },
    {
      name: 'Porsche 911 (992)',
      hp: 379,
      engine: '3.0L',
      description: 'The Porsche 911 (992) is the eighth generation of the Porsche 911 sports car. It features a twin-turbocharged flat-six engine and advanced technology.',
      mileage: '18 mpg city / 24 mpg highway',
      manufacturer: 'Porsche',
      images: [
        '/images/porsche-911-front.jpg',
        '/images/porsche-911-side.jpg',
        '/images/porsche-911-interior.jpg',
        '/images/porsche-911-rear.jpg'
      ],
      comments: [
        { id: 1, author: 'Daniel Craig', content: 'An incredible sports car with top-notch performance.', date: '2023-07-03' },
        { id: 2, author: 'Natalie Portman', content: 'The 911 is a masterpiece. Unmatched engineering and style.', date: '2023-07-07' },
        { id: 3, author: 'Matthew McConaughey', content: 'Porsche’s best iteration yet. A thrill to drive.', date: '2023-07-14' },
        { id: 4, author: 'Gwyneth Paltrow', content: 'The 992 is a perfect blend of luxury and performance.', date: '2023-07-19' },
        { id: 5, author: 'Robert Downey Jr.', content: 'A superbly engineered car with amazing capabilities.', date: '2023-07-25' }
      ]
    },
    {
      name: 'Toyota Yaris',
      hp: 106,
      engine: '1.5L',
      description: 'The Toyota Yaris is a subcompact car produced by Toyota since 1999. Known for its fuel efficiency and compact size, it\'s perfect for city driving.',
      mileage: '32 mpg city / 40 mpg highway',
      manufacturer: 'Toyota',
      images: [
        '/images/toyota-yaris-front.jpg',
        '/images/toyota-yaris-side.jpg',
        '/images/toyota-yaris-interior.jpg',
        '/images/toyota-yaris-rear.jpg'
      ],
      comments: [
        { id: 1, author: 'Jessica Alba', content: 'Great for city driving and super fuel efficient.', date: '2023-07-04' },
        { id: 2, author: 'Chris Hemsworth', content: 'Compact and reliable. Perfect for urban commutes.', date: '2023-07-08' },
        { id: 3, author: 'Zendaya', content: 'A fantastic little car with impressive mileage.', date: '2023-07-13' },
        { id: 4, author: 'Tom Holland', content: 'The Yaris is a great budget option with excellent efficiency.', date: '2023-07-17' },
        { id: 5, author: 'Liam Hemsworth', content: 'Toyota nailed it with this one. Efficient and practical.', date: '2023-07-21' }
      ]
    },
    {
      name: 'Nissan 200SX',
      hp: 140,
      engine: '2.0L',
      description: 'The Nissan 200SX, also known as Silvia in some markets, is a sports car that was produced by Nissan from 1974 to 2002. It\'s popular among drifting enthusiasts.',
      mileage: '21 mpg city / 29 mpg highway',
      manufacturer: 'Nissan',
      images: [
        '/images/nissan-200sx-front.jpg',
        '/images/nissan-200sx-side.jpg',
        '/images/nissan-200sx-interior.jpg',
        '/images/nissan-200sx-rear.jpg'
      ],
      comments: [
        { id: 1, author: 'Bruce Wayne', content: 'The 200SX is a legend among drift enthusiasts.', date: '2023-07-09' },
        { id: 2, author: 'Clark Kent', content: 'A true icon in the world of sports cars. Fantastic handling.', date: '2023-07-11' },
        { id: 3, author: 'Wonder Woman', content: 'The 200SX delivers a thrilling driving experience.', date: '2023-07-16' },
        { id: 4, author: 'Tony Stark', content: 'A fun and nimble car with a strong following.', date: '2023-07-20' },
        { id: 5, author: 'Peter Parker', content: 'Great for drifting and weekend fun. A classic choice.', date: '2023-07-23' }
      ]
    }
  ];

  // Normalize carName and match it to car names
  const selectedCar = cars.find(car => car.name.toLowerCase() === carName.toLowerCase());

  if (!selectedCar) {
    return <div>Car not found</div>;
  }

  return (
    <div className="bg-blue-100 min-h-screen">
      <nav className="bg-blue-600 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-white font-bold">
            <i className="fas fa-home mr-2"></i>Home
          </a>
          <button className="text-white">
            <i className="fas fa-ellipsis-h mr-2"></i>More
          </button>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">{selectedCar.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {selectedCar.images.map((image, index) => (
            <img key={index} src={image} alt={`${selectedCar.name} - ${index === 0 ? 'front' : index === 1 ? 'side' : index === 2 ? 'interior' : 'rear'} view`} className="w-full h-64 object-cover rounded-lg shadow-md" />
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Performance</h2>
          <p className="mb-4"><span className="font-semibold">Engine:</span> {selectedCar.engine} {selectedCar.engine === '1.8L' ? 'inline-4' : ''}, delivering a balanced mix of power and efficiency. This engine type is known for its reliability and smooth operation, making it ideal for daily driving and spirited weekend runs.</p>
          <p className="mb-4"><span className="font-semibold">Horsepower:</span> {selectedCar.hp} HP, providing ample power for a car of its class. This output ensures quick acceleration and responsive performance, especially in mid-range speeds.</p>
          <p><span className="font-semibold">Fuel Efficiency:</span> {selectedCar.mileage}. These figures represent a good balance between performance and economy, making the {selectedCar.name} a practical choice for both urban commutes and longer journeys.</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Design</h2>
          <p className="mb-4"><span className="font-semibold">Exterior:</span> The {selectedCar.name} features a sleek, aerodynamic design with sharp lines and a low-slung profile. Its distinctive front fascia and swept-back headlights contribute to its sporty appearance, while the rear design enhances both aesthetics and functionality.</p>
          <p><span className="font-semibold">Interior:</span> The cabin is driver-focused, with a layout that puts all controls within easy reach. The seats provide good support during cornering, while still offering comfort for longer drives. The use of quality materials and thoughtful ergonomics elevates the overall driving experience.</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Legacy</h2>
          <p className="mb-4">{selectedCar.description}</p>
          <p>Manufactured by {selectedCar.manufacturer}, the {selectedCar.name} has made a significant impact in its segment. It has been praised for its reliability, performance, and driving dynamics. The {selectedCar.name}'s popularity among enthusiasts speaks to its enduring appeal and significance in automotive history.</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Forum</h2>
          <div className="mb-6">
            {selectedCar.comments.length > 0 ? (
              selectedCar.comments.map(comment => (
                <div key={comment.id} className="border-b border-gray-200 py-4">
                  <p className="text-sm text-gray-600 mb-1">{comment.date}</p>
                  <p className="font-semibold mb-2">{comment.author}</p>
                  <p>{comment.content}</p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-700 mb-2">Add a Comment</h3>
            <p className="text-sm text-gray-500 mb-2">This feature is currently only available for employees and logged-in members.</p>
            <textarea name="comment" className="w-full p-2 border border-gray-300 rounded-lg mb-2" rows="4" placeholder="Enter your comment here..." disabled></textarea>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg opacity-50 cursor-not-allowed" disabled>Submit Comment</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;
