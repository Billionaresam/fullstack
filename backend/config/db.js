import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_NAME = '',
  DB_USER = '',
  DB_PASSWORD = '',
  DB_HOST = 'localhost',
  DB_PORT = 5432,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'postgres',
  logging: false,
});

export default sequelize;

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('[DB] Connection established successfully.');
  } catch (error) {
    console.error('[DB] Unable to connect:', error.message);
  }
};
