const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  description: String,
  credits: {
    type: Number,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the teacher
    required: true
  },
  semester: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);