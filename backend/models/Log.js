import mongoose from 'mongoose';

const logSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true
    },
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    metadata: Object,
    target: String, // could be user ID, article ID, etc.
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model('Log', logSchema);
