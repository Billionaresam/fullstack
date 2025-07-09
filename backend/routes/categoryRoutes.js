import express from 'express';
import { getCategories } from '../controllers/categoryController.js';

const router = express.Router();

// Public route – returns list of valid article categories
router.get('/', getCategories);

export default router;
