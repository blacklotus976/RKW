import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const EconomyProject = () => {
  const projects = [
    { name: 'HFT-ANH', review: 'Custom hedge trading system. High Efficient (in simulation and backtesting levels). Extreme High Frequent->Entry problems', profits: 'Simulated only. Explore more by viewing the page.', path: '/economyproject/anh' },
    { name: 'HFT Siben/Siba', review: 'Better than ANH strategies. Not hedge, finds direction, huge profits but too much HFT. ENTRY PROBLEMS, haven\'t made the page yet', profits: 'Simulated only. Explore more by viewing the page.', path: '/economyproject/siba_siben' },
    { name: 'Monte Carlo', review: 'Monte Carlo Simulation-based approach for Futures Trading!.', profits: 'Simulated only. Explore more by viewing the page.', path: '/economyproject/MCPage' },
    { name: 'Time Series', review: 'Predictive modeling using ARIMA (and GARCH-) fed on historical data patterns.', profits: 'Simulated only. Explore more by viewing the page.', path: '/economyproject/timeseries' },
    { name: 'Technical Analysis', review: 'This is actually interesting. We have reliable methods to backtest, over a course of many months, any trading strategy based on combinations of Technical Analysis\' indicators. You can view the results we have found for free and request special testing in your own strategies (paid service) by clicking below.', profits: 'We believe TA doesn\'t work. Though we will be pleased to be proven wrong.', path: '/economyProject/TAPage' },
    { name: 'Arbitrage Trading', review: 'We implemented classical trading algorithms and strategies, like arbitrage graph (pairs of coins, we search for cycle, Bellman-Ford) and statistical arbitrage (effects only on BTC/ETH)!', profits: 'not available here', path: '/economyproject/arbitrage' },
    { name: 'Options Trading strategies', review: 'Efficient usage of different high level options strategies like the Iron Butterfly. Advanced filtering using volume, volatility etc.', profits: 'Yet to be developed!', path: '/economyproject/options' },
    { name: 'Trapped Sellers/Buyers strategy', review: '...', profits: 'Yet to be developed!', path: '/economyproject/trap' },
    
  ];

  const totalPnLThisWeek = 'NOT YET IMPLEMENTED';

  return (
    <div className="bg-blue-900 text-white min-h-screen p-6">      
      <Link to="/products">
        <button className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          <i className="fas fa-arrow-left mr-2"></i>Return to Previous Page
        </button>
      </Link>
      <Link to="/economyproject/db">
        <button className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          <i className="fas fa-arrow-left mr-2"></i>See db 
        </button>
      </Link>

      <h1 className="text-4xl font-bold mb-12 text-center mt-20">Project Showcase</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {projects.map((project, index) => (
          <div key={index} className="bg-white text-blue-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
            <p className="mb-3">{project.review}</p>
            <p className="font-semibold mb-4">Recent profits: {project.profits}</p>
            <Link to={project.path}>
              <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                View More
              </button>
            </Link>
          </div>
        ))}
      </div>

      <div className="bg-white text-blue-900 p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-3xl font-bold mb-2">Total PnL This Week</h2>
        <p className="text-4xl font-semibold">{totalPnLThisWeek}</p>
      </div>
    </div>
  );
};

export default EconomyProject;
