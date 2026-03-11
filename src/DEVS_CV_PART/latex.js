import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LatexPage() {
  const pdfList = [
    { id: 1, title: 'Propabilities - A math guide', url: '/pdfs/probs.pdf', description: 'A guide on basic theorems on propabilities', previewImage: '/images/props.jpg' },
    { id: 2, title: 'CV Example', url: '/pdfs/cv.pdf', description: 'Curriculum Vitae Example on Latex', previewImage: '/images/cv.jpg' },
    { id: 3, title: 'SQLite', url: '/pdfs/sqlite.pdf', description: 'General Instructions on how to use SQLite', previewImage: '/images/sqlite.jpg' },
    { id: 4, title: 'Maths-Chemistry', url: '/pdfs/fotis.pdf', description: 'A general example of maths and chemistry notations on LAtex', previewImage: '/images/integral_symbol.jpg' },
    { id: 5, title: 'Ανθολόγιο Λουλουδιών', url: '/pdfs/flowers.pdf', description: 'A hard attempt on exploring all the flowers --remains unfinished', previewImage: '/images/hokmangaflower.jpg' },
    { id: 6, title: 'Shogi Custom Template', url: '/pdfs/shogi_main.pdf', description: 'Created a Shogi template so people can start writting down theory on that -needs sharpening', previewImage: '/images/shogi.jpg' },
    { id: 7, title: 'Schach Kings Gambit', url: '/pdfs/Kings_Gambit.pdf', description: "General King's Gambit Theory --unfinished" , previewImage: '/images/chesslogo.png' },
    { id: 8, title: 'Schach Luchinni Gambit', url: '/pdfs/luchinni.pdf', description: 'Special theory revolving the agressive Luchinni Gambit, as an answer against boring Guocco Piano games.', previewImage: '/images/chesslogo.png' },
  ];

  const [selectedPdf, setSelectedPdf] = useState(null);

  const handlePdfClick = (pdf) => {
    // Open the PDF in a new tab
    window.open(pdf.url, '_blank');
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-4 py-8">
        {selectedPdf ? (
          <div className="flex flex-col items-center">
            <Link to="/giorCV/extras" className="mt-8 mb-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 font-roboto self-start">
              <i className="fas fa-arrow-left mr-2"></i> Back
            </Link>
            <p className="text-lg text-blue-800 font-roboto mb-4">Opening PDF in a new tab...</p>
          </div>
        ) : (
          <>
            <Link to="/giorCV/extras" className="mt-8 mb-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 font-roboto">
              <i className="fas fa-arrow-left mr-2"></i> Back
            </Link>
            <h1 className="text-3xl font-bold mb-6 text-blue-800 font-roboto">LaTeX PDF Showcase</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {pdfList.map((pdf) => (
                <div
                  key={pdf.id}
                  onClick={() => handlePdfClick(pdf)}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-start cursor-pointer h-full"
                >
                  <h2 className="text-lg font-semibold text-blue-700 text-center font-roboto mb-2">{pdf.title}</h2>
                  <img src={pdf.previewImage} alt={`${pdf.title} preview`} className="w-full h-40 bg-blue-100 rounded-md mb-4 object-cover" />
                  <p className="text-sm text-gray-600 text-center font-roboto">{pdf.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
     </div>
    </div>
  );
}

export default LatexPage;
