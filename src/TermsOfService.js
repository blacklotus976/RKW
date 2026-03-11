import React from 'react';
import { Link } from 'react-router-dom';

function ToSPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold font-roboto">TERMS OF SERVICE</Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/login" className="hover:underline font-roboto">Login</Link></li>
              <li><a href="#" className="hover:underline font-roboto">More Options</a></li>
              <li><Link to="/" className="hover:underline font-roboto">Main Page</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="max-w-4xl bg-white rounded-2xl shadow-xl p-10 space-y-8">
          <h1 className="text-5xl font-bold text-center mb-6 font-roboto text-blue-600">Here all our terms of services are declared!</h1>
          
          <p className="text-xl mb-6 font-crimson-text text-gray-700 leading-relaxed">
            We please the reader/user to take a moment and read our terms of service, as it is here stated, what the page save, what the cookies do, what information we hold and use, and in general all the rights we reserve from someone who visits our website and uses our products.
          </p>
          
          <div className="bg-blue-50 rounded-xl p-6 shadow-inner">
            <h2 className="text-3xl font-semibold mb-4 font-roboto text-blue-700">What information we keep:</h2>
            
            <ul className="list-none space-y-2 mb-4 font-crimson-text">
              <li className="flex items-center"><i className="fas fa-globe-americas text-blue-500 mr-2"></i> Personal data like e-mail or phone that user has offered to create an account</li>
              <li className="flex items-center"><i className="fas fa-balance-scale text-blue-500 mr-2"></i> Passwords or other keys user has created for his accounts (in hashed form though)</li>
              <li className="flex items-center"><i className="fas fa-chart-bar text-blue-500 mr-2"></i> Personal preferences* for the website</li>
              <li className="flex items-center"><i className="fas fa-unlock text-blue-500 mr-2"></i> We won't ask you to provide bank/credit card details or other information regarding your personal wallets for any Transaction. Instead we use PayPal ONLY.</li>
            </ul>
          </div>
          
          <p className="text-lg mb-6 font-crimson-text text-gray-700">
            *About personal preferences: We will often ask the user to choose variant details about his experience with our website. These are minor choices about the frontend experience and will be holded to remain the appropriate/requested frontened approach according to user's choices. Data like these WON'T be shared to third parties (like there was a reason to begin with)
          </p>
          
          <div className="bg-indigo-50 rounded-xl p-6 shadow-inner">
            <h2 className="text-2xl font-semibold mb-4 font-roboto text-indigo-700">Cookies, Personal Data and other Options required for use of our products</h2>
            <p className="text-lg font-crimson-text text-gray-700 mb-4">
              According PAragraph, to be filled!
            </p>
          </div>
          
          <div className="bg-green-50 rounded-xl p-6 shadow-inner">
            <h2 className="text-2xl font-semibold mb-4 font-roboto text-green-700">Whole Legal Version</h2>
            <p className="text-lg font-crimson-text text-gray-700 mb-4">
              Current version: 2.5.1 (Released June 2023)
            </p>
            <p className="text-lg font-crimson-text text-gray-700">
              For advanced search and Understanding of our Terms of Services, please download the whole paper. In case a user fails to find what he's searching or spots a hole, please contact as at: legal@rkw.com. We thank you in advance!
            </p>
            <a href="/download" className="inline-block mt-4 bg-green-600 text-white font-bold py-2 px-4 rounded-full hover:bg-green-700 transition duration-300 font-roboto">
              Download PaperPrint ToS <i className="fas fa-download ml-2"></i>
            </a>
            <p className="text-sm font-crimson-text text-red-500 mt-2">
              Don't click, they don't lead anywhere, not yet developed
            </p>
          </div>
          
         
        </div>
      </main>

      <footer className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <span className="font-roboto">&copy; 2023 FreeNews</span>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:underline font-roboto">Privacy Policy</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default ToSPage;
