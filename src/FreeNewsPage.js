import React from 'react';
import { Link } from 'react-router-dom';

function FreeNewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold font-roboto">FreeNews</Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/login" className="hover:underline font-roboto">Login</Link></li>
              <li><a href="#" className="hover:underline font-roboto">More Options</a></li>
              <li><Link to="/" className="hover:underline font-roboto">Main Page</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="max-w-4xl bg-white rounded-2xl shadow-xl p-10 space-y-8">
          <h1 className="text-5xl font-bold text-center mb-6 font-roboto text-blue-600">Welcome to FreeNews</h1>
          
          <p className="text-xl mb-6 font-crimson-text text-gray-700 leading-relaxed">
            FreeNews is a revolutionary service that brings you articles from newspapers all around the world, offering a unique perspective on global events.
          </p>
          
          <div className="bg-blue-50 rounded-xl p-6 shadow-inner">
            <h2 className="text-3xl font-semibold mb-4 font-roboto text-blue-700">What We Do:</h2>
            
            <ul className="list-none space-y-2 mb-4 font-crimson-text">
              <li className="flex items-center"><i className="fas fa-globe-americas text-blue-500 mr-2"></i> Collect articles from diverse international sources</li>
              <li className="flex items-center"><i className="fas fa-balance-scale text-blue-500 mr-2"></i> Analyze content for objectivity and bias</li>
              <li className="flex items-center"><i className="fas fa-chart-bar text-blue-500 mr-2"></i> Provide a "Propaganda Index" for each article</li>
              <li className="flex items-center"><i className="fas fa-unlock text-blue-500 mr-2"></i> Offer free access to information for global readers</li>
            </ul>
          </div>
          
          <p className="text-lg mb-6 font-crimson-text text-gray-700">
            Our Propaganda Index is a unique feature that measures how objective and factual an article is. It's based on the use of adjectives and overall tone, helping you discern balanced reporting from potentially biased content.
          </p>
          
          <div className="bg-indigo-50 rounded-xl p-6 shadow-inner">
            <h2 className="text-2xl font-semibold mb-4 font-roboto text-indigo-700">Project History</h2>
            <p className="text-lg font-crimson-text text-gray-700 mb-4">
              FreeNews was founded in 2020 with the vision of creating a truly unbiased news platform. Since then, we've grown to cover over 100 countries and 50 languages, continuously improving our AI-driven analysis tools.
            </p>
          </div>
          
          <div className="bg-green-50 rounded-xl p-6 shadow-inner">
            <h2 className="text-2xl font-semibold mb-4 font-roboto text-green-700">Software Version</h2>
            <p className="text-lg font-crimson-text text-gray-700 mb-4">
              Current version: 2.5.1 (Released June 2023)
            </p>
            <p className="text-lg font-crimson-text text-gray-700">
              For advanced search capabilities, download our desktop application:
            </p>
            <a href="/download" className="inline-block mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded-full hover:bg-green-700 transition duration-300 font-roboto">
              Download FreeNews Advanced <i className="fas fa-download ml-2"></i>
            </a>
            <p className="text-sm font-crimson-text text-red-500 mt-2">
              Don't click, they don't lead anywhere, not yet developed
            </p>
          </div>
          
          <div className="text-center mt-8">
            <a href="https://www.freenews.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300 font-roboto text-lg">
              Visit FreeNews Official Page <i className="fas fa-external-link-alt ml-2"></i>
            </a>
            <p className="text-sm font-crimson-text text-red-500 mt-2">
              Don't click, they don't lead anywhere, not yet developed
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <span className="font-roboto">&copy; 2023 FreeNews</span>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:underline font-roboto">Terms of Service</a></li>
              <li><a href="#" className="hover:underline font-roboto">Privacy Policy</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default FreeNewsPage;
