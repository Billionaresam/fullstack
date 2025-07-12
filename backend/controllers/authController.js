// Imports
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import logAction from '../utils/logAction.js'; // Make sure this file exists

// Login Controller
export const loginUser = async (req, res) => {
  const { staffId, password } = req.body;
  const normalizedId = staffId.trim().toUpperCase();

  try {
    const user = await User.findOne({ where: { staffId: normalizedId } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    await logAction({
      actor: user.id,
      action: 'RESET_PASSWORD',
      metadata: { ip: req.ip, userAgent: req.get('User-Agent') }
    });

    res.json({
      id: user.id,
      staffId: user.staffId,
      role: user.role,
      profileImage: user.profileImage || '',
      token: generateToken(user.id)
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Middleware to Require Password Update
export const requirePasswordUpdate = (req, res, next) => {
  const user = req.user;
  if (user && user.firstLogin) {
    return res.status(403).json({
      message: 'Password update required before accessing your account'
    });
  }
  next();
};

// Forgot Password Controller
export const forgotPassword = async (req, res) => {
  const { staffId } = req.body;
  const normalizedId = staffId.trim().toUpperCase();

  try {
    const user = await User.findOne({ where: { staffId: normalizedId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Password reset link has been sent (placeholder)' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Reset Password Controller — Added
export const resetPassword = async (req, res) => {
  const { staffId, newPassword } = req.body;
  const normalizedId = staffId.trim().toUpperCase();

  try {
    const user = await User.findOne({ where: { staffId: normalizedId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
