import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PublicBook({ customText }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [bookContent, setBookContent] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCustomText, setIsCustomText] = useState(false);
  const [isFilePathText, setIsFilePathText] = useState(false);
  const [filePath, setFilePath] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const pageRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filePathParam = params.get("filePath");

    if (filePathParam) {
      setFilePath(filePathParam.startsWith("/") ? filePathParam : `/${filePathParam}`);
    }

    // Delay rendering by 3 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [location.search]);

  useEffect(() => {
    if (!isLoading) {
      if (customText) {
        setBookContent(customText);
        setIsCustomText(true);
        setIsFilePathText(false);
      } else if (filePath) {
        fetch(filePath)
          .then((response) => response.text())
          .then((text) => {
            setBookContent(text);
            setIsFilePathText(true);
            setIsCustomText(false);
          })
          .catch((error) => console.error("Error loading book content:", error));
      } else {
        fetch("/const_book.txt")
          .then((response) => response.text())
          .then((text) => setBookContent(text))
          .catch((error) => console.error("Error loading book content:", error));
      }
    }
  }, [customText, filePath, isLoading]);

  const calculateLinesPerPage = () => {
    if (pageRef.current) {
      const lineHeight = parseInt(window.getComputedStyle(pageRef.current).lineHeight, 10);
      const pageHeight = pageRef.current.clientHeight;
      return Math.floor(pageHeight / lineHeight) - 2; // Leave a little space before the page end
    }
    return 10; // Default value if ref is not available
  };

  const splitContentIntoPages = (content) => {
    const words = content.split(" ");
    const pages = [];
    let currentPage = [];
    let currentLine = "";
    const maxLineLength = 35; // Maximum characters per line
    const maxLinesPerPage = 13; // Maximum lines per page
  
    words.forEach((word) => {
      if (currentLine.length + word.length + 1 <= maxLineLength) {
        currentLine += (currentLine ? " " : "") + word;
      } else {
        currentPage.push(currentLine);
        currentLine = word;
        if (currentPage.length >= maxLinesPerPage) {
          pages.push(currentPage);
          currentPage = [];
        }
      }
    });
  
    if (currentLine) currentPage.push(currentLine);
    if (currentPage.length) pages.push(currentPage);
  
    console.log("Pages:", pages); // Debugging log
    return pages;
  };

  const pages = splitContentIntoPages(bookContent);

  const handleNextPage = () => {
    if (currentPage < pages.length + 1 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsAnimating(false);
      }, 500); // Duration of the animation
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setIsAnimating(false);
      }, 500); // Duration of the animation
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBookContent(e.target.result);
        setIsCustomText(true);
        setIsFilePathText(false);
        setCurrentPage(0);
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    setFilePath("");
    setIsCustomText(false);
    setIsFilePathText(false);
    setCurrentPage(0);
    navigate("/book");
  };

  const renderDescription = () => {
    if (isCustomText) {
      return "STATUS: Currently rendering custom text.";
    } else if (isFilePathText) {
      return `STATUS: Rendering text from provided file path: ${filePath}.`;
    } else {
      return "STATUS: Rendering default book content.";
    }
  };

  const renderCoverTitle = () => {
    if (filePath === "/pragmatika_mikri_istoria.txt") {
      return "Πραγματικά Μικρή Ιστορία";
    } else if (filePath === "/istoria_mesaiou_megethous.txt") {
        return "Ιστορία Μεσαίου Μεγέθους";
    } else { 
      return isCustomText ? "Viewing Custom Text" : "To magiko vivlio tis fwkias negris";
    }
  };

  const renderCoverImage = () => {
    if (filePath === "/pragmatika_mikri_istoria.txt") {
      return "./images/final_bittersweet.png";
    } else if (filePath === "/istoria_mesaiou_megethous.txt") {
        return "./images/final_drowning.jpg";
    } else {
      return "images/gamiseta.png";
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-[#4a3c31] p-8 font-crimson-text flex flex-col items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#4a3c31] p-8 font-crimson-text flex flex-col items-center justify-center">
      <button
        onClick={handleReset}
        className="absolute top-4 left-4 bg-[#4a3c31] text-[#f4e4bc] px-8 py-4 rounded-lg border-2 border-[#8b4513] hover:bg-[#2c1810] transition-colors"
      >
        Reset
      </button>
      <div className="text-center text-[#f4e4bc] mb-4">
        <div className="bg-[#2c1810] p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Instructions:</h2>
          <p className="mb-2"><strong>1)</strong> If got here by buttons, then go ahead and read your book in my silly editor (not actually yet, just viewer for now).</p>
          <p className="mb-2"><strong>2)</strong> If got here by buttons, but want to see the original (default book) here just hit <strong>RESET</strong> (top-left).</p>
          <p className="mb-2"><strong>3)</strong> If you want to see again the book you chose to view here from other page, go back to that page and hit that button again. Or try left-directed arrow on top, next to reload, who knows it might help.</p>
          <p className="mb-2"><strong>4)</strong> If you want to view your own txt here, just use the bar below the book to select a txt from your files. Don't worry, I'm not tracking anything (to do that I would need backend, and I'm too bored to build yet another backend).</p>
        </div>
        <p>{renderDescription()}</p>
        <h1 className="text-5xl font-extrabold text-[#f4e4bc] mt-4">BOOK:</h1>

      </div>
      <div className="relative w-[1100px] h-[800px] bg-[#2c1810] rounded-lg p-8 shadow-2xl mb-4">
        <div className="absolute inset-4 border-4 border-[#8b4513] rounded-lg"></div>
        <div className="relative h-full flex justify-center items-center">
          {currentPage === 0 ? (
            <div className="w-[500px] h-[700px] bg-[#fff9e6] rounded shadow-xl p-8 transform rotate-[-2deg]">
              <div className="max-w-4xl mx-auto text-center mb-8">
                <h1 className="text-4xl text-[#4a3c31] mb-4">
                  {renderCoverTitle()}
                </h1>
                {!filePath && (
                    <p className="text-xl text-[#6b5a4c]">
                        {isCustomText ? "Viewing custom text, turn page over to start." : "Geniko egxeiridio aytou to istotopou kai malakies pou pernane apo to myalo moukai tyxainei na katagrafw edw."}
                    </p>
                    )}
                <img src={renderCoverImage()} alt="Cover Image" className="mt-8 mx-auto" />
              </div>
            </div>
          ) : currentPage === pages.length + 1 ? (
            <div className="w-[500px] h-[700px] bg-[#fff9e6] rounded shadow-xl p-8 transform rotate-[2deg]">
              <div className="h-full flex flex-col justify-center items-center text-center">
                <h2 className="text-3xl text-[#4a3c31] mb-4">The End</h2>
                {!filePath && (
                    <p className="text-xl text-[#6b5a4c]">
                        {isCustomText ? "END OF CUSTOM TXT" :"AYTA GIA TIN WRA ASXIMES MARMOTES, TALEME ARGOTERA..."}
                    </p>
                    )}
                <img src={renderCoverImage()} alt="Back Cover Image" className="mt-8 mx-auto" />
              </div>
            </div>
          ) : (
            <div className="flex gap-8">
              <div className="w-[500px] h-[700px] bg-[#fff9e6] rounded shadow-xl p-8 transform rotate-[-1deg]">
                <div
                  className="bg-[#fff9e6] p-12 min-h-[600px] shadow-2xl rounded transform relative"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(222,184,135,0.1) 0%, rgba(255,245,230,0.1) 100%)",
                  }}
                >
                  <div className={`transition-opacity duration-500`} ref={pageRef}>
                    {pages[currentPage - 1]?.map((line, i) => (
                      <p key={i} className="mb-4 text-[#2c1810] text-lg">
                        {line}
                      </p>
                    ))}
                    <div className="absolute bottom-4 right-4 text-[#2c1810]">
                      Page {currentPage} of {pages.length + 1}
                    </div>
                  </div>
                </div>
              </div>
              {currentPage < pages.length ? (
                <div className="w-[500px] h-[700px] bg-[#fff9e6] rounded shadow-xl p-8 transform rotate-[1deg]">
                  <div ref={pageRef} style={{ fontSize: "16px", color: "#2c1810" }}>
                    {pages[currentPage]?.map((line, i) => (
                      <p key={i} className="mb-4 text-[#2c1810] text-lg">
                        {line}
                      </p>
                    ))}
                    <div className="absolute bottom-4 right-4 text-[#2c1810]">
                      Page {currentPage + 1} of {pages.length + 1}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-[500px] h-[700px] bg-[#fff9e6] rounded shadow-xl p-8 transform rotate-[1deg]">
                  <div className="h-full flex flex-col justify-center items-center text-center">
                    <p className="text-xl text-[#6b5a4c]">Empty Page</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button
            onClick={handlePreviousPage}
            className="bg-[#4a3c31] text-[#f4e4bc] px-6 py-2 rounded hover:bg-[#2c1810] transition-colors"
            disabled={currentPage === 0}
          >
            Previous Pages
          </button>
          <button
            onClick={handleNextPage}
            className="bg-[#4a3c31] text-[#f4e4bc] px-6 py-2 rounded hover:bg-[#2c1810] transition-colors"
            disabled={currentPage >= pages.length + 1}
          >
            Next Pages
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col items-center mt-4">
        <p className="text-xl text-[#f4e4bc] mb-2">To upload and view your own text file (untracked), please use the input below:</p>
        <input type="file" accept=".txt" onChange={handleFileUpload} className="bg-[#4a3c31] text-[#f4e4bc] px-6 py-2 rounded hover:bg-[#2c1810] transition-colors" />
        </div>
      <style jsx global>{`
        @keyframes pageFlip {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(180deg); }
        }
        .page-flip {
          animation: pageFlip 0.5s ease-in-out;
          transform-origin: left;
          perspective: 1000px;
        }
        .book-shadow {
          box-shadow: 
            0 0 20px rgba(0,0,0,0.2),
            -10px 0 20px rgba(0,0,0,0.1),
            10px 0 20px rgba(0,0,0,0.1);
        }
      `}</style>
      <button
        onClick={() => console.log("Saving content:", bookContent)}
        className="fixed top-4 right-4 bg-[#4a3c31] text-[#f4e4bc] px-6 py-2 rounded hover:bg-[#2c1810] transition-colors"
      >
        Save Changes
      </button>
    </div>
  );
}

export default PublicBook;