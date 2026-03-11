function MainComponent() {
    const [showDetails, setShowDetails] = useState(false);
    const [activeTab, setActiveTab] = useState("specs");
  
    return (
      <div className="min-h-screen bg-[#121212] text-white font-crimson-text">
        <nav className="fixed w-full bg-[#121212]/90 backdrop-blur-sm z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl">Saint 'loriann</h1>
            <div className="space-x-6">
              <button className="hover:text-[#C8A2C8]">Design</button>
              <button className="hover:text-[#C8A2C8]">Heritage</button>
              <button className="hover:text-[#C8A2C8]">Contact</button>
            </div>
          </div>
        </nav>
  
        <div className="relative h-screen">
          <div className="absolute inset-0">
            <img
              src="/car-hero.jpg"
              alt="Saint 'loriann flagship model combining classic Audi designs"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="mt-20">
                <h2 className="text-4xl md:text-6xl mb-4">Redefining Elegance</h2>
                <p className="text-xl md:text-2xl max-w-2xl">
                  Where classic design meets modern performance. Manual
                  transmission for the purist in you.
                </p>
              </div>
            </div>
          </div>
        </div>
  
        <section className="py-20 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl mb-6">The Perfect Fusion</h3>
              <p className="text-lg leading-relaxed">
                Inspired by the timeless design of the 2009 Audi S3's front
                profile and the modern sophistication of the S6's rear aesthetics,
                enhanced with a distinctive wing. Our vision brings together the
                best of both worlds.
              </p>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="mt-6 border border-white px-6 py-2 hover:bg-white hover:text-[#121212] transition duration-300"
              >
                Discover More
              </button>
            </div>
            <div className="relative h-[400px]">
              <img
                src="/car-side.jpg"
                alt="Side profile of Saint 'loriann's flagship model"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
  
        <section className="bg-[#1A1A1A] py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-center space-x-6 mb-12">
              <button
                className={`px-6 py-2 ${activeTab === "specs" ? "border-b-2" : ""}`}
                onClick={() => setActiveTab("specs")}
              >
                Specifications
              </button>
              <button
                className={`px-6 py-2 ${activeTab === "interior" ? "border-b-2" : ""}`}
                onClick={() => setActiveTab("interior")}
              >
                Interior
              </button>
              <button
                className={`px-6 py-2 ${activeTab === "performance" ? "border-b-2" : ""}`}
                onClick={() => setActiveTab("performance")}
              >
                Performance
              </button>
            </div>
  
            {activeTab === "specs" && (
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div>
                  <h4 className="text-xl mb-4">Dimensions</h4>
                  <ul className="space-y-2">
                    <li>Length: 4.85m</li>
                    <li>Width: 1.94m</li>
                    <li>Height: 1.40m</li>
                    <li>Wheelbase: 2.83m</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl mb-4">Price</h4>
                  <p>Starting from $89,500</p>
                </div>
              </div>
            )}
  
            {activeTab === "interior" && (
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div>
                  <img
                    src="/interior.jpg"
                    alt="Luxury interior with premium materials"
                    className="w-full h-[300px] object-cover mb-4"
                  />
                  <h4 className="text-xl mb-4">Premium Materials</h4>
                  <ul className="space-y-2">
                    <li>Full grain leather seats</li>
                    <li>Carbon fiber dashboard accents</li>
                    <li>Alcantara headliner</li>
                    <li>Brushed aluminum trim</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl mb-4">Customization Options</h4>
                  <ul className="space-y-2">
                    <li>15 leather colors</li>
                    <li>3 carbon fiber finishes</li>
                    <li>Custom stitching patterns</li>
                    <li>Personalized plaques</li>
                  </ul>
                </div>
              </div>
            )}
  
            {activeTab === "performance" && (
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div>
                  <h4 className="text-xl mb-4">Engine & Performance</h4>
                  <ul className="space-y-2">
                    <li>3.0L Twin-Turbo V6</li>
                    <li>450 horsepower</li>
                    <li>Top Speed: 290 km/h</li>
                    <li>0-100 km/h: 3.9s</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl mb-4">Transmission</h4>
                  <ul className="space-y-2">
                    <li>6-speed manual</li>
                    <li>Limited slip differential</li>
                    <li>Sport-tuned suspension</li>
                    <li>Carbon ceramic brakes</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>
  
        <footer className="bg-[#121212] py-8">
          <div className="container mx-auto px-4 text-center">
            <p>© 2024 Saint 'loriann. Preserving driving excellence.</p>
          </div>
        </footer>
      </div>
    );
  }
  
  
  