function MainComponent() {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [writerSearchTerm, setWriterSearchTerm] = React.useState("");
    const [expandedArticle, setExpandedArticle] = React.useState(null);
    const [expandedWriter, setExpandedWriter] = React.useState(null);
    const [filterType, setFilterType] = React.useState("all");
  
    const articles = [
      {
        id: 1,
        title: "Ascent to Solitude: Mount Blanc's Silent Echo",
        author: "Elena Schwarzwald",
        date: "2023-12-15",
        content:
          "Deep in the heart of the Alps, where silence speaks louder than words...",
        images: ["/mountain1.jpg", "/mountain2.jpg"],
        video: "/climb-video.mp4",
      },
      {
        id: 2,
        title: "Letters from Yesterday's Love",
        author: "Marcus Heimlich",
        date: "2023-11-28",
        content:
          "In the dusty attic of my grandmother's house, I found a box of letters...",
        images: ["/vintage-letters.jpg", "/old-photo.jpg"],
      },
      {
        id: 3,
        title: "The Forgotten Trail of Zermatt",
        author: "Elena Schwarzwald",
        date: "2023-10-30",
        content:
          "As dawn broke over the Swiss Alps, the ancient path revealed itself...",
        images: ["/trail1.jpg", "/trail2.jpg"],
        video: "/trail-video.mp4",
      },
    ];
  
    const writers = [
      {
        id: 1,
        name: "Elena Schwarzwald",
        image: "/elena-profile.jpg",
        bio: "Mountain enthusiast and poetic soul, Elena brings the silence of peaks to life through her words.",
        articles: ["Ascent to Solitude", "The Forgotten Trail"],
        score: 92,
      },
      {
        id: 2,
        name: "Marcus Heimlich",
        image: "/marcus-profile.jpg",
        bio: "Collector of memories and lost loves, Marcus writes from the heart of nostalgia.",
        articles: ["Letters from Yesterday's Love"],
        score: 88,
      },
    ];
  
    const filteredArticles = React.useMemo(() => {
      return articles.filter((article) => {
        const searchLower = searchTerm.toLowerCase();
        switch (filterType) {
          case "title":
            return article.title.toLowerCase().includes(searchLower);
          case "author":
            return article.author.toLowerCase().includes(searchLower);
          case "content":
            return article.content.toLowerCase().includes(searchLower);
          default:
            return (
              article.title.toLowerCase().includes(searchLower) ||
              article.author.toLowerCase().includes(searchLower) ||
              article.content.toLowerCase().includes(searchLower)
            );
        }
      });
    }, [searchTerm, filterType]);
  
    const filteredWriters = React.useMemo(() => {
      return writers
        .filter((writer) =>
          writer.name.toLowerCase().includes(writerSearchTerm.toLowerCase()),
        )
        .sort((a, b) => a.name.localeCompare(b.name));
    }, [writerSearchTerm]);
  
    return (
      <div className="min-h-screen bg-[#121212] text-white font-crimson-text">
        <header className="relative h-[60vh] flex items-center justify-center bg-[#002f6c] overflow-hidden">
          
          <div className="absolute inset-0 opacity-20 bg-[url('')]"></div> {/* /vintage-pattern.png */}
          <div className="relative z-10 text-center p-8 border-8 border-[#004d40] bg-black bg-opacity-50">
            <h1 className="text-6xl md:text-7xl font-playfair mb-4">
              Begleiters der Einsamkeit
            </h1>
            <p className="text-xl italic">A Collection of Solitary Tales</p>
          </div>
        </header>
  
        <section className="max-w-4xl mx-auto p-8 my-12 bg-[#001f3f] border-l-2 border-r-2 border-[#004d40]">
          <p className="text-xl leading-relaxed">
            Welcome to Begleiters der Einsamkeit, where solitude finds its voice
            through the written word. Our writers traverse the landscapes of
            isolation, bringing forth stories that echo in the chambers of
            solitary hearts.
          </p>
        </section>
  
        <section className="max-w-6xl mx-auto p-8">
          <div className="mb-8">
            <input
              type="text"
              name="search"
              placeholder="Search articles..."
              className="w-full p-4 bg-[#1a1a1a] border-2 border-[#004d40] rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              name="filterType"
              className="mt-4 p-2 bg-[#1a1a1a] border-2 border-[#004d40] rounded"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="content">Content</option>
            </select>
          </div>
  
          <div className="space-y-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-[#1a1a1a] border-2 border-[#004d40] rounded"
              >
                <div
                  className="p-6 cursor-pointer flex justify-between items-center"
                  onClick={() =>
                    setExpandedArticle(
                      expandedArticle === article.id ? null : article.id,
                    )
                  }
                >
                  <h3 className="text-2xl">{article.title}</h3>
                  <i
                    className={`fas fa-chevron-${expandedArticle === article.id ? "up" : "down"}`}
                  ></i>
                </div>
                {expandedArticle === article.id && (
                  <div className="p-6 border-t border-[#004d40]">
                    <p className="mb-4 text-gray-300">{article.content}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {article.images?.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Image ${index + 1} for ${article.title}`}
                          className="w-full h-48 object-cover rounded"
                        />
                      ))}
                    </div>
                    {article.video && (
                      <video controls className="w-full rounded">
                        <source src={article.video} type="video/mp4" />
                      </video>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
  
        <section className="max-w-6xl mx-auto p-8 my-12">
          <h2 className="text-4xl mb-8 font-playfair">Our Writers</h2>
          <input
            type="text"
            name="writerSearch"
            placeholder="Search writers..."
            className="w-full p-4 mb-8 bg-[#1a1a1a] border-2 border-[#004d40] rounded"
            value={writerSearchTerm}
            onChange={(e) => setWriterSearchTerm(e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredWriters.map((writer) => (
              <div
                key={writer.id}
                className="bg-[#1a1a1a] border-2 border-[#004d40] rounded"
              >
                <div
                  className="p-6 cursor-pointer flex items-center space-x-4"
                  onClick={() =>
                    setExpandedWriter(
                      expandedWriter === writer.id ? null : writer.id,
                    )
                  }
                >
                  <img
                    src={writer.image}
                    alt={writer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <h3 className="text-xl">{writer.name}</h3>
                  <i
                    className={`fas fa-chevron-${expandedWriter === writer.id ? "up" : "down"} ml-auto`}
                  ></i>
                </div>
                {expandedWriter === writer.id && (
                  <div className="p-6 border-t border-[#004d40]">
                    <p className="mb-4">{writer.bio}</p>
                    <div className="mb-4">
                      <h4 className="font-bold mb-2">Articles:</h4>
                      <ul className="list-disc list-inside">
                        {writer.articles.map((article, index) => (
                          <li key={index}>{article}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl">Score: {writer.score}</span>
                      <button className="bg-[#004d40] px-4 py-2 rounded hover:bg-[#00695c] transition-colors">
                        Contact Writer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
  
        <footer className="bg-[#1a1a1a] border-t-2 border-[#004d40] mt-12 p-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl mb-4 font-playfair">Terms of Service</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-[#004d40] transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#004d40] transition-colors">
                    User Agreement
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl mb-4 font-playfair">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-[#004d40] transition-colors">
                    Email Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#004d40] transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl mb-4 font-playfair">API</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-[#004d40] transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#004d40] transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl mb-4 font-playfair">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-[#004d40] transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#004d40] transition-colors">
                    Newsletter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
  
        <style jsx global>{`
          ::-webkit-scrollbar {
            width: 12px;
          }
          ::-webkit-scrollbar-track {
            background: #1a1a1a;
          }
          ::-webkit-scrollbar-thumb {
            background: #004d40;
            border-radius: 6px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #00695c;
          }
        `}</style>
      </div>
    );
  }
  
  
  