const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  semester: {
    type: Number,
    required: true
  },
  academicYear: {
    type: String, // e.g., "2024-2025"
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Dropped', 'Completed'],
    default: 'Active'
  }
}, { timestamps: true });

// Ensure a student can't enroll in the same course twice in the same semester
enrollmentSchema.index({ student: 1, course: 1, semester: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);