const User = require('../models/User');
const Course = require('../models/Course');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Attendance = require('../models/Attendance');

// @desc    Get system statistics
// @route   GET /api/admin/stats
// @access  Private (Admin)
exports.getSystemStats = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const totalTeachers = await Teacher.countDocuments();
        const totalCourses = await Course.countDocuments();
        const totalAttendance = await Attendance.countDocuments();

        res.json({
            students: totalStudents,
            teachers: totalTeachers,
            courses: totalCourses,
            totalAttendanceLogs: totalAttendance
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new course
// @route   POST /api/admin/courses
// @access  Private (Admin)
exports.createCourse = async (req, res) => {
    try {
        const { name, code, department, credits, teacherId, semester } = req.body;

        // Verify teacher exists
        const teacher = await Teacher.findOne({ user: teacherId });
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const course = await Course.create({
            name,
            code,
            department,
            credits,
            teacher: teacherId, // Link to User ID of the teacher
            semester
        });

        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};