import React from 'react';
import { useNavigate } from 'react-router-dom';

function FwkiesLoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const navigate = useNavigate();

  const testAccounts = [
    { email: 'test@example.com', password: 'password123' },
    { email: 'user@example.com', password: 'userpass456' }
  ];

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const isTestAccount = testAccounts.some(
      (account) => account.email === email && account.password === password
    );

    if (isTestAccount) {
      console.log('Test login successful');
      navigate('/fwkies_homepage_logged_in'); // Redirect to the main page
      return;
    }

    try {
      const response = await fetch('YOUR_BACKEND_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        console.log('Login successful', data.token);
        navigate('/fwkies_homepage_logged_in'); // Redirect to the main page
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/fwkies_signup');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 font-roboto">
          {isLogin ? "Social Media Login" : "Create Account"}
        </h1>
        
        <p className="text-gray-600 mb-6 font-roboto text-sm">
          {isLogin 
            ? "Welcome! Please log in to access the content. You need to authenticate before you can see the actual content of our social media platform."
            : "Welcome! Create an account to join our social media platform and connect with others."}
        </p>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 font-roboto">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black font-roboto"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 font-roboto">Password</label>
            <div className="mt-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black font-roboto"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={togglePasswordVisibility}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400`}></i>
              </button>
            </div>
          </div>
          
          {error && <p className="text-red-500 text-sm font-roboto">{error}</p>}
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black font-roboto"
            >
              {isLogin ? "Log in" : "Sign up"}
            </button>
            {isLogin && (
              <a href="#" className="text-sm text-gray-600 hover:text-black font-roboto">Forgot password?</a>
            )}
          </div>
        </form>
        
        <div className="mt-4 text-center">
          {isLogin ? (
            <button onClick={handleSignupRedirect} className="text-sm text-gray-600 hover:text-black font-roboto">
              Don't have an account? Sign up
            </button>
          ) : (
            <button onClick={toggleAuthMode} className="text-sm text-gray-600 hover:text-black font-roboto">
              Already have an account? Log in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FwkiesLoginPage;
