const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

module.exports = mongoose.model('User', UserSchema); // const User = require('../models/User'); //[User.js file is exporting the User model as the default export]
// exports.User = mongoose.model('User', UserSchema);  // const { User } = require('../models/User'); // [module exports the User object as a named export]
