"use client";
import React from "react";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function GiorMainDevCV() {
  const personalPhotos = [
    { id: 1, image: "/images/giorCV.jpg", caption: "Cross in Alpes" },
    //{ id: 3, image: "/images/gior_bebe.jpg", caption: "Me when Pasok had Money" },
    { id: 2, image: "/images/gior_mozart.jpg", caption: "Me cosplaying Mozart" },
    { id: 3, image: "/images/gior_makrymalli_gyalia.jpg", caption: "Me with sunglasses" },
  ];

  const projects = [
    {
      id: 1,
      title: "Data Projects",
      image: "/images/matplotlib_symbol.jpg", 
      link: "/giorCV/data_project" // Internal link old: /giorCV/datanal
    },
    {
      id: 2,
      title: "Pure Coding Projects",
      image: "/images/netcsharp_symbol.jpg",
      link: "/giorCV/coding_projects" // Internal link
    },
    {
      id: 3,
      title: "Extra-Smaller Projects",
      image: "/images/pc_symbol.jpg",
      link: "/giorCV/extras" // Internal link
    },
  ];

  return (
    <div className="font-roboto bg-gray-100 min-h-screen p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#333333] mb-2">Georgios Bakas </h1> {/* Melissaratos */}
        <p className="text-xl text-[#666666]">
          Software Engineer & Data Scientist & ManyMore
        </p>
        <p className="text-xl text-[#666666]">
          Suggestion: view this page in half your screen, it's more natural that way
        </p>
        <p className="text-xl text-[#666666]">
          If you want to avoid going through all this (it's more than it looks) here's a quick sentence that describes me most: <strong>I get through anything, slower or faster, I can learn and program anything. </strong>May the diversity of the following Projects Portfolio stand as Evidence on my statement!
        </p>
      </header>

      {/* New section for personal photos */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#333333]">Personal Photos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {personalPhotos.map((photo) => (
            <div
              key={photo.id}
              className="border rounded-lg overflow-hidden"
            >
              <img
                src={photo.image}
                alt={`Personal photo ${photo.id}`}
                className="w-full h-[calc(100vh/3)] object-cover" // Increased height to fit better on larger screens
              />
              <p className="p-4 text-center text-[#666666]">{photo.caption}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#333333]">
          Contact Information
        </h2>
        <p className="mb-2 font-bold">
          <i className="fas fa-envelope mr-2"></i>
          <a href="mailto:bakasgiorgos976@gmail.com" className="text-blue-600 hover:underline">
            bakasgiorgos976@gmail.com
          </a> <span className="font-normal">-- Email Address</span>
        </p>
       
        <p className="mb-2 font-bold">
          <i className="fas fa-phone mr-2"></i>+30 6981105018 <span className="font-normal">-- Mobile: don't use without important reason though</span>
        </p>
        <p className="font-bold">
          <i className="fas fa-map-marker-alt mr-2"></i>Aiolidos Av. 47, Dionysos, Attica
        </p>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#333333]">
          Education
        </h2>
        <div className="mb-4">
          <h3 className="text-xl font-medium">
            Bachelor in Computer Science
          </h3>
          <p className="text-[#666666]">
            <a href="https://www.uoa.gr" className="text-blue-600 hover:underline">
              National and Kapodistrian University of Athens
            </a>, 2021-Currently
          </p>

          <h3 className="text-xl font-medium">
          Γενικό Λύκειο Διονύσου (High School), 2019-2021
          </h3>
          <p className="text-[#666666]">
        
            High School Diploma, Grade: 19.6/20
            <br />
            Panellinies Exams Score (Uni Entry Exams): 18/20
          </p>          
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#333333]">
        Work Experience
        </h2>
        <div className="mb-4">
          <h3 className="text-xl font-medium">
          Internship: .NET Developer
          </h3>
          <p className="text-[#666666]">
            <a href="https://www.novibet.gr/" className="text-blue-600 hover:underline">
              Novibet
            </a>, 03.2024-06.2024
          </p>
          <p className="text-[#666666]">
            <li>
              <strong>Unit Testing</strong> 
            </li>
            <li>
              <strong>Async Programming/Endpoints</strong> 
            </li>
            <li>
              <strong>Microservices Implementation Basics</strong> 
            </li>
            <li>
              <strong>Healthchecks+Metrics+Kibana</strong> 
            </li>
            <li>
              <strong>Jira+TeamCity+Octopus</strong> 
            </li>
          </p>
        </div>
      </section>

      

      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-[#333333]">Skills</h2>

      {/* Programming Languages */}
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2 text-[#333333]">Programming Languages</h3>
      <ul className="list-disc list-inside">
        <li>
          <strong>Expert:</strong> 
          <ul className="list-disc list-inside ml-4">
            <li>Python
              <ul className="list-disc list-inside ml-4">
                <li><strong>Data Analysis/Science:</strong> pandas, NumPy, matplotlib</li>
                <li><strong>Networking/Requests:</strong> requests, asyncio</li>
                <li><strong>SQL Libraries:</strong> sqlite3, pymysql</li>
                <li><strong>UI Libraries:</strong> wxWidgets, Kivy</li>
              </ul>
            </li>
            <li>C#
            <ul className="list-disc list-inside ml-4">
              <li><strong>Web Frameworks:</strong> ASP.NET Core, MVC</li>
              <li><strong>APIs/Endpoints:</strong> REST APIs, Controllers, Routing</li>
              <li><strong>Database:</strong> Entity Framework, LINQ</li>
              <li><strong>Dependency Injection:</strong> .NET DI Framework</li>
              <li><strong>Job Scheduling:</strong> Quartz.NET</li>
            </ul>
          </li>
            <li>SQL
              <ul className="list-disc list-inside ml-4">
                <li><strong>Database Systems:</strong> MySQL, SQL Server</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <strong>Proficient:</strong> 
          <ul className="list-disc list-inside ml-4">
          <li>C++
            <ul className="list-disc list-inside ml-4">
              <li><strong>Objective Programming:</strong> Classes, Inheritance, Polymorphism</li>
              <li><strong>Computational Geometry:</strong> CGAL (Computational Geometry Algorithms Library)</li>
            </ul>
          </li>

            <li>C
              <ul className="list-disc list-inside ml-4">
                <li><strong>Low-level Programming:</strong> Pointers, Memory Management</li>
                {/* <li><strong>Embedded Systems:</strong> Microcontrollers</li> */}
              </ul>
            </li>
            <li>JavaScript
              <ul className="list-disc list-inside ml-4">
                <li><strong>Frameworks/Libraries:</strong> Node.js</li>
                <li><strong>Frontend Libraries:</strong> React</li>
              </ul>
            </li>
            <li>React
            <ul className="list-disc list-inside ml-4">
              <li><strong>Hooks:</strong> useState, useEffect</li>
              <li><strong>HTTP Requests:</strong> Axios</li>
              <li><strong>Styling:</strong> Tailwind CSS</li>
            </ul>
          </li>
          </ul>
        </li>
        <li>
          <strong>Familiar:</strong>
          <ul className="list-disc list-inside ml-4">
            <li>Java
            </li>
            <li>MATLAB
            </li>
          </ul>
        </li>
      </ul>
    </div>

      {/* Natural Languages */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-[#333333]">Natural Languages</h3>
        <ul className="list-disc list-inside">
          <li>
            <strong>Native Level:</strong> Greek
          </li>
          <li>
            <strong>Other:</strong> German (Großes Deutsches Sprachdiplom -C2), English (Profficiency -C2)
          </li>
        </ul>
      </div>

      {/* Additional Technical Skills */}
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2 text-[#333333]">Additional Technical Skills</h3>
      <ul className="list-disc list-inside">
        <li>
          <strong>Version Control:</strong> Git, GitHub
        </li>
        <li>
          <strong>IDEs:</strong> Visual Studio, VS Code, PyCharm, CLion, DEVC/C++, MySQL Workbench, Azure Data Studio
        </li>
        <li>
          <strong>Databases</strong> 
        </li>
        <li>
          <strong>Algorithms:</strong> Search Algorithms, Problem Solving, <strong>Recommendations</strong> (Matrix Factorization with i users and j objects)
        </li>
        <li>
          <strong>JWT authentication</strong>
          </li>

      </ul>
    </div>


      {/* Extra Skills */}
      <div>
        <h3 className="text-xl font-semibold mb-2 text-[#333333]">Extra Skills</h3>
        <ul className="list-disc list-inside">
        <li>
          <strong>Excel</strong>
          </li>
          <li>
            <strong>Driving</strong>
          </li>
          <li>
            <strong>Competitive Chess:</strong> Experience in playing competitive chess
          </li>
          <li>
            <strong>Sports:</strong> ex-Advanced Swimmer, and Football Player
          </li>
        </ul>
      </div>
    </section>



      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#333333]">Notable Projects</h2>
        <p>Data Projects are about Python primarily. On Pure Coding Projects one can find Backend, Frontend applications (C#, React) but also Exchange Clients written on python, while extra-smaller projects contain some python and latex designing skills (Though whole part is not yet fully developed)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={project.link}
              className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 flex flex-col"
            >
              <div className="flex flex-col h-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-80 object-cover mb-4 rounded" // Increased height to 20rem (320px)
                />
                <h3 className="text-lg font-medium text-center">{project.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>



    <section className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-[#333333]">About Me</h2>
      <p className="mb-4">
        <strong>About Me:</strong> I am a passionate developer with a keen interest in creating innovative solutions and tackling complex challenges. My background includes experience with various programming languages, technologies and algorithms, which has allowed me to build a diverse portfolio of projects.
      </p>
      <p className="mb-4">
        <strong>What I Am Searching For:</strong> I am looking for opportunities to work on most exciting projects like the following: Complex Algorithms, Payment Clients, Exploratory Data Analysis, Data Mining, Predictive Analytics, Diagnostic Analytics, Advanced Analytics and Data Profiling. Though if not, I'm also interested in any backend service. Only thing I'm not interested in is Frontend Developing. I have done enough for this project and it was boring. It's not that I don't enjoy creating visual stuff, but that's limited on things I actually want to create, so I don't plan on working as Frontend Developer.
      </p>
      <p className="mb-4">
        <strong>Hobbies I Enjoy and How I Spend My Time:</strong> Outside of programming, I enjoy occasional reading and hiking (as you have seen in photos). I also play chess sometimes, though I don't attend tournaments anymore.
      </p>
      <p>
        <strong>What I Aim for in the Future:</strong> My goal is to work on and examine data, I enjoy finding out strange connections and correlations behind random-appearing data. It's like a game of hide and seek, one is naturally curious to find the hidden relations behind data. Personally I think it is so because there is no rule. In pure mathematics everything is defined with strict relations and proved theoretically. That's a theorem, or something we know and objectively hold for true. The randomness and uncertainty that describe data like market prices, people's response and behaviour to situations etc really motivate me to try and organize it. There may not be any rule behind them, maybe not viewed from our humble dimensions, but it's a task I can enjoy. Other than that I would like to learn better programming --there's always room for improvement-- and one day start a company of my own, to test my skill and luck.
      </p>
    </section>

    </div>
  );
}

export default GiorMainDevCV;
