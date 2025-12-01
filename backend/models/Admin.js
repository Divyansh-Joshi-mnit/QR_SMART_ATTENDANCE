const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  permissions: [{
    type: String // e.g., ['manage_users', 'view_reports', 'system_settings']
  }],
  lastLogin: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);