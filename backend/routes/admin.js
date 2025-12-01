const express = require('express');
const router = express.Router();
const { getSystemStats, createCourse, getAllUsers } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');

// All routes here are protected and for Admins only
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getSystemStats);
router.post('/courses', createCourse);
router.get('/users', getAllUsers);

module.exports = router;