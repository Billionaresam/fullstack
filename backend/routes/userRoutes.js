import express from 'express';
import {
  uploadProfileImage,
  getMyProfile,
  updateProfile,
  getAdminOverview,
  createUser,
  deleteUserByStaffId
} from '../controllers/userController.js';

import { protect, restrictTo } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// General user profile endpoints
router.get('/me', protect, getMyProfile);
router.post('/profile-image', protect, upload.single('image'), uploadProfileImage);
router.patch('/profile', protect, upload.single('image'), updateProfile);

// Admin-only routes
router.get('/admin-overview', protect, restrictTo('Admin'), getAdminOverview);
router.post('/create', protect, restrictTo('Admin'), createUser);
router.delete('/:staffId', protect, restrictTo('Admin'), deleteUserByStaffId);
import { updatePassword } from '../controllers/userController.js';

router.put('/update-password', protect, updatePassword);


export default router;
