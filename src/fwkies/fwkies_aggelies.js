"use client";
import React from "react";

function JobAdds() {
  // Example hashtags for recommendation filters
  // const recommendationHashtags = ["#Tech", "#Design", "#Marketing"];
  const recommendationHashtags = ['#Tech', 'Football'];

  const [ads, setAds] = React.useState([
    {
      id: 1,
      author: "Company A",
      description: "Software Developer needed",
      postDate: "2024-01-15",
      image: "/job-ad-1.jpg",
      applied: false,
      hashtags: ["#Tech", "#Software"],
    },
    {
      id: 2,
      author: "Company B",
      description: "Marketing Specialist wanted",
      postDate: "2024-01-18",
      image: "/job-ad-2.jpg",
      applied: false,
      hashtags: ["#Marketing", "#SocialMedia"],
    },
    {
      id: 3,
      author: "Company C",
      description: "Data Analyst position open",
      postDate: "2024-01-20",
      image: "/job-ad-3.jpg",
      applied: false,
      hashtags: ["#Tech", "#DataScience"],
    },
    {
      id: 4,
      author: "Company D",
      description: "UX Designer required",
      postDate: "2024-01-22",
      image: "/job-ad-4.jpg",
      applied: false,
      hashtags: ["#Design", "#UX"],
    },
    {
      id: 5,
      author: "Company E",
      description: "Project Manager needed",
      postDate: "2024-01-25",
      image: "/job-ad-5.jpg",
      applied: false,
      hashtags: ["#Management", "#Leadership"],
    },
  ]);

  const [offset, setOffset] = React.useState(10);
  const [isRecommendationsEnabled, setIsRecommendationsEnabled] = React.useState(false);

  // Handle apply button
  const handleApply = (id) => {
    setAds(ads.map((ad) => (ad.id === id ? { ...ad, applied: true } : ad)));
  };

  // Filter ads based on matching recommendation hashtags
  const filterAdsByRecommendations = (ads) => {
    return ads.filter((ad) =>
      ad.hashtags.some((hashtag) => recommendationHashtags.includes(hashtag))
    );
  };

  // Determine ads to display based on recommendation mode
  const displayedAds = isRecommendationsEnabled
    ? filterAdsByRecommendations(ads).slice(0, offset)
    : ads.slice(0, offset);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-3">
          <ul className="flex items-center justify-between">
            <li>
              <a href="/fwkies_homepage_logged_in" className="text-gray-800 font-semibold hover:text-blue-600">
                Homepage
              </a>
            </li>
            <li>
              <span className="text-blue-600 font-semibold">Ads</span>
            </li>
            <li>
              <a href="/fwkies_search" className="text-gray-800 font-semibold hover:text-blue-600">
                SearchArticles
              </a>
            </li>
            <li>
              <a href="/fwkies_search_profiles" className="text-gray-800 font-semibold hover:text-blue-600">
                SearchProfiles
              </a>
            </li>
            <li>
              <a href="/fwkies_messages" className="text-gray-800 font-semibold hover:text-blue-600">
                Messages
              </a>
            </li>
            <li>
              <a href="/fwkies_profile" className="text-gray-800 font-semibold hover:text-blue-600">
                Profile
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main content */}
      <div className="container mx-auto px-6 py-8">
        {/* Recommendations checkbox */}
        <div className="mb-4 flex items-center">
          <label htmlFor="recommendations" className="mr-2 text-lg font-semibold">
            Recommendations:
          </label>
          <input
            type="checkbox"
            id="recommendations"
            checked={isRecommendationsEnabled}
            onChange={(e) => setIsRecommendationsEnabled(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>

        {/* Display recommendation status */}
        {isRecommendationsEnabled && (
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              Showing ads filtered by: {recommendationHashtags.join(", ")}
            </p>
          </div>
        )}

        {/* Ads per page dropdown */}
        <div className="mb-6 flex justify-end">
          <select
            className="bg-white border border-gray-300 rounded-md px-4 py-2"
            value={offset}
            onChange={(e) => setOffset(Number(e.target.value))}
          >
            <option value="2">Show 2</option>
            <option value="5">Show 5</option>
            <option value="10">Show 10</option>
          </select>
        </div>

        {/* Job Ads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedAds.map((ad) => (
            <div key={ad.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={ad.image}
                alt={`Job advertisement for ${ad.description}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{ad.author}</h2>
                <p className="text-gray-600 mb-4">{ad.description}</p>
                <p className="text-sm text-gray-500 mb-4">Posted on: {ad.postDate}</p>
                {/* Display hashtags */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Hashtags: {ad.hashtags.join(" ")}</p>
                </div>
                <button
                  onClick={() => handleApply(ad.id)}
                  className={`w-full py-2 px-4 rounded-md ${
                    ad.applied
                      ? "bg-green-500 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {ad.applied ? "Applied" : "Apply"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobAdds;
