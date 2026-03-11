"use client";
import React from "react";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function MatlabModule() {
  // Sample text for demonstration
  const sampleText = `
    +----------------------------------------------------------------------------------------------------------+
    | Coin: BTC/USDT                                                                                           |
    | Time Interval: 2024-01-01T00:00:00Z->2024-07-01T00:00:00Z                                                |
    | Exchange Used: binance                                                                                   |
    | Timeframe Used: 1h                                                                                       |
    +----------------------------------------------------------------------------------------------------------+
    | average_volume: 1638.5662522715202                                                                       |
    +----------------------------------------------------------------------------------------------------------+
    | volatility: 0.4326917562541552                                                                           |
    +----------------------------------------------------------------------------------------------------------+
    | retracement_indices: (72.93469887288832, 0.004348346426732278, 0.5631565832241675, 0.007721380795794402) |
    +----------------------------------------------------------------------------------------------------------+
    | drift_rate: 0.002452945069775802                                                                         |
    +----------------------------------------------------------------------------------------------------------+
    | average_up: 97.69136675824176                                                                            |
    +----------------------------------------------------------------------------------------------------------+
    | average_down: 101.80787316849822                                                                         |
    +----------------------------------------------------------------------------------------------------------+
    | moving_averages:                                                                                         |
    |   SMA: 61619.156428571434                                                                                |
    |   EMA: 61618.40044918555                                                                                 |
    +----------------------------------------------------------------------------------------------------------+
    | rsi: 81.42843356849355                                                                                   |
    +----------------------------------------------------------------------------------------------------------+
    | macd:                                                                                                    |
    |   MACD: 231.653329438137                                                                                 |
    |   MACD_signal: 172.59247454709254                                                                        |
    +----------------------------------------------------------------------------------------------------------+
    | bollinger_bands:                                                                                         |
    |   Bollinger_High: 62205.97685584826                                                                      |
    |   Bollinger_Low: 60589.436144151754                                                                      |
    +----------------------------------------------------------------------------------------------------------+
    | fibonacci_levels:                                                                                        |
    |   0.0%: 73777.0                                                                                          |
    |   23.6%: 65464.608                                                                                       |
    |   38.2%: 60322.195999999996                                                                              |
    |   50.0%: 56166.0                                                                                         |
    |   61.8%: 52009.804000000004                                                                              |
    |   100.0%: 38555.0                                                                                        |
    +----------------------------------------------------------------------------------------------------------+
    | parabolic_sar: 61109.95096494804                                                                         |
    +----------------------------------------------------------------------------------------------------------+
    | Accumulation/Distribution Line: 388880.8176207237                                                        |
    +----------------------------------------------------------------------------------------------------------+
    | Chaikin Money Flow: 0.06636093439929923                                                                  |
    +----------------------------------------------------------------------------------------------------------+
    | On-Balance Volume: -48964.40917599989                                                                    |
    +----------------------------------------------------------------------------------------------------------+
    | Average True Range: 277.9442857142858                                                                    |
    +----------------------------------------------------------------------------------------------------------+
    | Rate of Change: 0.8107201906903949                                                                       |
    +----------------------------------------------------------------------------------------------------------+
    | Commodity Channel Index: 103.48141945305477                                                              |
    +----------------------------------------------------------------------------------------------------------+
    | MACD Histogram: 59.06085489104447                                                                        |
    +----------------------------------------------------------------------------------------------------------+
    | Weighted Moving Average: 61722.51780952382                                                               |
    +----------------------------------------------------------------------------------------------------------+
    | Ichimoku Cloud:                                                                                          |
    |   Tenkan-sen: 61727.905                                                                                  |
    |   Kijun-sen: 61411.009999999995                                                                          |
    |   Senkou Span A: 60850.2575                                                                              |
    |   Senkou Span B: 61226.11                                                                                |
    |   Chikou Span: nan                                                                                       |
    +----------------------------------------------------------------------------------------------------------+
  `;

  // MATLAB code for demonstration
  const matlabCode = `
    Correlation Results:
    Correlation between average_volume of BTC and ETH: Correlation: 0.85
    Correlation between volatility of BTC and ETH: Correlation: 0.90
    Correlation between retracement_indices of BTC and ETH: Correlation: 0.95
    Correlation between drift_rate of BTC and ETH: Correlation: 0.82
    Correlation between average_up of BTC and ETH: Correlation: 0.81
    Correlation between average_down of BTC and ETH: Correlation: 0.90
    Correlation between Moving Averages of BTC and ETH: Correlation: 0.92
    Correlation between rsi of BTC and ETH: Correlation: 0.81
    Correlation between MACD of BTC and ETH: Not enough data to calculate correlation
    Correlation between BB Bands of BTC and ETH: Correlation: 0.92
    Correlation between FIbLevels of BTC and ETH: Correlation: 0.92
    Correlation between Parabolic Sar of BTC and ETH: Correlation: 0.92
    Correlation between Accumulation/Distribution Line of BTC and ETH: Correlation: 0.65
    Correlation between Chaikin Money Flow of BTC and ETH: Correlation: 0.63
    Correlation between On-Balance Volume of BTC and ETH: Correlation: 0.66
    Correlation between Average True Range of BTC and ETH: Correlation: 0.91
    Correlation between Rate of Change of BTC and ETH: Correlation: 0.80
    Correlation between Commodity Channel Index of BTC and ETH: Correlation: 0.77
    Correlation between MACD Hostpgram of BTC and ETH: Correlation: 0.82
    Correlation between Weighted Moving Average of BTC and ETH: Correlation: 0.92
    Correlation between Ichimoku Cloud of BTC and ETH: Correlation: 0.92
  `;

  return (
    <div className="bg-blue-100 min-h-screen p-8 font-sans">
      {/* Return Button */}
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/giorMainDevCV">
          <button className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <i className="fas fa-arrow-left mr-2"></i>Return to Previous Page
          </button>
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-blue-800 mb-6">
        Data Analysis 
      </h1>

      {/* Project Description */}
      <p className="text-lg text-blue-700 mb-8">
        Over the years, I have come across different needs to learn data analysis --and collection/retrieval, and I have implemented different skills in this area.
        Started with Matlab, as it was required to pass classes in my uni --through which I got perfect knowledge of the language--, used it for
        own analysis and visualizations, as seen in the left picture below. I also developed custom function to take statistics from data sets and create snapshots of indicators, like seen in the right picture. After that I proceeded to Correlations, general and more unique. For my final steps 
        in this area --at least for now-- I'm planning on building a neural network, one that will examine and analyse statistics fed to it, in order to approache
        a general theory behind some of the cases I have been studying. 
      </p>

      {/* Images and Text Holder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex flex-col items-center">
          <p className="text-lg text-blue-700 mb-2">Graph plotting function using matplotlib library of python. In the graph, we identify and select ranges for which the price value didn't move --up or down-- more than an allowed threshold. In this example we used prices of BTC/USDT as values (100 hourly candles from 23:30 07.08.2024 and back) and threshold 5%.</p>
          <img
            src='/images/figure1.jpg'
            alt="Graph showing plotting skills in Matlab or Python using matplotlib. This example is a box identifying function (with threshold as parameter) on a wave. The specific example is BTC/USDT 100 1h candles, from 23:20 07.08.2024 and back, with threshold=5%"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-lg text-blue-700 mb-2">Here is a snapshot of statistics on values. For all the indicators, custom functions were used.</p>
          <div className="w-full h-[400px] overflow-auto bg-white p-4 rounded-lg shadow-md">
            <div className="min-w-max min-h-full">
              <pre className="text-sm text-blue-800 whitespace-pre-wrap">
                <code>{sampleText}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* MATLAB Code Snippet */}
      <div className="flex flex-col mb-8">
        <p className="text-lg text-blue-700 mb-2">To make things more interesting, I took data from date 1 to date 2, proceeded to break it donw in smaller intervals, then calculated statistical snapshots like above right for all of them, and then I correlated them with the those of another set of values. I like to call it for fun: hard correlation.
          The below result is the hard correaltion of BTC and ETH from 01.01.2024 to 01.07.2024, timeframe=5m, and I broke it to intervals of 2 hours each time.
        </p>
        <div className="w-full h-[400px] overflow-auto bg-white p-4 rounded-lg shadow-md">
          <pre className="text-sm text-blue-800 whitespace-pre-wrap">
            <code>{matlabCode}</code>
          </pre>
        </div>
      </div>

      

      {/* Analysis Results */}
      <p className="text-blue-700 mb-8">
        As a personal note: analysing, plotting and collecting data has been the most fun programming activity I have done till now. The couriosity takes over after a point and provides you with extra courage and will to find out what realtions lie behind data. That of course if you are interested enough like me. 
        I have used mostly Python, but I can work with Matlab as well. 
        The code and the logic behind are free to use to any trader or analist that finds it interesting or usefull.
      </p>

      {/* Usage Instructions */}
      <p className="text-blue-700 mb-4">
        To use this project, simply clone the repository and run the Python
        scripts. Make sure you install all necessary libraries from requirements.txt
        and enjoy. A Manual Guide can be found in Read.ME page in github below. In case the link doesn't 
        redirect correctly or shows 404 errors assume safely that I haven't uploaded it yet or there is an error.
        Final Note: I wrote the functions as a student, if something's off, wrong or doesn't work please comment it as an issue 
        in github. I'll be more than happy to resolve/correct it.
      </p>

      {/* GitHub Link */}
      <div className="flex space-x-4">
        <a
          href="https://github.com/username/data-analysis-project"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <i className="fab fa-github mr-2"></i>View on GitHub
        </a>
      </div>
    </div>
  );
}

export default MatlabModule;
