import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  staffId: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Editor', 'Publisher', 'Admin'],
    default: 'Editor'
  },
  profileImage: {
    type: String
  },
  lastLogin: {
    type: Date
  },
  firstLogin: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  resetToken: {
    type: String
  },
  resetTokenExpires: {
    type: Date
  }
});

export default mongoose.model('User', userSchema);
