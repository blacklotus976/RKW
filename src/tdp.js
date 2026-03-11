"use client";
import React from "react";

function TDP() {
  const [activeSection, setActiveSection] = React.useState("hero");

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-poppins">
      <nav className="fixed w-full bg-[#111111] p-4 z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <span className="text-2xl font-bold text-[#ffd700]">KYROS GOLAF the Golf</span>
          <div className="space-x-6">
            <button
              onClick={() => scrollToSection("features")}
              className="hover:text-[#ffd700]"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="hover:text-[#ffd700]"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("music")}
              className="hover:text-[#ffd700]"
            >
              Music
            </button>
            <button
              onClick={() => scrollToSection("maps")}
              className="hover:text-[#ffd700]"
            >
              Maps & Navigation
            </button>
            <button
              onClick={() => scrollToSection("games")}
              className="hover:text-[#ffd700]"
            >
              Games
            </button>
            <button
              onClick={() => scrollToSection("carStats")}
              className="hover:text-[#ffd700]"
            >
              Car Stats
            </button>
            <button
              onClick={() => scrollToSection("chat")}
              className="hover:text-[#ffd700]"
            >
              Chat with Kyros
            </button>
            <button
              onClick={() => scrollToSection("credits")}
              className="hover:text-[#ffd700]"
            >
              Credits
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        <section id='features' className="max-w-7xl mx-auto px-4 py-20" >
        
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="text-[#ffd700]">Traffic Distraction</span> Pack
          </h1>
          <p className="text-2xl mb-8">
            Because who needs to focus on driving anyway? 🚗✨
          </p>
          <div className="flex flex-col md:flex-row md:space-x-8 items-start mb-8">
            {/* Left Orange Box (VROUM Content) */}
            <div className="max-w-lg bg-[#FFA500] p-4 rounded-lg shadow-lg mb-8">
                <p className="text-lg mb-4 text-black"> \__(--)__/🗣️🗣️🗣️VROOUUM </p>
                <p className="text-lg mb-4 text-black"> Are you bored of being stuck in traffic? </p>
                <p className="text-lg mb-4 text-black">
                Are you bored of driving behind <strong>THAT</strong> lady in a Smart or Fiat500 who doesn't know that cars can go more than 40 kmph?
                </p>
                <p className="text-lg mb-4 text-black">
                Are you bored of watching stupid mini bikes passing through lanes, only to be overtaken again and then split lanes again?
                </p>
                <p className="text-lg mb-4 text-black">
                Does driving in the city during high traffic hours really get you on your nerves?
                </p>
                <p className="text-lg mb-4 text-black">
                Do you also hate <strong>slow</strong> drivers?
                </p>
                <p className="text-lg mb-4 text-black">
                Don't commit suicide, it's their win... Instead go get yourself a <strong>TDP</strong>, and enjoy slow drives like never before!
                </p>
            </div>

            {/* Right Orange Box (Developer's Note) */}
            <div className="max-w-lg bg-[#FFA500] p-4 rounded-lg shadow-lg">
                <p className="text-lg mb-4 text-black">
                <strong>Developer's Note</strong>: Website and product are still under development. We are actively searching for web and Python developers.
                </p>
                <p className="text-lg mb-4 text-black">
                This is an <strong>early leak </strong>of the product, for various reasons. Not all wanted features are fully available, so not all sections are fully documented...
                </p>
              </div>
            </div>


          <div className="grid md:grid-cols-2 gap-8 mt-20">
            {/* Feature Cards */}
            <div className="bg-[#111111] p-6 rounded-lg">
              <i className="fas fa-music text-[#ffd700] text-4xl mb-4"></i>
              <h3 className="text-2xl font-bold mb-2">Music That Slaps</h3>
              <p>
                Spotify integration that makes your car think it's a disco.
                Warning: May cause spontaneous dance parties at red lights!
              </p>
              <button onClick={() => scrollToSection("music")} className="mt-4 text-[#ffd700] underline">
                Learn More
              </button>
            </div>

            <div className="bg-[#111111] p-6 rounded-lg">
              <i className="fas fa-map-marked-alt text-[#ffd700] text-4xl mb-4"></i>
              <h3 className="text-2xl font-bold mb-2">Maps & Navigation</h3>
              <p>
                Get lost with style! Our navigation system occasionally takes
                you on "scenic routes" just for fun. Also informs on traffic <strong>AND</strong> talks shit on other cars with you!
              </p>
              <button onClick={() => scrollToSection("maps")} className="mt-4 text-[#ffd700] underline">
                Learn More
              </button>
            </div>

            <div className="bg-[#111111] p-6 rounded-lg">
              <i className="fas fa-tachometer-alt text-[#ffd700] text-4xl mb-4"></i>
              <h3 className="text-2xl font-bold mb-2">Car Stats</h3>
              <p>
                Real-time speed, RPM, and other fancy numbers that make you feel
                like you're piloting a spaceship. Kinda like in MiniCooper only better than that... things...
              </p>
              <button onClick={() => scrollToSection("carStats")} className="mt-4 text-[#ffd700] underline">
                Learn More
              </button>
            </div>

            <div className="bg-[#111111] p-6 rounded-lg">
              <i className="fas fa-robot text-[#ffd700] text-4xl mb-4"></i>
              <h3 className="text-2xl font-bold mb-2">Chat with Kyros</h3>
              <p>
                Your car is now your therapist. ChatGPT integration for those
                long, lonely drives.
              </p>
              <button onClick={() => scrollToSection("chat")} className="mt-4 text-[#ffd700] underline">
                Learn More
              </button>
            </div>

            <div className="bg-[#111111] p-6 rounded-lg">
              <i className="fas fa-chess text-[#ffd700] text-4xl mb-4"></i>
              <h3 className="text-2xl font-bold mb-2">Games Galore</h3>
              <p>
                Play chess against your co-driver or Stockfish while "waiting"
                in traffic. Also featuring Blockudoku and <strong>Fruit Slots</strong>! Cause we get it: <strong>it ain't fun outside of a CASINO</strong>...
              </p>
              <button onClick={() => scrollToSection("games")} className="mt-4 text-[#ffd700] underline">
                Learn More
              </button>
            </div>

            <div className="bg-[#111111] p-6 rounded-lg">
              <i className="fas fa-shield-alt text-[#ffd700] text-4xl mb-4"></i>
              <h3 className="text-2xl font-bold mb-2">Legal Disclaimer</h3>
              <p>
                We're legally required to say: Please don't actually use these
                while driving. But we know you will anyway. 😉
              </p>
            </div>
          </div>

          
        </section>

        <section id="pricing" className="max-w-7xl mx-auto px-4 py-20">
            <div className="mt-20 text-center">
                <h2 className="text-4xl font-bold mb-6">Coming in 2025</h2>
                <p className="text-xl mb-8">
                Pre-order now and get a free "I'm probably gaming" bumper sticker!
                </p>
                <button className="bg-[#ffd700] text-black px-8 py-4 rounded-lg text-xl font-bold hover:bg-[#ffed4a] mb-12">
                Take My Money! 💸
                </button>
                <p className="text-xl mb-8">
                Btw: "Take my Money" stands for : "Buy the poor devs a coffee so they can finish the project"...
                </p>

                {/* Pricing Table */}
                <div className="overflow-x-auto">
                <table className="w-full bg-gray-800 text-white rounded-lg shadow-lg mb-8 text-left">
                    <thead>
                    <tr className="bg-[#ffd700] text-black">
                        <th className="px-6 py-4 font-bold text-lg">Package</th>
                        <th className="px-6 py-4 font-bold text-lg">Features</th>
                        <th className="px-6 py-4 font-bold text-lg">Cost (USD)</th>
                        <th className="px-6 py-4 font-bold text-lg">Cost (USD) [PRE-ORDER]</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="border-b border-gray-700">
                        <td className="px-6 py-4">Base Edition</td>
                        <td className="px-6 py-4">Core driving distractions: music, maps, car stats</td>
                        <td className="px-6 py-4">$69</td>
                        <td className="px-6 py-4">not yet configured</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                        <td className="px-6 py-4">Advanced Pack</td>
                        <td className="px-6 py-4">All Base Edition features + chat features, games</td>
                        <td className="px-6 py-4">$69.69</td>
                        <td className="px-6 py-4">not yet configured</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                        <td className="px-6 py-4">Custom Pack</td>
                        <td className="px-6 py-4">All Advanced Pack features + personalized vehicle integration + enhanced chat</td>
                        <td className="px-6 py-4">$420.69</td>
                        <td className="px-6 py-4">not yet configured</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                        <td className="px-6 py-4">Integration Costs</td>
                        <td className="px-6 py-4">For vehicles requiring custom fitting and compatibility adjustments</td>
                        <td className="px-6 py-4">Starting from extra $69.69</td>
                        <td className="px-6 py-4">not yet configured</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                        <td className="px-6 py-4">Extended Warranty</td>
                        <td className="px-6 py-4">1-year warranty included; extended 3-year warranty available</td>
                        <td className="px-6 py-4">+$96.69 (3 years)</td>
                        <td className="px-6 py-4">not yet configured</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                        <td className="px-6 py-4">Support & Updates</td>
                        <td className="px-6 py-4">Lifetime access to updates and 24/7 support for first year</td>
                        <td className="px-6 py-4">Included</td>
                        <td className="px-6 py-4">not yet configured</td>
                    </tr>
                    </tbody>
                </table>
                </div>

                {/* Pre-order Disclaimer */}
                <p className="text-xl italic text-gray-400">
                Note: Pricing is subject to change as we finalize the TDP features. Pre-order today to lock in your spot and receive early adopter perks!
                </p>
                <p className="text-xl italic text-gray-400">
                Note: Enhanced Chat means custom voice integration and custom communicating style of your partner in Drive!
                </p>
            </div>
            </section>


        {/* Additional Sections */}
        <section id="music" className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold mb-6">Music That Slaps</h2>
          <figure className="mb-6">
            <img src="./images/general_page_spotify.png" alt="Games" className="w-full h-auto" />
            <figcaption className="text-center text-lg text-gray-400 mt-2">
                Main Screen with Spotify enabled Preview
            </figcaption>
          </figure>
          <p className="text-xl mb-4">
            Enjoy seamless Spotify integration to make every ride a party!
          </p>
          <p>
            Perfect for sing-alongs, our system keeps the vibe alive even in traffic.
          </p>
          <p>
            Also included support for: CD discs, USB drives and Radio 
          </p>
        </section>

        <section id="maps" className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold mb-6">Maps & Navigation --to be further developed</h2>
          <img src="path/to/maps-image.jpg" alt="Maps and navigation" className="mb-6 w-full h-auto" />
          <p className="text-xl mb-4">
            Navigate through traffic with style and flair, courtesy of our enhanced system.
          </p>
          <p>
            Experience unexpected scenic routes that make every journey unique!
          </p>
          <p>
            Listen us the maps come alive to curse other drivers, seemingly more mad at traffic than YOU!
          </p>
        </section>

        <section id="carStats" className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold mb-6">Car Stats</h2>
          <figure className="mb-6">
            <img src="./images/car_screen_example.png" alt="Games" className="w-full h-auto" />
            <figcaption className="text-center text-lg text-gray-400 mt-2">
                Car Screen Early Level Snapshot. Half the features are added
            </figcaption>
          </figure>
          <p className="text-xl mb-4">
            Get insights into your car’s performance with real-time stats including speed, RPM, and more.
          </p>
          <p>
            Our dashboard displays everything you need to know, so you can drive with confidence and ease.
          </p>
          <p>
            <strong>Special feature</strong>: Counters for meters and seconds till complete stop, given rpm, speed and other parameters.
          </p>
          <p>
            <strong>Special feature</strong>: Advanced car data like current tire grip and (not for every vehicle) perfect line simulation.
          </p>
          <p>
            <strong>Special feature</strong>:Special data export, anything an OBD-II can read!
          </p>
        </section>

        <section id="chat" className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold mb-6">Chat with Kyros --UI lacks development</h2>
          <img src="path/to/chat-image.jpg" alt="Chat with Kyros" className="mb-6 w-full h-auto" />
          <p className="text-xl mb-4">
            Your car is now your friendly co-pilot, ready to chat and keep you company!
          </p>
          <p>
            Enjoy engaging conversations with our integrated ChatGPT technology during long drives.
          </p>
          <p>
            <strong>Special feature</strong>: Car speaks the response loud!
          </p>
          <p>
            <strong>Special feature</strong>: Car uses a voice of your own choosing to respond!
          </p>
          <p>
            <strong>Special feature</strong>: Voice control, but not the typical version, rather a casual chatting one. Not cold commands like speaking to your tv!
          </p>
        </section>

        <section id="games" className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold mb-6">Games Galore</h2>
          <figure className="mb-6">
            <img src="./images/casino_experience_incar.png" alt="Games" className="w-full h-auto" />
            <figcaption className="text-center text-lg text-gray-400 mt-2">
                Fruit Spinning While Driving Example
            </figcaption>
          </figure>
          <figure className="mb-6">
            <img src="./images/casino_experience_in_car1.png" alt="Games" className="w-full h-auto" />
            <figcaption className="text-center text-lg text-gray-400 mt-2">
                Fruit Spinning While Driving Example
            </figcaption>
          </figure>
          <figure className="mb-6">
            <img src="./images/chess_gameplay.png" alt="Games" className="w-full h-auto" />
            <figcaption className="text-center text-lg text-gray-400 mt-2">
                Yes, we need a graphics developer here...Jeez how'd you figure out?
            </figcaption>
          </figure>
          <p className="text-xl mb-4">
            Keep entertained with games that make waiting in traffic a breeze!
          </p>
          <p>
            Challenge your co-driver to chess or enjoy challenging bots for a fun ride.
          </p>
          <p>
            For more (the bad way) nerdy types: Enjoy playing <strong>Blockudoku</strong> while waiting for that Fiat500 to start...
          </p>
          <p>
            <strong>Special feature</strong>: For the chads of the sport. We present your <strong>PORTABLE CASINO</strong>. You can try our fun <strong>fruit spinner</strong>, it can entertain the risky characters and tell your <strong>FUTURE</strong> by your luck!
          </p>
          <p>
            <strong>With more games to come</strong>: We promise you won't get bored...
          </p>
          
        </section>

        {/* Extra Credits Section */}
        <section id="credits" className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold mb-6">Extra Credits</h2>
          <p className="text-xl mb-4">
            Special thanks to our talented developers:
          </p>
          <ul className="list-disc pl-5 text-xl">
            <li>
              <a href="/giorMainDevCV" className="text-[#ffd700] underline">
                Black Lotous 976 | Mauri Fwkia | NoirFoque 
              </a>
            </li>
            
            {/* Add more developers as needed */}
          </ul>
          <p className="text-xl mb-4">
            Yes I really just congratulated my own self for starting and finishing (not yet though) this funny Dashboard!!!
          </p>
          <div className="text-center text-gray-500 text-sm mt-8">
            © 2024 RKW Corporation. All rights reserved.
        </div>
        </section>
      </div>
    </div>
  );
}

export default TDP;
