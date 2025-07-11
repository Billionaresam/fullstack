import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Article = sequelize.define('Article', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Draft', 'Submitted', 'Approved', 'Rejected'),
    defaultValue: 'Draft'
  },
  isArchived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

// 🔗 Set up foreign key relationship to User model (as editor)
Article.belongsTo(User, { as: 'editor', foreignKey: 'editorId' });

export default Article;
