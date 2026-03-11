function MainComponent() {
    const [email, setEmail] = React.useState("");
    const [isSubscribed, setIsSubscribed] = React.useState(false);
  
    const handleSubscribe = (e) => {
      e.preventDefault();
      if (email) {
        setIsSubscribed(true);
        setEmail("");
      }
    };
  
    return (
      <div className="min-h-screen">
        <nav className="fixed w-full bg-black bg-opacity-50 z-50 text-white">
          <div className="container mx-auto px-4 py-4">
            <ul className="flex flex-wrap justify-center space-x-6">
              <li>
                <a
                  href="#scenery"
                  className="hover:text-blue-300 transition-colors"
                >
                  Scenery
                </a>
              </li>
              <li>
                <a
                  href="#hiking"
                  className="hover:text-blue-300 transition-colors"
                >
                  Hiking Trails
                </a>
              </li>
              <li>
                <a href="#ski" className="hover:text-blue-300 transition-colors">
                  Ski Resort
                </a>
              </li>
              <li>
                <a
                  href="#driving"
                  className="hover:text-blue-300 transition-colors"
                >
                  Driving Routes
                </a>
              </li>
              <li>
                <a
                  href="#cities"
                  className="hover:text-blue-300 transition-colors"
                >
                  Nearby Cities
                </a>
              </li>
              <li>
                <a
                  href="#stories"
                  className="hover:text-blue-300 transition-colors"
                >
                  Personal Stories
                </a>
              </li>
            </ul>
          </div>
        </nav>
  
        <section className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 text-center text-white">
            <h1 className="text-6xl md:text-8xl font-crimson-text mb-4">
              Mount Parnassos
            </h1>
            <p className="text-xl md:text-2xl font-roboto">
              Where mythology meets nature
            </p>
          </div>
        </section>
  
        <section id="scenery" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-crimson-text text-center mb-12">
              Breathtaking Scenery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-200 h-[400px] rounded-lg"></div>
              <div className="flex flex-col justify-center">
                <p className="text-lg font-roboto mb-6">
                  Experience the majestic views of Mount Parnassos, where ancient
                  Greek mythology comes to life amidst stunning natural
                  landscapes.
                </p>
              </div>
            </div>
          </div>
        </section>
  
        <section id="hiking" className="bg-[#1a237e] text-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-crimson-text text-center mb-12">
              Hiking Trails
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-700 h-[300px] rounded-lg"></div>
              <div className="bg-gray-700 h-[300px] rounded-lg"></div>
              <div className="bg-gray-700 h-[300px] rounded-lg"></div>
            </div>
          </div>
        </section>
  
        <section id="ski" className="bg-black text-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-crimson-text text-center mb-12">
              Ski Resort
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800 h-[400px] rounded-lg"></div>
              <div className="flex flex-col justify-center">
                <p className="text-lg font-roboto mb-6">
                  Discover world-class skiing facilities and pristine slopes at
                  one of Greece's premier winter destinations.
                </p>
              </div>
            </div>
          </div>
        </section>
  
        <section id="stories" className="bg-white py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-crimson-text text-center mb-12">
              Personal Stories
            </h2>
            <blockquote className="text-xl font-crimson-text italic text-center max-w-3xl mx-auto mb-8">
              "Mount Parnassos isn't just a mountain - it's where I discovered my
              love for nature and adventure."
            </blockquote>
          </div>
        </section>
  
        <footer className="bg-black text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-crimson-text mb-4">Contact Us</h3>
                <p className="font-roboto">Email: info@parnassos.gr</p>
                <p className="font-roboto">Phone: +30 123 456 7890</p>
              </div>
              <div>
                <h3 className="text-xl font-crimson-text mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <i className="fab fa-facebook text-2xl hover:text-blue-300 cursor-pointer"></i>
                  <i className="fab fa-instagram text-2xl hover:text-blue-300 cursor-pointer"></i>
                  <i className="fab fa-twitter text-2xl hover:text-blue-300 cursor-pointer"></i>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-crimson-text mb-4">Location</h3>
                <div className="bg-gray-800 h-[150px] rounded-lg"></div>
              </div>
              <div>
                <h3 className="text-xl font-crimson-text mb-4">Newsletter</h3>
                {isSubscribed ? (
                  <p className="font-roboto text-green-400">
                    Thank you for subscribing!
                  </p>
                ) : (
                  <form onSubmit={handleSubscribe}>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full p-2 rounded bg-gray-800 mb-2"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
  
  
  