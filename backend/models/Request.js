const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  method: {
    type: String,
    enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    default: 'GET'
  },
  url: {
    type: String,
    required: true
  },
  headers: [{
    key: String,
    value: String,
    enabled: {
      type: Boolean,
      default: true
    }
  }],
  params: [{
    key: String,
    value: String,
    enabled: {
      type: Boolean,
      default: true
    }
  }],
  body: {
    type: {
      type: String,
      enum: ['none', 'json', 'form-data', 'x-www-form-urlencoded'],
      default: 'none'
    },
    content: {
      type: String,
      default: ''
    }
  },
  auth: {
    type: {
      type: String,
      enum: ['none', 'basic', 'bearer', 'apikey'],
      default: 'none'
    },
    params: {
      username: String,
      password: String,
      token: String,
      key: String,
      value: String,
      addTo: {
        type: String,
        enum: ['header', 'query'],
        default: 'header'
      }
    }
  },
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection',
    required: true
  }
}, { timestamps: true });

RequestSchema.index({ userId: 1 });
RequestSchema.index({ collectionId: 1 });

module.exports = mongoose.model('Request', RequestSchema); 