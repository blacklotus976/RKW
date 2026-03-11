import React from 'react';
import { Link } from 'react-router-dom';

function ANHStrategy() {
  // Strategy Data
  const strategies = {
    ENH: {
      name: 'ENH (ErNested Hedge)',
      description: `
        The ENH (ErNested Hedge) is the foundational model in the Advanced Nested Hedge family. The core philosophy behind ENH is that 
        financial markets, especially volatile markets like crypto, exhibit non-linear price movements. Instead of trying to predict the direction, 
        ENH takes both a long and short position at the same entry point (the "nest"). As the price moves in either direction, one position benefits, 
        while the other stops out or is adjusted. This strategy profits from the natural oscillations of the market without the need to predict the 
        price direction. 
        
        The ENH model thrives in wave-like price movements and is best applied when the market is fluctuating within a range.`,
      example: `
        Example: A trader buys BTC at $50,000 (long) and shorts BTC at $50,000 (short). If BTC rises to $52,000, the long position benefits, 
        and the short is stopped out. After reaching the target, the trader adjusts the short to $52,000, allowing the strategy to adapt to the 
        new market conditions. If BTC then falls back to $50,000, the short position profits, completing the cycle.
      `,
      philosophy: `
        Philosophy: ENH takes a neutral approach to price direction and focuses on exploiting the price oscillations within a defined range.
        The strategy can suffer if the price moves unidirectionally without fluctuation, but it's highly adaptable and works well in 
        markets with frequent price reversals.
      `,
      photo :'',

      imageAlt: 'ENH Hedge Model',
    },
    NHC10: {
      name: 'NHC10 (Nested Hedge Counter 10)',
      description: `
        NHC10 refines the original ENH strategy by systematically reducing the exposure to the opposite position at each target profit point. 
        The goal is to mitigate risk by gradually exiting positions instead of closing them completely. In volatile environments, this allows 
        for more cautious exits, as the remaining exposure continues to hedge against potential adverse price movements.
        
        This strategy is considered more conservative compared to ENH, as it minimizes losses by only closing a portion of the position at each step.`,
      example: `
        Example: A trader buys BTC at $50,000 and shorts BTC at $50,000. When BTC rises to $52,000, instead of fully closing the short position, 
        the trader reduces the short by 10%. If the market fluctuates, the remaining short continues to hedge the long.
      `,
      philosophy: `
        Philosophy: NHC10 is designed for risk-averse traders. The gradual reduction in position size is useful in markets where strong 
        price reversals are expected but not guaranteed. It strikes a balance between preserving the gains from one position while still 
        hedging the other.
      `,
      photo :'',

      imageAlt: 'NHC10 Hedge Model',
    },
    NHC20: {
      name: 'NHC20 (Nested Hedge Counter 20)',
      description: `
        NHC20 is a more aggressive variant of NHC10, where the trader reduces exposure by 20% at each target profit point. 
        This strategy sacrifices some upside potential for greater downside protection. It's ideal for markets where price movements 
        are sharp and less predictable.
        
        The idea behind NHC20 is to limit risk more aggressively than NHC10, providing additional safety at the expense of potential profit.`,
      example: `
        Example: A trader buys BTC at $50,000 and shorts BTC at $50,000. When BTC rises to $52,000, the trader reduces the short position 
        by 20%. This offers a larger reduction in risk exposure while still maintaining a hedge.
      `,
      philosophy: `
        Philosophy: NHC20 is designed for traders who want to minimize risk aggressively, even if it means limiting potential profits. 
        This strategy is best suited for volatile or fast-moving markets where sudden and significant price swings are expected.
      `,
      photo :'',
      imageAlt: 'NHC20 Hedge Model',
    },
    NHOpt: {
      name: 'NHOpt (Optimized Nested Hedge)',
      description: `
        NHOpt is the most sophisticated variant in the ANH family. It leverages algorithmic adjustments to dynamically set 
        stop-losses and target profits based on real-time market conditions. The optimization is based on the asset's volatility, 
        liquidity, and market structure. 
        
        NHOpt minimizes fees and seeks to maximize returns by adjusting its positions automatically, making it ideal for 
        algorithmic trading. The automated nature reduces human intervention, allowing the system to react faster to changes in the market.`,
      example: `
        Example: NHOpt automatically buys and shorts BTC at $50,000. As the market fluctuates, it adjusts stop-losses and target 
        profits based on real-time data. If volatility increases, it may expand the range between the stop-losses to prevent frequent 
        stop-outs and maximize gains.
      `,
      philosophy: `
        Philosophy: NHOpt embodies a more complex, algorithm-driven approach to hedging. It dynamically adjusts to real-time 
        market data, which makes it the most hands-off yet adaptive strategy. Ideal for traders who prefer automated systems 
        and trust algorithmic decision-making.
      `,
      photo :'',
      imageAlt: 'NHOpt Hedge Model',
    },
    Services: {
        name: 'Extra services (Target/Levels Calculation)',
        description: `
        Currently only ENH is working and actively being tested. So to better support the algorithm (needs higher precision because of the fees (doubled)) we created some systems to better set thse target levels.
        
        -->Itachi Service: this is all the standards. It offers a test run with standard target/levels (const) to test a specific combination, it offers the dynamic recalculation based on evaluating a target/level combination on perofrmance of short past, and the same but with the applied condiiton to return to pre-previous level to close (response to the heavy fees). 

        -->Genetic Approach: same as dynamic Itachi but it is supposed to be more accurate as it runs an error adjustment.

        -->Gradient Descent Approach: same as above, but with best error  adjustments.

        -->GBM based Approach: sets targets based on calculations of predictive horizon for some future minutes.
        
        -->MonteCarlo based appraoch: same as above but with use of MonteCarlo instead of GBM.
        My Opinion: Everything needs retesting. But also const for BTC [type (10,20,30,50,75) leveraged 20x would be fine I think].`,
        example: ``,
        philosophy: ``,
        photo :'',
        imageAlt: 'Different Services',
      },
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
          <h1 className="text-xl font-bold">ANH Hedge Strategies</h1>
        </div>
      </nav>

      <main className="container mx-auto mt-8 px-4">
        <h2 className="text-3xl font-bold mb-4">Adaptive Nested Hedge (ANH) Model Overview</h2>
        <p className="mb-8">
          The Adaptive Nested Hedge (ANH) family of models provides a flexible approach to hedging in highly volatile markets. 
          Rather than trying to predict price movements, these models seek to profit from price oscillations by opening both 
          long and short positions and adjusting dynamically. The nested structure allows for varying levels of risk management, 
          from aggressive to conservative, depending on the specific model used.
        </p>

        {/* General Image Placeholder */}
        <div className="mb-8">
          <img 
            src="" 
            alt="Overview of ANH Model" 
            className="w-full h-auto rounded-lg shadow-md"
          />
          <p className="text-center mt-2 text-gray-600">Fig 1: Overview of the Adaptive Nested Hedge (ANH) Model</p>
        </div>

        {/* Strategy Sections */}
        {Object.entries(strategies).map(([key, currentStrategy]) => (
          <div key={key} className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-2xl font-bold mb-4">{currentStrategy.name}</h3>
            <p className="mb-4">{currentStrategy.description}</p>
            <p className="font-bold mb-4">Example: <span className="text-blue-600">{currentStrategy.example}</span></p>
            <p className="font-bold">Philosophy:</p>
            <p className="mb-4">{currentStrategy.philosophy}</p>

            {/* Image Placeholder for Strategy */}
            <div className="mb-4">
              <img 
                src={`${currentStrategy.photo}`} 
                alt={currentStrategy.imageAlt} 
                className="w-full h-auto rounded-lg shadow-md"
              />
              <p className="text-center mt-2 text-gray-600">Fig 2: {currentStrategy.imageAlt}</p>
            </div>
          </div>
        ))}

        {/* Downloadable PDF Section */}
        <div className="mt-8">
          <h4 className="text-xl font-semibold mb-4">Download ANH Strategy Documentation</h4>
          <div className="flex space-x-4">
            <a href="/pdfs/anh_special.pdf" download className="p-4 bg-blue-500 text-white rounded">
                Download ANH applications and examples General/First Documentation
            </a>
            <a href="/pdfs/ANH_theory.pdf" download className="p-4 bg-blue-500 text-white rounded">
                Download General Theory
            </a>
            <a href="/pdfs/anh_profits_theory.pdf" download className="p-4 bg-blue-500 text-white rounded">
                Download ENH Profit theory
            </a>
            <a href="/pdfs/anh_target_calculation.pdf" download className="p-4 bg-blue-500 text-white rounded">
                Download ENH Target/Levels Calcualtion theory
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ANHStrategy;
