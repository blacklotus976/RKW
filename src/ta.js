import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function TAPage() {
  const [selectedIndicator, setSelectedIndicator] = React.useState(null);
  const [showAllIndicators, setShowAllIndicators] = React.useState(false);

  const indicators = [
    {
      name: 'Bjordum',
      description: 'This strange algorithm is based on huge volumes shifts. It rarely trades (once or twice a month), but keeps also the highest success rate. On BTC it keeps a score of 2272% (20x leveraged) NET profit, with avg profit per trade 24%, and just 96 trades. On ETH is scored a 2400% NET but with 15% avg profit per trade. Both simulations were from 2021JAN 2024SEP.',
      pnl: 'View More by navigating to main page documentation.',
      photo: ''
    },
    {
      name: 'Bjordum Key Levels',
      description: 'Similar to bjordum above, but faster and with a LOT more trades, this beauty can score up to 11 123% NET in LTC simulations (from 2021JAN) but has low avg profit per trade, making it a risky investment. Highest avg profit per trade observed is 10% on coin TAO on a simulation from 2022JAN. Is considered a RISK and to be used cautiously.',
      pnl: 'View More by navigating to main page documentation.',
      photo: ''
    },
    {
      name: 'Adaptive Trend Filter',
      description: 'Again like the KeyLevels variant of bjordum, this scores better at alt coins, specially TAO. In a simulation from 2022JAN it scored 4747% NET with 15% avg profit per trade. Although its best run was AVAX from 2022JAN providing a clean 9K%, witha vg profit per trade around 6%. Great Caution is suggested.',
      pnl: 'View More by navigating to main page documentation.',
      photo: ''
    },
    {
      name: 'Laugerre Multi Filter',
      description: 'Again a indicator for coins of lesser status, this one proved compatible with BNB from 2022JAN, giving a clean 4700% with avg profit per trade 10%. It won\'t do any better and its use is recommended in Combination with others.',
      pnl: 'View More by navigating to main page documentation.',
      photo: ''
    },
    {
      name: 'RSI + MACD',
      description: 'To be documented after backtests...',
      pnl: 'Currently unavailable...',
      photo: ''
    },
    {
      name: 'Moving Average Crossover',
      description: 'To be documented after backtests...',
      pnl: 'Currently unavailable...',
      photo: ''
    },
    {
      name: 'Bollinger Bands',
      description: 'To be documented after backtests...',
      pnl: 'Currently unavailable...',
      photo: ''
    },
    {
      name: 'Siimple Moving Average',
      description: 'All I have to offer now are some results of some simulations and a heatmap. The indicator indicates a direction, and a user is called to manually set target and stoploss. so the heatmap matches a pair of target and stoploss to a respective outcome (net results). To be further documented after backtests...',
      pnl: 'Currently unavailable...',
      photo: '/images/sma_results.jpg',
      photo1: '/images/sma_heatmap.jpg'
    }
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
          <h1 className="text-xl font-bold">Technical Analysis Project</h1>
        </div>
      </nav>

      <main className="container mx-auto mt-8 px-4">
        <h2 className="text-3xl font-bold mb-4">Project Overview</h2>
        <p className="mb-8">
          Here is a list of trading indicators and their respesctive results. 
          Select an indicator from the dropdown to view more details.
        </p>

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
              <p className="font-bold">Extras: <span className="text-green-600">{ind.pnl}</span></p>
              {/* Placeholder for model-specific images */}
              <div className="mb-4">
                <img 
                  src={`${ind.photo}`} 
                  className="w-full h-auto rounded-lg shadow-md"
                />
               
              </div>
              <div className="mb-4">
                <img 
                  src={`${ind.photo1}`} 
                  className="w-full h-auto rounded-lg shadow-md"
                />

              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Export the component so it can be used in other parts of the app
export default TAPage;
