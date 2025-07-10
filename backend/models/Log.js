import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // adjust the path as needed

// Since you are using PostgreSQL, you should use an ORM like Sequelize or TypeORM instead of Mongoose.
// Here is an example using Sequelize:


const Log = sequelize.define('Log', {
  action: {
    type: DataTypes.STRING,
    allowNull: false
  },
  actor: {
    type: DataTypes.INTEGER, // assuming User's primary key is integer
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  metadata: {
    type: DataTypes.JSON
  },
  target: {
    type: DataTypes.STRING
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true
});

export default Log;
