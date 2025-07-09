import User from '../models/User.js';
import Article from '../models/Article.js';
import Log from '../models/Log.js';
import { convertToCSV } from '../utils/convertToCSV.js';

const formatResponse = (res, data, filename, format = 'json') => {
  if (format === 'csv') {
    const csv = convertToCSV(data.map(item => item.toObject()));
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}.csv`);
    return res.send(csv);
  } else {
    return res.json(data);
  }
};

export const exportUsers = async (req, res) => {
  try {
    const users = await User.find({ isActive: true }).select('-password -__v');
    return formatResponse(res, users, 'users', req.query.format);
  } catch {
    res.status(500).json({ message: 'Failed to export users' });
  }
};

export const exportArticles = async (req, res) => {
  try {
    const articles = await Article.find({ isArchived: false }).select('-__v');
    return formatResponse(res, articles, 'articles', req.query.format);
  } catch {
    res.status(500).json({ message: 'Failed to export articles' });
  }
};

export const exportLogs = async (req, res) => {
  try {
    const logs = await Log.find()
      .sort({ timestamp: -1 })
      .limit(500)
      .populate('performedBy', 'staffId role');
    return formatResponse(res, logs, 'logs', req.query.format);
  } catch {
    res.status(500).json({ message: 'Failed to export logs' });
  }
};
