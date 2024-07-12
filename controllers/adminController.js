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
  try {
    return globalFunctions.sendSuccessResponse({ data: 'Admin dashboard' }, res);
  } catch (err) {
    return globalFunctions.sendErrorResponse(err, res);
  }
};

module.exports = {
  getAdminProfile,
  getAdminDashboard,
};
