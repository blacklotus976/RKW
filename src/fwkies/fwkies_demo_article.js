import React, { useState } from 'react';

// Define article and profile data as constants
const ARTICLE_DATA = {
  title: 'O kri xathike stin Kriti kai den milaei pia',
  author: 'Chris Loukeris',
  authorProfileLink: '/profile/chris-loukeris',
  contact: '6969-420-69',
  imageUrl: '/image1.jpg', // Ensure this path is correct
  content: 'O kri xathike stin Kriti kai den milaei pia',
  tags: ['#Tech', '#Design'],
};

const INITIAL_LIKES = 0;

const INITIAL_COMMENTS = [
  { author: 'Giorgoul', content: 'Pou sai paikai!' },
  { author: 'Megalh Fwkia', content: 'Skadoosh!!' },
];

function DemoArticle() {
  const [likes, setLikes] = useState(INITIAL_LIKES);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState(INITIAL_COMMENTS);

  // Handle like button
  const handleLike = () => {
    setLikes(likes + 1);
  };

  // Handle new comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim()) {
      setComments([...comments, { author: 'Anonymous', content: commentInput }]);
      setCommentInput(''); // Reset the input after submitting
    }
  };

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Header */}
      <header className="bg-black text-white p-4">
        <button className="text-white">
          <i className="fas fa-arrow-left mr-2"></i>Back
        </button>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Article Section */}
        <article className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{ARTICLE_DATA.title}</h1>
          <div className="mb-4">
            <a href={ARTICLE_DATA.authorProfileLink} className="text-blue-600 hover:underline">
              {ARTICLE_DATA.author}
            </a>
            <span className="ml-4 text-gray-500">{ARTICLE_DATA.contact}</span>
          </div>

          {/* Article Image */}
          <div className="mb-4">
            <img src={ARTICLE_DATA.imageUrl} alt="Article related" className="w-full h-auto rounded-lg" />
          </div>

          {/* Article Content */}
          <p className="mb-4">{ARTICLE_DATA.content}</p>

          {/* Article Tags */}
          <div className="mb-4">
            {ARTICLE_DATA.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Like Button */}
          <div className="flex items-center mb-4">
            <button onClick={handleLike} className="flex items-center mr-4">
              <i className="far fa-heart mr-2"></i>
              <span>{likes} Likes</span>
            </button>
          </div>
        </article>

        {/* Comments Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          {comments.map((comment, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="font-bold">{comment.author}</p>
              <p>{comment.content}</p>
            </div>
          ))}
        </section>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <textarea
            name="comment"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Write a comment..."
            rows="3"
          ></textarea>
          <button type="submit" className="mt-2 bg-black text-white px-4 py-2 rounded-lg">
            Submit Comment
          </button>
        </form>
      </main>
    </div>
  );
}

export default DemoArticle;
