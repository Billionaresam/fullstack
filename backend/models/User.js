import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // adjust the path as needed

const User = sequelize.define('User', {
  staffId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('Editor', 'Publisher', 'Admin'),
    defaultValue: 'Editor'
  },
  profileImage: {
    type: DataTypes.STRING
  },
  lastLogin: {
    type: DataTypes.DATE
  },
  firstLogin: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  resetToken: {
    type: DataTypes.STRING
  },
  resetTokenExpires: {
    type: DataTypes.DATE
  }
});

export default User;
