import Blog from '../models/blog.model.js';
import { errorHandler } from '../utils/error.js';

export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};

export const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return next(errorHandler(404, 'Blog not found'));
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};
