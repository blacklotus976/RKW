import React from 'react';

function FwkiesGeneralHomepage() {
  const [stats, setStats] = React.useState({
    totalUsers: 10000,
    totalCritics: 500,
  });

  const newsArticles = [
    {
      date: '2023-08-01',
      title: 'Amazing news, we havent commited suicide yet, we continue our hard labor for your enjoyment (middlefinger)',
      description: 'bla bla bla boring article',
    },
    {
      date: '2023-07-15',
      title: 'Milestone Achieved',
      description: 'We sprinted through the whole proccess, we dont jbnow react and we dont aim to learn. Front developing SuCKS',
    },
    {
      date: '2023-06-20',
      title: 'HUGE UPDATE',
      description: 'CHRIS LOUKERIS WAS LOST IN KRETA. IF YOU SEEN HIM CALL THE POLICY. HIS LIFE COULD BE IN DANGER!!',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      <header className="bg-white text-black shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <nav>
            <a
              href="/fwkies_about"
              className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded mr-2"
            >
              About Project
            </a>
            <a
              href="/fwkies_signup"
              className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded border border-black"
            >
              Sign Up
            </a>
            <a
              href="/fwkies_login"
              className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Login
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Welcome to Our Website</h2>
          <p className="text-xl">We're glad you're here!</p>
        </section>

        <section className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">Join Us Today!</h3>
          <a
            href="/fwkies_signup"
            className="bg-white hover:bg-gray-200 text-black font-bold py-3 px-6 rounded-full text-lg"
          >
            Sign Up Now
          </a>
        </section>

        <section className="max-w-2xl mx-auto text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">About Us</h3>
          <p className="leading-relaxed">
            We're dedicated to providing a great experience for all our users.
            Our platform is designed with you in mind-- fuckin bullshit. We are doing this just because it was tasked on us by the verdammte Uni that we besuch. Let us rest a lil. We look forward to having you as part of our community -- just don't annoy us! BTW here we should have left the task analysis and our solution...
          </p>
        </section>

        <section className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">Platform Statistics</h3>
          <p className="text-lg">Total Users: {stats.totalUsers}</p>
          <p className="text-lg">Total Critics: {stats.totalCritics}</p>
        </section>

        {/* New Section: News and Articles */}
        <section className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">News and Articles from your beloved Developers for this ShitPage</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-black rounded-lg shadow-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b-2 border-gray-300">Date</th>
                  <th className="py-2 px-4 border-b-2 border-gray-300">Title</th>
                  <th className="py-2 px-4 border-b-2 border-gray-300">Description</th>
                </tr>
              </thead>
              <tbody>
                {newsArticles.map((article, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-300">{article.date}</td>
                    <td className="py-2 px-4 border-b border-gray-300 font-bold">{article.title}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{article.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="bg-white text-black py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Our Website. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default FwkiesGeneralHomepage;
