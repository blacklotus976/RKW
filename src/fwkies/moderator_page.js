import React from 'react';
import { Link } from 'react-router-dom'; 
function ModeratorControl() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [date, setDate] = React.useState('');
  const [downloadedData, setDownloadedData] = React.useState(null);
  const [showAllUsers, setShowAllUsers] = React.useState(false);

  const users = [
    { id: 1, name: 'John Doe', bio: 'Software Developer', messages: ['Hello!', 'How are you?'], articles: ['React Best Practices', 'JavaScript Tips'] },
    { id: 2, name: 'Jane Smith', bio: 'UX Designer', messages: ['Great design!', 'Meeting at 3?'], articles: ['UI/UX Trends', 'Design Systems'] },
    { id: 3, name: 'Bob Johnson', bio: 'Data Scientist', messages: ['Data analysis complete', 'Check the results'], articles: ['Machine Learning 101', 'Data Visualization'] }
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserSelect = (user) => {
    if (!selectedUsers.find(u => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleDownload = () => {
    const data = selectedUsers.map(user => ({
      name: user.name,
      bio: user.bio,
      messages: user.messages,
      articles: user.articles
    }));
    setDownloadedData(data);
  };

  // New function to clear the data and reset search
  const handleClear = () => {
    setSearchTerm('');            // Clear the search term
    setSelectedUsers([]);         // Clear selected users
    setDownloadedData(null);      // Clear downloaded data
    setShowAllUsers(false);       // Hide the user list
    setDate('');                  // Clear the selected date
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-white text-black p-4 flex justify-end">
        <Link to="/fwkies">
            <button className="mx-2 font-bold">Logout</button>
        </Link>
      </nav>
      
      <div className="container mx-auto p-4">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Hey there again, moderator!</h2>
          <p className="text-lg">You are able to download and view data about any user that's not a moderator or admin. Use the searchbar below or view all and select. Don't forget to specify the date from when you want to see messages.</p>
        </div>

        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search users..."
            className="flex-grow p-2 text-black mr-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className="bg-white text-black p-2 font-bold" 
            onClick={() => setShowAllUsers(!showAllUsers)}
          >
            {showAllUsers ? 'Hide Users' : 'View All'}
          </button>
        </div>
        
        {showAllUsers && (
          <div className="bg-white text-black p-4 mb-4">
            <h3 className="font-bold mb-2">All Users:</h3>
            {filteredUsers.map(user => (
              <div 
                key={user.id} 
                className="mb-2 cursor-pointer hover:bg-gray-200 p-2"
                onClick={() => handleUserSelect(user)}
              >
                {user.name}
              </div>
            ))}
          </div>
        )}
        
        <div className="bg-white text-black p-4 mb-4">
          <h3 className="font-bold mb-2">Selected Users:</h3>
          {selectedUsers.map(user => (
            <div key={user.id} className="mb-2">{user.name}</div>
          ))}
        </div>
        
        <div className="mb-4">
          <input
            type="date"
            className="p-2 text-black mr-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button className="bg-white text-black p-2 font-bold mr-2" onClick={handleDownload}>Download Data</button>
          {/* Add Clear Button */}
          <button className="bg-red-500 text-white p-2 font-bold" onClick={handleClear}>Clear Data</button>
        </div>
        
        {downloadedData && (
          <div className="bg-white text-black p-4">
            <h3 className="font-bold mb-2">Downloaded Data:</h3>
            {downloadedData.map((data, index) => (
              <div key={index} className="mb-4">
                <h4 className="font-bold">{data.name}</h4>
                <p>Bio: {data.bio}</p>
                <p>Messages: {data.messages.join(', ')}</p>
                <p>Articles: {data.articles.join(', ')}</p>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center text-gray-400 italic">
          <p>We should provide more choices like select which data to download and so on.</p>
        </div>
      </div>
    </div>
  );
}

export default ModeratorControl;
