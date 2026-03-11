import React from 'react';
import { Link } from 'react-router-dom';

function CryptoOptionsStrategies() {

  const strategies = {
    straddle: {
      name: 'Straddle',
      description: `
        A straddle is an options strategy that involves purchasing both a call option and a put option with the same strike price and expiration date. 
        This strategy profits when the price of the underlying asset makes a significant move in either direction—up or down. 
        Since both a call (betting on price increases) and a put (betting on price decreases) are bought, it doesn't matter which way the market moves as long as it moves substantially.

        **Key Features:**
        - **Best for:** High volatility markets where significant price swings are expected but the direction is uncertain.
        - **Risk:** The maximum risk is limited to the total premium paid for both options.
        - **Profit Potential:** Unlimited upside if the price rises sharply and significant gains if the price falls drastically.

        **Example:**
        A trader buys both a Bitcoin call and put option with a strike price of $50,000 and an expiration in one month. If the price of Bitcoin moves significantly—either way—this trader stands to gain from the large price swing. However, if Bitcoin remains around $50,000, the trader will lose the premium paid for both options.

        **When to Use:**
        - When you expect a sharp price movement in the underlying asset but are unsure of the direction.
        - Typically applied in times of major news events or market uncertainty.
      `,
      photo: '',
      imageAlt: 'Straddle Crypto Options Example'
    },
    strangle: {
      name: 'Strangle',
      description: `
        A strangle is similar to a straddle but differs in that the call and put options have different strike prices. 
        The call option is bought with a higher strike price, and the put option with a lower strike price. 
        This strategy is less expensive than a straddle because the premiums for out-of-the-money options are cheaper, but it requires a larger price movement to be profitable.

        **Key Features:**
        - **Best for:** Markets with high volatility where significant movement is expected, but the exact price range is unclear.
        - **Risk:** The maximum loss is limited to the premiums paid for the call and put options.
        - **Profit Potential:** The profit is substantial if the underlying asset moves outside the range defined by the two strike prices.

        **Example:**
        A trader buys a Bitcoin call with a strike price of $52,000 and a Bitcoin put with a strike price of $48,000. The trader profits if Bitcoin's price moves significantly outside of this $48,000–$52,000 range.

        **When to Use:**
        - This strategy is employed when you expect significant price movement but want to limit the initial cost compared to a straddle.
        - Often used in volatile markets when larger swings are expected without a clear price target.
      `,
      photo: '',
      imageAlt: 'Strangle Crypto Options Example'
    },
    ironButterfly: {
      name: 'Iron Butterfly',
      description: `
        The iron butterfly is a more advanced strategy that involves four options contracts. 
        It is a "limited risk, limited profit" strategy used in low-volatility markets where the trader expects the price of the underlying asset to remain close to a central strike price. 
        The strategy consists of buying one call and one put option at the same strike price (the middle strike price) and selling one call and one put option at higher and lower strike prices, respectively.

        **Key Features:**
        - **Best for:** Low volatility markets where the underlying asset is expected to stay within a narrow price range.
        - **Risk:** The maximum loss occurs if the underlying asset moves significantly away from the middle strike price.
        - **Profit Potential:** The profit is capped, and the trader profits if the price stays near the middle strike price.

        **Example:**
        A trader buys a Bitcoin call and put at $50,000 (the middle strike price), and simultaneously sells a Bitcoin call at $52,000 and a Bitcoin put at $48,000. If Bitcoin’s price remains close to $50,000, the trader profits from the premiums collected from the sold options, minus the cost of the bought options.

        **When to Use:**
        - Use when the market is expected to have low volatility.
        - The iron butterfly works well when a trader expects prices to remain stable around a central price but wants to profit from collecting premiums.
      `,
      photo: '',
      imageAlt: 'Iron Butterfly Crypto Options Example'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <nav className="bg-gray-600 p-4 text-white">
        <div className="container mx-auto flex items-center">
          <Link to="/economyproject">
            <button className="mr-4">
              <i className="fas fa-arrow-left"></i> Back
            </button>
          </Link>
          <h1 className="text-xl font-bold">Crypto Options Strategies</h1>
        </div>
      </nav>

      <main className="container mx-auto mt-8 px-4">
        <h2 className="text-3xl font-bold mb-4">Straddle, Strangle, and Iron Butterfly Strategies in Crypto Options</h2>
        <p className="mb-8">
          In cryptocurrency options trading, traders use various strategies to capitalize on market movements and manage risk. Below, we detail three popular strategies—Straddle, Strangle, and Iron Butterfly—explaining their mechanics and the best conditions for their application.
        </p>

        <div className="mb-8">
          <img 
            src="" 
            alt="Crypto Options Strategies Overview" 
            className="w-full h-auto rounded-lg shadow-md"
          />
          <p className="text-center mt-2 text-gray-600">Fig 1: Overview of Crypto Options Strategies</p>
        </div>

        <div className="space-y-8">
          {Object.keys(strategies).map((key) => (
            <div key={key} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">{strategies[key].name}</h3>
              <p className="mb-4 whitespace-pre-line">{strategies[key].description}</p>
              <div className="mb-4">
                <img 
                  src={`${strategies[key].photo}`} 
                  alt={strategies[key].imageAlt} 
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <p className="text-center mt-2 text-gray-600">Fig 2: {strategies[key].imageAlt}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h4 className="text-xl font-semibold mb-4">Strategy Parameters</h4>
          <p>
            Each of these strategies can be tailored based on several key parameters:
          </p>
          <ul className="list-disc list-inside">
            <li><strong>Strike Price:</strong> The price at which the underlying asset can be bought or sold.</li>
            <li><strong>Expiry Date:</strong> The date at which the options contract expires.</li>
            <li><strong>Volatility:</strong> A measure of price fluctuations in the underlying asset, which impacts the potential profitability of the strategy.</li>
            <li><strong>Premium:</strong> The cost paid to buy the options in the strategy. This is a key factor in determining the overall cost and risk of the strategy.</li>
          </ul>
          <p className="mt-4 text-gray-600">
            Experienced users can adjust these parameters to fine-tune the strategies, optimizing them for specific market conditions, risk profiles, and profit targets.
          </p>
        </div>
      </main>
    </div>
  );
}

export default CryptoOptionsStrategies;
