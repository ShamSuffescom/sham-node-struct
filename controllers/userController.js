const User = require('../models/User');
const globalFunctions = require('../utils/globalFunctions');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return globalFunctions.sendSuccessResponse({ data: user }, res);
  } catch (err) {
    return globalFunctions.sendErrorResponse(err, res);
  }
};

const getUserDashboard = async (req, res) => {
  // Implement user-specific logic here
  res.json({ message: 'User dashboard' });
};

module.exports = {
  getUserProfile,
  getUserDashboard,
};
