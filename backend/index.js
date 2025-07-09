import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './server.js';
import './utils/cronJobs.js';

dotenv.config();

app.get('/api/ping', (req, res) => {
  res.status(200).json({ message: 'pong ✅' });
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
  );
})
.catch(err => console.error('❌ MongoDB connection error:', err));
