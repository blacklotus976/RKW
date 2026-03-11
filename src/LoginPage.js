import React from 'react';

function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">RKW User</div>
          <ul className="flex space-x-4">
            <li><a href="/" className="text-blue-600 hover:text-blue-800">Home</a></li>
            <li><a href="#" className="text-blue-600 hover:text-blue-800">More options</a></li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Login</h2>
          <form>
            <div className="mb-4">
              <input
                type="text"
                name="emailOrPhone"
                placeholder="Email or Phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="button" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
            <div className="flex justify-between items-center mb-6">
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">Don't have an account?</span>
            <a href="#" className="text-sm text-blue-600 hover:underline ml-1">Sign up</a>
          </div>
          <p className="mt-6 text-sm text-gray-600 text-center">
            Accounts currently work only for the employees, since the whole project isn't open yet. We will support you soon.
          </p>
        </div>
      </main>

      <footer className="bg-white shadow-md mt-auto">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center text-sm text-gray-600">
          <div>© 2023 Company Name. All rights reserved.</div>
          <div>
            <a href="#" className="hover:text-blue-600 mr-4">Terms of Service</a>
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
          </div>
        </div>
      </footer>
      
      <style jsx global>{`
        body {
          background-image: url('/smiling-miata.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
