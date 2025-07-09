import express from 'express';
import {
  exportUsers,
  exportArticles,
  exportLogs
} from '../controllers/exportController.js';

import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', protect, restrictTo('Admin'), exportUsers);
router.get('/articles', protect, restrictTo('Admin'), exportArticles);
router.get('/logs', protect, restrictTo('Admin'), exportLogs);

export default router;
