import React from 'react';
import { Link } from 'react-router-dom';

function Timeseries() {

  const models = {
    arima: {
      name: 'ARIMA (AutoRegressive Integrated Moving Average)',
      description: `
        ARIMA is a popular statistical model used for time series forecasting, particularly when the data is non-stationary. It captures temporal dependencies in price series data by using a combination of autoregressive (AR) terms, differencing (I for integrated), and moving averages (MA). The model is primarily used for univariate time series forecasting and is widely applied in financial markets to predict future price movements.

        **Key Components of ARIMA:**
        - **AR (AutoRegressive) Term:** Captures the relationship between an observation and a certain number of lagged observations. 
        - **I (Integrated) Term:** Makes the time series stationary by differencing the data, i.e., subtracting the previous observation from the current one to remove trends.
        - **MA (Moving Average) Term:** Models the dependency between an observation and a residual error from a moving average model applied to lagged observations.

        **ARIMA Model Notation (p, d, q):**
        - **p:** The number of lag observations included in the model (AR terms).
        - **d:** The number of times that the raw observations are differenced to make the series stationary.
        - **q:** The size of the moving average window (MA terms).
        
        **Example:**
        - For a daily time series of Bitcoin prices, you might apply ARIMA(2,1,2), which means using two lagged observations, differencing once to make the data stationary, and applying a 2-lag moving average to forecast future prices.
      
        **When to Use ARIMA:**
        - Best suited for price series that exhibit strong autocorrelation (prices dependent on their past values) but without significant volatility clustering (i.e., periods of varying volatility).
        - It's ideal for predicting future prices over short to medium horizons when the data shows clear linear trends and seasonality.
      `,
      photo:'',
      imageAlt: 'ARIMA Model Example for Predicting Crypto Prices'
    },
    garch: {
      name: 'GARCH (Generalized AutoRegressive Conditional Heteroskedasticity)',
      description: `
        GARCH is a powerful time series model used to predict not just the future prices but also the volatility of financial instruments like cryptocurrencies. Unlike ARIMA, GARCH models the volatility of the data (conditional variance) and can handle periods of clustering volatility, where periods of high volatility tend to be followed by more volatility.

        **Key Components of GARCH:**
        - **G (Generalized):** Extends the basic ARCH model, allowing past forecast errors and past variances to influence future variance.
        - **ARCH Term:** Autoregressive conditional heteroskedasticity, meaning past squared residuals (errors) influence the future volatility.
        - **GARCH Term:** Adds past conditional variances to the model to better account for long-term volatility trends.

        **GARCH Model Notation (p, q):**
        - **p:** The number of lag terms for past variances (GARCH terms).
        - **q:** The number of lag terms for past forecast errors (ARCH terms).
        
        **Example:**
        - A GARCH(1,1) model is commonly used for financial price prediction because it assumes that today's volatility depends on both yesterday’s volatility and yesterday’s price shocks. For predicting Bitcoin’s price volatility, a GARCH model could help in capturing periods of extreme price fluctuations.
      
        **When to Use GARCH:**
        - Best suited for markets that exhibit volatility clustering, such as cryptocurrencies, where periods of calm are followed by periods of high volatility and vice versa.
        - It’s commonly used when forecasting the risk (volatility) rather than the exact future price, especially in markets like crypto that are known for sharp swings in volatility.
      `,
      photo:'',
      imageAlt: 'GARCH Model Example for Predicting Crypto Price Volatility'
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
          <h1 className="text-xl font-bold">Crypto Price Prediction Models</h1>
        </div>
      </nav>

      <main className="container mx-auto mt-8 px-4">
        <h2 className="text-3xl font-bold mb-4">ARIMA and GARCH Models for Predicting Cryptocurrency Prices</h2>
        <p className="mb-8">
          Cryptocurrency markets are highly dynamic and volatile, making it challenging to predict future price movements. Two commonly used models for forecasting prices are the ARIMA and GARCH models. Each model is designed to capture different aspects of the price data—ARIMA focuses on trends and dependencies in the price itself, while GARCH is tailored for modeling the volatility of price changes. In this guide, we’ll dive deep into both models and explore their applications in the crypto market.
        </p>

        <div className="mb-8">
          <img 
            src="" 
            alt="Price Prediction Models Overview" 
            className="w-full h-auto rounded-lg shadow-md"
          />
          <p className="text-center mt-2 text-gray-600">Fig 1: Overview of ARIMA and GARCH Models</p>
        </div>

        <div className="space-y-8">
          {Object.keys(models).map((key) => (
            <div key={key} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">{models[key].name}</h3>
              <p className="mb-4 whitespace-pre-line">{models[key].description}</p>
              <div className="mb-4">
                <img 
                  src={`${models[key].photo}`} 
                  alt={models[key].imageAlt} 
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <p className="text-center mt-2 text-gray-600">Fig 2: {models[key].imageAlt}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h4 className="text-xl font-semibold mb-4">When to Use ARIMA vs. GARCH</h4>
          <p>
            Understanding when to apply ARIMA versus GARCH is crucial for making accurate predictions in cryptocurrency markets. Below is a comparison to help decide which model is suitable based on the specific characteristics of the price series:
          </p>
          <ul className="list-disc list-inside">
            <li><strong>ARIMA:</strong> Use ARIMA when the data shows clear trends and autocorrelations in prices but doesn’t exhibit significant volatility fluctuations. It works well for predicting prices in relatively stable or trending markets.</li>
            <li><strong>GARCH:</strong> Use GARCH when the focus is on modeling and predicting volatility. This is especially useful in crypto markets, where periods of low volatility are often followed by sharp, high-volatility periods. It helps in risk management and volatility forecasting rather than direct price forecasting.</li>
          </ul>
          <p className="mt-4 text-gray-600">
            Depending on the market conditions and goals—whether predicting future price levels (ARIMA) or forecasting volatility (GARCH)—experienced traders can decide which model to apply. Both models provide valuable insights when used correctly, especially in the fast-paced, volatile crypto market.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Timeseries;
