const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken'); 
const User = require('../models/user'); 
const router = express.Router();

router.post('/google-login', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    const googleResponse = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);

    const { email, name, sub: googleId } = googleResponse.data;

    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({
        email,
        googleId,
        name,
      });

      await user.save();
    }

    const jwtToken = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(200).json({
      message: 'User logged in successfully!',
      token: jwtToken
    });
  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(500).json({ error: 'Failed to authenticate with Google' });
  }
});

module.exports = router;
