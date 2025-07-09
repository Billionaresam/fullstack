const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    thumbnail: String,
    status: {
      type: String,
      enum: ['Draft', 'Submitted', 'Approved', 'Rejected'],
      default: 'Draft'
    },
    editor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isArchived: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
