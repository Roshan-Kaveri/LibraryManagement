const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  googleId: { type: String },
  name: { type: String, required: true },
  isadmin: { type: Boolean, default: false },
  resetToken: { type: String }, 
  resetTokenExpiry: { type: Date }, 
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
