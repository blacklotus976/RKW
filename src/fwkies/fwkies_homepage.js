import React , { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FwkiesArticle from './fwkies_article'; // Adjust the import according to your structure

function FwkiesMainPage() {
  console.log('FwkiesMainPage rendered');
  const [isTestMode, setIsTestMode] = React.useState(true);
  const [isAdsMode, setIsAdsMode] = React.useState(false);
  const [articles, setArticles] = React.useState([]);
  const [articlesPerPage, setArticlesPerPage] = React.useState(5);
  const navigate = useNavigate();

  const recommendationHashtags = ['#Tech', '#Design', '#React', '#JavaScript'];

  React.useEffect(() => {
    if (isTestMode) {
      setArticles([
        {
          id: 1,
          author: 'Chris Loukeris',
          date: '6969-420-69',
          content: 'O kri xathike stin Kriti kai den milaei pia',
          description: 'An insightful exploration of how the kri-kri, an iconic species in Crete, has disappeared into silence.',
          hashtags: ['#Tech', '#Design'],
          photos: ['/image1.jpg'],
          comments: [
            { author: 'Giorgoul', content: 'Pou sai paikai!' },
            { author: 'Megalh Fwkia', content: 'Skadoosh!!.' },
          ],
          likes: 0,
          isAd: false,
        },
        {
          id: 2,
          author: 'Megalh Fwkia',
          date: 'Kapote magika',
          content: 'Variemai ti zwh m elpizw na epitrepetai tailwind gt den graphw css',
          description: 'A candid look at the struggles and hopes of modern life.',
          hashtags: ['#React', '#JavaScript'],
          photos: ['/image2.jpg', '/image3.jpg'],
          comments: [
            { author: 'Chris Loukeris', content: 'Eisai megalos mortis' },
          ],
          likes: 0,
          isAd: true,
        },
        {
          id: 3,
          author: 'John Doe',
          date: '2024-09-01',
          content: 'Learn more about the latest in JavaScript frameworks!',
          description: 'An overview of the most popular frameworks and their use cases.',
          hashtags: ['#JavaScript', '#Tech'],
          photos: [],
          comments: [
            { author: 'Jane Doe', content: 'Great article!' },
          ],
          likes: 0,
          isAd: false,
        },
      ]);
    }
  }, [isTestMode]);

  const handleLike = (articleId) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === articleId ? { ...article, likes: article.likes + 1 } : article
      )
    );
  };

  const filterArticlesByRecommendations = (articles) => {
    return articles.filter((article) =>
      article.hashtags.some((hashtag) => recommendationHashtags.includes(hashtag))
    );
  };

  const filteredArticles = isAdsMode
    ? filterArticlesByRecommendations(articles).slice(0, articlesPerPage)
    : articles.slice(0, articlesPerPage);


  const handleExploreArticle = (article) => {
    navigate('/fwkies_article', { state: { article } });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-white text-black shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex space-x-4">
              <Link to="/homepage" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 cursor-not-allowed">
                Homepage
              </Link>
              <Link to="/fwkies_aggelies" className="px-3 py-2 rounded-md text-sm font-medium text-black hover:text-gray-700">
                Aggelies
              </Link>
              <Link to="/fwkies_search" className="px-3 py-2 rounded-md text-sm font-medium text-black hover:text-gray-700">
                SearchArticles
              </Link>
              <Link to="/fwkies_search_profiles" className="px-3 py-2 rounded-md text-sm font-medium text-black hover:text-gray-700">
                SearchProfiles
              </Link>
              <Link to="/fwkies_profile" className="px-3 py-2 rounded-md text-sm font-medium text-black hover:text-gray-700">
                Profile
              </Link>
              <Link to="/fwkies_messages" className="px-3 py-2 rounded-md text-sm font-medium text-black hover:text-gray-700">
                Messages
              </Link>
            </div>
            <div className="flex items-center">
              <label htmlFor="adsMode" className="mr-2 text-sm font-medium text-gray-700">
                Recommendations:
              </label>
              <input
                type="checkbox"
                id="adsMode"
                checked={isAdsMode}
                onChange={(e) => setIsAdsMode(e.target.checked)}
                className="form-checkbox h-5 w-5 text-black"
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-4 flex items-center">
            <label htmlFor="articlesPerPage" className="mr-2 text-lg">
              Articles per page:
            </label>
            <select
              id="articlesPerPage"
              name="articlesPerPage"
              value={articlesPerPage}
              onChange={(e) => setArticlesPerPage(Number(e.target.value))}
              className="border rounded p-1 text-black"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">
              Recommendations {isAdsMode ? 'Enabled' : 'Disabled'}
            </h3>
            {isAdsMode && (
              <div className="mt-2">
                <p className="text-sm text-gray-300">Filters: {recommendationHashtags.join(' ')}</p>
              </div>
            )}
          </div>

          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <div key={article.id} className="bg-white text-black shadow overflow-hidden sm:rounded-lg mb-6">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium">{article.author}</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">{article.date}</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Content</dt>
                      <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{article.content}</dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Description</dt>
                      <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{article.description}</dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Hashtags</dt>
                      <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                        <p>{article.hashtags.join(' ')}</p>
                      </dd>
                    </div>
                    {article.photos.length > 0 && (
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Photos</dt>
                        <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                          <div className="flex flex-wrap">
                            {article.photos.map((photo, index) => (
                              <img
                                key={index}
                                src={photo}
                                alt={`Photo ${index + 1} from ${article.author}`}
                                className="w-24 h-24 object-cover m-2"
                              />
                            ))}
                          </div>
                        </dd>
                      </div>
                    )}
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Comments</dt>
                      <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                        {article.comments.map((comment, index) => (
                          <div key={index} className="mb-2">
                            <p className="font-semibold">{comment.author}</p>
                            <p>{comment.content}</p>
                          </div>
                        ))}
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Likes</dt>
                      <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleLike(article.id)}
                            className="mr-2 p-1 border rounded text-white bg-black hover:bg-gray-700"
                          >
                            Like
                          </button>
                          <span>{article.likes} Likes</span>
                        </div>
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Explore</dt>
                      <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                        <button
                          onClick={() => handleExploreArticle(article)}
                          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Explore Article
                        </button>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No articles available.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default FwkiesMainPage;
