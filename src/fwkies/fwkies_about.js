import React from 'react';
import { useNavigate } from 'react-router-dom';

function FwkiesAbout() {
  const navigate = useNavigate();

  return React.createElement(
    'div',
    { className: "min-h-screen bg-white text-black p-8 relative" },
    React.createElement(
      'button',
      {
        onClick: () => navigate('/fwkies'),
        className: "mb-6 px-6 py-3 bg-black text-white rounded-lg shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black transition-transform transform hover:scale-105"
      },
      React.createElement('i', { className: "fas fa-arrow-left mr-2" }),
      "Back"
    ),
    React.createElement('h1', { className: "text-4xl font-bold mb-6 mt-24 text-center" }, "Project Analysis"),
    React.createElement(
      'section',
      { className: "mb-8" },
      React.createElement('h2', { className: "text-2xl font-semibold mb-4" }, "Task Description"),
      React.createElement(
        'p',
        { className: "text-lg leading-relaxed" },
        "Our task was to create a responsive web application that analyzes our project, provides a task description, explains our analysis, and includes information about responsive developers. The design should use React and follow a black and white theme."
      )
    ),
    React.createElement(
      'section',
      { className: "mb-8" },
      React.createElement('h2', { className: "text-2xl font-semibold mb-4" }, "Our Analysis"),
      React.createElement(
        'p',
        { className: "text-lg leading-relaxed" },
        "We implemented a clean, minimalist design using React and a black and white color scheme. The layout is responsive, ensuring optimal viewing on both desktop and mobile devices. We added a back button for easy navigation. The content is structured in clear sections for easy readability and comprehension."
      )
    ),
    React.createElement(
      'section',
      null,
      React.createElement('h2', { className: "text-2xl font-semibold mb-4" }, "Our Responsive Developers"),
      React.createElement(
        'p',
        { className: "text-lg mb-4" },
        "Our team of responsive developers is committed to creating adaptable and user-friendly web applications:"
      ),
      React.createElement(
        'ul',
        { className: "list-disc list-inside text-lg" },
        React.createElement('li', null, "FWKIA 1 - Frontend and Responsive Design Specialist"),
        React.createElement('li', null, "FWKIA 2 - UX/UI Expert with focus on Mobile-First Design"),
        React.createElement('li', null, "FWKIA 3 - Full Stack Developer with Responsive Web App Experience"),
        React.createElement('li', null, "FWKIA 4 - Backend Developer specializing in Scalable Architecture")
      )
    ),
    React.createElement('p', { className: "text-center mt-8 text-lg font-semibold" }, "It's perfect! 👌")
  );
}

export default FwkiesAbout;
