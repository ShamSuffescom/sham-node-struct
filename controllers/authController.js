const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/User');
const globalFunctions = require('../utils/globalFunctions');
const {blacklistToken, isTokenBlacklisted} = require('../utils/tokenUtils');

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('user', 'admin').required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return globalFunctions.sendErrorResponse({ message: error.details[0].message }, res);
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return globalFunctions.sendErrorResponse({ message: 'User already exists' }, res);
    }

    user = new User({ name, email, password, role });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: { id: user.id, role: user.role },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      user = user.toObject();
      user.token = token;
      return globalFunctions.sendSuccessResponse({ message: 'User registered successfully', data: user }, res);
    });
  } catch (err) {
    return globalFunctions.sendErrorResponse(err, res);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return globalFunctions.sendErrorResponse({ message: error.details[0].message }, res);
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return globalFunctions.sendErrorResponse({ message: 'Invalid credentials' }, res);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return globalFunctions.sendErrorResponse({ message: 'Invalid credentials' }, res);
    }

    const payload = {
      user: { id: user.id, role: user.role },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      user = user.toObject();
      user.token = token;
      return globalFunctions.sendSuccessResponse({ message: 'User logged in successfully', data: user }, res);
    });
  } catch (err) {
    return globalFunctions.sendErrorResponse(err, res);
  }
};

const logoutUser = (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return globalFunctions.sendErrorResponse({ message: 'Token is required' }, res);
    }

    if (isTokenBlacklisted(token)) {
        return globalFunctions.sendErrorResponse({ message: 'authController: Token has been logged out' }, res);
    }

    blacklistToken(token);

    return globalFunctions.sendSuccessResponse({ message: 'Logout successful'}, res);
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
