import express from 'express';
import { getBlogs, getBlogById } from '../controllers/blog.controller.js';

const router = express.Router();

router.get('/', getBlogs);
router.get('/:id', getBlogById);

export default router;
