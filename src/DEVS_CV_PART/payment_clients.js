import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ClientsPage() {
  const [activeTab, setActiveTab] = useState('mexcHttp');
  const navigate = useNavigate();

  const codeExamples = {
    mexcHttp: `
api_key = "REPLACE_WITH_YOUR_ACTUAL_API_KEY"
api_secret = "REPLACE_WITH_YOUR_ACTUAL_API_SECRET"
mexcApi = mexcClient(api_key, secret_key)

#TESTING ORDERBOOK RETRIEVAL
print(mexcApi.orderbook('AEVO_USDT',100))

#TESTING HISTORY OF POSITIONS
print(mexcApi.history_positions())

#TESTING PRICE RETRIEVAL FUNCTION (FOR FUTURES ENDPOINT)
print(mexcApi.get_future_price('AEVO_USDT'))

#TESTING ALL ASSETS WALLET ENDPOINT
print(mexcApi.see_wallet())

#TESTING SPECIFIC ASSET WALLET ENDPOINT (USDT)
print(mexcApi.see_wallet_on_symbol('USDT'))

TESTING LEVERAGE RETRIEVAL ON COIN (AEVO)
# print(mexcApi.get_leverage('AEVO_USDT'))

#TESTING OPEN NEW POSITION ON COIN (AEVO)
print(mexcApi.open_market('AEVO_USDT', 1,1))

#TESTING RISK LEVEL CHANGE (ACTUALLY JUST GENERAL POST REQUESTS)
# print(mexcApi.change_risk_level())

#TESTING LEVERAGE CHANGE ON COIN (AEVO)
print(mexcApi.set_leverage('AEVO_USDT',20))
    `,
    mexcSelenium: `
#FETCH PRICE OF COIN (THAT IS VISUAL AVAIALBLE IN WEBPAGE)
price_shown_in_webpage=print(float(get_future_price()))

#LOAD QUANTITY FOR TRADE
set_quantity(quantity)

#OPEN A POSITION HAVING THE QUANTITY LOADED
open_position_quantity_loaded('LONG')

#OPEN A POSITION WITHOUT HAVING THE QUANTITY LOADED
open_position('LONG', quantity)

#FLASH/COMPLETLY CLOSE ALL POSITIONS
close_all_positions()
    `,
    bybitSimple: `
bybit_api = BybitClient(api_key="REPLACE_WITH_YOUR_ACTUAL_KEY", api_secret="REPLACE_WITH_YOUR_ACTUAL_SECRET")

#TEST RETRIEVING FUTURE PRICE
print(bybit_api.get_future_price('BTCUSDT'))

#TEST RETRIEVING SPOT PRICE
print(bybit_api.get_spot_price('BTCUSDT'))

#TEST RETRIEVING SPECIFIC BALANCE ON SYMBOL
print(bybit_api.get_wallet_balance_on_symbol('USDT'))

#TEST RETREIVING OVERALL BALANCE
print(bybit_api.get_wallet_balance())

#TEST RETRIEVING INFO ON OPEN FUTURE POSITION
print(bybit_api.get_future_position_info('BTCUSDT'))

#TEST RETRIEVING INFO ON ALL FUTURE POSITIONS
print(bybit_api.get_all_futures_positions())

#TEST SETTING LEVERAGE FOR TRADING PAIR (BOTH SPOT AND FUTURES)
print(bybit_api.set_leverage('BTCUSDT', buyLev, sellLev))

#TEST OPENING MARKET POSITION ON FUTURES
print(bybit_api.open_futures_position('BTCUSDT', 'LONG', quantity))

#VOLUME RETRIEVAL TEST
print(bybit_api.get_volume('BTCUSDT', category='spot'))
print(bybit_api.get_volume('BTCUSD', category='linear'))

#VOLATILITY RETRIEVAL TEST
print(bybit_api.get_volatility('ETH/USD'))


#ORDERBOOK FOR OPTIONS FETCH TEST
print(bybit_api.orderbook(symbol='BTC-27JUN25-160000-P', category='option', limit=25))

#FETCH OPTIONS WITH EXPIRY DATE TEST --I THINK COIN IS ALSOA PARAMETER AND SET TO BTC AS DEFAULT
options = bybit_api.get_options_with_date(desired_date='2SEP24')
    `
  };

  return React.createElement(
    'div',
    { className: 'min-h-screen bg-[#0a192f] text-white font-sans' },
    React.createElement(
      'div',
      { className: 'container mx-auto px-4 py-8' },
      React.createElement(
        'a',
        {
          href: '#',
          className: 'mb-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
          onClick: (e) => {
            e.preventDefault();
            navigate(-1);
          }
        },
        React.createElement('i', { className: 'fas fa-arrow-left mr-2' }),
        'Back to Previous Page'
      ),
      React.createElement('h1', { className: 'text-4xl font-bold mb-8' }, 'Crypto Exchange Clients Showcase'),
      React.createElement(
        'div',
        { className: 'flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8' },
        React.createElement(
          'button',
          {
            className: `py-2 px-4 rounded ${activeTab === 'mexcHttp' ? 'bg-blue-600' : 'bg-blue-800'}`,
            onClick: () => setActiveTab('mexcHttp')
          },
          'MEXC HTTP Client'
        ),
        React.createElement(
          'button',
          {
            className: `py-2 px-4 rounded ${activeTab === 'mexcSelenium' ? 'bg-blue-600' : 'bg-blue-800'}`,
            onClick: () => setActiveTab('mexcSelenium')
          },
          'MEXC Selenium Client'
        ),
        React.createElement(
          'button',
          {
            className: `py-2 px-4 rounded ${activeTab === 'bybitSimple' ? 'bg-blue-600' : 'bg-blue-800'}`,
            onClick: () => setActiveTab('bybitSimple')
          },
          'Bybit Simple Client'
        )
      ),
      React.createElement(
        'div',
        { className: 'bg-[#112240] p-6 rounded-lg shadow-lg' },
        activeTab === 'mexcHttp' && React.createElement(
          React.Fragment,
          null,
          React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'MEXC HTTP Client'),
          React.createElement(
            'p',
            { className: 'mb-4' },
            'This Python client for MEXC uses HTTP requests to interact with the exchange\'s API. It provides functions for account balance retrieval and order placement. It\'s critical to note that currently due to exchange\'s endpoint malfunction (it\'s "under maintance") the order placement doesn\'t work. For more analytical guidelines please view the read me file in the github project. Below is a quick guideon how to interact with some functions:'
          ),
          React.createElement(
            'pre',
            { className: 'bg-[#1e3a8a] p-4 rounded-md overflow-x-auto mb-4' },
            React.createElement('code', { className: 'text-sm' }, codeExamples.mexcHttp)
          ),
          React.createElement(
            'a',
            {
              href: 'https://github.com/blacklotus976/cryptoClients',
              target: '_blank',
              rel: 'noopener noreferrer',
              className: 'inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            },
            'View on GitHub'
          )
        ),
        activeTab === 'mexcSelenium' && React.createElement(
          React.Fragment,
          null,
          React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'MEXC Selenium Client'),
          React.createElement(
            'p',
            { className: 'mb-4' },
            'This client was developed \'cause of the lack on functional open order endpoint on MEXC\'s official endpoints. To be operational it needs the user to meet some Requirements, like open webpage, all elements needed in visual field of the page etc... for detailed expalantion and guides please view the read me in Github. Below follow some geenral uses of functions:'
          ),
          React.createElement(
            'pre',
            { className: 'bg-[#1e3a8a] p-4 rounded-md overflow-x-auto mb-4' },
            React.createElement('code', { className: 'text-sm' }, codeExamples.mexcSelenium)
          ),
          React.createElement(
            'a',
            {
              href: 'https://github.com/blacklotus976/cryptoClients',
              target: '_blank',
              rel: 'noopener noreferrer',
              className: 'inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            },
            'View on GitHub'
          )
        ),
        activeTab === 'bybitSimple' && React.createElement(
          React.Fragment,
          null,
          React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Bybit Simple Client'),
          React.createElement(
            'p',
            { className: 'mb-4' },
            'Bybit offers official guidelines for everyone to build his own client using it\'s endpoints. It also offers a library, unfortunately without guidelines and instructions. So after a lot of searching using print(dir()) command in every class and file of pybit library, I\'m in position to offer every user a simplier solution. It combines all the required endpoints of the library to provide simplicity and understanding in Futures Trading on Bybit. The code is open for anyone to use and update upon it. Feel free to reach out if you want to upgrade anything. I\'m plannin gon releasing another client that directly uses HTTP requests on their endpoints, so I don\'t take this that seriously. Anyway, here are some example (again for more analytic guidelines please view the project\'s readme on Github):'
          ),
          React.createElement(
            'pre',
            { className: 'bg-[#1e3a8a] p-4 rounded-md overflow-x-auto mb-4' },
            React.createElement('code', { className: 'text-sm' }, codeExamples.bybitSimple)
          ),
          React.createElement(
            'a',
            {
              href: 'https://github.com/blacklotus976/cryptoClients',
              target: '_blank',
              rel: 'noopener noreferrer',
              className: 'inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            },
            'View on GitHub'
          )
        )
      )
    )
  );
}

export default ClientsPage;
