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
    // Example: logAction after deactivating a user (assuming user is defined)
    // await logAction({
    //   actor: req.user._id,
    //   action: 'DEACTIVATE_USER',
    //   target: user._id,
    //   metadata: { staffId: user.staffId }
    // });
    const articleBreakdown = articleStats.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      // Removed 'await logAction' from here because 'await' cannot be used in a non-async function
      return acc;
    }, {});

    // Example: logAction after creating a new user (assuming newUser is defined)
    // await logAction({
    //   actor: req.user._id,
    //   action: 'CREATE_USER',
    //   metadata: { staffId: newUser.staffId },
    //   target: newUser._id
    // });

    res.json({
      users: { total: totalUsers, active: activeUsers, inactive: inactiveUsers },
      articles: articleBreakdown
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch dashboard insights' });
  }
};
