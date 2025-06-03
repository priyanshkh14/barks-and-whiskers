
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();
        setBlog(data);
      } catch (error) {
        console.error('Failed to fetch blog:', error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-red-700 mb-4">{blog.title}</h1>
      <img
        src={blog.imageUrls[0]}
        alt={blog.title}
        className="w-full h-[400px] object-cover rounded-lg mb-6"
      />
      <p className="text-gray-700 text-lg">{blog.description}</p>
    </div>
  );
}
