import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function FwkiesArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article; // Use optional chaining to prevent errors

  // Always declare useState hooks here
  const [newComment, setNewComment] = useState("");

  // Handle case when article is undefined
  if (!article) {
    return <div>Article not found</div>;
  }

  const handleLike = () => {
    // Handle like logic here if needed
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Logic to handle comment submission
      setNewComment("");
    }
  };

  const handleNavigate = () => {
    navigate('/fwkies_homepage_logged_in'); // Redirect to /homepage using React Router
  };

  return (
    <div className="max-w-2xl mx-auto p-4 font-roboto bg-white text-black">
      {/* Top Menu */}
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Fwkies Article</h1>
        <button
          onClick={handleNavigate}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
        >
          Back
        </button>
      </header>

      {/* Article Content */}
      <div className="mt-4">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-lg text-gray-700 mb-4">{article.description}</p>
        <div className="flex items-center text-gray-600 mb-2">
          <span className="font-semibold">{article.author}</span>
          <span className="mx-2">|</span>
          <span>{article.date}</span>
        </div>
        <img
          src={article.photos[0]}
          alt="Article main image"
          className="w-full h-64 object-cover mb-4 rounded-lg"
        />
        <p className="mb-4">{article.content}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {article.hashtags.map((tag, index) => (
            <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Likes Section */}
      <div className="flex items-center mb-4">
        <button onClick={handleLike} className="flex items-center mr-4">
          <i className={`fas fa-heart ${article.likes > 0 ? "text-gray-800" : "text-gray-400"} mr-2`}></i>
          <span>{article.likes} Likes</span>
        </button>
      </div>

      {/* Comments Section */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Comments</h2>
        {article.comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-3 rounded-lg mb-2">
            <p className="font-bold">{comment.author}</p>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <textarea
          name="comment"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          className="w-full p-2 border border-gray-300 rounded-lg mb-2"
          rows="3"
        ></textarea>
        <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
          Post Comment
        </button>
      </form>
    </div>
  );
}

export default FwkiesArticle;
