import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const MainProjects = () => (
  <div className="min-h-screen bg-blue-50 text-blue-900 font-sans">
    <nav className="bg-blue-600 p-4">
        <Link to="/giorMainDevCV">
            <button className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                <i className="fas fa-arrow-left mr-2"></i>Explore More by Returning to Main Page 
            </button>
        </Link>   
    </nav>

    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Project Analysis</h1>
      
       {/* payments client */}
<section className="mb-16">
  <h2 className="text-3xl font-semibold mb-6">Personal Exchange Clients -- Payments</h2>
  <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Explanation</h3>
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src="/images/mexc_bybit.jpg"
          alt="IP storage application interface displaying a list of stored IP addresses"
          className="w-full md:w-1/2 rounded-lg shadow-md"
        />
        <div>
          <p className="mb-4">
            This project (written in Python) is a complete client for the MEXC crypto exchange. It uses direct communication through HTTP and avoids intermediate libraries. Unfortunately, due to endpoint problems (on their end, "endpoint under maintenance"), the client isn't in a position to place orders, though all other commands are available. To counter this issue, I developed another Client for MEXC using the Selenium library (kind of like an interface). This sub-project is also openly available to anyone, but it's advised to use it only after consulting the Exchange's official guidelines, as bots and other algorithms are placed in a grey zone regarding legal allowances.
          </p>
          <p className="mb-4">Key features:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Perfect HTTP requests +with Singatures and Hash Algorithms</li>
            <li>Secure money handling</li>
            <li>Documented and easy-to-use project</li>
            <li>Shows skills in complex endpoints handling and website wrapping with interfaces</li>
            <li>Bonus: Bybit Client</li>
          </ul>
          <p className="mb-4">
            I'll leave a GitHub repository link for anyone interested. For the manual on how to use, please view the 2 PDFs; they operate as Read.MEs. The second one is a larger and more analytic approach.
          </p>
        </div>
      </div>
    </div>
    <div className="mt-8 flex items-center justify-between">
    </div>
    <div className="mt-8 flex items-center justify-end">
      <a
        href="/giorCV/clients"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
      >
        Go to Clients Page
      </a>
    </div>
  </div>
</section>


      {/* Social Media Project Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">YAP Social Media Project</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="mb-4">University task: Create a social media platform using .NET for backend and React for frontend.</p>
          <a
            href="/pdfs/ergasia.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            <i className="fas fa-file-pdf mr-2"></i>View Full Task Details (PDF)
          </a>
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Solution Analysis</h3>
            <div className="flex flex-col md:flex-row gap-8">
              <img
                src='/images/cazy_happy_seal.jpg'
                alt="Social media platform interface showing user profiles and posts"
                className="w-full md:w-1/2 rounded-lg shadow-md"
              />
              <div>
              <p className="mb-4">Welcome to YAP social media! (originally Fwkies, hence the seal photo)</p>
                <p className="mb-4">Our solution implements a robust social media platform with user profiles, posts, comments, and friend connections. The backend is built with .NET, providing a secure and scalable API. The React frontend offers a responsive and interactive user interface.</p>
                <p className="mb-4">Key features:</p>
                <ul className="list-disc list-inside mb-4">
                  <li>User authentication and authorization -- Security with JWT</li>
                  <li>Recommendations for each user based on interactions with posts</li>
                  <li>Real-time updates for posts and comments -- Notifocations Enabled</li>
                  <li>Friend request system -- Link with everyone</li>
                  <li>Media sharing capabilities -- Photos, Videos and Gifs</li>
                  <li>Database Support</li>
                  <li>Backend: Middlewares and Controllers.</li>
                </ul>
                <p className="mb-4">As of today (30.08.2024) the project as University Task is delivered. <strong>Soon</strong> we will deploy it online, openin git to anyone interested. When this finally step is done, the view More button will redirect to the official link. For the time being, I'll leave links to the github, both for back and front end. For anyone interested for specifics please view our solutions by clicking the Explore Solution button (our official documentation). </p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <h3 className="text-2xl font-semibold">GitHub Repository</h3>
            <div className="flex items-center space-x-4">
              <a href="https://github.com/Gior-Chris-Gior/Backend" className="text-blue-600 hover:underline">
                <i className="fab fa-github mr-2"></i>View BackEnd Code on GitHub
              </a>
              <a href="https://github.com/Gior-Chris-Gior/Frontend/tree/master" className="text-blue-600 hover:underline">
                <i className="fab fa-github mr-2"></i>View FrontEnd Code on GitHub
              </a>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                Explore Solution
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                View More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Oti nanai app */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Custom Car Dashboard</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="mb-4">
            This python app (still under development status) is (like described) a CarDashboard. It aims to provide more features to the bored driver, like advanced music experience, driving experience, navigation, games (and Casino Fruit Spins) and real time chats (with Ai).
          </p>
          
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Project Highlights</h3>
            <div className="flex flex-col md:flex-row gap-8">
              <img
                src="/images/casino_experience_in_car1.png" // Placeholder path for the "before" image
                alt="In Car Casino"
                className="w-full md:w-1/2 rounded-lg shadow-md"
              />
              <img
                src="/images/general_page_spotify.png" // Placeholder path for the "after" image
                alt="Triangulation After Optimization"
                className="w-full md:w-1/2 rounded-lg shadow-md"
              />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
            <ul className="list-disc list-inside mb-4">
              <li>Kivy</li>
              <li>Spotify</li>
              <li>OBD-II</li>
              <li>CustomGames</li>
              <li>Other stuff in car dashboards...</li>
              
            </ul>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Resources -- github is locked (private/ sorry)</h3>
            <div className="flex items-center space-x-4">
              <a href="https://rkw-front.vercel.app/KGGTDP" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                <i className="fab fa-github mr-2"></i>Explore More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Triangulation Project Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Advanced Triangulation Project</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="mb-4">
            This C++ project implements an advanced custom triangulation algorithm that minimizes obtuse triangles after applying Delaunay triangulation, ensuring a more optimized and balanced mesh structure. Ideal for applications that require robust geometry for simulations, this project showcases innovative approaches to computational geometry.
          </p>
          
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Project Highlights</h3>
            <div className="flex flex-col md:flex-row gap-8">
              <img
                src="/images/graph_initial.png" // Placeholder path for the "before" image
                alt="Triangulation Before Optimization"
                className="w-full md:w-1/2 rounded-lg shadow-md"
              />
              <img
                src="/images/graph_final.png" // Placeholder path for the "after" image
                alt="Triangulation After Optimization"
                className="w-full md:w-1/2 rounded-lg shadow-md"
              />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
            <ul className="list-disc list-inside mb-4">
              <li>Optimized triangulation with minimized obtuse angles</li>
              <li>Linux</li>
              <li>CGAL, BOOST</li>
              <li>Accurate flips and insertions of Steiner Points</li>
            </ul>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <h3 className="text-2xl font-semibold">Resources</h3>
            <div className="flex items-center space-x-4">
              <a href="https://github.com/blacklotus976/GeoComApp" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                <i className="fab fa-github mr-2"></i>View GitHub Repository
              </a>
              <a href="/pdfs/readme-pdf.pdf" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                <i className="fas fa-file-pdf mr-2"></i>View Analysis PDF
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* IP Storage Demo Project Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">IP Storage Project</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="mb-4">Demo project: IP address retrieval and storage using .NET.</p>
          <a
            href="/pdfs/xeirotero_asseesmsetsnetsetnseoit_ever.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
             <i className="fas fa-file-pdf mr-2"></i>View Full Task Details (PDF)
          </a>
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Solution Analysis</h3>
            <div className="flex flex-col md:flex-row gap-8">
              <img
                src="/images/ip2c_logo.jpg"
                alt="IP storage application interface displaying a list of stored IP addresses"
                className="w-full md:w-1/2 rounded-lg shadow-md"
              />
              <div>
                <p className="mb-4">This demo project demonstrates efficient IP address management. It was requested form me as I interviewed for a Internship for the first time (as Assesment), having zero c# knowledge at the point. I showcase this project here, for anyone who wishes to play with IPs and with the hope that I'll update it oneday. Anyway it was my first project, as messy as it is.</p>
                <p className="mb-4">Key features:</p>
                <ul className="list-disc list-inside mb-4">
                  <li>IP address validation -- works with ip2c.org</li>
                  <li>Geolocation data retrieval</li>
                  <li>Persistent storage of IP information</li>
                  <li>Search, filtering and mass/batch updating capabilities</li>
                </ul>
                <p className="mb-4">I'll leave a github repository link, for anyone interested. For manual on how to use please view the 2 pds, they operate as Read.MEs. The second one is a larger and more analytic approach.</p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <h3 className="text-2xl font-semibold">GitHub Repository</h3>
            <div className="flex items-center space-x-4">
              <a href="https://github.com/blacklotus976/WebApi_for_IP" className="text-blue-600 hover:underline">
                <i className="fab fa-github mr-2"></i>View Code on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

     


      {/* About This Project Section
      <section>
        <h2 className="text-3xl font-semibold mb-6">About This Project</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="mb-4">This Project is about the very own webpage you are standing on. Coded in React, without any Backend to support it yet, this page and the others connected to it represents the idea of a fun company. All rights are reserved, as I keep the idea as a future project. Though it's open for people to view it --but only those with access to my CV apparently. Feel free to wander around if you want to explore some of my ideas, or my designing skills in React. The following button will take you to the main page. Don't steal content. AND NOTE THAT NOT ALL BUTTONS ARE FUNCTIONABLE, SO SAVE THIS ROUTE TO RETURN EASILY:"/giorMainDevCV"!!!</p>
          <p>This project is used to demonstrate skills in:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Creativity</li>
            <li>Presentation</li>
            <li>Effective use of visual elements</li>
            <li>Integration of external resources (Links, PDFs, Images, etc...)</li>
          </ul>
          <div className="mt-8 text-center">
            
                <Link to="/">
                    <button className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                        <i className="fas fa-arrow-left mr-2"></i>Explore More by Returning to Main Page 
                    </button>
                </Link>            
          </div>
          <p>Warning you will leave this page uppon pressing hte button. Return Path: MainPage then "More" Menu top right then "About our Employees" and select again my CV</p>
        </div>
      </section> */}
    </main>
  </div>
);

export default MainProjects;
