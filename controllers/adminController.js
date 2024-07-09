const User = require('../models/User');
const globalFunctions = require('../utils/globalFunctions');

const getAdminProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return globalFunctions.sendSuccessResponse({ data: user }, res);
  } catch (err) {
    return globalFunctions.sendErrorResponse(err, res);
  }
};

const getAdminDashboard = async (req, res) => {
  // Implement admin-specific logic here
  res.json({ message: 'Admin dashboard' });
};

module.exports = {
  getAdminProfile,
  getAdminDashboard,
};
