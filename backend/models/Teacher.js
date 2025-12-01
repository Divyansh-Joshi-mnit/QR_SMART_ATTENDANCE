const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  department: {
    type: String, // Or ref to 'Department' model
    required: true
  },
  designation: {
    type: String, // e.g., "Assistant Professor"
    required: true
  },
  phone: {
    type: String
  },
  officeHours: {
    type: String // e.g., "Mon-Wed 10-11 AM"
  }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);