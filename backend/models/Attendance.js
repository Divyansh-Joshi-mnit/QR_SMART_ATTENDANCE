const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', // Linking to Student profile
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  status: {
    type: String,
    enum: ['Present', 'Late', 'Absent'],
    default: 'Present'
  },
  markedAt: {
    type: Date,
    default: Date.now
  },
  deviceInfo: { // Optional: to prevent proxy via device ID
    type: String
  },
  location: { // Optional: Geo-fencing support
    lat: Number,
    long: Number
  }
}, { timestamps: true });

// Prevent duplicate attendance for the same session (FR4) [cite: 111]
attendanceSchema.index({ session: 1, student: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);