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
  try {
    const user = await User.findById(req.user.id).select('-password');
    return globalFunctions.sendSuccessResponse({ data: 'User dashboard' }, res);
  } catch (err) {
    return globalFunctions.sendErrorResponse(err, res);
  }
};

module.exports = {
  getUserProfile,
  getUserDashboard,
};
