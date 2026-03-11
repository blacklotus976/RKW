import React from "react";
import { Link } from "react-router-dom";
import Popup from './Popup'; // Import the Popup component

function MainComponent() {
  const [sortBy, setSortBy] = React.useState("newest");
  const [showCount, setShowCount] = React.useState(3);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(true); // State to manage popup visibility

  const articles = [
    // Your article data here...
    { id: 1, title: "Ο Λουις ειναι μια μεγαλη μαρμοτα", date: "2023-06-01", summary: "Αντι για εξυπνο υδροχοιρο η εξυπνη παπια ο Λουις μας βγηκε παραδοσιακη μαρμοτα. τι να κανει κανεις, βαρεθηκα να γραφω παραδειγματα τα υπολοιπα ειναι απο ΑΙ: Exploring the potential impact of artificial intelligence on various industries." },
    { id: 2, title: "Sustainable Energy Solutions", date: "2023-05-28", summary: "Innovative approaches to renewable energy and their role in combating climate change." },
    { id: 3, title: "Cybersecurity in the Digital Age", date: "2023-05-25", summary: "Understanding the importance of robust cybersecurity measures in our increasingly connected world." },
    { id: 4, title: "The Rise of Quantum Computing", date: "2023-05-22", summary: "Exploring the potential of quantum computing and its implications for various fields." },
    { id: 5, title: "Biotechnology Breakthroughs", date: "2023-05-19", summary: "Recent advancements in biotechnology and their potential to revolutionize healthcare." },
  ];

  const sortedArticles = [...articles].sort((a, b) =>
    sortBy === "newest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  const displayedArticles = sortedArticles.slice(0, showCount);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-50 font-sans">
      {showPopup && (
        <Popup
          message="This is a test website for frontend skills development. It's an empty cell. It has no backend to count on. This is a display only, an exhibition. However, all the ideas and products shared are reserved to the developer of the page and the RKW company. Don't steal ideas. We will sue."
          onClose={closePopup}
        />
      )}

      <header className="bg-blue-900 text-white p-4 sticky top-0 z-10">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">RacingKrankenwagen</div>
          <ul className="flex space-x-4">
            <li>
              <Link to="/login" className="hover:text-blue-200">Login</Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-blue-200">Explore Products</Link>
            </li>
            <li>
              <button className="hover:text-blue-200">Who We Are</button>
            </li>
            <li className="relative">
              <button onClick={toggleDropdown} className="hover:text-blue-200">
                More <i className="fas fa-chevron-down"></i>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <Link to="/rkw-sw" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Visit RKW SW
                  </Link>
                  <Link to="/fleeet" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    See our fleet
                  </Link>
                  <Link to="/devs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    About our Developers
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            Welcome to RacingKrankenwagen
          </h1>
          <p className="text-xl text-blue-600">
            Innovating for a better tomorrow
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              Our Mission
            </h2>
            <p className="text-blue-900">
              We strive to create innovative solutions that make a positive
              impact on people's lives and the world around us.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              <Link to="/products" className="text-blue-700 hover:text-blue-500">
                Our Products
              </Link>
            </h2>
            <p className="text-blue-900">
              Discover our range of cutting-edge products designed to meet your
              needs and exceed your expectations.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              Join Us
            </h2>
            <p className="text-blue-900">
              Be part of our journey. Explore career opportunities and help us
              shape the future of technology.
            </p>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-blue-700 mb-6">
            Community
          </h2>
          <div className="flex justify-between items-center mb-4">
            <div>
              <label htmlFor="sortBy" className="mr-2">
                Sort by:
              </label>
              <select
                id="sortBy"
                name="sortBy"
                className="border rounded p-1"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
            <div>
              <label htmlFor="showCount" className="mr-2">
                Show:
              </label>
              <select
                id="showCount"
                name="showCount"
                className="border rounded p-1"
                value={showCount}
                onChange={(e) => setShowCount(Number(e.target.value))}
              >
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className="space-y-6">
            {displayedArticles.map((article) => (
              <div key={article.id} className="border-b pb-4 last:border-b-0">
                <h3 className="text-xl font-semibold text-blue-600">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{article.date}</p>
                <p className="text-blue-900">{article.summary}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-blue-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>&copy; 2023 RacingKrankenwagen. All rights reserved.</div>
          <ul className="flex space-x-4">
            <li>
              <Link to="/privacy-policy" className="hover:text-blue-200">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="hover:text-blue-200">Terms of Service</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-200">Contact Us</Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default MainComponent;
