import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const handleShare = (id) => {
    const url = `${window.location.origin}/blogs/${id}`;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-red-700 mb-8">Stories and Expert Pet Care Articles</h1>
      {blogs.length === 0 ? (
        <p className="text-center text-gray-600">No articles available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-xl shadow p-4">
              <img
                src={blog.imageUrls[0]}
                alt={blog.title}
                className="w-full h-60 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold text-red-600 mt-4">{blog.title}</h2>
              <p className="text-gray-700 mt-2 line-clamp-3">{blog.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <Link
                  to={`/blogs/${blog._id}`}
                  className="text-sm text-blue-700 font-medium hover:underline"
                >
                  Read more
                </Link>
                <button
                  onClick={() => handleShare(blog._id)}
                  className="text-sm text-gray-500 hover:text-blue-600"
                >
                  🔗 Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
