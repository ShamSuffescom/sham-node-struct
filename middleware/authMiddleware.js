const jwt = require('jsonwebtoken');
const User = require('../models/User');
const globalFunctions = require('../utils/globalFunctions');
const {isTokenBlacklisted} = require('../utils/tokenUtils');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {

    if (!token) {
        return globalFunctions.sendErrorResponse({ message: 'Token is required' }, res);
    }

    if (isTokenBlacklisted(token)) {
        return globalFunctions.sendErrorResponse({ message: 'authMiddleware: Token has been logged out' }, res);
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.user.id).select('-password');
    next();
  } catch (err) {
    return globalFunctions.sendErrorResponse({ message: 'authMiddleware: Token has been logged out' }, res);
  }
};

module.exports = authMiddleware;
