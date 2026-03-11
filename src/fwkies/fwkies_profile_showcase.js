import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

// Default profile data
const DEFAULT_PROFILE_DATA = {
  photo: "/profile-picture.jpg",
  username: "GIOR MEL",
  biography: `John Doe is a passionate writer and technology enthusiast. With a background in computer science and a love for storytelling, John combines his technical expertise with creative writing to produce engaging content on various topics.`,
  interests: ["Technology", "Writing", "Travel"],
  articles: [
    {
      title: "The Future of AI",
      description: "An exploration of artificial intelligence and its potential impact on society.",
      link: "#",
    },
    {
      title: "Traveling on a Budget",
      description: "Tips and tricks for exploring the world without breaking the bank.",
      link: "#",
    },
    {
      title: "The Art of Storytelling",
      description: "Techniques for crafting compelling narratives in the digital age.",
      link: "#",
    },
  ],
};

// Simulated network status for the default user
const DEFAULT_NETWORK_STATUS = "blocked"; // Options: "friends", "blocked", "sent", "unknown"

const renderProfileData = (data) => {
  const {
    photo = DEFAULT_PROFILE_DATA.photo,
    username = DEFAULT_PROFILE_DATA.username,
    biography = DEFAULT_PROFILE_DATA.biography,
  } = data || {};

  return (
    <div className="flex flex-col items-center mb-8">
      <img
        src={photo}
        alt={`Profile picture of ${username}`}
        className="w-32 h-32 rounded-full mb-4"
      />
      <h1 className="text-3xl font-bold">{username}</h1>
      <p className="text-gray-700">{biography}</p>
    </div>
  );
};

const renderArticles = (articles) => {
  if (!articles || articles.length === 0) {
    return <p className="text-gray-700">No articles available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {articles.map((article, index) => (
        <div key={index} className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl font-semibold mb-2">
            <a href={article.link} className="text-blue-500 hover:underline">{article.title}</a>
          </h3>
          <p className="text-gray-600">{article.description}</p>
        </div>
      ))}
    </div>
  );
};

function ViewProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [friendStatus, setFriendStatus] = useState("send");

  const profileToDisplay = location.state?.profileData || DEFAULT_PROFILE_DATA;
  const networkStatus = location.state?.networkStatus || DEFAULT_NETWORK_STATUS;

  const handleNavigate = () => {
    navigate('/fwkies_search_profiles');
  };

  const handleFriendRequest = () => {
    if (friendStatus === "send" || friendStatus === "unknown") {
      setFriendStatus("sent");
    }
  };

  // Determine button state and message based on network status
  const renderFriendRequestButton = () => {
    switch (networkStatus) {
      case "friends":
        return (
          <button className="px-6 py-2 text-lg rounded-full font-semibold bg-gray-200 cursor-default">
            Friends
          </button>
        );
      case "blocked":
        return (
          <button className="px-6 py-2 text-lg rounded-full font-semibold bg-gray-200 cursor-default">
            Blocked
          </button>
        );
      case "sent":
        return (
          <button className="px-6 py-2 text-lg rounded-full font-semibold bg-gray-200 cursor-default">
            Friend Request Sent
          </button>
        );
      default: // For "unknown" or new users
        return (
          <button
            onClick={handleFriendRequest}
            className="px-6 py-2 text-lg rounded-full font-semibold bg-blue-500 text-white hover:bg-blue-600"
          >
            Send Friend Request
          </button>
        );
    }
  };

  return (
    <div className="bg-white text-black min-h-screen font-sans">
      <nav className="bg-black text-white p-4">
        <button className="text-lg" onClick={handleNavigate}>
          <i className="fas fa-arrow-left mr-2"></i>
          Back
        </button>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {renderProfileData(profileToDisplay)}

        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div>
            <h3 className="text-lg font-semibold">Network Status</h3>
            {renderFriendRequestButton()}
          </div>
          {networkStatus === "friends" && (
            <button className="px-6 py-2 text-lg rounded-full font-semibold bg-gray-300 hover:bg-gray-400">
              Message
            </button>
          )}
        </div>

        <section className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Articles</h2>
          {renderArticles(profileToDisplay.articles)}
        </section>
      </main>
    </div>
  );
}

export default ViewProfile;
