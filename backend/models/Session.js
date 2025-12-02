const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  creator: { // The teacher who started the session
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  qrCodeData: { // Encrypted string or unique ID
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  expiresAt: { // Handling time validity (FR2) [cite: 97]
    type: Date,
    required: true
  }
}, { timestamps: true });

// Index to automatically expire sessions if needed, though we handle logic in controller
// sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Session', sessionSchema);