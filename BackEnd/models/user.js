const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  googleId: { type: String },
  name: { type: String, required: true },
  isadmin: { type: Boolean, default: false },
  resetToken: { type: String }, // To store the reset token
  resetTokenExpiry: { type: Date }, // To store the token expiry time
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
