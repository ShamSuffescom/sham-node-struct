const globalFunctions = require('../utils/globalFunctions');

const roleMiddleware = (roles) => (req, res, next) => {
    console.log("Roles: ",req.user.role);
    if (!roles.includes(req.user.role)) {
      // return res.status(403).json({ message: 'Access denied' });
      return globalFunctions.sendErrorResponse({ message: 'Access denied' }, res);
    }
    next();
  };
  
  module.exports = roleMiddleware;
  