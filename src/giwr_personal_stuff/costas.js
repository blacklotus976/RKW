"use client";
import React from "react";
import { useNavigate } from 'react-router-dom';

function Costas() {
  const navigate = useNavigate();
  const handleViewMore = (bike) => {
    navigate('/bike-details', { state: { bike } });
  };
  const [selectedModel, setSelectedModel] = React.useState(null);
  const [showInterestForm, setShowInterestForm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    model: "",
    deposit: 50,
  });
  const bikeModels = [
    {
      name: "XSJ",
      price: "€899",
      range: "130",
      maxSpeed: "160km/h",
      chargingTime: "4-6 hours",
      image: "./images/costas/model1.png",
      features: ["Regenerative braking", "LCD Display", "Smart phone holder"],
      dimension: "2050x810x1090",
      wheelbase: "1435",
      weight: "150kg",
      packing_weight: "160kg",
      ground_clearance: "150mm",
      sitting_height: "800mm",
      fuel_tank_capacity: "12L",
      start_mode: "Electric start",
      gear_number: "5",
      max_speed: "160km/h",
      fuel_consumption: "2.5L/100km",
      brake_system: "hydraulic disc",
      tire_size: "110/70-17 140/70-17",
      extra_stuff: "In total there are 5 different models, each with different features and price points. For further depth view the following image",
      extra_image: "./images/costas/image.png",
    },
    {
      name: "City Commuter Pro",
      price: "€1,199",
      range: "100km",
      maxSpeed: "30km/h",
      chargingTime: "3-5 hours",
      image: "./images/costas/model2.png",
      features: ["Removable battery", "LED lights", "Anti-theft system"],
    },
    {
      name: "Eco Rider E3",
      price: "€749",
      range: "60km",
      maxSpeed: "25km/h",
      chargingTime: "4-6 hours",
      image: "./images/costas/model3.png",
      features: ["Lightweight frame", "Foldable design", "USB charging port"],
    },
  ];
  const handleInterest = () => {
    setShowInterestForm(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowInterestForm(false);
    alert("Thank you for your interest! We will contact you soon.");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">ΗλεκτροΠοδήλατα</h1>
          <div className="space-x-4">
            <button className="hover:text-blue-200">Μοντέλα</button>
            <button className="hover:text-blue-200">Πλεονεκτήματα</button>
            <button className="hover:text-blue-200">Επικοινωνία</button>
          </div>
        </div>
      </nav>
      <header className="bg-blue-800 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Το Μέλλον της Μετακίνησης</h1>
        <p className="text-xl">Οικονομικά • Οικολογικά • Αξιόπιστα</p>
      </header>

      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Τα Μοντέλα μας</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bikeModels.map((bike, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={bike.image}
                alt={bike.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{bike.name}</h3>
                <p className="text-2xl text-blue-600 mb-4">{bike.price}</p>
                <ul className="mb-4">
                  <li>
                    <i className="fas fa-battery-full mr-2"></i>Αυτονομία:{" "}
                    {bike.range}
                  </li>
                  <li>
                    <i className="fas fa-tachometer-alt mr-2"></i>Ταχύτητα:{" "}
                    {bike.maxSpeed}
                  </li>
                  <li>
                    <i className="fas fa-charging-station mr-2"></i>Φόρτιση:{" "}
                    {bike.chargingTime}
                  </li>
                </ul>
                <button
                  onClick={() => handleViewMore(bike)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                >
                  Δείτε Περισσότερα
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Γιατί Ηλεκτρικό Ποδήλατο;
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <i className="fas fa-piggy-bank text-4xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Οικονομία</h3>
              <p>Κόστος φόρτισης μόλις €0.20 ανά 100χλμ</p>
            </div>
            <div className="text-center p-6">
              <i className="fas fa-leaf text-4xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Οικολογικό</h3>
              <p>Μηδενικοί ρύποι και χαμηλό περιβαλλοντικό αποτύπωμα</p>
            </div>
            <div className="text-center p-6">
              <i className="fas fa-shield-alt text-4xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Ασφάλεια</h3>
              <p>Προηγμένα συστήματα ασφαλείας και αντικλεπτικής προστασίας</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Κάντε Κράτηση Τώρα
          </h2>
          <div className="text-center">
            <p className="text-xl mb-6">
              Εξασφαλίστε το δικό σας ηλεκτρικό ποδήλατο με μια μικρή
              προκαταβολή
            </p>
            <button
              onClick={handleInterest}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 text-lg"
            >
              Κάντε Κράτηση
            </button>
          </div>
        </div>
      </section>

      {showInterestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Φόρμα Ενδιαφέροντος</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Ονοματεπώνυμο"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Τηλέφωνο"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <select
                  name="model"
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Επιλέξτε Μοντέλο</option>
                  {bikeModels.map((bike, index) => (
                    <option key={index} value={bike.name}>
                      {bike.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <p>Προκαταβολή: €50</p>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowInterestForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Ακύρωση
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Υποβολή
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Costas;