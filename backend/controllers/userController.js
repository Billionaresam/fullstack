import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import Article from '../models/Article.js';
import Log from '../models/Log.js'; // ✅ NEW: logging

// Upload avatar only
export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const imagePath = req.file.path;
    await User.findByIdAndUpdate(req.user.id, { profileImage: imagePath });
    res.json({ imagePath });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed' });
  }
};

// Get logged-in user's profile (Admins see lastLogin)
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });

    delete user.password;
    if (req.user.role !== 'Admin') delete user.lastLogin;

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load profile' });
  }
};

// Update password and/or profile image
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { newPassword } = req.body;
    if (newPassword && newPassword.trim().length >= 5) {
      user.password = await bcrypt.hash(newPassword, 10);
    }

    if (req.file) {
      user.profileImage = req.file.path;
    }

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
};

// Admin dashboard overview
export const getAdminOverview = async (req, res) => {
  try {
    const [editors, publishers, articles, draft, submitted, approved] = await Promise.all([
      User.countDocuments({ role: 'Editor' }),
      User.countDocuments({ role: 'Publisher' }),
      Article.countDocuments(),
      Article.countDocuments({ status: 'Draft' }),
      Article.countDocuments({ status: 'Submitted' }),
      Article.countDocuments({ status: 'Approved' })
    ]);

    res.json({
      totalEditors: editors,
      totalPublishers: publishers,
      totalArticles: articles,
      articleBreakdown: { draft, submitted, approved }
    });
  } catch (err) {
    res.status(500).json({ message: 'Admin overview failed' });
  }
};

// Admin: Create new staff user + log it
export const createUser = async (req, res) => {
  try {
    const { staffId, role } = req.body;
    if (!staffId || !role) {
      return res.status(400).json({ message: 'staffId and role are required' });
    }

    const exists = await User.findOne({ staffId: staffId.toUpperCase() });
    if (exists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const defaultPassword = await bcrypt.hash('changeme', 10);

    const user = await User.create({
      staffId: staffId.toUpperCase(),
      role,
      password: defaultPassword
    });

    // ✅ Log creation
    await Log.create({
      action: 'CREATE_USER',
      performedBy: req.user.id,
      targetStaffId: user.staffId
    });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        staffId: user.staffId,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'User creation failed' });
  }
};

// Admin: Delete staff user + log it
export const deleteUserByStaffId = async (req, res) => {
  try {
    const staffId = req.params.staffId.toUpperCase();
    const user = await User.findOneAndDelete({ staffId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // ✅ Log deletion
    await Log.create({
      action: 'DELETE_USER',
      performedBy: req.user.id,
      targetStaffId: staffId
    });

    res.json({ message: `User ${staffId} deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: 'Deletion failed' });
  }
};

// Admin: View activity logs
export const getActivityLogs = async (req, res) => {
  try {
    const logs = await Log.find()
      .sort({ timestamp: -1 })
      .limit(100)
      .populate('performedBy', 'staffId role');

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch logs' });
  }
};
export const getInactiveUsers = async (req, res) => {
  try {
    const users = await User.find({ isActive: false }).select('staffId role');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch inactive users' });
  }
};
import bcrypt from 'bcryptjs';

export const updatePassword = async (req, res) => {
  const userId = req.user._id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword)
    return res.status(400).json({ message: 'Missing password fields' });

  const user = await User.findById(userId);
  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch)
    return res.status(401).json({ message: 'Current password is incorrect' });

  if (newPassword.length < 6)
    return res.status(400).json({ message: 'Password must be at least 6 characters' });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: 'Password updated successfully' });
};
export const resetPassword = async (req, res) => {
  try {
    const { staffId, newPassword } = req.body;
    if (!staffId || !newPassword)
      return res.status(400).json({ message: 'Missing staffId or newPassword' });

    const user = await User.findOne({ staffId: staffId.toUpperCase() });
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    if (newPassword.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters' });

    await logAction({
      actor: req.user._id,
      action: 'UPDATE_PASSWORD'
    });

    user.password = await bcrypt.hash(newPassword, 10);
    user.firstLogin = false; // ✅ Clear flag
    await user.save();

    await Log.create({
      action: 'RESET_PASSWORD',
      performedBy: req.user.id,
      targetStaffId: user.staffId
    });

    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Password reset failed' });
  }
};