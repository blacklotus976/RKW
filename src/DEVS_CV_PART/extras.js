import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function ExtraProjectHobbys() {
  const [showLatexModal, setShowLatexModal] = useState(false);

  const toggleLatexModal = () => {
    setShowLatexModal(!showLatexModal);
  };

  return (
    <div className="min-h-screen bg-blue-50 text-blue-900 font-sans">
      <div className="container mx-auto px-4 py-8">
        <Link to="/giorMainDevCV">
          <button className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <i className="fas fa-arrow-left mr-2"></i>Explore More by Returning to Main Page 
          </button>
        </Link>  

        <h1 className="text-4xl font-bold mb-8 text-center">My Smaller Projects Showcase</h1>

        {/* Python Projects Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Python Projects --Organization in Github is not that good unfortunately</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">Mandelbrot Visualization</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <img src="/images/multibrot3.jpg" alt="Mandelbrot Set Visualization 1" className="w-full h-48 object-cover rounded" />
                <img src="/images/mandelbrot_zoom.jpg" alt="Mandelbrot Set Visualization 2" className="w-full h-48 object-cover rounded" />
              </div>
              <p>A Python project to visualize and explore the Mandelbrot set in 2D space. Unfortunately the project allows only black and white pictures, but in compensation can be calculated for different integer powers of the original function, allowing access to the legendary Multibrot.</p>
              <div className="mt-8 flex items-center justify-between">
                <a href="https://github.com/blacklotus976/File_explorer_wx_py/blob/main/mandelbrot%20viewer" className="text-blue-600 hover:underline">
                  <i className="fab fa-github mr-2"></i>View Code on GitHub
                </a>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">Custom File Explorer</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <img src="file-explorer1.jpg" alt="Custom File Explorer Interface 1" className="w-full h-48 object-cover rounded" />
                <img src="file-explorer2.jpg" alt="Custom File Explorer Interface 2" className="w-full h-48 object-cover rounded" />
              </div>
              <p>A custom-built file explorer using Python and Tkinter for a user-friendly interface. This project provides a graphical interface for browsing and managing files and directories, with features like file search. I originally built aiming to create a manga/comic viewer --since the project has photo viewer inside-- but ultimately abandoned the project. So now I'm simply referencing and hoping to complete it in the future.</p>
              <div className="mt-8 flex items-center justify-between">
                <a href="https://github.com/blacklotus976/File_explorer_wx_py/blob/main/search_box_chapters.py" className="text-blue-600 hover:underline">
                  <i className="fab fa-github mr-2"></i>View Code on GitHub
                </a>
              </div>
              <p>A Python project to visualize and explore the Mandelbrot set in 2D space. Unfortunately the project allows only black and white pictures, but in compensation can be calculated for different integer powers of the original function, allowing access to the legendary Multibrot.</p>
              <div className="mt-8 flex items-center justify-between">
                <a href="https://github.com/blacklotus976/File_explorer_wx_py/blob/main/mandelbrot%20viewer" className="text-blue-600 hover:underline">
                  <i className="fab fa-github mr-2"></i>View Code on GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

         {/* Python Projects Section */}
         <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Custom DB viewer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">Example PIctures</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <img src="/images/db_viewer1.png" alt="Mandelbrot Set Visualization 1" className="w-full h-48 object-cover rounded" />
                <img src="/images/db_viewer2.png" alt="Mandelbrot Set Visualization 2" className="w-full h-48 object-cover rounded" />
              </div>
              <p>A Python project to visualize and explore a Database. Currently works with sqlite3. Upgradable to mysql. Github not supported, project belongs to private repository...</p>
              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
                <ul className="list-disc list-inside mb-4">
                  <li>wxWidgets</li>
                  <li>sqlite3</li>
                  <li>Viewing data</li>
                  <li>Running Custom queries</li>
                  <li>Exporting tables to csv files</li>
                  <li>Aims to help people not familiar with SQL-like IDEs</li>
                </ul>
              </div>
              {/* <div className="mt-8 flex items-center justify-between">
                <a href="https://github.com/blacklotus976/File_explorer_wx_py/blob/main/mandelbrot%20viewer" className="text-blue-600 hover:underline">
                  <i className="fab fa-github mr-2"></i>View Code on GitHub
                </a>
              </div> */}
            </div>
          </div>
        </section>

        <section className="mb-12">
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">LaTeX Projects</h2>
          <p className="mb-4">
            LaTeX is a high-quality typesetting system designed for the production of technical and scientific documentation. Also it's a fun way of ceating Pdfs if one feels creative. I have extensive experience using LaTeX for various projects, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Mathematic Theories</li>
            <li>Articles/Reports</li>
            <li>Professional resume and CV templates</li>
            <li>Book writing</li>
            <li>Chess Theory with Boards</li>
            <li>Custom Templates Creation -- example: Shogi Template, which shows lack in Western communities</li>
          </ul>
          <p className="mb-4">
            My LaTeX projects showcase attention to detail, clean formatting, and effective presentation of complex information. If you are interested, please advance on the full showcase!
          </p>
          <div className="mt-4 flex space-x-4">
            <a href="/giorCV/extras/latex_projects" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Explore Work
            </a>
            <button onClick={toggleLatexModal} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
        </section>

        {/* Chess Games Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Chess Games</h2>
          <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
            <h3 className="text-xl font-medium mb-6 text-center">My Chess Journey</h3>
            <div className="flex flex-col items-center">
              <img src="/images/chess_stats.png" alt="" className="w-full h-96 object-cover rounded mb-8" />
              <p className="mb-8 text-center">Explore my chess games and strategies on a dedicated page.</p>
              <a /*href="/giorCV/chess"*/ className="text-blue-500 hover:underline">View Chess Games Page</a>
            </div>
          </div>
        </section>



        

        {/* Hobbies Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Hobbies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">Photography</h3>
              <i className="fas fa-camera text-5xl text-blue-500 mb-4"></i>
              <p>Capturing moments and exploring visual storytelling through photography. --Page remains to be devoloped...</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">Hiking</h3>
              <i className="fas fa-hiking text-5xl text-green-500 mb-4"></i>
              <p>Exploring nature and conquering new trails in various landscapes. --Page remains to be developed. I hope I can offer the reader hiking paths with som eexplanations and photos.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">Cooking</h3>
              <i className="fas fa-utensils text-5xl text-yellow-500 mb-4"></i>
              <p>Experimenting with flavors and creating culinary delights in the kitchen. - I can't actually cook...If you've read till here I'm really sorry</p>
            </div>
          </div>
        </section>
      </div>

      

      {/* LaTeX Modal */}
      {showLatexModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">LaTeX Projects</h2>
      <p className="mb-4">
        LaTeX is a high-quality typesetting system designed for the production of technical and scientific documentation. Also it's a fun way of ceating Pdfs if one feels creative. I have extensive experience using LaTeX for various projects, including:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Mathematic Theories</li>
        <li>Articles/Reports</li>
        <li>Professional resume and CV templates</li>
        <li>Book writing</li>
        <li>Chess Theory with Boards</li>
        <li>Custom Templates Creation -- example: Shogi Template, which shows lack in Western communities</li>
      </ul>
      <p className="mb-4">
        My LaTeX projects showcase attention to detail, clean formatting, and effective presentation of complex information. If you are interested, please advance on the full showcase!
      </p>
      <div className="mt-4 flex space-x-4">
        <a href="/giorCV/extras/latex_projects" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Explore Work
        </a>
        <button onClick={toggleLatexModal} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default ExtraProjectHobbys;
