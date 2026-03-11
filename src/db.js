import React from 'react';
import { Link } from 'react-router-dom';

function StrategyDatabaseDocumentation() {

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <nav className="bg-gray-600 p-4 text-white">
        <div className="container mx-auto flex items-center">
          <Link to="/economyproject">
            <button className="mr-4">
              <i className="fas fa-arrow-left"></i> Back
            </button>
          </Link>
          <h1 className="text-xl font-bold">Strategy Database & Trade Simulation Logs</h1>
        </div>
      </nav>

      <main className="container mx-auto mt-8 px-4">
        <h2 className="text-3xl font-bold mb-4">Overview of Strategy Tables & Trade Logs</h2>
        <p className="mb-8">
          This page provides a detailed explanation of how the strategies are stored in the database, 
          how simulation results are recorded for each one, and how trades are logged and monitored.
        </p>

        {/* Strategies Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-4">Strategy-Specific Tables</h3>
          <p className="mb-4">
            Each trading strategy has its own database table to record its simulation results. 
            Below is the list of strategies and how their results are stored.
          </p>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2">TA FAMILY Functions analysis</h4>
              <p className="mb-2">
                Here we state the parameters each function takes and the output it provides, to better organize the tables:
              </p>
              <ul className="list-disc list-inside mb-2">
                <li>All of the following take as parameters at least (they won't be referenced again, but are standard): <strong>start</strong>, <strong>end</strong> (both TEXT), <strong>lev</strong> (INT) used, <strong>PAIR</strong> (TEXT)  on which it was applied and <strong>timeframe</strong> (TEXT)used for the simulation (backtest)</li>
                <li>All of the following return RESULT : [REAL <strong>gross</strong>, REAL <strong>net</strong>, INT <strong>trades_executed</strong>, REAL <strong>avg_profit_per_trade</strong>, REAL <strong>avg_trade_duration</strong>]</li>
                <li>SMA(REAL <strong>target</strong>, REAL <strong>stoploss</strong>, INT <strong>long_window</strong>, INT <strong>short_window</strong>) --> Result</li>
                <li>BJORDUM(REAL <strong>target</strong>, REAL <strong>stoploss</strong>, INT <strong>long_window</strong>, INT <strong>short_window</strong>, REAL <strong>volume_spike</strong>)-->Result</li>
                <li>LMF(REAL <strong>target</strong>, REAL <strong>stoploss</strong>, LIST(REAL) <strong>gammas</strong>) --> Result</li>
                <li>ATF(REAL <strong>target</strong>, REAL <strong>stoploss</strong>, INT <strong>long_window</strong>, INT <strong>short_window</strong>, INT <strong>UpperBandFilter</strong>, INT <strong>LowerBandFilter</strong>)-->Result</li>
                <li>BJORDUM_KEYLEVELS(REAL <strong>target</strong>, REAL <strong>stoploss</strong>, REAL <strong>left</strong>, REAL <strong>right</strong>, INT <strong>pivot_number</strong>, REAL <strong>atr_len</strong>, REAL <strong>mult</strong>, INT <strong>per</strong>)-->Result</li>
                
                <li>SUPER_TREND(REAL <strong>target</strong>, REAL <strong>stoploss</strong>, REAL <strong>ATR_PERIOD</strong>, REAL <strong>multiplier</strong>)-->Result</li>
                <li>MACD_RSI(REAL <strong>target</strong>, REAL <strong>stoploss</strong>, REAL <strong>ATR_PERIOD</strong>, REAL <strong>multiplier</strong>)-->Result</li>
                <li>SUPER_TREND_BB(REAL <strong>target</strong>, REAL <strong>stoploss</strong>, REAL <strong>ATR_PERIOD</strong>, REAL <strong>multiplier</strong>)-->Result</li>
                <li>RSI_BB(REAL <strong>target</strong>, REAL <strong>stoploss</strong>, REAL <strong>ATR_PERIOD</strong>, REAL <strong>multiplier</strong>)-->Result</li>
                <li>ICHIMOKU(REAL <strong>target</strong>, REAL <strong>stoploss</strong>, INT <strong>long_window</strong>, INT <strong>short_window</strong>,  INT <strong>ichimoku_win1</strong>, INT <strong>ichimoku_win2</strong>, INT <strong>ichimoku_win3</strong>)-->Result</li>
                
                <li>More to be registered...</li>

                
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2">ANH FAMILY Functions analysis</h4>
              <p className="mb-2">
                Here we state the parameters each function takes and the output it provides. Also this is hides an extra layer, as the trades record ascociated with each simulation hold extra values, of the targets currently used (and static/synamic status) to better organize the tables:
              </p>
              <ul className="list-disc list-inside mb-2">
                <li>All of the following take as parameters at least (they won't be referenced again, but are standard): <strong>start</strong>, <strong>end</strong> (both TEXT), <strong>lev</strong> (INT) used, <strong>PAIR</strong> (TEXT)  on which it was applied and <strong>timeframe</strong> (TEXT)used for the simulation (backtest), <strong>TargetCalculationSystem</strong> (TEXT) that was used, <strong>minProfit</strong>, <strong>minDistance</strong> (both REAL)</li>
                <li>All of the following return RESULT : [REAL <strong>gross</strong>, REAL <strong>net</strong>, INT <strong>trades_executed</strong>, REAL <strong>avg_profit_per_trade</strong>, REAL <strong>avg_trade_duration</strong>, LIST(REAL) <strong>statistic percentages for each case</strong>]</li>
                <li>ENH_STATIC_5(LIST(REAL) <strong>targets</strong>) --> Result</li>
                <li>ENH_DYNAMIC_5(TEXT <strong>TargetCalculationMethod</strong>)-->Result</li>
                <li>ENH_DYNAMIC_4(TEXT <strong>TargetCalculationMethod</strong>) --> Result</li>
                <li>ENH_STATIC_4((LIST(REAL) <strong>targets</strong>)-->Result</li>
                <li>SIBEN(TEXT <strong>TargetCalculationMethod</strong>)-->Result</li>
                <li>SIBA(TEXT <strong>TargetCalculationMethod</strong>)-->Result</li>
                
                <li>More to be registered...(like NCH and other anh)</li>

                
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2">OPTIONS FAMILY Functions analysis</h4>
              <p className="mb-2">
                Here we state the parameters each function takes and the output it provides. Also this is hides an extra layer, as the trades record ascociated with each simulation hold extra values, of the targets currently used (and static/synamic status) to better organize the tables:
              </p>
              <ul className="list-disc list-inside mb-2">
                <li>All of the following take as parameters at least (they won't be referenced again, but are standard): to be filled</li>
                <li>All of the following return RESULT : to be filled...</li>
               
                <li>More to be registered...(like STRANGLE, STRADDLE, IRON_BUTTERFLY, TRAPPERS_STRAT and others...)</li>

                
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2">ARBITRAGE FAMILY Functions analysis</h4>
              <p className="mb-2">
                Here we state the parameters each function takes and the output it provides. Also this is hides an extra layer, as the trades record ascociated with each simulation hold extra values, of the targets currently used (and static/synamic status) to better organize the tables:
              </p>
              <ul className="list-disc list-inside mb-2">
                <li>All of the following take as parameters at least (they won't be referenced again, but are standard): to be filled</li>
                <li>All of the following return RESULT : to be filled...</li>
               
                <li>More to be registered...(like STATISTICAL, CIRCULAR, and others...)</li>

                
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2">PREDICTIVE ANALYSIS FAMILY Functions analysis</h4>
              <p className="mb-2">
                Here we state the parameters each function takes and the output it provides. Also this is hides an extra layer, as the trades record ascociated with each simulation hold extra values, of the targets currently used (and static/synamic status) to better organize the tables:
              </p>
              <ul className="list-disc list-inside mb-2">
                <li>All of the following take as parameters at least (they won't be referenced again, but are standard): to be filled</li>
                <li>All of the following return RESULT : to be filled...</li>
               
                <li>More to be registered...(like MonteCarlo, GeometricBrownianMotion, ARIMA and others...)</li>

                
              </ul>
            </div>



            
           

          </div>
        </div>

        {/* Simulation Logging */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4">Trade Simulation Logging</h3>
          <p className="mb-4">
            All simulated trades are logged in a separate table that records the following information for each trade:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Pointer to Strategy Used</li>
            <li>Start Date & End Date of Trade</li>
            <li>Entry & Exit Points</li>
            <li>Profit/Loss</li>
            <li>On what coin</li>
            <li>backtst/livetest/REAL_TRADE status/</li>
            <li>AmountInvested if REAL_TRADE</li>
            <li>Current Target if belongs to ANH strategies</li>
            <li>Target status if belongs to ANH strategies</li>
          </ul>
          <p className="text-gray-600">
            This table is linked to individual strategy tables to help track performance across different strategies over time.
          </p>
        </div>

        
      </main>
    </div>
  );
}

export default StrategyDatabaseDocumentation;
