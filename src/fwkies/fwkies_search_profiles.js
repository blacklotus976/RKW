import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function FwkiesSearchProfiles() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const navigate = useNavigate();

  const users = [
    { id: 1, name: 'John Doe', picture: '/user1.jpg', bio: 'John Doe is a passionate writer and technology enthusiast.' },
    { id: 2, name: 'Jane Smith', picture: '/user2.jpg', bio: 'Jane Smith is an artist and musician who loves expressing creativity through different mediums.' },
    { id: 3, name: 'Alice Johnson', picture: '/user3.jpg', bio: 'Alice Johnson is a scientist and culinary enthusiast with a passion for discovery and innovation.' },
    // More users...
  ];

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const results = users.filter(user => user.name.toLowerCase().includes(term));
    setSearchResults(results);
  };

  const displayedProfiles = searchTerm ? searchResults : users;

  const handleProfileClick = (user) => {
    navigate('/fwkies_view_profile', {
      state: {
        profileData: {
          photo: user.picture,
          username: user.name,
          biography: user.bio
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="bg-black text-white p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex space-x-4">
              <Link to="/homepage" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 cursor-not-allowed">Homepage</Link>
              <Link to="/fwkies_aggelies" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300">Aggelies</Link>
              <Link to="/fwkies_search" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300">SearchArticles</Link>
              <Link to="/fwkies_search_profiles" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 cursor-not-allowed">SearchProfiles</Link>
              <Link to="/fwkies_profile" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300">Profile</Link>
              <Link to="/fwkies_messages" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300">Messages</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto mt-8 bg-white text-black p-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-2 border border-black rounded bg-white text-black"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="mt-4">
          {displayedProfiles.map(user => (
            <div 
              key={user.id} 
              className="flex items-center p-2 border-b border-black hover:bg-gray-100 cursor-pointer"
              onClick={() => handleProfileClick(user)}
            >
              <img src={user.picture} alt={`Profile picture of ${user.name}`} className="w-12 h-12 rounded-full mr-4" />
              <span>{user.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FwkiesSearchProfiles;
