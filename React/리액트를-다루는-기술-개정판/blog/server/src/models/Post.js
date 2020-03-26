const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Post', PostSchema);
