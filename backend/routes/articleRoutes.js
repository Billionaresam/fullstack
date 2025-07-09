const express = require('express');
const router = express.Router();

const {
  submitArticle,
  uploadThumbnail,
  getMyArticles,
  editArticle,
  getPendingArticles,
  reviewArticle,
  getEditorDashboard,
  getPublisherDashboard
} = require('../controllers/articleController');

const { protect, restrictTo } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Editor routes
router.post('/submit', protect, restrictTo('Editor'), submitArticle);
router.post('/upload', protect, upload.single('image'), uploadThumbnail);
router.get('/mine', protect, restrictTo('Editor'), getMyArticles);
router.put('/edit/:id', protect, restrictTo('Editor'), editArticle);
router.get('/dashboard', protect, restrictTo('Editor'), getEditorDashboard);

// Publisher routes
router.get('/pending', protect, restrictTo('Publisher'), getPendingArticles);
router.put('/review/:id', protect, restrictTo('Publisher'), reviewArticle);
router.get('/publisher-dashboard', protect, restrictTo('Publisher'), getPublisherDashboard());

router.put('/archive/:id', protect, restrictTo('Editor'), archiveArticle);
router.put('/restore/:id', protect, restrictTo('Editor'), restoreArticle);
const { archiveArticle, restoreArticle } = require('../controllers/articleController');
const { approveArticle } = require('../controllers/articleController');
const Article = require('../models/Article');
const logAction = require('../utils/logAction');
const { rejectArticle } = require('../controllers/articleController');
module.exports = router;
router.put('/approve/:id', protect, restrictTo('Editor', 'Admin'), approveArticle);
/*
Controller function for approving an article.
Place this in controllers/articleController.js (no duplication).
*/

exports.approveArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (article.status !== 'Submitted') {
      return res.status(400).json({ message: 'Only submitted articles can be approved' });
    }

    article.status = 'Approved';
    article.approvedBy = req.user._id;
    article.approvedAt = new Date();
    await article.save();

    await logAction({
      actor: req.user._id,
      action: 'APPROVE_ARTICLE',
      target: article._id,
      metadata: { title: article.title }
    });

    res.json({ message: 'Article approved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};