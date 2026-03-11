import React from 'react';
import { Link } from 'react-router-dom';

function FwkiesSearch() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchType, setSearchType] = React.useState('title');
  const [searchResults, setSearchResults] = React.useState([]);
  const [hasSearched, setHasSearched] = React.useState(false);

  const articles = [
    { id: 1, title: 'React Hooks', author: 'John Doe', content: 'Learn about React Hooks', date: '2023-05-01' },
    { id: 2, title: 'Tailwind CSS', author: 'Jane Smith', content: 'Styling with Tailwind CSS', date: '2023-05-02' },
    { id: 3, title: 'JavaScript ES6', author: 'Bob Johnson', content: 'New features in ES6', date: '2023-05-03' },
    { id: 4, title: 'Node.js Basics', author: 'Alice Brown', content: 'Introduction to Node.js', date: '2023-05-04' },
  ];

  const handleSearch = () => {
    const searchLower = searchTerm.toLowerCase();
    const results = articles.filter(article => {
      if (searchType === 'random') {
        return article.title.toLowerCase().includes(searchLower) ||
               article.author.toLowerCase().includes(searchLower) ||
               article.content.toLowerCase().includes(searchLower) ||
               article.date.includes(searchTerm);
      }
      return article[searchType].toLowerCase().includes(searchLower);
    });
    setSearchResults(results);
    setHasSearched(true);
  };

  return React.createElement(
    'div',
    { className: 'min-h-screen bg-white p-4' },

    React.createElement(
      'div',
      { className: 'flex justify-between items-center mb-8' },
      React.createElement('h1', { className: 'text-2xl font-bold font-sans text-black' }, 'Search ARTICLES Page'),
      React.createElement(
        'nav',
        null,
        React.createElement(
          'ul',
          { className: 'flex space-x-4 font-sans' },
          React.createElement(Link, { to: '/fwkies_homepage_logged_in', className: 'text-black hover:text-gray-700' }, 'Homepage'),
          React.createElement(Link, { to: '/fwkies_aggelies', className: 'text-black hover:text-gray-700' }, 'Aggelies'),
          React.createElement('span', { className: 'text-gray-500' }, 'SearchArticles'),
          React.createElement(Link, { to: '/fwkies_search_profiles', className: 'text-black hover:text-gray-700' }, 'SearchProfiles'),
          React.createElement(Link, { to: '/fwkies_messages', className: 'text-black hover:text-gray-700' }, 'Messages'),
          React.createElement(Link, { to: '/fwkies_profile', className: 'text-black hover:text-gray-700' }, 'Profile')
        )
      )
    ),

    React.createElement(
      'div',
      { className: 'max-w-2xl mx-auto' },

      React.createElement(
        'div',
        { className: 'flex mb-4' },
        React.createElement('input',
          {
            type: 'text',
            name: 'search',
            className: 'flex-grow p-2 border border-black rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 font-sans',
            placeholder: 'Search...',
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value)
          }
        ),
        React.createElement(
          'select',
          {
            name: 'searchType',
            className: 'p-2 border border-black font-sans',
            value: searchType,
            onChange: (e) => setSearchType(e.target.value)
          },
          React.createElement('option', { value: 'title' }, 'Title'),
          React.createElement('option', { value: 'author' }, 'Author'),
          React.createElement('option', { value: 'content' }, 'Content'),
          React.createElement('option', { value: 'date' }, 'Date'),
          React.createElement('option', { value: 'random' }, 'Random')
        ),
        React.createElement(
          'button',
          {
            className: 'bg-black text-white p-2 rounded-r-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 font-sans',
            onClick: handleSearch
          },
          'Search'
        )
      ),

      hasSearched && React.createElement(
        'div',
        { className: 'mt-8' },
        searchResults.length > 0 ? (
          React.createElement(
            'div',
            null,
            React.createElement('h2', { className: 'text-xl font-bold mb-4 font-sans text-black' }, 'Search Results:'),
            React.createElement(
              'ul',
              { className: 'space-y-4' },
              searchResults.map(article =>
                React.createElement(
                  'li',
                  { key: article.id, className: 'bg-gray-100 p-4 rounded-md shadow' },
                  React.createElement('h3', { className: 'text-lg font-bold font-sans text-black' }, article.title),
                  React.createElement('p', { className: 'text-gray-700 font-sans' }, 'Author: ' + article.author),
                  React.createElement('p', { className: 'text-gray-700 font-sans' }, 'Date: ' + article.date),
                  React.createElement('p', { className: 'mt-2 font-sans text-black' }, article.content)
                )
              )
            )
          )
        ) : React.createElement(
          'p',
          { className: 'text-center font-sans text-gray-700' },
          'No results found'
        )
      )
    )
  );
}

export default FwkiesSearch;
