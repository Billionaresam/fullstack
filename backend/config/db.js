import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';

const connectDB = async () => {
  try {
    const sequelize = new Sequelize(process.env.PG_URI, {
      dialect: 'postgres',
      logging: false,
    });
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connected');
  } catch (err) {
    console.error('PostgreSQL connection failed:', err.message);
    process.exit(1);
  }
};

export default connectDB;
