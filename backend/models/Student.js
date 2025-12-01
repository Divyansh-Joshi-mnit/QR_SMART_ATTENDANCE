const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true
  },
  department: {
    type: String, // Can be ref to 'Department' model if strict schema needed
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);