import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function ArbitrageModelsPage() {
  const models = [
    {
      name: 'Statistical Arbitrage',
      description: 'Statistical arbitrage (StatArb) is a trading strategy that uses statistical and mathematical models to identify pricing inefficiencies between pairs or baskets of securities. This method exploits short-term deviations from their historical price relationships. Typically used in equities, it is also applied in crypto markets, capitalizing on price movements among highly correlated assets. Needs to be backtested for different divergence levels. Idylically we need to re-evaluate its whol;e use,a s it can be one of the safest options we have, to just upload it as service and let it do its job.',
      imageAlt: 'Statistical Arbitrage Example',
      photo:''
    },
    {
      name: 'Quant Pair Trading',
      description: 'Quantitative pair trading is a systematic approach to trading two related assets, typically using algorithms and quantitative models to determine when to open or close trades. By analyzing the spread between two highly correlated cryptocurrencies or stocks, this model attempts to profit from price divergence. This again is to betested and applied.',
      imageAlt: 'Quant Pair Trading Example',
      photo:''
    },
    {
      name: 'In-Exchange Arbitrage (Bellman-Ford)',
      description: 'In-exchange arbitrage applies the Bellman-Ford algorithm to detect arbitrage opportunities within a single exchange. It finds price discrepancies across multiple pairs listed on the same exchange. The algorithm identifies arbitrage cycles, allowing traders to execute a sequence of trades that can generate risk-free profit. It is not expected to work as markets nowdays correct themselves too quickly, but a backtest would be interesting.',
      imageAlt: 'In-Exchange Arbitrage Example',
      photo:''
    },
    {
      name: 'Cross-Exchange Arbitrage (Bellman-Ford)',
      description: 'Cross-exchange arbitrage uses the Bellman-Ford algorithm to identify arbitrage opportunities between different cryptocurrency exchanges. By comparing price differences of the same asset across multiple exchanges, traders can buy on the lower-priced exchange and sell on the higher-priced one, profiting from the price gap. It is not expected to worka s tese gaps are there for a short amount of time and the transfer of coins takes time, and fees. But it\'s worth a look.',
      imageAlt: 'Cross-Exchange Arbitrage Example',
      photo:''
    },
    {
      name: 'Triangular Arbitrage',
      description: 'Triangular arbitrage involves exploiting price discrepancies between three different currencies or trading pairs within the same exchange. By moving funds between three assets in a circular trading route (e.g., BTC → ETH → LTC → BTC), traders can profit from slight mispricings between them. It\'s actually a limited form of InExchange Arbitrage using Bellmann Ford...',
      example: 'Example: BTC → ETH → LTC → BTC within Kraken, profiting from exchange rate differences.',
      imageAlt: 'Triangular Arbitrage Example',
      photo:''
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <nav className="bg-gray-600 p-4 text-white">
        <div className="container mx-auto flex items-center">
          <Link to="/economyProject">
            <button className="mr-4">
              <i className="fas fa-arrow-left"></i> Back
            </button>
          </Link>
          <h1 className="text-xl font-bold">Arbitrage Models Overview</h1>
        </div>
      </nav>

      <main className="container mx-auto mt-8 px-4">
        <h2 className="text-3xl font-bold mb-4">Project Overview</h2>
        <p className="mb-8">
          Arbitrage models offer unique opportunities to capitalize on price inefficiencies between or within exchanges. These strategies involve buying and selling assets in such a way that ensures <strong>risk-free profits</strong>. Below are several arbitrage models, from statistical methods to more advanced graph-based techniques like the Bellman-Ford arbitrage graphs. Explore each model to see how they work and their respective applications in cryptocurrency and other markets.
        </p>

        {/* Placeholder for arbitrage models image */}
        <div className="mb-8">
          <img 
            src='' 
            alt="Arbitrage Models Overview" 
            className="w-full h-auto rounded-lg shadow-md"
          />
          <p className="text-center mt-2 text-gray-600">Fig 1: Overview of Arbitrage Models in Cryptocurrency Trading</p>
        </div>

        <div className="space-y-8">
          {models.map((model, index) => (
            <div key={index} id={model.name} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">{model.name}</h3>
              <p className="mb-4">{model.description}</p>

              {/* Placeholder for model-specific images */}
              <div className="mb-4">
                <img 
                  src={`${model.photo}`} 
                  alt={model.imageAlt} 
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <p className="text-center mt-2 text-gray-600">Fig {index + 2}: {model.imageAlt}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Export the component so it can be used in other parts of the app
export default ArbitrageModelsPage;
