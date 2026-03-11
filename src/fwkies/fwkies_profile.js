import React from 'react';
import { Link } from 'react-router-dom';

function FwkiesProfile() {
  // Sample data for testing
  const username = "blackLotous976";
  const shortBio = "Avid coder, tech enthusiast, and coffee lover -- slash// avg Selbstmord Begehender.";
  const articles = [
    { id: 1, title: "Ich bin hier ich bin Da, ich bin tralala" },
    { id: 2, title: "Thoughts on React: Gamietai!!!!" },
    { id: 3, title: "Lol tralathikaaaaa" },
  ];

  return React.createElement(
    'div',
    { className: 'flex flex-col min-h-screen bg-white text-black font-sans' },

    React.createElement(
      'header',
      { className: 'bg-black text-white p-4' },
      React.createElement(
        'nav',
        { className: 'flex justify-center space-x-6' },
        React.createElement(Link, { to: '/fwkies_homepage_logged_in', className: 'hover:underline' }, 'Homepage'),
        React.createElement(Link, { to: '/fwkies_search', className: 'hover:underline' }, 'SearchArticles'),
        React.createElement(Link, { to: '/fwkies_search_profiles', className: 'hover:underline' }, 'SearchProfiles'),
        React.createElement(Link, { to: '/fwkies_aggelies', className: 'hover:underline' }, 'Aggelies'),
        React.createElement(Link, { to: '/fwkies_messages', className: 'hover:underline' }, 'Messages'),
        React.createElement('span', { className: 'opacity-50' }, 'Profile')
      )
    ),

    React.createElement(
      'div',
      { className: 'flex flex-grow' },

      React.createElement(
        'main',
        { className: 'w-3/4 p-6' },

        // User Info Section
        React.createElement(
          'div',
          { className: 'mb-8' },
          React.createElement('h1', { className: 'text-2xl font-bold mb-2' }, `Username: ${username}`),
          React.createElement('p', { className: 'text-lg text-gray-700' }, shortBio)
        ),

        // Articles Section
        React.createElement('h1', { className: 'text-3xl font-bold mb-6' }, 'Your Articles'),
        React.createElement(
          'div',
          { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' },
          articles.map(article =>
            React.createElement(
              'div',
              { key: article.id, className: 'border border-black p-4' },
              React.createElement('h2', { className: 'text-xl font-semibold mb-2' }, article.title),
              React.createElement(
                'div',
                { className: 'flex justify-between' },
                React.createElement('button', { className: 'text-sm underline' }, 'View Article'),
                React.createElement('button', { className: 'text-sm underline' }, 'Delete')
              )
            )
          )
        )
      ),

      React.createElement(
        'aside',
        { className: 'w-1/4 bg-gray-100 p-6' },
        React.createElement(
          'nav',
          { className: 'flex flex-col space-y-4' },
          React.createElement(Link, { to: '/fwkies_article_upload', className: 'bg-black text-white py-2 px-4 text-center hover:bg-gray-800' }, 'Upload New Article'),
          React.createElement(Link, { to: '/fwkies_profile_settings', className: 'bg-black text-white py-2 px-4 text-center hover:bg-gray-800' }, 'Edit Personal Settings'),
          React.createElement(Link, { to: '/fwkies', className: 'bg-black text-white py-2 px-4 text-center hover:bg-gray-800' }, 'Logout'),
          React.createElement(Link, { to: '/fwkies_report', className: 'bg-black text-white py-2 px-4 text-center hover:bg-gray-800' }, 'Report Something')
        )
      )
    )
  );
}

export default FwkiesProfile;
