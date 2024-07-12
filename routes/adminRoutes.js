const express = require('express');
const { getAdminProfile, getAdminDashboard } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/profile', authMiddleware, roleMiddleware(['admin']), getAdminProfile);
router.get('/dashboard', authMiddleware, roleMiddleware(['admin']), getAdminDashboard);

module.exports = router;