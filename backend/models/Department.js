const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // e.g., "Computer Science and Engineering"
  },
  code: {
    type: String,
    required: true,
    unique: true, // e.g., "CSE"
    uppercase: true
  },
  headOfDepartment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher' // Reference to the HOD
  },
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);