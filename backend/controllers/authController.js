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
    const user = await User.findOne({ where: { staffId: normalizedId } }); // ✅ Sequelize-style
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Log the login action
    await logAction({
      actor: user.id, // Sequelize uses `id` by default, not `_id`
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

// Forgot Password Controller — Sequelize version
export const forgotPassword = async (req, res) => {
  const { staffId } = req.body;
  const normalizedId = staffId.trim().toUpperCase();

  try {
    const user = await User.findOne({ where: { staffId: normalizedId } }); // ✅ Sequelize-style
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Placeholder: Add token generation or email logic here later
    res.status(200).json({ message: 'Password reset link has been sent (placeholder)' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
