import React from "react";
import { Link } from "react-router-dom";

function ProductsPage() {
  const [showLogin, setShowLogin] = React.useState(false);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-xl font-bold">Main Page</Link>
          <div>
            <button onClick={() => setShowLogin(!showLogin)} className="text-white mr-4">Login</button>
            <Link to="#" className="text-white">More</Link>
          </div>
        </div>
      </nav>

      <div className="flex-grow p-8">
        <h1 className="text-4xl font-bold text-center mb-12 font-roboto">Our Programs and Services</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 font-roboto">AIR - Anonymous Incidents Report</h2>
            <p className="mb-4">Report incidents anonymously to local police. Enhance community safety with confidential reporting.</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Report Incident</button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 font-roboto">FreeNews</h2>
            <p className="mb-4">Get unbiased news with our advanced propaganda and fake news detection. Stay informed, stay accurate.</p>
            <Link to="/freenewspage" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">Search News</Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 font-roboto">Trading Strategies</h2>
            <p className="mb-4">Discover our proven trading strategies. Maximize your investments with data-driven insights.</p>
            <Link to="/economyProject" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">Explore Results</Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 font-roboto">TTrack Athens</h2>
            <p className="mb-4">Experience the thrill of F1 on our custom-designed track in Athens. Push your limits on a professional circuit.</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">Book a Lap</button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 font-roboto">Eco-Politics Documentation</h2>
            <p className="mb-4">Dive into comprehensive eco-politics research. Stay informed on environmental policies and their impacts.</p>
            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300">Access Research</button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 font-roboto">KGG:TDP</h2>
            <p className="mb-4">Κύρος Γκόλαφ το Γκολφ Traffic Distraction Pack! Bored in traffic? check out this solution? Guranteed imprisonment for driving under distractions... but totally worth it!!!</p>
            <Link to="/KGGTDP" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">Check product...</Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 font-roboto">SortThings</h2>
            <p className="mb-4">Shape public opinion. Vote, rate, and contribute to real-time statistics on trending topics.</p>
            <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition duration-300">Cast Your Vote</button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 font-roboto">Weather Free App</h2>
            <p className="mb-4">Access satellite data for comprehensive weather forecasting, from basic predictions to complex atmospheric dynamics.</p>
            <button className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 transition duration-300">Check Weather</button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 font-roboto">DreamWorld</h2>
            <p className="mb-4">Enter a world of united dreams. Collaborate and create in a shared imaginative space.</p>
            <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition duration-300">Start Dreaming</button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 font-roboto">CAR:GO Vintage</h2>
            <p className="mb-4">Explore our collection of classic cars. Relive the golden age of automobiles and discover automotive history.</p>
            <Link to="/car-showcase" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300">View Collection</Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 font-roboto">I.S.S.U.T.</h2>
            <p className="mb-4">Let this remain a secret for the time being.</p>
            <Link to="/economyProject" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300">Don't click, it doesn't do anything</Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4 font-roboto">Fwkies Social Media</h2>
            <p className="mb-4">Explore the newest social media created by our team.</p>
            <Link to="/fwkies" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300">Visit Homepage</Link>
          </div>

        </div>
        
        

        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4 font-roboto">A Poem on Providing to Society</h2>
          <p className="text-lg font-crimson-text">
            In the tapestry of life, we weave our thread,<br />
            With every action, a story is said.<br />
            Our programs and services, tools of change,<br />
            Empowering minds, horizons to range.<br /><br />

            From anonymous reports to unbiased news,<br />
            We offer platforms for diverse views.<br />
            Trading insights and racing thrills,<br />
            Eco-politics and voting, society builds.<br /><br />

            Weather forecasts and dream realms unite,<br />
            Expanding knowledge, day and night.<br />
            Vintage cars from days of yore,<br />
            Bring history to life once more.<br /><br />

            Together we stand, united we grow,<br />
            Our contributions help society flow.<br />
            In giving, we receive, in sharing, we thrive,<br />
            For a better world, we constantly strive.
          </p>
        </div>
      </div>

      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="#" className="hover:text-gray-300">Privacy Policy</Link>
          <Link to="#" className="hover:text-gray-300">Terms of Service</Link>
        </div>
      </footer>

      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form>
              <input type="email" name="email" placeholder="Email" className="w-full mb-4 p-2 border rounded" />
              <input type="password" name="password" placeholder="Password" className="w-full mb-4 p-2 border rounded" />
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
            </form>
            <button onClick={() => setShowLogin(false)} className="mt-4 text-sm text-gray-600">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
