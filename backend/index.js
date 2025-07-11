import dotenv from 'dotenv';
import sequelize from './config/db.js'; // Sequelize connection
import app from './server.js';
import './utils/cronJobs.js';

dotenv.config();

// 🚀 Optional ping route (you can skip if already declared in server.js)
app.get('/api/ping', (req, res) => {
  res.status(200).json({ message: 'pong ✅' });
});

// 🔌 Connect to PostgreSQL and start the server
sequelize.authenticate()
  .then(() => {
    console.log('✅ Connected to PostgreSQL');
    return sequelize.sync(); // Sync models to DB (optional if already synced)
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch(err => console.error('❌ PostgreSQL connection error:', err));
