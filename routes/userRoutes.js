const express = require('express');
const { getUserProfile, getAdminDashboard, getUserDashboard } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/profile', authMiddleware, getUserProfile);
router.get('/dashboard', authMiddleware, roleMiddleware(['user']), getUserDashboard);

module.exports = router;
