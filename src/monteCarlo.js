import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function MonteCarloPage() {
  const [selectedIndicator, setSelectedIndicator] = React.useState(null);
  const [showAllIndicators, setShowAllIndicators] = React.useState(false);

  const indicators = [
    {
      name: 'Monte Carlo Simulation',
      description: 'Here Monte Carlo is used to predict future price levels and trade toward them, setting a target and a stop-loss. It\'s result alone depends on the requested prediciton horizon (in hours) and the pas hours data on them it is fed. An example of result can be seen below, a backtest simulation on BTC from 2024JAN till 2024SEP:',
      pnl: 'View more by navigating to the main documentation page.',
      photo:'/images/monteCarloExample.jpeg'
    },
    {
        name: 'GBM Simulations',
        description: 'To be documented after backtests...',
        pnl: 'View more by navigating to the main documentation page.',
        photo:''
      },
      {
        name: 'GBM + MonteCarlo Simulations',
        description: 'To be documented after backtests...',
        pnl: 'View more by navigating to the main documentation page.',
        photo:''
      },
    {
      name: 'Monte Carlo + RSI',
      description: 'To be documented after backtests...',
      pnl: 'View more by navigating to the main documentation page.',
      photo:''
    },
    {
      name: 'Monte Carlo + Bollinger Bands',
      description: 'To be documented after backtests...',
      pnl: 'View more by navigating to the main documentation page.',
      photo: ''
    },
    {
      name: 'Monte Carlo + MACD',
      description: 'To be documented after backtests...',
      pnl: 'View more by navigating to the main documentation page.',
      photo:''
    },
    {
      name: 'Monte Carlo + Moving Average',
      description: 'To be documented after backtests...',
      pnl: 'View more by navigating to the main documentation page.',
      photo:''
    },
    {
        name: 'GBM + RSI',
        description: 'To be documented after backtests...',
        pnl: 'View more by navigating to the main documentation page.',
        photo:''
      },
      {
        name: 'GBM + Bollinger Bands',
        description: 'To be documented after backtests...',
        pnl: 'View more by navigating to the main documentation page.',
        photo: ''
      },
      {
        name: 'GBM + MACD',
        description: 'To be documented after backtests...',
        pnl: 'View more by navigating to the main documentation page.',
        photo:''
      },
      {
        name: 'GBM + Moving Average',
        description: 'To be documented after backtests...',
        pnl: 'View more by navigating to the main documentation page.',
        photo:''
      },
      {
        name: 'Monte Carlo + GBM + RSI',
        description: 'To be documented after backtests...',
        pnl: 'View more by navigating to the main documentation page.',
        photo:''
      },
      {
        name: 'Monte Carlo + GBM + Bollinger Bands',
        description: 'To be documented after backtests...',
        pnl: 'View more by navigating to the main documentation page.',
        photo: ''
      },
      {
        name: 'Monte Carlo + GBM + MACD',
        description: 'To be documented after backtests...',
        pnl: 'View more by navigating to the main documentation page.',
        photo:''
      },
      {
        name: 'Monte Carlo + GBM + Moving Average',
        description: 'To be documented after backtests...',
        pnl: 'View more by navigating to the main documentation page.',
        photo:''
      },
  ];

  const handleIndicatorChange = (event) => {
    setSelectedIndicator(indicators.find(ind => ind.name === event.target.value));
    const element = document.getElementById(event.target.value);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleShowAllIndicators = () => {
    setShowAllIndicators(!showAllIndicators);
  };

  const displayedIndicators = showAllIndicators ? indicators : indicators.slice(0, 3);

  return (
    <div className="min-h-screen bg-blue-50 text-blue-900 font-sans">
      <nav className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex items-center">
          <Link to="/economyProject">
            <button className="mr-4">
              <i className="fas fa-arrow-left"></i> Back
            </button>
          </Link>
          <h1 className="text-xl font-bold">Monte Carlo Simulation & Indicators</h1>
        </div>
      </nav>

      <main className="container mx-auto mt-8 px-4">
        <h2 className="text-3xl font-bold mb-4">Project Overview</h2>
        <p className="mb-8">
          Monte Carlo simulations are invaluable tools in crypto futures trading, enabling traders to predict the potential range of price movements over a period of time. By running thousands of simulated price paths, it provides a probabilistic understanding of the future, thus helping traders to assess risk, set leverage, and optimize trading strategies. We personally are gonna use it as a signal generating system, and as a reversed hedge guide (we are gonna trade the zones).The tests and simulations ran on it are yet to be recorded in a database. But we shouldn't leave this tool outside. Personally I believe it has to work as seperate project, but can also assist other indicators on decision making (checking allignment).
        </p>
        <p className="mb-8">
            Of course the same applies for its relative, the Geometric Brownian Motion, which till now has no page dedicated to it and wil be displayed here. 
        </p>
        <p className="mb-8">
            Also be noted that not all possible combinations of Monte Carlo, GBM and other Indicators are present here, but our job is to test all of them. 
        </p>

        {/* Placeholder for Monte Carlo image */}
        <div className="mb-8">
          <img 
            src='/images/monteCarloPlot.png' 
            alt="Monte Carlo Simulation Example" 
            className="w-full h-auto rounded-lg shadow-md"
          />
          <p className="text-center mt-2 text-gray-600">Fig 1: Monte Carlo simulation predicting BTC futures price movements</p>
        </div>

        <div className="mb-8">
          <select 
            className="w-full md:w-64 p-2 border border-blue-300 rounded"
            onChange={handleIndicatorChange}
            name="indicator-select"
          >
            <option value="">Select an Indicator</option>
            {displayedIndicators.map((ind, index) => (
              <option key={index} value={ind.name}>{ind.name}</option>
            ))}
            {!showAllIndicators && (
              <option value="" onClick={toggleShowAllIndicators}>View More</option>
            )}
          </select>
        </div>

        <div className="space-y-8">
          {indicators.map((ind, index) => (
            <div key={index} id={ind.name} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">{ind.name}</h3>
              <p className="mb-4">{ind.description}</p>
              
              {/* Placeholder for each indicator's performance chart */}
              <div className="mb-4">
                <img 
                  src={`${ind.photo}`} 
                  alt={`${ind.name} Performance Chart`} 
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>

              <p className="font-bold">Results: <span className="text-green-600">{ind.pnl}</span></p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Export the component so it can be used in other parts of the app
export default MonteCarloPage;
