const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  requestId: {
    type: String,
    required: true
  },
  request: {
    method: String,
    url: String,
    headers: Object,
    body: mongoose.Schema.Types.Mixed
  },
  response: {
    status: Number,
    statusText: String,
    headers: Object,
    data: mongoose.Schema.Types.Mixed
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Create index for faster queries
HistorySchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model('History', HistorySchema); 