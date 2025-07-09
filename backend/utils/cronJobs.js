import cron from 'node-cron';
import Article from '../models/Article.js';
import User from '../models/User.js';
import { transporter } from '../config/mail.js';

// 🔁 Run every day at 2:00 AM
cron.schedule('0 2 * * *', async () => {
  console.log('🕑 Running daily cleanup job');

  const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
  const updatedArticles = await Article.updateMany(
    { status: 'Draft', updatedAt: { $lt: fourteenDaysAgo }, isArchived: false },
    { isArchived: true }
  );

  console.log(`🗂️ Archived ${updatedArticles.modifiedCount} stale draft articles`);
});

// 💤 Run every Monday at 2:00 AM
cron.schedule('0 2 * * 1', async () => {
  console.log('🕑 Running weekly inactive staff check');

  const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
  const deactivated = await User.updateMany(
    { lastLogin: { $lt: ninetyDaysAgo }, isActive: true },
    { isActive: false }
  );
  await transporter.sendMail({
    from: '"CMS Server" <no-reply@yourcms.com>',
    to: process.env.ADMIN_EMAIL,
    subject: '🗂️ Daily CMS Auto-Archive Report',
    html: `
      <h3>Cleanup Summary</h3>
      <ul>
        <li>🗂️ Draft articles archived: 0</li>
        <li>👤 Staff accounts disabled: ${deactivated?.modifiedCount || 0}</li>
      </ul>
      <p>✅ All tasks completed on ${new Date().toLocaleString()}</p>
    `
  });
  console.log(`❌ Deactivated ${deactivated.modifiedCount} inactive staff`);
});
