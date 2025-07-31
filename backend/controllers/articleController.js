import Article from '../models/Article.js';
import User from '../models/User.js';
import { transporter } from '../config/mail.js';

// Submit new article
export const submitArticle = async (req, res) => {
  try {
    const validCategories = ['Politics', 'Health', 'Technology', 'Sports', 'Entertainment', 'Business'];

    if (!validCategories.includes(req.body.category)) {
      return res.status(400).json({ message: 'Invalid category selected' });
    }

    const article = await Article.create({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      author: req.user._id,
      status: 'Submitted',
      thumbnail: req.body.thumbnail,
      editor: req.user.id
    });

    // After article.save() and await logAction(...)
    const author = await User.findById(article.author);

    await transporter.sendMail({
      from: '"CMS Editorial Team" <no-reply@yourcms.com>',
      to: author.email,
      subject: '❌ Your Article Was Rejected',
      html: `
      <h3>Hello ${author.staffId},</h3>
      <p>Your article titled <strong>${article.title}</strong> was reviewed and <strong>rejected</strong> by the editorial team.</p>
      <p><strong>Reason:</strong> ${article.rejectionReason}</p>
      <p>You may revise and resubmit it for approval.</p>
      <hr />
      <p><em>This notification was triggered automatically by the CMS backend.</em></p>
      `
    });
    res.json(article);
  } catch (err) {
    res.status(400).json({ message: 'Submission failed' });
  }
};

// Upload thumbnail
export const uploadThumbnail = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({ imagePath: req.file.path });
};

// Get own articles (Editor)
export const getMyArticles = async (req, res) => {
  const articles = await Article.find({ editor: req.user.id });
  res.json(articles);
};

// Edit article
export const editArticle = async (req, res) => {
  const updated = await Article.findOneAndUpdate(
    { _id: req.params.id, editor: req.user.id },
    {
      title: req.body.title,
      content: req.body.content,
      thumbnail: req.body.thumbnail
    },
    { new: true }
  );
  res.json(updated);
};

// Get submitted articles (Publisher)
export const getPendingArticles = async (req, res) => {
  const articles = await Article.find({ status: 'Submitted' }).populate('editor', 'staffId');
  res.json(articles);
};

// Approve/reject article
export const reviewArticle = async (req, res) => {
  const updated = await Article.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(updated);
};

// Editor dashboard stats
export const getEditorDashboard = async (req, res) => {
  try {
    const editorId = req.user.id;
    const [total, draft, submitted, approved] = await Promise.all([
      Article.countDocuments({ editor: editorId }),
      Article.countDocuments({ editor: editorId, status: 'Draft' }),
      Article.countDocuments({ editor: editorId, status: 'Submitted' }),
      Article.countDocuments({ editor: editorId, status: 'Approved' })
    ]);
    res.json({ total, draft, submitted, approved });
  } catch (err) {
    res.status(500).json({ message: 'Editor dashboard error' });
  }
};

// Publisher dashboard stat
export const getPublisherDashboard = async (req, res) => {
  try {
    const pending = await Article.countDocuments({ status: 'Submitted' });
    res.json({ pending });
  } catch (err) {
    res.status(500).json({ message: 'Publisher dashboard error' });
  }
};

// Archive article (Editor-only, single definition)
export const archiveArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    if (article.isArchived) {
      return res.status(400).json({ message: 'Article already archived' });
    }

    article.isArchived = true;
    await article.save();

    res.json({ message: 'Article archived successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Archiving failed' });
  }
};

// Restore archived article (Editor-only, single definition)
export const restoreArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    if (!article.isArchived) {
      return res.status(400).json({ message: 'Article is not archived' });
    }
    // Clear rejection fields when restoring
    article.status = 'Draft';
    article.rejectedBy = undefined;
    article.rejectedAt = undefined;
    article.rejectionReason = undefined;
    article.isArchived = false;
    await article.save();

    res.json({ message: 'Article restored successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Restoration failed' });
  }
};
