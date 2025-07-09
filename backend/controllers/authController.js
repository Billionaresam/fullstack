import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

export const loginUser = async (req, res) => {
  const { staffId, password } = req.body;
  const normalizedId = staffId.trim().toUpperCase();

  try {
    const user = await User.findOne({ staffId: normalizedId });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    // Log the login action
    await logAction({
      actor: user._id,
      action: 'RESET_PASSWORD',
      metadata: { ip: req.ip, userAgent: req.get('User-Agent') }
    });
    res.json({
      _id: user._id,
      staffId: user.staffId,
      role: user.role,
      profileImage: user.profileImage || '',
      token: generateToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
export const requirePasswordUpdate = (req, res, next) => {
  const user = req.user;
  if (user && user.firstLogin) {
    return res.status(403).json({
      message: 'Password update required before accessing your account'
    });
  }
  next();
};