const express = require('express');
const router = express.Router();
const { markAttendance, getAttendanceHistory } = require('../controllers/studentController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');

// All routes here are protected and for Students only
router.use(protect);
router.use(authorize('student'));

router.post('/mark-attendance', markAttendance);
router.get('/attendance', getAttendanceHistory);

module.exports = router;