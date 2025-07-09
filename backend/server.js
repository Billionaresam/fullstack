import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import exportRoutes from './routes/exportRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();
connectDB();
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// ✅ Health check route
app.get('/api/ping', (req, res) => {
  res.status(200).json({ message: 'pong ✅' });
});
app.use('/api/categories', categoryRoutes);
// Static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/export', exportRoutes);

app.get('/', (req, res) => {
  res.send('🚀 CMS API running...');
});

export default app; // ✅ Export only
app.use('/api/admin', adminRoutes);