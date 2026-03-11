import React, { useState } from 'react';

function EconomyMain() {
  // State to hold the total profit
  const [totalProfit, setTotalProfit] = useState(12500);

  return React.createElement(
    'div',
    { className: 'bg-white min-h-screen font-roboto' },
    // Navigation Bar
    React.createElement(
      'nav',
      { className: 'bg-blue-600 p-4' },
      React.createElement(
        'button',
        {
          className: 'bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300',
          onClick: () => alert('Navigating to another page!'),
        },
        'Go to Another Page'
      )
    ),
    // Main Content
    React.createElement(
      'main',
      { className: 'container mx-auto px-4 py-8' },
      React.createElement(
        'h1',
        { className: 'text-3xl font-bold text-blue-800 mb-8' },
        'Our Trading Strategies'
      ),
      // Custom Hedge Trading Strategies
      React.createElement(
        'section',
        { className: 'mb-12' },
        React.createElement(
          'h2',
          { className: 'text-2xl font-semibold text-blue-700 mb-4' },
          '1. Custom Hedge Trading Strategies'
        ),
        React.createElement(
          'p',
          { className: 'text-gray-700 mb-4' },
          'Our custom hedge trading strategies are designed to minimize risk and maximize returns. By carefully balancing long and short positions, we aim to profit in various market conditions.'
        ),
        React.createElement(
          'div',
          { className: 'bg-gray-100 p-4 rounded-lg' },
          React.createElement('img', {
            src: '/images/hedge-strategy-graph.jpg',
            alt: 'Graph showing recent wins from custom hedge trading strategy',
            className: 'w-full h-auto mb-2',
          }),
          React.createElement(
            'p',
            { className: 'text-sm text-gray-600' },
            'Caption: This graph demonstrates our recent wins using custom hedge strategies, showing consistent positive returns over the past month.'
          )
        )
      ),
      // Iron Butterfly Trading Strategy
      React.createElement(
        'section',
        { className: 'mb-12' },
        React.createElement(
          'h2',
          { className: 'text-2xl font-semibold text-blue-700 mb-4' },
          '2. Iron Butterfly Trading Strategy in Options'
        ),
        React.createElement(
          'p',
          { className: 'text-gray-700 mb-4' },
          'The Iron Butterfly strategy is a low-risk options trading technique that profits from low volatility in the underlying asset. It involves simultaneously buying and selling calls and puts with different strike prices.'
        ),
        React.createElement(
          'div',
          { className: 'bg-gray-100 p-4 rounded-lg' },
          React.createElement('img', {
            src: '/images/iron-butterfly-graph.jpg',
            alt: 'Graph illustrating the profit potential of Iron Butterfly strategy',
            className: 'w-full h-auto mb-2',
          }),
          React.createElement(
            'p',
            { className: 'text-sm text-gray-600' },
            'Caption: This graph shows the potential profit and loss scenarios for our Iron Butterfly strategy, highlighting its effectiveness in range-bound markets.'
          )
        )
      ),
      // Neural Network and Linear Model Trading Strategy
      React.createElement(
        'section',
        { className: 'mb-12' },
        React.createElement(
          'h2',
          { className: 'text-2xl font-semibold text-blue-700 mb-4' },
          '3. Neural Network and Linear Model Trading Strategy'
        ),
        React.createElement(
          'p',
          { className: 'text-gray-700 mb-4' },
          'Our advanced AI-powered trading strategy combines neural networks and linear models to predict market movements and execute trades with high accuracy.'
        ),
        React.createElement(
          'div',
          { className: 'bg-gray-100 p-4 rounded-lg' },
          React.createElement('img', {
            src: '/images/neural-network-graph.jpg',
            alt: 'Graph showing the performance of neural network and linear model trading strategy',
            className: 'w-full h-auto mb-2',
          }),
          React.createElement(
            'p',
            { className: 'text-sm text-gray-600' },
            'Caption: This graph compares the performance of our AI-powered strategy against traditional trading methods, demonstrating superior returns over time.'
          )
        )
      ),
      // ARIMA Time Series Trading Results
      React.createElement(
        'section',
        { className: 'mb-12' },
        React.createElement(
          'h2',
          { className: 'text-2xl font-semibold text-blue-700 mb-4' },
          '4. ARIMA Time Series Trading Results'
        ),
        React.createElement(
          'p',
          { className: 'text-gray-700 mb-4' },
          'ARIMA (AutoRegressive Integrated Moving Average) is a statistical analysis model we use to forecast future trends based on historical data, allowing us to make informed trading decisions.'
        ),
        React.createElement(
          'div',
          { className: 'bg-gray-100 p-4 rounded-lg' },
          React.createElement('img', {
            src: '/images/arima-results-graph.jpg',
            alt: 'Graph displaying trading results using ARIMA time series analysis',
            className: 'w-full h-auto mb-2',
          }),
          React.createElement(
            'p',
            { className: 'text-sm text-gray-600' },
            'Caption: This graph showcases the accuracy of our ARIMA model predictions and the resulting profitable trades over the past quarter.'
          )
        )
      ),
      // Display Week's Total Profit
      React.createElement(
        'div',
        { className: 'bg-blue-100 p-6 rounded-lg' },
        React.createElement(
          'h2',
          { className: 'text-2xl font-semibold text-blue-800 mb-2' },
          "Week's Total Profit"
        ),
        React.createElement(
          'p',
          { className: 'text-4xl font-bold text-orange-500' },
          `$${totalProfit.toLocaleString()}`
        )
      )
    )
  );
}

export default EconomyMain;
