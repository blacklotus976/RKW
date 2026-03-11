import React from 'react';




function DataProject() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const sections = [
    "Data Mining",
    "Data Analysis",
    "Statistical Analysis",
    "Predictive Analysis",
    "Sequential Modeling",
    "Deep Q-Learning"
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return React.createElement(
    'div',
    { className: 'bg-white text-blue-900 min-h-screen font-sans' },
    React.createElement(
      'div',
      { className: 'fixed top-0 left-0 w-full z-50 bg-blue-600' }, // Fixed wrapper for the menu
      React.createElement(
        'nav',
        { className: 'p-4 flex justify-between items-center' }, // No need for fixed here anymore
        React.createElement(
          'button',
          {
            className: 'text-white font-bold py-2 px-4 rounded',
            onClick: () => window.location.href = '/giorMainDevCV' // Redirect to "/"
          },
          React.createElement('i', { className: 'fas fa-arrow-left mr-2' }),
          'Back'
        ),
        React.createElement(
          'div',
          { className: 'relative' }, // Container for menu
          React.createElement(
            'button',
            {
              className: 'text-white font-bold py-2 px-4 rounded flex items-center',
              onMouseEnter: () => setIsMenuOpen(true),
              onMouseLeave: () => setIsMenuOpen(false)
            },
            'Menu-it\'s fast',
            React.createElement('i', { className: 'fas fa-caret-down ml-2' })
          ),
          React.createElement(
            'div',
            {
              className: `absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 block' : 'opacity-0 hidden'}`,
              onMouseEnter: () => setIsMenuOpen(true),
              onMouseLeave: () => setIsMenuOpen(false)
            },
            sections.map((section, index) =>
              React.createElement(
                'button',
                {
                  key: index,
                  onClick: () =>
                    scrollToSection(section.toLowerCase().replace(/\s+/g, '-')),
                  className:
                    'block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                },
                section
              )
            )
          )
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'container mx-auto px-4 py-8' },
      React.createElement(
        'h1',
        { className: 'text-4xl font-bold text-center mb-12' },
        'Data Science Services Showcase',
        React.createElement('br'),
        React.createElement(
            'small',
            { className: 'text-sm' },  // You can adjust the size here
            'Use top right menu to view categories and speed-go there',
            React.createElement('br'),
            '--in all code code snippets scroll to the end for the horizontal scrollback to appear',
            React.createElement('br'),
            'Also friendly Note: Most of the work here is stuff I personally use for custom projects so I am not able to directly share Code in Github, though contact me if interested. Also Everything is in Python'
            
        ),
      ),
      createSection(
        'data-mining',
        'Data Mining',
        'Expertise in extracting and processing large datasets such as stock prices and crypto data (for example). I think I can manage with scrapping data anyhow, by building custom requests to specific endpoint to using already-existent libraries. Locating data -> requesting/fetching data -> filtering data, everything to get the job done.',
        'Example: Crypto Data Aggregator',
        `Developed a Python script to scrape and aggregate past cryptocurrency data from multiple sources, enabling comprehensive market analysis. For every one interested, this function is part of a class that takes an exchange (part of ccxt library) in its constructor. Scroll to the end for usage example!`,
        `
        def fetch_ohlcv(self, symbol, timeframe, start_date, end_date, limit=1000):
            #print(f"fetch ohlcvb mentioned, parameters start_date : {start_date} of type {type(start_date)}")
            """
            Fetch OHLCV data from an exchange using ccxt.

            Parameters:
            - symbol: str, trading pair symbol (e.g., 'BTC/USDT')
            - timeframe: str, time frame for the candles (e.g., '1m', '3m', '1h', etc.)
            - start_date: str, start date in 'YYYY-MM-DDTHH:MM:SSZ' format
            - end_date: str, end date in 'YYYY-MM-DDTHH:MM:SSZ' format
            - limit: int, maximum number of candles per fetch

            Returns:
            - df: pandas DataFrame, collected OHLCV data
            """

            # Determine the number of candles to fetch based on the timeframe
            if timeframe.endswith('m'):
                minutes = int(timeframe[:-1])
                candle_count = (pd.to_datetime(end_date) - pd.to_datetime(start_date)).total_seconds() / 60 * minutes
            elif timeframe.endswith('h'):
                hours = int(timeframe[:-1])
                candle_count = (pd.to_datetime(end_date) - pd.to_datetime(start_date)).total_seconds() / 3600 * hours
            elif timeframe.endswith('d'):
                days = int(timeframe[:-1])
                candle_count = (pd.to_datetime(end_date) - pd.to_datetime(start_date)).total_seconds() / 86400 * days
            else:
                raise ValueError(f"Unsupported timeframe: {timeframe}")

            # Convert dates to milliseconds
            start_timestamp = self.exchange.parse8601(start_date)
            end_timestamp = self.exchange.parse8601(end_date)
            #print(f"Request from start {start_timestamp} till {end_timestamp}")

            all_ohlcv = []
            since = start_timestamp
            fetched_candles = 0

            while fetched_candles < candle_count:
                # Calculate how many candles are needed from the current "since" timestamp
                candles_needed = int(candle_count - fetched_candles)
                candles_to_fetch = min(candles_needed, limit)

                ohlcv = self.exchange.fetch_ohlcv(symbol, timeframe, since, candles_to_fetch)

                if len(ohlcv) == 0:
                    break

                candles_fetched = len(ohlcv)
                fetched_candles += candles_fetched

                since = ohlcv[-1][0]

                # Avoid rate limits
                time.sleep(0.5)

                all_ohlcv.extend(ohlcv)

                # If we fetch less than 'candles_to_fetch' candles, break the loop
                if candles_fetched < candles_to_fetch:
                    break

                time.sleep(1)

            # Create DataFrame
            df = pd.DataFrame(all_ohlcv, columns=['timestamp', 'open', 'high', 'low', 'close', 'volume'])
            df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
            if df is None or all_ohlcv is None:
                exit("error with exchange or symbol name")
            #print(f"returning {len(all_ohlcv)} candles")
            return df, all_ohlcv

        --------------------------------------------------
        ----------------------USAGE----------------------
        --------------------------------------------------
        EXCHANGE = 'binance'
        '''EXCHANGE DECLARATION'''
        exchange_class = getattr(ccxt, EXCHANGE)
        exchange = exchange_class({
            'enableRateLimit': True,  # required by the Manual
        })
        service = utilities(exchange)
        start_date = "2024-08-01T00:00:00Z"
        end_date = "2024-08-25T00:00:00Z"
        data, _ = service.fetch_ohlcv(symbol='BTC/USDT', timeframe='1m', start_date=start_date, end_date=end_date)
        print(data.tail(10))
        `,
        [
          '/images/df_crypto_result.png'
        ]
      ),
      createSection(
        'data-analysis',
        'Data Analysis',
        'Proficient in enriching datasets with indicators, storing them in databases, and creating comprehensive visualizations.',
        'Example: Financial Indicators Dashboard',
        `Below follows an example of a function, tasked to enrich the dataframe with many technical indicators and of course its result! The photo below is a vizualization of a <boxes> indicator, applied to BTC's price graph.`,
        `
        ---------------------------------------------------
        ----------------------FUNCTION---------------------
        ---------------------------------------------------
        def calculate_indicators(df):
            return {
                'average_volume': df['volume'].mean(),
                'volatility': calculate_volatility(df),
                'retracement_indices': calc_retracement_index(df),
                'drift_rate': calculate_drift(df),
                'average_up': calculate_average_up_down_dfloaded(df)[0],
                'average_down': calculate_average_up_down_dfloaded(df)[1],
                'SMA': calculate_moving_averages(df).iloc[-1][0],
                'EMA': calculate_moving_averages(df).iloc[-1][1],
                'rsi': calculate_rsi(df),
                'MACD': calculate_macd(df),
                'FIbLevels': calculate_fibonacci_retracement(df),
                'Parabolic Sar': calculate_parabolic_sar(df).iloc[-1],
                'Accumulation/Distribution Line': calculate_adl(df).iloc[-1],
                'Chaikin Money Flow': calculate_cmf(df).iloc[-1],
                'On-Balance Volume': calculate_obv(df).iloc[-1],
                'Average True Range': calculate_atr(df).iloc[-1],
                'Rate of Change': calculate_roc(df).iloc[-1],
                'Commodity Channel Index': calculate_cci(df).iloc[-1],
                'MACD Histogram': calculate_macd_histogram(df).iloc[-1],
                'Weighted Moving Average': calculate_wma(df).iloc[-1],
                'Ichimoku Cloud': calculate_ichimoku(df).iloc[-1].to_dict(),
                'ADX': calculate_adx(df),
                'BB Bands': calculate_bollinger_bands(df).iloc[-1].to_dict()

        ---------------------------------------------------
        ----------------------RESULT---------------------
        ---------------------------------------------------        
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
    }

        `,
        [
          '/images/figure1.jpg'
        ]
      ),
      createSection(
        'statistical-analysis',
        'Statistical Analysis',
        'Expert in performing statistical analyses on various data points, including correlations and time-series analysis.',
        'Example: Correlation Analysis',
        `Conducted correlation analyses across multiple cryptocurrencies over different timeframes, providing insights into market relationships and trading strategies. Also something extra: I call it <HARD> Correlation. It's a correlation of statistical and technical indicators, providing more insight on the relation between to coins/price-graphs.
        
        Below follow examples of normal correlation (function used) and my special <hard> correlation (results).
        `,
        `
        ------------------------------------
        -----HARD CORREALTION RESULTS-------
        ------------------------------------
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
  
        ------------------------------------
        -----BASIC CORRELATION FUNCTION-----
        ------------------------------------
        def correlate_statistics(stats1, stats2):
            """
            Correlates the statistics of two lists of dictionaries.

            Args:
                stats1 (List of dicts): List of statistics for coin 1.
                stats2 (List of dicts): List of statistics for coin 2.

            Returns:
                dict: Dictionary of correlation results with messages.
            """
            correlation_results = {}

            if len(stats1) != len(stats2):
                raise ValueError("The number of statistics entries does not match for both coins.")

            # Extract the keys from the first dictionary in stats1
            keys = stats1[0].keys()

            for key in keys:
                values1 = [process_statistic(s[key]) for s in stats1]
                values2 = [process_statistic(s[key]) for s in stats2]

                # Concatenate lists into a single array per statistic
                values1 = np.concatenate(values1)
                values2 = np.concatenate(values2)

                # Remove NaNs
                valid_indices = ~np.isnan(values1) & ~np.isnan(values2)
                cleaned_values1 = values1[valid_indices]
                cleaned_values2 = values2[valid_indices]

                # Determine correlation result with messages
                if len(cleaned_values1) <= 1 or len(cleaned_values2) <= 1:
                    correlation_results[key] = "Not enough data to calculate correlation"
                elif np.all(np.isnan(cleaned_values1)) or np.all(np.isnan(cleaned_values2)):
                    correlation_results[key] = "All data points are NaN"
                else:
                    try:
                        correlation, _ = pearsonr(cleaned_values1, cleaned_values2)
                        correlation_results[key] = f"Correlation: {correlation:.2f}"
                    except Exception as e:
                        correlation_results[key] = f"Error calculating correlation: {e}"

            return correlation_results
       

        `,
        [
          
        ]
      ),
      createSection(
        'predictive-analysis', 
        'Predictive Analysis', 
        'Explore the advanced techniques of Monte Carlo simulations and Greometric Brownian Machines (GBM) used for predictive analysis.',
        'Predictive Analysis Example',
        'Here I use MonteCarlo and GBM to generate possible paths/continuations. The first one take as parameter initial price/starting point and some possible past data (like returns), while the second is more abstract, depending only on starting point. Below follow some code examples and images which describe the following in order: 1)MonteCarlo Visualization, 2)GBM Visualization', // Example description
        `def monte_carlo_simulation(S0, dt, T, N, historical_returns=None):
    """
    Simulate stock prices using a pure Monte Carlo method.

    :param S0: Initial stock price
    :param dt: Time step in years
    :param T: Total time in years
    :param N: Number of simulations
    :param historical_returns: Historical returns (optional) for resampling
    :return: A list of simulated price paths
    """
    num_steps = int(T / dt)
    paths = np.zeros((N, num_steps + 1))
    paths[:, 0] = S0

    if historical_returns is None:
        # If no historical returns provided, use a simple random walk with normal distribution
        for i in range(1, num_steps + 1):
            random_changes = np.random.uniform(-0.01, 0.01, N)  # Uniform random walk
            paths[:, i] = paths[:, i-1] * (1 + random_changes)
    else:
        # Use historical returns to generate paths
        for i in range(1, num_steps + 1):
            random_returns = np.random.choice(historical_returns, N)
            paths[:, i] = paths[:, i-1] * (1 + random_returns)

    return paths
    
====================================================================================

def simulate_gbm(S0, mu, sigma, dt, T, N):
  start_process = time.perf_counter()
  M = int(T / dt)
  S = np.zeros((M + 1, N))
  S[0] = S0
  for t in range(1, M + 1):
      dW = np.random.normal(0, np.sqrt(dt), N)
      S[t] = S[t - 1] * np.exp((mu - 0.5 * sigma ** 2) * dt + sigma * dW)
  duration = time.perf_counter() - start_process
  return S
    `, // Code snippet
        [
            '/images/monteCarloPlot.png',
          '/images/GBMPlot.png'
        ] // Array of image URLs
      ),

      createSection(
        'sequential-modeling',
        'Sequential Modeling',
        'I\'m thrilled to work with such models. You see Sequential models are as they say, sequential. They can\'t accurately tell you relations between sets of data,  but they can generate a vector of coefficients for a vector of variables in such way, that it approaches steady values, making predictions ans possible understandingof data relations easier. Would really enjoy a proffesional opportunity to work more on them!',
        'Example: Stock Price Sequential Model',
        `Implemented a sequential neural network to model and predict prices based on historical data.`,
        `
        Logic: (where a_i for i ε [1,N] are the calcualted coefficients)
                                                       __
                                                      |a1|
                                                      |a2|
        [indicator1, indicator2, ... , indicatorN]*   |. | ---> ResultY
                                                      |. |
                                                      |. |
                                                      |aN|
                                                       --



#REQUIREMENTS
import numpy as np
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
from tensorflow.keras import Sequential
import tensorflow as tf
from tensorflow.keras.layers import LSTM, Dense

# Prepare training data
timesteps = 300  # Number of time steps (5 hours of 1m data)
n_features = df_train.shape[1]  # Number of features

# Create sequences for training
X_train = []
y_train = []

for i in range(timesteps, len(df_train) - 60):
    X_train.append(df_train.iloc[i - timesteps:i].values)
    y_train.append(df_train['close'].iloc[i + 60])

X_train = np.array(X_train)
y_train = np.array(y_train)

# Split data into training and validation sets
X_train, X_val, y_train, y_val = train_test_split(X_train, y_train, test_size=0.2, random_state=42)

# Define the LSTM model
model = Sequential()
model.add(LSTM(50, activation='relu', input_shape=(timesteps, n_features)))
model.add(Dense(1))  # Output layer for single continuous value
model.compile(optimizer='adam', loss='mean_squared_error', metrics=['mean_squared_error'])

# Train the model
history = model.fit(X_train, y_train, epochs=50, batch_size=32, validation_data=(X_val, y_val), verbose=1)

# Save the trained model
model.save('lstm_model.h5')
print("Model saved as 'lstm_model.h5'")

# Fetch and prepare backtest data
... df_backtest = some data

# Prepare data for backtesting
X_backtest = []
y_backtest_actual = []

for i in range(timesteps, len(df_backtest) - 60):
    X_backtest.append(df_backtest.iloc[i - timesteps:i].values)
    y_backtest_actual.append(df_backtest['close'].iloc[i + 60])

X_backtest = np.array(X_backtest)
y_backtest_actual = np.array(y_backtest_actual)

# Load the trained model
#model = load_model('lstm_model.h5')

# Predict with the backtest data
y_backtest_pred = model.predict(X_backtest)

# Check for NaNs in predictions
if np.any(np.isnan(y_backtest_pred)):
    print("NaNs found in model predictions")

# Evaluate predictions
if not np.any(np.isnan(y_backtest_pred)) and not np.any(np.isnan(y_backtest_actual)):
    mse = mean_squared_error(y_backtest_actual, y_backtest_pred)
    print(f"Mean Squared Error (MSE) on Backtest Data: {mse:.4f}")

    # Print detailed prediction results and PnL
    print("Backtest Detailed Results:")
    for i in range(5):  # Adjust range for more or fewer entries
        entry_price = df_backtest['close'].iloc[timesteps + i]  # Price at the end of 5-hour period
        predicted_price = y_backtest_pred[i][0]
        actual_price = y_backtest_actual[i]

        # Calculate PnL
        if predicted_price > entry_price:  # Long position
            pnl = ((actual_price - entry_price) / entry_price) * 100
        else:  # Short position
            pnl = ((entry_price - actual_price) / entry_price) * 100

        # Print results
        print(
            f"Entry Price: {entry_price:.2f}, Predicted Price: {predicted_price:.2f}, Actual Price: {actual_price:.2f}, PnL: {pnl:.2f}%")
else:
    if np.any(np.isnan(y_backtest_pred)):
        print("NaNs found in model predictions")
    else:
        print("Cannot compute MSE or PnL due to NaNs in actual values.")
        `,
        [
        ]
      ),
      createSection(
        'deep-q-learning',
        'Deep Q-Learning',
        'One of my most unstable projects to be honest, but also the most interesting one yet!',
        'Example: Desing and Train a deepQlearning model to choose trading sides',
        `Created a trading bot using Deep Q-Learning to optimize trading strategies based on historical market data. But to actually train it for more than 2 EPISODES (at least 1000 required for accuracy) for a large/reliable dataset, the estimated calculation time is 8.5 years in my device. R.I.P. to that dream. Never the less, here's everything to be seen:`,
        `
        Note: the trading ENV used is a creation of mine and I can't share. I wil share code about calling it and training it.
              I hope one day to be in position to openly share it with anyone interested!


                          MainCode
        -----------------------------------------
        EPISODES = 1000
        # Define the path for saving the model in the native Keras format
        documents_path = os.path.join(os.path.expanduser("~"), "Documents")
        model_path = os.path.join(documents_path, "dqn_model.keras")
        # Fetch data and prepare the DataFrame
        df, data_list = util.fetch_ohlcv('BTC/USDT', '1m', "2024-01-01T12:00:00Z", "2024-08-01T18:00:00Z")
        df = df.drop(columns=['timestamp'])
        df['dummy'] = 0.0
        df = df.astype(np.float32)
        # Build the model
        model = build_dqn((50, df.shape[1]), 3)
        env = TradingEnv(df)
        # # Train the model
        train_dqn(env, model, episodes=EPISODES)
        # Save the trained model to the Documents directory using native Keras format
        model.save(model_path, save_format='keras')
        print(f"Model saved to {model_path}")
        # Load the model from the Documents directory
        model = load_model(model_path)
        print(f"Model loaded from {model_path}")
        # Backtest the model
        if model:
            backtest_dqn(env, model)
        else:
            print("Failed to load the model.")

                    TradingClass
        -----------------------------------------
        def train_dqn(env, model, episodes=1000, gamma=0.99, epsilon=1.0, epsilon_min=0.01, epsilon_decay=0.995):
          replay_buffer = deque(maxlen=1000)
          counter = 0
          for episode in range(episodes):
              counter += 1
              state = env.reset()
              state = state.reshape((1, state.shape[0], state.shape[1]))
              done = False
              total_reward = 0
              print(f"[EPISODE {episode + 1}] Starting new episode.")

              while not done:
                  if np.random.rand() <= epsilon:
                      action = random.randrange(env.action_space.n)
                      print(f"[ACTION] Randomly chosen action: {action} (epsilon={epsilon})")
                  else:
                      q_values = model.predict(state)
                      action = np.argmax(q_values[0])
                      print(f"[ACTION] Model chose action: {action}")

                  next_state, reward, done, _ = env.step(action)
                  next_state = next_state.reshape((1, next_state.shape[0], next_state.shape[1]))
                  replay_buffer.append((state, action, reward, next_state, done))
                  state = next_state
                  total_reward += reward

                  print(f"[REWARD] Reward received: {reward}, Total reward: {total_reward}")

                  if len(replay_buffer) > 32:
                      minibatch = random.sample(replay_buffer, 32)
                      mini_counter = 0
                      total_trains = len(minibatch)
                      for s, a, r, ns, d in minibatch:
                          mini_counter += 1
                          target = r
                          if not d:
                              target = r + gamma * np.amax(model.predict(ns)[0])
                          target_f = model.predict(s)
                          target_f[0][a] = target
                          model.fit(s, target_f, epochs=1, verbose=0)
                          print(f"[TRAINING] Updated Q-network for action {a} with target {target} -- EPISODE: {counter} -- Train No: {mini_counter}/{total_trains}")

              epsilon = max(epsilon_min, epsilon * epsilon_decay)
              print(f"[EPISODE {episode + 1}] Total Reward: {total_reward}, Epsilon: {epsilon}")

          # Save the trained model
          model.save('dqn_model.h5')
          print("[MODEL] Trained model saved as 'dqn_model.h5'")
        `,
        []
      ),
     
      
    )
  );
}

function createSection(
    id, title, description, exampleTitle, exampleDescription, codeSnippet, images
  ) {
    return React.createElement(
      'section',
      { id: id, className: 'mb-16' },
      React.createElement(
        'h2',
        { className: 'text-3xl font-semibold mb-6' },
        title
      ),
      React.createElement('p', { className: 'mb-4' }, description),
      React.createElement(
        'div',
        { className: 'bg-blue-100 p-6 rounded-lg mb-4' },
        React.createElement(
          'h3',
          { className: 'text-xl font-semibold mb-2' },
          exampleTitle
        ),
        React.createElement('p', null, exampleDescription)
      ),
      React.createElement(
        'div',
        { className: 'mb-4' },
        React.createElement(
          'h4',
          { className: 'text-lg font-semibold mb-2' },
          'Code Snippet:'
        ),
        React.createElement(
            'div',
            { className: 'overflow-auto max-w-full bg-gray-100 p-4 rounded-lg', style: { maxHeight: '400px' } }, // Set max height to fit content
            React.createElement(
              'pre',
              { className: 'whitespace-pre', style: { overflowX: 'auto', overflowY: 'auto' } }, // Horizontal and vertical scroll
              React.createElement('code', { className: 'text-sm' }, codeSnippet)
            )
          )
      ),
      React.createElement(
        'div',
        { className: 'mb-4' },
        React.createElement(
          'h4',
          { className: 'text-lg font-semibold mb-2' },
          'Images:'
        ),
        React.createElement(
          'div',
          { className: 'flex flex-wrap justify-center gap-6' },
          images.map((src, index) =>
            React.createElement('img', {
              key: index,
              src: src,
              alt: title + ' image ' + (index + 1),
              className: 'max-w-full h-auto object-cover rounded-lg' // Ensure images fit within their container
            })
          )
        )
      )
    );
  }

  

export default DataProject;
