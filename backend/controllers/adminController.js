import User from '../models/User.js';
import Article from '../models/Article.js';

export const getAdminInsights = async (req, res) => {
  try {
    const [totalUsers, activeUsers, inactiveUsers] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
      User.countDocuments({ isActive: false }),
    ]);

    const articleStats = await Article.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const articleBreakdown = articleStats.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    res.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        inactive: inactiveUsers,
      },
      articles: articleBreakdown,
    });
  } catch (err) {
    console.error('[Admin Insights]', err);
    res.status(500).json({ message: 'Failed to fetch dashboard insights' });
  }
};
