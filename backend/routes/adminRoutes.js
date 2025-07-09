import express from 'express';
import {
  getAdminInsights,
  getLogs,
  createUser,         // If you’ve built this already
  deactivateUser       // Optional: for soft-delete logic
} from '../controllers/adminController.js';

import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// 📊 Dashboard insights
router.get('/insights', protect, restrictTo('Admin'), getAdminInsights);

// 📝 System logs (with query filters)
router.get('/logs', protect, restrictTo('Admin'), getLogs);

// ➕ Create new staff (optional based on your setup)
router.post('/create-user', protect, restrictTo('Admin'), createUser);

// ❌ Deactivate user account (optional)
router.put('/deactivate-user/:id', protect, restrictTo('Admin'), deactivateUser);

export default router;
